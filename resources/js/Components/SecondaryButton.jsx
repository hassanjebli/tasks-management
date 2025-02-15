export default function SecondaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-6 py-3 bg-white border border-emerald-200
                      rounded-xl font-semibold text-emerald-600 tracking-wide transition-all
                      hover:border-emerald-300 hover:bg-emerald-50 focus:bg-emerald-50 
                      active:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                      focus:ring-offset-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
                      ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
