import { useEffect } from 'react';
import { useDashboard } from '../controllers/useDashboard';
import ClientCard from '../components/ClientCard';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import styles from './DashboardView.module.css';

function DashboardView() {
  const { dashboardData, loading, error, fetchDashboard } =
    useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleFilter = (consultant: string) => {
    fetchDashboard(consultant);
  };

  const handleClearFilter = () => {
    fetchDashboard();
  };

  if (loading && dashboardData.length === 0) {
    return <LoadingSpinner message="Carregando dashboard..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Dashboard de Onboarding</h2>
          <p className={styles.subtitle}>
            Acompanhe o progresso dos clientes em processo de onboarding
          </p>
        </div>
        <FilterBar onFilter={handleFilter} onClear={handleClearFilter} />
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => fetchDashboard()}
        />
      )}

      {!error && dashboardData.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📋</p>
          <p className={styles.emptyText}>
            Nenhum cliente em onboarding no momento.
          </p>
          <p className={styles.emptyHint}>
            Cadastre um novo cliente para começar.
          </p>
        </div>
      )}

      {!error && dashboardData.length > 0 && (
        <>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {dashboardData.length}
              </span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statWarning}`}>
                {
                  dashboardData.filter(
                    (item) => item.status === 'Em andamento',
                  ).length
                }
              </span>
              <span className={styles.statLabel}>Em andamento</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statSuccess}`}>
                {
                  dashboardData.filter(
                    (item) => item.status === 'Concluído',
                  ).length
                }
              </span>
              <span className={styles.statLabel}>Concluídos</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statDanger}`}>
                {
                  dashboardData.filter(
                    (item) => item.status === 'Atrasado',
                  ).length
                }
              </span>
              <span className={styles.statLabel}>Atrasados</span>
            </div>
          </div>

          <div className={styles.grid}>
            {dashboardData.map((item) => (
              <ClientCard key={item.client.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardView;
