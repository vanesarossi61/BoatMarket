"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ShoppingCart, Zap, Heart } from "lucide-react";

/* ───────── Quantity Selector ───────── */

export function QuantitySelector() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">Cantidad:</span>
      <div className="flex items-center rounded-lg border border-gray-200">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-navy-900"
          aria-label="Reducir cantidad"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm font-semibold text-navy-900">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => Math.min(10, q + 1))}
          className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-navy-900"
          aria-label="Aumentar cantidad"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <span className="text-xs text-gray-400">(Stock disponible: 12)</span>
    </div>
  );
}

/* ───────── Action Buttons ───────── */

export function ActionButtons() {
  const [fav, setFav] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Button className="flex-1 bg-amber-500 text-navy-900 hover:bg-amber-400 h-12 text-base font-semibold">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Agregar al Carrito
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 ${
            fav
              ? "border-red-300 bg-red-50 text-red-500"
              : "border-gray-200 text-gray-400 hover:text-red-500"
          }`}
          onClick={() => setFav(!fav)}
          aria-label="Agregar a favoritos"
        >
          <Heart className={`h-5 w-5 ${fav ? "fill-red-500" : ""}`} />
        </Button>
      </div>
      <Button
        variant="outline"
        className="h-12 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white text-base font-semibold"
      >
        <Zap className="mr-2 h-5 w-5" />
        Comprar Ahora
      </Button>
    </div>
  );
}

/* ───────── Product Tabs ───────── */

interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface ProductTabsProps {
  description: string;
  specs: { label: string; value: string }[];
  reviews: Review[];
}

export function ProductTabs({ description, specs, reviews }: ProductTabsProps) {
  const [active, setActive] = useState<"descripcion" | "especificaciones" | "reviews">(
    "descripcion"
  );

  const tabs = [
    { id: "descripcion" as const, label: "Descripción" },
    { id: "especificaciones" as const, label: "Especificaciones" },
    { id: "reviews" as const, label: `Reviews (${reviews.length})` },
  ];

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              active === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-navy-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {/* Descripción */}
        {active === "descripcion" && (
          <div
            className="prose prose-sm max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Especificaciones */}
        {active === "especificaciones" && (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <tbody>
                {specs.map((spec, idx) => (
                  <tr
                    key={spec.label}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-3 font-medium text-navy-900 w-1/3">
                      {spec.label}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews */}
        {active === "reviews" && (
          <div className="space-y-6">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-100 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">
                        {review.author}
                      </p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
