"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchResults from "@/components/search/SearchResults";
import type { Boat } from "@/types";

interface EmbarcacionesClientProps {
  initialBoats: Boat[];
  total: number;
  page: number;
  totalPages: number;
}

export default function EmbarcacionesClient({
  initialBoats,
  total,
  page,
  totalPages,
}: EmbarcacionesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("newest");

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`/embarcaciones?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSortChange = useCallback((newSort: string) => {
    setSort(newSort);
    // En producción, esto actualizaría los searchParams y re-fetchearía
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
