import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { CalculatorJsonLd } from "@/components/calculator-jsonld";
import { EvEfficiencyCalculator, FuelEfficiencyCalculator } from "@/components/calculators/fuel-efficiency-calculator";
import {
  Breadcrumbs,
  FaqList,
  LastReviewed,
  Notice,
  RelatedTools,
  SourceList,
} from "@/components/ui";
import { convertEvEfficiency, convertFuelEfficiency } from "@/lib/calculations";
import { formatNumber } from "@/lib/format";
import { getToolFaqs } from "@/lib/tool-faqs";

export const metadata: Metadata = {
  title: "Fuel efficiency converter — MPG UK, MPG US and L/100 km",
  description:
    "Convert L/100 km to MPG UK or MPG US, and convert MPGe to mi/kWh, kWh/100 mi or kWh/100 km. Formulas, tables and worked examples.",
  alternates: { canonical: "/tools/fuel-efficiency-converter" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Fuel efficiency converter — MPG UK, MPG US and L/100 km",
    description:
      "A converter that never confuses UK and US MPG, with liquid-fuel and EV efficiency sections.",
    url: "/tools/fuel-efficiency-converter",
  },
};

const l100Rows = [4, 5, 6, 7, 8, 10, 12, 15, 20];
const mpgRows = [30, 35, 40, 45, 50, 55, 60];
const mpgeRows = [100, 120, 130, 150, 180];

export default function FuelEfficiencyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ href: "/tools", label: "Tools" }, { label: "Fuel efficiency converter" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/tools", label: "Tools" },
          { label: "Fuel efficiency converter" },
        ]}
      />
      <CalculatorJsonLd
        name="Fuel efficiency converter"
        description="Convert L/100 km, MPG UK, MPG US, km/L, MPGe, mi/kWh and kWh/100 km."
        path="/tools/fuel-efficiency-converter"
        faqs={getToolFaqs("/tools/fuel-efficiency-converter")}
      />

      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Conversion tool
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Fuel efficiency converter
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Convert between <strong>L/100 km, MPG UK, MPG US and km/L</strong>. The page also
          converts EV efficiency between <strong>MPGe, mi/kWh, kWh/100 mi and kWh/100 km</strong>.
          Every result names the gallon or energy basis used.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          A figure in MPG is ambiguous until you know whether it means UK or US gallons. This
          converter asks for that choice instead of guessing.
        </p>
      </div>

      <div className="mt-7">
        <Notice tone="warning" title="Do not compare UK MPG with US MPG directly">
          The imperial gallon is 4.54609 litres; the US gallon is 3.785411784 litres. The same
          numeric MPG is not the same fuel consumption. The ratio between the two is about
          1.20095.
        </Notice>
      </div>

      <section className="mt-10" aria-labelledby="liquid-heading">
        <div className="mb-5">
          <h2 id="liquid-heading" className="text-2xl font-semibold tracking-tight text-ink">
            Liquid fuel economy
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            For petrol, diesel and other liquid fuels. Choose the unit your figure is already in.
          </p>
        </div>
        <FuelEfficiencyCalculator />
      </section>

      <section className="mt-12" aria-labelledby="ev-heading">
        <div className="mb-5">
          <h2 id="ev-heading" className="text-2xl font-semibold tracking-tight text-ink">
            Electric vehicle efficiency
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            MPGe is an EPA gasoline-equivalent rating. It is useful for labels and comparisons,
            but it is not a liquid-fuel measurement. EPA MPGe and kWh/100 mi are wall-to-outlet
            figures that already include charging losses.
          </p>
        </div>
        <EvEfficiencyCalculator />
      </section>

      <section className="mt-12" aria-labelledby="formula-heading">
        <h2 id="formula-heading" className="text-2xl font-semibold tracking-tight text-ink">
          The formulas
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">L/100 km and MPG</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`MPG (UK) = 282.480936 ÷ (L/100 km)
MPG (US) = 235.214583 ÷ (L/100 km)

L/100 km = 282.480936 ÷ MPG (UK)
L/100 km = 235.214583 ÷ MPG (US)`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              The constants come from the gallon definitions and 1 mile = 1.609344 km. Zero
              L/100 km is treated as infinite MPG, not as an error.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">EV efficiency</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`MPGe = mi/kWh × 33.7
mi/kWh = MPGe ÷ 33.7

