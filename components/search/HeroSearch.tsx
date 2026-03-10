"use client";

import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const TIPOS_EMBARCACION = [
  { value: "lancha", label: "Lancha" },
  { value: "velero", label: "Velero" },
  { value: "yate", label: "Yate" },
  { value: "moto-de-agua", label: "Moto de agua" },
  { value: "crucero", label: "Crucero" },
  { value: "semirrigido", label: "Semirr\u00edgido" },
] as const;

const UBICACIONES = [
  { value: "buenos-aires", label: "Buenos Aires" },
  { value: "tigre", label: "Tigre" },
  { value: "rosario", label: "Rosario" },
  { value: "mar-del-plata", label: "Mar del Plata" },
  { value: "bariloche", label: "Bariloche" },
  { value: "corrientes", label: "Corrientes" },
] as const;

export default function HeroSearch() {
  const { query, setQuery, filters, setFilters, handleSearch } = useSearch();
  const [tipo, setTipo] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      tipo: tipo || undefined,
      ubicacion: ubicacion || undefined,
    }));
    handleSearch();
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-navy-900 via-blue-800 to-blue-600 py-20 md:py-32">
      {/* Decorative wave overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H0V60Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Encontr\u00e1 tu embarcaci\u00f3n ideal
        </h1>
        <p className="mb-10 text-lg text-sky-100 md:text-xl">
          Miles de embarcaciones nuevas y usadas en toda Argentina
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-sm md:flex-row md:items-center md:gap-2 md:rounded-full md:p-2"
        >
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar embarcaciones..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 border-0 bg-transparent pl-10 text-base text-navy-900 placeholder:text-gray-400 focus-visible:ring-0 md:text-lg"
            />
          </div>

          {/* Tipo embarcacion */}
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger className="h-12 w-full border-gray-200 bg-gray-50 md:w-44">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {TIPOS_EMBARCACION.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Ubicacion */}
          <Select value={ubicacion} onValueChange={setUbicacion}>
            <SelectTrigger className="h-12 w-full border-gray-200 bg-gray-50 md:w-44">
              <SelectValue placeholder="Ubicaci\u00f3n" />
            </SelectTrigger>
            <SelectContent>
              {UBICACIONES.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            className="h-12 rounded-full bg-navy-900 px-8 text-base font-semibold text-white hover:bg-navy-800 md:rounded-full"
          >
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </form>

        <p className="mt-6 text-sm text-sky-200">
          Lanchas \u00b7 Veleros \u00b7 Yates \u00b7 Motos de Agua \u00b7 Cruceros \u00b7 Semirr\u00edgidos
        </p>
      </div>
    </section>
  );
}
