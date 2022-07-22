export interface FormLabelProps {
  htmlFor?: string;
  labelText?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ labelText, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-warm-gray-900">
      {labelText}
    </label>
  );
};
