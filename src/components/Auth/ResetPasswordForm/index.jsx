import React, { useState } from "react";
import styles from "@/components/Auth/OtpVerification/style.module.css";
import authStyles from "@/components/Auth/style.module.css";
import FormItem from "@/utils/components/FormItem";
import { resetPassword } from "@/db/apis/auth";
import { Toast } from "@/utils/components/Toast";
import Spinner from "@/utils/components/Spinner";

const { toast } = Toast;

const ResetPasswordForm = ({ onBack, defaultEmail = "" }) => {
  const [email, setEmail] = useState(defaultEmail || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await resetPassword({ email });
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(
        "Please check your email for a link to reset your password."
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.otpHeader}>
        <h2>Reset Your Password</h2>
        <p>
          Enter the email associated with your account and we&apos;ll send you a
          link to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormItem.Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email"
        />
        <button
          type="submit"
          className={`btn ${
            email.length > 0 ? authStyles.submitButton : authStyles.disabled
          }`}
          disabled={email.length === 0 || isLoading}
        >
          {isLoading ? (
            <span className="btn__icon">
              <Spinner />
            </span>
          ) : (
            ""
          )}
          Send Reset Link
        </button>
      </form>
      <div className={styles.footer}>
        <div className={styles.redirectLink}>
          <button
            type="button"
            className={`btn ${styles.backButton}`}
            onClick={onBack}
          >
            <span className="btn__icon">←</span>
            Back to Login
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
