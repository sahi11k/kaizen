import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthStore from "@/store/auth";
import styles from "./style.module.css";
import Logo from "@/utils/components/Logo";
import Dropdown from "@/utils/components/Dropdown";
import ChevronBack from "@/assets/icons/chevronbackward.svg?react";
import ChevronForward from "@/assets/icons/chevronforward.svg?react";
import { signOut } from "@/db/apis/auth";
import { Toast } from "@/utils/components/Toast";
import { STATUS } from "@/utils/constants";
import { getProfileDropdownOptions, navigationLinks } from "./data";
import ProfileTrigger from "@/components/Layout/SideNav/ProfileTrigger";

const { toast } = Toast;

const SideNav = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, setUserFetchStatus } = useAuthStore();

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

  const handleProfileDropdownSelect = (option) => {
    if (option.onClick) {
      option.onClick();
    }
  };

  const handleSettings = () => {
    navigate("/dashboard/settings");
  };

  return (
    <nav
      className={`${styles.sideNav} ${
        isCollapsed ? styles.sideNav_collapsed : ""
      }`}
    >
      <div className={styles.sideNav__header}>
        <Logo
          to="/"
          size="medium"
          showText={!isCollapsed}
          className={styles.sideNav__logo}
        />
        <button
          className={`btn ${styles.sideNav_collapseBtn}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
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

      <div className={styles.sideNav__footer}>
        <Dropdown
          trigger={<ProfileTrigger user={user} collapsed={isCollapsed} />}
          options={getProfileDropdownOptions({
            clickHandlers: {
              settings: handleSettings,
              logout: handleLogout,
            },
          })}
          onSelect={handleProfileDropdownSelect}
          closeOnSelect={true}
          customStyles={DROPDOWN_STYLES}
        />
      </div>
    </nav>
  );
};

const DROPDOWN_STYLES = {
  dropdown: {
    width: "100%",
  },
  trigger: {
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  menu: {
    bottom: "100%",
    top: "auto",
    margin: "0.5rem",
    width: "calc(100% - 1rem)",
  },
};

export default SideNav;
