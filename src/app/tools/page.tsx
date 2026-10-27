import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { ToolCard } from "@/components/tool-card";
import { Breadcrumbs, JsonLd, LastReviewed, Notice } from "@/components/ui";
import { absoluteUrl } from "@/lib/format";
import { tools } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fuel and EV calculators",
  description:
    "Browse fuel cost, EV charging, MPG, L/100 km, km/L, MPGe and power converters with explicit UK, US, European, Swiss and Asia-Pacific units.",
  alternates: { canonical: "/tools" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Fuel and EV calculators",
    description:
      "Browse fuel cost, EV charging, MPG, L/100 km, km/L, MPGe and power converters with explicit UK, US, European, Swiss and Asia-Pacific units.",
    url: "/tools",
  },
};

const groups = [
  {
    title: "Fuel and journeys",
    description: "Estimate what a trip uses and costs, with the right units for each market.",
    categories: ["Fuel"] as const,
  },
  {
    title: "Electric vehicles",
    description: "Charging cost and running-cost comparisons that account for losses.",
    categories: ["EV"] as const,
  },
  {
    title: "Conversions",
    description: "Unit bridges for fuel economy and vehicle power.",
    categories: ["Units"] as const,
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { label: "Tools" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Fuel and EV calculators",
          description:
            "Fuel cost, EV charging, efficiency and power calculators with explicit units.",
          url: absoluteUrl("/tools"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: tools.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: tool.name,
              url: absoluteUrl(tool.href),
            })),
          },
        }}
      />
      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Calculators
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Fuel and EV calculators
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Each tool solves one decision and states its unit system. The first release focuses on
          calculations that can be tested and maintained without inventing market prices or
          regulations.
        </p>
      </div>

      <div className="mt-8">
        <Notice tone="warning" title="No live prices">
          You enter the price you pay. These pages do not claim real-time fuel, electricity, toll
          or tax data.
        </Notice>
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((group) => {
          const groupTools = tools.filter((tool) =>
            (group.categories as readonly string[]).includes(tool.category),
          );
          const groupId = `group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <section key={group.title} aria-labelledby={groupId}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2
                    id={groupId}
                    className="text-xl font-semibold tracking-tight text-ink"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{group.description}</p>
                </div>
                <p className="text-xs text-muted">{groupTools.length} tools</p>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 rounded-xl border border-line bg-surface p-6">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Why there are not dozens of pages
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          One page can serve a cluster of equivalent searches: calculator, converter, formula,
          online and free. Creating separate URLs for each would be a doorway pattern, not a
          better experience. The same rule applies to number-specific examples, which are
          covered by the converter and its table.
        </p>
        <div className="mt-4">
          <LastReviewed />
        </div>
      </div>
    </div>
  );
}
