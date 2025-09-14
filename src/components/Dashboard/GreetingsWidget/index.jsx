import useAuthStore from "@/store/auth";
import React from "react";
import CoverImage from "@/assets/images/dashboard_cover.jpg";
import { getUserDisplayName } from "@/utils/auth";

const GreetingsWidget = () => {
  const { user } = useAuthStore();
  const displayName = getUserDisplayName(user);

  const { greeting, subtitle } = getTimeBasedGreeting();

  return (
    <div className="relative p-6 text-background">
      <div className="relative z-10">
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
      <div className="absolute inset-0 bg-black/40"></div>
      <img
        src={CoverImage}
        alt="Greetings Widget"
        className="absolute inset-0 w-full h-full object-cover -z-10"
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
