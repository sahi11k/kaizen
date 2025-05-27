import React from "react";
import styles from "@/components/Banner/style.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <h1 className={styles.banner__title}>Zenten.</h1>
      <p className={styles.banner__description}>
        Cut the Noise. Find your Rhythm.
      </p>
    </div>
  );
};

export default Banner;
