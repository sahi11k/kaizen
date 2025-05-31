import React from "react";
import styles from "@/components/Layout/Header/style.module.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.header__logo}>Z</div>
      </Link>
      <ul className={styles.header__nav}>
        <Link to="/pomodoro">
          <li className={`${styles.header__nav__item} underlineAnimation`}>
            Pomodoro
          </li>
        </Link>
        <Link to="/journal">
          <li className={`${styles.header__nav__item} underlineAnimation`}>
            Journal
          </li>
        </Link>
        <Link to="/profile">
          <li className={`${styles.header__nav__item} underlineAnimation`}>
            Profile
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
