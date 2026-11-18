import React, { useState } from "react";
import { resetPassword } from "@/features/auth/api";
import { Toast, Input, Button } from "@/shared/ui";

const { toast } = Toast;

const ResetPasswordForm = ({ onBack, defaultEmail = "" }) => {
  const [email, setEmail] = useState(defaultEmail || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword({ email });
      toast.success(
        "Please check your email for a link to reset your password.",
      );
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="body-base px-2">
          Enter the email associated with your account, and we’ll send you a
          password reset link
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email"
        />
        <Button
          type="submit"
          loading={isLoading}
          disabled={email.length === 0 || isLoading}
          className="mt-2"
        >
          Send Reset Link
        </Button>
      </form>
      <div className="flex justify-center">
        <Button type="button" onClick={onBack} variant="link" className="!h-5">
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
