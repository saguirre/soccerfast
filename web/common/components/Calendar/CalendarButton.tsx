import { Day } from '@models';
import { classNames } from '@utils';

interface Props {
  day: Day;
  dayIdx: number;
  selectedDay?: Day;
  days: Day[];
  onClick: (day: Day) => void;
}

export const CalendarButton: React.FC<Props> = ({ day, dayIdx, selectedDay, days, onClick }) => {
  return (
    <button
      key={day.weekday + day.formattedDate + dayIdx}
      type="button"
      onClick={() => onClick(day)}
      className={classNames(
        'py-1.5 ',
        day.isValid ? 'bg-white hover:bg-sky-100 focus:z-10' : 'bg-gray-100 hover:cursor-not-allowed',
        day.isCurrentMonth ? 'bg-white' : 'bg-gray-200',
        day.isSelected || day.isToday ? 'font-semibold' : '',
        day.isSelected ? 'text-white' : '',
        !day.isSelected && day.isCurrentMonth && !day.isToday ? 'text-gray-900' : '',
        !day.isSelected && !day.isCurrentMonth && !day.isToday ? 'text-gray-400' : '',
        day.isToday && !day.isSelected ? 'text-sky-600' : '',
        dayIdx === 0 ? 'rounded-tl-lg' : '',
        dayIdx === 6 ? 'rounded-tr-lg' : '',
        dayIdx === days.length - 7 ? 'rounded-bl-lg' : '',
        dayIdx === days.length - 1 ? 'rounded-br-lg' : ''
      )}
    >
      <time
        dateTime={day.formattedDate}
        className={classNames(
          'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
          day?.isSelected || day?.formattedDate === selectedDay?.formattedDate ? 'text-white bg-sky-500' : ''
        )}
      >
        {day?.formattedDate?.split('-')?.shift()?.replace(/^0/, '')}
      </time>
    </button>
  );
};
