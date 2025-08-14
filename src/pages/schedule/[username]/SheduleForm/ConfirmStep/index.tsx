import { Button, Text, TextArea, TextInput } from '@ignite-ui/react';
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles';
import { CalendarBlankIcon, ClockIcon } from '@phosphor-icons/react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const confirmFormSchema = z.object({
  name: z.string().min(3, { error: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.email({ error: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });
  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data);
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlankIcon />
          13 de Agosto de 2025
        </Text>
        <Text>
          <ClockIcon />
          21:00
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        {/* @ts-expect-error props incompletas reconhecidament */}
        <TextInput placeholder="seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        {/* @ts-expect-error props incompletas reconhecidament */}
        <TextInput type="email" placeholder="vinicius@hotmail.com" {...register('email')} />
        {errors.email && <FormError size="sm">{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
