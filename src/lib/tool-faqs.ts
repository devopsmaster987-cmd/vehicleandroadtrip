export type ToolFaq = {
  question: string;
  answer: string;
};

const faqsByPath: Record<string, ToolFaq[]> = {
  "/tools/fuel-cost": [
    {
      question: "How do you calculate gas cost for a trip?",
      answer:
        "Divide the trip distance by the vehicle's fuel economy to get the fuel used, then multiply by the price per unit. In the US, gallons = miles ÷ MPG. In the UK, litres = miles ÷ MPG UK × 4.54609.",
    },
    {
      question: "How much does it cost to fill a car?",
      answer:
        "A full-tank cost is tank capacity multiplied by the price per litre or gallon. This calculator estimates fuel used for a journey, not a fill-up.",
    },
    {
      question: "Is it worth driving further for cheaper fuel?",
      answer:
        "Only if the price difference multiplied by the litres bought is greater than the cost of the extra distance. This page does not provide live station prices.",
    },
  ],
  "/tools/ev-charging-cost": [
    {
      question: "How much does it cost to charge an EV at home?",
      answer:
        "Multiply the grid energy needed by your domestic unit rate, then add any fixed charges you want to include. Battery size, charge added, efficiency and tariff all matter.",
    },
    {
      question: "How much does it cost to charge a Tesla at home?",
      answer:
        "Use the same formula with the usable capacity of the specific model and the percentage you need to add. RoadCost does not publish brand-specific battery sizes or tariffs.",
    },
    {
      question: "Is it cheaper to charge at home or in public?",
      answer:
        "Often, but not always. Compare the all-in home tariff with the public charger's per-kWh price, session fee, parking cost and membership.",
    },
    {
      question: "How long does it take to charge an EV?",
      answer:
        "Charging time is approximately energy needed divided by average charging power, with losses and tapering. This page calculates cost, not time.",
    },
  ],
  "/tools/ev-vs-petrol-cost": [
    {
      question: "Is an EV cheaper than petrol?",
      answer:
        "Not automatically. It depends on electricity price, charging location, vehicle efficiency, annual mileage and petrol price. This calculator shows both annual energy costs without assuming a winner.",
    },
    {
      question: "How do you calculate EV break-even?",
      answer:
        "Divide the EV purchase-price premium by the annual running-cost saving. A £5,000 premium and a £500 annual saving give a 10-year simple energy-only break-even.",
    },
    {
      question: "Should I include home charging losses?",
      answer:
        "Yes, if you want the cost of electricity purchased from the grid. The default 90% efficiency is an example, not a universal value.",
    },
    {
      question: "Does this work for a plug-in hybrid?",
      answer:
        "Only as a rough energy comparison. A plug-in hybrid uses both electricity and petrol, often at different rates depending on trip length and charge.",
    },
  ],
  "/tools/fuel-efficiency-converter": [
    {
      question: "How many MPG is 7 L/100 km?",
      answer: "7 L/100 km is about 40.35 MPG UK or 33.60 MPG US.",
    },
    {
      question: "How do you convert L/100 km to MPG?",
      answer:
        "Divide the correct constant by the L/100 km figure: 282.480936 for UK imperial MPG and 235.214583 for US MPG.",
    },
    {
      question: "Is 40 MPG good?",
      answer:
        "The number alone is incomplete. 40 MPG UK is about 7.06 L/100 km; 40 MPG US is about 5.88 L/100 km. Compare like-for-like test cycles.",
    },
    {
      question: "What is MPGe?",
      answer:
        "MPGe is the US EPA's miles-per-gallon-equivalent rating for electric vehicles using 33.7 kWh per gallon of gasoline equivalent. EPA MPGe includes charging losses.",
    },
  ],
  "/tools/kw-to-ps-hp": [
    {
      question: "How many hp is 100 kW?",
      answer:
        "100 kW is about 134.10 mechanical horsepower and about 135.96 metric horsepower (PS).",
    },
    {
      question: "How many kW is 150 hp?",
      answer:
        "150 mechanical horsepower is about 111.85 kW. If the figure is 150 PS instead, it is about 110.32 kW.",
    },
    {
      question: "Is PS the same as hp?",
      answer:
        "No. One PS is 735.49875 W; one mechanical hp is 745.6998716 W. They are close but not identical.",
    },
    {
      question: "How many kW is 300 bhp?",
      answer:
        "Using the mechanical horsepower factor, 300 bhp is about 223.71 kW. If the original figure was 300 PS, it would be about 220.65 kW.",
    },
  ],
};

export function getToolFaqs(path: string): ToolFaq[] {
  return faqsByPath[path] ?? [];
}
