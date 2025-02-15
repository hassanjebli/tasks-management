export default function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return (
    <label
      {...props}
      className={`block text-sm font-semibold text-emerald-700 mb-2 tracking-wide ${className}`}
    >
      {value || children}
    </label>
  );
}
