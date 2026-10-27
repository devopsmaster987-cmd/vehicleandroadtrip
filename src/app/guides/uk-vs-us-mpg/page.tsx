import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleJsonLd } from "@/components/article-jsonld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import {
  Breadcrumbs,
  LastReviewed,
  Notice,
  RelatedTools,
  SourceList,
} from "@/components/ui";
import { convertFuelEfficiency } from "@/lib/calculations";
import { formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "Why UK and US MPG are different",
  description:
    "UK MPG uses imperial gallons; US MPG uses US gallons. See the exact conversion, the 1.20095 ratio and worked L/100 km examples.",
  alternates: { canonical: "/guides/uk-vs-us-mpg" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Why UK and US MPG are different",
    description:
      "The gallon definitions, the exact conversion factor and the mistakes to avoid.",
    url: "/guides/uk-vs-us-mpg",
  },
};

const rows = [30, 35, 40, 45, 50, 55, 60];

export default function UkVsUsMpgPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ href: "/guides", label: "Guides" }, { label: "UK vs US MPG" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { label: "UK vs US MPG" },
        ]}
      />
      <GuideArticleJsonLd
        slug="uk-vs-us-mpg"
        title="Why UK and US MPG are different"
        description="UK MPG uses imperial gallons; US MPG uses US gallons. See the exact conversion, the 1.20095 ratio and worked L/100 km examples."
        abstract="UK and US MPG use different gallons. Convert both to L/100 km or apply the 1.20095 gallon ratio before comparing vehicles."
        section="Units explained"
        published="2026-10-27"
        updated="2026-10-27"
        citations={[
          "https://www.nist.gov/pml/owm/metric-si/unit-conversion",
          "https://www.legislation.gov.uk/ukpga/1985/72",
          "https://www.fueleconomy.gov/feg/",
        ]}
      />

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Units explained
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Why UK and US MPG are different
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          They use different gallons. A UK imperial gallon is 4.54609 litres; a US gallon is
          3.785411784 litres. A mile is the same, so the same car returns a different MPG number
          in each country. The same <em>number</em> also describes a different fuel consumption.
        </p>

        <div className="mt-6 rounded-xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold text-ink">The quick comparison</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-brand-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">40 MPG UK</p>
              <p className="numeric mt-1 text-2xl font-semibold text-ink">
                {formatNumber(convertFuelEfficiency(40, "mpgUk").l100km, 2)} L/100 km
              </p>
            </div>
            <div className="rounded-lg bg-paper p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">40 MPG US</p>
              <p className="numeric mt-1 text-2xl font-semibold text-ink">
                {formatNumber(convertFuelEfficiency(40, "mpgUs").l100km, 2)} L/100 km
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            40 MPG UK is about 20% higher consumption than 40 MPG US, because the imperial gallon
            is larger. A UK figure is not automatically better than a US figure with the same
            number; the label is using a different gallon.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          The exact conversion
        </h2>
        <div className="mt-3 space-y-4 text-sm leading-7 text-ink-soft">
          <p>
            The two MPG systems can be converted with a ratio. One imperial gallon is about
            1.20095 US gallons, so:
          </p>
          <div className="rounded-lg border border-line bg-surface p-4">
            <pre className="formula text-ink-soft">
{`MPG (UK) = MPG (US) × 1.20095
MPG (US) = MPG (UK) ÷ 1.20095

1 UK MPG ≈ 0.8327 US MPG
1 US MPG ≈ 1.20095 UK MPG`}
            </pre>
          </div>
          <p>
            For L/100 km, the constants differ because the gallon is in the numerator:
          </p>
          <div className="rounded-lg border border-line bg-surface p-4">
            <pre className="formula text-ink-soft">
{`MPG (UK) = 282.480936 ÷ (L/100 km)
MPG (US) = 235.214583 ÷ (L/100 km)`}
            </pre>
          </div>
          <p>
            The constants are not arbitrary. They combine the gallon volume with 1 mile =
            1.609344 km. The UK constant is larger because the imperial gallon is larger.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          The same MPG number in both systems
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Read each row as the L/100 km you get if the MPG figure is interpreted in that system.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              MPG to L/100 km under each gallon definition
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">MPG</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">L/100 km as MPG UK</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">L/100 km as MPG US</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">US MPG equivalent of UK figure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => (
                <tr key={row}>
                  <th scope="row" className="px-4 py-2.5 font-medium text-ink">{row}</th>
                  <td className="numeric px-4 py-2.5 text-ink-soft">
                    {formatNumber(convertFuelEfficiency(row, "mpgUk").l100km, 2)}
                  </td>
                  <td className="numeric px-4 py-2.5 text-ink-soft">
                    {formatNumber(convertFuelEfficiency(row, "mpgUs").l100km, 2)}
                  </td>
                  <td className="numeric px-4 py-2.5 text-ink-soft">
                    {formatNumber(convertFuelEfficiency(row, "mpgUk").mpgUs, 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Why it matters in practice
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            <strong>Vehicle comparisons:</strong> a US window-sticker figure and a UK quoted
            figure are not directly comparable even before test-cycle differences. Convert to the
            same gallon, or convert both to L/100 km.
          </p>
          <p>
            <strong>Fuel cost:</strong> UK fuel is priced per litre, but the car may be described
            in MPG UK. Multiplying pence per litre by MPG directly is a unit error. Convert to
            litres used first.
          </p>
          <p>
            <strong>Imported cars and rentals:</strong> a car that returns 50 MPG US is about
            60.05 MPG UK. It has not become more efficient because the number changed. The unit
            changed.
          </p>
          <p>
            <strong>EV comparisons:</strong> MPG and MPGe are different constructs. MPGe is an
            energy-equivalence rating for electric vehicles, not a liquid-fuel measurement. Do not
            convert MPGe to MPG with the gallon ratio.
          </p>
        </div>

        <div className="mt-6">
          <Notice tone="warning" title="Test cycles are a separate issue">
            WLTP, NEDC and EPA figures can differ even when expressed in the same unit. This guide
            fixes the gallon problem. It does not claim that a WLTP MPG and an EPA MPG are
            directly comparable after conversion; the test procedures differ.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Common mistakes
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Treating MPG as a universal unit without asking which gallon is meant.</li>
          <li>Using the UK constant for a US MPG figure, or the reverse.</li>
          <li>
            Comparing a UK MPG with a US MPG and concluding one car is better without converting.
          </li>
          <li>Multiplying a pence-per-litre price by MPG instead of calculating litres used.</li>
          <li>Applying the UK/US MPG ratio to MPGe, which is a different energy equivalent.</li>
        </ul>

        <div className="mt-8 rounded-xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold text-ink">Convert a real figure</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            The converter accepts L/100 km, MPG UK, MPG US and km/L, and names the system in the
            result.
          </p>
          <Link
            href="/tools/fuel-efficiency-converter"
            className="mt-3 inline-flex rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Open the fuel efficiency converter
          </Link>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Sources</h2>
        <div className="mt-3">
          <SourceList
            sources={[
              {
                href: "https://www.nist.gov/pml/owm/metric-si/unit-conversion",
                label: "NIST — unit conversion",
                note: "US customary and metric relationships.",
              },
              {
                href: "https://www.legislation.gov.uk/ukpga/1985/72",
                label: "UK Weights and Measures Act 1985",
                note: "The statutory framework for UK units, including the imperial gallon.",
              },
              {
                href: "https://www.fueleconomy.gov/feg/",
                label: "fueleconomy.gov — US fuel-economy ratings",
                note: "US EPA label values and test-cycle context.",
              },
            ]}
          />
        </div>
        <div className="mt-4">
          <LastReviewed />
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Related</h2>
        <div className="mt-4">
          <RelatedTools
            items={[
              {
                href: "/tools/fuel-efficiency-converter",
                name: "Fuel efficiency converter",
                description: "Convert both MPG systems and L/100 km in one place.",
              },
              {
                href: "/tools/fuel-cost",
                name: "Trip fuel cost calculator",
                description: "Use the right gallon and price unit for a journey.",
              },
              {
                href: "/guides/mpge-explained",
                name: "MPGe explained",
                description: "The separate energy-equivalence system for EVs.",
              },
              {
                href: "/guides/how-fuel-cost-is-calculated",
                name: "How fuel cost is calculated",
                description: "The formulas behind the trip cost estimate.",
              },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
