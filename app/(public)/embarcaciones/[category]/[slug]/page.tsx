import type { Metadata } from "next/metadata";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Shield,
  Share2,
  GitCompareArrows,
  MessageCircle,
  Star,
  Clock,
  User,
  BadgeCheck,
  Heart,
  Phone,
} from "lucide-react";
import Gallery from "@/components/shared/Gallery";
import PriceDisplay from "@/components/shared/PriceDisplay";
import BoatSpecs from "@/components/boats/BoatSpecs";
import InquiryForm from "@/components/forms/InquiryForm";
import { BoatGrid } from "@/components/boats/BoatGrid";
import JsonLd from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Boat } from "@/types";
import type { BoatCard as BoatCardType } from "@/types";

/* ------------------------------------------------------------------ */
/*  Category Mapping                                                   */
/* ------------------------------------------------------------------ */
const CATEGORIAS: Record<string, string> = {
  lanchas: "Lanchas",
  veleros: "Veleros",
  yates: "Yates",
  "motos-de-agua": "Motos de Agua",
  "botes-inflables": "Botes Inflables",
  pontones: "Pontones",
};

/* ------------------------------------------------------------------ */
/*  Mock Data: Embarcación Completa                                    */
/* ------------------------------------------------------------------ */
const MOCK_BOAT: Boat = {
  id: "emb-001",
  titulo: "Bermuda Classic 175 - Impecable",
  slug: "bermuda-classic-175-impecable",
  tipo: "Lancha",
  marca: "Bermuda",
  modelo: "Classic 175",
  año: 2023,
  precio: 28500000,
  currency: "ARS",
  ubicacion: "San Fernando, Buenos Aires",
  eslora: 5.3,
  manga: 2.3,
  calado: 0.4,
  motorizacion: "Mercury 115 HP 4 Tiempos",
  potenciaHP: 115,
  combustible: "Nafta",
  capacidadPasajeros: 7,
  materialCasco: "Fibra de vidrio",
  estado: "Usado",
  horasMotor: 320,
  imagenes: [
    { src: "/images/boats/bermuda-175-1.jpg", alt: "Bermuda Classic 175 - Vista lateral desde el muelle" },
    { src: "/images/boats/bermuda-175-2.jpg", alt: "Bermuda Classic 175 - Interior con tapizado" },
    { src: "/images/boats/bermuda-175-3.jpg", alt: "Bermuda Classic 175 - Consola de mando" },
    { src: "/images/boats/bermuda-175-4.jpg", alt: "Bermuda Classic 175 - Motor Mercury" },
    { src: "/images/boats/bermuda-175-5.jpg", alt: "Bermuda Classic 175 - Proa" },
  ],
  descripcion: `Bermuda Classic 175 en excelente estado general, navegada exclusivamente en río.

Motor Mercury 115 HP 4 tiempos con apenas 320 horas de uso, service al día con registros completos. Hélice de acero inoxidable original.

**Equipamiento incluido:**
- Lona de navegación y fondeo
- Trailer galvanizado con rodillos
- GPS Garmin EchoMap 52cv
- Estéreo marino Fusion con Bluetooth
- Luces de navegación LED
- Ancla tipo Danforth con cadena y cabo
- Kit de seguridad completo reglamentario (PNA)
- Matafuegos, bengalas, chaleco para 7 personas

**Tapizado:** Semi-cuero náutico en excelente estado, sin roturas ni desgaste visible.

**Casco:** Sin osmosis, sin golpes, antifouling reciente (febrero 2026).

Lista para navegar. Se entrega con la documentación al día, matrícula PNA vigente. El trailer tiene la VTV aprobada.

Acepto embarcación menor como parte de pago. Financiación disponible consultando.

Ubicación: Guardería Náutica San Fernando, sobre el río Luján. Se puede ver y probar con cita previa.`,
  vendedor: {
    nombre: "Náutica del Delta",
    tipo: "concesionario",
    telefono: "+54 11 4444-5555",
    email: "ventas@nauticadeldelta.com.ar",
    ubicacion: "San Fernando, Buenos Aires",
    miembroDesde: "2019",
    totalAvisos: 42,
    calificacion: 4.8,
  },
  fechaPublicacion: "2026-02-15",
  visitas: 1287,
  favoritos: 34,
};

