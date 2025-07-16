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

const { toast } = Toast;

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

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
      navigate("/", { replace: true });
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
