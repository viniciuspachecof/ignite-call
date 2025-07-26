import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { Container, Form, FormError, Header } from './styles';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          {/* @ts-expect-error props incompletas reconhecidament */}
          <TextInput prefix="ignite.com/" placeholder="seu-usuario" {...register('username')} />

          {errors.username && <FormError>{errors.username.message}</FormError>}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          {/* @ts-expect-error props incompletas reconhecidament */}
          <TextInput placeholder="Seu nome" {...register('name')} />

          {errors.name && <FormError>{errors.name.message}</FormError>}
        </label>

        <Button type="submit">
          Próximo passo <ArrowRightIcon />
        </Button>
      </Form>
    </Container>
  );
}
