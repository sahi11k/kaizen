import React from "react";
import styles from "../style.module.css";
import { Button } from "@/components/ui/button";

const SettingsFooter = ({
  cancelBtnText = "Cancel",
  saveBtnText = "Save",
  onCancel,
  onSave,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <div className={styles.settingsFooter}>
      <button
        className={`btn ${styles.cancelBtn}`}
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelBtnText}
      </button>
      <Button
        className={`btn ${styles.saveBtn}`}
        onClick={onSave}
        disabled={isLoading || disabled}
        loading={isLoading}
      >
        {saveBtnText}
      </Button>
    </div>
  );
};

export default SettingsFooter;
