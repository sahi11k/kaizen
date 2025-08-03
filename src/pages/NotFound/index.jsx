import React from "react";
import { Link } from "react-router";
import styles from "./style.module.css";
import ErrorIcon from "@/assets/icons/404.svg?react";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <ErrorIcon />
        </div>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn btn--primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
