# Phase 0 working note

This is an honest record of what was and was not researched before the first build. It is not a
substitute for the full Phase 0 study required by the project brief.

## Status

**Keyword demand, competition, CPC and ranking opportunity are UNVERIFIED.** Google Ads Keyword
Planner, a paid SEO database and country-by-country top-10 SERP inspections were not available
in this build. No numeric search volume, difficulty score or CPC estimate is claimed anywhere on
the site.

The site therefore does not assert that a keyword has low competition or a fast ranking
opportunity. Pages were selected for user usefulness, unit coverage, testability and the ability
to avoid unverified market data.

## Markets and units

| Market | Distance | Fuel economy | Fuel price | Currency |
|---|---|---|---|---|
| UK | miles | MPG (imperial) | pence per litre | GBP |
| US | miles | MPG (US) | dollars per US gallon | USD |
| Europe | kilometres | L/100 km | euros per litre | EUR |
| Switzerland | kilometres | L/100 km | Swiss francs per litre | CHF |
| Japan | kilometres | km/L | yen per litre | JPY |
| India | kilometres | km/L | rupees per litre | INR |
| South Korea | kilometres | km/L | won per litre | KRW |
| Australia | kilometres | L/100 km | Australian dollars per litre | AUD |
| Switzerland | kilometres | L/100 km | Swiss francs per litre | CHF |

EV efficiency is handled separately: MPGe and kWh/100 mi are EPA outlet-to-wheel values that
include charging losses; mi/kWh and kWh/100 km can be battery-side dashboard values. The site
labels the basis rather than mixing them. Asia/Pacific examples use illustrative inputs only and
are not verified live prices.

## Internal build priority (not an SEO score)

These are utility/feasibility priorities, not measured opportunity scores.

1. Fuel-efficiency converter — fixes the UK/US MPG trap and the MPGe/EV unit gap.
2. Trip fuel cost — high practical utility; formula-only, no live data needed.
3. EV charging cost — covers tariffs, charging efficiency and session fees.
4. EV vs petrol running cost — supports a real decision without claiming a universal winner.
5. kW / PS / hp — simple, testable, genuinely unit-sensitive.
6. Vignette/toll/tax tools — high potential but deferred because they require official,
   dated, maintained data.
7. Charging-time, depreciation, financing and total-cost-of-ownership tools — deferred until
   the input model and sources can be specified properly.

## Keyword-to-page mapping (clusters, no volume claims)

| Cluster / example queries | Market | Intent | Page | Decision |
|---|---|---|---|---|
| mpg to l/100km, l/100km to mpg, mpg uk vs us, 40 mpg to l/100km, mpge to kwh/100 miles | UK/US/EU | Convert | `/tools/fuel-efficiency-converter` | Build one comprehensive converter; numbers handled in the calculator/table |
| kw to hp, kw to ps, 100 kw to hp, bhp to kw | UK/US/EU | Convert | `/tools/kw-to-ps-hp` | Build one converter; numbers handled in the calculator/table |
| fuel cost calculator, trip fuel cost, gas cost for a trip, uk fuel cost per mile | UK/US/EU | Calculate | `/tools/fuel-cost` | Build one page with explicit market units |
| ev charging cost, cost to charge an electric car, pence per kwh, cents per kwh | UK/US/EU | Calculate | `/tools/ev-charging-cost` | Build; no national tariff claims |
| ev vs petrol cost, gas vs electric, ev running cost | UK/US/EU | Compare | `/tools/ev-vs-petrol-cost` | Build; separate running costs from ownership |
| why are uk and us mpg different, is 40 mpg good | UK/US | Explain | `/guides/uk-vs-us-mpg` | Build one guide, not one page per question |
| how to calculate fuel cost per mile, gas cost formula | UK/US/EU | Explain | `/guides/how-fuel-cost-is-calculated` | Build; link to calculator |
| what is mpge, mpge vs mpg, mpge formula | US/UK | Explain | `/guides/mpge-explained` | Build; correct charging-loss basis |
| mpg2l100km, mpgtoL100km, litre/100km, milage | UK/US/EU | Variant/typo | Same pages | Merge; no separate URL |
| 35 mpg to l/100km, 5 l/100km to mpg, 100 kw to hp | UK/US/EU | Worked example | Same converter | Merge into calculator/table; no per-number URLs |
| vignette austria 2026, swiss vignette, slovenia e-vignette | EU | Informational | Not published | Defer until official price/validity verification and maintenance |
| uk road tax 2026, ulez charge, us state ev fees | UK/US | Regulatory | Not published | Defer until official sources are verified |
| irs mileage rate 2026, hmrc mileage rate 2026 | US/UK | Regulatory | Not published | Defer; rates are date-sensitive |
| best/free/online fuel calculator, mpg calculator app alternative | UK/US/EU | Commercial | Same tool pages | No separate "best/free" pages without real comparative evidence |

## Architecture decisions

- One page per distinct intent, not one page per keyword, number, year or spelling.
- Unified pages with an explicit market selector rather than duplicate `/uk/` and `/us/`
  content for the same calculator. The selector resets example inputs when the market changes so
  units cannot silently carry over.
- Central calculation library and Vitest suite; constants documented in the methodology page.
- No live prices, no route engine, no mandatory accounts, no external API.
- Static export, TypeScript strict, Tailwind CSS, accessible native controls.

## Deferred research required before expansion

- Keyword Planner or equivalent data for `google.co.uk`, `google.com` and each target European
  market, with retrieval dates.
- Top-10 organic SERP review in the correct country index for each candidate.
- Competitor gap analysis by market (UK, US, EU separately).
- Official source records for vignettes, tolls, VED, MOT, ULEZ/LEZ, congestion charges, IRS and
  HMRC rates, and state EV fees.
- A maintenance schedule for every time-sensitive page.
- AdSense consent/privacy implementation and operator legal details.

## Launch plan (realistic sequence)

1. Configure domain, contact email, operator details and hosting.
2. Run lint, typecheck, tests and production build; smoke-test desktop and mobile.
3. Publish the five calculators and guides; submit sitemap in Search Console.
4. Monitor indexing and corrections; do not add thin keyword pages to fill inventory.
5. Add deferred tools only after official-source verification and a maintenance plan.
6. Apply for advertising only when the trust pages, contact channel and consent setup are real.

No earnings, approval, traffic or ranking outcome is promised.