kWh/100 mi = 100 ÷ (mi/kWh)
kWh/100 km = 62.137119 ÷ (mi/kWh)`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              33.7 kWh is the EPA gasoline-equivalent basis used by this calculator. EPA MPGe
              includes Level 2 charging losses and is based on energy at the outlet. Verify the
              current basis against fueleconomy.gov before relying on a regulatory comparison.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Worked examples
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">5 L/100 km</p>
            <p className="numeric mt-2 text-lg font-semibold text-ink">
              {formatNumber(convertFuelEfficiency(5, "l100km").mpgUk, 2)} MPG UK
            </p>
            <p className="numeric mt-1 text-sm text-muted">
              {formatNumber(convertFuelEfficiency(5, "l100km").mpgUs, 2)} MPG US
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">40 MPG UK</p>
            <p className="numeric mt-2 text-lg font-semibold text-ink">
              {formatNumber(convertFuelEfficiency(40, "mpgUk").l100km, 2)} L/100 km
            </p>
            <p className="numeric mt-1 text-sm text-muted">
              {formatNumber(convertFuelEfficiency(40, "mpgUk").mpgUs, 2)} MPG US
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">150 MPGe</p>
            <p className="numeric mt-2 text-lg font-semibold text-ink">
              {formatNumber(convertEvEfficiency(150, "mpge").miPerKwh, 2)} mi/kWh
            </p>
            <p className="numeric mt-1 text-sm text-muted">
              {formatNumber(convertEvEfficiency(150, "mpge").kwhPer100km, 1)} kWh/100 km
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="tables-heading">
        <h2 id="tables-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Reference tables
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Static examples for scanning and printing. They use the same tested functions as the
          calculator.
        </p>

        <div className="mt-5 grid gap-6 xl:grid-cols-2">
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
                L/100 km to MPG (UK and US)
              </caption>
              <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">L/100 km</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">MPG UK</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">MPG US</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">km/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {l100Rows.map((row) => {
                  const result = convertFuelEfficiency(row, "l100km");
                  return (
                    <tr key={row}>
                      <th scope="row" className="px-4 py-2.5 font-medium text-ink">{row}</th>
                      <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.mpgUk, 2)}</td>
                      <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.mpgUs, 2)}</td>
                      <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.kmPerL, 2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full min-w-[32rem] border-collapse text-sm">
              <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
                The same MPG number in each system
              </caption>
              <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">MPG</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">L/100 km as MPG UK</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">L/100 km as MPG US</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {mpgRows.map((row) => (
                  <tr key={row}>
                    <th scope="row" className="px-4 py-2.5 font-medium text-ink">{row}</th>
                    <td className="numeric px-4 py-2.5 text-ink-soft">
                      {formatNumber(convertFuelEfficiency(row, "mpgUk").l100km, 2)}
                    </td>
                    <td className="numeric px-4 py-2.5 text-ink-soft">
                      {formatNumber(convertFuelEfficiency(row, "mpgUs").l100km, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              EV efficiency: MPGe to mi/kWh and kWh per 100 miles or kilometres
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">MPGe</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">mi/kWh</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">kWh/100 mi</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">kWh/100 km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {mpgeRows.map((row) => {
                const result = convertEvEfficiency(row, "mpge");
                return (
                  <tr key={row}>
                    <th scope="row" className="px-4 py-2.5 font-medium text-ink">{row}</th>
                    <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.miPerKwh, 3)}</td>
                    <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.kwhPer100mi, 2)}</td>
                    <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.kwhPer100km, 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                question: "How many MPG is 7 L/100 km?",
                answer: (
                  <>
                    7 L/100 km is about 40.35 MPG UK or 33.60 MPG US. The formula is 282.480936
                    ÷ 7 for UK MPG and 235.214583 ÷ 7 for US MPG.
                  </>
                ),
              },
              {
                question: "How do you convert L/100 km to MPG?",
                answer: (
                  <>
                    Divide the correct constant by the L/100 km figure. Use 282.480936 for UK
                    imperial MPG and 235.214583 for US MPG. Do not use one constant for both.
                  </>
                ),
              },
              {
                question: "Is 40 MPG good?",
                answer: (
                  <>
                    The number alone is incomplete. 40 MPG UK is about 7.06 L/100 km; 40 MPG US
                    is about 5.88 L/100 km. Whether that is good depends on the vehicle, fuel,
                    route and driving style. Compare like-for-like test cycles.
                  </>
                ),
              },
              {
                question: "What is MPGe?",
                answer: (
                  <>
                    MPGe is the US EPA&rsquo;s miles-per-gallon-equivalent rating for electric
                    vehicles. It expresses electric energy use using 33.7 kWh per gallon of
                    gasoline equivalent. EPA MPGe includes charging losses and is a label
                    comparison, not a promise of real-world range or cost.
                  </>
                ),
              },
              {
                question: "Why can 0 L/100 km produce infinite MPG?",
                answer: (
                  <>
                    The MPG formula divides by L/100 km. At exactly zero, the mathematical result
                    is infinite. Real vehicles do not use zero fuel, but the converter handles the
                    boundary explicitly rather than crashing.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Sources and definitions
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          These sources define the units and the EPA basis. They are not live price feeds.
        </p>
        <div className="mt-4">
          <SourceList
            sources={[
              {
                href: "https://www.fueleconomy.gov/feg/evtech.shtml",
                label: "fueleconomy.gov — electric vehicle technology and efficiency",
                note: "US EPA / Department of Energy fuel-economy information.",
              },
              {
                href: "https://www.fueleconomy.gov/feg/",
                label: "fueleconomy.gov — official US fuel-economy ratings",
                note: "Model-specific MPG and MPGe labels.",
              },
              {
                href: "https://www.nist.gov/pml/owm/metric-si/unit-conversion",
                label: "NIST — unit conversion",
                note: "Reference for US customary and metric unit relationships.",
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
                href: "/tools/fuel-cost",
                name: "Fuel cost calculator",
                description: "Turn consumption and distance into a trip cost in UK, US or European units.",
              },
              {
                href: "/tools/ev-charging-cost",
                name: "EV charging cost calculator",
                description: "Include charging losses and session fees in the cost of a charge.",
              },
              {
                href: "/guides/uk-vs-us-mpg",
                name: "Why UK and US MPG differ",
                description: "The gallon definitions, the ratio and the mistakes to avoid.",
              },
              {
                href: "/tools/kw-to-ps-hp",
                name: "kW to PS and hp converter",
                description: "Convert vehicle power without confusing metric and mechanical horsepower.",
              },
            ]}
          />
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          Need the calculation behind a journey?{" "}
          <Link href="/tools/fuel-cost" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            Use the trip fuel cost calculator
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
