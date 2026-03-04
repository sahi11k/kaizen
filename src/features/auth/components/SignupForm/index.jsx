import React, { useState } from "react";
import { Link } from "react-router";
import { signUpNewUser } from "@/features/auth/api";
import { Toast, Input, Button } from "@/shared/ui";
import OtpVerification from "@/features/auth/components/OtpVerification";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import AuthDivider from "@/features/auth/components/AuthDivider";
import { ErrorText } from "@/features/auth/components/ErrorText";
import { validateField } from "@/features/auth/utils";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  name: "",
  email: "",
  password: "",
};

const DEFAULT_ERRORS = {
  name: "",
  email: "",
  password: "",
};

const SignupForm = ({ showOtpScreen, setShowOtpScreen }) => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;

    setLoading(true);
    try {
      await signUpNewUser(formValues);
      toast.success("Account created successfully! Please verify your email.");
      setShowOtpScreen(true);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleChange = (field, value) => {
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
    setFormValues({ ...formValues, [field]: value });
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        email={formValues.email}
        onBack={() => setShowOtpScreen(false)}
        backBtnText="Back to Sign Up"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <GoogleSignInButton />
      <AuthDivider />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          id="signupName"
          value={formValues.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          placeholder="Enter name"
        />
        {errors.name && <ErrorText error={errors.name} />}
        <Input
          type="email"
          id="signupEmail"
          value={formValues.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          placeholder="Enter email"
        />
        {errors.email && <ErrorText error={errors.email} />}
        <Input
          type="password"
          id="signupPassword"
          value={formValues.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          placeholder="Enter password"
        />
        {errors.password && <ErrorText error={errors.password} />}
        <Button type="submit" loading={loading} className="mt-2">
          Sign Up
        </Button>
      </form>
      <div className="text-sm text-center">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-link ml-1 underline-offset-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
