import styles from "@/components/Layout/style.module.css";
import { Outlet } from "react-router";
import { Toast } from "@/utils/components/Toast";

const AuthLayout = () => {
  return (
    <>
      <Toast />
      <main className={styles.main}>
        <div className={styles.authContainer}>
          <div className={`card ${styles.formWrapper}`}>
            <div className="card__body">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
