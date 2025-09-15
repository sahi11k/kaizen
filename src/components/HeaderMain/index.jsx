import React from "react";
import { Link } from "react-router";
import useAuthStore from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";

const HeaderMain = () => {
  const { user } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 xl:px-16 max-w-8xl mx-auto sticky top-0 bg-background z-10">
      <Logo size="md" link={true} className="text-primary" />
      {user ? (
        <Link to={DEFAULT_NAV_ROUTE}>
          <Button variant="secondary" rounded>
            Dashboard
          </Button>
        </Link>
      ) : (
        <Link to="/auth/signup">
          <Button variant="secondary" rounded>
            Sign Up
          </Button>
        </Link>
      )}
    </header>
  );
};

export default HeaderMain;
