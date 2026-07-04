import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="h-full w-full flex">
      <div className="bg-primary flex-7 items-center justify-center hidden lg:flex">
        <div className="text-primary-foreground items-start flex flex-col">
          <span className="text-[clamp(100px,16vw,180px)] font-bold leading-none mb-10">
            改 善
          </span>
          <span className="mt-6 text-5xl font-bold font-heading leading-none">Kaizen</span>
          <span className="mt-3 text-xl text-primary-foreground/50">/kai&apos;zen/</span>
          <span className="mt-2 text-lg italic text-primary-foreground/50">noun (from Japanese)</span>
          <span className="mt-1 text-xl text-primary-foreground">
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
