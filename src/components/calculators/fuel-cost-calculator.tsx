"use client";

import { useState } from "react";
import {
  CalculatorLayout,
  CheckboxInput,
  ExampleTag,
  InputError,
  NumberInput,
  ResultPanel,
  ResultStat,
  SelectInput,
} from "@/components/calculator-ui";
import {
  IMPERIAL_GALLON_LITRES,
  US_GALLON_LITRES,
  calculateFuelCost,
  type FuelCostResult,
  type Market,
} from "@/lib/calculations";
import { currencyForMarket, formatMoney, formatNumber, parseLocalizedNumber } from "@/lib/format";

const examples: Record<Market, { distance: string; economy: string; price: string }> = {
  uk: { distance: "100", economy: "50", price: "145" },
  us: { distance: "300", economy: "30", price: "3.50" },
  eu: { distance: "500", economy: "6,5", price: "1,75" },
  ch: { distance: "500", economy: "6,5", price: "1,75" },
  jp: { distance: "300", economy: "15", price: "170" },
  in: { distance: "300", economy: "18", price: "100" },
  kr: { distance: "300", economy: "13", price: "1700" },
  au: { distance: "300", economy: "8", price: "1.80" },
};

const marketLabels: Record<Market, string> = {
  uk: "UK — miles, MPG UK, p/litre",
  us: "US — miles, MPG US, $/gal",
  eu: "Europe — km, L/100km, €/litre",
  ch: "Switzerland — km, L/100km, CHF/l",
  jp: "Japan — km, km/L, ¥/litre",
  in: "India — km, km/L, ₹/litre",
  kr: "South Korea — km, km/L, ₩/litre",
  au: "Australia — km, L/100km, A$/l",
};

function labelsFor(market: Market) {
  if (market === "uk") {
    return {
      distance: "Distance (one way)",
      distanceSuffix: "mi",
      economy: "Fuel economy",
      economySuffix: "MPG UK",
      price: "Fuel price",
      priceSuffix: "p/litre",
      priceHint: "Use pence per litre: 145 means £1.45 per litre.",
      distanceHint: "UK odometer distances are in miles.",
    };
  }
  if (market === "us") {
    return {
      distance: "Distance (one way)",
      distanceSuffix: "mi",
      economy: "Fuel economy",
      economySuffix: "MPG US",
      price: "Gas price",
      priceSuffix: "$/US gal",
      priceHint: "Use US dollars per US gallon, for example 3.50.",
      distanceHint: "US road distances are in miles.",
    };
  }
  if (market === "ch") {
    return {
      distance: "Distance (one way)",
      distanceSuffix: "km",
      economy: "Fuel consumption",
      economySuffix: "L/100 km",
      price: "Fuel price",
      priceSuffix: "CHF/litre",
      priceHint: "Use Swiss francs per litre, for example 1,75.",
      distanceHint: "Swiss road distances are in kilometres.",
    };
  }
  if (market === "jp") {
    return {
      distance: "Distance (one way)",
      distanceSuffix: "km",
      economy: "Fuel economy",
      economySuffix: "km/L",
      price: "Fuel price",
      priceSuffix: "¥/litre",
      priceHint: "Use yen per litre: 170 means ¥170 per litre.",
      distanceHint: "Japanese road distances are in kilometres.",
    };
  }
  if (market === "in") {
    return {
      distance: "Distance (one way)",
      distanceSuffix: "km",
      economy: "Fuel economy",
      economySuffix: "km/L",
      price: "Fuel price",
      priceSuffix: "₹/litre",
      priceHint: "Use Indian rupees per litre: 100 means ₹100 per litre.",
      distanceHint: "Indian road distances are in kilometres.",
    };
  }
  if (market === "kr") {
    return {
      distance: "Distance (one way)",
      distanceSuffix: "km",
      economy: "Fuel economy",
      economySuffix: "km/L",
      price: "Fuel price",
      priceSuffix: "₩/litre",
      priceHint: "Use South Korean won per litre: 1700 means ₩1,700 per litre.",
      distanceHint: "South Korean road distances are in kilometres.",
    };
  }
  if (market === "au") {
    return {
      distance: "Distance (one way)",
      distanceSuffix: "km",
      economy: "Fuel consumption",
      economySuffix: "L/100 km",
      price: "Fuel price",
      priceSuffix: "A$/litre",
      priceHint: "Use Australian dollars per litre: 1.80 means A$1.80 per litre.",
      distanceHint: "Australian road distances are in kilometres.",
    };
  }
  return {
    distance: "Distance (one way)",
    distanceSuffix: "km",
    economy: "Fuel consumption",
    economySuffix: "L/100 km",
    price: "Fuel price",
    priceSuffix: "€/litre",
    priceHint: "Use euros per litre, for example 1,75.",
    distanceHint: "European road distances are normally in kilometres.",
  };
}

