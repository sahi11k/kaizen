import React, { useState } from "react";
import SignupForm from "@/components/Auth/SignupForm";
import { AUTH_HEADER_TEXT } from "@/constants/auth";
import AuthFormContainer from "@/components/Auth/AuthFormContainer";
import { TAB_TITLES } from "@/constants/routes";
import useTabTitle from "@/hooks/useTabTitle";

const Signup = () => {
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const headerText = showOtpScreen
    ? AUTH_HEADER_TEXT.verifyEmail
    : AUTH_HEADER_TEXT.signup;

  useTabTitle(TAB_TITLES.SIGNUP);

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
