import { NavLink } from 'react-router';
import styles from './styles.module.css';
import { paths } from '../../routes/paths';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <NavLink className={styles.NavLink} to={paths.about}>
        Entenda como funciona a técnica pomodoro.
      </NavLink>
      <span className={styles.NavLink}>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </span>
    </footer>
  );
}