import { Link } from "@inertiajs/react";

const Pagination = ({ data, links, meta }) => {
  return (
    <nav className="flex items-center justify-between border-emerald-100 px-4 sm:px-0">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={links.prev}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
            !links.prev
              ? "text-emerald-300 cursor-not-allowed"
              : "text-emerald-600 hover:text-emerald-800"
          }`}
        >
          Previous
        </Link>
        <Link
          href={links.next}
          className={`ml-3 inline-flex items-center px-4 py-2 text-sm font-medium ${
            !links.next
              ? "text-emerald-300 cursor-not-allowed"
              : "text-emerald-600 hover:text-emerald-800"
          }`}
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-emerald-600">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of{" "}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          <ul className="flex space-x-2">
            {meta.links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.url}
                  className={`inline-flex items-center px-3.5 py-2 text-sm font-medium rounded-lg ${
                    link.active
                      ? "bg-emerald-600 text-white"
                      : "text-emerald-600 hover:bg-emerald-50"
                  } ${
                    !link.url
                      ? "text-emerald-300 cursor-not-allowed"
                      : "hover:text-emerald-800"
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
