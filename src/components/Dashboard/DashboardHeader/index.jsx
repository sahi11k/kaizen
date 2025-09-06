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
    <div className="h-16 px-4 md:px-6  flex items-center justify-between border-b border-border sticky top-0 bg-background z-10">
      <Button
        onClick={handleCollapse}
        variant="icon"
        className="hidden lg:flex -ml-2"
        icon={isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
      />
      <SidebarMobile />
      <div className="flex items-center gap-2 lg:gap-6">
        <Button variant="icon">
          {/* <Moon className="size-6" /> */}
          {/* <Sun className="size-6" /> */}
        </Button>
        {/* <div className="border border-border hidden lg:block h-6" /> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="uppercase bg-secondary font-semibold">
                {userDisplayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="flex items-center gap-1 hidden lg:flex">
              <span className="text-lg font-semibold">{userDisplayName}</span>
              <ChevronDown className="text-muted-foreground mt-1 size-5" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-border shadow-md w-30 font-medium">
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
