const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  required,
  onChange,
  name,
  style,
}) => {
  return (
    <div className="my-4">
      <label htmlFor={id} className={`block mb-2 ${style}`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        className="border border-gray-300 p-2 rounded w-full text-black"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
