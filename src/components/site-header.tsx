import Link from "next/link";

const nav = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 rounded-md focus-visible:outline-offset-4">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 20 10.4 4h3.2L17 20" strokeLinecap="round" />
              <path d="M9.2 12h5.6" strokeLinecap="round" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold tracking-tight text-ink group-hover:text-brand">
              RoadCost
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              Fuel &amp; EV tools
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-brand-soft hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-line-strong bg-surface px-3 py-2 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
            Menu
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </summary>
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-line bg-surface p-2 shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-brand-soft hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
