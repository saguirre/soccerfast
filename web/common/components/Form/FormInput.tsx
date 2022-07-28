import { classNames } from '@utils/*';
import { forwardRef } from 'react';

import { ChangeHandler } from 'react-hook-form';

export interface FormInputProps {
  id?: string;
  type?: string;
  name: string;
  placeholder?: string;
  onChange?: ChangeHandler;
  onBlur: ChangeHandler;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={classNames(
        className || '',
        'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-none focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm'
      )}
      {...props}
    />
  );
});
