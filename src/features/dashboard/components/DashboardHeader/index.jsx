import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Toast,
} from "@/shared/ui";
import { Link, useNavigate } from "react-router";
import { useAuthStore, signOut, getUserDisplayName } from "@/features/auth";
import { SidebarMobile } from "@/features/dashboard";
import { ThemeToggle } from "@/features/theme";
import { DailyMoodLogger } from "@/features/mood";
import {
  useTasksStore,
  useTimerStore,
  closePipWindow,
} from "@/features/pomodoro";
import useJournalsStore from "@/features/journals/store";
import { useQueryClient } from "@tanstack/react-query";

const { toast } = Toast;

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setCurrentTask } = useTasksStore();
  const resetJournals = useJournalsStore((state) => state.resetJournals);
  const queryClient = useQueryClient();
  const userDisplayName = getUserDisplayName(user);
  const userAvatarUrl = user?.user_metadata?.avatar_url || "";

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentTask(null);
      resetJournals();
      queryClient.clear();
      useTimerStore.getState().resetTimer(0);
      closePipWindow();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-16 px-4 xl:px-6 flex items-center border-b border-border sticky top-0 bg-background z-[var(--z-header)]">
      <SidebarMobile />
      <div className="flex items-center gap-3 xl:gap-6 ml-auto">
        <div className="flex items-center xl:gap-2">
          <DailyMoodLogger />
          <ThemeToggle
            tooltipSide="bottom"
            tooltipLevel="header"
            className="-mr-2"
          />
        </div>
        <div className="h-6 w-px bg-border" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatarUrl} alt={userDisplayName} />
              <AvatarFallback className="uppercase bg-secondary text-secondary-foreground font-semibold">
                {userDisplayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="flex items-center gap-1 hidden md:flex">
              <span className="text-lg font-semibold">{userDisplayName}</span>
              <ChevronDown className="text-muted-foreground mt-1 size-5" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border-border shadow-md w-36 font-medium"
            align="end"
          >
            <Link to="/dashboard/settings">
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
