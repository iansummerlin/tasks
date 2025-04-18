import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { DataProvider } from "./data-provider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <DataProvider>{children}</DataProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
