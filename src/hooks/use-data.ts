import { useContext } from "react";
import { DataProviderContext } from "@/components/providers/data-provider";

export function useData() {
  const context = useContext(DataProviderContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