/* ------------------------------------------------------------------ */
/*  Mock: Embarcaciones Similares                                      */
/* ------------------------------------------------------------------ */
const SIMILAR_BOATS: BoatCardType[] = [
  {
    id: "emb-sim-1",
    titulo: "Quicksilver 1800 - Motor Evinrude",
    slug: "quicksilver-1800-motor-evinrude",
    tipo: "Lancha",
    marca: "Quicksilver",
    precio: 35200000,
    currency: "ARS",
    ubicacion: "Tigre, Buenos Aires",
    año: 2022,
    eslora: 5.5,
    estado: "Usado",
    imagen: { src: "/images/boats/quicksilver-1800-1.jpg", alt: "Quicksilver 1800" },
  },
  {
    id: "emb-sim-2",
    titulo: "Regnicoli Dorado 160",
    slug: "regnicoli-dorado-160",
    tipo: "Lancha",
    marca: "Regnicoli",
    precio: 22000000,
    currency: "ARS",
    ubicacion: "Campana, Buenos Aires",
    año: 2023,
    eslora: 4.9,
    estado: "Usado",
    imagen: { src: "/images/boats/regnicoli-160-1.jpg", alt: "Regnicoli Dorado 160" },
  },
  {
    id: "emb-sim-3",
    titulo: "Prinz 630 Fishing - Full",
    slug: "prinz-630-fishing-full",
    tipo: "Lancha",
    marca: "Prinz",
    precio: 45000000,
    currency: "ARS",
    ubicacion: "San Isidro, Buenos Aires",
    año: 2024,
    eslora: 6.3,
    estado: "Nuevo",
    imagen: { src: "/images/boats/prinz-630-1.jpg", alt: "Prinz 630 Fishing" },
  },
  {
    id: "emb-sim-4",
    titulo: "Canestrari 160 Open",
    slug: "canestrari-160-open",
    tipo: "Lancha",
    marca: "Canestrari",
    precio: 19800000,
    currency: "ARS",
    ubicacion: "Rosario, Santa Fe",
    año: 2022,
    eslora: 4.8,
    estado: "Usado",
    imagen: { src: "/images/boats/canestrari-160-1.jpg", alt: "Canestrari 160 Open" },
  },
];

/* ------------------------------------------------------------------ */
/*  Data Fetching (simulated)                                          */
/* ------------------------------------------------------------------ */
async function getEmbarcacion(slug: string): Promise<Boat | null> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  // En producción: fetch desde API por slug
  if (slug === MOCK_BOAT.slug) return MOCK_BOAT;
  // Retorna el mock para cualquier slug en demo
  return { ...MOCK_BOAT, slug, titulo: `Embarcación ${slug}` };
}

async function getEmbarcacionesSimilares(): Promise<BoatCardType[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return SIMILAR_BOATS;
}

