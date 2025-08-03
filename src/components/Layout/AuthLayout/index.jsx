import styles from "@/components/Layout/style.module.css";
import { Outlet } from "react-router";
import Logo from "@/utils/components/Logo";
import BaseLayout from "@/components/Layout/BaseLayout";

const AuthLayout = () => {
  return (
    <BaseLayout>
      <main className={styles.main}>
        <div className={styles.authContainer}>
          <div className={`card ${styles.formWrapper}`}>
            <div className={styles.authLogoHeader}>
              <Logo size="medium" showText />
            </div>
            <div className="card__body">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

export default AuthLayout;
