import { useState } from "react";
import Database, { type QueryResult } from "@tauri-apps/plugin-sql";
import { DB_CONNECTION_STRING } from "@/lib/constants";
import { tryCatch } from "@/lib/try-catch";

export function useMutation(): {
  mutate: (statement: string, args: unknown[]) => ReturnType<typeof tryCatch>;
  loading: boolean;
} {
  const [loading, setLoading] = useState(false);

  const mutate = async (statement: string, args: unknown[]) => {
    setLoading(true);
    const mutateResult = await tryCatch<QueryResult>(
      (async () => {
        const db = await Database.load(DB_CONNECTION_STRING);
        return db.execute(statement, args);
      })(),
    );
    setLoading(false);

    return mutateResult;
  };

  return { loading, mutate };
}
