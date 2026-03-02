import React, { useState } from "react";
import SignupForm from "@/features/auth/components/SignupForm";
import { AUTH_HEADER_TEXT } from "@/features/auth/constants";
import AuthFormContainer from "@/features/auth/components/AuthFormContainer";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useTabTitle from "@/shared/hooks/useTabTitle";

const Signup = () => {
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const headerText = showOtpScreen
    ? AUTH_HEADER_TEXT.verifyEmail
    : AUTH_HEADER_TEXT.signup;

  useTabTitle(BROWSER_TAB_TITLES.SIGNUP);

  return (
    <AuthFormContainer headerText={headerText}>
      <SignupForm
        showOtpScreen={showOtpScreen}
        setShowOtpScreen={setShowOtpScreen}
      />
    </AuthFormContainer>
  );
};

export default Signup;
