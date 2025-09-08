import React, { useState } from "react";
import SignupForm from "@/components/Auth/SignupForm";
import { AUTH_HEADER_TEXT } from "@/constants/auth";
import AuthFormContainer from "@/components/Auth/AuthFormContainer";

const Signup = () => {
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const headerText = showOtpScreen
    ? AUTH_HEADER_TEXT.verifyEmail
    : AUTH_HEADER_TEXT.signup;

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
