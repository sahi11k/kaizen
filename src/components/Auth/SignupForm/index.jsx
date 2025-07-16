import React, { useState } from "react";
import styles from "@/components/Auth/style.module.css";
import { Link } from "react-router";
import FormItem from "@/utils/components/FormItem";
import { ErrorText } from "@/components/Auth/ErrorText";
import { signUpNewUser } from "@/db/apis/auth";
import Spinner from "@/utils/components/Spinner";
import { Toast } from "@/utils/components/Toast";
import OTPVerification from "@/components/Auth/OtpVerification";
import GoogleLogin from "@/components/Auth/GoogleLogin";
import OrDivider from "@/components/Auth/OrDivider";

const { toast } = Toast;

const SignupForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;
    setLoading(true);
    const response = await signUpNewUser(formValues);
    setLoading(false);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    setShowOtpScreen(true);
  };

  const handleChange = (field, value) => {
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
    setFormValues({ ...formValues, [field]: value });
  };

  const validateField = (field, value) => {
    const trimmedValue = value?.trim();
    switch (field) {
      case "name":
        if (!trimmedValue || !trimmedValue?.length)
          return "Please enter a valid name";
        if (trimmedValue?.length > 50)
          return "Name must be less than 50 characters";
        return "";
      case "email":
        if (trimmedValue?.includes("@") && trimmedValue?.includes("."))
          return "";
        return "Please enter a valid email";
      case "password":
        if (trimmedValue?.length >= 6 && trimmedValue?.length <= 32) return "";
        return "Password must be between 6 and 32 characters";
    }
  };

  if (showOtpScreen) {
    return (
      <OTPVerification
        email={formValues.email}
        onBack={() => setShowOtpScreen(false)}
        backBtnText="Back to Sign Up"
      />
    );
  }

  return (
    <>
      {/* <GoogleLogin />
      <OrDivider /> */}
      <form onSubmit={handleSubmit}>
        <FormItem.Input
          type="text"
          id="signupName"
          value={formValues.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          placeholder="Enter name"
        />
        {errors.name && <ErrorText error={errors.name} />}
        <FormItem.Input
          type="email"
          id="signupEmail"
          value={formValues.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          placeholder="Enter email"
        />
        {errors.email && <ErrorText error={errors.email} />}
        <FormItem.Password
          type="password"
          id="signupPassword"
          value={formValues.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          placeholder="Enter password"
        />
        {errors.password && <ErrorText error={errors.password} />}
        <button type="submit" className={`btn ${styles.submitButton}`}>
          {loading && (
            <span className="btn__icon">
              <Spinner />
            </span>
          )}
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
    </>
  );
};

export default SignupForm;
