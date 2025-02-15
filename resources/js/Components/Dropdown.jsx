export default function Dropdown({
  className = "",
  align = "right",
  width = "48",
  contentClasses = "py-2",
  ...props
}) {
  const widthClass = {
    48: "w-48",
  };

  const alignClass = {
    right: "right-0",
    left: "left-0",
  };
  return (
    <div className={`relative ${className}`}>
      {props.trigger}
      <div
        className={`absolute z-50 mt-2 ${widthClass[width]} rounded-xl shadow-lg 
                           bg-white border border-emerald-100 ${alignClass[align]} transition-all`}
      >
        <div className={`rounded-xl bg-white ${contentClasses}`}>
          {props.content}
        </div>
      </div>
    </div>
  );
}
