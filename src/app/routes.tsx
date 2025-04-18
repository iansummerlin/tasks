import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/layout";
import Dashboard from "./dashboard";
import Board, { boardLoader } from "./board";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/boards/:boardId",
        loader: boardLoader,
        Component: Board,
      },
    ],
  },
]);

export default router;
