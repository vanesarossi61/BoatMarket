import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  slug: string;
  count: number;
  icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
  {
    name: "Lanchas",
    slug: "lancha",
    count: 342,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 30L12 18H36L42 30H6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 30C6 30 12 36 24 36C36 36 42 30 42 30" stroke="currentColor" strokeWidth="2" />
        <path d="M24 18V10" stroke="currentColor" strokeWidth="2" />
        <path d="M24 10L34 16" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Veleros",
    slug: "velero",
    count: 187,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6V36" stroke="currentColor" strokeWidth="2" />
        <path d="M24 6L38 30H24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 12L12 30H24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 36C8 36 14 42 24 42C34 42 40 36 40 36H8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Yates",
    slug: "yate",
    count: 95,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 32L10 22H38L44 32H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 22V16H34V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="18" y="16" width="4" height="6" stroke="currentColor" strokeWidth="1.5" />
        <rect x="26" y="16" width="4" height="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 32C4 32 12 38 24 38C36 38 44 32 44 32" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Motos de Agua",
    slug: "moto-de-agua",
    count: 256,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 28L14 20H30L38 28H8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 20V14L26 12V20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 28C8 28 14 34 24 34C34 34 40 28 40 28" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="28" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Cruceros",
    slug: "crucero",
    count: 64,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 32L8 20H40L44 32H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 20V12H36V20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 20V16H20V20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 20V16H28V20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 20V16H36V20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 12V8" stroke="currentColor" strokeWidth="2" />
        <path d="M4 32C4 32 12 38 24 38C36 38 44 32 44 32" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Semirr\u00edgidos",
    slug: "semirrigido",
    count: 198,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="30" rx="18" ry="6" stroke="currentColor" strokeWidth="2" />
        <path d="M12 30V26C12 26 16 22 24 22C32 22 36 26 36 26V30" stroke="currentColor" strokeWidth="2" />
        <path d="M20 22V18L28 16V22" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Kayaks",
    slug: "kayak",
    count: 124,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="28" rx="20" ry="4" stroke="currentColor" strokeWidth="2" />
        <path d="M20 24L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 24L32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 12L34 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Botes Inflables",
    slug: "bote-inflable",
    count: 78,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="28" rx="16" ry="8" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="24" cy="28" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 24C14 24 18 20 24 20C30 20 34 24 34 24" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

interface CategoryGridProps {
  className?: string;
}

export default function CategoryGrid({ className }: CategoryGridProps) {
  return (
    <section className={cn("w-full", className)}>
      <h2 className="mb-6 text-2xl font-bold text-navy-900">Categor\u00edas</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/embarcaciones?tipo=${cat.slug}`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              {cat.icon}
            </div>
            <span className="text-sm font-semibold text-navy-900">{cat.name}</span>
            <span className="text-xs text-gray-400">
              {cat.count.toLocaleString("es-AR")} avisos
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
