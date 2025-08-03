import SkeletonComponent, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./style.module.css";

const Skeleton = (props) => {
  return (
    <SkeletonTheme
      baseColor="var(--surface)"
      highlightColor="var(--accent-primary)"
    >
      <SkeletonComponent
        {...props}
        containerClassName={styles.skeleton__container}
      />
    </SkeletonTheme>
  );
};

export default Skeleton;
