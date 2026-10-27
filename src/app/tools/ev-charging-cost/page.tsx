import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { CalculatorJsonLd } from "@/components/calculator-jsonld";
import { EvChargingCalculator } from "@/components/calculators/ev-charging-calculator";
import {
  Breadcrumbs,
  FaqList,
  LastReviewed,
  Notice,
  RelatedTools,
  SourceList,
} from "@/components/ui";
import { calculateEvChargingCost } from "@/lib/calculations";
import { formatMoney, formatNumber } from "@/lib/format";
import { getToolFaqs } from "@/lib/tool-faqs";

export const metadata: Metadata = {
  title: "EV charging cost calculator — 8 markets",
  description:
    "Calculate the cost to charge an electric car from energy added or battery percentage, price per kWh, charging efficiency and optional session fees.",
  alternates: { canonical: "/tools/ev-charging-cost" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
  title: "EV charging cost calculator — 8 markets",
    description:
      "Home or public charging cost with explicit local currencies per kWh and charging losses.",
    url: "/tools/ev-charging-cost",
  },
};

const ukExample = calculateEvChargingCost({
  market: "uk",
  mode: "battery",
  batteryCapacityKwh: 75,
  startSoc: 20,
  endSoc: 80,
  pricePerKwh: 25,
  efficiencyPct: 90,
  sessionFee: 0,
  consumptionValue: 3.5,
});
const usExample = calculateEvChargingCost({
  market: "us",
  mode: "energy",
  energyAddedKwh: 40,
  pricePerKwh: 17,
  efficiencyPct: 90,
  sessionFee: 2,
  consumptionValue: 3.5,
});
const euExample = calculateEvChargingCost({
  market: "eu",
  mode: "battery",
  batteryCapacityKwh: 50,
  startSoc: 10,
  endSoc: 60,
  pricePerKwh: 0.35,
  efficiencyPct: 88,
  consumptionValue: 17,
});

export default function EvChargingCostPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ href: "/tools", label: "Tools" }, { label: "EV charging cost" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/tools", label: "Tools" },
          { label: "EV charging cost" },
        ]}
      />
      <CalculatorJsonLd
        name="EV charging cost calculator"
        description="Estimate electric vehicle charging cost including charging losses and session fees."
        path="/tools/ev-charging-cost"
        faqs={getToolFaqs("/tools/ev-charging-cost")}
      />

      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Electric vehicles
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          EV charging cost calculator
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Work out the cost of a charge from the energy added, the price per kWh and charging
          efficiency. Add a fixed session fee if your public charger charges one. The estimate
          works in pence, cents, euros, Swiss francs, yen, rupees, won or Australian dollars
          per kWh.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          The key distinction: energy added to the battery is not the same as energy purchased
          from the grid. Charging losses are included explicitly.
        </p>
      </div>

      <div className="mt-7">
        <Notice tone="warning" title="Use your own tariff">
          There is no single national electricity price, and public charging prices vary by
          network, speed, membership and time. This page does not publish a current tariff.
        </Notice>
      </div>

      <section className="mt-10" aria-labelledby="calculator-heading">
        <h2 id="calculator-heading" className="mb-5 text-2xl font-semibold tracking-tight text-ink">
          Calculate a charge
        </h2>
        <EvChargingCalculator />
      </section>

      <section className="mt-12" aria-labelledby="formula-heading">
        <h2 id="formula-heading" className="text-2xl font-semibold tracking-tight text-ink">
          The formula
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">From energy added</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`grid energy = battery energy ÷ efficiency
electricity cost = grid energy × price per kWh
total cost = electricity cost + session fee`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              Efficiency is entered as a percentage. At 90%, 45 kWh added to the battery requires
              50 kWh from the grid.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">From battery percentage</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`battery energy = capacity × (end SOC − start SOC) ÷ 100
