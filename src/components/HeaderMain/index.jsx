import React from "react";
import { Link } from "react-router";
import useAuthStore from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";

const HeaderMain = () => {
  const { user } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 xl:px-8">
      <Logo
        size="md"
        link={true}
        iconClassName="text-secondary"
        className="text-primary"
      />
      {user ? (
        <Link to={DEFAULT_NAV_ROUTE}>
          <Button variant="outline">Dashboard</Button>
        </Link>
      ) : (
        <Link to="/auth/login">
          <Button variant="outline">Login</Button>
        </Link>
      )}
    </header>
  );
};

export default HeaderMain;
