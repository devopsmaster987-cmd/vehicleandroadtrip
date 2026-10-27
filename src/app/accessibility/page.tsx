import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LastReviewed, Notice } from "@/components/ui";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "RoadCost's accessibility approach, known limitations and how to report an accessibility problem.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
    title: "Accessibility",
    description:
      "RoadCost's accessibility approach, known limitations and how to report an accessibility problem.",
    url: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Accessibility" }]} />
      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Accessibility
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Accessibility
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          The calculators are built with native HTML controls, visible labels, keyboard focus
          styles and live result regions. This page describes the approach and its current limits
          without claiming an unaudited conformance level.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          What is in place
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>A skip link to the main content.</li>
          <li>Semantic headings, labels, fieldsets, legends and tables with captions.</li>
          <li>Keyboard-operable links, selects, radio buttons, checkboxes and details elements.</li>
          <li>Visible focus outlines and sufficient text/background contrast in the light theme.</li>
          <li>Result regions marked for assistive-technology announcements.</li>
          <li>Error messages associated with their inputs and exposed as alerts.</li>
          <li>Reduced-motion support for scrolling and transitions.</li>
          <li>Print styles that remove navigation and keep calculator results visible.</li>
          <li>No input data is sent to a third party by the calculators.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Known limitations
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>
            The site has not yet had an independent WCAG audit or a full assistive-technology
            test matrix. No conformance claim is made.
          </li>
          <li>
            Inputs accept typed numbers rather than spinner controls, so older browsers may not
            provide stepper buttons. Labels and hints explain the expected units.
          </li>
          <li>
            The calculator updates results while you type. The live region may be verbose with
            some screen readers; this will be refined after user testing.
          </li>
          <li>
            Charts and diagrams are not used in this build, so there is no image-only content.
          </li>
        </ul>

        <div className="mt-6">
          <Notice tone="warning" title="Testing status">
            Automated tests cover the calculation logic and lint/type checks. They do not replace
            a real browser, keyboard, zoom or screen-reader audit across devices. That audit is a
            launch task.
          </Notice>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
          Report a problem
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          If a control cannot be used with a keyboard, a label is missing, or a result is not
          announced, use the{" "}
          <Link href="/contact" className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">
            contact page
          </Link>
          . Include the page, browser, assistive technology and the step that failed. Do not send
          sensitive personal data.
        </p>

        <div className="mt-6">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
