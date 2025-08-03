import React from "react";
import GoogleIcon from "@/assets/icons/google.svg?react";
import styles from "./style.module.css";

const GoogleLogin = () => {
  return (
    <div className={styles.googleSignin}>
      <button className="btn" onClick={() => {}}>
        <span>
          <GoogleIcon />
        </span>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
