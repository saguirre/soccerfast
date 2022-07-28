import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  isAfter,
  isSameMonth,
  isToday,
  nextMonday,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';

import { classNames } from '@utils';
import { useTranslation } from 'next-i18next';
import { da } from 'date-fns/locale';

interface Day {
  weekday: string;
  date: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isValid: boolean;
}

export const Calendar: React.FC = () => {
  const today = new Date();
  const { i18n } = useTranslation('common');
  const [currentMonthName, setCurrentMonthName] = useState<string>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentMonthDays, setCurrentMonthDays] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [locale, setLocale] = useState<Locale>();
  const [weekdays, setWeekdays] = useState<string[]>(['']);
  const [days, setDays] = useState<Day[]>([]);

  const moveToNextMonth = () => {
    setCurrentMonth((current) => addMonths(current, 1));
  };

  const moveToPreviousMonth = () => {
    setCurrentMonth((current) => subMonths(current, 1));
  };

  const fillCalendar = () => {
    setCurrentMonthName(format(currentMonth, 'LLLL', { locale }));
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayInMonth = startOfMonth(currentMonth);
    const lastDayInMonth = endOfMonth(currentMonth);
    const firstWeekdayInMonth = getDay(firstDayInMonth);
    const lastWeekdayInMonth = getDay(lastDayInMonth);
    const days = [];
    for (let i = firstWeekdayInMonth; i > 1; i--) {
      const day = subDays(firstDayInMonth, i);
      days.push({
        weekday: format(day, 'EEEE', { locale }),
        date: format(day, 'dd-MM-yyyy', { locale }),
        isCurrentMonth: isSameMonth(day, currentMonth),
        isSelected: false,
        isToday: isToday(day),
        isValid: isToday(day) || isAfter(day, today),
      });
    }
    for (let i = 0; i < daysInMonth; i++) {
      const day = addDays(firstDayInMonth, i);
      days.push({
        weekday: format(day, 'EEEE', { locale }),
        date: format(day, 'dd-MM-yyyy', { locale }),
        isCurrentMonth: isSameMonth(day, currentMonth),
        isSelected: false,
        isToday: isToday(day),
        isValid: isToday(day) || isAfter(day, today),
      });
    }
    for (let i = 1; i < 8 - lastWeekdayInMonth; i++) {
      const day = addDays(lastDayInMonth, i);
      days.push({
        weekday: format(day, 'EEEE', { locale }),
        date: format(day, 'dd-MM-yyyy', { locale }),
        isCurrentMonth: isSameMonth(day, currentMonth),
        isSelected: false,
        isToday: isToday(day),
        isValid: isToday(day) || isAfter(day, today),
      });
    }
    setDays(days);
  };

  useEffect(() => {
    if (currentMonth) {
      fillCalendar();
    }
  }, [currentMonth]);

  useEffect(() => {
    const locale = i18n.language === 'en' ? enLocale : esLocale;
    setLocale(locale);
    const weekdayRandomStart = new Date('2000-01-01');
    const weekdayList: string[] = [];
    const monday = nextMonday(weekdayRandomStart);
    for (let i = 0; i < 7; i++) {
      const day = addDays(monday, i);
      weekdayList.push(format(day, 'EEEE', { locale }).at(0)?.toLocaleUpperCase() || '');
    }
    setWeekdays(weekdayList);
    fillCalendar();
  }, []);

  return (
    <div>
      <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            onClick={() => moveToPreviousMonth()}
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto font-semibold">{currentMonthName}</div>
          <button
            type="button"
            onClick={() => moveToNextMonth()}
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          {weekdays?.map((weekday, index) => (
            <div key={weekday + index}>{weekday}</div>
          ))}
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day, dayIdx) => (
            <button
              key={day.weekday + day.date + dayIdx}
              type="button"
              onClick={() =>
                setDays((current) => {
                  return current.map((currentDay) => {
                    return { ...currentDay, isSelected: day.date === currentDay.date };
                  });
                })
              }
              className={classNames(
                'py-1.5 ',
                day.isValid ? 'bg-white hover:bg-sky-100 focus:z-10' : 'bg-gray-100 hover:cursor-not-allowed',
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-200',
                (day.isSelected || day.isToday) && 'font-semibold',
                day.isSelected && 'text-white',
                !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                day.isToday && !day.isSelected && 'text-sky-600',
                dayIdx === 0 && 'rounded-tl-lg',
                dayIdx === 6 && 'rounded-tr-lg',
                dayIdx === days.length - 7 && 'rounded-bl-lg',
                dayIdx === days.length - 1 && 'rounded-br-lg'
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                  day?.isSelected && day?.isToday && 'text-white bg-sky-500',
                  day?.isSelected && !day?.isToday && 'bg-sky-500'
                )}
              >
                {day?.date?.split('-')?.shift()?.replace(/^0/, '')}
              </time>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="focus:outline-none mt-8 w-full rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Add event
        </button>
      </div>
    </div>
  );
};
