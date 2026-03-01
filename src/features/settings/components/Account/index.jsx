import React, { useCallback, useEffect, useState } from "react";
import styles from "../style.module.css";

import useAuthStore from "@/features/auth/store/auth";
import { toast } from "sonner"; // Assuming you're using sonner for toasts
import { updateUserMetadata } from "@/features/auth/api/auth";

const Account = () => {
  const { user } = useAuthStore();
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
    try {
      const res = await updateUserMetadata({
        display_name: accountFormValues.displayName,
      });
      if (res.data.user) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
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

  const handleDeleteAccountConfirmChange = (e) => {
    setAccountFormValues({
      ...accountFormValues,
      deleteAccountConfirm: e.target.value,
    });
  };

  return (
    <div className={styles.account}>
      {/* <form>
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
        </FormItemWrapper> */}
      {/* <FormItemWrapper className={styles.formItem}>
          <label>Password</label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <DefaultFormItem.Password
              type="text"
              name="password"
              value={accountFormValues.password}
              onChange={handleFormChange}
            />
            <DefaultFormItem.Password
              type="text"
              name="password"
              value={accountFormValues.password}
              onChange={handleFormChange}
            />
          </div>
        </FormItemWrapper> */}
      {/* </form>
      <hr className={styles.divider} />
      <div className={styles.deleteAccount}>
        <h3 className={styles.deleteAccountTitle}>Delete Account</h3>
        <p className={styles.deleteAccountDescription}>
          Deleting your account will permanently remove all your data from the
          system. This cannot be undone.
        </p>
        <span className={styles.deleteAccountConfirmText}>
          To confirm this, please type <strong>DELETE</strong> below.
        </span>
        <div className={styles.deleteAccountConfirm}>
          <DefaultFormItem.Input
            type="text"
            name="deleteAccountConfirm"
            value={accountFormValues.deleteAccountConfirm}
            onChange={handleDeleteAccountConfirmChange}
            placeholder="DELETE"
            style={{ width: "100%" }}
          />
          <button className={`btn ${styles.deleteBtn}`} onClick={() => {}}>
            Delete Account
          </button>
        </div>
      </div>
      <SettingsFooter
        onCancel={handleFormCancel}
        onSave={handleFormSubmit}
        isLoading={isLoading}
      /> */}
    </div>
  );
};

export default Account;
