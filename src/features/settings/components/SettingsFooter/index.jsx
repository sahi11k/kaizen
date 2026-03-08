import React from "react";
import styles from "../style.module.css";
import { Button } from "@/shared/ui";

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
      <Button
        className={`btn ${styles.cancelBtn}`}
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelBtnText}
      </Button>
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
