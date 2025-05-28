import React from "react";
import styles from "@/components/Banner/style.module.css";
import bannerImg from "@/assets/images/banner.jpg";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__img}>
        <img src={bannerImg} alt="banner" />
      </div>
      <div className={styles.banner__content}>
        <h1 className={styles.banner__title}>Zenten</h1>
        <p className={styles.banner__description}>
          A tool for productivity, self-improvement and growth.
          <br />
          Get in your Zen mode and become UNSTOPPABLE.
        </p>
        <div className={styles.banner__buttons}>
          <button className={styles.banner__button__primary}>Focus Now</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
