import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LastReviewed, Notice } from "@/components/ui";

export const metadata: Metadata = {
  title: "Editorial policy",
  description:
    "How RoadCost selects topics, sources claims, verifies formulas, handles corrections and separates estimates from official rules.",
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Editorial policy",
    description:
      "How RoadCost selects topics, sources claims, verifies formulas, handles corrections and separates estimates from official rules.",
    url: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Editorial policy" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Standards
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Editorial policy
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          This policy describes the standards used for RoadCost&rsquo;s calculators, guides and
          trust pages. It is deliberately narrower than a general newsroom policy: this site
          publishes calculations and explanatory content, not current affairs or product reviews.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Topic selection
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            A page must address a distinct user need. Calculator, converter, online, free, spelling
            and formatting variants are treated as one intent unless there is evidence that they
            require genuinely different information. We do not create a page per number, year,
            country name or keyword permutation.
          </p>
          <p>
            Changing rules and prices are held back until they can be verified against an official
            source and maintained. A useful calculator with transparent inputs is preferable to a
            page that presents an invented &ldquo;current&rdquo; price.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Sourcing
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Unit definitions and constants come from standards bodies or official definitions.</li>
          <li>Fuel-economy labels and MPGe context come from EPA / fueleconomy.gov sources.</li>
          <li>Price context, where cited, comes from official statistical or regulatory sources.</li>
          <li>Where a source is not official, it is described as context rather than authority.</li>
          <li>We do not invent search volumes, competition scores, reviews, quotes or regulations.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Calculations and verification
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Formulas live in a central calculation library. The site shows the formula, the units
            and the assumptions on the relevant page. Automated tests cover normal inputs,
            boundary cases and invalid inputs. A passing test proves the implementation matches the
            documented formula; it does not prove that a market price or regulation is current.
          </p>
          <p>
            Changing figures are not hardcoded into the calculators. Fuel prices, electricity
            prices and vehicle efficiency are user inputs. Where a future page depends on an
            official rate, the page must show a source link and a last-verified date.
          </p>
        </div>

        <div className="mt-6">
          <Notice tone="warning" title="What a last-reviewed date means">
            It means the page content and formula were reviewed on that date. It is not a claim
            that every external price or regulation was verified then, unless the page explicitly
            says so.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Estimates versus official rules
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          A calculated result is an estimate based on the inputs. An official rule is a statement
          from an authority. The site keeps the two separate. We do not label an estimate
          &ldquo;official&rdquo;, and we do not present an official rule as if it were a
          calculation.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Corrections and updates
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Corrections are logged on the{" "}
            <Link href="/corrections" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
              corrections page
            </Link>
            . A correction should identify the page, the error, the correct information and a
            source. When a factual error is found, the page is updated and the review date is
            changed. We do not silently change a year or a price to make a page look fresh.
          </p>
          <p>
            Pages are reviewed when a formula, source or unit definition changes. Time-sensitive
            data is not published until a maintenance process exists.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Independence and advertising
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            The site is not affiliated with any government, manufacturer, charging network, fuel
            retailer or toll authority. Commercial relationships, if added, must not determine a
            calculation result or a factual statement.
          </p>
          <p>
            No advertising is enabled in this build. If advertising is added, it must be labelled,
            kept separate from calculator controls, and must not obscure results, cause accidental
            clicks or be disguised as part of the tool. EEA/UK consent requirements will be
            implemented before any advertising cookies are used.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          AI assistance
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          This build was assembled with AI assistance. That is disclosed rather than hidden behind
          invented credentials. Formulas are tested, sources are cited, and limitations are
          documented. The project does not claim professional engineering, legal, tax or financial
          expertise.
        </p>

        <div className="mt-6">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
