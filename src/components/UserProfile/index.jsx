import React, { useState } from "react";
import styles from "./style.module.css";
import useAuthStore from "@/store/auth";
import { signOut } from "@/db/apis/auth";
import { Toast } from "@/utils/components/Toast";
import { useNavigate } from "react-router";
import { STATUS } from "@/utils/constants";
import Spinner from "@/utils/components/Spinner";

const { toast } = Toast;

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser, setUserFetchStatus } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const displayName = user?.user_metadata?.display_name;
  const email = user?.email || "Not Available";
  const phoneNumber = user?.phone || "Not Available";
  const dateOfBirth = user?.user_metadata?.date_of_birth || "Not Available"; // TODO: Add date of birth

  const logout = async () => {
    setLoading(true);
    const res = await signOut();
    if (res.error) {
      toast.error(res.error);
    } else {
      setUser(null);
      setUserFetchStatus(STATUS.LOADING);
      navigate("/", { replace: true });
    }
    setLoading(false);
  };

  return (
    <section className={`card ${styles.userProfile}`}>
      <div className={`card__header ${styles.userProfile__header}`}>
        <div className={styles.userProfile__header__title}>User Details</div>
        <div>
          {/* <button className={`btn ${styles.userProfile__btn}`}>
            <span>Edit</span>
          </button> */}
          <button
            className={`btn ${styles.userProfile__btn__logout}`}
            onClick={logout}
          >
            {loading && (
              <span className="btn__icon">
                <Spinner />
              </span>
            )}
            Logout
          </button>
        </div>
      </div>
      <div className={`card__body ${styles.userProfile__body}`}>
        <div className={`${styles.userProfile__avatar}`}>
          <span>{displayName?.charAt(0)}</span>
        </div>
        <div className={`${styles.userProfile__details}`}>
          <div className={`${styles.userProfile__name}`}>{displayName}</div>
          <div className={`${styles.userProfile__info}`}>
            <div className={`${styles.userProfile__info_item}`}>
              <span className={styles.info_label}>Email</span>
              <span className={styles.info_value}>{email}</span>
            </div>
            <div className={`${styles.userProfile__info_item}`}>
              <span className={styles.info_label}>Phone Number</span>
              <span className={styles.info_value}>{phoneNumber}</span>
            </div>
            <div className={`${styles.userProfile__info_item}`}>
              <span className={styles.info_label}>Date of Birth</span>
              <span className={styles.info_value}>{dateOfBirth}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