/* ------------------------------------------------------------------ */
/*  Dynamic Metadata                                                   */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const boat = await getEmbarcacion(slug);

  if (!boat) {
    return { title: "Embarcación no encontrada | BoatMarket" };
  }

  return {
    title: `${boat.titulo} | BoatMarket`,
    description: `${boat.marca} ${boat.modelo} ${boat.año} en ${boat.ubicacion}. ${boat.eslora}m de eslora, ${boat.motorizacion}. Consultá precio y disponibilidad en BoatMarket.`,
    openGraph: {
      title: `${boat.titulo} | BoatMarket`,
      description: `${boat.marca} ${boat.modelo} - ${boat.tipo} en venta`,
      type: "website",
      images: boat.imagenes?.[0]
        ? [{ url: boat.imagenes[0].src, alt: boat.imagenes[0].alt }]
        : [],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Estado Badge                                                       */
/* ------------------------------------------------------------------ */
function EstadoBadge({ estado }: { estado: string }) {
  const config: Record<string, { className: string; icon: React.ReactNode }> = {
    Nuevo: {
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <BadgeCheck className="h-3.5 w-3.5" />,
    },
    Usado: {
      className: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <Clock className="h-3.5 w-3.5" />,
    },
    Certificado: {
      className: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
  };

  const c = config[estado] ?? config["Usado"];

  return (
    <Badge variant="outline" className={`gap-1.5 ${c.className}`}>
      {c.icon}
      {estado}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default async function DetalleEmbarcacionPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const catNombre = CATEGORIAS[category];

  if (!catNombre) notFound();

  const [boat, similares] = await Promise.all([
    getEmbarcacion(slug),
    getEmbarcacionesSimilares(),
  ]);

  if (!boat) notFound();

  /* JSON-LD Structured Data */
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: boat.titulo,
    description: boat.descripcion.slice(0, 300),
    brand: { "@type": "Brand", name: boat.marca },
    model: boat.modelo,
    vehicleModelDate: String(boat.año),
    offers: {
      "@type": "Offer",
      price: boat.precio,
      priceCurrency: boat.currency,
      availability: "https://schema.org/InStock",
      itemCondition:
        boat.estado === "Nuevo"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
    },
    image: boat.imagenes.map((img) => img.src),
    url: `https://boatmarket.com.ar/embarcaciones/${category}/${slug}`,
    vehicleConfiguration: boat.motorizacion,
    fuelType: boat.combustible,
    seatingCapacity: boat.capacidadPasajeros,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-white">
      <JsonLd data={jsonLdData} />

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-gray-500 sm:px-6 lg:px-8">
          <Link href="/" className="transition-colors hover:text-navy-900">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/embarcaciones"
            className="transition-colors hover:text-navy-900"
          >
            Embarcaciones
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/embarcaciones/${category}`}
            className="transition-colors hover:text-navy-900"
          >
            {catNombre}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate font-medium text-navy-900">
            {boat.titulo}
          </span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* ════════════════════════════════════════════════ */}
          {/* COLUMNA PRINCIPAL (2/3)                         */}
          {/* ════════════════════════════════════════════════ */}
          <div className="lg:col-span-2 space-y-8">
            {/* ── Galería de Imágenes ── */}
            <Gallery images={boat.imagenes} title={boat.titulo} />

            {/* ── Encabezado Mobile (se oculta en lg) ── */}
            <div className="lg:hidden space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <EstadoBadge estado={boat.estado} />
                <Badge variant="outline" className="gap-1 text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {boat.año}
                </Badge>
                <Badge variant="outline" className="gap-1 text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {boat.ubicacion}
                </Badge>
              </div>
              <h1 className="text-2xl font-extrabold text-navy-900">
                {boat.titulo}
              </h1>
              <PriceDisplay
                amount={boat.precio}
                currency={boat.currency}
                size="lg"
              />
            </div>

            {/* ── Especificaciones Técnicas ── */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-navy-900">
                Especificaciones técnicas
              </h2>
              <BoatSpecs boat={boat} />
            </section>

            <Separator />

            {/* ── Descripción del Vendedor ── */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-navy-900">
                Descripción
              </h2>
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                {boat.descripcion.split("\n").map((paragraph, i) => {
                  if (paragraph.trim() === "") return <br key={i} />;
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3 key={i} className="mt-4 mb-2 text-base font-bold text-navy-900">
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={i} className="ml-4 text-gray-600">
                        {paragraph.slice(2)}
                      </li>
                    );
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
              </div>
            </section>

            <Separator />

            {/* ── Ubicación ── */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-navy-900">
                Ubicación
              </h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-navy-900">{boat.ubicacion}</p>
                  <p className="text-sm text-gray-500">
                    Visitá la embarcación con cita previa
                  </p>
                </div>
              </div>
              {/* Mapa placeholder */}
              <div className="relative h-64 w-full overflow-hidden rounded-xl border border-gray-200 bg-sky-50">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <MapPin className="h-10 w-10" />
                  <span className="text-sm font-medium">Mapa de ubicación</span>
                  <span className="text-xs">{boat.ubicacion}</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* ── Reviews Section ── */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-navy-900">
                Opiniones del vendedor
              </h2>
              <div className="space-y-4">
                {/* Review 1 */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Martín G.</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < 5
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-400">
                          hace 2 semanas
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Excelente atención de Náutica del Delta. La embarcación estaba tal cual
                    la publicaron, sin sorpresas. Muy profesionales y transparentes con la
                    documentación. Recomendados al 100%.
                  </p>
                </div>

                {/* Review 2 */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Carolina P.</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < 4
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-400">
                          hace 1 mes
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Compramos un Bermuda similar el año pasado con ellos. Nos asesoraron
                    re bien sobre el motor y la guardería. Buena experiencia, respondieron
                    todas nuestras dudas rápido.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* SIDEBAR DERECHO (1/3)                           */}
          {/* ════════════════════════════════════════════════ */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* ── Info Principal (visible solo en desktop) ── */}
            <div className="hidden lg:block rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <EstadoBadge estado={boat.estado} />
                <Badge variant="outline" className="gap-1 text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {boat.año}
                </Badge>
              </div>

              <h1 className="text-2xl font-extrabold leading-tight text-navy-900">
                {boat.titulo}
              </h1>

              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {boat.ubicacion}
              </div>

              <PriceDisplay
                amount={boat.precio}
                currency={boat.currency}
                financing
                size="lg"
              />

              <Separator />

              {/* Botones de acción */}
              <div className="space-y-2">
                <Button className="w-full gap-2 bg-blue-600 text-white hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4" />
                  Consultar
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="gap-1.5 text-sm text-navy-900"
                  >
                    <GitCompareArrows className="h-4 w-4" />
                    Comparar
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-1.5 text-sm text-navy-900"
                  >
                    <Share2 className="h-4 w-4" />
                    Compartir
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-sm text-gray-500 hover:text-red-500"
                >
                  <Heart className="h-4 w-4" />
                  Guardar en favoritos
                </Button>
              </div>

              <Separator />

              {/* Stats rápidos */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-sky-50 p-3">
                  <p className="text-lg font-bold text-navy-900">
                    {boat.visitas?.toLocaleString("es-AR") ?? "--"}
                  </p>
                  <p className="text-xs text-gray-500">Visitas</p>
                </div>
                <div className="rounded-lg bg-sky-50 p-3">
                  <p className="text-lg font-bold text-navy-900">
                    {boat.favoritos ?? "--"}
                  </p>
                  <p className="text-xs text-gray-500">Favoritos</p>
                </div>
              </div>
            </div>

            {/* ── Info del Vendedor ── */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-navy-900">Vendedor</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-white">
                  {boat.vendedor.tipo === "concesionario" ? (
                    <BadgeCheck className="h-6 w-6" />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-navy-900">
                    {boat.vendedor.nombre}
                  </p>
                  <p className="text-xs capitalize text-gray-500">
                    {boat.vendedor.tipo}
                    {boat.vendedor.tipo === "concesionario" && (
                      <span className="ml-1.5 inline-flex items-center gap-0.5 text-blue-600">
                        <Shield className="h-3 w-3" /> Verificado
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {boat.vendedor.calificacion && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(boat.vendedor.calificacion!)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-navy-900">
                    {boat.vendedor.calificacion}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({boat.vendedor.totalAvisos} avisos)
                  </span>
                </div>
              )}

              {boat.vendedor.miembroDesde && (
                <p className="text-xs text-gray-400">
                  Miembro desde {boat.vendedor.miembroDesde}
                </p>
              )}

              <Separator />

              <Button
                variant="outline"
                className="w-full gap-2 text-navy-900"
              >
                <Phone className="h-4 w-4" />
                Ver teléfono
              </Button>
            </div>

            {/* ── Formulario de Consulta ── */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-navy-900">
                Enviá tu consulta
              </h3>
              <InquiryForm />
            </div>
          </aside>
        </div>

        {/* ── Embarcaciones Similares ── */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-navy-900">
            Embarcaciones similares
          </h2>
          <BoatGrid boats={similares} />
        </section>
      </div>
    </main>
  );
}
