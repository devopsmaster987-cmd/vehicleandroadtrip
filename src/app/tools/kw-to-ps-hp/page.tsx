import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { CalculatorJsonLd } from "@/components/calculator-jsonld";
import { PowerCalculator } from "@/components/calculators/power-calculator";
import {
  Breadcrumbs,
  FaqList,
  LastReviewed,
  Notice,
  RelatedTools,
  SourceList,
} from "@/components/ui";
import { convertPower } from "@/lib/calculations";
import { formatNumber } from "@/lib/format";
import { getToolFaqs } from "@/lib/tool-faqs";

export const metadata: Metadata = {
  title: "kW to PS and hp converter — all six directions",
  description:
    "Convert kW to PS, kW to hp, PS to kW, hp to kW, PS to hp and hp to PS. Includes formulas, a reference table and the PS vs hp difference.",
  alternates: { canonical: "/tools/kw-to-ps-hp" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "kW to PS and hp converter",
    description:
      "Convert kilowatts, metric horsepower and mechanical horsepower without mixing the units.",
    url: "/tools/kw-to-ps-hp",
  },
};

const tableRows = [75, 100, 110, 120, 150, 200, 300];

export default function PowerConverterPage() {
  const hundredKw = convertPower(100, "kw");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ href: "/tools", label: "Tools" }, { label: "kW to PS and hp" }]} />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/tools", label: "Tools" },
          { label: "kW to PS and hp" },
        ]}
      />
      <CalculatorJsonLd
        name="kW to PS and hp converter"
        description="Convert kilowatts, metric horsepower and mechanical horsepower in every direction."
        path="/tools/kw-to-ps-hp"
        faqs={getToolFaqs("/tools/kw-to-ps-hp")}
      />

      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Power conversion
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          kW to PS and hp converter
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Convert kilowatts to metric horsepower (PS), mechanical horsepower (hp) or brake
          horsepower (bhp), and convert back in every direction. The converter shows the factor
          used and the difference between the horsepower systems.
        </p>
        <p className="mt-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm leading-6 text-ink-soft">
          <strong>Quick answer:</strong> 100 kW ={" "}
          <strong>{formatNumber(hundredKw.ps, 2)} PS</strong> ={" "}
          <strong>{formatNumber(hundredKw.hp, 2)} hp</strong>. 150 PS ={" "}
          <strong>{formatNumber(convertPower(150, "ps").kw, 2)} kW</strong>.
        </p>
      </div>

      <div className="mt-7">
        <Notice tone="warning" title="PS and hp are not interchangeable labels">
          Metric horsepower (PS) and mechanical horsepower (hp) differ by about 1.4%. A car quoted
          at 150 PS is not exactly 150 hp. Using the wrong factor produces a small but real error.
        </Notice>
      </div>

      <section className="mt-10" aria-labelledby="calculator-heading">
        <h2 id="calculator-heading" className="mb-5 text-2xl font-semibold tracking-tight text-ink">
          Convert vehicle power
        </h2>
        <PowerCalculator />
      </section>

      <section className="mt-12" aria-labelledby="formula-heading">
        <h2 id="formula-heading" className="text-2xl font-semibold tracking-tight text-ink">
          The formulas
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">From kilowatts</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`PS = kW ÷ 0.73549875
hp = kW ÷ 0.7456998716
bhp = hp (mechanical hp factor)

Example: 100 kW
PS = 100 ÷ 0.73549875 = 135.96 PS
hp = 100 ÷ 0.7456998716 = 134.10 hp`}
            </pre>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-base font-semibold text-ink">To kilowatts</h3>
            <pre className="formula mt-3 rounded-lg bg-paper p-4 text-ink-soft">
{`kW = PS × 0.73549875
kW = hp × 0.7456998716
kW = bhp × 0.7456998716

