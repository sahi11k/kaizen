import { BROWSER_TAB_TITLES } from "@/shared/constants";
import { useEffect } from "react";

const useTabTitle = (title: string = ""): void => {
  const titleUppercased = title.toUpperCase() as keyof typeof BROWSER_TAB_TITLES;

  useEffect(() => {
    document.title = BROWSER_TAB_TITLES[titleUppercased] || "Kaizen";
  }, [titleUppercased]);
};

export default useTabTitle;
