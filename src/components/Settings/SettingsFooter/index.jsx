import React from "react";
import styles from "../style.module.css";
import Spinner from "@/utils/components/Spinner";

const SettingsFooter = ({
  cancelBtnText = "Cancel",
  saveBtnText = "Save",
  onDelete,
  onCancel,
  onSave,
  showDeleteBtn = false,
  isLoading = false,
}) => {
  return (
    <div className={styles.settingsFooter}>
      {showDeleteBtn && (
        <button className={`btn ${styles.deleteBtn}`} onClick={onDelete}>
          Delete Account
        </button>
      )}
      <button className={`btn ${styles.cancelBtn}`} onClick={onCancel}>
        {cancelBtnText}
      </button>
      <button
        className={`btn btn--primary ${styles.saveBtn}`}
        onClick={onSave}
        disabled={isLoading}
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
