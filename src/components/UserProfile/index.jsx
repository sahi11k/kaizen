import useAuthStore from "@/store/auth";
import { getUserDisplayName } from "@/utils/utils";
import styles from "./style.module.css";

const UserProfile = () => {
  const { user } = useAuthStore();

  const displayName = getUserDisplayName(user);
  const email = user?.email || "Not Available";
  const phoneNumber = user?.phone || "Not Available";
  const dateOfBirth = user?.user_metadata?.date_of_birth || "Not Available"; // TODO: Add date of birth

  return (
    <section className={`card ${styles.userProfile}`}>
      <div className={`card__header ${styles.userProfile__header}`}>
        <div className={styles.userProfile__header__title}>Account Details</div>
        <div></div>
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
