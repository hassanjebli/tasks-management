export default function TextInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`rounded-xl border-emerald-200 shadow-sm focus:border-emerald-300 
                     focus:ring focus:ring-emerald-200 focus:ring-opacity-50 
                     disabled:bg-emerald-50 disabled:text-emerald-600 w-full transition-all
                     ${className}`}
    />
  );
}
