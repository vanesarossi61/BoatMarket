"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GripVertical,
  ImagePlus,
  Loader2,
  Ship,
  Trash2,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Schemas de validacion por step                                     */
/* ------------------------------------------------------------------ */

const stepOneSchema = z.object({
  titulo: z.string().min(5, "El titulo debe tener al menos 5 caracteres"),
  tipo: z.string().min(1, "Selecciona un tipo"),
  marca: z.string().min(1, "Ingresa la marca"),
  modelo: z.string().min(1, "Ingresa el modelo"),
  anio: z.coerce.number().min(1950, "Anio invalido").max(new Date().getFullYear() + 1, "Anio invalido"),
  condicion: z.string().min(1, "Selecciona la condicion"),
});

const stepTwoSchema = z.object({
  eslora: z.coerce.number().positive("Ingresa la eslora"),
  manga: z.coerce.number().positive("Ingresa la manga"),
  calado: z.coerce.number().positive("Ingresa el calado"),
  peso: z.coerce.number().positive("Ingresa el peso"),
  motor: z.string().min(1, "Ingresa el motor"),
  potenciaHP: z.coerce.number().positive("Ingresa la potencia"),
  combustible: z.string().min(1, "Selecciona el combustible"),
  capacidadPersonas: z.coerce.number().int().positive("Ingresa la capacidad"),
  cabinas: z.coerce.number().int().min(0, "Valor invalido"),
  camarotes: z.coerce.number().int().min(0, "Valor invalido"),
});

const stepThreeSchema = z.object({
  fotos: z.array(z.object({ id: z.string(), preview: z.string() })).min(3, "Subi al menos 3 fotos"),
});

const stepFourSchema = z.object({
  precio: z.coerce.number().positive("Ingresa el precio"),
  moneda: z.enum(["ARS", "USD"]),
  provincia: z.string().min(1, "Selecciona la provincia"),
  ciudad: z.string().min(1, "Ingresa la ciudad"),
  descripcion: z.string().min(20, "La descripcion debe tener al menos 20 caracteres"),
});

const schemas = [stepOneSchema, stepTwoSchema, stepThreeSchema, stepFourSchema] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PhotoItem {
  id: string;
  preview: string;
}

interface ListingData {
  titulo: string;
  tipo: string;
  marca: string;
  modelo: string;
  anio: number | "";
  condicion: string;
  eslora: number | "";
  manga: number | "";
  calado: number | "";
  peso: number | "";
  motor: string;
  potenciaHP: number | "";
  combustible: string;
  capacidadPersonas: number | "";
  cabinas: number | "";
  camarotes: number | "";
  fotos: PhotoItem[];
  precio: number | "";
  moneda: "ARS" | "USD";
  provincia: string;
  ciudad: string;
  descripcion: string;
}

const INITIAL_DATA: ListingData = {
  titulo: "", tipo: "", marca: "", modelo: "", anio: "", condicion: "",
  eslora: "", manga: "", calado: "", peso: "", motor: "", potenciaHP: "",
  combustible: "", capacidadPersonas: "", cabinas: "", camarotes: "",
  fotos: [],
  precio: "", moneda: "USD", provincia: "", ciudad: "", descripcion: "",
};

const TIPOS = ["Lancha", "Velero", "Yate", "Moto de agua", "Crucero", "Semirrigido"];
const CONDICIONES = ["Nuevo", "Usado", "Reacondicionado"];
const COMBUSTIBLES = ["Nafta", "Diesel", "Electrico"];
const PROVINCIAS = [
  "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Cordoba",
  "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja",
  "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan",
  "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero",
  "Tierra del Fuego", "Tucuman",
];

