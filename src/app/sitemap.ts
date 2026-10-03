import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ukrmadera.com";
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/catalogo", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/materiales", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/catalogo/casas/abrera", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/catalogo/casetas/everest", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/catalogo/quioscos/quiosco", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/catalogo/garajes/doble-1-6x6", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/catalogo/pergolas/hanoy-6x6", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
