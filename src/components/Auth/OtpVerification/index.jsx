import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { verifyOTP, resendOTP } from "@/db/apis/auth";
import { Toast } from "@/components/ui/toast";
import useAuthStore from "@/store/auth";
import { Button } from "@/components/ui/button";
import { InputOTP } from "@/components/ui/input-otp";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";

const { toast } = Toast;

const RESEND_OTP_TIME = 60;

const OtpVerification = ({ onBack, email, backBtnText }) => {
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
        navigate(DEFAULT_NAV_ROUTE, { replace: true });
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
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="body-description text-center">
          Enter the 6-digit code we&apos;ve sent to your email.
        </label>
        <div className="flex flex-col items-center">
          <InputOTP
            id="otp"
            value={otp}
            onChange={(val) => setOtp(val)}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
          />
          <div className="body-description flex flex-wrap justify-center items-center">
            Didn&apos;t receive the code?
            <Button
              onClick={handleResendOTP}
              disabled={resendTimer > 0 || isLoading}
              variant="link"
              className="!p-0 !ml-2 body-description !no-underline"
            >
              Resend OTP{" "}
              {resendTimer > 0
                ? `${String(resendTimer).padStart(2, "0")} secs`
                : ""}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={otp.length !== 6 || isLoading}
        >
          Verify Email
        </Button>
      </form>
      <div className="flex justify-center flex-col items-center">
        <Button type="button" onClick={onBack} variant="link" className="!h-5">
          {backBtnText}
        </Button>
      </div>
    </div>
  );
};

export default OtpVerification;
