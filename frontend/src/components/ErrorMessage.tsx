import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>⚠</span>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
