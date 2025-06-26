import React, { useState } from "react";
import styles from "./style.module.css";
import { signInWithEmail } from "@/db/apis/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signInWithEmail(email);
    console.info(response);
  };

  return (
    <div className={styles.container}>
      <div className={`card ${styles.formWrapper}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign in into your account</h1>
        </div>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className={`btn ${styles.loginButton}`}>
              Email me a login link
            </button>
          </form>
        </div>
        <div className={styles.divider}>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <div className={styles.footer}>
          <button className={`btn ${styles.footerButton}`}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
