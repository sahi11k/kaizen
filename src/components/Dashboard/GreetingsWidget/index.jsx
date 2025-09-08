import useAuthStore from "@/store/auth";
import React from "react";
import styles from "./style.module.css";
import CoverImage from "@/assets/images/dashboard_cover.jpg";

const GreetingsWidget = () => {
  const { user } = useAuthStore();
  const displayName = user?.user_metadata?.display_name || "Friend";

  const { greeting, subtitle } = getTimeBasedGreeting();

  return (
    <div className={styles.greetingsWidget}>
      <div className={styles.greetingsWidget__greetings}>
        <h1 className={styles.greetingsWidget__greeting}>
          <span className={styles.greetingsWidget__greetingText}>
            {greeting},
          </span>{" "}
          <span className={styles.greetingsWidget__displayName}>
            {displayName}!
          </span>
        </h1>
        <p className={styles.greetingsWidget__subtitle}>{subtitle}</p>
      </div>
      <img
        src={CoverImage}
        alt="Greetings Widget"
        className={styles.greetingsWidget__coverImage}
      />
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

export default GreetingsWidget;
