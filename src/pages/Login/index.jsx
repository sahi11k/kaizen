import React, { useState } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import useAuthStore from "@/store/auth";
import { Navigate } from "react-router";
import { AUTH_HEADER_TEXT } from "@/constants/auth";
import AuthFormContainer from "@/components/Auth/AuthFormContainer";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";

const Login = () => {
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showResetPasswordScreen, setShowResetPasswordScreen] = useState(false);
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to={DEFAULT_NAV_ROUTE} replace />;
  }

  return (
    <AuthFormContainer
      headerText={renderHeaderText({ showOtpScreen, showResetPasswordScreen })}
    >
      <LoginForm
        showOtpScreen={showOtpScreen}
        setShowOtpScreen={setShowOtpScreen}
        showResetPasswordScreen={showResetPasswordScreen}
        setShowResetPasswordScreen={setShowResetPasswordScreen}
      />
    </AuthFormContainer>
  );
};

const renderHeaderText = ({ showOtpScreen, showResetPasswordScreen }) => {
  if (showOtpScreen) {
    return AUTH_HEADER_TEXT.verifyEmail;
  }
  if (showResetPasswordScreen) {
    return AUTH_HEADER_TEXT.resetPassword;
  }
  return AUTH_HEADER_TEXT.login;
};

export default Login;