grid energy = battery energy ÷ efficiency`}
            </pre>
            <p className="mt-3 text-sm leading-6 text-muted">
              Usable battery capacity is the relevant figure. A 75 kWh pack charged from 20% to
              80% adds 45 kWh before losses.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Cost per mile or per 100 km is calculated only when you provide vehicle efficiency. It
          uses the battery energy and the all-in cost, so a session fee is spread across the
          estimated range from that charge.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Worked examples
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Illustrative energy prices and efficiencies, not current tariffs.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">UK home-style</p>
            <p className="mt-1 text-sm text-ink-soft">75 kWh · 20→80% · 25p/kWh · 90%</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(ukExample.totalCost, "GBP")}
            </p>
            <p className="mt-1 text-xs text-muted">
              {formatNumber(ukExample.gridEnergyKwh, 2)} kWh from grid ·{" "}
              {formatMoney(ukExample.costPerMile, "GBP", 3)}/mile
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">US public-style</p>
            <p className="mt-1 text-sm text-ink-soft">40 kWh · 17¢/kWh · 90% · $2 fee</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(usExample.totalCost, "USD")}
            </p>
            <p className="mt-1 text-xs text-muted">
              {formatNumber(usExample.gridEnergyKwh, 2)} kWh from grid ·{" "}
              {formatMoney(usExample.costPerMile, "USD", 3)}/mile
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">EU example</p>
            <p className="mt-1 text-sm text-ink-soft">50 kWh · 10→60% · €0.35/kWh · 88%</p>
            <p className="numeric mt-3 text-2xl font-semibold text-ink">
              {formatMoney(euExample.totalCost, "EUR")}
            </p>
            <p className="mt-1 text-xs text-muted">
              {formatNumber(euExample.gridEnergyKwh, 2)} kWh from grid ·{" "}
              {formatMoney(euExample.costPer100Km, "EUR")}/100 km
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="losses-heading">
        <h2 id="losses-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Home, public and lost energy
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Home charging",
              body: "A domestic tariff normally has a unit rate and may have a standing charge, time-of-use bands and taxes. This calculator uses only the unit rate you enter; it does not add standing charges.",
            },
            {
              title: "Public charging",
              body: "Networks may bill per kWh, per minute, by session, by membership or by a combination. Only a fixed session fee and a per-kWh price are modelled. Idle and parking fees are excluded.",
            },
            {
              title: "AC and DC losses",
              body: "Some energy is lost in the onboard charger, cable, conversion and battery thermal management. The real figure varies with equipment, temperature, state of charge and charging speed.",
            },
            {
              title: "What is not included",
              body: "Installation of a home charger, hardware, subscription fees, road tax, insurance, maintenance and depreciation are ownership costs, not charging costs. They are not part of this estimate.",
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
                question: "How much does it cost to charge an EV at home?",
                answer: (
                  <>
                    Multiply the grid energy needed by your domestic unit rate, then add any
                    fixed charges you want to include. There is no universal answer: the battery
                    size, amount charged, efficiency and tariff all matter. Enter your own pence,
                    cents, euros or Swiss francs per kWh above.
                  </>
                ),
              },
              {
                question: "How much does it cost to charge a Tesla at home?",
                answer: (
                  <>
                    The same formula applies to any EV. Use the usable capacity of the specific
                    model and the percentage you need to add. This site does not publish
                    brand-specific battery sizes or tariffs because they vary by model, market and
                    model year.
                  </>
                ),
              },
              {
                question: "Is it cheaper to charge at home or in public?",
                answer: (
                  <>
                    Often, but not always. Compare the all-in home tariff with the public
                    charger&rsquo;s per-kWh price, session fee, parking cost and membership. A
                    low headline public rate can be worse once fees are included, and a home
                    tariff can have time-of-use bands.
                  </>
                ),
              },
              {
                question: "How long does it take to charge an EV?",
                answer: (
                  <>
                    Charging time is approximately energy needed divided by average charging
                    power, with losses and tapering. This page calculates cost, not time.
                    Charger power, the vehicle&rsquo;s acceptance rate and the charging curve all
                    affect duration.
                  </>
                ),
              },
              {
                question: "Why is grid energy higher than battery energy?",
                answer: (
                  <>
                    Charging is not perfectly efficient. The difference is the energy lost as
                    heat and overhead during the charge. At 90% efficiency, 50 kWh from the grid
                    delivers about 45 kWh to the battery.
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
          Use these for tariff context and efficiency background, not as a live price for your
          charger.
        </p>
        <div className="mt-4">
          <SourceList
            sources={[
              {
                href: "https://www.ofgem.gov.uk/energy-price-cap",
                label: "Ofgem — energy price cap",
                note: "UK regulator; explains the cap and unit-rate context.",
              },
              {
                href: "https://www.eia.gov/electricity/",
                label: "US Energy Information Administration — electricity",
                note: "US electricity data and average retail prices.",
              },
              {
                href: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Electricity_price_statistics",
                label: "Eurostat — electricity price statistics",
                note: "European household and non-household electricity prices.",
              },
              {
                href: "https://www.fueleconomy.gov/feg/evtech.shtml",
                label: "fueleconomy.gov — EV technology and efficiency",
                note: "US EPA / Department of Energy background.",
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
                href: "/tools/ev-vs-petrol-cost",
                name: "EV vs petrol cost calculator",
                description: "Compare annual running costs with the same distance basis.",
              },
              {
                href: "/tools/fuel-cost",
                name: "Trip fuel cost calculator",
                description: "Estimate a petrol or diesel journey in UK, US or European units.",
              },
              {
                href: "/tools/fuel-efficiency-converter",
                name: "Fuel efficiency converter",
                description: "Convert MPGe, mi/kWh and kWh/100 km without confusing the units.",
              },
              {
                href: "/guides/mpge-explained",
                name: "MPGe explained",
                description: "What the EPA equivalent does and does not tell you.",
              },
            ]}
          />
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          Want the wider comparison?{" "}
          <Link href="/tools/ev-vs-petrol-cost" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            Compare EV and petrol running costs
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
