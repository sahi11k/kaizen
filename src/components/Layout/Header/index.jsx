import React from "react";
import styles from "@/components/Layout/Header/style.module.css";
import { Link } from "react-router";
import useAuthStore from "@/store/auth";

const Header = () => {
  const { user } = useAuthStore();

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.header__logo}>Z</div>
      </Link>
      <ul className={styles.header__nav}>
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <li className={`${styles.header__nav__item} underlineAnimation`}>
                Login
              </li>
            </Link>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
