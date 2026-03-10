"use client";

import Image from "next/image";
import { useCompare } from "@/hooks/useCompare";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatters";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Boat } from "@/types";

interface CompareRow {
  label: string;
  key: string;
  getValue: (boat: Boat) => string | number;
  bestIs?: "min" | "max";
}

const COMPARE_ROWS: CompareRow[] = [
  {
    label: "Precio",
    key: "price",
    getValue: (b) => formatPrice(b.price, b.currency ?? "USD"),
    bestIs: "min",
  },
  { label: "A\u00f1o", key: "year", getValue: (b) => b.year, bestIs: "max" },
  { label: "Eslora", key: "length", getValue: (b) => `${b.length} m` },
  { label: "Manga", key: "beam", getValue: (b) => `${b.beam} m` },
  { label: "Motor", key: "engine", getValue: (b) => b.engine ?? "\u2013" },
  {
    label: "Potencia",
    key: "horsepower",
    getValue: (b) => (b.horsepower ? `${b.horsepower} HP` : "\u2013"),
    bestIs: "max",
  },
  { label: "Combustible", key: "fuelType", getValue: (b) => b.fuelType ?? "\u2013" },
  {
    label: "Capacidad",
    key: "capacity",
    getValue: (b) => (b.capacity ? `${b.capacity} pers.` : "\u2013"),
    bestIs: "max",
  },
  { label: "Condici\u00f3n", key: "condition", getValue: (b) => b.condition ?? "\u2013" },
  { label: "Ubicaci\u00f3n", key: "location", getValue: (b) => b.location ?? "\u2013" },
];

function getBestIndex(boats: (Boat | null)[], row: CompareRow): number | null {
  if (!row.bestIs) return null;
  const numericBoats = boats.map((b, idx) => {
    if (!b) return { idx, val: null };
    const raw = row.key === "price" ? b.price : (b as any)[row.key];
    const num = typeof raw === "number" ? raw : parseFloat(String(raw));
    return { idx, val: isNaN(num) ? null : num };
  });
  const valid = numericBoats.filter((v) => v.val !== null) as { idx: number; val: number }[];
  if (valid.length < 2) return null;
  const best =
    row.bestIs === "min"
      ? valid.reduce((a, b) => (a.val < b.val ? a : b))
      : valid.reduce((a, b) => (a.val > b.val ? a : b));
  return best.idx;
}

export default function CompareTable() {
  const { boats, removeBoat } = useCompare();

  /* Pad to 3 slots */
  const slots: (Boat | null)[] = [
    boats[0] ?? null,
    boats[1] ?? null,
    boats[2] ?? null,
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full min-w-[640px] border-collapse">
        {/* Header with images */}
        <thead>
          <tr>
            <th className="w-36 border-b border-gray-100 bg-gray-50 p-4 text-left text-xs font-semibold uppercase text-gray-500">
              Comparar
            </th>
            {slots.map((boat, idx) => (
              <th key={idx} className="border-b border-gray-100 p-4">
                {boat ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative h-24 w-36 overflow-hidden rounded-lg bg-gray-100">
                      {boat.images?.[0] && (
                        <Image
                          src={boat.images[0]}
                          alt={boat.title}
                          fill
                          className="object-cover"
                          sizes="144px"
                        />
                      )}
                    </div>
                    <span className="text-sm font-semibold text-navy-900">{boat.title}</span>
                    <button
                      onClick={() => removeBoat(boat.id)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <div className="flex h-24 w-36 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                      <Plus className="h-8 w-8 text-gray-300" />
                    </div>
                    <span className="text-xs text-gray-400">Agregar embarcaci\u00f3n</span>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Data rows */}
        <tbody>
          {COMPARE_ROWS.map((row) => {
            const bestIdx = getBestIndex(slots, row);
            return (
              <tr key={row.key} className="border-b border-gray-50 last:border-b-0">
                <td className="bg-gray-50 p-3 text-sm font-medium text-gray-600">
                  {row.label}
                </td>
                {slots.map((boat, idx) => (
                  <td
                    key={idx}
                    className={cn(
                      "p-3 text-center text-sm",
                      boat ? "text-navy-900" : "text-gray-300",
                      bestIdx === idx && "bg-green-50 font-semibold text-green-700"
                    )}
                  >
                    {boat ? row.getValue(boat) : "\u2013"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
