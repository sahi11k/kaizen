import useAuthStore from "@/store/auth";
import React from "react";
import styles from "./style.module.css";

const HeaderWidget = () => {
  const { user } = useAuthStore();
  const displayName = user?.user_metadata?.display_name || "Friend";

  const { greeting, subtitle } = getTimeBasedGreeting();

  return (
    <div className={styles.header}>
      <div className={styles.greetingContainer}>
        <h1 className={styles.greeting}>
          <span className={styles.greetingText}>{greeting},</span>{" "}
          <span className={styles.displayName}>{displayName}!</span>
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

// Function to get time-based greeting
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return {
      greeting: "Good Morning",
      subtitle: "Time for some coffee and productivity!",
    };
  } else if (hour >= 12 && hour < 18) {
    return {
      greeting: "Good Afternoon",
      subtitle: "Let's crush those goals!",
    };
  } else {
    return {
      greeting: "Good Evening",
      subtitle: "Time to wind down and reflect!",
    };
  }
};

export default HeaderWidget;
