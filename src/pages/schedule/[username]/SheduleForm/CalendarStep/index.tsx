import { Calendar } from '@/src/components/Calendar';
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from './styles';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { api } from '@/src/lib/axios';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [availability, setAvailability] = useState<Availability | null>(null);

  const router = useRouter();

  const isDateSelected = !!selectedDate;
  const username = String(router.query.username);

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null;
  const describeDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null;

  const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/user/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      });

      return response.data;
    },
    enabled: !!selectedDateWithoutTime, // opcional: só roda se tiver valor
  });

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describeDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem key={hour} disabled={!availability.availableTimes.includes(hour)}>
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              );
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
