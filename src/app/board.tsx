import Database from "@tauri-apps/plugin-sql";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import type { TaskBoard } from "@/lib/types/tasks";
import { DB_CONNECTION_STRING } from "@/lib/constants";
import { Page } from "@/components/page";

export const boardLoader = async ({ params }: LoaderFunctionArgs) => {
  const db = await Database.load(DB_CONNECTION_STRING);
  const data = await db.select<TaskBoard>(
    `SELECT * FROM task_boards WHERE id = ${params.boardId} LIMIT 1`,
  );
  return data;
};

export default function Board() {
  const data = useLoaderData<typeof boardLoader>();
  console.log("🚀 ~ Board ~ data:", data);

  return (
    <Page>
      <div className="flex flex-1 flex-col gap-4 px-4 pb-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </Page>
  );
}
