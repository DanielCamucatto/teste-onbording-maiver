import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <h1 className={styles.title}>
            Central de <span className={styles.highlight}>Onboarding</span>
          </h1>
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Dashboard
          </Link>
          <Link to="/cadastro" className={styles.navButton}>
            + Novo Cliente
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
