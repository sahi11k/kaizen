import React from "react";
import styles from "../style.module.css";
import { FormItemWrapper } from "@/utils/components/FormItem";

const General = () => {
  return (
    <div className={styles.general}>
      <form>
        <FormItemWrapper className={styles.formItem}>
          <label>Theme</label>
          <input type="text" name="theme" value="Dark" disabled />
        </FormItemWrapper>
        <FormItemWrapper className={styles.formItem}>
          <label>Language</label>
          <input type="text" name="language" value="English" disabled />
        </FormItemWrapper>
      </form>
    </div>
  );
};

export default General;
