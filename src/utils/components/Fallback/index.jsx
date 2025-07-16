import React from "react";
import styles from "./style.module.css";
import Spinner from "@/utils/components/Spinner";

const Fallback = () => {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallback__content}>
        <Spinner />
      </div>
    </div>
  );
};

export default Fallback;
