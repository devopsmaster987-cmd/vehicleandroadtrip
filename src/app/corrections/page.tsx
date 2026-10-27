import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LastReviewed } from "@/components/ui";

export const metadata: Metadata = {
  title: "Corrections log",
  description:
    "A dated log of corrections to RoadCost's calculators, formulas and content.",
  alternates: { canonical: "/corrections" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Corrections log",
    description:
      "A dated log of corrections to RoadCost's calculators, formulas and content.",
    url: "/corrections",
  },
};

const corrections = [
  {
    date: "2026-10-27",
    page: "Initial release",
    change:
      "Initial calculator suite published. Formulas and constants documented; automated tests added. No external market prices, vignette prices, tolls or tax rates are published in this build.",
    source: "Internal formula verification; NIST and EPA references linked on the methodology page.",
  },
];

export default function CorrectionsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Corrections" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Accountability
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Corrections log
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Factual corrections and formula changes are recorded here. The log is intentionally
          short: the site does not publish time-sensitive prices or regulations until they can be
          verified and maintained.
        </p>

        <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              Corrections and material changes
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Date</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Page</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Change</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {corrections.map((entry) => (
                <tr key={`${entry.date}-${entry.page}`}>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
                    <time dateTime={entry.date}>{entry.date}</time>
                  </td>
                  <th scope="row" className="px-4 py-3 font-medium text-ink">{entry.page}</th>
                  <td className="px-4 py-3 text-ink-soft">{entry.change}</td>
                  <td className="px-4 py-3 text-ink-soft">{entry.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          How to report a correction
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Include the page URL and the exact figure or statement.</li>
          <li>Explain what you believe is wrong and what the correct version is.</li>
          <li>Link the official source and, for a changing rule, its effective date.</li>
          <li>Do not send sensitive personal information.</li>
        </ol>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Use the <Link href="/contact" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">contact page</Link>.
          If a correction is accepted, the page and this log will be updated. If a source cannot be
          verified, the claim will be removed or marked unverified rather than presented as fact.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What is not logged here
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Typos, layout changes and internal refactors that do not change a result are not
          necessarily logged. A change to a formula, constant, source interpretation, unit label or
          published factual statement is logged.
        </p>

        <div className="mt-6">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
