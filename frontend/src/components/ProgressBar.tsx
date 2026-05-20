import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  completed: number;
  total: number;
}

function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.text}>
          {completed}/{total} etapas
        </span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
