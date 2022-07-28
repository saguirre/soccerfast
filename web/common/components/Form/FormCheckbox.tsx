interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  name: string;
  setChecked: (checked: boolean) => void;
  description?: string;
}

export const FormCheckbox: React.FC<CheckboxProps> = ({ id, label, name, checked, setChecked, description }) => {
  return (
    <fieldset className="space-y-5">
      <legend className="sr-only">Checkbox</legend>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            aria-describedby="offers-description"
            name={name}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            type="checkbox"
            className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor={name} className="font-medium text-gray-700">
            {label}
          </label>
          <span id={`${name}-description`} className="text-gray-500">
            <span className="sr-only">{label} </span>
            {description}
          </span>
        </div>
      </div>
    </fieldset>
  );
};
