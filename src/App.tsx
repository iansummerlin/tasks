import { Provider } from "@/components/providers/Provider";
import { SidebarInset } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Content } from "@/components/content";

function App() {
  return (
    <Provider>
      <Sidebar />
      <SidebarInset>
        <Breadcrumbs />
        <Content />
      </SidebarInset>
    </Provider>
  );
}

export default App;
