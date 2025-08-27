import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { Container, Header } from '../styles';
import { ArrowRightIcon, CheckIcon } from '@phosphor-icons/react';
import z from 'zod';
import { AuthError, ConnectBox, ConnectItem } from './styles';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

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

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === 'authenticated';

  async function handleConnectCalendar() {
    await signIn('google');
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals');
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
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
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado <CheckIcon />
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleConnectCalendar}>
                Conectar <ArrowRightIcon />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError>
              Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button onClick={handleNavigateToNextStep} type="submit" disabled={!isSignedIn}>
            Próximo passo <ArrowRightIcon />
          </Button>
        </ConnectBox>
      </Container>
    </>
  );
}
