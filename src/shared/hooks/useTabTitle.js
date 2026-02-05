import { TAB_TITLES } from "@/shared/constants/routes";
import { useEffect } from "react";

const useTabTitle = (title = "") => {
  const titleUppercased = title.toUpperCase();

  useEffect(() => {
    document.title = TAB_TITLES[titleUppercased] || "Kaizen";
  }, [titleUppercased]);
};

export default useTabTitle;
