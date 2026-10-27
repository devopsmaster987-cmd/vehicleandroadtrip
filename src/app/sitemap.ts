import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { articles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/format";

type SitemapPage = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified?: string;
};

const defaultLastModified = "2026-10-27T00:00:00.000Z";

const pages: SitemapPage[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/fuel-efficiency-converter", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/fuel-cost", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/ev-charging-cost", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/ev-vs-petrol-cost", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/kw-to-ps-hp", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/uk-vs-us-mpg", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guides/how-fuel-cost-is-calculated", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/mpge-explained", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/authors/roadcost-editorial", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/methodology", priority: 0.5, changeFrequency: "monthly" },
  { path: "/editorial-policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
  { path: "/corrections", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
];

const articlePages: SitemapPage[] = articles.map((article) => ({
  path: `/guides/${article.slug}`,
  priority: 0.7,
  changeFrequency: "monthly",
  lastModified: article.updated,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...articlePages].map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(page.lastModified ?? defaultLastModified),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
