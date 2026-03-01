import { BROWSER_TAB_TITLES } from "@/shared/constants";
import { useEffect } from "react";

const useTabTitle = (title = "") => {
  const titleUppercased = title.toUpperCase();

  useEffect(() => {
    document.title = BROWSER_TAB_TITLES[titleUppercased] || "Kaizen";
  }, [titleUppercased]);
};

export default useTabTitle;
