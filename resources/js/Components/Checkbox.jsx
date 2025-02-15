export default function Checkbox({ className = "", ...props }) {
  return (
    <input
      {...props}
      type="checkbox"
      className={`rounded border-emerald-300 text-emerald-600 shadow-sm 
                     focus:border-emerald-300 focus:ring focus:ring-emerald-200 
                     focus:ring-opacity-50 disabled:bg-emerald-50 ${className}`}
    />
  );
}
