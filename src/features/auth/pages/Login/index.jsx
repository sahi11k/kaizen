import React, { useState } from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import useAuthStore from "@/features/auth/store";
import { Navigate } from "react-router";
import { AUTH_HEADER_TEXT } from "@/features/auth/constants";
import AuthFormContainer from "@/features/auth/components/AuthFormContainer";
import { DEFAULT_NAV_ROUTE, BROWSER_TAB_TITLES } from "@/shared/constants";
import useTabTitle from "@/shared/hooks/useTabTitle";

const Login = () => {
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showResetPasswordScreen, setShowResetPasswordScreen] = useState(false);
  const { user } = useAuthStore();

  useTabTitle(BROWSER_TAB_TITLES.LOGIN);

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
