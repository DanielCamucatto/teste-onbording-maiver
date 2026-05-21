import { useState } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  onFilter: (term: string) => void;
  onClear: () => void;
}

function FilterBar({ onFilter, onClear }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <form className={styles.filterBar} onSubmit={handleSubmit}>
      <div className={styles.filterGroup}>
        <input
          id="search-filter"
          className={styles.input}
          style={{ width: '400px' }}
          type="text"
          placeholder="Buscar por empresa, consultor ou responsável..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.filterButton}>
        Filtrar
      </button>
      {searchTerm && (
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
