# RoadCost

RoadCost is a static Next.js site containing tested fuel, EV and unit calculators for the UK,
US, Europe, Switzerland, Japan, India, South Korea and Australia. The first release deliberately
focuses on calculations that can be tested and maintained without inventing live prices, tolls,
vignettes or tax rates.

## What is included

- Trip fuel cost calculator (UK miles/MPG UK/pence per litre, US miles/MPG US/dollars per
  gallon, Europe/Switzerland/Australia kilometres, L/100 km, local currency per litre,
  Japan/India/South Korea kilometres, km/L, local currency per litre).
- EV charging cost calculator (energy added or battery percentage, price per kWh, charging
  losses, session fee, optional cost per distance).
- Petrol/gas versus EV running-cost comparison with optional purchase-price break-even.
- Fuel-efficiency converter (L/100 km, MPG UK, MPG US, km/L, MPGe, mi/kWh, kWh/100 mi,
  kWh/100 km).
- kW / PS / hp / bhp converter.
- 29 original guides (three foundations plus 26 answer-first articles), a methodology page, a
  corrections log and the usual trust pages.

No analytics, advertising, accounts or live price feeds are enabled in this build.

## Commands

```bash
npm install
npm run dev        # local development
npm run lint       # ESLint
npm run typecheck  # TypeScript strict check
npm test           # Vitest formula suite
npm run build      # static export to out/
npm run check:indexing  # production indexing smoke test (fails on localhost)
```

The production build is a static export in `out/`. `trailingSlash` is enabled, so the export
writes directory indexes such as `out/tools/index.html` and `out/tools/fuel-cost/index.html`.
Vercel, Netlify and most static hosts serve these automatically; a bare file server must serve
`index.html` for directory URLs. Canonical URLs and the sitemap include the trailing slash.

## Verification status

Last checked 27 October 2026:

- ESLint, TypeScript, all 50 Vitest tests and the 53-page production build pass.
- The 29 guide pages were checked after the final build. Every guide exposes `Article` and
  `BreadcrumbList` JSON-LD, the 26 newer articles also expose `FAQPage`, and every article
  includes visible sources and `citation` URLs. Each page has a matching canonical and Open
  Graph URL.
- The sitemap contains 47 URLs and `/feed.xml` contains 29 items.
- All guide titles are within 60 characters including the brand suffix.
- Earlier checks covered the generated routes, RSC prefetch payloads, 404 status, internal links
  and unique page metadata.
- Headless Chrome client-side navigation from the home page to the fuel-cost tool completed
  without console errors or failed requests; switching to the Swiss market reset the examples and
  rendered CHF 56.88.
- A local mobile Lighthouse run scored 93 performance, 100 accessibility, 100 best practices
  and 100 SEO on the home page, and 95 / 100 / 100 / 100 on the fuel-cost tool. Lighthouse
  scores fluctuate by run and these are lab results, not field data or ranking evidence.

## Google indexing checklist

The code is ready for crawling, but a site cannot be indexed while its canonical URLs point at
`http://localhost:3000`. Complete these steps in order:

1. Buy or choose the final HTTPS domain and set `NEXT_PUBLIC_SITE_URL` to that origin with no
   trailing slash. Rebuild after changing it.
2. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from Search Console
   (`Settings` → `Ownership verification` → `HTML tag`). The build emits the verification meta
   tag automatically.
3. Deploy `out/` to an HTTPS host that serves `index.html` for directory URLs.
4. Run `npm run check:indexing`. It must pass before Search Console submission.
5. In Search Console, add a Domain property, verify ownership, and submit
   `https://your-domain.example/sitemap.xml`.
6. Use URL Inspection to request indexing for the home page, `/tools/fuel-cost`, `/guides` and
   the two or three strongest guides. Do not spam requests for all 47 URLs at once.
7. Check the Pages report after a few days. Indexing is Google's decision, not an on/off switch.
8. Keep the sitemap, internal links, RSS feed and guide dates current when content changes.

Do not use the Google Indexing API for ordinary articles or calculator pages; it is intended for
job postings and livestreams. `robots.txt` allows crawling, the sitemap lists the canonical URLs,
and the 404 page is `noindex`.

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` — production origin, no trailing slash. Used for canonical URLs,
  sitemap, robots and structured data. The fallback is `http://localhost:3000`, which must not
  be used in production.
- `NEXT_PUBLIC_CONTACT_EMAIL` — a monitored contact address. The contact page explicitly warns
  when this is missing. Do not launch or apply for advertising without it.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — optional Search Console HTML-tag token. It is
  emitted in the page head when set.

## Content and search

- `/guides` is a `CollectionPage` with an `ItemList` and 29 visible guide links. `/tools` is
  also a `CollectionPage` with its own `ItemList`.
- The site-wide schema includes `WebSite`, `Organization`, an `AboutPage` and a
  `ProfilePage` for RoadCost Editorial. Every calculator has `WebApplication` and `FAQPage`
  JSON-LD, and indexable pages have `BreadcrumbList`.
- Each article has a unique canonical URL, Open Graph article metadata, Twitter card,
  `Article` JSON-LD, `FAQPage` JSON-LD, `BreadcrumbList` JSON-LD and official-source citations.
- Articles use answer-first summaries, key takeaways, formulas, tables, FAQs, source lists and
  internal links to calculators and related guides.
- `src/app/sitemap.ts` includes all 47 indexable URLs, including every guide and the author page.
- `public/llms.txt` provides a concise, link-rich summary for generative and answer engines.
- `/feed.xml` lists the guides as an RSS feed for discovery and syndication.
- No article invents live prices, future tax rates or changing regulations.

## Accuracy and research status

- All formulas are in `src/lib/calculations.ts` and covered by `src/lib/calculations.test.ts`.
- The MPG constants are derived from the imperial/US gallon definitions and 1 mile =
  1.609344 km.
- EV MPGe uses the EPA 33.7 kWh gasoline-equivalent basis. EPA MPGe and kWh/100 mi already
  include charging losses; the EV charging calculator uses a battery-side efficiency input and
  adds losses separately, and labels that basis.
- Phase 0 keyword research with Google Ads Keyword Planner or a comparable dataset was **not**
  completed in this build. Search volumes, competition and CPC are unverified. See
  `docs/phase-0.md` and `/methodology`.
- No vignette, toll, road-tax, IRS/HMRC mileage-rate or live fuel-price pages are published.
  They are deferred until official data and a maintenance process exist.

## Launch blockers / required operator work

1. Set a real production domain and contact email.
2. Add the operator's legal entity and governing-law details to the terms and privacy pages.
3. Decide on hosting and identify the host's request-log retention.
4. Complete country-specific keyword and SERP research before targeting high-risk commercial or
   regulatory terms. The current guides are evergreen explanations, not live-price pages.
5. If advertising is enabled, implement the required consent controls and update the privacy
   policy before loading advertising cookies.
6. Add a maintenance schedule for any future time-sensitive data and keep the corrections log
   current.

## Deployment notes

The site is a static export (`output: "export"`). It has no server routes or database. The
calculators run entirely in the browser. Set the public environment variables at build time,
because Next inlines `NEXT_PUBLIC_*` values into the static output.

Next 16 on Windows writes RSC segment payloads into nested `__next.*` directories, while the
client requests flattened `__next.*.txt` files. The `postbuild` script
(`scripts/flatten-rsc-segments.mjs`) normalizes those paths so prefetching and client-side
navigation work on a plain static server. It is a no-op on platforms where Next already emits
flat files.
