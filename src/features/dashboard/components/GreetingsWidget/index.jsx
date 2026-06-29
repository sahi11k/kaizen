import { useAuthStore, getUserDisplayName } from "@/features/auth";
import React from "react";

const GreetingsWidget = () => {
  const { user } = useAuthStore();
  const displayName = getUserDisplayName(user);

  const { greeting, subtitle } = getTimeBasedGreeting();

  return (
    <div className="p-6">
      <h1 className="heading-2">
        <span>{greeting},</span>{" "}
        <span className="w-[20ch]">
          {displayName.length > 25
            ? displayName.slice(0, 25) + "..."
            : displayName}
        </span>
      </h1>
      <p className="body-base font-medium">{subtitle}</p>
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
