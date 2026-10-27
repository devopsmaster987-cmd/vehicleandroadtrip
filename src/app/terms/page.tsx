import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LastReviewed, Notice } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms for using RoadCost's calculators and content, including estimates, limitations and acceptable use.",
  alternates: { canonical: "/terms" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Terms of service",
    description:
      "The terms for using RoadCost's calculators and content, including estimates, limitations and acceptable use.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Terms" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Terms</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Terms of service
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">Last updated: 27 October 2026</p>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          These terms apply to your use of RoadCost. By using the site, you accept them. If you do
          not accept them, do not use the site.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Estimates, not professional advice
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            The calculators produce estimates from the inputs you provide. They are not a quote,
            a guarantee, a contract, a valuation or professional advice. Fuel consumption, prices,
            tariffs and regulations can change, and real-world results vary.
          </p>
          <p>
            Nothing on the site is legal, tax, financial, insurance, engineering or safety advice.
            For a legal requirement, tax rate, toll, vignette, registration rule or vehicle
            specification, consult the official authority or a qualified professional.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Accuracy and availability
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            We aim to use documented formulas and to test them, but the site is provided on an
            &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. No warranty is given that
            the site will be uninterrupted, error-free or fit for a particular purpose.
          </p>
          <p>
            The site does not publish live prices in this build. If a page links to an official
            source, the official source controls. A last-reviewed date is not a guarantee that
            every external fact remains current.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Limitation of liability
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          To the extent permitted by applicable law, the operator is not liable for indirect or
          consequential loss, loss of profit, or decisions made in reliance on an estimate. Nothing
          in these terms excludes liability that cannot lawfully be excluded.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Acceptable use
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Do not attempt to disrupt, overload or gain unauthorised access to the site.</li>
          <li>Do not use automated systems to generate artificial traffic or advertising clicks.</li>
          <li>Do not scrape or republish the site at scale without permission.</li>
          <li>Do not misrepresent the site as an official government or manufacturer service.</li>
          <li>Do not use the site to break the law or to facilitate fraud.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Intellectual property
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          The site&rsquo;s original text, design and calculation code are protected by applicable
          intellectual-property law. You may use the calculators for personal or internal business
          purposes. You may not republish the site or its content as your own without permission.
          Official data and third-party names remain the property of their owners.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          External links
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Links to official sources and third-party sites are provided for verification and
          context. The operator does not control those sites and is not responsible for their
          content, availability or privacy practices.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Changes to the site or terms
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Tools and content may be changed, suspended or removed. These terms may be updated; the
          date at the top will change. Continued use after an update means the updated terms apply.
        </p>

        <div className="mt-6">
          <Notice tone="warning" title="Operator details required before launch">
            These terms do not yet identify a legal entity, governing law or jurisdiction because
            this is a pre-launch build. Those details must be completed before commercial launch.
            See the <Link href="/about" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">about page</Link> and{" "}
            <Link href="/contact" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">contact page</Link>.
          </Notice>
        </div>

        <div className="mt-6">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
