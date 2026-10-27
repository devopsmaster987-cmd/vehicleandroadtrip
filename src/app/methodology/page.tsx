import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LastReviewed, SourceList } from "@/components/ui";

export const metadata: Metadata = {
  title: "Methodology and research status",
  description:
    "The formulas, constants, test approach, unit policy and deferred-work list behind RoadCost, including the status of keyword research.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Methodology and research status",
    description:
      "The formulas, constants, test approach, unit policy and deferred-work list behind RoadCost, including the status of keyword research.",
    url: "/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Methodology" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Transparency
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Methodology and research status
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          This page documents what the calculators do, how the formulas are tested, which
          constants are used, and what has deliberately not been published yet.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Formula library and constants
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          All calculations live in{" "}
          <code className="rounded bg-surface px-1 py-0.5 text-xs">src/lib/calculations.ts</code>.
          The main constants are:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              Constants used by the calculators
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Constant</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Value</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ["Imperial gallon", "4.54609 L", "UK MPG and UK fuel cost"],
                ["US gallon", "3.785411784 L", "US MPG and US fuel cost"],
                ["Mile", "1.609344 km", "Distance conversion"],
                ["MPG UK factor", "282.480936", "L/100 km ↔ MPG UK"],
                ["MPG US factor", "235.214583", "L/100 km ↔ MPG US"],
                ["Mechanical horsepower", "745.6998716 W", "hp and bhp conversions"],
                ["Metric horsepower", "735.49875 W", "PS conversions"],
                ["Gasoline-equivalent energy", "33.7 kWh/US gal", "MPGe conversions"],
              ].map((row) => (
                <tr key={row[0]}>
                  <th scope="row" className="px-4 py-2.5 font-medium text-ink">{row[0]}</th>
                  <td className="numeric px-4 py-2.5 text-ink-soft">{row[1]}</td>
                  <td className="px-4 py-2.5 text-ink-soft">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">
          The MPG factors are derived from the gallon and mile definitions rather than stored as
          unexplained magic numbers. The 33.7 kWh figure follows the EPA gasoline-equivalent basis;
          EPA MPGe includes charging losses. See the{" "}
          <Link href="/guides/mpge-explained" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            MPGe guide
          </Link>
          .
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Verification approach
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Each conversion has an independent test with a known expected value. Tests also cover
            zero, negative, missing and boundary inputs, and the four market paths (UK, US, EU, CH).
            The current suite has 40 tests. It runs with <code className="rounded bg-surface px-1 py-0.5 text-xs">npm test</code>.
          </p>
          <p>
            A test passing means the code matches the documented formula. It does not validate a
            user&rsquo;s fuel price, a vehicle&rsquo;s real-world consumption, a tariff or a
            regulation.
          </p>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[38rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              Formula verification log (initial release)
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Formula</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Test</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ["L/100 km → MPG UK", "5 L/100 km → 56.50 MPG UK", "Passing"],
                ["L/100 km → MPG US", "5 L/100 km → 47.04 MPG US", "Passing"],
                ["UK fuel cost", "100 mi, 50 MPG UK, 145p/l → £13.18", "Passing"],
                ["US fuel cost", "300 mi, 30 MPG US, $3.50/gal → $35.00", "Passing"],
                ["EU fuel cost", "500 km, 6.5 L/100 km, €1.75/l → €56.88", "Passing"],
                ["CH fuel cost", "500 km, 6.5 L/100 km, CHF 1.75/l → CHF 56.88", "Passing"],
                ["EV charging", "45 kWh battery, 90% efficiency, 25p/kWh → £12.50", "Passing"],
                ["EV vs petrol", "10,000 mi, 50 MPG UK vs 3.5 mi/kWh → annual difference", "Passing"],
                ["kW ↔ PS ↔ hp", "100 kW → 135.96 PS / 134.10 hp", "Passing"],
                ["Zero input handling", "0 L/100 km → infinite MPG", "Passing"],
                ["Invalid input handling", "Negative and zero denominators rejected or flagged", "Passing"],
              ].map((row) => (
                <tr key={row[0]}>
                  <th scope="row" className="px-4 py-2.5 font-medium text-ink">{row[0]}</th>
                  <td className="px-4 py-2.5 text-ink-soft">{row[1]}</td>
                  <td className="px-4 py-2.5 text-ink-soft">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Unit policy
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>UK defaults: miles, MPG UK, pence per litre, GBP.</li>
          <li>US defaults: miles, MPG US, dollars per US gallon, USD.</li>
          <li>Europe defaults: kilometres, L/100 km, euros per litre, EUR.</li>
          <li>Switzerland defaults: kilometres, L/100 km, Swiss francs per litre, CHF.</li>
          <li>MPG is never shown without its system when the system matters.</li>
          <li>MPGe is identified as an EPA energy-equivalence rating, not liquid-fuel MPG.</li>
          <li>PS, hp and bhp are identified separately; bhp is treated as mechanical hp with a caveat.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Data policy
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Fuel prices, electricity prices and vehicle efficiency are inputs. The site does not
            publish a national price, a live station price, a vignette price, a toll price or a tax
            rate in this build. This avoids presenting stale or invented data as current.
          </p>
          <p>
            If a time-sensitive page is added later, it must state the jurisdiction, vehicle
            category, effective date, official source URL, date checked and known caveats. It must
            also have a maintenance owner and update trigger.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Deferred work
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            The following candidates were not published because they depend on official data or
            verification that is not in place:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Austria, Switzerland and Slovenia vignette price/validity pages.</li>
            <li>UK VED, MOT, ULEZ, LEZ, Congestion Charge, Dartford and M6 Toll pages.</li>
            <li>US toll, turnpike and state EV registration-fee pages.</li>
            <li>IRS standard mileage rate and HMRC approved mileage-rate pages.</li>
            <li>EV charging-time, home-charger installation and tariff-comparison tools.</li>
            <li>Depreciation, financing, insurance and total-cost-of-ownership models.</li>
            <li>Country-specific translated pages and local-language keyword clusters.</li>
            <li>Programmatic number-specific URLs. Numeric examples are handled inside the converters.</li>
          </ul>
          <p>
            Each requires a source record, a last-verified date, a maintenance process and, for
            regulatory pages, a clear separation between official requirements and estimates.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Maintenance
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          On any formula change: update the library, update the tests, update the formula text and
          the verification log, then record the change in the{" "}
          <Link href="/corrections" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            corrections log
          </Link>
          . Do not change a date without checking the page. Do not add a year-specific page unless
          the information genuinely differs by year.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Primary references
        </h2>
        <div className="mt-3">
          <SourceList
            sources={[
              {
                href: "https://www.nist.gov/pml/owm/metric-si/unit-conversion",
                label: "NIST — unit conversion",
                note: "US customary and metric relationships.",
              },
              {
                href: "https://www.epa.gov/greenvehicles/fuel-economy-and-ev-range-testing",
                label: "US EPA — fuel economy and EV range testing",
                note: "MPGe basis and charging-loss treatment.",
              },
              {
                href: "https://www.fueleconomy.gov/feg/",
                label: "fueleconomy.gov",
                note: "US EPA / Department of Energy fuel-economy labels.",
              },
              {
                href: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
                label: "GOV.UK — weekly road fuel prices",
                note: "UK fuel price statistics.",
              },
            ]}
          />
        </div>
        <div className="mt-4">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
