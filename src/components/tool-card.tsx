import Link from "next/link";
import type { Tool } from "@/lib/site";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-brand-soft px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-dark">
          {tool.category}
        </span>
        <span className="text-[11px] font-medium text-muted">{tool.markets}</span>
      </div>
      <h2 className="mt-4 text-base font-semibold tracking-tight text-ink group-hover:text-brand">
        {tool.name}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{tool.description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        Open calculator
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 10h11M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
