import React from "react";
import { Link } from "react-router";
import useAuthStore from "@/store/auth";
import { Button } from "@/components/ui/button";
import LogoIcon from "@/assets/icons/logo.svg?react";

const HeaderNav = () => {
  const { user } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 xl:px-8">
      <Link to="/">
        <Button
          variant="link"
          className="text-text text-lg md:text-xl xl:text-2xl font-semibold"
        >
          <LogoIcon className="fill-primary !w-6 !h-6 lg:!w-8 lg:!h-8" />
          <span>kaïzen</span>
        </Button>
      </Link>
      {user ? (
        <Link to="/dashboard">
          <Button variant="link">Dashboard</Button>
        </Link>
      ) : (
        <Link to="/auth/login">
          <Button variant="link">Login</Button>
        </Link>
      )}
    </header>
  );
};

export default HeaderNav;
