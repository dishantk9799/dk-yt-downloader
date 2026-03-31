export const AsciiInput = ({ value, onChange, placeholder, onKeyDown }) => {
  return (
     <div className="flex items-center w-full border-2 border-green-400 px-2 py-2 bg-black font-mono text-xs sm:text-sm">
    <span className="text-cyan-400 mr-2 shrink-0">{">"}</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="bg-transparent outline-none text-green-400 w-full placeholder-gray-600"
    />
    <span className="ml-1 animate-pulse text-green-400 shrink-0">█</span>
  </div>
  );
};