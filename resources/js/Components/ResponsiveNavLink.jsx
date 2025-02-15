export default function ResponsiveNavLink({
  href,
  active,
  children,
  ...props
}) {
  return (
    <a
      href={href}
      className={`block px-4 py-3 rounded-lg transition-colors
                    ${
                      active
                        ? "bg-emerald-500 text-white"
                        : "text-emerald-600 hover:bg-emerald-50"
                    }
                    sm:inline-block sm:rounded-xl`}
      {...props}
    >
      {children}
    </a>
  );
}
