import React from "react";
import UpdatePasswordForm from "@/components/Auth/UpdatePasswordForm";
import { AUTH_HEADER_TEXT } from "@/constants/auth";
import AuthFormContainer from "@/components/Auth/AuthFormContainer";
import { TAB_TITLES } from "@/constants/routes";
import useTabTitle from "@/hooks/useTabTitle";

const UpdatePassword = () => {
  useTabTitle(TAB_TITLES.UPDATE_PASSWORD);

  return (
    <AuthFormContainer headerText={AUTH_HEADER_TEXT.updatePassword}>
      <UpdatePasswordForm />
    </AuthFormContainer>
  );
};

export default UpdatePassword;
