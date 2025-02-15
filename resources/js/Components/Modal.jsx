export default function Modal({
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {},
  children,
}) {
  function maxWidthClass(maxWidth) {
    return {
      sm: "sm:max-w-sm",
      md: "sm:max-w-md",
      lg: "sm:max-w-lg",
      xl: "sm:max-w-xl",
      "2xl": "sm:max-w-2xl",
    }[maxWidth];
  }
  return (
    <div
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all ${
        show ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidthClass(
            maxWidth
          )} p-6 border border-emerald-50`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
