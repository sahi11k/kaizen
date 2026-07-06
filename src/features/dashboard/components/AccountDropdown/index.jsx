import React from "react";
import { Link, useNavigate } from "react-router";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
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
import { cn } from "@/shared/lib/utils";
import { getUserDisplayName, signOut, useAuthStore } from "@/features/auth";
import { THEME, useThemeStore } from "@/features/theme";
import {
  closePipWindow,
  useTasksStore,
  useTimerStore,
} from "@/features/pomodoro";
import useJournalsStore from "@/features/journals/store";
import { useQueryClient } from "@tanstack/react-query";

const { toast } = Toast;

const AccountDropdown = ({
  showUserText = false,
  align = "end",
  side = "bottom",
  className,
  triggerClassName,
  avatarClassName,
  contentClassName,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { setCurrentTask } = useTasksStore();
  const resetJournals = useJournalsStore((state) => state.resetJournals);
  const queryClient = useQueryClient();
  const userDisplayName = getUserDisplayName(user);
  const userAvatarUrl = user?.user_metadata?.avatar_url || "";
  const isLightTheme = theme === THEME.LIGHT;
  const ThemeIcon = isLightTheme ? Moon : Sun;
  const themeActionLabel = isLightTheme
    ? "Switch to dark mode"
    : "Switch to light mode";

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
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex min-w-0 cursor-pointer items-center rounded-full outline-none",
          showUserText && "gap-3",
          triggerClassName,
        )}
      >
        <Avatar className={cn("size-12 shrink-0 shadow-sm", avatarClassName)}>
          <AvatarImage src={userAvatarUrl} alt={userDisplayName} />
          <AvatarFallback className="uppercase bg-secondary text-secondary-foreground font-semibold">
            {userDisplayName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {showUserText && (
          <span className="min-w-0 overflow-hidden text-left">
            <span className="body-base !font-serif block truncate text-current">
              {userDisplayName}
            </span>
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "border-border shadow-md w-48 font-sans text-base font-normal",
          contentClassName,
          className,
        )}
        align={align}
        side={side}
      >
        <DropdownMenuItem
          className="cursor-pointer text-base"
          onClick={toggleTheme}
        >
          <ThemeIcon />
          {themeActionLabel}
        </DropdownMenuItem>
        <Link to="/dashboard/settings">
          <DropdownMenuItem className="cursor-pointer text-base">
            <Settings />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer text-base"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
