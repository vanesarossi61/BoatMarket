"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchResults from "@/components/search/SearchResults";
import type { Boat } from "@/types";

interface CategoriaClientProps {
  initialBoats: Boat[];
  total: number;
  page: number;
  totalPages: number;
  categorySlug: string;
}

export default function CategoriaClient({
  initialBoats,
  total,
  page,
  totalPages,
  categorySlug,
}: CategoriaClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("newest");

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`/embarcaciones/${categorySlug}?${params.toString()}`);
    },
    [router, searchParams, categorySlug]
  );

  const handleSortChange = useCallback((newSort: string) => {
    setSort(newSort);
  }, []);

  return (
    <SearchResults
      boats={initialBoats}
      total={total}
      page={page}
      totalPages={totalPages}
      isLoading={false}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      sort={sort}
    />
  );
}
