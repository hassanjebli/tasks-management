import { Link } from "@inertiajs/react";

export default function NavLink({ href, active, children, ...props }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 rounded-xl transition-colors
                    ${
                      active
                        ? "bg-emerald-500 text-white"
                        : "text-emerald-600 hover:bg-emerald-50"
                    }`}
      {...props}
    >
      {children}
    </Link>
  );
}
