import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { CalculatorJsonLd } from "@/components/calculator-jsonld";
import { FuelCostCalculator } from "@/components/calculators/fuel-cost-calculator";
import {
  Breadcrumbs,
  FaqList,
  LastReviewed,
  Notice,
  RelatedTools,
  SourceList,
} from "@/components/ui";
import { US_GALLON_LITRES, calculateFuelCost } from "@/lib/calculations";
import { formatMoney, formatNumber } from "@/lib/format";
import { getToolFaqs } from "@/lib/tool-faqs";

export const metadata: Metadata = {
  title: "Trip fuel cost calculator — 8 markets",
  description:
    "Calculate trip fuel cost from distance, consumption and the price you pay. Includes MPG UK, MPG US, L/100 km, km/L and eight local currencies.",
  alternates: { canonical: "/tools/fuel-cost" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Trip fuel cost calculator — 8 markets",
    description:
      "A fuel cost calculator with explicit UK, US, European, Swiss and Asia-Pacific units and no invented live prices.",
    url: "/tools/fuel-cost",
  },
};

const ukExample = calculateFuelCost({
  market: "uk",
  distance: 100,
  economy: 50,
  fuelPrice: 145,
});
const usExample = calculateFuelCost({
  market: "us",
  distance: 300,
  economy: 30,
  fuelPrice: 3.5,
});
const euExample = calculateFuelCost({
  market: "eu",
  distance: 500,
  economy: 6.5,
  fuelPrice: 1.75,
});

export default function FuelCostPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ href: "/tools", label: "Tools" }, { label: "Fuel cost calculator" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/tools", label: "Tools" },
          { label: "Fuel cost calculator" },
        ]}
      />
      <CalculatorJsonLd
        name="Trip fuel cost calculator"
        description="Estimate trip fuel use and cost with UK, US, European, Swiss and Asia-Pacific units."
        path="/tools/fuel-cost"
        faqs={getToolFaqs("/tools/fuel-cost")}
      />

      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Journey cost
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Trip fuel cost calculator
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Estimate how much fuel a journey uses and what it costs. Choose one of eight market
          presets, then enter the consumption and price you actually pay. The result includes
          cost per mile and cost per 100 km.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          UK: miles, MPG UK and pence per litre. US: miles, MPG US and dollars per US gallon.
          Europe, Switzerland and Australia: kilometres, L/100 km, local currency per litre.
          Japan, India and South Korea: kilometres, km/L, local currency per litre.
        </p>
      </div>

      <div className="mt-7">
        <Notice tone="warning" title="No national or live fuel price is assumed">
          Petrol, diesel and electricity prices vary by country, region, grade and station. This
          calculator uses only the price you enter. It cannot tell you the cheapest station near
          you.
        </Notice>
      </div>

      <section className="mt-10" aria-labelledby="calculator-heading">
        <h2 id="calculator-heading" className="mb-5 text-2xl font-semibold tracking-tight text-ink">
          Calculate the cost
        </h2>
        <FuelCostCalculator />
      </section>

      <section className="mt-12" aria-labelledby="formula-heading">
        <h2 id="formula-heading" className="text-2xl font-semibold tracking-tight text-ink">
          How the calculation works
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">United Kingdom</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`litres = miles ÷ MPG (UK) × 4.54609
cost = litres × (pence/litre ÷ 100)`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              The pump price is in pence per litre, while economy is usually quoted in imperial
              MPG. The conversion bridges those two conventions.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">United States</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`US gallons = miles ÷ MPG (US)
cost = US gallons × dollars/gallon`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              US fuel is sold by the US gallon. A US gallon is 3.785411784 litres, not the
              imperial gallon used for UK MPG.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">Europe / Switzerland / Australia</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`litres = km × (L/100 km) ÷ 100
cost = litres × local currency/litre`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              These markets normally quote litres per 100 kilometres. Cost per 100 km is
              therefore consumption multiplied by the price per litre.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">Japan / India / South Korea</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`litres = km ÷ (km/L)
