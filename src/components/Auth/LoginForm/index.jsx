import React, { useState } from "react";
import { signInWithEmail } from "@/db/apis/auth";
import styles from "@/components/Auth/style.module.css";
import { Link } from "react-router";
import FormItem from "@/utils/components/FormItem";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await signInWithEmail(formValues);
    console.info(response);
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleLoginSubmit}>
        <FormItem.Input
          type="email"
          id="loginEmail"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          required
          placeholder="Enter email"
        />
        <FormItem.Input
          type="password"
          id="loginPassword"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          required
          placeholder="Enter password"
        />
        <button type="submit" className={`btn ${styles.submitButton}`}>
          Login
        </button>
      </form>
      <div className={styles.footer}>
        <div className={styles.redirectLink}>
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
