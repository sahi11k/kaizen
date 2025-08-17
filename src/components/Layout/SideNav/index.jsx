import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthStore from "@/store/auth";
import styles from "./style.module.css";
import Logo from "@/utils/components/Logo";
import ChevronBack from "@/assets/icons/chevronbackward.svg?react";
import ChevronForward from "@/assets/icons/chevronforward.svg?react";
import { signOut } from "@/db/apis/auth";
import { Toast } from "@/utils/components/Toast";
import { STATUS } from "@/utils/constants";
import { navigationLinks } from "./data";
import LogoutIcon from "@/assets/icons/logout.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";

const { toast } = Toast;

const SideNav = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, setUserFetchStatus } = useAuthStore();
  const sideNavRef = useRef(null);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    const res = await signOut();
    if (res.error) {
      toast.error(res.error);
    } else {
      setUser(null);
      setUserFetchStatus(STATUS.LOADING);
      navigate("/", { replace: true });
    }
  };

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (newState) {
      setTimeout(() => {
        sideNavRef.current.classList.add(styles.sideNav_collapsed);
      }, 50);
    } else {
      sideNavRef.current.classList.remove(styles.sideNav_collapsed);
    }
  };

  return (
    <nav className={`${styles.sideNav}`} ref={sideNavRef}>
      <div className={styles.sideNav__header}>
        <Logo
          to="/"
          size="medium"
          showText={!isCollapsed}
          className={styles.sideNav__logo}
        />
        <button
          className={`btn ${styles.sideNav_collapseBtn}`}
          onClick={handleCollapse}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronForward /> : <ChevronBack />}
        </button>
      </div>

      <ul className={styles.sideNav__content}>
        {navigationLinks.map((link) => (
          <Link to={link.to} key={link.to}>
            <li
              className={`${styles.sideNav__navItem} ${
                isActiveLink(link.to) ? styles.sideNav__navItemActive : ""
              }`}
              title={link.label}
            >
              <span className={styles.sideNav__navIcon}>{link.icon}</span>
              {!isCollapsed && (
                <span className={styles.sideNav__navLabel}>{link.label}</span>
              )}
            </li>
          </Link>
        ))}
      </ul>

      <ul className={styles.sideNav__footer}>
        <Link to={"/dashboard/settings"} key={"/dashboard/settings"}>
          <li
            className={`${styles.sideNav__navItem} ${
              isActiveLink("/dashboard/settings")
                ? styles.sideNav__navItemActive
                : ""
            }`}
            title={"Settings"}
          >
            <span className={styles.sideNav__navIcon}>
              <SettingsIcon />
            </span>
            {!isCollapsed && (
              <span className={styles.sideNav__navLabel}>Settings</span>
            )}
          </li>
        </Link>
        <li className={styles.sideNav__navItem} onClick={handleLogout}>
          <span className={styles.sideNav__navIcon}>
            <LogoutIcon />
          </span>
          {!isCollapsed && (
            <span className={styles.sideNav__navLabel}>Logout</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
