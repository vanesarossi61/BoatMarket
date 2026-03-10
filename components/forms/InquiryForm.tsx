"use client";

import { useState } from "react";
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
import { Loader2, Send } from "lucide-react";

const inquirySchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingres\u00e1 un email v\u00e1lido"),
  telefono: z
    .string()
    .min(8, "El tel\u00e9fono debe tener al menos 8 d\u00edgitos")
    .regex(/^[\d\s\-+()]+$/, "N\u00famero de tel\u00e9fono inv\u00e1lido"),
  tipoConsulta: z.enum(["compra", "financiacion", "permuta", "informacion"], {
    required_error: "Seleccion\u00e1 un tipo de consulta",
  }),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type InquiryData = z.infer<typeof inquirySchema>;

const TIPO_CONSULTA_OPTIONS = [
  { value: "compra", label: "Compra" },
  { value: "financiacion", label: "Financiaci\u00f3n" },
  { value: "permuta", label: "Permuta" },
  { value: "informacion", label: "Informaci\u00f3n general" },
] as const;

interface InquiryFormProps {
  boatId?: string;
  boatTitle?: string;
}

export default function InquiryForm({ boatId, boatTitle }: InquiryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryData, string>>>({});
  const [formData, setFormData] = useState<InquiryData>({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "informacion",
    mensaje: boatTitle ? `Hola, estoy interesado/a en "${boatTitle}". ` : "",
  });

  const updateField = <K extends keyof InquiryData>(field: K, value: InquiryData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InquiryData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof InquiryData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, boatId }),
      });

      if (!res.ok) throw new Error("Error al enviar la consulta");

      toast({
        title: "\u00a1Consulta enviada!",
        description: "Te vamos a responder a la brevedad. Revis\u00e1 tu email.",
      });

      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoConsulta: "informacion",
        mensaje: "",
      });
      setErrors({});
    } catch {
      toast({
        title: "Error",
        description: "No pudimos enviar tu consulta. Intentalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-navy-900">Envianos tu consulta</h3>

      {/* Nombre */}
      <div className="space-y-1.5">
        <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
          Nombre completo
        </Label>
        <Input
          id="nombre"
          placeholder="Ej: Juan P\u00e9rez"
          value={formData.nombre}
          onChange={(e) => updateField("nombre", e.target.value)}
          className={errors.nombre ? "border-red-400 focus-visible:ring-red-400" : ""}
        />
        {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Tel\u00e9fono */}
      <div className="space-y-1.5">
        <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
          Tel\u00e9fono
        </Label>
        <Input
          id="telefono"
          type="tel"
          placeholder="+54 11 1234-5678"
          value={formData.telefono}
          onChange={(e) => updateField("telefono", e.target.value)}
          className={errors.telefono ? "border-red-400 focus-visible:ring-red-400" : ""}
        />
        {errors.telefono && <p className="text-xs text-red-500">{errors.telefono}</p>}
      </div>

      {/* Tipo consulta */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Tipo de consulta</Label>
        <Select
          value={formData.tipoConsulta}
          onValueChange={(val) => updateField("tipoConsulta", val as InquiryData["tipoConsulta"])}
        >
          <SelectTrigger className={errors.tipoConsulta ? "border-red-400" : ""}>
            <SelectValue placeholder="Seleccion\u00e1 el tipo" />
          </SelectTrigger>
          <SelectContent>
            {TIPO_CONSULTA_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tipoConsulta && <p className="text-xs text-red-500">{errors.tipoConsulta}</p>}
      </div>

      {/* Mensaje */}
      <div className="space-y-1.5">
        <Label htmlFor="mensaje" className="text-sm font-medium text-gray-700">
          Mensaje
        </Label>
        <Textarea
          id="mensaje"
          placeholder="Cont\u00e1nos qu\u00e9 necesit\u00e1s..."
          rows={4}
          value={formData.mensaje}
          onChange={(e) => updateField("mensaje", e.target.value)}
          className={errors.mensaje ? "border-red-400 focus-visible:ring-red-400" : ""}
        />
        {errors.mensaje && <p className="text-xs text-red-500">{errors.mensaje}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy-900 text-white hover:bg-navy-800"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar consulta
          </>
        )}
      </Button>
    </form>
  );
}
