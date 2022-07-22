import { forwardRef } from 'react';

import { ChangeHandler } from 'react-hook-form';

export interface FormTextAreaProps {
  id?: string;
  type?: string;
  name: string;
  rows?: number;
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

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-sky-500 focus:border-sky-500 border border-gray-300 rounded-md placeholder-gray-400 text-sm"
      aria-describedby="message-max"
    />
  );
});
