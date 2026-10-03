export type ProductCategory =
  | "casas"
  | "casetas"
  | "quioscos"
  | "garajes"
  | "pergolas";

export type ProductVariant = {
  id: string;
  label: string;
  dimensions: string;
  area?: number;
  price?: number;
  note?: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  description: string;
  variants: ProductVariant[];
};

export const products: CatalogProduct[] = [
  {
    id: "abrera",
    slug: "abrera",
    name: "ABRERA",
    category: "casas",
    categoryLabel: "Casa de madera",
    image: "/images/categories/casas.jpg",
    description:
      "Casa de madera ABRERA de 170 m² con cuatro dormitorios, cuatro baños y un amplio salón de 37 m².",
    variants: [
      { id: "sin-montaje", label: "44mm + revestimiento sin montaje", dimensions: "170 m²", area: 170, price: 43600 },
      { id: "con-montaje", label: "44mm + revestimiento con montaje", dimensions: "170 m²", area: 170, price: 63600 },
      { id: "aislada-sin-montaje", label: "44mm aislada + revestimiento sin montaje", dimensions: "170 m²", area: 170, price: 65200 },
      { id: "aislada-con-montaje", label: "44mm aislada + revestimiento con montaje", dimensions: "170 m²", area: 170, price: 88000 },
    ],
  },
  {
    id: "everest",
    slug: "everest",
    name: "Everest",
    category: "casetas",
    categoryLabel: "Caseta de jardín",
    image: "/images/products/everest/everest1.webp",
    description:
      "Caseta de jardín aislada y multifuncional disponible en cuatro tamaños, desde 12 hasta 25 m².",
    variants: [
      { id: "4x3-sin", label: "4 × 3 m", dimensions: "4 × 3 m", area: 12, price: 6000, note: "Sin montaje" },
      { id: "4x3-con", label: "4 × 3 m", dimensions: "4 × 3 m", area: 12, price: 8500, note: "Con montaje" },
      { id: "5x3-sin", label: "5 × 3 m", dimensions: "5 × 3 m", area: 15, price: 7000, note: "Sin montaje" },
      { id: "5x3-con", label: "5 × 3 m", dimensions: "5 × 3 m", area: 15, price: 9600, note: "Con montaje" },
      { id: "5x4-sin", label: "5 × 4 m", dimensions: "5 × 4 m", area: 20, price: 8500, note: "Sin montaje" },
      { id: "5x4-con", label: "5 × 4 m", dimensions: "5 × 4 m", area: 20, price: 13400, note: "Con montaje" },
      { id: "5x5-sin", label: "5 × 5 m", dimensions: "5 × 5 m", area: 25, price: 9900, note: "Sin montaje" },
      { id: "5x5-con", label: "5 × 5 m", dimensions: "5 × 5 m", area: 25, price: 13200, note: "Con montaje" },
    ],
  },
  {
    id: "quiosco",
    slug: "quiosco",
    name: "Quiosco",
    category: "quioscos",
    categoryLabel: "Quiosco de madera",
    image: "/images/categories/quioscos.jpg",
    description:
      "Una estructura compacta y adaptable para uso comercial o privado, con aperturas configurables.",
    variants: [
      { id: "3x3", label: "3 × 3 m", dimensions: "3 × 3 m", area: 9, price: 1700 },
      { id: "5x3", label: "5 × 3 m", dimensions: "5 × 3 m", area: 15, price: 2600 },
      { id: "4x4", label: "4 × 4 m", dimensions: "4 × 4 m", area: 16, price: 2700 },
    ],
  },
  {
    id: "doble-1",
    slug: "doble-1-6x6",
    name: "Doble 1",
    category: "garajes",
    categoryLabel: "Garaje de madera",
    image: "/images/categories/garajes.jpg",
    description:
      "Garaje de madera para dos vehículos con revestimiento vertical y una presencia contemporánea.",
    variants: [
      { id: "6x6", label: "6 × 6 m", dimensions: "6 × 6 m", area: 36, price: 6900, note: "2 coches" },
    ],
  },
  {
    id: "hanoy",
    slug: "hanoy-6x6",
    name: "Hanoy 6×6",
    category: "pergolas",
    categoryLabel: "Pérgola para coches",
    image: "/images/categories/pergolas.jpg",
    description:
      "Cochera doble de madera con tejado plano, diseñada para proteger dos vehículos con una estética limpia.",
    variants: [
      { id: "6x6", label: "6 × 6 m", dimensions: "6 × 6 m", area: 36, price: 3000, note: "2 coches" },
    ],
  },
];

export const catalogCategories: {
  id: "todos" | ProductCategory;
  label: string;
}[] = [
  { id: "todos", label: "Todos" },
  { id: "casas", label: "Casas" },
  { id: "casetas", label: "Casetas" },
  { id: "quioscos", label: "Quioscos" },
  { id: "garajes", label: "Garajes" },
  { id: "pergolas", label: "Pérgolas" },
];

export function getStartingPrice(product: CatalogProduct) {
  const prices = product.variants
    .map((variant) => variant.price)
    .filter((price): price is number => typeof price === "number");

  return prices.length ? Math.min(...prices) : null;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
