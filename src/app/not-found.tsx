import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page may have moved, or the address may be incorrect.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: null,
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-base leading-7 text-ink-soft">
        The page may have moved, or the address may be incorrect. The calculators are listed on
        the tools page.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/tools"
          className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Browse tools
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:border-brand/50 hover:text-brand"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
