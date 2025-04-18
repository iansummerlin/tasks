import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./ThemeProvider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
