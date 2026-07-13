import { Outlet } from 'react-router';

import { Container } from '../../components/Container';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';

export function MainTemplate() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Outlet />

      <Container>
        <Footer />
      </Container>
    </>
  );
}