const STEP_LABELS = [
  "Datos basicos",
  "Especificaciones",
  "Fotos",
  "Precio y ubicacion",
  "Preview",
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {STEP_LABELS.map((label, idx) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                idx < current
                  ? "bg-blue-600 text-white"
                  : idx === current
                    ? "bg-navy-900 text-white"
                    : "bg-gray-100 text-gray-400"
              )}
            >
              {idx < current ? <Check className="h-4 w-4" /> : idx + 1}
            </div>
            <span
              className={cn(
                "mt-1.5 hidden text-xs sm:block",
                idx <= current ? "font-medium text-navy-900" : "text-gray-400"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-3 h-1.5 rounded-full bg-gray-100">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-navy-900 transition-all"
          style={{ width: `${(current / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ListingForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ListingData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof ListingData>(key: K, value: ListingData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep = (): boolean => {
    if (step >= 4) return true; // preview step
    const schema = schemas[step];
    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const newErrors: Record<string, string> = {};
    result.error.issues.forEach((i) => {
      const key = String(i.path[0]);
      if (!newErrors[key]) newErrors[key] = i.message;
    });
    setErrors(newErrors);
    return false;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 4));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  /* Photo handling (placeholder -- simulates file selection) */
  const addPhotos = useCallback(() => {
    const newPhotos: PhotoItem[] = Array.from({ length: 3 }, (_, i) => ({
      id: `photo-${Date.now()}-${i}`,
      preview: `/placeholder-boat-${(data.fotos.length + i) % 5 + 1}.jpg`,
    }));
    setData((prev) => ({
      ...prev,
      fotos: [...prev.fotos, ...newPhotos].slice(0, 20),
    }));
  }, [data.fotos.length]);

  const removePhoto = (id: string) => {
    setData((prev) => ({ ...prev, fotos: prev.fotos.filter((p) => p.id !== id) }));
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error");
      toast({
        title: "\u00a1Embarcacion publicada!",
        description: "Tu aviso ya esta visible en BoatMarket.",
      });
    } catch {
      toast({
        title: "Error",
        description: "No pudimos publicar tu embarcacion. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------- Field helper ------- */
  const fieldInput = (key: keyof ListingData, label: string, type = "text", placeholder = "") => (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={data[key] as string | number}
        onChange={(e) => updateField(key, type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) as any : e.target.value as any)}
        className={errors[key] ? "border-red-400" : ""}
      />
      {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  const fieldSelect = (key: keyof ListingData, label: string, options: string[]) => (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Select value={data[key] as string} onValueChange={(v) => updateField(key, v as any)}>
        <SelectTrigger className={errors[key] ? "border-red-400" : ""}>
          <SelectValue placeholder={`Selecciona ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <ProgressBar current={step} total={5} />

      {/* STEP 0 -- Datos basicos */}
      {step === 0 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-navy-900">Datos b\u00e1sicos</h2>
          {fieldInput("titulo", "T\u00edtulo del aviso", "text", "Ej: Bermuda Classic 175 - Impecable")}
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldSelect("tipo", "Tipo", TIPOS)}
            {fieldInput("marca", "Marca", "text", "Ej: Bermuda")}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {fieldInput("modelo", "Modelo", "text", "Ej: Classic 175")}
            {fieldInput("anio", "A\u00f1o", "number", "2024")}
            {fieldSelect("condicion", "Condici\u00f3n", CONDICIONES)}
          </div>
        </div>
      )}

      {/* STEP 1 -- Especificaciones */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-navy-900">Especificaciones t\u00e9cnicas</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {fieldInput("eslora", "Eslora (m)", "number", "5.20")}
            {fieldInput("manga", "Manga (m)", "number", "2.30")}
            {fieldInput("calado", "Calado (m)", "number", "0.45")}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {fieldInput("peso", "Peso (kg)", "number", "800")}
            {fieldInput("motor", "Motor", "text", "Mercury 150 HP")}
            {fieldInput("potenciaHP", "Potencia (HP)", "number", "150")}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {fieldSelect("combustible", "Combustible", COMBUSTIBLES)}
            {fieldInput("capacidadPersonas", "Capacidad (personas)", "number", "8")}
            {fieldInput("cabinas", "Cabinas", "number", "0")}
          </div>
          {fieldInput("camarotes", "Camarotes", "number", "0")}
        </div>
      )}

      {/* STEP 2 -- Fotos */}
      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-navy-900">Fotos</h2>
          <p className="text-sm text-gray-500">
            Sub\u00ed entre 3 y 20 fotos. La primera ser\u00e1 la imagen principal.
          </p>

          {/* Drop zone */}
          <button
            type="button"
            onClick={addPhotos}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 transition-colors hover:border-blue-400 hover:bg-blue-50"
          >
            <Upload className="h-10 w-10 text-blue-400" />
            <span className="text-sm font-medium text-navy-900">Arrastr\u00e1 tus fotos ac\u00e1 o hac\u00e9 click para seleccionar</span>
            <span className="text-xs text-gray-400">JPG, PNG o WEBP. M\u00e1x 10 MB por foto.</span>
          </button>

          {errors.fotos && <p className="text-xs text-red-500">{errors.fotos}</p>}

          {/* Thumbnails grid */}
          {data.fotos.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {data.fotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className={cn(
                    "group relative aspect-square overflow-hidden rounded-lg border-2 bg-gray-100",
                    idx === 0 ? "border-amber-500" : "border-transparent"
                  )}
                >
                  <div className="flex h-full items-center justify-center">
                    <ImagePlus className="h-8 w-8 text-gray-300" />
                  </div>
                  {idx === 0 && (
                    <span className="absolute left-1 top-1 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Principal
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/40 px-1 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <GripVertical className="h-3.5 w-3.5 cursor-grab text-white" />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="text-white hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400">{data.fotos.length}/20 fotos</p>
        </div>
      )}

      {/* STEP 3 -- Precio y ubicacion */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-navy-900">Precio y ubicaci\u00f3n</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldInput("precio", "Precio", "number", "35000")}
            {fieldSelect("moneda", "Moneda", ["USD", "ARS"])}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldSelect("provincia", "Provincia", PROVINCIAS)}
            {fieldInput("ciudad", "Ciudad", "text", "Ej: Tigre")}
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Descripci\u00f3n</Label>
            <Textarea
              placeholder="Cont\u00e1 los detalles de tu embarcaci\u00f3n, historial, equipamiento incluido..."
              rows={5}
              value={data.descripcion}
              onChange={(e) => updateField("descripcion", e.target.value)}
              className={errors.descripcion ? "border-red-400" : ""}
            />
            {errors.descripcion && <p className="text-xs text-red-500">{errors.descripcion}</p>}
          </div>
        </div>
      )}

      {/* STEP 4 -- Preview */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-navy-900">Revis\u00e1 tu publicaci\u00f3n</h2>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <Ship className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-navy-900">{data.titulo || "Sin titulo"}</h3>
                <p className="text-sm text-gray-500">
                  {data.tipo} \u00b7 {data.marca} {data.modelo} \u00b7 {data.anio}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-500">ESPECIFICACIONES</h4>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="text-gray-500">Eslora</dt><dd className="font-medium">{data.eslora} m</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Manga</dt><dd className="font-medium">{data.manga} m</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Motor</dt><dd className="font-medium">{data.motor}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Potencia</dt><dd className="font-medium">{data.potenciaHP} HP</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Combustible</dt><dd className="font-medium">{data.combustible}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Capacidad</dt><dd className="font-medium">{data.capacidadPersonas} personas</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Condici\u00f3n</dt><dd className="font-medium">{data.condicion}</dd></div>
                </dl>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-500">PRECIO Y UBICACI\u00d3N</h4>
                <p className="text-2xl font-bold text-navy-900">
                  {data.moneda} {Number(data.precio).toLocaleString("es-AR")}
                </p>
                <p className="text-sm text-gray-500">{data.ciudad}, {data.provincia}</p>
                <p className="mt-3 text-sm text-gray-500">{data.fotos.length} fotos</p>
              </div>
            </div>

            {data.descripcion && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="mb-1 text-sm font-semibold text-gray-500">DESCRIPCI\u00d3N</h4>
                <p className="whitespace-pre-line text-sm text-gray-700">{data.descripcion}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
          disabled={step === 0}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </Button>

        {step < 4 ? (
          <Button
            type="button"
            onClick={next}
            className="gap-1 bg-navy-900 text-white hover:bg-navy-800"
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handlePublish}
            disabled={isSubmitting}
            className="gap-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            {isSubmitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Publicando...</>
            ) : (
              <><Ship className="h-4 w-4" /> Publicar embarcaci\u00f3n</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
