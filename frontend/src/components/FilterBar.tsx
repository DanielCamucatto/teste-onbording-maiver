import { useState } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  onFilter: (consultant: string, companyName: string) => void;
  onClear: () => void;
}

function FilterBar({ onFilter, onClear }: FilterBarProps) {
  const [consultantInput, setConsultantInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(consultantInput.trim(), companyInput.trim());
  };

  const handleClear = () => {
    setConsultantInput('');
    setCompanyInput('');
    onClear();
  };

  return (
    <form className={styles.filterBar} onSubmit={handleSubmit}>
      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="company-filter">
          Empresa:
        </label>
        <input
          id="company-filter"
          className={styles.input}
          type="text"
          placeholder="Nome da empresa..."
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
        />
      </div>
      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="consultant-filter">
          Consultor:
        </label>
        <input
          id="consultant-filter"
          className={styles.input}
          type="text"
          placeholder="Nome do consultor..."
          value={consultantInput}
          onChange={(e) => setConsultantInput(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.filterButton}>
        Filtrar
      </button>
      {(consultantInput || companyInput) && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          Limpar
        </button>
      )}
    </form>
  );
}

export default FilterBar;