cost = litres × local currency/litre`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              These markets usually quote fuel economy in kilometres per litre, so litres used
              is distance divided by km/L rather than multiplied by litres per 100 km.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Cost per mile is total cost divided by miles. Cost per kilometre is total cost divided
          by kilometres. Both are shown so a UK or US result can still be compared with a
          metric one.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Worked examples
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Illustrative inputs only. These are not current market prices.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">UK example</p>
            <p className="mt-1 text-sm text-ink-soft">100 miles · 50 MPG UK · 145 p/l</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(ukExample.totalCost, "GBP")}
            </p>
            <p className="mt-1 text-xs text-muted">
              {formatNumber(ukExample.fuelUsedLitres, 2)} litres ·{" "}
              {formatMoney(ukExample.costPerMile, "GBP", 3)}/mile
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">US example</p>
            <p className="mt-1 text-sm text-ink-soft">300 miles · 30 MPG US · $3.50/gal</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(usExample.totalCost, "USD")}
            </p>
            <p className="mt-1 text-xs text-muted">
              {formatNumber(usExample.fuelUsedLitres / US_GALLON_LITRES, 2)} US gallons ·{" "}
              {formatMoney(usExample.costPerMile, "USD", 3)}/mile
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">EU example</p>
            <p className="mt-1 text-sm text-ink-soft">500 km · 6.5 L/100 km · €1.75/l</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(euExample.totalCost, "EUR")}
            </p>
            <p className="mt-1 text-xs text-muted">
              {formatNumber(euExample.fuelUsedLitres, 2)} litres ·{" "}
              {formatMoney(euExample.costPer100Km, "EUR")}/100 km
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="accuracy-heading">
        <h2 id="accuracy-heading" className="text-2xl font-semibold tracking-tight text-ink">
          What changes the real number
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Driving style and speed",
              body: "Published consumption figures come from a test cycle. Motorway speeds, cold starts, air conditioning, roof boxes and heavy loads can all change real consumption.",
            },
            {
              title: "Fuel grade and type",
              body: "Petrol, diesel, premium grades and regional blends can have different prices and consumption. The calculator does not assume one national price or grade.",
            },
            {
              title: "Distance basis",
              body: "A one-way route and a round trip are different. Tick the round-trip box when the return leg matters; the calculator doubles the distance rather than guessing.",
            },
            {
              title: "What is excluded",
              body: "Tolls, vignettes, ferries, parking, congestion charges, maintenance and depreciation are not part of a fuel-only estimate. Some of these need verified official data and are not published yet.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-surface p-4">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Questions
        </h2>
        <div className="mt-4">
          <FaqList
            items={[
              {
                question: "How do you calculate gas cost for a trip?",
                answer: (
                  <>
                    Divide the trip distance by the vehicle&rsquo;s fuel economy to get the fuel
                    used, then multiply by the price per unit. In the US: gallons = miles ÷ MPG,
                    and cost = gallons × dollars per gallon. In the UK: litres = miles ÷ MPG UK ×
                    4.54609, and cost = litres × pounds per litre.
                  </>
                ),
              },
              {
                question: "How much does it cost to fill a car?",
                answer: (
                  <>
                    A full-tank cost is tank capacity multiplied by the price per litre or
                    gallon. This calculator estimates fuel used for a journey, not a fill-up. To
                    estimate a fill-up, enter your tank capacity as the quantity and multiply by
                    the price.
                  </>
                ),
              },
              {
                question: "Is it worth driving further for cheaper fuel?",
                answer: (
                  <>
                    Compare the saving on the fuel you need with the cost of the extra distance.
                    A detour only pays if the price difference multiplied by the litres bought is
                    greater than the extra distance divided by your MPG and multiplied by the
                    price. For a small fill, a large detour rarely pays. This page does not
                    provide live station prices.
                  </>
                ),
              },
              {
                question: "Why does the UK use litres but MPG?",
                answer: (
                  <>
                    UK fuel is sold in litres, while vehicle economy has historically been quoted
                    in miles per imperial gallon. The two conventions coexist. This calculator
                    explicitly converts between them; it does not assume that a pence-per-litre
                    price can be multiplied directly by MPG.
                  </>
                ),
              },
              {
                question: "Can I use this for diesel?",
                answer: (
                  <>
                    Yes. Enter the diesel consumption and the diesel price you pay. The
                    arithmetic is the same, but diesel and petrol prices can differ. The result
                    is still a fuel-only estimate.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Official price sources
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          We do not reproduce these prices because they change and may not match your local
          station. Use them to check the market context, then enter your own price above.
        </p>
        <div className="mt-4">
          <SourceList
            sources={[
              {
                href: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
                label: "GOV.UK — weekly road fuel prices",
                note: "UK official statistics; not a station-level live feed.",
              },
              {
                href: "https://www.eia.gov/petroleum/gasdiesel/",
                label: "US Energy Information Administration — gasoline and diesel prices",
                note: "US regional and national averages.",
              },
              {
                href: "https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en",
                label: "European Commission — Weekly Oil Bulletin",
                note: "EU fuel price monitoring by country.",
              },
              {
                href: "https://www.fueleconomy.gov/feg/",
                label: "fueleconomy.gov — official US fuel-economy ratings",
                note: "Model-specific MPG figures; test-cycle values.",
              },
            ]}
          />
        </div>
        <div className="mt-4">
          <LastReviewed />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="related-heading">
        <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Related tools
        </h2>
        <div className="mt-4">
          <RelatedTools
            items={[
              {
                href: "/tools/fuel-efficiency-converter",
                name: "Fuel efficiency converter",
                description: "Convert MPG UK, MPG US, L/100 km and km/L before using this calculator.",
              },
              {
                href: "/tools/ev-charging-cost",
                name: "EV charging cost calculator",
                description: "Estimate the electricity cost of a charge, including losses and fees.",
              },
              {
                href: "/tools/ev-vs-petrol-cost",
                name: "EV vs petrol cost",
                description: "Compare annual running costs on the same distance basis.",
              },
              {
                href: "/guides/how-fuel-cost-is-calculated",
                name: "How fuel cost is calculated",
                description: "A longer explanation of the formulas and the unit traps.",
              },
            ]}
          />
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          Compare a petrol and electric journey?{" "}
          <Link href="/tools/ev-vs-petrol-cost" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            Use the EV running-cost comparison
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
