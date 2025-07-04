import { toast, Toaster } from "sonner";
import styles from "./style.module.css";
import CheckFilled from "@/assets/icons/checkFilled.svg?react";
import ErrorFilled from "@/assets/icons/errorFilled.svg?react";

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: styles.toast,
        },
      }}
      icons={{
        success: (
          <IconWrapper>
            <CheckFilled />
          </IconWrapper>
        ),
        error: (
          <IconWrapper>
            <ErrorFilled />
          </IconWrapper>
        ),
      }}
    />
  );
};

const IconWrapper = ({ children }) => {
  return <span className={styles.toastIconWrapper}>{children}</span>;
};

Toast.toast = toast;
