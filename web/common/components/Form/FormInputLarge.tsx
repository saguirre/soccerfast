interface Props {
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
}

export const FormInputLarge: React.FC<Props> = ({ id, type, name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className="block w-full py-3 text-base rounded-md placeholder-gray-400 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:flex-1 border-gray-300"
      placeholder={placeholder}
    />
  );
};
