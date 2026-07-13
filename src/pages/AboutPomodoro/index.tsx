import { Link } from 'react-router';

import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { paths } from '../../routes/paths';

export function AboutPomodoro() {
  return (
    <Container>
      <GenericHtml>
        <Heading>A Técnica Pomodoro 🍅</Heading>

        <p>
          Criada por <strong>Francesco Cirillo</strong>, a Técnica Pomodoro é
          um método de produtividade simples: divida o trabalho em blocos de
          tempo focados — os famosos "Pomodoros" — intercalados com pausas
          curtas. A ideia é manter o foco total por um período determinado e
          garantir descansos regulares, evitando o cansaço mental.
        </p>

        <h2>Como funciona o Pomodoro tradicional?</h2>
        <ul>
          <li>
            <strong>1. Defina uma tarefa</strong> que você quer realizar.
          </li>
          <li>
            <strong>2. Trabalhe nela por 25 minutos</strong>, sem
            interrupções.
          </li>
          <li>
            <strong>3. Faça uma pausa curta de 5 minutos.</strong>
          </li>
          <li>
            <strong>4. A cada 4 ciclos, faça uma pausa longa</strong> — de 15
            a 30 minutos.
          </li>
        </ul>

        <h2>
          O <strong>Chronos Pomodoro</strong> vai um passo além 🚀
        </h2>

        <p>
          Nosso app segue o conceito original da técnica, mas com alguns
          ajustes pensados pra deixar seu processo ainda mais eficiente:
        </p>

        <h3>⚙️ Personalização do tempo</h3>
        <p>
          Configure o tempo de foco, descanso curto e descanso longo do jeito
          que preferir. É só acessar a{' '}
          <Link to={paths.settings}>página de configurações</Link> e ajustar
          os minutos como quiser.
        </p>

        <h3>🔁 Ciclos organizados em sequência</h3>
        <p>
          A cada ciclo concluído, uma nova tarefa entra automaticamente no seu
          histórico, e o app já sugere o próximo passo — foco ou descanso.
        </p>
        <p>
          <strong>Nosso padrão de ciclos:</strong>
        </p>
        <ul>
          <li>
            Ciclos <strong>ímpares</strong>: trabalho (foco).
          </li>
          <li>
            Ciclos <strong>pares</strong>: descanso curto.
          </li>
          <li>
            Ciclo <strong>8</strong>: descanso longo especial, pra resetar o
            ciclo completo.
          </li>
        </ul>

        <h3>🍅 Visualização dos ciclos</h3>
        <p>
          Logo abaixo do cronômetro, bolinhas coloridas mostram em que ponto
          do processo você está:
        </p>
        <ul>
          <li>🟡 Amarelo: ciclo de trabalho (foco).</li>
          <li>🟢 Verde: descanso curto.</li>
          <li>🔵 Azul: descanso longo (a cada 8 ciclos).</li>
        </ul>

        <p>
          Assim você sempre sabe onde está e o que vem a seguir — sem
          precisar anotar no papel ou fazer conta de cabeça.
        </p>

        <h3>📊 Histórico automático</h3>
        <p>
          Todas as suas tarefas e ciclos concluídos ficam salvos no{' '}
          <Link to={paths.history}>histórico</Link>, com status de completos
          ou interrompidos, pra você acompanhar sua evolução ao longo do
          tempo.
        </p>

        <h2>Por que usar o Chronos Pomodoro?</h2>
        <ul>
          <li>✅ Organize seu foco com clareza.</li>
          <li>✅ Trabalhe e descanse na medida certa.</li>
          <li>✅ Personalize seus próprios ciclos e tempos.</li>
          <li>✅ Acompanhe seu histórico automaticamente.</li>
        </ul>

        <p>
          <strong>Pronto pra focar?</strong> Então bora{' '}
          <Link to={paths.home}>voltar pra página inicial</Link> e começar
          seus Pomodoros! 🍅🚀
        </p>

        <p>
          <em>"Foco total, sem pressa, sem pausa, só vai!"</em> 💪🧘‍♂️
        </p>
      </GenericHtml>
    </Container>
  );
}