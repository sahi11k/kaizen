import React from "react";
import LoginForm from "@/components/Auth/LoginForm";
import GoogleLogin from "@/components/Auth/GoogleLogin";
import OrDivider from "@/components/Auth/OrDivider";

const Login = () => {
  return (
    <>
      {/* <GoogleLogin />
      <OrDivider /> */}
      <LoginForm />
    </>
  );
};

export default Login;
