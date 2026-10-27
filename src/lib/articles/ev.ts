import type { Article } from "./types";

export const evArticles: Article[] = [
  {
    slug: "kwh-per-100km",
    title: "kWh/100 km explained: the EV version of L/100 km",
    description:
      "Learn what kWh/100 km means, how to turn it into cost per 100 km, and how it differs from mi/kWh and battery-side efficiency.",
    category: "EV & charging",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "kWh/100 km is the electric equivalent of L/100 km. It tells you how much energy the car uses to cover 100 kilometres. Lower is better, and the cost calculation is direct.",
    quickAnswer:
      "Cost per 100 km = kWh/100 km × price per kWh. If a car uses 18 kWh/100 km and electricity costs 0.30 per kWh, the energy cost is 5.40 per 100 km.",
    takeaways: [
      "Lower kWh/100 km is better.",
      "Cost per 100 km is a simple multiplication.",
      "Battery-side and grid-side figures are not the same.",
    ],
    sections: [
      {
        heading: "The definition",
        paragraphs: [
          "A kilowatt-hour is a unit of energy. A 100 km figure tells you how many of those units the car uses over that distance. It is a consumption measure, like L/100 km.",
          "The number can come from the car's dashboard, a test cycle or a charging session. Those sources may not use the same boundary, so compare like with like.",
        ],
        formula:
          "energy used = km × (kWh/100 km) ÷ 100\ncost = energy used × price per kWh",
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Suppose an EV uses 16 kWh/100 km and you drive 250 km. Energy used = 250 × 16 ÷ 100 = 40 kWh. At 0.30 per kWh, the cost is 12.00.",
          "If charging losses are included, the grid energy will be higher than the battery energy. That is why the price you pay at the meter is not always the same as the energy added to the battery.",
        ],
      },
      {
        heading: "Battery side vs grid side",
        paragraphs: [
          "The car's dashboard usually reports battery-side energy. The charger or electricity meter reports grid-side energy. Charging losses sit between them.",
          "For a cost estimate, start with the meter reading or apply a charging-efficiency figure. Do not add losses twice.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 18 kWh/100 km good?",
        answer:
          "It is a reasonable figure for many EVs, but vehicle size, weather and speed matter. Compare with similar cars and similar conditions.",
      },
      {
        question: "How do I convert kWh/100 km to mi/kWh?",
        answer:
          "Convert kilometres to miles and invert the relationship. Our EV efficiency converter does this without unit mistakes.",
      },
      {
        question: "Does kWh/100 km include charging losses?",
        answer:
          "It depends on the source. Dashboard figures are often battery-side; meter-based figures include losses.",
      },
    ],
    tool: {
      href: "/tools/ev-charging-cost",
      name: "EV charging cost calculator",
      description: "Turn energy use and price per kWh into a charging estimate.",
    },
    related: ["mi-per-kwh-vs-km-per-kwh", "ev-charging-losses", "home-vs-public-charging"],
  },
  {
    slug: "mi-per-kwh-vs-km-per-kwh",
    title: "mi/kWh vs km/kWh: EV efficiency units made simple",
    description:
      "Convert miles per kWh to kilometres per kWh and kWh/100 km, and understand which direction means better efficiency.",
    category: "EV & charging",
    readingTime: "3 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "EV efficiency can be written as mi/kWh, km/kWh, kWh/100 km or kWh/100 mi. They are all related, but they point in different directions. Higher mi/kWh is better; lower kWh/100 km is better.",
    quickAnswer:
      "1 mi/kWh = 1.609 km/kWh. To convert km/kWh to kWh/100 km, divide 100 by km/kWh. For example, 4 mi/kWh is about 6.44 km/kWh, or 15.5 kWh/100 km.",
    takeaways: [
      "Higher mi/kWh and km/kWh are better.",
      "Lower kWh/100 km is better.",
      "1 mi/kWh equals 1.609 km/kWh.",
    ],
    sections: [
      {
        heading: "The conversions",
        paragraphs: [
          "The mile-to-kilometre conversion is the only distance change. The energy unit stays the same. For consumption, the relationship is inverted.",
        ],
        formula:
          "km/kWh = mi/kWh × 1.609344\nkWh/100 km = 100 ÷ km/kWh\nkWh/100 km = 100 ÷ (mi/kWh × 1.609344)",
      },
      {
        heading: "Examples",
        paragraphs: [
          "A car at 3 mi/kWh is at about 4.83 km/kWh, or 20.7 kWh/100 km. A car at 5 mi/kWh is at about 8.05 km/kWh, or 12.4 kWh/100 km.",
        ],
        table: {
          caption: "EV efficiency conversions",
          headers: ["mi/kWh", "km/kWh", "kWh/100 km"],
          rows: [
            ["3.0", "4.83", "20.7"],
            ["3.5", "5.63", "17.8"],
            ["4.0", "6.44", "15.5"],
            ["5.0", "8.05", "12.4"],
          ],
        },
      },
      {
        heading: "Which unit should you use?",
        paragraphs: [
          "Use the unit that matches your market and the source of the number. The important part is to convert before comparing. A higher mi/kWh figure is not directly comparable with a kWh/100 km figure without conversion.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many km/kWh is 4 mi/kWh?",
        answer: "About 6.44 km/kWh.",
      },
      {
        question: "Is higher mi/kWh better?",
        answer: "Yes. It means the car travels further on each kilowatt-hour.",
      },
      {
        question: "How do I convert to kWh/100 km?",
        answer: "Divide 100 by the km/kWh figure. For 4 mi/kWh, that is about 15.5 kWh/100 km.",
      },
    ],
    tool: {
      href: "/tools/fuel-efficiency-converter",
      name: "Fuel efficiency converter",
      description: "Convert EV efficiency units alongside MPG and L/100 km.",
    },
    related: ["kwh-per-100km", "ev-charging-losses", "ev-vs-petrol-break-even"],
  },
  {
    slug: "ev-charging-losses",
    title: "EV charging losses explained",
    description:
      "Why the electricity you pay for is not all stored in the battery, the charging-loss formula, and how to avoid double counting.",
    category: "EV & charging",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Charging is not perfectly efficient. Some energy is lost as heat in the charger, the cable and the battery. If you are estimating cost from battery energy, you need to account for those losses.",
    quickAnswer:
      "Grid energy = battery energy ÷ charging efficiency. At 90% efficiency, 40 kWh added to the battery needs about 44.4 kWh from the grid. Multiply grid energy by the price per kWh.",
    takeaways: [
      "Battery energy is not the same as grid energy.",
      "Divide by efficiency to get grid energy.",
      "Do not add losses twice if the meter figure already includes them.",
    ],
    sections: [
      {
        heading: "Where the losses happen",
        paragraphs: [
          "Energy can be lost in the onboard charger, the charging cable, the battery's thermal management and the cells themselves. The exact loss depends on the equipment, temperature and charging speed.",
          "A charger or car may report energy added to the battery. Your electricity meter reports energy drawn from the grid. The difference is the loss.",
        ],
        formula:
          "grid energy = battery energy ÷ (efficiency % ÷ 100)\nenergy lost = grid energy − battery energy\ncost = grid energy × price per kWh",
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Suppose you add 40 kWh to the battery at 90% efficiency. Grid energy = 40 ÷ 0.90 = 44.44 kWh. At 0.30 per kWh, the cost is 13.33.",
          "If you used 40 kWh directly in the cost calculation, you would understate the cost by about 4.44 kWh.",
        ],
      },
      {
        heading: "Avoid double counting",
        paragraphs: [
          "If your charging app already shows grid energy, use that number. If it shows battery energy, apply an efficiency figure. Do not apply efficiency to a meter reading that already includes losses.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is a normal EV charging loss?",
        answer:
          "It varies by equipment and conditions. Use the car or charger figure if available, or a conservative estimate for budgeting.",
      },
      {
        question: "Does DC fast charging lose less?",
        answer:
          "Losses depend on the equipment and conditions. Do not assume a fixed value for every charger.",
      },
      {
        question: "Should I use 100% efficiency?",
        answer:
          "Only if you are working from an accurate meter reading. If you are starting with battery energy, 100% will understate the cost.",
      },
    ],
    tool: {
      href: "/tools/ev-charging-cost",
      name: "EV charging cost calculator",
      description: "Includes charging losses and optional session fees.",
    },
    related: ["home-vs-public-charging", "kwh-per-100km", "ev-vs-petrol-break-even"],
  },
  {
    slug: "home-vs-public-charging",
    title: "Home vs public EV charging cost",
    description:
      "Compare home and public charging on all-in cost per kWh, including session fees, charging losses and convenience.",
    category: "EV & charging",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A public charger can look cheap per kWh until you add a session fee. A home tariff can look cheap until you include standing charges or a separate meter. A fair comparison uses the all-in cost of the energy you actually need.",
    quickAnswer:
      "Compare all-in cost per kWh: price per kWh plus any session fee divided by the energy purchased, and adjust for charging losses. Then compare convenience and speed separately.",
    takeaways: [
      "A session fee can dominate a small charge.",
      "Use all-in cost, not the headline rate.",
      "Home charging is not automatically cheapest for every driver.",
    ],
    sections: [
      {
        heading: "The all-in cost",
        paragraphs: [
          "If a charger costs 0.40 per kWh and adds a 2.00 session fee for 20 kWh, the all-in cost is 0.40 + 2.00 ÷ 20 = 0.50 per kWh. For 40 kWh, the fee adds only 0.05 per kWh.",
          "Small charges are therefore more sensitive to fixed fees. That is why a quick top-up can look expensive compared with a full charge.",
        ],
        formula:
          "all-in cost per kWh = price per kWh + (session fee ÷ kWh purchased)",
      },
      {
        heading: "Include losses",
        paragraphs: [
          "If the price is based on grid energy, you are already paying for losses. If you are comparing with battery energy, apply the charging efficiency before comparing. Keep the boundary consistent.",
        ],
      },
      {
        heading: "Beyond the rate",
        paragraphs: [
          "Home charging usually wins on convenience, but installation, standing charges and time-of-use tariffs can change the maths. Public charging may be necessary on a long trip even if it costs more.",
          "Compare the cost of the energy you need for a specific trip, not a national average that may not apply to you.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is home charging always cheaper?",
        answer:
          "Not always. It depends on your tariff, installation cost and the public charging prices available. Compare all-in cost for your own usage.",
      },
      {
        question: "How do I compare a charger with a session fee?",
        answer:
          "Divide the session fee by the kWh you expect to buy, then add it to the per-kWh price.",
      },
      {
        question: "What about free public charging?",
        answer:
          "Free charging can be good value, but it may be slow, busy or limited. It is not a reliable plan for every trip.",
      },
    ],
    tool: {
      href: "/tools/ev-charging-cost",
      name: "EV charging cost calculator",
      description: "Add price per kWh, losses and a session fee.",
    },
    related: ["ev-charging-losses", "ev-vs-petrol-break-even", "kwh-per-100km"],
  },
  {
    slug: "ev-vs-petrol-break-even",
    title: "EV vs petrol break-even: how to calculate it",
    description:
      "Estimate the annual running-cost saving from an EV and the years needed to recover a purchase-price difference.",
    category: "EV & charging",
    readingTime: "5 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "An EV can be cheaper to run and more expensive to buy. A break-even calculation shows how long the running-cost saving would take to recover the price difference, using the numbers you enter.",
    quickAnswer:
      "Annual saving = petrol annual cost − EV annual cost. Break-even years = upfront price difference ÷ annual saving. If the saving is zero or negative, there is no simple break-even.",
    takeaways: [
      "Use the same annual distance for both cars.",
      "Include charging losses and your real electricity price.",
      "Break-even is not a total-cost comparison.",
    ],
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "The calculation has two steps. First, compare annual energy costs. Second, divide the price difference by the annual saving. A positive saving means the EV is cheaper to run on the inputs provided.",
        ],
        formula:
          "annual saving = petrol annual cost − EV annual cost\nbreak-even years = upfront price difference ÷ annual saving",
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Suppose the petrol car costs 1,800 a year in fuel and the EV costs 700 a year in electricity. The annual saving is 1,100. If the EV costs 5,500 more to buy, the simple break-even is 5,500 ÷ 1,100 = 5 years.",
          "Change the electricity price or annual distance and the answer changes. That is why the inputs matter more than a headline claim.",
        ],
      },
      {
        heading: "What it leaves out",
        paragraphs: [
          "The simple break-even excludes depreciation, insurance, maintenance, tyres, road tax, charger installation and resale value. Those can change the answer substantially.",
          "Use the result as a running-cost comparison, not a full financial recommendation.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does it take an EV to break even?",
        answer:
          "It depends on the price difference, annual distance, fuel and electricity prices, and charging losses. Use your own numbers.",
      },
      {
        question: "Does break-even include maintenance?",
        answer:
          "Not in the simple energy-only calculation. Maintenance and other ownership costs are separate.",
      },
      {
        question: "What if electricity is expensive?",
        answer:
          "The annual saving falls and the break-even period lengthens. If the EV costs more to run, there is no positive break-even.",
      },
    ],
    tool: {
      href: "/tools/ev-vs-petrol-cost",
      name: "EV vs petrol cost calculator",
      description: "Compare annual running costs and an optional break-even.",
    },
    related: ["ev-charging-losses", "home-vs-public-charging", "hybrid-vs-petrol-cost"],
  },
  {
    slug: "ev-range-cold-weather",
    title: "Why EV range drops in cold weather",
    description:
      "How cabin heating and battery temperature affect EV range, and how to build a realistic winter estimate.",
    category: "EV & charging",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Cold weather can reduce EV range for two reasons: the cabin needs heat, and the battery works best within a certain temperature range. The effect is real, but it is not the same for every car or every trip.",
    quickAnswer:
      "Use a winter kWh/100 km figure, not the summer one. Precondition while plugged in if you can, use seat and steering-wheel heating, and add a buffer to your trip plan.",
    takeaways: [
      "Heating uses energy from the battery.",
      "Cold battery temperature can reduce usable performance.",
      "A winter consumption figure gives a more realistic estimate.",
    ],
    sections: [
      {
        heading: "Where the energy goes",
        paragraphs: [
          "An electric heater can draw a significant amount of power, especially in a cold cabin. Heated seats and a heated steering wheel can warm the driver with less energy than heating the whole cabin.",
          "The battery itself may need heating or cooling to work efficiently. Some cars manage this automatically, which also uses energy.",
        ],
      },
      {
        heading: "Estimate with winter data",
        paragraphs: [
          "If you have a winter consumption figure from the car, use it. If not, be conservative. A summer motorway figure can make a winter trip look safer than it is.",
          "Preconditioning while plugged in can warm the cabin and battery using grid energy before you leave, reducing the draw from the battery once you are moving.",
        ],
        formula:
          "winter energy = winter km × (winter kWh/100 km) ÷ 100\nwinter cost = winter energy × price per kWh",
      },
      {
        heading: "Plan for the trip",
        paragraphs: [
          "Keep a larger reserve in cold weather, check charger availability and allow for slower charging if the battery is cold. Use the car's route planner if it accounts for temperature and elevation.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much range do EVs lose in cold weather?",
        answer:
          "It varies by car, temperature, speed and heating use. Use a winter consumption figure for your own vehicle.",
      },
      {
        question: "Does preconditioning help?",
        answer:
          "It can. Warming the cabin and battery while plugged in can reduce the energy drawn from the battery after departure.",
      },
      {
        question: "Should I use summer efficiency for a winter trip?",
        answer:
          "No. A summer figure will usually make the trip look cheaper and more efficient than it is.",
      },
    ],
    tool: {
      href: "/tools/ev-charging-cost",
      name: "EV charging cost calculator",
      description: "Estimate winter charging cost with a higher consumption figure.",
    },
    related: ["kwh-per-100km", "ev-charging-losses", "home-vs-public-charging"],
  },
  {
    slug: "hybrid-vs-petrol-cost",
    title: "Hybrid vs petrol running cost",
    description:
      "Compare hybrid and petrol fuel costs using the same annual distance, realistic MPG and your own fuel price.",
    category: "EV & charging",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A hybrid can save fuel, but the size of the saving depends on the kind of driving you do. City-heavy routes usually favour a hybrid more than steady high-speed motorway runs.",
    quickAnswer:
      "Calculate annual fuel cost for both cars with the same distance and your own fuel price: annual cost = distance ÷ MPG × price. Then compare the difference with the purchase-price gap.",
    takeaways: [
      "Hybrids often help most in stop-start driving.",
      "Highway gains can be smaller than city gains.",
      "Use the same distance and price for both cars.",
    ],
    sections: [
      {
        heading: "Why driving style matters",
        paragraphs: [
          "A conventional hybrid recovers some braking energy and can run on electric power at low speed. That is most useful in city traffic. At a steady highway cruise, the engine is already efficient and the electric assistance has fewer opportunities.",
          "A plug-in hybrid is different: its result depends on how often you charge and how far you drive between charges.",
        ],
      },
      {
        heading: "The cost comparison",
        paragraphs: [
          "Use the same annual distance for both cars. Divide by each car's real MPG, multiply by the fuel price, and compare. Do not compare a city hybrid figure with a highway petrol figure.",
        ],
        formula:
          "annual fuel = annual distance ÷ MPG\nannual cost = annual fuel × price per unit\nsaving = petrol cost − hybrid cost",
      },
      {
        heading: "Look beyond fuel",
        paragraphs: [
          "Purchase price, insurance, maintenance, tyre wear and resale value can change the result. A fuel saving is not the same as a total-cost saving. Use the fuel comparison as one input, not the whole decision.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a hybrid always cheaper to run?",
        answer:
          "No. It depends on the car, the route and the fuel prices. A hybrid's advantage is usually largest in city driving.",
      },
      {
        question: "How do I compare a hybrid with a petrol car?",
        answer:
          "Use the same annual distance and your own fuel price for both. Compare annual fuel cost, then consider the purchase-price difference.",
      },
      {
        question: "Do plug-in hybrids get the same benefit?",
        answer:
          "Only if you charge them regularly. A plug-in hybrid with a flat battery may not deliver the same advantage.",
      },
    ],
    tool: {
      href: "/tools/ev-vs-petrol-cost",
      name: "EV vs petrol cost calculator",
      description: "Adapt the comparison for electric and petrol running costs.",
    },
    related: ["ev-vs-petrol-break-even", "city-vs-highway-mpg", "commute-fuel-cost"],
  },
];
