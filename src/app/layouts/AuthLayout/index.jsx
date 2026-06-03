import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="h-full w-full flex">
      <div className="bg-primary flex-7 items-center justify-center hidden lg:flex">
        <div className="text-primary-foreground items-start flex flex-col">
          <span className="text-[clamp(100px,16vw,180px)] font-bold">
            改 善
          </span>
          <span className="mt-6 text-5xl font-bold leading-none">Kaizen</span>
          <span className="mt-3 text-xl">/kai&apos;zen/</span>
          <span className="mt-2 text-lg italic">noun (from Japanese)</span>
          <span className="mt-1 text-xl">
            The philosophy of continuous improvement.
          </span>
        </div>
      </div>
      <div className="flex-5 m-auto lg:m-0">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
