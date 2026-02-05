import { Outlet } from "react-router";
import BaseLayout from "@/app/layouts/BaseLayout";

const AuthLayout = () => {
  return (
    <BaseLayout>
      <main className="min-h-screen flex items-center justify-center sm:bg-card">
        <Outlet />
      </main>
    </BaseLayout>
  );
};

export default AuthLayout;
