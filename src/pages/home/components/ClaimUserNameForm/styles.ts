import { Box, styled, TextInput } from '@ignite-ui/react';

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@media(max-width: 600px)': {
    gridTemplatecolumns: '1fr',
  },
});
