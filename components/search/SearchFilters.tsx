"use client";

import { useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TIPOS = [
  "Lancha",
  "Velero",
  "Yate",
  "Moto de agua",
  "Crucero",
  "Semirr\u00edgido",
  "Kayak",
  "Bote Inflable",
] as const;

const MARCAS_TOP = [
  "Bermuda",
  "Quicksilver",
  "Canestrari",
  "Regnicoli",
  "Tracker",
  "Fishing",
  "Bermuda",
  "Prinz",
  "Altamar",
  "Beneteau",
] as const;

const COMBUSTIBLES = ["Nafta", "Di\u00e9sel", "El\u00e9ctrico"] as const;
const CONDICIONES = ["Nuevo", "Usado", "Reacondicionado"] as const;
const RADIOS_KM = ["10", "25", "50", "100", "200"] as const;

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-gray-100 pb-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold text-navy-900 hover:text-blue-600">
        {title}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}

export default function SearchFilters() {
  const {
    filters,
    setFilter,
    toggleArrayFilter,
    clearFilters,
    priceRange,
    setPriceRange,
  } = useFilters();

  const [showAllMarcas, setShowAllMarcas] = useState(false);
  const marcasToShow = showAllMarcas ? MARCAS_TOP : MARCAS_TOP.slice(0, 6);

  return (
    <aside className="w-full rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:w-72">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy-900">Filtros</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs text-gray-500 hover:text-red-500"
        >
          <X className="mr-1 h-3 w-3" />
          Limpiar filtros
        </Button>
      </div>

      {/* Tipo */}
      <FilterSection title="Tipo de embarcaci\u00f3n">
        <div className="space-y-2">
          {TIPOS.map((tipo) => (
            <label key={tipo} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={filters.tipos?.includes(tipo) ?? false}
                onCheckedChange={() => toggleArrayFilter("tipos", tipo)}
              />
              <span className="text-gray-700">{tipo}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Precio */}
      <FilterSection title="Precio">
        <div className="space-y-3">
          <Slider
            min={0}
            max={500000}
            step={5000}
            value={[priceRange.min, priceRange.max]}
            onValueChange={([min, max]) => setPriceRange({ min, max })}
            className="mt-2"
          />
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label className="text-xs text-gray-500">M\u00ednimo</Label>
              <Input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))
                }
                className="h-8 text-sm"
                placeholder="USD 0"
              />
            </div>
            <span className="mt-5 text-gray-400">\u2013</span>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">M\u00e1ximo</Label>
              <Input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                }
                className="h-8 text-sm"
                placeholder="USD 500.000"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* A\u00f1o */}
      <FilterSection title="A\u00f1o">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Desde"
            value={filters.yearMin ?? ""}
            onChange={(e) => setFilter("yearMin", e.target.value ? Number(e.target.value) : undefined)}
            className="h-8 text-sm"
          />
          <span className="text-gray-400">\u2013</span>
          <Input
            type="number"
            placeholder="Hasta"
            value={filters.yearMax ?? ""}
            onChange={(e) => setFilter("yearMax", e.target.value ? Number(e.target.value) : undefined)}
            className="h-8 text-sm"
          />
        </div>
      </FilterSection>

      {/* Eslora */}
      <FilterSection title="Eslora (metros)">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="M\u00edn"
            value={filters.esloraMin ?? ""}
            onChange={(e) => setFilter("esloraMin", e.target.value ? Number(e.target.value) : undefined)}
            className="h-8 text-sm"
          />
          <span className="text-gray-400">\u2013</span>
          <Input
            type="number"
            placeholder="M\u00e1x"
            value={filters.esloraMax ?? ""}
            onChange={(e) => setFilter("esloraMax", e.target.value ? Number(e.target.value) : undefined)}
            className="h-8 text-sm"
          />
        </div>
      </FilterSection>

      {/* Marca */}
      <FilterSection title="Marca">
        <div className="space-y-2">
          {marcasToShow.map((marca) => (
            <label key={marca} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={filters.marcas?.includes(marca) ?? false}
                onCheckedChange={() => toggleArrayFilter("marcas", marca)}
              />
              <span className="text-gray-700">{marca}</span>
            </label>
          ))}
          <button
            onClick={() => setShowAllMarcas(!showAllMarcas)}
            className="mt-1 text-xs font-medium text-blue-600 hover:underline"
          >
            {showAllMarcas ? "Ver menos" : "Ver m\u00e1s marcas"}
          </button>
        </div>
      </FilterSection>

      {/* Combustible */}
      <FilterSection title="Combustible">
        <div className="space-y-2">
          {COMBUSTIBLES.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={filters.combustibles?.includes(c) ?? false}
                onCheckedChange={() => toggleArrayFilter("combustibles", c)}
              />
              <span className="text-gray-700">{c}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condici\u00f3n */}
      <FilterSection title="Condici\u00f3n">
        <div className="space-y-2">
          {CONDICIONES.map((cond) => (
            <label key={cond} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={filters.condiciones?.includes(cond) ?? false}
                onCheckedChange={() => toggleArrayFilter("condiciones", cond)}
              />
              <span className="text-gray-700">{cond}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Ubicaci\u00f3n */}
      <FilterSection title="Ubicaci\u00f3n" defaultOpen={false}>
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Ciudad o zona..."
            value={filters.ubicacion ?? ""}
            onChange={(e) => setFilter("ubicacion", e.target.value)}
            className="h-8 text-sm"
          />
          <RadioGroup
            value={filters.radioKm ?? "50"}
            onValueChange={(val) => setFilter("radioKm", val)}
            className="flex flex-wrap gap-2"
          >
            {RADIOS_KM.map((km) => (
              <label
                key={km}
                className="flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-600"
              >
                <RadioGroupItem value={km} className="sr-only" />
                {km} km
              </label>
            ))}
          </RadioGroup>
        </div>
      </FilterSection>
    </aside>
  );
}
