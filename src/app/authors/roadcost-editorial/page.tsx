import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Breadcrumbs, JsonLd, LastReviewed, Notice } from "@/components/ui";
import { absoluteUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "RoadCost Editorial",
  description:
    "The editorial team behind RoadCost's fuel, EV and efficiency guides: how formulas are tested, sources are chosen and corrections are handled.",
  alternates: { canonical: "/authors/roadcost-editorial" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "RoadCost Editorial",
    description:
      "How RoadCost researches, tests and reviews its fuel, EV and unit-conversion guides.",
    url: "/authors/roadcost-editorial",
  },
};

export default function EditorialAuthorPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs
        items={[
          { href: "/about", label: "About" },
          { label: "RoadCost Editorial" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { label: "RoadCost Editorial" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "RoadCost Editorial",
          url: absoluteUrl("/authors/roadcost-editorial"),
          inLanguage: "en",
          mainEntity: {
            "@type": "Organization",
            "@id": `${absoluteUrl("/authors/roadcost-editorial")}#editorial`,
            name: "RoadCost Editorial",
            url: absoluteUrl("/authors/roadcost-editorial"),
            description:
              "The collective byline for RoadCost's original fuel, EV and efficiency explanations.",
            parentOrganization: {
              "@type": "Organization",
              name: "RoadCost",
              url: absoluteUrl("/"),
            },
            publishingPrinciples: absoluteUrl("/editorial-policy"),
            knowsAbout: [
              "Fuel economy",
              "Unit conversion",
              "Trip fuel cost",
              "EV charging cost",
              "Electric vehicle efficiency",
            ],
          },
        }}
      />

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Editorial team
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          RoadCost Editorial
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          RoadCost Editorial is the collective byline for the site&rsquo;s original explanations
          and calculator documentation. The work is produced for RoadCost and reviewed against the
          site&rsquo;s editorial policy before publication.
        </p>

        <div className="mt-6">
          <Notice title="What this byline means">
            It identifies the site&rsquo;s editorial process, not a fictional individual. A named
            person is only shown when that person has reviewed the specific page.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          How guides are produced
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Each page starts with one distinct question or calculation task.</li>
          <li>Formulas and unit constants are implemented in the shared calculation library.</li>
          <li>Worked examples use illustrative inputs, never invented live prices.</li>
          <li>Changing rules are left out until an official source and review date exist.</li>
          <li>Pages link to the calculator that applies the formula, not just to another article.</li>
          <li>Corrections are recorded on the public corrections log.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What we do not claim
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            We do not claim that a calculation is a quote, that an illustrative price is current,
            or that a conversion proves real-world efficiency. We also do not publish search
            volumes, competition scores or earnings estimates without a verifiable dataset.
          </p>
          <p>
            Where a page discusses a regulation, tax or official rate, the page must identify the
            authority and the date checked. If that standard cannot be met, the topic stays out of
            the library.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Review and corrections
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Read the full{" "}
            <Link
              href="/editorial-policy"
              className="font-semibold text-brand underline decoration-brand/30 underline-offset-2"
            >
              editorial policy
            </Link>{" "}
            for topic selection, sourcing, AI usage and corrections. Report an error through the{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand underline decoration-brand/30 underline-offset-2"
            >
              contact page
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold text-ink">Explore the work</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="inline-flex rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              All 29 guides
            </Link>
            <Link
              href="/methodology"
              className="inline-flex rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-paper"
            >
              Methodology
            </Link>
            <Link
              href="/corrections"
              className="inline-flex rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-paper"
            >
              Corrections log
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
