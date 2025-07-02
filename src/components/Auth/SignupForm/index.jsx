import React, { useState } from "react";
import styles from "@/components/Auth/style.module.css";
import { Link } from "react-router";
import FormItem from "@/utils/components/FormItem";

const SignupForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className={styles.loginForm}>
      <form>
        <FormItem.Input
          type="text"
          id="signupName"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          required
          placeholder="Enter name"
        />
        <FormItem.Input
          type="email"
          id="signupEmail"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          required
          placeholder="Enter email"
        />
        <FormItem.Input
          type="password"
          id="signupPassword"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          required
          placeholder="Enter password"
        />
        <button type="submit" className={`btn ${styles.submitButton}`}>
          Sign Up
        </button>
      </form>
      <div className={styles.footer}>
        <div className={styles.redirectLink}>
          Already have an account?{" "}
          <Link to="/auth/login" className={styles.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
