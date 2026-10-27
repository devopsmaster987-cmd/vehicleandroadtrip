import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { FaqList, LastReviewed, Notice } from "@/components/ui";
import { convertFuelEfficiency } from "@/lib/calculations";
import { formatNumber } from "@/lib/format";
import { articles } from "@/lib/articles";
import { guides, tools } from "@/lib/site";

const mpgUk = convertFuelEfficiency(40, "mpgUk");
const mpgUs = convertFuelEfficiency(40, "mpgUs");

const markets = [
  {
    name: "United Kingdom",
    units: "Miles, MPG (UK) and pence per litre",
    detail:
      "UK fuel is sold in litres but economy is usually quoted in imperial MPG. The calculators bridge that gap explicitly.",
  },
  {
    name: "United States",
    units: "Miles, MPG (US) and dollars per gallon",
    detail:
      "US gallons are smaller than imperial gallons. EV efficiency is also available as MPGe, mi/kWh and kWh/100 mi.",
  },
  {
    name: "Europe",
    units: "Kilometres, L/100 km and euros per litre",
    detail:
      "Euro-area defaults use kilometres, litres and litres per 100 km. Switch markets without silently reusing the wrong unit.",
  },
  {
    name: "Switzerland",
    units: "Kilometres, L/100 km and Swiss francs per litre",
    detail:
      "Swiss road distances and fuel economy use metric units, but fuel and charging prices are in CHF rather than EUR.",
  },
  {
    name: "Japan",
    units: "Kilometres, km/L and yen per litre",
    detail: "Japanese fuel economy is usually quoted in kilometres per litre.",
  },
  {
    name: "India",
    units: "Kilometres, km/L and rupees per litre",
    detail: "Indian road distances and fuel economy use kilometres and km/L.",
  },
  {
    name: "South Korea",
    units: "Kilometres, km/L and won per litre",
    detail: "South Korean road distances and fuel economy use kilometres and km/L.",
  },
  {
    name: "Australia",
    units: "Kilometres, L/100 km and Australian dollars per litre",
    detail: "Australian fuel economy uses litres per 100 kilometres.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Eight markets
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Know what a journey really costs.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
              Fuel, charging and efficiency calculators that make the unit system explicit —
              including the UK/US MPG trap. No signup, no live-price claims, and every formula
              is shown.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/fuel-cost"
                className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Calculate trip fuel cost
              </Link>
              <Link
                href="/tools/fuel-efficiency-converter"
                className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand/50 hover:text-brand"
              >
                Convert MPG and L/100 km
              </Link>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">
              Your inputs stay in your browser. Market prices and regulations are not hardcoded.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-paper/70 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              The same number, different gallons
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              &ldquo;40 MPG&rdquo; does not describe the same fuel consumption in the UK and
              the US.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-brand/25 bg-brand-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                  40 MPG UK
                </p>
                <p className="numeric mt-2 text-2xl font-semibold text-ink">
                  {formatNumber(mpgUk.l100km, 2)} L/100 km
                </p>
                <p className="mt-1 text-xs text-muted">imperial gallon = 4.54609 L</p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  40 MPG US
                </p>
                <p className="numeric mt-2 text-2xl font-semibold text-ink">
                  {formatNumber(mpgUs.l100km, 2)} L/100 km
                </p>
                <p className="mt-1 text-xs text-muted">US gallon = 3.785411784 L</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              The UK figure is about 20% higher in L/100 km. Using the wrong gallon changes the
              answer.
            </p>
            <Link
              href="/guides/uk-vs-us-mpg"
              className="mt-3 inline-flex text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
            >
              Read why UK and US MPG differ
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              The initial toolkit
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Five tools, built around real decisions
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Each calculator uses tested formulas, explicit units and sensible inputs. They are
              deliberately not one page per keyword.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
          >
            View all tools
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Built for eight markets
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            One set of tools, eight sets of conventions
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {markets.map((market) => (
              <div key={market.name} className="rounded-xl border border-line bg-paper/50 p-5">
                <h3 className="text-base font-semibold text-ink">{market.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand">
                  {market.units}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{market.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Notice tone="warning" title="Prices are not live">
              Fuel and electricity prices change by region, grade and tariff. These tools ask
              you for the price you actually pay. They do not publish a national price or claim
              real-time coverage.
            </Notice>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            What is different
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Transparent by default
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            These are the differences we can defend without unverified market data.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Unit system stated",
              body: "UK MPG, US MPG and L/100 km are never treated as interchangeable. Each conversion says which gallon it uses.",
            },
            {
              title: "Formula shown",
              body: "The calculation is visible below each tool and covered by automated tests, including zero and boundary cases.",
            },
            {
              title: "No signup or data trail",
              body: "Calculations run in the browser. We do not send journey details or price inputs to an analytics service.",
            },
            {
              title: "Changing data kept out",
              body: "No invented prices, tolls, vignettes or tax rates. Time-sensitive pages will only be added after official verification.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-surface p-4">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Guides
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Understand the number, not just the output
              </h2>
              <Link
                href="/guides"
                className="text-sm font-semibold text-brand hover:underline"
              >
                All {guides.length + articles.length} guides →
              </Link>
            </div>
            <div className="mt-6 space-y-3">
              {guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block rounded-lg border border-line bg-paper/50 p-4 transition hover:border-brand/35"
                >
                  <p className="text-sm font-semibold text-ink group-hover:text-brand">
                    {guide.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Common questions
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Direct answers
            </h2>
            <div className="mt-6">
              <FaqList
                items={[
                  {
                    question: "Is 40 MPG good?",
                    answer: (
                      <>
                        It depends on the gallon. In the UK, 40 MPG is about 7.06 L/100 km. In
                        the US, 40 MPG is about 5.88 L/100 km. That is a meaningful difference,
                        so a published MPG figure needs its system stated. Vehicle size, fuel
                        type and driving conditions matter just as much as the number.
                      </>
                    ),
                  },
                  {
                    question: "Why do UK and US MPG differ?",
                    answer: (
                      <>
                        An imperial gallon is 4.54609 litres and a US gallon is 3.785411784
                        litres. A mile is the same, so the same car returns a different MPG
                        number on each side of the Atlantic. The ratio is about 1.20095.
                      </>
                    ),
                  },
                  {
                    question: "Does this site use live fuel prices?",
                    answer: (
                      <>
                        No. Fuel and electricity prices are user inputs. Live national or local
                        prices require a real, maintained data source; we do not simulate one.
                      </>
                    ),
                  },
                  {
                    question: "Are the calculations a guarantee of cost?",
                    answer: (
                      <>
                        No. They are estimates based on the inputs you provide. Real consumption
                        varies with driving style, weather, load, tyre pressure and route.
                        Petrol-versus-EV comparisons exclude maintenance, insurance, tax and
                        depreciation unless you add a price gap yourself.
                      </>
                    ),
                  },
                ]}
              />
            </div>
            <div className="mt-5">
              <LastReviewed />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Roadmap, not filler
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            Vignettes, tolls and tax pages are being held back
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            Those topics need dated, official figures and a maintenance schedule. Publishing a
            price without verification would be worse than publishing nothing. The calculators
            that are live rely on your inputs and tested unit conversions.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/methodology"
              className="text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
            >
              Read the methodology and deferred-work list
            </Link>
            <Link
              href="/corrections"
              className="text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
            >
              See the corrections log
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
