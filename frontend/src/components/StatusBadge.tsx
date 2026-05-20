import { OnboardingStatus } from '../models';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: OnboardingStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusClass = (() => {
    switch (status) {
      case OnboardingStatus.CONCLUIDO:
        return styles.success;
      case OnboardingStatus.ATRASADO:
        return styles.danger;
      default:
        return styles.warning;
    }
  })();

  const statusIcon = (() => {
    switch (status) {
      case OnboardingStatus.CONCLUIDO:
        return '✓';
      case OnboardingStatus.ATRASADO:
        return '⚠';
      default:
        return '●';
    }
  })();

  return (
    <span className={`${styles.badge} ${statusClass}`}>
      <span className={styles.icon}>{statusIcon}</span>
      {status}
    </span>
  );
}

export default StatusBadge;
