import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "@/components/Auth/OtpVerification/style.module.css";
import authStyles from "@/components/Auth/style.module.css";
import FormItem from "@/utils/components/FormItem";
import { verifyOTP, resendOTP } from "@/db/apis/auth";
import { Toast } from "@/utils/components/Toast";
import Spinner from "@/utils/components/Spinner";
import useAuthStore from "@/store/auth";

const { toast } = Toast;

const RESEND_OTP_TIME = 60;

const OTPVerification = ({ onBack, email, backBtnText }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_OTP_TIME);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const resetForm = () => {
    setOtp("");
    setIsLoading(false);
    setResendTimer(RESEND_OTP_TIME);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await verifyOTP({
      email,
      token: otp,
    });

    if (res.error) {
      toast.error(res.error);
      setIsLoading(false);
      return;
    }

    if (res.data.user) {
      toast.success("Email verified successfully!");
      setUser(res.data.user);
      resetForm(); // Reset form before navigation
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 500);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    const res = await resendOTP({ email });
    setIsLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("OTP sent successfully! Check your email.");
      setResendTimer(RESEND_OTP_TIME);
      setOtp(""); // Clear OTP input after resend
    }
  };

  return (
    <>
      <div className={styles.otpHeader}>
        <h2>Verify Your Email</h2>
        <p>Enter the 6-digit verification code sent to your email.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormItem.Input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Enter 6-digit OTP"
          maxLength="6"
        />
        <button
          type="submit"
          className={`btn ${
            otp.length === 6 ? authStyles.submitButton : authStyles.disabled
          }`}
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? (
            <span className="btn__icon">
              <Spinner />
            </span>
          ) : (
            ""
          )}
          Verify Email
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
              disabled={resendTimer > 0 || isLoading}
            >
              Resend OTP{" "}
              {resendTimer > 0
                ? `${String(resendTimer).padStart(2, "0")} secs`
                : ""}
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
            {backBtnText}
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
