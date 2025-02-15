export default function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-6 py-3 bg-emerald-500 border border-transparent 
                      rounded-xl font-semibold text-white tracking-wide transition-all
                      hover:bg-emerald-600 focus:bg-emerald-600 active:bg-emerald-700 
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                      shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
                      ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
