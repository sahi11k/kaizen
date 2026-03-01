import React from "react";
import { Button } from "@/shared/ui/button";
import { PanelLeftOpen, PanelLeftClose, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useAuthStore, signOut, getUserDisplayName } from "@/features/auth";
import { Toast } from "@/shared/ui/toast";
import { SidebarMobile } from "@/app/layouts/components/Sidebar";
import { Tooltip } from "@/shared/ui/tooltip";
import { ThemeToggle } from "@/features/theme";
import { useTasksStore, useTimerStore, closePipWindow } from "@/features/pomodoro";
import { useQueryClient } from "@tanstack/react-query";

const { toast } = Toast;

const DashboardHeader = ({ setIsCollapsed, isCollapsed }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setCurrentTask } = useTasksStore();
  const queryClient = useQueryClient();
  const userDisplayName = getUserDisplayName(user);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentTask(null);
      queryClient.clear();
      useTimerStore.getState().resetTimer(0);
      closePipWindow();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-16 px-4 xl:px-6 flex items-center justify-between border-b border-border sticky top-0 bg-background z-[var(--z-header)]">
      <Tooltip
        content={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        side="right"
        arrow={false}
        level="header"
      >
        <Button
          onClick={handleCollapse}
          variant="icon"
          className="hidden xl:flex -ml-2 w-12 !h-12"
          icon={isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        />
      </Tooltip>

      <SidebarMobile />
      <div className="flex items-center gap-4 xl:gap-6">
        <ThemeToggle
          tooltipSide="bottom"
          tooltipLevel="header"
          className="-mr-2"
        />
        <div className="h-6 w-px bg-border" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
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
            className="border-border shadow-md w-30 font-medium"
            align="end"
          >
            {/* <Link to="/dashboard/settings">
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
            </Link> */}
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
