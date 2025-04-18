import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
