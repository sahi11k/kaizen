import React from "react";
import styles from "../style.module.css";
import { getUserDisplayName } from "@/utils/utils";

const ProfileTrigger = ({ user, collapsed }) => {
  const displayName = getUserDisplayName(user);
  return (
    <div
      className={`${styles.sideNav__navItem} ${styles.sideNav__profileTrigger}`}
    >
      <div className={styles.sideNav__profileAvatar}>
        {displayName?.charAt(0)}
      </div>
      {!collapsed && (
        <div className={styles.sideNav__profileInfo}>
          <span className={styles.sideNav__profileName}>{displayName}</span>
          <span className={styles.sideNav__profileEmail}>{user?.email}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileTrigger;
