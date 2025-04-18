import type * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from "react-router";
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
import { useData } from "@/hooks";
import getSidebarConfig from "./config"; // Assuming SidebarItemConfig type exists
import AddBoard from "./add-board";

type FlatSidebarItem = {
  title: string;
  url: string;
  groupTitle?: string;
};

export default function CustomSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data } = useData();
  const sidebarConfig = getSidebarConfig(data);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Flatten the sidebar items for easier indexing
  const flatItems: FlatSidebarItem[] = sidebarConfig.reduce((acc, group) => {
    const items = group.items.map((item) => ({
      ...item,
      groupTitle: group.title,
    }));
    return acc.concat(items);
  }, [] as FlatSidebarItem[]);

  const navigateToItem = useCallback(
    (index: number) => {
      if (index >= 0 && index < flatItems.length) {
        const itemToNavigate = flatItems[index];
        const element = itemRefs.current[index];
        if (itemToNavigate?.url && element) {
          element.click();
          setFocusedIndex(index);
        }
      }
    },
    [flatItems],
  );

  /**
   * Effect to handle keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Determine if the event should be handled (e.g., focus is potentially near/in sidebar)
      // This basic check prevents global capture if user is typing elsewhere.
      // You might refine this based on UX needs.
      const isFocusPotentiallyInSidebar =
        sidebarRef.current?.contains(document.activeElement) ||
        focusedIndex !== -1;

      if (
        !isFocusPotentiallyInSidebar &&
        !(event.key === "ArrowDown" || event.key === "ArrowUp")
      ) {
        // Don't interfere if focus is clearly outside and not an arrow key
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault(); // Prevent page scrolling
        const totalItems = flatItems.length;
        if (totalItems === 0) return; // No items to navigate

        let nextIndex: number;
        let currentEffectiveIndex = focusedIndex;

        // If focus is technically outside but we tracked an index, use that.
        // If focus is on an item, find its index.
        if (sidebarRef.current?.contains(document.activeElement)) {
          const focusedElement = document.activeElement as HTMLElement;
          const indexFromDOM = itemRefs.current.findIndex(
            (ref) => ref === focusedElement,
          );
          if (indexFromDOM !== -1) {
            currentEffectiveIndex = indexFromDOM;
          }
        }

        if (currentEffectiveIndex === -1) {
          // If nothing is focused/tracked, start from the top on Down, bottom on Up
          nextIndex = event.key === "ArrowDown" ? 0 : totalItems - 1;
        } else {
          if (event.key === "ArrowDown") {
            nextIndex = (currentEffectiveIndex + 1) % totalItems;
          } else {
            // ArrowUp
            nextIndex = (currentEffectiveIndex - 1 + totalItems) % totalItems;
          }
        }
        // Navigate to the item immediately
        navigateToItem(nextIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // Re-run if items change or navigation logic needs update
  }, [flatItems.length, focusedIndex, navigateToItem]);

  // Reset tracked index if items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, flatItems.length);
    setFocusedIndex(-1);
  }, [flatItems.length]);

  let currentItemIndex = -1;

  return (
    <Sidebar {...props} className="border-r" ref={sidebarRef}>
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
        {sidebarConfig.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            {group.title && (
              <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  currentItemIndex++;
                  const itemIndex = currentItemIndex;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <NavLink
                        to={item.url}
                        ref={(el) => {
                          itemRefs.current[itemIndex] = el;
                        }}
                        onFocus={() => setFocusedIndex(itemIndex)}
                        className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                      >
                        {({ isActive }) => (
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            data-active={isActive}
                            aria-current={isActive ? "page" : undefined}
                            className="w-full h-10 p-2 rounded-md hover:bg-accent/50 transition-colors data-[active=true]:bg-accent data-[active=true]:font-normal"
                          >
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <div className="mt-auto p-4">
        <AddBoard />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
