import { format, parse, addMinutes, differenceInMinutes } from 'date-fns';

export interface Break {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
}

export interface ScheduleSettings {
  prayerStartTime: string;
  prayerDuration: number;
  schoolStartTime: string;
  numberOfPeriods: number;
  uniformPeriodDuration: number;
  useVariation: boolean;
  lastPeriodsCount: number;
  lastPeriodDuration: number;
  breaks: Break[];
}

export interface ScheduleSlot {
  period: string | number;
  startTime: string;
  endTime: string;
  type: 'class' | 'break' | 'event';
}

const TIME_FORMAT = "h:mm a";
const FAKE_DATE = '2024-01-01';

const parseTime = (timeStr: string): Date => {
  return parse(`${FAKE_DATE} ${timeStr}`, `yyyy-MM-dd ${TIME_FORMAT}`, new Date());
};

const formatTime = (date: Date): string => {
  return format(date, TIME_FORMAT);
};

export const generateSchedule = (settings: ScheduleSettings): ScheduleSlot[] => {
  const schedule: ScheduleSlot[] = [];
  let currentTime = parseTime(settings.prayerStartTime);

  // 1. Add Prayer
  const prayerEndTime = addMinutes(currentTime, settings.prayerDuration);
  schedule.push({
    period: 'Prayer',
    startTime: settings.prayerStartTime,
    endTime: formatTime(prayerEndTime),
    type: 'event',
  });
  currentTime = prayerEndTime;

  // 2. Align with school start time
  const schoolStartTime = parseTime(settings.schoolStartTime);
  if (currentTime < schoolStartTime) {
    currentTime = schoolStartTime;
  }

  // 3. Get enabled breaks and sort them
  const sortedBreaks = settings.breaks
    .filter(b => b.enabled)
    .sort((a, b) => parseTime(a.startTime).getTime() - parseTime(b.startTime).getTime());

  let periodCount = 1;
  
  // 4. Loop until all periods are placed
  while (periodCount <= settings.numberOfPeriods) {
    const nextBreak = sortedBreaks[0];
    const nextBreakStartTime = nextBreak ? parseTime(nextBreak.startTime) : null;

    // Check if the next event is a break
    if (nextBreakStartTime && nextBreakStartTime <= currentTime) {
      const breakEndTime = parseTime(nextBreak.endTime);
      schedule.push({
        period: nextBreak.name,
        startTime: nextBreak.startTime,
        endTime: nextBreak.endTime,
        type: 'break',
      });
      currentTime = breakEndTime > currentTime ? breakEndTime : currentTime;
      sortedBreaks.shift(); // Remove the processed break
    } else {
      // It's time for a class period
      const isVariedPeriod = settings.useVariation && periodCount > settings.numberOfPeriods - settings.lastPeriodsCount;
      const duration = isVariedPeriod ? settings.lastPeriodDuration : settings.uniformPeriodDuration;
      
      const periodEndTime = addMinutes(currentTime, duration);

      schedule.push({
        period: periodCount,
        startTime: formatTime(currentTime),
        endTime: formatTime(periodEndTime),
        type: 'class',
      });

      currentTime = periodEndTime;
      periodCount++;
    }
  }
  
  // Add any remaining breaks that might be after all classes
  sortedBreaks.forEach(b => {
     schedule.push({
        period: b.name,
        startTime: b.startTime,
        endTime: b.endTime,
        type: 'break',
      });
  });

  return schedule;
};