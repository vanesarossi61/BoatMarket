"use client";

import { useState } from "react";
import BoatGrid from "@/components/boats/BoatGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutGrid, List, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Boat } from "@/types";

const SORT_OPTIONS = [
  { value: "newest", label: "M\u00e1s recientes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "length-asc", label: "Menor eslora" },
] as const;

interface SearchResultsProps {
  boats: Boat[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
  sort: string;
}

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-gray-100 p-4">
          <Skeleton className="aspect-[16/10] w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-8 w-1/3" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50">
        <Ship className="h-10 w-10 text-blue-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-navy-900">
        No encontramos embarcaciones con esos filtros
      </h3>
      <p className="max-w-md text-sm text-gray-500">
        Prob\u00e1 ajustando los filtros o ampliando tu b\u00fasqueda para ver m\u00e1s resultados.
      </p>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const pages: (number | "...")[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="text-xs"
      >
        Anterior
      </Button>
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400">
            \u2026
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(p)}
            className={cn(
              "h-8 w-8 p-0 text-xs",
              p === page && "bg-navy-900 text-white hover:bg-navy-800"
            )}
          >
            {p}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="text-xs"
      >
        Siguiente
      </Button>
    </nav>
  );
}

export default function SearchResults({
  boats,
  total,
  page,
  totalPages,
  isLoading,
  onPageChange,
  onSortChange,
  sort,
}: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-navy-900">{total.toLocaleString("es-AR")}</span>{" "}
          embarcaciones encontradas
        </p>

        <div className="flex items-center gap-2">
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger className="h-9 w-44 text-sm">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-l-lg transition-colors",
                viewMode === "grid"
                  ? "bg-navy-900 text-white"
                  : "text-gray-400 hover:text-navy-900"
              )}
              aria-label="Vista grilla"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-r-lg transition-colors",
                viewMode === "list"
                  ? "bg-navy-900 text-white"
                  : "text-gray-400 hover:text-navy-900"
              )}
              aria-label="Vista lista"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <ResultsSkeleton />
      ) : boats.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <BoatGrid boats={boats} viewMode={viewMode} />
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
          )}
        </>
      )}
    </div>
  );
}
