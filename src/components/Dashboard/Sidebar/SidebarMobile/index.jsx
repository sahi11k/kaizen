import SidebarContent from "../SidebarContent";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
      <DrawerTrigger asChild>
        <Button
          variant="icon"
          className="block xl:hidden -ml-2"
          icon={<Menu className="size-6" />}
        />
      </DrawerTrigger>
      <DrawerContent className="!w-72 ">
        <aside className="px-6 flex flex-col space-y-6 h-full">
          <SidebarContent isCollapsed={false} />
        </aside>
        <DrawerClose className="absolute top-3.5 right-4" asChild>
          <Button variant="icon" className="-mr-2">
            <PanelLeftClose />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarMobile;
