import { useEffect } from "react";

const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = title || "Kaizen";
  }, [title]);
};

export default useDocumentTitle;
