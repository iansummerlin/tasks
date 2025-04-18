import { useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import { DB_CONNECTION_STRING } from "@/lib/constants";
import { tryCatch } from "@/lib/try-catch";

export function useLazyQuery(): {
  query: <T>(
    statement: string,
    args: unknown[],
  ) => ReturnType<typeof tryCatch<T[]>>;
  loading: boolean;
} {
  const [loading, setLoading] = useState(false);

  const query = async <T>(statement: string, args: unknown[]) => {
    setLoading(true);
    const queryResult = await tryCatch<T[]>(
      (async () => {
        const db = await Database.load(DB_CONNECTION_STRING);
        return db.select<T[]>(statement, args);
      })(),
    );
    setLoading(false);

    return queryResult;
  };

  return { loading, query };
}
