import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, JsonLd, LastReviewed } from "@/components/ui";
import { articles, articleCategories } from "@/lib/articles";
import { absoluteUrl } from "@/lib/format";
import { guides } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fuel, EV and unit guides",
  description:
    "Plain-English guides to MPG, L/100 km, km/L, trip fuel cost, EV charging, efficiency and the numbers behind the calculators.",
  alternates: { canonical: "/guides" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Fuel, EV and unit guides",
    description:
      "Plain-English guides to MPG, L/100 km, km/L, trip fuel cost, EV charging and efficiency.",
    url: "/guides",
  },
};

const categoryDescriptions: Record<(typeof articleCategories)[number], string> = {
  "Fuel & units": "MPG, L/100 km, km/L and the gallon traps that change the answer.",
  "Trip & budget": "Turn distance, consumption and price into a practical fuel estimate.",
  Driving: "The habits and conditions that move real-world fuel use.",
  "EV & charging": "kWh, charging losses, range and running-cost comparisons.",
};

export default function GuidesPage() {
  const totalGuides = guides.length + articles.length;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Fuel, EV and unit guides",
          url: absoluteUrl("/guides"),
          description:
            "Plain-English guides to fuel economy, trip cost, EV charging and efficiency.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: totalGuides,
            itemListElement: [
              ...guides.map((guide, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: guide.title,
                url: absoluteUrl(guide.href),
              })),
              ...articles.map((article, index) => ({
                "@type": "ListItem",
                position: guides.length + index + 1,
                name: article.title,
                url: absoluteUrl(`/guides/${article.slug}`),
              })),
            ],
          },
        }}
      />
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Plain-English explanations
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Fuel, EV and unit guides
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          {totalGuides} original guides that explain the numbers behind the calculators. Each one
          starts with a direct answer, shows the formula, and tells you what it leaves out. No
          copied manufacturer copy and no invented live prices.
        </p>
      </div>

      <section className="mt-10" aria-labelledby="start-here">
        <h2 id="start-here" className="text-2xl font-semibold tracking-tight text-ink">
          Start here
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-brand/35"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Foundation {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink group-hover:text-brand">
                {guide.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{guide.description}</p>
              <p className="mt-4 text-sm font-semibold text-brand">Read the guide →</p>
            </Link>
          ))}
        </div>
      </section>

      {articleCategories.map((category) => {
        const categoryArticles = articles.filter((article) => article.category === category);
        if (categoryArticles.length === 0) return null;
        const categoryId = `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

        return (
          <section key={category} className="mt-12" aria-labelledby={categoryId}>
            <div className="max-w-3xl">
              <h2
                id={categoryId}
                className="text-2xl font-semibold tracking-tight text-ink"
              >
                {category}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {categoryDescriptions[category]}
              </p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {categoryArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/guides/${article.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-brand/35"
                >
                  <div className="flex items-center justify-between gap-3 text-xs text-muted">
                    <span className="font-semibold uppercase tracking-[0.12em] text-brand">
                      {article.category}
                    </span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink group-hover:text-brand">
                    {article.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                    {article.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-brand">Read the guide →</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-12">
        <LastReviewed />
      </div>
    </div>
  );
}
