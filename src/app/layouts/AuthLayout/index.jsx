import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center sm:bg-card">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
