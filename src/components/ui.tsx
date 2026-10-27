import Link from "next/link";
import type { ReactNode } from "react";

export function Breadcrumbs({
  items,
}: {
  items: Array<{ href?: string; label: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="no-print text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-brand hover:underline">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            {item.href ? (
              <Link href={item.href} className="hover:text-brand hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-soft">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LastReviewed({ label = "Page last reviewed" }: { label?: string }) {
  return (
    <p className="text-xs leading-5 text-muted">
      {label}: <time dateTime="2026-10-27">27 October 2026</time>. Formulas are covered by
      automated tests. Prices are inputs, not live data.
    </p>
  );
}

export function Notice({
  children,
  tone = "info",
  title,
}: {
  children: ReactNode;
  tone?: "info" | "warning";
  title?: string;
}) {
  const classes =
    tone === "warning"
      ? "border-amber-ink/25 bg-amber-soft text-amber-ink"
      : "border-line bg-brand-soft text-ink-soft";
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm leading-6 ${classes}`}>
      {title ? <p className="font-semibold text-ink">{title}</p> : null}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </div>
  );
}

export function SourceList({
  sources,
}: {
  sources: Array<{ href: string; label: string; note?: string }>;
}) {
  return (
    <ul className="space-y-3">
      {sources.map((source) => (
        <li key={source.href} className="text-sm leading-6">
          <a
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
          >
            {source.label}
          </a>
          {source.note ? <span className="text-muted"> — {source.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ items }: { items: Array<{ question: string; answer: ReactNode }> }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group px-4 py-4 sm:px-5">
          <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-ink marker:hidden sm:text-base">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-lg leading-none text-muted transition group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <div className="mt-3 max-w-3xl text-sm leading-6 text-ink-soft">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function RelatedTools({
  items,
}: {
  items: Array<{ href: string; name: string; description: string }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-lg border border-line bg-surface p-4 transition hover:border-brand/40 hover:bg-brand-soft/40"
        >
          <p className="text-sm font-semibold text-ink group-hover:text-brand">{item.name}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
        </Link>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
