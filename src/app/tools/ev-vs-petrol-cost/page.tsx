import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { CalculatorJsonLd } from "@/components/calculator-jsonld";
import { EvVsPetrolCalculator } from "@/components/calculators/ev-vs-petrol-calculator";
import {
  Breadcrumbs,
  FaqList,
  LastReviewed,
  Notice,
  RelatedTools,
  SourceList,
} from "@/components/ui";
import { calculateEvVsPetrol } from "@/lib/calculations";
import { formatMoney, formatNumber } from "@/lib/format";
import { getToolFaqs } from "@/lib/tool-faqs";

export const metadata: Metadata = {
    title: "EV vs petrol cost calculator — 8 markets",
  description:
    "Compare annual electric and petrol or gas running costs on the same distance basis, including charging losses and an optional purchase-price break-even.",
  alternates: { canonical: "/tools/ev-vs-petrol-cost" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
  title: "EV vs petrol cost calculator — 8 markets",
    description:
      "A running-cost comparison that does not assume an EV is always cheaper.",
    url: "/tools/ev-vs-petrol-cost",
  },
};

const ukExample = calculateEvVsPetrol({
  market: "uk",
  annualDistance: 10000,
  petrolEconomy: 50,
  petrolPrice: 145,
  evEconomy: 3.5,
  electricityPrice: 25,
  chargingEfficiencyPct: 90,
  upfrontPriceDifference: 5000,
});
const usExample = calculateEvVsPetrol({
  market: "us",
  annualDistance: 12000,
  petrolEconomy: 30,
  petrolPrice: 3.5,
  evEconomy: 3.5,
  electricityPrice: 17,
  chargingEfficiencyPct: 90,
});
const euExample = calculateEvVsPetrol({
  market: "eu",
  annualDistance: 15000,
  petrolEconomy: 6.5,
  petrolPrice: 1.75,
  evEconomy: 17,
  electricityPrice: 0.35,
  chargingEfficiencyPct: 90,
});

export default function EvVsPetrolPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ href: "/tools", label: "Tools" }, { label: "EV vs petrol cost" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/tools", label: "Tools" },
          { label: "EV vs petrol cost" },
        ]}
      />
      <CalculatorJsonLd
        name="EV vs petrol cost calculator"
        description="Compare annual electric and petrol running costs with UK, US, European, Swiss and Asia-Pacific units."
        path="/tools/ev-vs-petrol-cost"
        faqs={getToolFaqs("/tools/ev-vs-petrol-cost")}
      />

      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Running-cost comparison
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Petrol or gas vs EV cost calculator
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Compare the annual energy cost of a petrol car and an electric car over the same
          distance. Add an optional purchase-price difference to estimate a simple break-even.
          The result separates running costs from ownership costs and does not assume the EV is
          cheaper.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          UK: miles, MPG UK and pence. US: miles, MPG US and dollars. Europe, Switzerland and
          Australia: kilometres, L/100 km and local currency. Japan, India and South Korea:
          kilometres, km/L and local currency.
        </p>
      </div>

      <div className="mt-7">
        <Notice tone="warning" title="A running-cost comparison is not a total-cost comparison">
          The headline result excludes depreciation, insurance, maintenance, tyres, road tax,
          charger installation and resale value. Those can change the answer, sometimes by more
          than the energy saving.
        </Notice>
      </div>

      <section className="mt-10" aria-labelledby="calculator-heading">
        <h2 id="calculator-heading" className="mb-5 text-2xl font-semibold tracking-tight text-ink">
          Compare the running costs
        </h2>
        <EvVsPetrolCalculator />
      </section>

      <section className="mt-12" aria-labelledby="formula-heading">
        <h2 id="formula-heading" className="text-2xl font-semibold tracking-tight text-ink">
          How the comparison works
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">Petrol side</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`UK:  litres = miles ÷ MPG (UK) × 4.54609
     cost = litres × (pence/litre ÷ 100)
US:  gallons = miles ÷ MPG (US)
     cost = gallons × dollars/gallon
EU/CH/AU: litres = km × (L/100 km) ÷ 100
          cost = litres × local currency/litre
JP/IN/KR: litres = km ÷ (km/L)
          cost = litres × local currency/litre`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              The same annual distance is used for both sides. The annual figure is not a
              lifetime cost and does not include servicing or repairs.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">EV side</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`UK/US: battery kWh = miles ÷ (mi/kWh)
EU/CH/AU/JP/IN/KR: battery kWh = km × (kWh/100 km) ÷ 100

