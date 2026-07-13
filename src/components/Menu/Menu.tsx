import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import { NavLink } from 'react-router';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { paths } from '../../routes/paths';
import { useTaskContext } from '../../contexts/TaskContext';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  const { showNotification } = useTaskContext();

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      showNotification({
      title: 'Tema alterado',
      message:
        nextTheme === 'dark'
          ? 'Modo escuro ativado.'
          : 'Modo claro ativado.',
      type: 'info',
       });
      
      return nextTheme;

    });
    
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function getMenuLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? `${styles.menuLink} ${styles.active}` : styles.menuLink;
  }

  return (
    <nav className={styles.menu}>
      <NavLink
        to={paths.home}
        end
        className={getMenuLinkClassName}
        aria-label='Ir para a Home'
        title='Ir para a Home'
      >
        <HouseIcon />
      </NavLink>

      <NavLink
        to={paths.history}
        className={getMenuLinkClassName}
        aria-label='Ver Historico'
        title='Ver historico'
      >
        <HistoryIcon />
      </NavLink>

      <NavLink
        to={paths.settings}
        className={getMenuLinkClassName}
        aria-label='Ir para as configurações'
        title='Ir para as configurações'
      >
        <SettingsIcon />
      </NavLink>

       <a
        href='#'
        className={styles.menuLink}
        aria-label='Mudar tema'
        title='Mudar tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}