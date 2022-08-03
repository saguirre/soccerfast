import { forwardRef, useState } from 'react';

import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

import { FormInput, FormInputProps } from '@components';
import { classNames } from '@utils';

interface Props extends FormInputProps {
  setValue: (goals: number) => void;
  teamGoals?: number;
  errors?: any;
}

export const AddTeamGoals = forwardRef<HTMLInputElement, Props>(({ setValue, teamGoals, errors, ...props }, ref) => {
  const goalArray = [0, 1, 2, 3, 4, 5, 6, 7];
  const [teamGoalsInputEnabled, setTeamGoalsInputEnabled] = useState<boolean>(false);
  const handleInputEnabling = () => {
    if (teamGoalsInputEnabled) {
      setTeamGoalsInputEnabled(false);
      setValue(0);
    } else {
      setTeamGoalsInputEnabled(true);
    }
  };
  return (
    <div className="flex flex-col items-start gap-2 max-w-md">
      <div className="grid grid-cols-9 w-full gap-2 items-center justify-start flex-shrink-0">
        {goalArray.map((goal: number) => (
          <button
            type="button"
            key={goal}
            onClick={() => setValue(goal)}
            className={classNames(
              teamGoals === goal ? 'ring-2 ring-sky-500 text-sky-500 font-bold border-none' : '',
              'rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-regular font-semibold active:ring-4 active:border-none active:ring-sky-300 hover:border-none hover:ring-2 hover:ring-sky-500'
            )}
          >
            {goal}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleInputEnabling()}
          className={classNames(
            teamGoalsInputEnabled ? 'ring-2 ring-sky-500 text-sky-500 font-bold border-none' : '',
            'rounded-lg border border-sky-300 shadow-sm px-4 py-2 text-regular font-semibold active:ring-4 active:border-none active:ring-sky-300 hover:border-none hover:ring-2 hover:ring-sky-500'
          )}
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            {teamGoalsInputEnabled ? (
              <MinusIcon className="w-6 h-6 text-sky-500" />
            ) : (
              <PlusIcon className="w-6 h-6 text-sky-500" />
            )}
          </div>
        </button>
      </div>
      {teamGoalsInputEnabled && (
        <div className="flex flex-col">
          <span className="text-sm font-semibold my-2">More goals!?</span>
          <FormInput ref={ref} className="w-1/2 h-10" type="number" placeholder="0" {...props} />
          {errors && errors.firstTeamGoals && (
            <span className="text-sm text-rose-500 mt-1">{errors.firstTeamGoals?.message}</span>
          )}
        </div>
      )}
    </div>
  );
});