Example: 150 PS
kW = 150 × 0.73549875 = 110.32 kW`}
            </pre>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          These are unit conversions, not dyno measurements. Manufacturer figures can also differ
          by test standard, rounding, ancillaries and whether the rating is at the crank or at the
          wheels.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="table-heading">
        <h2 id="table-heading" className="text-2xl font-semibold tracking-tight text-ink">
          Reference table
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Rounded to two decimal places. The same tested function produces the table and the
          calculator.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[30rem] border-collapse text-sm">
            <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
              Kilowatts to metric and mechanical horsepower
            </caption>
            <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">kW</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">PS (metric hp)</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">hp (mechanical)</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">bhp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tableRows.map((row) => {
                const result = convertPower(row, "kw");
                return (
                  <tr key={row}>
                    <th scope="row" className="px-4 py-2.5 font-medium text-ink">{row}</th>
                    <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.ps, 2)}</td>
                    <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.hp, 2)}</td>
                    <td className="numeric px-4 py-2.5 text-ink-soft">{formatNumber(result.bhp, 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="pshp-heading">
        <h2 id="pshp-heading" className="text-2xl font-semibold tracking-tight text-ink">
          PS, hp and bhp: what is the difference?
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-4">
            <h3 className="text-sm font-semibold text-ink">PS — metric horsepower</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted">
              Pferdestärke, also written as metric horsepower or cv/ch in some markets. One PS is
              735.49875 watts.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <h3 className="text-sm font-semibold text-ink">hp — mechanical horsepower</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted">
              The imperial horsepower used in the US and in many English-language contexts. One
              mechanical horsepower is 745.6998716 watts.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <h3 className="text-sm font-semibold text-ink">bhp — brake horsepower</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted">
              Brake horsepower describes where and how output is measured (at a brake or
              dynamometer). It is not a separate arithmetic unit here, so this converter applies
              the mechanical hp factor. A source may still use a different test standard.
            </p>
          </div>
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
                question: "How many hp is 100 kW?",
                answer: (
                  <>
                    100 kW is about 134.10 mechanical horsepower and about 135.96 metric
                    horsepower (PS). The difference comes from the two horsepower definitions.
                  </>
                ),
              },
              {
                question: "How many kW is 150 hp?",
                answer: (
                  <>
                    150 mechanical horsepower is about 111.85 kW. If the figure is 150 PS
                    instead, it is about 110.32 kW. Check which unit the source used.
                  </>
                ),
              },
              {
                question: "Is PS the same as hp?",
                answer: (
                  <>
                    No. One PS is 735.49875 W; one mechanical hp is 745.6998716 W. The ratio is
                    about 0.9863 hp per PS. They are close enough to look similar but not close
                    enough to treat as identical.
                  </>
                ),
              },
              {
                question: "How many kW is 300 bhp?",
                answer: (
                  <>
                    Using the mechanical horsepower factor used here, 300 bhp is about 223.71 kW.
                    If the original figure was 300 PS, the result would be about 220.65 kW.
                  </>
                ),
              },
              {
                question: "Why does a manufacturer quote a different figure?",
                answer: (
                  <>
                    Unit conversion is only one source of difference. Test standards, rounding,
                    engine ancillaries, ambient conditions, fuel and whether power is measured at
                    the crank or the wheels can all change a published number. This tool does not
                    correct for those standards.
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
        <div className="mt-4">
          <SourceList
            sources={[
              {
                href: "https://www.nist.gov/pml/special-publication-811",
                label: "NIST — Guide for the Use of the International System of Units (SP 811)",
                note: "Reference for SI units and conversion practice.",
              },
              {
                href: "https://www.nist.gov/pml/owm/metric-si/unit-conversion",
                label: "NIST — unit conversion",
                note: "Reference for unit relationships.",
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
                description: "Convert L/100 km, MPG UK, MPG US, MPGe and mi/kWh.",
              },
              {
                href: "/tools/ev-vs-petrol-cost",
                name: "EV vs petrol cost",
                description: "Compare annual running costs, including charging efficiency.",
              },
              {
                href: "/tools/fuel-cost",
                name: "Trip fuel cost calculator",
                description: "Estimate the fuel cost of a journey in your market's units.",
              },
            ]}
          />
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          Looking for fuel economy rather than engine power?{" "}
          <Link href="/tools/fuel-efficiency-converter" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            Open the efficiency converter
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
