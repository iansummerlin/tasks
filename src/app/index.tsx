import { RouterProvider } from "react-router";
import router from "./routes";

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
