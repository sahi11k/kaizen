import React from "react";
import { Button } from "@/components/ui/button";
import {
  PanelLeftOpen,
  PanelLeftClose,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router";
import useAuthStore from "@/store/auth";
import { signOut } from "@/db/apis/auth";
import { Toast } from "@/components/ui/toast";
import { STATUS } from "@/constants/db";
import { getUserDisplayName } from "@/utils/auth";
import { SidebarMobile } from "@/components/Dashboard/Sidebar";
import { Tooltip } from "@/components/ui/tooltip";

const { toast } = Toast;

const DashboardHeader = ({ setIsCollapsed, isCollapsed }) => {
  const navigate = useNavigate();
  const { setUser, setUserFetchStatus, user } = useAuthStore();
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
