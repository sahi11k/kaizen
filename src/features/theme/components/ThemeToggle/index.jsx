import React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Tooltip } from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import useThemeStore from "@/features/theme/store/theme";
import { THEME, THEME_TOOLTIP_TEXT } from "@/features/theme/constants";

const ThemeToggle = ({ tooltipSide = "bottom", tooltipLevel, className }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Tooltip
      content={THEME_TOOLTIP_TEXT[theme]}
      side={tooltipSide}
      arrow={false}
      level={tooltipLevel}
    >
      <Button
        onClick={toggleTheme}
        variant="icon"
        icon={
          theme === THEME.LIGHT ? (
            <Sun className="animate-spin-once" />
          ) : (
            <Moon className="animate-spin-once" />
          )
        }
        className={cn("w-12 !h-12", className)}
      />
    </Tooltip>
  );
};

export { ThemeToggle };
