import React from "react";
import { Link } from "react-router";
import useAuthStore from "@/features/auth/store/auth";
import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/logo";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants/routes";

const HeaderMain = () => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 inset-x-0 z-50 flex justify-between items-center p-4 md:px-8 xl:px-16 max-w-8xl mx-auto bg-background">
      <Logo link={true} className="text-primary" />
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
