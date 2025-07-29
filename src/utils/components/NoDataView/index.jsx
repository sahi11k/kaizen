import React from "react";
import styles from "./style.module.css";
import NoDataIcon from "@/assets/icons/noData.svg?react";

const NoDataView = () => {
  return (
    <div className={styles.noDataView}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <NoDataIcon />
        </div>
        <h2 className={styles.subtitle}>No Data Found</h2>
      </div>
    </div>
  );
};

export default NoDataView;
