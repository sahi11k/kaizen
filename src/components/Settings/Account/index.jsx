import React from "react";
import styles from "../style.module.css";
import { FormItemWrapper } from "@/utils/components/FormItem";

const Account = () => {
  return (
    <div className={styles.account}>
      <form>
        <FormItemWrapper className={styles.formItem}>
          <label>Email</label>
          <input type="email" name="email" value="user@example.com" disabled />
        </FormItemWrapper>
        <FormItemWrapper className={styles.formItem}>
          <label>Display Name</label>
          <input type="text" name="displayName" value="John Doe" disabled />
        </FormItemWrapper>
        {/* <FormItemWrapper className={styles.formItem}>
          <label>Delete Account</label>
          <button type="button" className={styles.deleteAccountButton}>
            Delete Account
          </button>
        </FormItemWrapper> */}
      </form>
    </div>
  );
};

export default Account;
