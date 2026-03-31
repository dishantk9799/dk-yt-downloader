export const AsciiBox = ({ title, children }) => {
  return (
    <div className="w-full font-mono text-green-400">
    <div className="flex items-center text-cyan-400">
      <span>┌</span>
      <span className="flex-1 border-t border-cyan-400" />
      <span>┐</span>
    </div>
    {title && (
      <div className="flex items-center text-yellow-400 px-2 text-xs sm:text-sm">
        <span className="mr-2">[ {title} ]</span>
        <span className="flex-1 border-t border-cyan-400" />
      </div>
    )}
    <div className="px-2 py-2 text-xs sm:text-sm break-words">{children}</div>
    <div className="flex items-center text-cyan-400">
      <span>└</span>
      <span className="flex-1 border-t border-cyan-400" />
      <span>┘</span>
    </div>
  </div>
  );
};