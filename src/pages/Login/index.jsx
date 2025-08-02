import React from "react";
import LoginForm from "@/components/Auth/LoginForm";
import GoogleLogin from "@/components/Auth/GoogleLogin";
import OrDivider from "@/components/Auth/OrDivider";
import useAuthStore from "@/store/auth";
import { Navigate } from "react-router";

const Login = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* <GoogleLogin />
      <OrDivider /> */}
      <LoginForm />
    </>
  );
};

export default Login;
