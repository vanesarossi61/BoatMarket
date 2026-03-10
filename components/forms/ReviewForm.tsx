"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Star, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z.number().min(1, "Selecciona una calificacion").max(5),
  titulo: z.string().min(3, "El titulo debe tener al menos 3 caracteres"),
  texto: z.string().min(10, "La resena debe tener al menos 10 caracteres"),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
});

type ReviewData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  boatId?: string;
  onSuccess?: () => void;
}

function StarRating({
  value,
  hoverValue,
  onChange,
  onHover,
  onLeave,
}: {
  value: number;
  hoverValue: number;
  onChange: (v: number) => void;
  onHover: (v: number) => void;
  onLeave: () => void;
}) {
  return (
    <div className="flex gap-1" onMouseLeave={onLeave}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover(star)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "h-8 w-8 transition-colors",
              (hoverValue || value) >= star
                ? "fill-amber-500 text-amber-500"
                : "fill-gray-200 text-gray-200"
            )}
          />
        </button>
      ))}
      <span className="ml-2 self-center text-sm text-gray-500">
        {hoverValue || value
          ? ["Malo", "Regular", "Bueno", "Muy bueno", "Excelente"][
              (hoverValue || value) - 1
            ]
          : "Selecciona"}
      </span>
    </div>
  );
}

function DynamicList({
  items,
  onChange,
  placeholder,
  icon,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  icon: React.ReactNode;
}) {
  const addItem = () => onChange([...items, ""]);
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, value: string) => {
    const updated = [...items];
    updated[idx] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {icon}
          <Input
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
            placeholder={placeholder}
            className="h-8 flex-1 text-sm"
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={addItem} className="gap-1 text-xs">
        <Plus className="h-3 w-3" />
        Agregar
      </Button>
    </div>
  );
}

export default function ReviewForm({ boatId, onSuccess }: ReviewFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    rating: 0,
    titulo: "",
    texto: "",
    pros: [""] as string[],
    cons: [""] as string[],
  });

  const updateField = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      pros: formData.pros.filter((p) => p.trim()),
      cons: formData.cons.filter((c) => c.trim()),
    };

    const result = reviewSchema.safeParse(cleanedData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        if (!newErrors[key]) newErrors[key] = i.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, boatId }),
      });
      if (!res.ok) throw new Error("Error");

      toast({
        title: "\u00a1Gracias por tu resena!",
        description: "Tu opinion ayuda a otros compradores.",
      });
      onSuccess?.();
    } catch {
      toast({
        title: "Error",
        description: "No pudimos enviar tu resena. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-bold text-navy-900">Dej\u00e1 tu rese\u00f1a</h3>

      {/* Rating */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Calificaci\u00f3n</Label>
        <StarRating
          value={formData.rating}
          hoverValue={hoverRating}
          onChange={(v) => updateField("rating", v)}
          onHover={setHoverRating}
          onLeave={() => setHoverRating(0)}
        />
        {errors.rating && <p className="text-xs text-red-500">{errors.rating}</p>}
      </div>

      {/* Titulo */}
      <div className="space-y-1.5">
        <Label htmlFor="review-titulo" className="text-sm font-medium text-gray-700">
          T\u00edtulo
        </Label>
        <Input
          id="review-titulo"
          placeholder="Resumen de tu experiencia"
          value={formData.titulo}
          onChange={(e) => updateField("titulo", e.target.value)}
          className={errors.titulo ? "border-red-400" : ""}
        />
        {errors.titulo && <p className="text-xs text-red-500">{errors.titulo}</p>}
      </div>

      {/* Texto */}
      <div className="space-y-1.5">
        <Label htmlFor="review-texto" className="text-sm font-medium text-gray-700">
          Tu rese\u00f1a
        </Label>
        <Textarea
          id="review-texto"
          placeholder="Conta tu experiencia con esta embarcacion..."
          rows={4}
          value={formData.texto}
          onChange={(e) => updateField("texto", e.target.value)}
          className={errors.texto ? "border-red-400" : ""}
        />
        {errors.texto && <p className="text-xs text-red-500">{errors.texto}</p>}
      </div>

      {/* Pros */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Pros</Label>
        <DynamicList
          items={formData.pros}
          onChange={(items) => updateField("pros", items)}
          placeholder="Algo positivo..."
          icon={<ThumbsUp className="h-3.5 w-3.5 shrink-0 text-green-500" />}
        />
      </div>

      {/* Cons */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Contras</Label>
        <DynamicList
          items={formData.cons}
          onChange={(items) => updateField("cons", items)}
          placeholder="Algo a mejorar..."
          icon={<ThumbsDown className="h-3.5 w-3.5 shrink-0 text-red-400" />}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy-900 text-white hover:bg-navy-800"
      >
        {isSubmitting ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
        ) : (
          "Enviar rese\u00f1a"
        )}
      </Button>
    </form>
  );
}
