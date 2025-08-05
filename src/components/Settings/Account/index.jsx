import React, { useCallback, useEffect, useState } from "react";
import styles from "../style.module.css";
import { FormItemWrapper } from "@/utils/components/FormItem";
import SettingsFooter from "@/components/Settings/SettingsFooter";
import useAuthStore from "@/store/auth";
import { toast } from "sonner"; // Assuming you're using sonner for toasts
import { updateUserMetadata } from "@/db/apis/auth";

const Account = () => {
  const { user, setUser } = useAuthStore();
  const [accountFormValues, setAccountFormValues] = useState({
    email: "",
    displayName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const getDefaultUserValues = useCallback(() => {
    return {
      email: user?.email || "",
      displayName: user?.user_metadata?.display_name || "",
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      setAccountFormValues(getDefaultUserValues());
    }
  }, [user, getDefaultUserValues]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await updateUserMetadata({
      display_name: accountFormValues.displayName,
    });

    if (res.error) {
      toast.error(res.errorMessage || "Failed to update profile");
    } else if (res.data.user) {
      setUser(res.data.user);
      toast.success("Profile updated successfully");
    }
    setIsLoading(false);
  };

  const handleFormCancel = () => {
    setAccountFormValues(getDefaultUserValues());
  };

  const handleFormChange = (e) => {
    setAccountFormValues({
      ...accountFormValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.account}>
      <form>
        <FormItemWrapper className={styles.formItem}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={accountFormValues.email}
            disabled
          />
        </FormItemWrapper>
        <FormItemWrapper className={styles.formItem}>
          <label>Display Name</label>
          <input
            type="text"
            name="displayName"
            value={accountFormValues.displayName}
            onChange={handleFormChange}
          />
        </FormItemWrapper>
      </form>
      <SettingsFooter
        onCancel={handleFormCancel}
        onSave={handleFormSubmit}
        // showDeleteBtn
        isLoading={isLoading}
      />
    </div>
  );
};

export default Account;
