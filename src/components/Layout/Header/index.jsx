import React from "react";
import styles from "@/components/Layout/Header/style.module.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.header__logo}>Z</div>
      </Link>
      <div className={styles.header__nav}>
        <Link to="/pomodoro">
          <div className={styles.header__nav__item}>Pomodoro</div>
        </Link>
        <Link to="/journal">
          <div className={styles.header__nav__item}>Journal</div>
        </Link>
        <Link to="/profile">
          <div className={styles.header__nav__item}>Profile</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
