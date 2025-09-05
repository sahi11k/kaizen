import JournalListContent from "@/components/Journals/JournalList/JournalListContent";
import TaskListContent from "@/components/Pomodoro/Tasks/TaskListContent";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ListTodo, PanelRightClose } from "lucide-react";
import React, { useEffect, useState } from "react";

const JournalListMobile = () => {
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
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="flex lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition"
          size="lg"
        >
          <ListTodo className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="!w-full sm:!-w-100">
        <aside className="flex lg:hidden w-full px-6 flex-col h-full">
          <JournalListContent />
        </aside>
        <DrawerClose className="absolute top-5 right-4" asChild>
          <Button variant="icon">
            <PanelRightClose className="size-6" />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default JournalListMobile;
