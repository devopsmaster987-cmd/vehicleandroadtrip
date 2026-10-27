import type { Article } from "./types";

export const drivingArticles: Article[] = [
  {
    slug: "ac-fuel-economy",
    title: "Does air conditioning use more fuel?",
    description:
      "How car air conditioning affects fuel use, why speed changes the answer, and when open windows are the better choice.",
    category: "Driving",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Air conditioning is a comfort feature, but it is not free. It adds load to the engine or draws power from an electric battery. The effect is usually larger in city driving, where the engine is already working inefficiently.",
    quickAnswer:
      "Yes, air conditioning uses extra fuel or electricity. At low speeds, AC is often the main penalty. At highway speeds, open windows can increase drag enough that AC may be the better choice.",
    takeaways: [
      "AC adds load, especially in stop-start driving.",
      "Open windows can cost more at highway speed.",
      "Use recirculation and sensible temperature settings.",
    ],
    sections: [
      {
        heading: "Where the extra energy goes",
        paragraphs: [
          "In a petrol or diesel car, the AC compressor is driven by the engine. That takes power that would otherwise move the car. In an EV, the compressor and fans draw from the battery, which reduces range.",
          "The size of the penalty depends on the outside temperature, cabin size, sun load and the temperature you select. A very cold setting on a hot day asks more of the system.",
        ],
      },
      {
        heading: "City vs highway",
        paragraphs: [
          "At low speed, the engine is not working efficiently anyway, so the AC load is a larger share of total fuel use. At highway speed, aerodynamic drag dominates. Opening windows adds drag, which can cancel out the saving from switching the AC off.",
          "There is no universal crossover speed. It depends on the car. A practical rule is to use AC on the highway and open windows at low speed when comfort allows.",
        ],
      },
      {
        heading: "Practical habits",
        paragraphs: [
          "Park in shade, use a sunshade and open the windows briefly to release hot air before starting the AC. Use recirculation once the cabin is cool. Keep the filter clean and do not set the temperature lower than you need.",
        ],
        bullets: [
          "Pre-cool while plugged in if your EV supports it.",
          "Use seat heating in winter instead of maximum cabin heat when possible.",
          "Do not leave the AC on full blast with the windows open.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does AC use a lot of fuel?",
        answer:
          "It can, especially in city driving. The exact amount depends on the car, the weather and the setting.",
      },
      {
        question: "Is it better to open the windows?",
        answer:
          "At low speed, often yes. At highway speed, open windows can increase drag, so AC may be the better choice.",
      },
      {
        question: "Does climate control use more fuel than manual AC?",
        answer:
          "It can, because automatic systems may work harder to hold a set temperature. The difference is usually small compared with driving style.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "See how a change in real-world MPG affects trip cost.",
    },
    related: ["best-speed-fuel-economy", "city-vs-highway-mpg", "track-real-fuel-economy"],
  },
  {
    slug: "roof-box-fuel-economy",
    title: "Do roof boxes and roof racks increase fuel use?",
    description:
      "Why roof accessories add drag, how speed makes the effect worse, and how to measure the real cost on your own car.",
    category: "Driving",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "A roof box is useful, but it changes the shape of the car. That can increase aerodynamic drag, especially at highway speed. The effect is often larger than the weight of the box itself.",
    quickAnswer:
      "Yes. Roof boxes, roof racks and bike carriers can increase fuel use by adding drag. The effect grows with speed. Remove them when you do not need them and measure a before-and-after tank if you want a real number.",
    takeaways: [
      "Aerodynamic drag matters more than the box's weight at speed.",
      "The penalty grows as speed rises.",
      "A measured before/after tank is the most reliable estimate.",
    ],
    sections: [
      {
        heading: "Why drag matters",
        paragraphs: [
          "At highway speed, most of the engine's work goes into pushing air out of the way. A roof box adds frontal area and can create turbulence. Even a streamlined box changes the airflow over the car.",
          "A roof rack without a box can also create drag. Empty bars are not neutral, which is why removing them between trips helps.",
        ],
      },
      {
        heading: "Measure it on your car",
        paragraphs: [
          "There is no single percentage that applies to every car and box. If the cost matters, measure it: record fuel use on a similar route without the box, then repeat with it fitted. Keep speed, load and weather as similar as you can.",
          "For a trip estimate, use a slightly conservative MPG figure and add a buffer. That is safer than assuming the box has no effect.",
        ],
      },
      {
        heading: "Practical tips",
        paragraphs: [
          "Choose a box that fits the car and is installed correctly. Remove it when not in use. Slow down a little on the highway; drag rises quickly with speed. Do not exceed the roof load limit.",
        ],
        bullets: [
          "Remove empty bars and boxes between trips.",
          "Check the roof load limit and fitting instructions.",
          "Use a conservative MPG for a loaded holiday trip.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a roof box affect MPG?",
        answer:
          "It varies by car, box, speed and weather. The effect can be noticeable on the highway, so a measured before/after tank is the best guide.",
      },
      {
        question: "Is a rear bike rack better than a roof rack?",
        answer:
          "It can be, because it may disturb the airflow less. It still adds weight and can affect handling, so check the vehicle and rack limits.",
      },
      {
        question: "Does a roof box matter in city driving?",
        answer:
          "The aerodynamic effect is smaller at low speed, but the extra weight and any stop-start traffic can still raise fuel use.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Estimate a loaded trip with a more realistic MPG.",
    },
    related: ["ac-fuel-economy", "best-speed-fuel-economy", "road-trip-fuel-budget"],
  },
  {
    slug: "tyre-pressure-fuel-economy",
    title: "Tyre pressure and fuel economy",
    description:
      "How under-inflated tyres affect rolling resistance, how to check pressure correctly, and why over-inflating is not a free fix.",
    category: "Driving",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Tyres are the only part of the car in contact with the road. If they are under-inflated, they flex more and create more rolling resistance. That can increase fuel use and wear.",
    quickAnswer:
      "Under-inflated tyres can raise fuel use because they increase rolling resistance. Check the pressure on the door placard when the tyres are cold, and use the vehicle manufacturer's figure.",
    takeaways: [
      "Low pressure increases rolling resistance.",
      "Check pressure cold and use the door placard.",
      "Over-inflating is not a safe fuel-saving shortcut.",
    ],
    sections: [
      {
        heading: "What rolling resistance means",
        paragraphs: [
          "A tyre deforms as it rolls. More flex means more energy lost as heat. Keeping the tyre at the recommended pressure reduces that flex without making the tyre too hard.",
          "Pressure also affects grip, braking and wear. The goal is the recommended pressure, not the maximum printed on the sidewall.",
        ],
      },
      {
        heading: "How to check it",
        paragraphs: [
          "Check when the tyres are cold, before a long drive or after the car has been parked for a few hours. Use the placard in the driver's door jamb or fuel-filler flap, not the sidewall maximum.",
          "Check all four tyres and the spare if you have one. A slow puncture can hide as a small monthly pressure loss.",
        ],
      },
      {
        heading: "The fuel-saving limit",
        paragraphs: [
          "Correct pressure helps, but it will not transform a thirsty car. Driving style, speed and route usually matter more. Do not over-inflate to chase a small saving; it can reduce grip and cause uneven wear.",
        ],
        bullets: [
          "Check monthly and before long trips.",
          "Adjust for heavy loads if the placard gives a loaded pressure.",
          "Replace damaged valves or tyres that keep losing pressure.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does low tyre pressure waste fuel?",
        answer:
          "Yes, under-inflation increases rolling resistance, so the engine has to work harder to keep the car moving.",
      },
      {
        question: "Should I use the maximum pressure on the sidewall?",
        answer:
          "No. Use the vehicle manufacturer's recommended pressure on the door placard or fuel flap.",
      },
      {
        question: "How often should I check tyre pressure?",
        answer: "About once a month and before a long trip is a practical routine.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "See how a change in real MPG affects your fuel budget.",
    },
    related: ["track-real-fuel-economy", "ac-fuel-economy", "best-speed-fuel-economy"],
  },
  {
    slug: "idling-fuel-use",
    title: "Does idling waste fuel?",
    description:
      "Why idling is inefficient, when switching off makes sense, and how idling affects a simple fuel-cost estimate.",
    category: "Driving",
    readingTime: "3 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "An idling engine burns fuel while the car covers no distance. In fuel-economy terms, that is the worst possible return: fuel is being used, but the distance counter does not move.",
    quickAnswer:
      "Yes, idling wastes fuel. Switch off where it is safe and legal, especially for longer waits. Modern cars do not need a long warm-up idle before gentle driving.",
    takeaways: [
      "Idling uses fuel for zero distance.",
      "Long waits are the clearest case for switching off.",
      "Warm up by driving gently, not by idling for minutes.",
    ],
    sections: [
      {
        heading: "Why idling is inefficient",
        paragraphs: [
          "A moving car converts fuel into distance. An idling car converts fuel into heat, noise and accessory power. The exact amount depends on engine size, climate control and electrical load, but the efficiency is poor by definition.",
          "In stop-start traffic, idling can be a meaningful share of a commute. In a drive-through queue or a long wait, it is pure waste unless you need the engine for heating, cooling or safety.",
        ],
      },
      {
        heading: "When to switch off",
        paragraphs: [
          "Switch off if you are parked safely and legally and expect to wait more than a short time. Do not switch off in traffic if it would reduce safety or interfere with the car's systems. Follow local rules and the vehicle handbook.",
          "Many modern cars have automatic stop-start. It is designed to shut the engine down when the car is stationary and restart quickly when needed.",
        ],
      },
      {
        heading: "Warming up",
        paragraphs: [
          "A long idle is not the best way to warm up a modern car. Gentle driving brings the engine and other systems up to temperature more efficiently. Use the demister and heated seats as needed, but avoid a long stationary warm-up unless the handbook says otherwise.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much fuel does idling use?",
        answer:
          "It varies with engine size and accessories. The important point is that it uses fuel while covering no distance, so it lowers effective MPG.",
      },
      {
        question: "Does stop-start wear out the starter?",
        answer:
          "Cars with stop-start are designed for it, with upgraded starters and batteries. Follow the manufacturer's maintenance schedule.",
      },
      {
        question: "Should I warm up my car in winter?",
        answer:
          "A short period to clear the windscreen is reasonable. Long idling is usually unnecessary for a modern car.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Estimate the fuel cost of the distance you actually drive.",
    },
    related: ["city-vs-highway-mpg", "ac-fuel-economy", "track-real-fuel-economy"],
  },
  {
    slug: "best-speed-fuel-economy",
    title: "What is the most fuel-efficient speed?",
    description:
      "Why there is no universal magic speed, how aerodynamic drag changes the picture, and how to find an efficient pace for your car.",
    category: "Driving",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Drivers often look for a single speed that saves fuel. In reality, the best speed depends on the car, the gearbox, the load and the road. The useful principle is simpler: smooth, steady driving at a moderate speed usually beats aggressive high-speed driving.",
    quickAnswer:
      "There is no single best speed for every car. Fuel use per distance usually rises at high speed because aerodynamic drag increases. A steady moderate speed and smooth acceleration matter more than a magic number.",
    takeaways: [
      "Drag rises quickly with speed.",
      "Smooth driving saves more than a fixed speed target.",
      "Your car's best pace depends on gearing and load.",
    ],
    sections: [
      {
        heading: "The physics in plain English",
        paragraphs: [
          "At low speed, engine and rolling losses dominate. At high speed, air resistance becomes the biggest cost. That is why fuel use per distance often falls as you move away from stop-start traffic, then rises again at motorway speeds.",
          "The curve is not the same for every car. A small hatchback, a large SUV and an EV have different sweet spots.",
        ],
      },
      {
        heading: "Smoothness beats a number",
        paragraphs: [
          "Hard acceleration, late braking and constant speed changes waste energy. Looking ahead, keeping a steady pace and using the highest sensible gear can save more than chasing a specific speed.",
          "Cruise control can help on flat, steady highways. On hilly roads, it may hold speed in a way that uses more fuel than letting the car slow slightly uphill.",
        ],
        bullets: [
          "Accelerate smoothly and read the road ahead.",
          "Avoid unnecessary lane changes and hard braking.",
          "Use cruise control mainly on steady, flat routes.",
        ],
      },
      {
        heading: "Find your own baseline",
        paragraphs: [
          "Use the tank-to-tank method on a repeated route. Try a steady moderate speed and compare it with your normal driving. That gives you a real answer for your car instead of a generic claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 55 mph the most efficient speed?",
        answer:
          "Not necessarily. It may be close for some cars, but gearing, drag, load and conditions change the answer.",
      },
      {
        question: "Does cruise control save fuel?",
        answer:
          "It can on steady, flat highways. On hills or in traffic, it may not be the most efficient choice.",
      },
      {
        question: "Is slower always better?",
        answer:
          "No. Very low speeds in stop-start traffic can be inefficient. The best pace is usually a steady moderate speed.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Compare trip costs at different real-world MPG figures.",
    },
    related: ["ac-fuel-economy", "roof-box-fuel-economy", "city-vs-highway-mpg"],
  },
  {
    slug: "towing-fuel-economy",
    title: "Towing and fuel economy",
    description:
      "Understand how trailers affect fuel use, why drag matters, and how to budget for a towing trip with a realistic MPG.",
    category: "Driving",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "Towing adds weight, but weight is only part of the story. A trailer also adds frontal area and can create turbulence. At highway speed, that aerodynamic penalty can be more important than the trailer's mass.",
    quickAnswer:
      "Use a measured towing MPG, not the car's solo figure. Towing adds weight and drag, and the effect grows with speed. Add a buffer to your fuel budget and check the vehicle's towing limits.",
    takeaways: [
      "Drag can matter more than weight at speed.",
      "Solo MPG is not a safe towing estimate.",
      "Check payload, nose weight and legal limits.",
    ],
    sections: [
      {
        heading: "Weight and drag",
        paragraphs: [
          "Weight increases the energy needed to accelerate and climb hills. Drag increases the energy needed to push through the air. A boxy trailer or a loaded roof rack can make the drag penalty large.",
          "The effect is speed-dependent. A trailer that feels stable at 50 mph may cost much more fuel at 70 mph.",
        ],
      },
      {
        heading: "Build a realistic estimate",
        paragraphs: [
          "If you have towed before, use the measured MPG from that trip. If not, start with a conservative figure and add a buffer. A loaded tow is not the moment to rely on the best-case brochure number.",
        ],
        formula:
          "fuel used = towing distance ÷ towing MPG\nfuel cost = fuel used × price per unit\nbudget = fuel cost + buffer",
      },
      {
        heading: "Safety comes first",
        paragraphs: [
          "Fuel economy is secondary to stability and legality. Check the vehicle's towing capacity, nose weight, tyre pressures and trailer brakes. Secure the load and follow local speed limits for towing.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does towing reduce MPG?",
        answer:
          "It depends on the trailer, load, speed and vehicle. The only reliable estimate is a measured towing figure for your setup.",
      },
      {
        question: "Can I use the car's normal MPG?",
        answer:
          "No. A solo MPG figure will usually make a towing trip look cheaper than it is.",
      },
      {
        question: "Does speed matter more when towing?",
        answer:
          "Yes. Drag rises with speed, and towing often adds a large frontal area. Slower, steady driving usually helps.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Use a conservative towing MPG for the route.",
    },
    related: ["roof-box-fuel-economy", "best-speed-fuel-economy", "road-trip-fuel-budget"],
  },
  {
    slug: "city-vs-highway-mpg",
    title: "City vs highway MPG explained",
    description:
      "Compare city and highway fuel use for petrol cars, hybrids and EVs, and choose the right figure for your route.",
    category: "Driving",
    readingTime: "4 min read",
    published: "2026-10-27",
    updated: "2026-10-27",
    intro:
      "City and highway MPG are not just two versions of the same number. They describe different driving patterns. The one that matters depends on where and how you drive.",
    quickAnswer:
      "Petrol and diesel cars often do better on the highway. Hybrids often do better in the city. EVs usually use more energy per distance at high speed. Use a figure that matches your actual route.",
    takeaways: [
      "City and highway figures can tell different stories.",
      "Hybrids and EVs change the usual pattern.",
      "A mixed route needs a combined or measured figure.",
    ],
    sections: [
      {
        heading: "Petrol and diesel",
        paragraphs: [
          "In stop-start traffic, the engine idles, accelerates and brakes repeatedly. On a steady highway cruise, the engine can work in a more efficient range. That is why many petrol and diesel cars have higher highway MPG.",
          "Very high highway speeds can reverse the advantage because aerodynamic drag grows. The best highway speed is not automatically the fastest.",
        ],
      },
      {
        heading: "Hybrids and EVs",
        paragraphs: [
          "A hybrid can recover braking energy and run on electricity at low speed, so city driving can be its strong point. A plug-in hybrid's real result depends heavily on whether you charge it.",
          "An EV uses more energy per distance at high speed because drag rises. Cold weather can also reduce range. City driving is often kinder to an EV than a high-speed motorway run.",
        ],
      },
      {
        heading: "Choose the right number",
        paragraphs: [
          "For a commute, use a city or combined figure. For a long highway trip, a highway figure is more relevant. If you have measured your own tank-to-tank economy on a similar route, use that instead of any label.",
        ],
        bullets: [
          "Do not compare a city figure with a highway figure.",
          "Use a measured number for your own route.",
          "Keep the unit and gallon definition visible.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is highway MPG usually higher?",
        answer:
          "Steady cruising avoids repeated stops and allows the engine to work efficiently. Very high speeds can reduce the advantage.",
      },
      {
        question: "Is city MPG better for hybrids?",
        answer:
          "Often yes, because hybrids can recover braking energy and use electric power at low speed.",
      },
      {
        question: "Which figure should I use for a commute?",
        answer:
          "Use a city or combined figure, or your own measured economy if you have it.",
      },
    ],
    tool: {
      href: "/tools/fuel-cost",
      name: "Fuel cost calculator",
      description: "Compare costs with the MPG that matches your route.",
    },
    related: ["idling-fuel-use", "ac-fuel-economy", "commute-fuel-cost"],
  },
];
