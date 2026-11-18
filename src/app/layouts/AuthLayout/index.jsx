import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="h-full w-full flex">
      <div className="bg-primary flex-6 items-center justify-center hidden lg:flex">
        <div className="text-primary-foreground items-start flex flex-col">
          <span className="heading-0 mb-10">改 善</span>
          <span className="heading-4 !text-primary-foreground">Kaizen</span>
          <div className="body-base !text-primary-subtle-foreground flex flex-col mt-3 mb-1">
            <span>/kai&apos;zen/</span>
            <span className="italic">noun (from Japanese)</span>
          </div>
          <span className="body-base !text-primary-foreground">
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
