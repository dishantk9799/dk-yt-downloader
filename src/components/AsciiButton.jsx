export const AsciiButton = ({ children, onClick, disabled, variant = "primary" }) => {
  const base =
    'w-full sm:w-auto text-center font-mono px-4 py-2 border-2 transition-all duration-200 text-xs sm:text-sm';

  const styles = {
    primary: "border-green-400 text-green-400 hover:bg-green-400 hover:text-black",
    secondary: "border-red-400 text-red-400 hover:bg-red-400 hover:text-black",
    cyan: "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black",
  };

  return (
   <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full sm:w-auto text-center font-mono px-4 py-2 border-2 transition-all duration-200 text-xs sm:text-sm ${styles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      [ {children} ]
    </button>
  );
};