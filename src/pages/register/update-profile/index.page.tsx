import { Avatar, Button, Heading, MultiStep, Text, TextArea, TextInput } from '@ignite-ui/react';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Container, Header } from '../styles';
import { FormAnnotation, ProfileBox } from './styles';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api';
import { useSession } from 'next-auth/react';
import { api } from '@/src/lib/axios';
import { useRouter } from 'next/router';

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const { register, handleSubmit } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();

  console.log(session);

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/user/profile', {
      bio: data.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de perfil</Text>
          {/* @ts-expect-error props incompletas reconhecidament */}
          <Avatar src={session.data?.user.avatar_url} alt={session.data?.user.name} />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea placeholder="Seu nome" {...register('bio')} />
          <FormAnnotation size="sm">Fale um pouco sobre você. Isto será exibido em sua página pessoal.</FormAnnotation>
        </label>

        <Button type="submit">
          Finalizar <ArrowRightIcon />
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

  return {
    props: {
      session,
    },
  };
};
