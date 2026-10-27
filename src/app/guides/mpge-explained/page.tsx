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
import { convertEvEfficiency } from "@/lib/calculations";
import { formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "MPGe explained — mi/kWh and kWh/100 km",
  description:
    "What EPA MPGe means, how it relates to mi/kWh and kWh/100 miles, and why it already includes charging losses.",
  alternates: { canonical: "/guides/mpge-explained" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "MPGe explained",
    description:
      "The EPA gasoline-equivalent rating, the 33.7 kWh basis and the charging-loss trap.",
    url: "/guides/mpge-explained",
  },
};

const rows = [100, 120, 130, 150, 180];

export default function MpgeExplainedPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ href: "/guides", label: "Guides" }, { label: "MPGe explained" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { label: "MPGe explained" },
        ]}
      />
      <GuideArticleJsonLd
        slug="mpge-explained"
        title="MPGe explained — mi/kWh and kWh/100 km"
        description="What EPA MPGe means, how it relates to mi/kWh and kWh/100 miles, and why it already includes charging losses."
        abstract="MPGe is the US EPA's gasoline-equivalent efficiency rating for electric vehicles. It already includes charging losses, so do not add them twice."
        section="EV units"
        published="2026-10-27"
        updated="2026-10-27"
        citations={[
          "https://www.epa.gov/greenvehicles/fuel-economy-and-ev-range-testing",
          "https://www.fueleconomy.gov/feg/label/learn-more-electric-label.shtml",
          "https://www.fueleconomy.gov/feg/pdfs/EPA%20test%20procedure%20for%20EVs-PHEVs-11-14-2017.pdf",
        ]}
      />

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          EV units
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          MPGe explained
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          MPGe means miles per gallon of gasoline-equivalent. It is the US EPA&rsquo;s way of
          putting electric vehicles on the same label scale as petrol cars. It is not a liquid-fuel
          measurement, and it is not the same as the mi/kWh figure shown on the car&rsquo;s energy
          display.
        </p>

        <div className="mt-6 rounded-xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold text-ink">The key number: 33.7 kWh</p>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            The EPA uses 33.7 kWh as the energy equivalent of one US gallon of gasoline. A vehicle
            that travels 150 miles on 33.7 kWh has an MPGe of 150. The equivalent efficiency is
            about 4.45 miles per kWh.
          </p>
          <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`MPGe = mi/kWh × 33.7
mi/kWh = MPGe ÷ 33.7

150 MPGe ÷ 33.7 = 4.451 mi/kWh
100 ÷ 4.451 = 22.47 kWh/100 mi
22.47 ÷ 1.609344 = 13.96 kWh/100 km`}
          </pre>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          MPGe already includes charging losses
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            This is the part most comparisons miss. EPA&rsquo;s MPGe and kWh/100 miles are based
            on energy measured at the outlet, not energy delivered to the battery. The rating
            assumes Level 2 AC charging and accounts for losses in the charging cable and the
            vehicle&rsquo;s onboard charger. It is an outlet-to-wheel figure.
          </p>
          <p>
            A dashboard mi/kWh figure is usually battery-side: it describes how far the car went
            on energy that was already in the battery. If you take an EPA-derived mi/kWh and then
            add 10% charging loss again, you double-count the loss.
          </p>
        </div>

        <div className="mt-6">
          <Notice tone="warning" title="Do not mix the two bases">
            Use EPA MPGe or kWh/100 mi directly for a wall-to-wheel electricity cost. Use a
            battery-side mi/kWh figure only when you also add charging losses. Label the basis
            before comparing two numbers.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          MPGe to the units people actually use
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              MPGe conversions using 33.7 kWh per gasoline-equivalent gallon
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">MPGe</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">mi/kWh (outlet)</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">kWh/100 mi</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">kWh/100 km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => {
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

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          How to estimate cost from MPGe
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Convert MPGe to energy per mile, then multiply by the price of electricity. In the US:
          </p>
          <div className="rounded-lg border border-line bg-surface p-4">
            <pre className="formula text-ink-soft">
{`kWh per mile = 33.7 ÷ MPGe
cost per mile = (33.7 ÷ MPGe) × dollars per kWh

150 MPGe at $0.17/kWh:
33.7 ÷ 150 = 0.2247 kWh/mile
0.2247 × $0.17 = $0.0382/mile`}
            </pre>
          </div>
          <p>
            In the UK, use pence per kWh and divide by 100 to get pounds. In Europe, use kWh per
            100 km and euros per kWh directly.
          </p>
          <p>
            The result is an energy-cost estimate. It does not include charging subscriptions,
            parking, idle fees, home-charger installation, road tax, insurance or maintenance.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What MPGe does not tell you
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>It is not a real liquid-fuel consumption figure.</li>
          <li>It does not guarantee real-world range or efficiency.</li>
          <li>It does not include the cost of electricity; prices vary by tariff and location.</li>
          <li>It does not include cabin heating or cooling losses in extreme temperatures.</li>
          <li>It is a US regulatory label. A WLTP or other market figure uses a different test.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          MPGe vs MPG: why the ratio does not apply
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          You cannot convert MPGe to MPG using the UK/US gallon ratio. MPGe is an energy
          equivalence for electricity; MPG is a liquid-fuel economy. The two can be placed on a
          comparable energy basis, but they are not the same physical measurement. For cost, use
          the price of each energy carrier rather than the label number alone.
        </p>

        <div className="mt-8 rounded-xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold text-ink">Convert an EV efficiency figure</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            The converter handles MPGe, mi/kWh, kWh/100 mi and kWh/100 km, and labels the basis.
          </p>
          <Link
            href="/tools/fuel-efficiency-converter"
            className="mt-3 inline-flex rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Open the efficiency converter
          </Link>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Sources</h2>
        <div className="mt-3">
          <SourceList
            sources={[
              {
                href: "https://www.epa.gov/greenvehicles/fuel-economy-and-ev-range-testing",
                label: "US EPA — fuel economy and EV range testing",
                note: "Explains MPGe and that EPA values include charging losses.",
              },
              {
                href: "https://www.fueleconomy.gov/feg/label/learn-more-electric-label.shtml",
                label: "fueleconomy.gov — understanding the EV label",
                note: "How MPGe and kWh/100 miles appear on US labels.",
              },
              {
                href: "https://www.fueleconomy.gov/feg/pdfs/EPA%20test%20procedure%20for%20EVs-PHEVs-11-14-2017.pdf",
                label: "EPA — EV and PHEV test procedure",
                note: "Technical basis for recharge energy and the 33.705 kWh equivalence factor.",
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
                description: "Convert MPGe, mi/kWh, kWh/100 mi and kWh/100 km.",
              },
              {
                href: "/tools/ev-charging-cost",
                name: "EV charging cost calculator",
                description: "Price a charge with battery-side energy and charging losses.",
              },
              {
                href: "/tools/ev-vs-petrol-cost",
                name: "EV vs petrol cost",
                description: "Compare annual running costs without assuming a winner.",
              },
              {
                href: "/guides/uk-vs-us-mpg",
                name: "UK vs US MPG",
                description: "The separate liquid-fuel gallon problem.",
              },
            ]}
          />
        </div>
      </article>
    </div>
  );
}
