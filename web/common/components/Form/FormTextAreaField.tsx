import { classNames } from '@utils';
import { forwardRef } from 'react';
import { FormLabel, FormLabelProps } from './FormLabel';
import { FormTextArea, FormTextAreaProps } from './FormTextArea';

interface Props extends FormTextAreaProps, FormLabelProps {
  className?: string;
  optional?: boolean;
  optionalDescription?: boolean;
  errors?: any;
}

export const FormTextAreaField = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, labelText, htmlFor, optional, optionalDescription, errors, ...props }, ref) => {
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
          <FormTextArea ref={ref} {...props} />
          {errors[props.name] && <span className="text-sm text-rose-500 mt-1">{errors[props.name].message}</span>}
        </div>
      </div>
    );
  }
);
