import { ConfirmStep } from './ConfirmStep';
import { CalendarStep } from './CalendarStep';
import { useState } from 'react';

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null);
  }

  if (selectedDateTime) {
    return <ConfirmStep schedulingDate={selectedDateTime} onCancelConfirmation={handleClearSelectedDateTime} />;
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />;
}
