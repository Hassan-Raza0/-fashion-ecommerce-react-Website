import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm py-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <HiChevronRight className="text-neutral-400" size={14} />}
          {item.to ? (
            <Link to={item.to} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-900 dark:text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
