import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "@/components/Auth/OtpVerification/style.module.css";
import authStyles from "@/components/Auth/style.module.css";
import FormItem from "@/utils/components/FormItem";
import { ErrorText } from "@/components/Auth/ErrorText";
import { verifyOTP, resendOTP } from "@/db/apis/auth";
import { Toast } from "@/utils/components/Toast";

const { toast } = Toast;

const OTPVerification = ({ onBack, email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await verifyOTP({ email, token: otp });

      if (response.error) {
        setError(response.error.message || "Invalid OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      if (response.data.user) {
        toast.success("Email verified successfully! Welcome!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await resendOTP({ email });

      if (response.error) {
        setError(response.error.message || "Failed to resend OTP");
        setIsResending(false);
        return;
      }

      toast.success("OTP sent successfully! Check your email.");
      setResendTimer(60); // 60 seconds countdown
    } catch (error) {
      console.error("Resend OTP error:", error);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (error) setError("");
  };

  return (
    <>
      <div className={styles.otpHeader}>
        <h2>Verify Your Email</h2>
        <p>
          Enter the 6-digit verification code sent to your email. This code is
          valid for the next 10 minutes.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormItem.Input
          type="text"
          id="otp"
          value={otp}
          onChange={handleOTPChange}
          required
          placeholder="Enter 6-digit OTP"
          maxLength="6"
        />
        {error && <ErrorText error={error} />}

        <button
          type="submit"
          className={`btn ${authStyles.submitButton}`}
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <div className={styles.footer}>
        <div className={styles.resendSection}>
          <p>
            Didn&apos;t receive the code?
            <button
              type="button"
              className={`${styles.resendButton}`}
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          </p>
        </div>
        <div className={styles.redirectLink}>
          <button
            type="button"
            className={`btn ${styles.backButton}`}
            onClick={onBack}
          >
            <span className="btn__icon">←</span>
            Back to Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
