import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Breadcrumbs, JsonLd, LastReviewed, Notice } from "@/components/ui";
import { absoluteUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "About",
  description:
    "About RoadCost, an independent calculator project for UK, US, European, Swiss and Asia-Pacific drivers, and the principles behind its tools.",
  alternates: { canonical: "/about" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "About",
    description:
      "About RoadCost, an independent calculator project for UK, US, European, Swiss and Asia-Pacific drivers, and the principles behind its tools.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "About" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { label: "About" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About RoadCost",
          url: absoluteUrl("/about"),
          inLanguage: "en",
          mainEntity: {
            "@type": "Organization",
            name: "RoadCost",
            url: absoluteUrl("/"),
            publishingPrinciples: absoluteUrl("/editorial-policy"),
          },
        }}
      />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          About RoadCost
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          RoadCost is an independent calculator project for drivers, EV owners and travellers in
          the UK, the US, Europe, Switzerland and Asia-Pacific. It focuses on a small number of
          practical questions: what a journey uses, what a charge costs, and how to compare
          figures that use different units.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What the site is for
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Unit confusion is common across these markets. UK fuel is sold in litres but economy is
            often quoted in imperial MPG. US fuel is sold in US gallons. Europe uses litres per
            100 km, while Japan, India and South Korea often use km/L. An EV adds MPGe, mi/kWh
            and kWh/100 km. A calculator that does not state its units is not useful enough.
          </p>
          <p>
            The initial toolkit covers trip fuel cost, EV charging cost, EV versus petrol running
            costs, fuel-efficiency conversion and vehicle power conversion. These tools can be
            tested, explained and maintained without inventing live prices, tolls or tax rules.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Principles
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Explicit units",
              body: "Every result names the unit system. UK MPG, US MPG, L/100 km, MPGe, PS and hp are not treated as interchangeable.",
            },
            {
              title: "Tested formulas",
              body: "The calculation library has automated tests for normal cases, boundary cases and invalid inputs. The formula is shown on the page.",
            },
            {
              title: "No invented data",
              body: "The site does not publish live fuel prices, tolls, vignettes or tax rates without a verifiable source and a maintenance plan.",
            },
            {
              title: "Original explanations",
              body: "Content is written for the calculator, not copied from a competitor. Sources are cited where a rule or constant comes from an authority.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-surface p-4">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What the site does not do
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>It is not affiliated with any government, vehicle manufacturer, charging network, toll authority or fuel retailer.</li>
          <li>It does not sell fuel, electricity, vignettes, tolls or insurance.</li>
          <li>It does not provide legal, tax, financial or safety advice.</li>
          <li>It does not claim live or station-level prices, and it does not claim guaranteed costs.</li>
          <li>It does not publish pages solely to target keyword permutations or arbitrary numbers.</li>
        </ul>

        <div className="mt-6">
          <Notice tone="warning" title="Pre-launch notice">
            This build is a functional preview. Before commercial launch, the operator must
            configure the production domain, identify the legal operator and add any advertising
            or analytics disclosures. See the <Link href="/methodology" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">methodology</Link> for the current status.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Who operates the site
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          The site is an independent project. It does not present invented credentials, reviews or
          team biographies. The content is assembled with AI assistance and checked against the
          sources cited on each page and the automated test suite. The{" "}
          <Link
            href="/authors/roadcost-editorial"
            className="font-semibold text-brand underline decoration-brand/30 underline-offset-2"
          >
            RoadCost Editorial
          </Link>{" "}
          page explains the byline and review process.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Contact</h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          For corrections, source suggestions or privacy questions, see the{" "}
          <Link href="/contact" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            contact page
          </Link>
          . Please do not send personal journey data.
        </p>

        <div className="mt-6">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
