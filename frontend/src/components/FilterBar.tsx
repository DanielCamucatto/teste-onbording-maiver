import { useState } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  onFilter: (consultant: string) => void;
  onClear: () => void;
}

function FilterBar({ onFilter, onClear }: FilterBarProps) {
  const [consultantInput, setConsultantInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultantInput.trim()) {
      onFilter(consultantInput.trim());
    }
  };

  const handleClear = () => {
    setConsultantInput('');
    onClear();
  };

  return (
    <form className={styles.filterBar} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="consultant-filter">
        Filtrar por consultor:
      </label>
      <input
        id="consultant-filter"
        className={styles.input}
        type="text"
        placeholder="Nome do consultor..."
        value={consultantInput}
        onChange={(e) => setConsultantInput(e.target.value)}
      />
      <button type="submit" className={styles.filterButton}>
        Filtrar
      </button>
      {consultantInput && (
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
