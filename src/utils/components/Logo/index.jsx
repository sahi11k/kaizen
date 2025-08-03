import React from "react";
import { Link } from "react-router";
import LogoIcon from "@/assets/icons/logo.svg?react";
import styles from "./style.module.css";

const Logo = ({
  to = "/",
  size = "medium",
  showText = true,
  className = "",
  onClick,
}) => {
  const logoClasses = `${styles.logo} ${styles[`logo--${size}`]} ${className}`;

  const LogoContent = () => (
    <>
      <LogoIcon className={styles.logo__icon} />
      {showText && <span className={styles.logo__text}>kaïzen</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={logoClasses} onClick={onClick}>
        <LogoContent />
      </Link>
    );
  }

  return (
    <div className={logoClasses} onClick={onClick}>
      <LogoContent />
    </div>
  );
};

export default Logo;
