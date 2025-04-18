import { createContext } from "react";
import type { TaskBoard } from "@/lib/types/tasks";
import { useQuery } from "@/hooks";

type DataProviderProps = {
  children: React.ReactNode;
};

type DataProviderState = {
  loading: boolean;
  data: TaskBoard[];
  refetch: () => void;
};

export const DataProviderContext = createContext<DataProviderState>({
  loading: true,
  data: [],
  refetch: () => {},
});

export const DataProvider = ({ children }: DataProviderProps) => {
  const { data, loading, error, refetch } = useQuery<TaskBoard[]>(
    "SELECT * FROM task_boards",
  );

  return (
    <DataProviderContext.Provider
      value={{ loading, data: data || [], refetch }}
    >
      {children}
    </DataProviderContext.Provider>
  );
};
