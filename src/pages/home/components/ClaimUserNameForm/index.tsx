import { Button, Text, TextInput } from '@ignite-ui/react';
import { Form, FormAnnotation } from './styles';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        {/* @ts-expect-error props incompletas reconhecidament */}
        <TextInput type="text" size="sm" prefix="ignite.com/" placeholder="seu-usuario" {...register('username')} />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRightIcon />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">{errors.username ? errors.username.message : 'Digite o nome do usuário desejado'}</Text>
      </FormAnnotation>
    </>
  );
}
