import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/layout";
import Dashboard from "./dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
]);

export default router;
