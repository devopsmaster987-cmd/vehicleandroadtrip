import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LastReviewed, Notice } from "@/components/ui";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important limits on RoadCost's estimates, including fuel, EV, charging, unit and regulatory information.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Disclaimer",
    description:
      "Important limits on RoadCost's estimates, including fuel, EV, charging, unit and regulatory information.",
    url: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Limits</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Disclaimer
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          RoadCost is a reference and estimation tool. It is not an official source, a quote, a
          contract, a vehicle specification or professional advice. Read the limits below before
          relying on a result.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Fuel and electricity results
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Fuel and electricity costs depend on the price you enter and on real-world consumption.
          The site does not provide live station prices, local tariff comparisons or a guarantee
          that a price is current. Driving style, speed, weather, load, tyre pressure, air
          conditioning, traffic and route can change consumption substantially.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          EV results
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Charging costs depend on the tariff, session fees, membership, parking, idle fees and
            charging losses. The calculator models only the inputs shown. Battery capacity,
            usable capacity, charging curve and temperature can change the real result.
          </p>
          <p>
            The EV-versus-petrol comparison is a running-energy comparison. It excludes purchase
            price unless you enter a difference, and it does not model depreciation, financing,
            insurance, maintenance, tyres, road tax, charger installation or resale value. It does
            not claim that an EV is always cheaper.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Unit conversions
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Unit conversions use documented constants. MPG depends on the gallon system. MPGe is an
          EPA energy-equivalence rating and already includes charging losses. PS, hp and bhp are not
          interchangeable labels. A conversion does not correct for different test standards,
          rounding, ancillaries or measurement location.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Regulatory, tax and toll information
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          This build does not publish vignette, toll, road-tax or inspection prices as current
          facts. Those areas are deferred until official figures can be verified and maintained.
          If such pages are added later, the official authority&rsquo;s rules take precedence over
          any summary or estimate on this site.
        </p>

        <div className="mt-6">
          <Notice tone="warning" title="No affiliation">
            RoadCost is not affiliated with any government, vehicle manufacturer, charging network,
            fuel retailer, toll authority or insurer. A link to an official source does not imply
            endorsement, partnership or verification by that organisation.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          No warranty
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          The site and its calculations are provided without warranties of accuracy,
          completeness, fitness for a particular purpose or availability, to the extent permitted
          by law. You are responsible for checking a result before making a financial, travel,
          legal or safety decision.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Report an error
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          If you find an error, use the{" "}
          <Link href="/contact" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            contact page
          </Link>{" "}
          and include an official source. Accepted corrections are recorded in the{" "}
          <Link href="/corrections" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            corrections log
          </Link>
          .
        </p>

        <div className="mt-6">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
