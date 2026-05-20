import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDashboard } from '../controllers/useDashboard';
import ClientCard from '../components/ClientCard';
import FilterBar from '../components/FilterBar';
import ErrorMessage from '../components/ErrorMessage';
import SkeletonCard from '../components/SkeletonCard';
import styles from './DashboardView.module.css';

function DashboardView() {
  const { dashboardData, loading, error, fetchDashboard } =
    useDashboard();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleFilter = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleClearFilter = () => {
    setSearchTerm('');
    fetchDashboard();
  };

  // Filtro combinado: busca por nome da empresa OU consultor
  const filteredData = useMemo(() => {
    if (!searchTerm) return dashboardData;
    const term = searchTerm.toLowerCase();
    return dashboardData.filter((item) =>
      item.client.company_name.toLowerCase().includes(term) ||
      item.client.consultant_name.toLowerCase().includes(term) ||
      item.client.contact_name.toLowerCase().includes(term)
    );
  }, [dashboardData, searchTerm]);

  if (loading && dashboardData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`} />
          </div>
          <div className={`${styles.skeleton} ${styles.skeletonFilter}`} />
        </div>

        <div className={styles.stats}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.stat}>
              <div className={`${styles.skeleton} ${styles.skeletonStatValue}`} />
              <div className={`${styles.skeleton} ${styles.skeletonStatLabel}`} />
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
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

      {!error && filteredData.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📋</p>
          <p className={styles.emptyText}>
            Nenhum cliente encontrado com os filtros aplicados.
          </p>
          <p className={styles.emptyHint}>
            Tente limpar os filtros ou cadastre um novo cliente.
          </p>
        </div>
      )}

      {!error && filteredData.length > 0 && (
        <>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {filteredData.length}
              </span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statWarning}`}>
                {
                  filteredData.filter(
                    (item) => item.status === 'Em andamento',
                  ).length
                }
              </span>
              <span className={styles.statLabel}>Em andamento</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statSuccess}`}>
                {
                  filteredData.filter(
                    (item) => item.status === 'Concluído',
                  ).length
                }
              </span>
              <span className={styles.statLabel}>Concluídos</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statDanger}`}>
                {
                  filteredData.filter(
                    (item) => item.status === 'Atrasado',
                  ).length
                }
              </span>
              <span className={styles.statLabel}>Atrasados</span>
            </div>
          </div>

          <div className={styles.grid}>
            {filteredData.map((item) => (
              <ClientCard key={item.client.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardView;
