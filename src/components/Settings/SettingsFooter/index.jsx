import React from "react";
import styles from "../style.module.css";
import Spinner from "@/utils/components/Spinner";

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
      <button
        className={`btn ${styles.saveBtn}`}
        onClick={onSave}
        disabled={isLoading || disabled}
      >
        {isLoading && (
          <span className="btn__icon">
            <Spinner />
          </span>
        )}
        {saveBtnText}
      </button>
    </div>
  );
};

export default SettingsFooter;
