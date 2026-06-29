import { Logo } from "@/shared/ui";

const AuthFormContainer = ({ headerText, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen sm:p-6">
      <div className="gap-6 flex flex-col flex-1 border-border sm:border lg:border-none max-w-md rounded-lg lg:rounded-none sm:px-4 sm:py-6">
        <div className="flex justify-center items-center flex-col gap-2 xl:gap-4">
          <Logo
            showText={false}
            iconClassName="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
            link="/"
          />
          <div className="heading-3">{headerText}</div>
        </div>
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default AuthFormContainer;
