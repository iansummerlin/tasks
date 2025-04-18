import { Provider } from "@/components/providers/provider";
import RouterProvider from "@/app/index";

function App() {
  return (
    <Provider>
      <RouterProvider />
    </Provider>
  );
}

export default App;
