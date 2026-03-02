import SidebarContent from "../SidebarContent";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Menu, PanelLeftClose } from "lucide-react";
import React, { useEffect, useState } from "react";

const SidebarMobile = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handler = (e) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    if (mediaQuery.matches) {
      setOpen(false);
    }

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerHeader className="p-0">
        <DrawerTitle>
          <DrawerTrigger asChild>
            <Button
              variant="icon"
              className="block xl:hidden w-12 !h-12"
              icon={<Menu className="size-6" />}
            />
          </DrawerTrigger>
        </DrawerTitle>
      </DrawerHeader>

      <DrawerContent className="!w-72 ">
        <aside className="px-6 flex flex-col space-y-6 h-full">
          <SidebarContent
            isCollapsed={false}
            setOpen={setOpen}
            isMobile={true}
          />
        </aside>
        <DrawerClose className="absolute top-3.5 right-4" asChild>
          <Button variant="icon" className="-mr-2 w-12 !h-12">
            <PanelLeftClose />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarMobile;
