import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import type * as React from "react";
import { Button } from "../ui/button";
import { NavLink } from "react-router";

export default function CustomSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="border-r">
      <SidebarHeader>
        <div className="px-4 py-2">
          <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-xl">☑️</span>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Tasks
            </span>
          </h3>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {data.map((item) => (
          <SidebarGroup key={item.title} className="py-2">
            {item.title && (
              <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {item.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className="w-full h-10 p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <div className="mt-auto p-4">
        <Button
          className="w-full gap-2"
          onClick={() => {
            console.log("Add Board");
          }}
          size="lg"
        >
          <Plus size={16} />
          Add Board
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}

const data = [
  {
    title: "",
    url: "",
    items: [
      {
        title: "🏠 Dashboard",
        url: "/",
        isActive: true,
      },
    ],
  },
  {
    title: "Boards",
    url: "#",
    items: [
      {
        title: "Personal",
        url: "#",
      },
      {
        title: "Board 1",
        url: "#",
      },
      {
        title: "Board 2",
        url: "#",
      },
    ],
  },
];
