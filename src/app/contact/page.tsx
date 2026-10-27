import type { Metadata } from "next";
import { Breadcrumbs, LastReviewed, Notice } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RoadCost about a correction, source suggestion or privacy question.",
  alternates: { canonical: "/contact" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Contact",
    description:
      "Contact RoadCost about a correction, source suggestion or privacy question.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Contact RoadCost
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Corrections, source suggestions and privacy questions are welcome. Please include the
          page URL, the figure or statement you are questioning, and the official source or
          evidence you recommend.
        </p>

        <div className="mt-6 rounded-xl border border-line bg-surface p-5">
          <h2 className="text-base font-semibold text-ink">Email</h2>
          {CONTACT_EMAIL ? (
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-brand underline decoration-brand/30 underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          ) : (
            <div className="mt-3">
              <Notice tone="warning" title="Contact address not configured in this build">
                Set <code className="rounded bg-paper px-1 py-0.5 text-xs">NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
                to a monitored address before launch. A contact page without a real, monitored
                address is not ready for advertising or commercial use.
              </Notice>
            </div>
          )}
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What to include
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>The URL of the page.</li>
          <li>The exact figure, formula or statement you believe is wrong.</li>
          <li>What you believe the correct value or wording is.</li>
          <li>A link to the official source, with an effective date if relevant.</li>
          <li>Whether the issue affects a calculation, a source citation or a spelling/unit label.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What not to send
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Do not send passwords, payment details, home addresses, number plates, VINs, private
          journey logs or other sensitive personal data. The calculators do not need it, and email
          is not an appropriate channel for it.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Response expectations
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          There is no guaranteed response time. Correction reports that include a verifiable
          official source are prioritised. Accepted corrections are recorded in the{" "}
          <a href="/corrections" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            corrections log
          </a>
          .
        </p>

        <div className="mt-6">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
