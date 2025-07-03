import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getUserSession } from "@/db/apis/auth";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const response = await getUserSession();
        // todo save user to state
        if (response?.data?.session) {
          navigate("/", { replace: true });
        } else {
          navigate("/auth/login", { replace: true });
        }
      } catch (error) {
        console.error(error);
        // TODO: show toaster error
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <div style={{ marginTop: "10px" }}>Please wait...</div>
    </div>
  );
};

export default AuthCallback;
