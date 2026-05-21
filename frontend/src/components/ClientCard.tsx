import { useNavigate } from 'react-router-dom';
import { DashboardItem } from '../models';
import ProgressBar from './ProgressBar';
import StatusBadge from './StatusBadge';
import styles from './ClientCard.module.css';

interface ClientCardProps {
  item: DashboardItem;
}

function ClientCard({ item }: ClientCardProps) {
  const navigate = useNavigate();
  const { client, steps, status } = item;

  const completedSteps = steps.filter((s) => s.completed).length;
  const totalSteps = steps.length;

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/onboarding/${client.id}`)}
    >
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h3 className={styles.companyName}>{client.company_name}</h3>
          <StatusBadge status={status} />
        </div>
        <span className={styles.plan}>{client.plan}</span>
      </div>

      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.label}>Responsável</span>
          <span className={styles.value}>{client.contact_name}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.label}>Consultor</span>
          <span className={styles.value}>{client.consultant_name}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.label}>Início</span>
          <span className={styles.value}>
            {new Date(client.start_date).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      <ProgressBar completed={completedSteps} total={totalSteps} />
    </div>
  );
}

export default ClientCard;
