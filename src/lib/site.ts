export type Tool = {
  slug: string;
  href: string;
  name: string;
  shortName: string;
  description: string;
  markets: string;
  category: "Fuel" | "EV" | "Units";
};

export const tools: Tool[] = [
  {
    slug: "fuel-efficiency-converter",
    href: "/tools/fuel-efficiency-converter",
    name: "Fuel efficiency converter",
    shortName: "MPG ↔ L/100 km",
    description:
      "Convert between L/100 km, MPG UK, MPG US and km/L, and between MPGe, mi/kWh and kWh/100 km.",
    markets: "Universal",
    category: "Units",
  },
  {
    slug: "fuel-cost",
    href: "/tools/fuel-cost",
    name: "Fuel cost calculator",
    shortName: "Trip fuel cost",
    description:
      "Estimate trip fuel use, total cost and cost per mile or kilometre with UK, US, European, Swiss and Asia-Pacific units.",
    markets: "8 markets",
    category: "Fuel",
  },
  {
    slug: "ev-charging-cost",
    href: "/tools/ev-charging-cost",
    name: "EV charging cost calculator",
    shortName: "Charging cost",
    description:
      "Calculate home or public charging cost from energy added, price per kWh, charging losses and session fees in eight markets.",
    markets: "8 markets",
    category: "EV",
  },
  {
    slug: "ev-vs-petrol-cost",
    href: "/tools/ev-vs-petrol-cost",
    name: "Petrol or gas vs EV cost calculator",
    shortName: "EV vs petrol",
    description:
      "Compare annual running costs on the same distance basis across eight markets, with an optional purchase-price break-even estimate.",
    markets: "8 markets",
    category: "EV",
  },
  {
    slug: "kw-to-ps-hp",
    href: "/tools/kw-to-ps-hp",
    name: "kW ↔ PS ↔ hp converter",
    shortName: "Power converter",
    description:
      "Convert kilowatts, metric horsepower (PS) and mechanical horsepower (hp/bhp) in every direction.",
    markets: "Universal",
    category: "Units",
  },
];

export const guides = [
  {
    href: "/guides/uk-vs-us-mpg",
    title: "Why UK and US MPG are different",
    description:
      "The imperial and US gallons are not the same. Here is the exact conversion and why the same car can appear more efficient in Britain.",
  },
  {
    href: "/guides/how-fuel-cost-is-calculated",
    title: "How trip fuel cost is calculated",
    description:
      "The formulas behind the fuel cost calculator, including UK pence-per-litre pricing, US gallons and European litres per 100 km.",
  },
  {
    href: "/guides/mpge-explained",
    title: "MPGe, mi/kWh and kWh/100 km explained",
    description:
      "How EPA MPGe relates to real electric consumption, and how to compare it without confusing energy with liquid fuel.",
  },
];
