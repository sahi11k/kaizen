import React from "react";
import { Link } from "react-router";
import useAuthStore from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const HeaderMain = () => {
  const { user } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 xl:px-8">
      <Logo size="md" />
      {user ? (
        <Link to="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      ) : (
        <Link to="/auth/login">
          <Button variant="link">Login</Button>
        </Link>
      )}
    </header>
  );
};

export default HeaderMain;
