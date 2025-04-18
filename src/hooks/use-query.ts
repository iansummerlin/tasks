import { useCallback, useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import { DB_CONNECTION_STRING } from "@/lib/constants";

export function useQuery<T>(
  query: string,
  ...args: unknown[]
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const db = await Database.load(DB_CONNECTION_STRING);
      const result = await db.select<T>(query, args);
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [query, ...args]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
