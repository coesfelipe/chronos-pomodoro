import { Container } from './components/Container';
import './styles/theme.css';
import './styles/global.css';
import { Logo } from './components/Logo';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
    </>
  );
}
