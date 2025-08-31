import { Logo } from "@/components/ui/logo";

const AuthFormContainer = ({ headerText, children }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center max-w-md sm:rounded-xl sm:px-4 sm:py-8 sm:bg-background gap-6">
      <div className="flex justify-center items-center flex-col gap-2 xl:gap-4">
        <div className="rounded-full bg-primary flex justify-center items-center w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14">
          <Logo showText={false} iconClassName="!text-white" />
        </div>
        <div className="heading-3">{headerText}</div>
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
};

export default AuthFormContainer;
