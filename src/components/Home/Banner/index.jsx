import React from "react";
import bannerImg from "@/assets/images/banner.jpg";
import styles from "./style.module.css";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.banner__img}>
        <img src={bannerImg} alt="banner" />
      </div>
      <div className={styles.banner__content}>
        <h1 className={styles.banner__title}>kaïzen</h1>
        <p className={styles.banner__description}>
          Transform your life one small step at a time. Build better habits,
          track your progress, and unlock your full potential through proven
          productivity techniques.
        </p>
        <div className={styles.banner__buttons}>
          <Link to="/dashboard/pomodoro">
            <button
              className={`btn underlineAnimation ${styles.banner__button}`}
            >
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
