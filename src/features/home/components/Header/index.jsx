import React from "react";
import { Link } from "react-router";
import { useAuthStore } from "@/features/auth";
import { Button, Logo } from "@/shared/ui";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";
import { ThemeToggle } from "@/features/theme";

const HeaderMain = () => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-background ">
      <div className="flex justify-between items-center px-6 xl:px-0 py-4 xl:max-w-7xl mx-auto">
        <Logo link={true} className="text-primary" />
        <div className="flex items-center gap-4 xl:gap-6">
          <ThemeToggle
            tooltipSide="bottom"
            tooltipLevel="header"
            className="-mr-2"
          />
          <div className="h-6 w-px bg-border" />
          {user ? (
            <Link to={DEFAULT_NAV_ROUTE}>
              <Button className="shadow-none">Dashboard</Button>
            </Link>
          ) : (
            <Link to="/auth/signup">
              <Button className="shadow-none">Sign Up</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
