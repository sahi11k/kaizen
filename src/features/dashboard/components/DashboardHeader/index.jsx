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
import useAuthStore from "@/features/auth/store/auth";
import { signOut } from "@/features/auth/api/auth";
import { Toast } from "@/shared/ui/toast";
import { STATUS } from "@/shared/constants/db";
import { getUserDisplayName } from "@/features/auth/utils/auth";
import { SidebarMobile } from "@/app/layouts/components/Sidebar";
import { Tooltip } from "@/shared/ui/tooltip";
import useTasksStore from "@/features/pomodoro/store/tasks";
import useJournalsStore from "@/features/journals/store/journals";

const { toast } = Toast;

const DashboardHeader = ({ setIsCollapsed, isCollapsed }) => {
  const navigate = useNavigate();
  const { setUser, setUserFetchStatus, user } = useAuthStore();
  const { setTasks, setTasksFetchStatus } = useTasksStore();
  const { setJournals, setJournalsFetchStatus } = useJournalsStore();
  const userDisplayName = getUserDisplayName(user);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = async () => {
    const res = await signOut();
    if (res.error) {
      toast.error(res.error);
    } else {
      setUser(null);
      setUserFetchStatus(STATUS.LOADING);
      setTasks([]);
      setTasksFetchStatus(STATUS.LOADING);
      setJournals([]);
      setJournalsFetchStatus(STATUS.LOADING);
      navigate("/", { replace: true });
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
          className="hidden xl:flex -ml-2"
          icon={isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        />
      </Tooltip>

      <SidebarMobile />
      <div className="flex items-center gap-2 xl:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="uppercase bg-secondary font-semibold">
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
