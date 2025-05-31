import React from "react";
import styles from "@/components/Banner/style.module.css";
import bannerImg from "@/assets/images/banner.jpg";
import { Link } from "react-router";

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
          <Link to="/pomodoro">
            <button
              className={`btn underlineAnimation ${styles.banner__button}`}
            >
              Focus Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
