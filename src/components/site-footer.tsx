import Link from "next/link";
import { CONTENT_REVIEWED } from "@/lib/format";

const columns = [
  {
    heading: "Calculators",
    links: [
      { href: "/tools/fuel-efficiency-converter", label: "Fuel efficiency converter" },
      { href: "/tools/fuel-cost", label: "Fuel cost calculator" },
      { href: "/tools/ev-charging-cost", label: "EV charging cost" },
      { href: "/tools/ev-vs-petrol-cost", label: "EV vs petrol" },
      { href: "/tools/kw-to-ps-hp", label: "Power converter" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/guides/uk-vs-us-mpg", label: "UK vs US MPG" },
      { href: "/guides/mpge-explained", label: "MPGe explained" },
      { href: "/feed.xml", label: "RSS feed" },
      { href: "/methodology", label: "Methodology" },
      { href: "/corrections", label: "Corrections log" },
    ],
  },
  {
    heading: "Site",
    links: [
      { href: "/about", label: "About" },
      { href: "/authors/roadcost-editorial", label: "Editorial team" },
      { href: "/contact", label: "Contact" },
      { href: "/editorial-policy", label: "Editorial policy" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-base font-semibold tracking-tight text-ink">RoadCost</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            Transparent fuel, EV and unit calculators for drivers in the UK, US, Europe, Switzerland and Asia-Pacific.
            Every tool states its units and shows the formula.
          </p>
          <p className="mt-4 text-xs leading-5 text-muted">
            No live fuel prices are published. Use the prices you pay and verify changing
            rules with the official source.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.heading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {column.heading}
            </h2>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft hover:text-brand hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} RoadCost. Calculations are estimates, not quotes.</p>
          <p>Content reviewed {CONTENT_REVIEWED}.</p>
        </div>
      </div>
    </footer>
  );
}
