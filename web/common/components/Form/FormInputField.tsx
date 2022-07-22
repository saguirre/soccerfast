import { classNames } from '@utils';
import { forwardRef } from 'react';
import { FormInput, FormInputProps } from './FormInput';
import { FormLabel, FormLabelProps } from './FormLabel';

interface Props extends FormInputProps, FormLabelProps {
  className?: string;
  optional?: boolean;
  optionalDescription?: boolean;
  errors?: any;
}

export const FormInputField = forwardRef<HTMLInputElement, Props>(
  ({ className, labelText, optional, optionalDescription, errors, ...props }, ref) => {
    return (
      <div className={classNames(className || '')}>
        <div className="flex justify-between">
          <FormLabel htmlFor="phone" labelText={labelText} />
          {optional && (
            <span id="phone-optional" className="text-sm text-gray-400">
              {optionalDescription}
            </span>
          )}
        </div>
        <div className="mt-1">
          <FormInput ref={ref} {...props} />
          {errors && errors[props?.name] && (
            <span className="text-sm text-rose-500 mt-1">{errors[props?.name]?.message}</span>
          )}
        </div>
      </div>
    );
  }
);
