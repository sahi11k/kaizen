import React from "react";
import { Link } from "react-router";
import useAuthStore from "@/store/auth";
import styles from "./style.module.css";
import Logo from "@/utils/components/Logo";

const HeaderNav = () => {
  const { user } = useAuthStore();
  return (
    <header className={styles.header}>
      <Logo className={styles.header__logo} />
      {user ? (
        <Link
          to="/dashboard"
          className={`${styles.header__nav__item} underlineAnimation`}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          to="/auth/login"
          className={`${styles.header__nav__item} underlineAnimation`}
        >
          Login
        </Link>
      )}
    </header>
  );
};

export default HeaderNav;