type CostState =
  | { result: FuelCostResult; errors?: undefined }
  | { result?: undefined; errors: { distance?: string; economy?: string; price?: string; general?: string } };

export function FuelCostCalculator() {
  const [market, setMarket] = useState<Market>("uk");
  const [distance, setDistance] = useState(examples.uk.distance);
  const [economy, setEconomy] = useState(examples.uk.economy);
  const [price, setPrice] = useState(examples.uk.price);
  const [roundTrip, setRoundTrip] = useState(false);

  const labels = labelsFor(market);
  const currency = currencyForMarket(market);

  const state: CostState = (() => {
    const d = parseLocalizedNumber(distance, market);
    const e = parseLocalizedNumber(economy, market);
    const p = parseLocalizedNumber(price, market);
    const errors: { distance?: string; economy?: string; price?: string; general?: string } = {};

    if (d === null) errors.distance = "Enter a number.";
    else if (d <= 0) errors.distance = "Distance must be greater than zero.";

    if (e === null) errors.economy = "Enter a number.";
    else if (e <= 0) errors.economy = "Fuel economy must be greater than zero.";

    if (p === null) errors.price = "Enter a number.";
    else if (p < 0) errors.price = "Fuel price cannot be negative.";

    if (Object.keys(errors).length > 0) return { errors };

    try {
      return {
        result: calculateFuelCost({
          market,
          distance: d as number,
          economy: e as number,
          fuelPrice: p as number,
          roundTrip,
        }),
      };
    } catch (error) {
      return {
        errors: {
          general: error instanceof Error ? error.message : "Check the values and try again.",
        },
      };
    }
  })();

  function changeMarket(next: Market) {
    setMarket(next);
    setDistance(examples[next].distance);
    setEconomy(examples[next].economy);
    setPrice(examples[next].price);
    setRoundTrip(false);
  }

  const result = state.result;
  const errors = state.errors;

  return (
    <CalculatorLayout
      inputs={
        <>
          <SelectInput
            id="fuel-cost-market"
            label="Market and units"
            value={market}
            onChange={changeMarket}
            options={(Object.keys(marketLabels) as Market[]).map((key) => ({
              value: key,
              label: marketLabels[key],
            }))}
            hint="Changing market resets the example values so the units cannot silently carry over."
          />
          <NumberInput
            id="fuel-cost-distance"
            label={labels.distance}
            value={distance}
            onChange={setDistance}
            suffix={labels.distanceSuffix}
            hint={labels.distanceHint}
            error={errors?.distance}
          />
          <CheckboxInput
            id="fuel-cost-round-trip"
            label="Round trip (there and back)"
            checked={roundTrip}
            onChange={setRoundTrip}
            hint="Leave unticked for a one-way estimate."
          />
          <NumberInput
            id="fuel-cost-economy"
            label={labels.economy}
            value={economy}
            onChange={setEconomy}
            suffix={labels.economySuffix}
            error={errors?.economy}
          />
          <NumberInput
            id="fuel-cost-price"
            label={labels.price}
            value={price}
            onChange={setPrice}
            suffix={labels.priceSuffix}
            hint={labels.priceHint}
            error={errors?.price}
          />
          <ExampleTag>
            These starting values are illustrative, not current prices. Replace them with the
            price and consumption you actually have.
          </ExampleTag>
        </>
      }
      results={
        result ? (
          <ResultPanel
            title="Trip fuel estimate"
            totalLabel="Estimated fuel cost"
            totalValue={formatMoney(result.totalCost, currency)}
            totalSub={`${formatNumber(result.billableDistance, 1)} ${result.distanceUnit} of driving${
              roundTrip ? " (round trip)" : " (one way)"
            }.`}
            stats={
              <>
                <ResultStat
                  label="Fuel used"
                  value={`${formatNumber(result.fuelUsedLitres, 2)} L`}
                  sublabel={
                    market === "uk"
                      ? `≈ ${formatNumber(result.fuelUsedLitres / IMPERIAL_GALLON_LITRES, 2)} imperial gal`
                      : market === "us"
                        ? `≈ ${formatNumber(result.fuelUsedLitres / US_GALLON_LITRES, 2)} US gal`
                        : "Litres"
                  }
                  emphasis
                />
                <ResultStat
                  label="Cost per mile"
                  value={formatMoney(result.costPerMile, currency, 3)}
                  emphasis
                />
                <ResultStat
                  label="Cost per km"
                  value={formatMoney(result.costPerKm, currency, 3)}
                />
                <ResultStat
                  label="Cost per 100 km"
                  value={formatMoney(result.costPer100Km, currency, 2)}
                />
              </>
            }
            footer="Fuel only. Tolls, parking, ferry fares, maintenance and driving-style effects are not included. The price you enter is the only price used."
          />
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-ink">Results will appear here.</p>
            <InputError>{errors?.general ?? "Check the highlighted fields."}</InputError>
          </div>
        )
      }
    />
  );
}
