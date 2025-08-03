import React from "react";
import styles from "./style.module.css";

const Quote = () => {
  return (
    <section className={styles.quoteSection}>
      <blockquote className={styles.quote}>
        &quot;You have power over your mind — not outside events.
        <br /> Realize this, and you will find strength.&quot;
      </blockquote>
      <span className={styles.quote__author}>
        — Marcus Aurelius, <cite>Meditations</cite>
      </span>
    </section>
  );
};

export default Quote;
