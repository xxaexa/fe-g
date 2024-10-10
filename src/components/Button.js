const Button = ({ label = "Login", onClick, disabled = false }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
