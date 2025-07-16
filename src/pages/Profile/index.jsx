import React from "react";
import UserProfile from "@/components/UserProfile";
import UserAnalytics from "@/components/UserAnalytics";
import styles from "./style.module.css";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <UserProfile />
      <UserAnalytics />
    </div>
  );
};

export default Profile;
