import TimerContent from "@/components/Pomodoro/Timer/TimerContent";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Timer } from "lucide-react";
import React, { useEffect, useState } from "react";

const TimerMobile = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 48rem");

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
    <Drawer
      direction="bottom"
      open={open}
      onOpenChange={setOpen}
      className="md:hidden"
    >
      <DrawerTrigger asChild>
        <Button
          icon={<Timer className="size-5 text-secondary" />}
          className="h-16 md:hidden rounded-full text-base px-8"
        >
          Focus
        </Button>
      </DrawerTrigger>
      <DrawerContent fullScreen className="[&>div:first-child]:hidden">
        <DrawerClose asChild>
          <Button
            variant="link"
            className="w-fit border-none mx-8 py-6 text-primary"
          >
            Close
          </Button>
        </DrawerClose>
        <div className="flex flex-col gap-8 h-full p-6 pt-0">
          <TimerContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TimerMobile;
