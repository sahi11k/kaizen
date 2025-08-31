import React from "react";
import UpdatePasswordForm from "@/components/Auth/UpdatePasswordForm";
import { AUTH_HEADER_TEXT } from "@/constants/auth";
import AuthFormContainer from "@/components/Auth/AuthFormContainer";

const UpdatePassword = () => {
  return (
    <AuthFormContainer headerText={AUTH_HEADER_TEXT.updatePassword}>
      <UpdatePasswordForm />
    </AuthFormContainer>
  );
};

export default UpdatePassword;
