import React, { useState } from "react";
import { loginWithEmail, resendOTP } from "@/features/auth/api";
import { Link, useNavigate } from "react-router";
import { Toast, Input, Button } from "@/shared/ui";
import { EMAIL_NOT_VERIFIED_ERROR } from "@/features/auth/constants";
import OtpVerification from "@/features/auth/components/OtpVerification";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import AuthDivider from "@/features/auth/components/AuthDivider";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  email: "",
  password: "",
};

const LoginForm = ({
  showOtpScreen,
  setShowOtpScreen,
  showResetPasswordScreen,
  setShowResetPasswordScreen,
}) => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
    setShowOtpScreen(false);
    setIsLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginWithEmail(formValues);
      if (response.data.user) {
        resetForm();
        navigate(DEFAULT_NAV_ROUTE, { replace: true });
      }
    } catch (error) {
      if (error.message === EMAIL_NOT_VERIFIED_ERROR) {
        await sendOtp();
      } else {
        toast.error(error.message);
      }
    }
    setIsLoading(false);
  };

  const sendOtp = async () => {
    try {
      await resendOTP({ email: formValues.email });
      toast.success("OTP sent successfully! Check your email.");
      setShowOtpScreen(true);
    } catch (error) {
      toast.error(error.message);
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
    <div className="flex flex-col gap-6">
      <GoogleSignInButton />
      <AuthDivider />
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          id="loginEmail"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          required
          placeholder="Enter email"
        />
        <div className="flex flex-col">
          <Input
            type="password"
            id="loginPassword"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            required
            placeholder="Enter password"
          />
          <Button
            type="button"
            variant="link"
            onClick={() => setShowResetPasswordScreen(true)}
            className="self-end !h-6"
          >
            Forgot password?
          </Button>
        </div>
        <Button type="submit" loading={isLoading} className="mt-1">
          Login
        </Button>
      </form>
      <div className="text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link to="/auth/signup" className="text-link ml-1 underline-offset-2">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
