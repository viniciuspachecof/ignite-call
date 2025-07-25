import { Button, TextInput } from '@ignite-ui/react';
import { Form } from './styles';
import { ArrowRightIcon } from '@phosphor-icons/react';

export function ClaimUserNameForm() {
  return (
    <Form as="form">
      {/* @ts-expect-error props incompletas reconhecidament */}
      <TextInput type="text" size="sm" prefix="ignite.com/" placeholder="seu-usuario" />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRightIcon />
      </Button>
    </Form>
  );
}
