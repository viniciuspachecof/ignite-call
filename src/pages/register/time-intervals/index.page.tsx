import { Button, Heading, MultiStep, Text, TextInput, Checkbox } from '@ignite-ui/react';
import { Container, Header } from '../styles';
import { IntervalBox, IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer } from './styles';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { getWeekDays } from '@/src/utils/get-week-days';
// import { Checkbox } from 'radix-ui';

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  });

  async function handleSetTimeIntervals() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>Defina o intervalo de hisórios que você está disponível em cada dia da semana.</Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          // @ts-expect-error props incompletas reconhecidament
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true);
                          }}
                          checked={field.value}
                        />
                      );
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  {/* @ts-expect-error props incompletas reconhecidament */}
                  <TextInput size="sm" type="time" step={60} {...register(`intervals.${index}.startTime`)} />
                  {/* @ts-expect-error props incompletas reconhecidament */}
                  <TextInput size="sm" type="time" step={60} {...register(`intervals.${index}.endTime`)} />
                </IntervalInputs>
              </IntervalItem>
            );
          })}
        </IntervalsContainer>

        <Button type="submit">
          Próximo passo <ArrowRightIcon />
        </Button>
      </IntervalBox>
    </Container>
  );
}
