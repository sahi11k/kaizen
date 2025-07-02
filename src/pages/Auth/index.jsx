import styles from "./style.module.css";
import { Outlet } from "react-router";
import GoogleIcon from "@/assets/icons/google.svg?react";

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={`card ${styles.formWrapper}`}>
        <div className="card__body">
          <div className={styles.googleSignin}>
            <button className="btn" onClick={() => {}}>
              <span>
                <GoogleIcon />
              </span>
              Sign in with Google
            </button>
          </div>
          <div className={styles.divider}>
            <hr />
            <span>or</span>
            <hr />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
