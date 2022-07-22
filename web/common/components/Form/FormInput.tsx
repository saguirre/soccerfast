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
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
      {...props}
    />
  );
});
