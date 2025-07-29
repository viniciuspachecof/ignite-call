import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { Container, Header } from '../styles';
import { ArrowRightIcon } from '@phosphor-icons/react';
import z from 'zod';
import { ConnectBox, ConnectItem } from './styles';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'O nome precisa ter pleo menos 3 letras.' }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  // async function handleRegister(data: RegisterFormData) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que
          são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conenctar <ArrowRightIcon />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo <ArrowRightIcon />
        </Button>
      </ConnectBox>
    </Container>
  );
}
