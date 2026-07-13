import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';

export function Home() {
  return (
    <>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </>
  );
}