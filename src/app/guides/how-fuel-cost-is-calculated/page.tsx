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
import { US_GALLON_LITRES, calculateFuelCost } from "@/lib/calculations";
import { formatMoney, formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "How trip fuel cost is calculated",
  description:
    "The formulas for UK, US, European, Swiss and Asia-Pacific trip fuel cost, with worked examples, unit traps and a clear list of exclusions.",
  alternates: { canonical: "/guides/how-fuel-cost-is-calculated" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "How trip fuel cost is calculated",
    description:
      "Distance, consumption and price: the three inputs, the unit traps and the exclusions.",
    url: "/guides/how-fuel-cost-is-calculated",
  },
};

const uk = calculateFuelCost({
  market: "uk",
  distance: 100,
  economy: 50,
  fuelPrice: 145,
});
const us = calculateFuelCost({
  market: "us",
  distance: 300,
  economy: 30,
  fuelPrice: 3.5,
});
const eu = calculateFuelCost({
  market: "eu",
  distance: 500,
  economy: 6.5,
  fuelPrice: 1.75,
});

export default function HowFuelCostIsCalculatedPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs
        items={[
          { href: "/guides", label: "Guides" },
          { label: "How fuel cost is calculated" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { label: "How fuel cost is calculated" },
        ]}
      />
      <GuideArticleJsonLd
        slug="how-fuel-cost-is-calculated"
        title="How trip fuel cost is calculated"
        description="The formulas for UK, US, European, Swiss and Asia-Pacific trip fuel cost, with worked examples, unit traps and a clear list of exclusions."
        abstract="Distance, consumption and fuel price are enough to estimate trip fuel cost. Convert to the same volume unit before multiplying."
        section="Fuel costs"
        published="2026-10-27"
        updated="2026-10-27"
        citations={[
          "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
          "https://www.eia.gov/petroleum/gasdiesel/",
          "https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en",
        ]}
      />

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Method
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          How trip fuel cost is calculated
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          A trip fuel estimate needs three things: the distance, the vehicle&rsquo;s fuel
          consumption, and the price of fuel. The arithmetic is simple, but the units are where
          most errors happen. UK fuel is priced per litre while economy may be quoted in imperial
          MPG; US fuel is priced per US gallon; European consumption is usually litres per 100 km.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          The three formulas
        </h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">United Kingdom</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`litres used = miles ÷ MPG (UK) × 4.54609
cost = litres used × (pence per litre ÷ 100)

Example: 100 miles ÷ 50 MPG UK × 4.54609
         = 9.092 litres
         9.092 × £1.45 = £13.18`}
            </pre>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">United States</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`US gallons used = miles ÷ MPG (US)
cost = US gallons used × dollars per US gallon

Example: 300 miles ÷ 30 MPG US = 10 US gallons
         10 × $3.50 = $35.00`}
            </pre>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">Europe</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`litres used = km × (L/100 km) ÷ 100
cost = litres used × euros per litre

Example: 500 km × 6.5 ÷ 100 = 32.5 litres
         32.5 × €1.75 = €56.88`}
            </pre>
          </div>
        </div>

        <div className="mt-6">
          <Notice tone="warning" title="Do not multiply price by MPG">
            MPG is miles per gallon, while UK fuel is priced per litre. The units do not cancel.
            Convert the distance and economy into litres (or gallons) first, then multiply by the
            price for that same volume unit.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Worked comparison
        </h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[42rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              Illustrative examples only; the prices are not current market data
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Market</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Inputs</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Fuel used</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Total</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Per mile / km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <th scope="row" className="px-4 py-2.5 font-medium text-ink">UK</th>
                <td className="px-4 py-2.5 text-ink-soft">100 mi · 50 MPG UK · 145 p/l</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(uk.fuelUsedLitres, 2)} L</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatMoney(uk.totalCost, "GBP")}</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatMoney(uk.costPerMile, "GBP", 3)}/mi</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2.5 font-medium text-ink">US</th>
                <td className="px-4 py-2.5 text-ink-soft">300 mi · 30 MPG US · $3.50/gal</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">
                  {formatNumber(us.fuelUsedLitres / US_GALLON_LITRES, 2)} US gal
                </td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatMoney(us.totalCost, "USD")}</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatMoney(us.costPerMile, "USD", 3)}/mi</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2.5 font-medium text-ink">Europe</th>
                <td className="px-4 py-2.5 text-ink-soft">500 km · 6.5 L/100 km · €1.75/l</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(eu.fuelUsedLitres, 2)} L</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatMoney(eu.totalCost, "EUR")}</td>
                <td className="numeric px-4 py-2.5 text-ink-soft">{formatMoney(eu.costPerKm, "EUR", 3)}/km</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Cost per mile and cost per 100 km
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Total cost is useful for a specific trip. Cost per mile or per 100 km is useful for
            comparing journeys of different lengths. The conversion between them is:
          </p>
          <div className="rounded-lg border border-line bg-surface p-4">
            <pre className="formula text-ink-soft">
{`cost per 100 km = cost per mile × 62.137119
cost per 100 km = cost per km × 100
cost per mile = cost per km × 1.609344`}
            </pre>
          </div>
          <p>
            The calculator shows both because UK and US results are naturally per mile, while
            European results are naturally per kilometre or per 100 km.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Round trips and one-way trips
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          A round trip doubles the distance. If you enter the one-way distance, the calculator
          must double it before applying consumption; if you enter the total distance, it must
          not. The calculator makes this explicit with a round-trip checkbox rather than guessing.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What the estimate excludes
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Tolls, vignettes, ferries, congestion charges and parking.</li>
          <li>Servicing, repairs, tyres, insurance, depreciation and finance.</li>
          <li>Cold starts, traffic, hills, roof boxes, heavy loads and air conditioning.</li>
          <li>Price differences between fuel grades or between stations on the route.</li>
        </ul>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Published consumption is a test-cycle figure. Real consumption can be higher or lower.
          The result is an estimate, not a quote.
        </p>

        <div className="mt-8 rounded-xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold text-ink">Run the numbers</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            The calculator uses the formulas above and switches units with the market selection.
          </p>
          <Link
            href="/tools/fuel-cost"
            className="mt-3 inline-flex rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Open the fuel cost calculator
          </Link>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Sources</h2>
        <div className="mt-3">
          <SourceList
            sources={[
              {
                href: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
                label: "GOV.UK — weekly road fuel prices",
                note: "UK price statistics for context, not a live station price.",
              },
              {
                href: "https://www.eia.gov/petroleum/gasdiesel/",
                label: "US EIA — gasoline and diesel prices",
                note: "US regional and national averages.",
              },
              {
                href: "https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en",
                label: "European Commission — Weekly Oil Bulletin",
                note: "EU fuel price monitoring.",
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
                href: "/tools/fuel-cost",
                name: "Trip fuel cost calculator",
                description: "Apply these formulas in UK, US or European units.",
              },
              {
                href: "/tools/fuel-efficiency-converter",
                name: "Fuel efficiency converter",
                description: "Fix an MPG or L/100 km figure before estimating cost.",
              },
              {
                href: "/guides/uk-vs-us-mpg",
                name: "UK vs US MPG",
                description: "Why the gallon matters and how to convert it.",
              },
              {
                href: "/tools/ev-vs-petrol-cost",
                name: "EV vs petrol cost",
                description: "Compare the energy cost of two vehicles over a year.",
              },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