grid kWh = battery kWh ÷ charging efficiency
cost = grid kWh × price per kWh`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              Charging efficiency accounts for energy lost between the meter and the battery.
              The EV efficiency input is battery-side; EPA MPGe-derived figures already include
              charging losses, so do not add them twice.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Annual difference = petrol annual cost − EV annual cost. A positive value means the EV
          is cheaper on the inputs provided. Break-even years = purchase-price difference ÷
          annual saving, shown only when both are positive.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Worked examples
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Illustrative prices, consumption and charging efficiency. Not current market data.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">UK example</p>
            <p className="mt-1 text-sm text-ink-soft">10,000 miles · 50 MPG UK · 145p/l · 3.5 mi/kWh · 25p/kWh</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(ukExample.annualDifference, "GBP")} saved
            </p>
            <p className="mt-1 text-xs text-muted">
              £{formatNumber(ukExample.annualPetrolCost, 0)} petrol vs £
              {formatNumber(ukExample.annualEvCost, 0)} EV · break-even{" "}
              {formatNumber(ukExample.breakEvenYears, 1)} years on a £5,000 gap
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">US example</p>
            <p className="mt-1 text-sm text-ink-soft">12,000 miles · 30 MPG US · $3.50/gal · 3.5 mi/kWh · 17¢/kWh</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(usExample.annualDifference, "USD")} saved
            </p>
            <p className="mt-1 text-xs text-muted">
              ${formatNumber(usExample.annualPetrolCost, 0)} gas vs ${formatNumber(usExample.annualEvCost, 0)} EV
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">EU example</p>
            <p className="mt-1 text-sm text-ink-soft">15,000 km · 6.5 L/100 km · €1.75/l · 17 kWh/100 km · €0.35/kWh</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(euExample.annualDifference, "EUR")} saved
            </p>
            <p className="mt-1 text-xs text-muted">
              €{formatNumber(euExample.annualPetrolCost, 0)} petrol vs €{formatNumber(euExample.annualEvCost, 0)} EV
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="exclusions-heading">
        <h2 id="exclusions-heading" className="text-2xl font-semibold tracking-tight text-ink">
          What is outside the headline
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Purchase price and finance",
              body: "A price gap can be entered to estimate a simple break-even, but interest, leasing, incentives, taxes and resale value are not modelled.",
            },
            {
              title: "Depreciation",
              body: "Depreciation is often the largest single ownership cost. It depends on model, age, mileage, condition and market, and is not predicted here.",
            },
            {
              title: "Insurance, maintenance and tyres",
              body: "EV and petrol costs differ by model and region. Tyre wear, servicing, repairs and insurance are excluded from the energy comparison.",
            },
            {
              title: "Charging hardware and access",
              body: "Home charger installation, subscriptions, parking and public-charging membership fees can materially change the EV side.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-surface p-4">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="when-heading">
        <h2 id="when-heading" className="text-2xl font-semibold tracking-tight text-ink">
          When an EV may not save money
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-6 text-ink-soft">
          <p>
            An EV can be more expensive to run on energy alone if public charging is expensive,
            the vehicle is inefficient, annual mileage is low, or the petrol comparison vehicle is
            very efficient and fuel is cheap. A high purchase premium also takes longer to recover.
          </p>
          <p>
            The opposite can be true with low-cost home charging and high annual mileage. The
            calculator is designed to show the inputs that drive the result rather than assert a
            universal winner.
          </p>
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
                question: "Is an EV cheaper than petrol?",
                answer: (
                  <>
                    Not automatically. It depends on the price of electricity, where you charge,
                    the efficiency of each vehicle, annual mileage and the petrol price. This
                    calculator shows both annual energy costs and the difference on your inputs.
                    It deliberately does not assume a winner.
                  </>
                ),
              },
              {
                question: "How do you calculate EV break-even?",
                answer: (
                  <>
                    Divide the EV&rsquo;s purchase-price premium by the annual running-cost
                    saving. If the EV costs £5,000 more and saves £500 a year on energy, the
                    simple energy-only break-even is 10 years. This ignores depreciation,
                    maintenance, financing and resale value.
                  </>
                ),
              },
              {
                question: "Should I include home charging losses?",
                answer: (
                  <>
                    Yes, if you want the cost of electricity purchased from the grid. The car
                    needs battery energy, but the meter supplies more because charging is not
                    100% efficient. The default of 90% is an example, not a universal value.
                  </>
                ),
              },
              {
                question: "Does this work for a plug-in hybrid?",
                answer: (
                  <>
                    Only as a rough energy comparison. A plug-in hybrid uses both electricity and
                    petrol, often at different rates depending on trip length and charge
                    behaviour. This calculator models one electric side and one petrol side, not a
                    blended PHEV duty cycle.
                  </>
                ),
              },
              {
                question: "Why are maintenance and insurance excluded?",
                answer: (
                  <>
                    They are ownership costs, not energy costs. Including them properly needs
                    model-specific, region-specific data and assumptions about servicing, repairs,
                    insurance and resale. Mixing them into an energy comparison would create a
                    false sense of precision.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Sources
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Context for prices and efficiency. Enter your own figures above; these sources are not
          live quotes.
        </p>
        <div className="mt-4">
          <SourceList
            sources={[
              {
                href: "https://www.fueleconomy.gov/feg/evtech.shtml",
                label: "fueleconomy.gov — EV efficiency and MPGe",
                note: "US EPA / Department of Energy background.",
              },
              {
                href: "https://www.eia.gov/electricity/",
                label: "US Energy Information Administration — electricity",
                note: "US electricity prices and data.",
              },
              {
                href: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
                label: "GOV.UK — weekly road fuel prices",
                note: "UK fuel price statistics.",
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
      </section>

      <section className="mt-12" aria-labelledby="related-heading">
        <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Related tools
        </h2>
        <div className="mt-4">
          <RelatedTools
            items={[
              {
                href: "/tools/ev-charging-cost",
                name: "EV charging cost calculator",
                description: "Work out the cost of a single charge with losses and fees.",
              },
              {
                href: "/tools/fuel-cost",
                name: "Trip fuel cost calculator",
                description: "Estimate a petrol or diesel journey in the units you use.",
              },
              {
                href: "/tools/fuel-efficiency-converter",
                name: "Fuel efficiency converter",
                description: "Convert the efficiency figures before comparing them.",
              },
              {
                href: "/guides/mpge-explained",
                name: "MPGe explained",
                description: "Understand the EPA equivalent before using it in a comparison.",
              },
            ]}
          />
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          Need the charging side on its own?{" "}
          <Link href="/tools/ev-charging-cost" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            Use the EV charging cost calculator
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
