import React from "react";
import UpdatePasswordForm from "@/components/Auth/UpdatePasswordForm";
import useAuthStore from "@/store/auth";
import { STATUS } from "@/utils/constants";
import { getUserSession } from "@/db/apis/auth";
import { useEffect } from "react";
import Fallback from "@/utils/components/Fallback";

const UpdatePassword = () => {
  const { userFetchStatus, setUserFetchStatus, setUser } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      const response = await getUserSession();
      if (response.error || !response.data.session) {
        setUser(null);
      } else if (response.data.session) {
        setUser(response.data.session.user);
      }
      setUserFetchStatus(STATUS.FETCHED);
    };
    if (userFetchStatus === STATUS.LOADING) {
      loadUser();
    }
  }, [setUser, setUserFetchStatus, userFetchStatus]);

  if (userFetchStatus === STATUS.LOADING) {
    return <Fallback />;
  }
  return <UpdatePasswordForm />;
};

export default UpdatePassword;
