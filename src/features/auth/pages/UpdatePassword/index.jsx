import React from "react";
import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm";
import { AUTH_HEADER_TEXT } from "@/features/auth/constants/auth";
import AuthFormContainer from "@/features/auth/components/AuthFormContainer";
import { TAB_TITLES } from "@/shared/constants/routes";
import useTabTitle from "@/shared/hooks/useTabTitle";

const UpdatePassword = () => {
  useTabTitle(TAB_TITLES.UPDATE_PASSWORD);

  return (
    <AuthFormContainer headerText={AUTH_HEADER_TEXT.updatePassword}>
      <UpdatePasswordForm />
    </AuthFormContainer>
  );
};

export default UpdatePassword;
