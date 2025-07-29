import React from "react";
import UpdatePasswordForm from "@/components/Auth/UpdatePasswordForm";
import useAuthStore from "@/store/auth";
import { STATUS } from "@/utils/constants";
import { useEffect } from "react";
import Fallback from "@/utils/components/Fallback";

const UpdatePassword = () => {
  const { userFetchStatus, loadUser } = useAuthStore();

  useEffect(() => {
    if (userFetchStatus === STATUS.LOADING) {
      loadUser();
    }
  }, [userFetchStatus, loadUser]);

  if (userFetchStatus === STATUS.LOADING) {
    return <Fallback />;
  }
  return <UpdatePasswordForm />;
};

export default UpdatePassword;
