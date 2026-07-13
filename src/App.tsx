import { Home } from './pages/Home';
import { NotificationContainer } from './components/NotificationContainer';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <NotificationContainer />
      <Home />
    </>
  );
}