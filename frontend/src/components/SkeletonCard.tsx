import styles from './SkeletonCard.module.css';

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.bone} ${styles.titleBone}`} />
        <div className={`${styles.bone} ${styles.badgeBone}`} />
      </div>
      <div className={styles.details}>
        <div className={`${styles.bone} ${styles.detailBone}`} />
        <div className={`${styles.bone} ${styles.detailBone}`} />
        <div className={`${styles.bone} ${styles.detailBone}`} />
      </div>
      <div className={`${styles.bone} ${styles.progressBone}`} />
    </div>
  );
}

export default SkeletonCard;
