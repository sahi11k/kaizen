import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router";

const Testamonials = () => {
  return (
    <section className={styles.testamonials}>
      <div className={styles.testamonials__content}>
        <h2 className={styles.testamonials__title}>
          Ready to transform your life?
        </h2>
        <p className={styles.testamonials__description}>
          Join thousands of people who are already improving their lives with
          Kaizen.
        </p>
      </div>
      <Link to="/dashboard">
        <button className={`btn btn--primary ${styles.testamonials__button}`}>
          Get Started
        </button>
      </Link>
    </section>
  );
};

export default Testamonials;
