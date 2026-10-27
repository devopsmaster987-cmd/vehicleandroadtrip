import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LastReviewed, Notice } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/format";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How RoadCost handles calculator inputs, privacy and any future analytics or advertising.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Privacy policy",
    description:
      "How RoadCost handles calculator inputs, privacy and any future analytics or advertising.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Privacy policy" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Privacy</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">Last updated: 27 October 2026</p>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          This policy describes the current build of RoadCost. It is written to match what the
          site actually does, not a generic template with features that are not enabled.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Calculator inputs
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            The calculators run in your browser. Distances, fuel prices, electricity prices,
            vehicle efficiency and battery inputs are used locally to calculate a result. They are
            not sent to RoadCost by the calculator and are not stored in an account.
          </p>
          <p>
            Reloading or closing the page clears the inputs unless your browser restores form
            values as part of its own behaviour. The site does not set a cookie for calculator
            inputs.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What this build collects
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            This build has no user accounts, no newsletter, no analytics service, no advertising
            script and no cookie banner. It does not intentionally collect personal data through
            the calculators.
          </p>
          <p>
            A production host will usually process standard request information such as IP address,
            browser type, requested URL and time. The operator must identify the hosting provider
            and its retention terms before commercial launch. This preview does not name a
            provider because none is configured here.
          </p>
        </div>

        <div className="mt-6">
          <Notice tone="warning" title="Pre-launch gap">
            A public site needs a named operator and, where required, a lawful basis and
            jurisdiction-specific disclosures. Those operator details are not configured in this
            build. See the <Link href="/contact" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">contact page</Link>.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Email
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          If you email the contact address, the operator receives your email address, message and
          any information you choose to include. Do not send sensitive personal data.{" "}
          {CONTACT_EMAIL ? (
            <>
              The configured contact address is{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
                {CONTACT_EMAIL}
              </a>
              .
            </>
          ) : (
            <>No contact address is configured in this preview, so there is no working email channel yet.</>
          )}
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          External links
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Pages link to official sources and other external sites. Those sites have their own
          privacy policies and may set cookies or collect data when you visit them. RoadCost does
          not control those sites.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Analytics and advertising
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            No analytics or advertising is enabled in this build. If Google AdSense or another
            service is added, this policy will be updated first, and any required consent controls
            for the EEA, UK and applicable US state privacy laws will be implemented before
            cookies or personalised advertising are used.
          </p>
          <p>
            Calculator inputs will not be sent to an advertising or analytics service. Advertising
            must not be disguised as a calculator control, obscure results or cause accidental
            clicks.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Your choices and rights
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Because this build does not create accounts or collect calculator data, there is usually
          no stored profile to access or delete. If you have emailed the operator, you may have
          rights under applicable data-protection law to access, correct or delete that
          correspondence. The operator must publish its legal entity and the applicable
          jurisdiction before launch so those rights can be exercised precisely.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Children
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          The site is a general-audience reference tool and is not directed at children. It does
          not knowingly collect personal data from children.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Changes
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          If the data practices change, this page will be updated and the date at the top changed.
          Material changes will be described in the{" "}
          <Link href="/corrections" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            corrections log
          </Link>
          .
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Contact</h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          For privacy questions, use the{" "}
          <Link href="/contact" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            contact page
          </Link>
          . Do not include sensitive personal data in a first message.
        </p>

        <div className="mt-6">
          <LastReviewed label="Page last reviewed" />
        </div>
      </article>
    </div>
  );
}
