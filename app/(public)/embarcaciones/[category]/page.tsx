import type { Metadata } from "next/metadata";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Ship,
  ChevronRight,
  SlidersHorizontal,
  Anchor,
  Award,
} from "lucide-react";
import SearchFilters from "@/components/search/SearchFilters";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import CategoriaClient from "./categoria-client";
import type { Boat } from "@/types";

/* ------------------------------------------------------------------ */
/*  Category Mapping                                                   */
/* ------------------------------------------------------------------ */
const CATEGORIAS: Record<
  string,
  {
    nombre: string;
    descripcion: string;
    tipoFilter: string;
    marcasPopulares: string[];
  }
> = {
  lanchas: {
    nombre: "Lanchas",
    descripcion:
      "Encontrá la lancha perfecta para pasear, pescar o disfrutar del río. Las mejores marcas argentinas e importadas con opciones para todos los presupuestos.",
    tipoFilter: "Lancha",
    marcasPopulares: [
      "Bermuda",
      "Quicksilver",
      "Canestrari",
      "Regnicoli",
      "Tracker",
      "Prinz",
    ],
  },
  veleros: {
    nombre: "Veleros",
    descripcion:
      "Descubrí veleros para regata, crucero o navegación oceánica. Desde optimists hasta veleros de altura, acá encontrás el tuyo.",
    tipoFilter: "Velero",
    marcasPopulares: [
      "Beneteau",
      "Jeanneau",
      "Dufour",
      "Bavaria",
      "Hallberg-Rassy",
      "J/Boats",
    ],
  },
  yates: {
    nombre: "Yates",
    descripcion:
      "Los mejores yates y cruceros de lujo del mercado argentino. Motorizaciones de alta gama, equipamiento premium y confort de primer nivel.",
    tipoFilter: "Yate",
    marcasPopulares: [
      "Altamar",
      "Ferretti",
      "Azimut",
      "Princess",
      "Sunseeker",
      "Cranchi",
    ],
  },
  "motos-de-agua": {
    nombre: "Motos de Agua",
    descripcion:
      "Motos de agua nuevas y usadas. Las mejores marcas con modelos recreativos, deportivos y de alto rendimiento.",
    tipoFilter: "Moto de agua",
    marcasPopulares: [
      "Sea-Doo",
      "Yamaha",
      "Kawasaki",
      "Honda",
    ],
  },
  "botes-inflables": {
    nombre: "Botes Inflables",
    descripcion:
      "Botes inflables y semirrigidos para tender, pesca recreativa o paseo. Ideales por su versatilidad y facilidad de transporte.",
    tipoFilter: "Bote Inflable",
    marcasPopulares: [
      "Zodiac",
      "Bombard",
      "Intex",
      "Sevylor",
    ],
  },
  pontones: {
    nombre: "Pontones",
    descripcion:
      "Pontones para navegación recreativa, fiestas en el agua y paseos familiares. Amplios, estables y cómodos para disfrutar al máximo.",
    tipoFilter: "Pontón",
    marcasPopulares: [
      "Sun Tracker",
      "Bennington",
      "Harris",
      "Manitou",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Static Params & Dynamic Metadata                                   */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return Object.keys(CATEGORIAS).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIAS[category];

  if (!cat) {
    return { title: "Categoría no encontrada | BoatMarket" };
  }

  return {
    title: `${cat.nombre} en Venta | BoatMarket`,
    description: cat.descripcion,
    openGraph: {
      title: `${cat.nombre} en Venta | BoatMarket`,
      description: cat.descripcion,
      type: "website",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */
const MOCK_BOATS: Boat[] = [
  {
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
    motorizacion: "Mercury 115 HP 4T",
    potenciaHP: 115,
    combustible: "Nafta",
    capacidadPasajeros: 7,
    materialCasco: "Fibra de vidrio",
    estado: "Usado",
    imagenes: [
      { src: "/images/boats/bermuda-175-1.jpg", alt: "Bermuda Classic 175" },
    ],
    descripcion:
      "Bermuda Classic 175 en excelente estado. Motor Mercury 115 HP 4 tiempos con muy pocas horas.",
    vendedor: { nombre: "Náutica del Delta", tipo: "concesionario" },
  },
  {
    id: "emb-002",
    titulo: "Quicksilver 1800 - Motor Evinrude",
    slug: "quicksilver-1800-motor-evinrude",
    tipo: "Lancha",
    marca: "Quicksilver",
    modelo: "1800",
    año: 2022,
    precio: 35200000,
    currency: "ARS",
    ubicacion: "Tigre, Buenos Aires",
    eslora: 5.5,
    manga: 2.4,
    calado: 0.45,
    motorizacion: "Evinrude E-TEC 150 HP",
    potenciaHP: 150,
    combustible: "Nafta",
    capacidadPasajeros: 8,
    materialCasco: "Fibra de vidrio",
    estado: "Usado",
    imagenes: [
      { src: "/images/boats/quicksilver-1800-1.jpg", alt: "Quicksilver 1800" },
    ],
    descripcion:
      "Quicksilver 1800 con motor Evinrude E-TEC 150 HP. Navegada en río, excelente estado.",
    vendedor: { nombre: "Diego M.", tipo: "particular" },
  },
  {
    id: "emb-003",
    titulo: "Canestrari 215 Cuddy - Full Equipo",
    slug: "canestrari-215-cuddy-full-equipo",
    tipo: "Lancha",
    marca: "Canestrari",
    modelo: "215 Cuddy",
    año: 2024,
    precio: 62000000,
    currency: "ARS",
    ubicacion: "Rosario, Santa Fe",
    eslora: 6.5,
    manga: 2.5,
    calado: 0.5,
    motorizacion: "Yamaha 200 HP 4T",
    potenciaHP: 200,
    combustible: "Nafta",
    capacidadPasajeros: 10,
    materialCasco: "Fibra de vidrio",
    estado: "Nuevo",
    imagenes: [
      { src: "/images/boats/canestrari-215-1.jpg", alt: "Canestrari 215 Cuddy" },
    ],
    descripcion:
      "0 km. Canestrari 215 Cuddy con motor Yamaha 200 HP 4 tiempos. Full equipo.",
    vendedor: { nombre: "Marina Puerto Norte", tipo: "concesionario" },
  },
  {
    id: "emb-004",
    titulo: "Beneteau Oceanis 38 - Velero Oceánico",
    slug: "beneteau-oceanis-38-velero-oceanico",
    tipo: "Velero",
    marca: "Beneteau",
    modelo: "Oceanis 38",
    año: 2019,
    precio: 185000000,
    currency: "ARS",
    ubicacion: "Mar del Plata, Buenos Aires",
    eslora: 11.5,
    manga: 3.9,
    calado: 1.95,
    motorizacion: "Yanmar 30 HP diésel",
    potenciaHP: 30,
    combustible: "Diésel",
    capacidadPasajeros: 8,
    materialCasco: "Fibra de vidrio",
    estado: "Usado",
    imagenes: [
      { src: "/images/boats/beneteau-38-1.jpg", alt: "Beneteau Oceanis 38" },
    ],
    descripcion:
      "Velero oceánico Beneteau Oceanis 38. 3 camarotes, 1 baño, cocina completa.",
    vendedor: { nombre: "Yacht Brokers MDP", tipo: "concesionario" },
  },
  {
    id: "emb-005",
    titulo: "Sea-Doo GTX 300 Limited - 2024",
    slug: "sea-doo-gtx-300-limited-2024",
    tipo: "Moto de agua",
    marca: "Sea-Doo",
    modelo: "GTX 300 Limited",
    año: 2024,
    precio: 22000000,
    currency: "ARS",
    ubicacion: "Nordelta, Buenos Aires",
    eslora: 3.5,
    manga: 1.3,
    calado: 0.3,
    motorizacion: "Rotax 1630 ACE - 300 HP",
    potenciaHP: 300,
    combustible: "Nafta",
    capacidadPasajeros: 3,
    materialCasco: "Fibra de vidrio",
    estado: "Nuevo",
    imagenes: [
      { src: "/images/boats/seadoo-gtx-1.jpg", alt: "Sea-Doo GTX 300 Limited" },
    ],
    descripcion:
      "Sea-Doo GTX 300 Limited 2024. La moto de agua más equipada del mercado.",
    vendedor: { nombre: "BRP Center BA", tipo: "concesionario" },
  },
  {
    id: "emb-006",
    titulo: "Altamar 60 Yate de Lujo",
    slug: "altamar-60-yate-de-lujo",
    tipo: "Yate",
    marca: "Altamar",
    modelo: "60",
    año: 2021,
    precio: 750000000,
    currency: "ARS",
    ubicacion: "Puerto Madero, CABA",
    eslora: 18.3,
    manga: 5.2,
    calado: 1.4,
    motorizacion: "2x Volvo Penta IPS 600",
    potenciaHP: 870,
    combustible: "Diésel",
    capacidadPasajeros: 14,
    materialCasco: "Fibra de vidrio",
    estado: "Usado",
    imagenes: [
      { src: "/images/boats/altamar-60-1.jpg", alt: "Altamar 60" },
    ],
    descripcion:
      "Yate de lujo Altamar 60 con flybridge. 3 camarotes, 2 baños, salón amplio.",
    vendedor: { nombre: "Luxury Yachts BA", tipo: "concesionario" },
  },
  {
    id: "emb-008",
    titulo: "Zodiac Cadet 310 Aero - Inflable",
    slug: "zodiac-cadet-310-aero-inflable",
    tipo: "Bote Inflable",
    marca: "Zodiac",
    modelo: "Cadet 310 Aero",
    año: 2024,
    precio: 3200000,
    currency: "ARS",
    ubicacion: "Villa Carlos Paz, Córdoba",
    eslora: 3.1,
    manga: 1.6,
    calado: 0.2,
    motorizacion: "Sin motor (hasta 15 HP)",
    potenciaHP: 0,
    combustible: "Nafta",
    capacidadPasajeros: 4,
    materialCasco: "PVC",
    estado: "Nuevo",
    imagenes: [
      { src: "/images/boats/zodiac-310-1.jpg", alt: "Zodiac Cadet 310 Aero" },
    ],
    descripcion:
      "Bote inflable Zodiac Cadet 310 Aero. 0 km, ideal para tender, pesca o recreación.",
    vendedor: { nombre: "Náutica Lago Azul", tipo: "concesionario" },
  },
];

/* ------------------------------------------------------------------ */
/*  Data Fetching (simulated)                                          */
/* ------------------------------------------------------------------ */
async function getEmbarcacionesPorCategoria(
  tipoFilter: string,
  params: { page?: string }
) {
  await new Promise((resolve) => setTimeout(resolve, 80));

  const filtered = MOCK_BOATS.filter(
    (b) => b.tipo.toLowerCase() === tipoFilter.toLowerCase()
  );

  const pageSize = 6;
  const page = Math.max(1, Number(params.page) || 1);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return { boats: paginated, total, page, totalPages };
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const sp = await searchParams;
  const cat = CATEGORIAS[category];

  if (!cat) notFound();

  const { boats, total, page, totalPages } = await getEmbarcacionesPorCategoria(
    cat.tipoFilter,
    sp
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-white">
      {/* ── Hero de Categoría ── */}
      <section className="relative overflow-hidden bg-navy-900 pb-10 pt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-60 w-60 rounded-full bg-sky-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-sky-200">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/embarcaciones"
              className="transition-colors hover:text-white"
            >
              Embarcaciones
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-white">{cat.nombre}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-600/30 px-4 py-1.5 text-sm font-medium text-sky-200">
              <Ship className="h-4 w-4" />
              <span>
                {total.toLocaleString("es-AR")}{" "}
                {cat.nombre.toLowerCase()} disponible{total !== 1 ? "s" : ""}
              </span>
            </div>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {cat.nombre} en Venta
            </h1>
            <p className="text-base text-sky-100/80">{cat.descripcion}</p>
          </div>
        </div>
      </section>

      {/* ── Marcas Populares ── */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-lg font-bold text-navy-900">
          Marcas populares en {cat.nombre}
        </h2>
        <div className="flex flex-wrap gap-2">
          {cat.marcasPopulares.map((marca) => (
            <Link
              key={marca}
              href={`/embarcaciones/${category}?marca=${encodeURIComponent(marca)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-navy-900 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <Award className="h-3.5 w-3.5 text-amber-500" />
              {marca}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Resultados ── */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-navy-900">
            {cat.nombre} en venta
          </h2>
          <span className="ml-auto text-sm text-gray-500">
            {total.toLocaleString("es-AR")} resultado{total !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - Filtros */}
          <div className="shrink-0 lg:w-72">
            <SearchFilters />
          </div>

          {/* Contenido Principal */}
          <div className="min-w-0 flex-1">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-72 animate-pulse rounded-xl bg-gray-100"
                    />
                  ))}
                </div>
              }
            >
              <CategoriaClient
                initialBoats={boats}
                total={total}
                page={page}
                totalPages={totalPages}
                categorySlug={category}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── Otras Categorías ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-bold text-navy-900">
          Explorá otras categorías
        </h2>
        <CategoryGrid />
      </section>
    </main>
  );
}
