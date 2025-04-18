import { useData } from "@/hooks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router";

export default function Breadcrumbs() {
  const { data } = useData();
  const location = useLocation();
  const params = useParams();

  // Generate breadcrumbs based on current route
  const renderBreadcrumbs = () => {
    // Home/Dashboard route
    if (location.pathname === "/") {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }

    // Board detail route
    if (location.pathname.startsWith("/boards/") && params.boardId) {
      // Find the board by ID
      const currentBoard = data.find(
        (board) => board.id === Number(params.boardId),
      );

      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/" className="hover:text-foreground transition-colors">
              Boards
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentBoard?.name || ""}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }

    // Fallback for other routes
    return (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Unknown Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    );
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4 bg-transparent" />
      <Breadcrumb>{renderBreadcrumbs()}</Breadcrumb>
    </header>
  );
}
