import { Sidebar } from "@/components/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { Breadcrumbs } from "@/components/breadcrumbs";

function Layout() {
  return (
    <>
      <Sidebar />
      <SidebarInset>
        <Breadcrumbs />
        <Outlet />
      </SidebarInset>
    </>
  );
}

export default Layout;
