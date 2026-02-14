import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background sm:bg-card dark:sm:bg-background">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
