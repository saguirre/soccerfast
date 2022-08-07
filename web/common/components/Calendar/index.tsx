import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

import { useCalendar } from '@hooks';
import { Day } from '@models';
import { CalendarButton } from './CalendarButton';

interface CalendarProps {
  onSelectDate: (day: Day) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const { i18n } = useTranslation('common');
  const {
    moveToPreviousMonth,
    moveToNextMonth,
    currentMonthName,
    weekdays,
    days,
    setDays,
    selectedDay,
    selectCurrentDay,
  } = useCalendar(i18n.language);
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
            <CalendarButton
              key={day + dayIdx.toString()}
              day={day}
              dayIdx={dayIdx}
              days={days}
              selectedDay={selectedDay}
              onClick={(day: Day) => {
                if (day.isValid) {
                  selectCurrentDay(day);
                  setDays((current) => {
                    return current.map((currentDay) => {
                      return { ...currentDay, isSelected: day.formattedDate === currentDay.formattedDate };
                    });
                  });
                  onSelectDate(day);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
