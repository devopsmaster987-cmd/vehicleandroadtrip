import type { Article } from "./types";

export const fuelUnitsArticles: Article[] = [
  {
    slug: "mpg-to-l100km",
    title: "MPG to L/100 km: exact conversion",
    description:
      "Convert MPG to L/100 km with the right constant for UK and US gallons, including worked examples and common mistakes.",
    category: "Fuel & units",
    readingTime: "5 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "MPG and L/100 km describe the same idea in opposite directions. MPG tells you how far a car goes on a gallon. L/100 km tells you how much fuel it uses to go 100 kilometres. The conversion is simple, but the UK and US versions use different constants because the gallons are different.",
    quickAnswer:
      "For UK MPG, use L/100 km = 282.480936 ÷ MPG UK. For US MPG, use L/100 km = 235.214583 ÷ MPG US. The UK constant is larger because an imperial gallon is larger than a US gallon.",
    takeaways: [
      "MPG UK and MPG US need different conversion constants.",
      "Lower L/100 km means lower fuel consumption.",
      "The same MPG number means different consumption in the UK and the US.",
    ],
    sections: [
      {
        heading: "The formulas",
        paragraphs: [
          "The constants combine the volume of a gallon with the number of kilometres in a mile. They are fixed, so you can use them without remembering the full derivation.",
          "If you are converting a UK figure, use 282.480936. If the figure came from a US window sticker, use 235.214583. Mixing the two constants is the most common conversion error.",
        ],
        formula: "L/100 km = 282.480936 ÷ MPG (UK)\nL/100 km = 235.214583 ÷ MPG (US)",
      },
      {
        heading: "Worked examples",
        paragraphs: [
          "The table shows the same MPG number interpreted under each gallon definition. Notice that 40 MPG UK is about 7.06 L/100 km, while 40 MPG US is about 5.88 L/100 km.",
        ],
        table: {
          caption: "MPG to L/100 km under UK and US gallon definitions",
          headers: ["MPG", "L/100 km as MPG UK", "L/100 km as MPG US"],
          rows: [
            ["30", "9.42", "7.84"],
            ["40", "7.06", "5.88"],
            ["50", "5.65", "4.70"],
            ["60", "4.71", "3.92"],
          ],
        },
      },
      {
        heading: "How to avoid the classic mistake",
        paragraphs: [
          "Start by asking where the MPG number came from. A UK brochure, a US window sticker and a rental-car display can all use different conventions. If the source is unclear, convert both candidates to L/100 km and see which result makes sense for the vehicle.",
          "Do not use the UK constant for a US MPG figure. It will make the car look about 20% more efficient than it really is in the US system. That error then flows into fuel-cost estimates.",
        ],
        bullets: [
          "Convert the unit before comparing two cars.",
          "Use L/100 km when you want a linear measure of fuel use.",
          "Use the same gallon definition throughout a calculation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 40 MPG good?",
        answer:
          "It depends on the gallon and the vehicle. In the UK, 40 MPG is about 7.06 L/100 km. In the US, 40 MPG is about 5.88 L/100 km. Vehicle size, fuel type and driving conditions matter too.",
      },
      {
        question: "How do I convert UK MPG to US MPG?",
        answer:
          "Multiply UK MPG by 0.8327 to get the approximate US MPG figure. For example, 50 MPG UK is about 41.6 MPG US.",
      },
      {
        question: "Why not just use an online converter?",
        answer:
          "You can, but you still need to know which gallon the source used. A calculator with a clear label is safer than a converter that silently assumes one system.",
      },
    ],
    tool: {
      href: "/tools/fuel-efficiency-converter",
      name: "Fuel efficiency converter",
      description: "Convert MPG UK, MPG US, L/100 km and km/L in one place.",
    },
    related: ["l100km-to-mpg", "us-vs-imperial-gallon", "fuel-economy-vs-consumption"],
  },
  {
    slug: "l100km-to-mpg",
    title: "L/100 km to MPG: exact conversion",
    description:
      "Turn litres per 100 kilometres into UK or US MPG with the exact formulas, examples and a simple way to remember the ratio.",
    category: "Fuel & units",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "L/100 km is common in Europe, Australia and many manufacturer specifications. If you are used to MPG, the number can feel backwards: a higher L/100 km figure means the car uses more fuel. The conversion is an inverse relationship, not a straight multiplication.",
    quickAnswer:
      "MPG UK = 282.480936 ÷ L/100 km. MPG US = 235.214583 ÷ L/100 km. For a quick estimate, 7 L/100 km is about 40.4 MPG UK or 33.6 MPG US.",
    takeaways: [
      "Lower L/100 km is better.",
      "MPG and L/100 km move in opposite directions.",
      "Choose the UK or US constant based on the gallon you need.",
    ],
    sections: [
      {
        heading: "Why the relationship is inverse",
        paragraphs: [
          "MPG measures distance per unit of fuel. L/100 km measures fuel per fixed distance. If a car uses fewer litres to cover 100 km, it can travel further on a gallon, so MPG rises.",
          "That is why you divide by L/100 km instead of multiplying. Doubling L/100 km halves the MPG figure, roughly speaking, before the constants are applied.",
        ],
        formula: "MPG (UK) = 282.480936 ÷ L/100 km\nMPG (US) = 235.214583 ÷ L/100 km\nkm/L = 100 ÷ L/100 km",
      },
      {
        heading: "A few useful examples",
        paragraphs: [
          "These values are rounded. Use the calculator when you need a precise answer for a comparison or a cost estimate.",
        ],
        table: {
          caption: "L/100 km converted to MPG and km/L",
          headers: ["L/100 km", "MPG UK", "MPG US", "km/L"],
          rows: [
            ["5.0", "56.5", "47.0", "20.0"],
            ["7.0", "40.4", "33.6", "14.3"],
            ["9.0", "31.4", "26.1", "11.1"],
            ["12.0", "23.5", "19.6", "8.3"],
          ],
        },
      },
      {
        heading: "When to use each unit",
        paragraphs: [
          "Use L/100 km when you want to compare fuel consumption directly. A drop from 8 to 7 L/100 km is a clear improvement, and the difference is easy to see. Use MPG when that is the convention your audience expects, but label it as UK or US.",
          "For cost work, L/100 km is often the simplest starting point in metric countries: litres used = kilometres × L/100 km ÷ 100. Then multiply by the price per litre.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is lower L/100 km better?",
        answer: "Yes. L/100 km measures fuel used per distance, so a lower number means less fuel consumption.",
      },
      {
        question: "What is 7 L/100 km in MPG?",
        answer: "It is about 40.4 MPG UK or 33.6 MPG US.",
      },
      {
        question: "How do I convert L/100 km to km/L?",
        answer: "Divide 100 by the L/100 km figure. For example, 8 L/100 km is 12.5 km/L.",
      },
    ],
    tool: {
      href: "/tools/fuel-efficiency-converter",
      name: "Fuel efficiency converter",
      description: "Switch between L/100 km, MPG UK, MPG US and km/L.",
    },
    related: ["mpg-to-l100km", "km-per-litre-to-mpg", "fuel-economy-vs-consumption"],
  },
  {
    slug: "km-per-litre-to-mpg",
    title: "km/L to MPG: Japan, India and Korea",
    description:
      "Understand kilometres per litre, convert it to MPG UK or US, and see why km/L is the inverse of L/100 km.",
    category: "Fuel & units",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Japan, India and South Korea often quote fuel economy in kilometres per litre. It is a distance-per-fuel unit, like MPG, so higher is better. The difference is the fuel volume and the distance unit, not the underlying idea.",
    quickAnswer:
      "1 km/L equals about 2.352 MPG US or 2.825 MPG UK. To convert km/L to L/100 km, divide 100 by the km/L figure.",
    takeaways: [
      "Higher km/L is better.",
      "1 km/L is about 2.35 MPG US.",
      "L/100 km = 100 ÷ km/L.",
    ],
    sections: [
      {
        heading: "The conversion formulas",
        paragraphs: [
          "A kilometre is shorter than a mile, and a litre is smaller than a US gallon. The conversion factor therefore combines both differences. The result is a simple multiplier.",
        ],
        formula:
          "MPG (US) = km/L × 2.352145\nMPG (UK) = km/L × 2.824809\nL/100 km = 100 ÷ km/L",
      },
      {
        heading: "Worked examples",
        paragraphs: [
          "A car using 15 km/L is using about 6.67 L/100 km. That is roughly 35.3 MPG US or 42.4 MPG UK. A car using 20 km/L is using 5 L/100 km, which is more efficient.",
        ],
        table: {
          caption: "km/L converted to common fuel-economy units",
          headers: ["km/L", "L/100 km", "MPG US", "MPG UK"],
          rows: [
            ["10", "10.0", "23.5", "28.2"],
            ["15", "6.67", "35.3", "42.4"],
            ["20", "5.0", "47.0", "56.5"],
            ["25", "4.0", "58.8", "70.6"],
          ],
        },
      },
      {
        heading: "Using km/L in a fuel-cost estimate",
        paragraphs: [
          "The fuel-cost formula is straightforward: litres used = kilometres ÷ km/L. Multiply by the price per litre to get the cost. If you are comparing with a UK or US figure, convert everything to L/100 km first so the direction of improvement is obvious.",
          "Our fuel-cost calculator includes Japan, India and South Korea presets that accept km/L directly.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many km/L is 40 MPG?",
        answer:
          "40 MPG US is about 17.0 km/L. 40 MPG UK is about 14.2 km/L, because the imperial gallon is larger.",
      },
      {
        question: "Why do some countries use km/L?",
        answer:
          "It is a familiar distance-per-fuel measure. Like MPG, it is easy to understand when fuel is sold by the litre and distances are in kilometres.",
      },
      {
        question: "Is 20 km/L good?",
        answer:
          "It is about 5 L/100 km, which is efficient for many petrol cars, but the right comparison depends on vehicle size and driving conditions.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Includes Japan, India and South Korea km/L presets.",
    },
    related: ["l100km-to-mpg", "mpg-to-l100km", "fuel-economy-vs-consumption"],
  },
  {
    slug: "us-vs-imperial-gallon",
    title: "US vs imperial gallon: MPG difference",
    description:
      "The US and imperial gallons are different volumes. Learn the exact difference and how it changes MPG, fuel prices and cost comparisons.",
    category: "Fuel & units",
    readingTime: "5 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A gallon is not always the same gallon. The US uses a gallon of 3.785411784 litres. The UK still uses the imperial gallon of 4.54609 litres for some fuel-economy figures. That difference is the reason a car can appear more efficient in Britain without changing at all.",
    quickAnswer:
      "One imperial gallon is about 1.20095 US gallons. A US gallon is about 0.8327 imperial gallons. Always state which gallon an MPG figure uses.",
    takeaways: [
      "US gallon: 3.785411784 litres.",
      "Imperial gallon: 4.54609 litres.",
      "The same MPG number means different consumption in each system.",
    ],
    sections: [
      {
        heading: "The exact volumes",
        paragraphs: [
          "The imperial gallon is about 20% larger than the US gallon. That is a large enough difference to matter in vehicle comparisons and fuel-cost work.",
          "A mile is the same length in both systems, so the difference comes entirely from the gallon. When someone says 40 MPG, the next question should be: which gallon?",
        ],
        formula:
          "1 imperial gallon = 4.54609 litres\n1 US gallon = 3.785411784 litres\n1 imperial gallon ≈ 1.20095 US gallons",
      },
      {
        heading: "The MPG trap",
        paragraphs: [
          "40 MPG UK is about 7.06 L/100 km. 40 MPG US is about 5.88 L/100 km. The US figure represents lower fuel consumption, even though both numbers are 40.",
          "This is not a trick or a marketing claim. It is a unit difference. Convert both figures to L/100 km before comparing them.",
        ],
      },
      {
        heading: "The fuel-price trap",
        paragraphs: [
          "Fuel prices follow the same split. UK prices are usually quoted per litre. US prices are usually quoted per US gallon. A US price per gallon cannot be compared directly with a UK price per litre without converting the volume.",
          "If you are building a trip budget across countries, convert the price to a common unit first, then apply the fuel-economy figure in that same unit.",
        ],
        bullets: [
          "Convert gallons to litres before comparing prices.",
          "Convert MPG to L/100 km before comparing cars.",
          "Keep the gallon label visible in every calculation.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much bigger is an imperial gallon?",
        answer: "It is 4.54609 litres, compared with 3.785411784 litres for a US gallon. That makes it about 20% larger.",
      },
      {
        question: "Does the UK use imperial gallons for fuel?",
        answer:
          "UK fuel is sold in litres, but vehicle fuel economy has historically been quoted in miles per imperial gallon. Both conventions can appear in the same conversation.",
      },
      {
        question: "Why do UK and US MPG differ?",
        answer:
          "The mile is the same, but the gallon is different. That changes how many miles one gallon represents.",
      },
    ],
    tool: {
      href: "/tools/fuel-efficiency-converter",
      name: "Fuel efficiency converter",
      description: "Convert UK and US MPG without mixing the gallon definitions.",
    },
    related: ["mpg-to-l100km", "l100km-to-mpg", "fuel-economy-vs-consumption"],
  },
  {
    slug: "fuel-economy-vs-consumption",
    title: "Fuel economy vs consumption",
    description:
      "MPG and km/L measure distance per fuel. L/100 km measures fuel per distance. Here is why the distinction matters for comparisons and costs.",
    category: "Fuel & units",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "People often use fuel economy and fuel consumption as if they mean the same thing. They are related, but they point in opposite directions. That matters when you compare cars, estimate savings or explain a result to someone else.",
    quickAnswer:
      "Fuel economy is distance per fuel: MPG or km/L, where higher is better. Fuel consumption is fuel per distance: L/100 km, where lower is better.",
    takeaways: [
      "MPG and km/L are economy units.",
      "L/100 km is a consumption unit.",
      "Do not compare the two directions without converting.",
    ],
    sections: [
      {
        heading: "A simple way to remember it",
        paragraphs: [
          "Economy answers: how far can I go on a fixed amount of fuel? Consumption answers: how much fuel do I need for a fixed distance? Both are useful, but they behave differently when you change the numbers.",
          "If a car improves from 30 to 40 MPG, that sounds like a big gain. In L/100 km terms, the change may look smaller or larger depending on where you started. Consumption is linear, which makes improvements easier to compare.",
        ],
      },
      {
        heading: "Why L/100 km is often clearer",
        paragraphs: [
          "A drop from 8 to 7 L/100 km saves one litre every 100 km. The relationship is direct. MPG is an inverse measure, so a 5 MPG improvement near the top of the scale saves less fuel than the same 5 MPG improvement at the bottom.",
          "For cost work in metric countries, L/100 km is usually the fastest route: litres = kilometres × L/100 km ÷ 100.",
        ],
        formula: "litres used = km × (L/100 km) ÷ 100\ncost = litres used × price per litre",
      },
      {
        heading: "Where each unit fits",
        paragraphs: [
          "Use MPG or km/L when that is the local convention and your audience expects it. Use L/100 km when you need a linear comparison, a fuel-cost calculation, or a clear statement that lower is better.",
          "The important thing is to label the unit. An unlabelled number is not a useful fuel-economy claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is MPG fuel economy or consumption?",
        answer: "MPG is fuel economy: miles per gallon. Higher is better.",
      },
      {
        question: "Is L/100 km better than MPG?",
        answer:
          "Neither is universally better. L/100 km is linear and easier for cost comparisons; MPG is the familiar convention in some markets.",
      },
      {
        question: "Why does MPG go down when L/100 km goes up?",
        answer:
          "They measure opposite things. More fuel per distance means fewer miles per gallon.",
      },
    ],
    tool: {
      href: "/tools/fuel-efficiency-converter",
      name: "Fuel efficiency converter",
      description: "See economy and consumption side by side.",
    },
    related: ["mpg-to-l100km", "l100km-to-mpg", "km-per-litre-to-mpg"],
  },
  {
    slug: "cost-per-mile-formula",
    title: "Cost per mile formula: a plain-English guide",
    description:
      "Calculate fuel cost per mile correctly for UK and US units, with examples and the mistake that makes estimates too low.",
    category: "Fuel & units",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Cost per mile is useful for commuting, business mileage and comparing two cars. The formula is simple, but it is easy to multiply the wrong numbers together. Fuel economy and fuel price do not sit in the same unit.",
    quickAnswer:
      "Cost per mile = total fuel cost ÷ miles driven. Find total fuel cost first: fuel used × price per unit. Do not multiply MPG by price per litre or gallon.",
    takeaways: [
      "Cost per mile needs total fuel cost first.",
      "UK and US examples use different fuel units.",
      "Fuel cost per mile is not the same as total ownership cost.",
    ],
    sections: [
      {
        heading: "The two-step method",
        paragraphs: [
          "First, work out how much fuel the trip uses. Second, multiply by the price you pay. Then divide the total cost by the distance in miles.",
          "This order prevents unit mistakes. If you start with MPG and price, you are mixing distance-per-fuel with money-per-fuel.",
        ],
        formula:
          "fuel used = distance ÷ MPG\nfuel cost = fuel used × price per gallon\ncost per mile = fuel cost ÷ miles",
      },
      {
        heading: "A UK example",
        paragraphs: [
          "Suppose a 100-mile trip uses 50 MPG UK and fuel costs 145p per litre. The trip uses about 9.09 litres. At £1.45 per litre, the fuel cost is about £13.18, or about 13.2p per mile.",
          "The MPG figure is used to find litres, not multiplied by the pence-per-litre price.",
        ],
      },
      {
        heading: "A US example",
        paragraphs: [
          "Suppose a 300-mile trip uses 30 MPG US and fuel costs $3.50 per US gallon. The trip uses 10 gallons. The fuel cost is $35.00, or about 11.7 cents per mile.",
          "The arithmetic is the same; only the fuel unit changes.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do you calculate fuel cost per mile?",
        answer:
          "Divide the trip distance by MPG to get gallons, multiply by the price per gallon, then divide by the distance in miles.",
      },
      {
        question: "What is cost per km?",
        answer:
          "It is total fuel cost divided by kilometres. Our calculators show both so you can compare across markets.",
      },
      {
        question: "Does cost per mile include insurance and maintenance?",
        answer:
          "No. It is a fuel-only figure. Insurance, maintenance, depreciation and tolls are separate costs.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Get total fuel cost, cost per mile and cost per km.",
    },
    related: ["round-trip-fuel-cost", "fuel-cost-100-miles", "commute-fuel-cost"],
  },
  {
    slug: "round-trip-fuel-cost",
    title: "Round-trip fuel cost formula",
    description:
      "A simple method for round-trip fuel estimates, including detours, unit changes and the difference between one-way and return distance.",
    category: "Fuel & units",
    readingTime: "3 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A round trip is not a different formula. It is the same one-way calculation with a larger distance. The mistake is doubling the fuel economy or the price instead of the distance.",
    quickAnswer:
      "Double the one-way distance, then calculate fuel use and cost as usual. If the return route is different, add both one-way distances instead of multiplying by two.",
    takeaways: [
      "Double the distance, not the MPG or the price.",
      "Use separate legs if the return route is different.",
      "Add a small buffer for detours and traffic.",
    ],
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "For a simple there-and-back trip, total distance is one-way distance × 2. Then use the normal fuel-cost method for that total distance.",
        ],
        formula:
          "round-trip distance = one-way distance × 2\nfuel used = round-trip distance ÷ MPG\ncost = fuel used × price per unit",
      },
      {
        heading: "When doubling is not enough",
        paragraphs: [
          "If you are taking a different route home, add the two route distances. If you plan a detour, add that distance too. A round-trip estimate based only on the outbound route can be too low.",
          "Traffic and cold starts can also change real consumption. A small buffer is sensible for budgeting, but keep it separate from the mathematical estimate.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "A 120-mile one-way trip at 30 MPG US uses 4 gallons one way. The round trip is 240 miles and uses 8 gallons. At $3.50 per gallon, the fuel cost is $28.00.",
          "The MPG stayed at 30. Only the distance changed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I double miles or gallons for a round trip?",
        answer:
          "Double the distance. The fuel used and cost then scale with that distance. Do not double the MPG.",
      },
      {
        question: "How do I include a detour?",
        answer:
          "Add the detour distance to the total trip distance before calculating fuel use.",
      },
      {
        question: "Does a round trip change fuel economy?",
        answer:
          "Not by itself. The route, speed, traffic and conditions can change real economy, but the return leg is not automatically less efficient.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Tick the round-trip option to double the distance automatically.",
    },
    related: ["fuel-cost-100-miles", "road-trip-fuel-budget", "cost-per-mile-formula"],
  },
];
