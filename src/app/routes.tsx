import { createBrowserRouter } from "react-router";
import Dashboard from "./dashboard";
import { Layout } from "@/components/layout";

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
