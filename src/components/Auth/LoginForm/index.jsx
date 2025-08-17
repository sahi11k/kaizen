import React, { useState } from "react";
import { loginWithEmail, resendOTP } from "@/db/apis/auth";
import styles from "@/components/Auth/style.module.css";
import { Link, useNavigate } from "react-router";
import FormItem from "@/utils/components/FormItem";
import { Toast } from "@/utils/components/Toast";
import { EMAIL_NOT_VERIFIED_ERROR } from "@/utils/constants";
import OtpVerification from "@/components/Auth/OtpVerification";
import Spinner from "@/utils/components/Spinner";
import useAuthStore from "@/store/auth";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showResetPasswordScreen, setShowResetPasswordScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
    setShowOtpScreen(false);
    setIsLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await loginWithEmail(formValues);

    if (response.error) {
      if (response.error === EMAIL_NOT_VERIFIED_ERROR) {
        await sendOtp();
        setIsLoading(false);
        return;
      }
      toast.error(response.error);
      setIsLoading(false);
      return;
    }
    if (response.data.user) {
      setUser(response.data.user);
      setIsLoading(false);
      resetForm(); // Reset form before navigation
      navigate("/dashboard", { replace: true });
    }
  };

  const sendOtp = async () => {
    const response = await resendOTP({ email: formValues.email });
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("OTP sent successfully! Check your email.");
      setShowOtpScreen(true);
    }
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        email={formValues.email}
        onBack={() => setShowOtpScreen(false)}
        backBtnText="Back to Login"
      />
    );
  }

  if (showResetPasswordScreen) {
    return (
      <ResetPasswordForm
        onBack={() => setShowResetPasswordScreen(false)}
        defaultEmail={formValues.email}
      />
    );
  }

  return (
    <>
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
        <FormItem.Password
          type="password"
          id="loginPassword"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          required
          placeholder="Enter password"
        />
        <button
          type="button"
          className={`btn ${styles.forgotPasswordLink}`}
          onClick={() => setShowResetPasswordScreen(true)}
        >
          Forgot password?
        </button>
        <button type="submit" className={`btn ${styles.submitButton}`}>
          {isLoading && (
            <span className="btn__icon">
              <Spinner />
            </span>
          )}
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
    </>
  );
};

export default LoginForm;
