import { useState, useEffect } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  onFilter: (searchTerm: string) => void;
  onClear: () => void;
}

function FilterBar({ onFilter, onClear }: FilterBarProps) {
  const [searchInput, setSearchInput] = useState('');

  // Filtro dinâmico: atualiza a cada tecla digitada
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter(searchInput.trim());
    }, 200); // debounce de 200ms
    return () => clearTimeout(timer);
  }, [searchInput, onFilter]);

  const handleClear = () => {
    setSearchInput('');
    onClear();
  };

  return (
    <div className={styles.filterBar}>
      <label className={styles.label} htmlFor="search-filter">
        🔍 Buscar:
      </label>
      <input
        id="search-filter"
        className={styles.input}
        type="text"
        placeholder="Nome da empresa ou consultor..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        autoFocus
      />
      {searchInput && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          title="Limpar filtro"
        >
          ✕ Limpar
        </button>
      )}
    </div>
  );
}

export default FilterBar;
