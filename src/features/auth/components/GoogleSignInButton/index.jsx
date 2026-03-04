import React, { useState } from "react";
import { signInWithGoogle } from "@/features/auth/api";
import { Button, Toast } from "@/shared/ui";
import GoogleIcon from "@/assets/icons/google.svg?react";

const { toast } = Toast;

const GoogleSignInButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(error.message || "Failed to sign in with Google");
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      loading={loading}
      icon={<GoogleIcon />}
      onClick={handleClick}
      className="w-full h-12 bg-white bg-background sm:bg-white sm:dark:bg-card"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
