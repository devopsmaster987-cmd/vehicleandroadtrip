import type { Article } from "./types";

export const tripBudgetArticles: Article[] = [
  {
    slug: "fuel-cost-100-miles",
    title: "How much fuel does 100 miles use? A simple guide",
    description:
      "Work out fuel use and fuel cost for 100 miles in UK or US units, with example tables and the formula behind the answer.",
    category: "Trip & budget",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A 100-mile trip is a useful benchmark. It is long enough to show real differences between cars, but short enough to calculate without a spreadsheet. The answer depends on the MPG figure and, in the UK, on converting miles to litres.",
    quickAnswer:
      "In the US, fuel used = 100 ÷ MPG US gallons. At 25 MPG that is 4 gallons. In the UK, fuel used = 100 ÷ MPG UK × 4.54609 litres. At 50 MPG UK that is about 9.09 litres.",
    takeaways: [
      "US: gallons = miles ÷ MPG US.",
      "UK: litres = miles ÷ MPG UK × 4.54609.",
      "Multiply fuel used by the price you pay to get cost.",
    ],
    sections: [
      {
        heading: "US calculation",
        paragraphs: [
          "If a car returns 25 MPG US, it uses 4 gallons to cover 100 miles. At $3.50 per gallon, the fuel cost is $14.00. At 40 MPG US, it uses 2.5 gallons, or $8.75 at the same price.",
        ],
        table: {
          caption: "Fuel used for 100 miles at different US MPG figures",
          headers: ["MPG US", "US gallons", "Litres (approx.)"],
          rows: [
            ["20", "5.0", "18.9"],
            ["25", "4.0", "15.1"],
            ["30", "3.33", "12.6"],
            ["40", "2.5", "9.46"],
            ["50", "2.0", "7.57"],
          ],
        },
      },
      {
        heading: "UK calculation",
        paragraphs: [
          "In the UK, the same 100 miles is divided by MPG UK to get imperial gallons, then multiplied by 4.54609 to get litres. At 50 MPG UK, the trip uses about 9.09 litres. At 145p per litre, that costs about £13.18.",
          "If you use a US MPG figure by mistake, the litre estimate will be too low because the US gallon is smaller.",
        ],
      },
      {
        heading: "Turn fuel into cost",
        paragraphs: [
          "The cost step is the same in both systems: fuel used × price per unit. Keep the units together. A price per litre cannot be applied to a number of gallons without converting first.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many litres does 100 miles use?",
        answer:
          "It depends on MPG UK. At 50 MPG UK it is about 9.09 litres; at 40 MPG UK it is about 11.37 litres.",
      },
      {
        question: "How much does 100 miles cost?",
        answer:
          "Multiply the fuel used by the price you pay. There is no single answer because fuel prices vary by place and grade.",
      },
      {
        question: "Is 100 miles the same as 100 km?",
        answer:
          "No. 100 miles is about 160.9 kilometres. Convert the distance before using a metric consumption figure.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Enter 100 miles and your own price to get a full estimate.",
    },
    related: ["fuel-cost-100-km", "cost-per-mile-formula", "round-trip-fuel-cost"],
  },
  {
    slug: "fuel-cost-100-km",
    title: "Fuel cost for 100 km: formula and examples",
    description:
      "Calculate litres and fuel cost for 100 kilometres using L/100 km or km/L, with examples for Europe and Asia-Pacific markets.",
    category: "Trip & budget",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "In metric markets, 100 km is the natural distance for a fuel estimate. It matches the L/100 km unit directly, and it is easy to scale to a longer trip.",
    quickAnswer:
      "At 7 L/100 km, 100 km uses 7 litres. Multiply by the price per litre to get cost. If your car uses km/L, litres used = 100 ÷ km/L.",
    takeaways: [
      "With L/100 km, litres for 100 km is the same number.",
      "With km/L, divide 100 by the km/L figure.",
      "Cost = litres × price per litre.",
    ],
    sections: [
      {
        heading: "Using L/100 km",
        paragraphs: [
          "L/100 km is already a per-100-km measure. A car listed at 6.5 L/100 km uses 6.5 litres over 100 km. At €1.75 per litre, the fuel cost is €11.38.",
          "For a different distance, multiply the consumption figure by distance ÷ 100. For 250 km at 6.5 L/100 km, litres = 250 × 6.5 ÷ 100 = 16.25 litres.",
        ],
        formula: "litres = km × (L/100 km) ÷ 100\ncost = litres × price per litre",
      },
      {
        heading: "Using km/L",
        paragraphs: [
          "Japan, India and South Korea often use km/L. At 15 km/L, 100 km uses 100 ÷ 15 = 6.67 litres. At 20 km/L, it uses 5 litres.",
          "A higher km/L figure means lower fuel use. Do not multiply by km/L when you want litres; divide.",
        ],
        table: {
          caption: "Fuel used for 100 km at different km/L figures",
          headers: ["km/L", "Litres for 100 km", "L/100 km"],
          rows: [
            ["10", "10.0", "10.0"],
            ["15", "6.67", "6.67"],
            ["20", "5.0", "5.0"],
            ["25", "4.0", "4.0"],
          ],
        },
      },
      {
        heading: "Scaling to a longer trip",
        paragraphs: [
          "Once you know the fuel used for 100 km, scale it linearly. A 400 km trip uses four times the fuel. That is one advantage of consumption units: the arithmetic is direct.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many litres is 100 km?",
        answer:
          "If your car uses 7 L/100 km, it is 7 litres. If it uses 5 L/100 km, it is 5 litres.",
      },
      {
        question: "How many miles is 100 km?",
        answer: "100 km is about 62.14 miles.",
      },
      {
        question: "How do I calculate 100 km in Japan or India?",
        answer:
          "Use litres = 100 ÷ km/L, then multiply by the local price per litre.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Supports L/100 km and km/L for metric markets.",
    },
    related: ["fuel-cost-100-miles", "km-per-litre-to-mpg", "commute-fuel-cost"],
  },
  {
    slug: "commute-fuel-cost",
    title: "How to calculate commute fuel cost",
    description:
      "A practical method for turning your daily commute into a fuel budget, including round trips, working weeks and real-world consumption.",
    category: "Trip & budget",
    readingTime: "5 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A commute is a repeated trip, so small errors get multiplied. The useful number is not the one-way distance. It is the total distance you drive over the period you are budgeting for.",
    quickAnswer:
      "Annual commute distance = one-way distance × 2 × commuting days per week × working weeks. Then divide by your real MPG and multiply by the fuel price.",
    takeaways: [
      "Use round-trip distance for each commuting day.",
      "Use a real-world MPG, not the best-case sticker figure.",
      "Separate fuel cost from parking, tolls and maintenance.",
    ],
    sections: [
      {
        heading: "Build the distance first",
        paragraphs: [
          "Suppose your one-way commute is 18 miles, you drive both ways, and you commute five days a week for 48 weeks. The annual commute distance is 18 × 2 × 5 × 48 = 8,640 miles.",
          "Adjust the number of weeks for holidays, remote days and irregular shifts. A realistic distance is more useful than a perfect one.",
        ],
        formula:
          "annual distance = one-way × 2 × days per week × weeks per year\nfuel used = annual distance ÷ MPG\nannual fuel cost = fuel used × price per unit",
      },
      {
        heading: "Use a realistic MPG",
        paragraphs: [
          "City traffic, cold starts and short trips can pull real consumption away from a highway-biased test figure. If you track tank-to-tank fuel use, use that number. If not, a slightly conservative estimate is safer for budgeting.",
          "For a monthly estimate, divide the annual figure by 12. For a weekly estimate, divide by the number of commuting weeks you actually drive.",
        ],
      },
      {
        heading: "What the number does not include",
        paragraphs: [
          "Fuel is only one part of commuting cost. Parking, tolls, congestion charges, insurance, maintenance and depreciation can be larger. Keep them separate so you can see what changes when fuel prices move.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I use one-way or round-trip distance?",
        answer:
          "Use round-trip distance for each day you drive both ways. The calculator has a round-trip option for this.",
      },
      {
        question: "How do I estimate monthly fuel cost?",
        answer:
          "Calculate the annual fuel cost, then divide by 12. For a more accurate month, use the actual number of commuting days.",
      },
      {
        question: "Does traffic make the estimate wrong?",
        answer:
          "It can. Stop-start traffic usually increases fuel use per distance. Use a real-world MPG if you have one.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Enter the round-trip distance and your own fuel price.",
    },
    related: ["track-real-fuel-economy", "fuel-cost-100-miles", "city-vs-highway-mpg"],
  },
  {
    slug: "road-trip-fuel-budget",
    title: "How to budget fuel for a road trip",
    description:
      "Estimate road-trip fuel cost, add a sensible buffer and handle unit changes across countries without guessing.",
    category: "Trip & budget",
    readingTime: "5 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A road-trip fuel budget is a distance estimate plus a fuel-use estimate plus a price estimate. The hard part is not the arithmetic. It is being honest about detours, load, speed and the price you will actually pay.",
    quickAnswer:
      "Add up the total route distance, divide by your expected MPG, multiply by the price per unit, then add a buffer for detours and conditions. Convert units before crossing borders.",
    takeaways: [
      "Start with total distance, not one tank.",
      "Use a realistic loaded-trip MPG.",
      "Add a buffer and keep a currency/unit note.",
    ],
    sections: [
      {
        heading: "Estimate the route distance",
        paragraphs: [
          "Use the driving distance, not the straight-line distance. Add planned detours and a little extra for finding parking or missing a turn. If you are returning home, include the return leg.",
        ],
      },
      {
        heading: "Choose a trip MPG",
        paragraphs: [
          "A fully loaded car with passengers, luggage and a roof box will not match a solo highway test. Use a conservative figure. If you have measured the car on a similar trip before, use that number.",
          "For a mixed route, city and highway consumption can differ enough that a single optimistic figure is misleading.",
        ],
        formula:
          "fuel used = total distance ÷ trip MPG\nfuel cost = fuel used × price per unit\nbudget = fuel cost × 1.10 to 1.15",
      },
      {
        heading: "Crossing borders",
        paragraphs: [
          "If the trip crosses from miles to kilometres, or from gallons to litres, convert the distance and price into one system before multiplying. A spreadsheet with a unit column is safer than doing it in your head at a fuel stop.",
          "The calculator can handle each leg separately. Add the results in a common currency if you need one total.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much should I budget for fuel?",
        answer:
          "Use the route distance, a conservative MPG and the price you expect to pay. Add about 10–15% for detours and conditions.",
      },
      {
        question: "Should I use highway MPG?",
        answer:
          "Only if most of the trip is steady highway driving. For a mixed route, use a combined or measured figure.",
      },
      {
        question: "How do I handle multiple currencies?",
        answer:
          "Calculate each leg in its local currency, then convert the totals with the exchange rate you are using for the trip.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Estimate each leg with the right local units.",
    },
    related: ["round-trip-fuel-cost", "fuel-cost-100-miles", "roof-box-fuel-economy"],
  },
  {
    slug: "track-real-fuel-economy",
    title: "Track real fuel economy: tank-to-tank",
    description:
      "Measure your car's real MPG or L/100 km using odometer readings and fill-ups, and avoid the common errors that distort the result.",
    category: "Trip & budget",
    readingTime: "5 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "The dashboard is a useful guide, but it is not always the same as the fuel you actually buy. The tank-to-tank method gives you a real number you can use in a cost estimate.",
    quickAnswer:
      "Fill the tank to the same level, record the odometer, drive normally, refill to the same level, then divide the distance by the fuel added. Repeat over several tanks for a stable average.",
    takeaways: [
      "Use the same fill level each time.",
      "Distance divided by fuel added gives real economy.",
      "One tank is noisy; several tanks are more reliable.",
    ],
    sections: [
      {
        heading: "The method",
        paragraphs: [
          "Start with a full tank and write down the odometer. Drive as you normally would. At the next fill-up, fill to the same level and record both the odometer and the fuel added.",
          "The fuel added is the fuel used since the last fill-up, assuming both fills were at the same level. Divide distance by fuel to get MPG, or fuel by distance to get L/100 km.",
        ],
        formula:
          "MPG = distance travelled ÷ fuel added\nL/100 km = fuel added ÷ distance travelled × 100",
      },
      {
        heading: "Common errors",
        paragraphs: [
          "Stopping at the first click on one fill and topping off on the next changes the amount of fuel in the tank. That error carries into the calculation. Use the same filling habit each time.",
          "A single tank includes one weather pattern, one traffic pattern and one driving style. Three to five tanks give a more useful average.",
        ],
        bullets: [
          "Do not compare a partial fill with a full fill.",
          "Record the odometer at the pump, not later from memory.",
          "Keep tyre pressure and load reasonably consistent.",
        ],
      },
      {
        heading: "Use the number",
        paragraphs: [
          "Once you have a real MPG or L/100 km figure, use it in the fuel-cost calculator instead of the brochure figure. Your commute and road-trip estimates will be closer to reality.",
        ],
      },
    ],
    faqs: [
      {
        question: "How accurate is the car's fuel-economy display?",
        answer:
          "It can be close, but it is not a substitute for measuring fuel added at the pump. Some cars read slightly optimistic.",
      },
      {
        question: "How many tanks should I track?",
        answer:
          "Three to five tanks is a reasonable start. More tanks give a better average across seasons and routes.",
      },
      {
        question: "What if I cannot fill the tank?",
        answer:
          "Use a consistent partial fill and record the exact amount, but expect more error. A full-to-full method is easier to trust.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Use your measured MPG to estimate real trip costs.",
    },
    related: ["commute-fuel-cost", "fuel-economy-vs-consumption", "tyre-pressure-fuel-economy"],
  },
];
