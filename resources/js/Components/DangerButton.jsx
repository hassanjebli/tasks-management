export default function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-6 py-3 bg-red-500 border border-transparent 
                      rounded-xl font-semibold text-white tracking-wide transition-all
                      hover:bg-red-600 focus:bg-red-600 active:bg-red-700 
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
