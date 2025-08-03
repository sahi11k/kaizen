import React from "react";
import styles from "./style.module.css";
import SpinnerIcon from "@/assets/icons/spinner.svg?react";

const Spinner = ({ className }) => {
  return (
    <span className={className}>
      <SpinnerIcon className={styles.spinner} />
    </span>
  );
};

export default Spinner;
