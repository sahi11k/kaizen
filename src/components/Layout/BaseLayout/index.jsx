import React, { useEffect } from "react";
import useAuthStore from "@/store/auth";
import { STATUS } from "@/utils/constants";
import Fallback from "@/utils/components/Fallback";
import { Toast } from "@/utils/components/Toast";
import styles from "@/components/Layout/style.module.css";

const BaseLayout = ({ children, className }) => {
  const { userFetchStatus, loadUser, user } = useAuthStore();

  useEffect(() => {
    if (userFetchStatus === STATUS.LOADING && !user) {
      loadUser();
    }
  }, [loadUser, userFetchStatus, user]);

  if (userFetchStatus === STATUS.LOADING) {
    return <Fallback />;
  }

  return (
    <div className={`${styles.baseLayoutContainer} ${className}`}>
      {children}
      <Toast />
    </div>
  );
};

export default BaseLayout;
