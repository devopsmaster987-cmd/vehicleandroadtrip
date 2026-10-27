"use client";

import { useState } from "react";
import {
  CalculatorLayout,
  ExampleTag,
  InputError,
  NumberInput,
  ResultPanel,
  ResultStat,
  SelectInput,
} from "@/components/calculator-ui";
import {
  calculateEvVsPetrol,
  type EvVsPetrolResult,
  type Market,
} from "@/lib/calculations";
import { currencyForMarket, formatMoney, formatNumber, parseLocalizedNumber } from "@/lib/format";

type Example = {
  annualDistance: string;
  petrolEconomy: string;
  petrolPrice: string;
  evEconomy: string;
  electricityPrice: string;
  efficiency: string;
  gap: string;
};

const examples: Record<Market, Example> = {
  uk: {
    annualDistance: "10000",
    petrolEconomy: "50",
    petrolPrice: "145",
    evEconomy: "3.5",
    electricityPrice: "25",
    efficiency: "90",
    gap: "0",
  },
  us: {
    annualDistance: "12000",
    petrolEconomy: "30",
    petrolPrice: "3.50",
    evEconomy: "3.5",
    electricityPrice: "17",
    efficiency: "90",
    gap: "0",
  },
  eu: {
    annualDistance: "15.000",
    petrolEconomy: "6,5",
    petrolPrice: "1,75",
    evEconomy: "17",
    electricityPrice: "0,35",
    efficiency: "90",
    gap: "0",
  },
  ch: {
    annualDistance: "15.000",
    petrolEconomy: "6,5",
    petrolPrice: "1,75",
    evEconomy: "17",
    electricityPrice: "0,35",
    efficiency: "90",
    gap: "0",
  },
  jp: {
    annualDistance: "300",
    petrolEconomy: "13",
    petrolPrice: "170",
    evEconomy: "17",
    electricityPrice: "30",
    efficiency: "90",
    gap: "0",
  },
  in: {
    annualDistance: "300",
    petrolEconomy: "18",
    petrolPrice: "100",
    evEconomy: "17",
    electricityPrice: "8",
    efficiency: "90",
    gap: "0",
  },
  kr: {
    annualDistance: "300",
    petrolEconomy: "12",
    petrolPrice: "1700",
    evEconomy: "17",
    electricityPrice: "300",
    efficiency: "90",
    gap: "0",
  },
  au: {
    annualDistance: "300",
    petrolEconomy: "8",
    petrolPrice: "1.80",
    evEconomy: "17",
    electricityPrice: "0.35",
    efficiency: "90",
    gap: "0",
  },
};

function labelsFor(market: Market) {
  if (market === "uk") {
    return {
      distance: "Annual distance",
      distanceSuffix: "mi",
      petrolEconomy: "Petrol economy",
      petrolEconomySuffix: "MPG UK",
      petrolPrice: "Petrol price",
      petrolPriceSuffix: "p/litre",
      evEconomy: "Battery-side EV efficiency",
      evEconomySuffix: "mi/kWh",
      electricityPrice: "Electricity price",
      electricityPriceSuffix: "p/kWh",
      gap: "Purchase price difference",
      gapSuffix: "£",
      gapHint: "EV purchase price minus petrol purchase price. Leave 0 to skip break-even.",
    };
  }
  if (market === "us") {
    return {
      distance: "Annual distance",
      distanceSuffix: "mi",
      petrolEconomy: "Gas economy",
      petrolEconomySuffix: "MPG US",
      petrolPrice: "Gas price",
      petrolPriceSuffix: "$/US gal",
      evEconomy: "Battery-side EV efficiency",
      evEconomySuffix: "mi/kWh",
      electricityPrice: "Electricity price",
      electricityPriceSuffix: "¢/kWh",
      gap: "Purchase price difference",
      gapSuffix: "$",
      gapHint: "EV purchase price minus gas-car purchase price. Leave 0 to skip break-even.",
    };
  }
  if (market === "ch") {
    return {
      distance: "Annual distance",
      distanceSuffix: "km",
      petrolEconomy: "Petrol consumption",
      petrolEconomySuffix: "L/100 km",
      petrolPrice: "Petrol price",
      petrolPriceSuffix: "CHF/litre",
      evEconomy: "Battery-side EV consumption",
      evEconomySuffix: "kWh/100 km",
      electricityPrice: "Electricity price",
      electricityPriceSuffix: "CHF/kWh",
      gap: "Purchase price difference",
      gapSuffix: "CHF",
      gapHint: "EV purchase price minus petrol purchase price. Leave 0 to skip break-even.",
    };
  }
  if (market === "jp") {
    return {
      distance: "Annual distance",
      distanceSuffix: "km",
      petrolEconomy: "Petrol economy",
      petrolEconomySuffix: "km/L",
      petrolPrice: "Petrol price",
      petrolPriceSuffix: "¥/litre",
      evEconomy: "Battery-side EV consumption",
      evEconomySuffix: "kWh/100 km",
      electricityPrice: "Electricity price",
      electricityPriceSuffix: "¥/kWh",
      gap: "Purchase price difference",
      gapSuffix: "¥",
      gapHint: "EV purchase price minus petrol purchase price. Leave 0 to skip break-even.",
    };
  }
  if (market === "in") {
    return {
      distance: "Annual distance",
      distanceSuffix: "km",
      petrolEconomy: "Petrol economy",
      petrolEconomySuffix: "km/L",
      petrolPrice: "Petrol price",
      petrolPriceSuffix: "₹/litre",
      evEconomy: "Battery-side EV consumption",
      evEconomySuffix: "kWh/100 km",
      electricityPrice: "Electricity price",
      electricityPriceSuffix: "₹/kWh",
      gap: "Purchase price difference",
      gapSuffix: "₹",
      gapHint: "EV purchase price minus petrol purchase price. Leave 0 to skip break-even.",
    };
  }
  if (market === "kr") {
    return {
      distance: "Annual distance",
      distanceSuffix: "km",
      petrolEconomy: "Petrol economy",
      petrolEconomySuffix: "km/L",
      petrolPrice: "Petrol price",
      petrolPriceSuffix: "₩/litre",
      evEconomy: "Battery-side EV consumption",
      evEconomySuffix: "kWh/100 km",
      electricityPrice: "Electricity price",
      electricityPriceSuffix: "₩/kWh",
      gap: "Purchase price difference",
      gapSuffix: "₩",
      gapHint: "EV purchase price minus petrol purchase price. Leave 0 to skip break-even.",
    };
  }
  if (market === "au") {
    return {
      distance: "Annual distance",
      distanceSuffix: "km",
      petrolEconomy: "Petrol consumption",
      petrolEconomySuffix: "L/100 km",
      petrolPrice: "Petrol price",
      petrolPriceSuffix: "A$/litre",
      evEconomy: "Battery-side EV consumption",
      evEconomySuffix: "kWh/100 km",
      electricityPrice: "Electricity price",
      electricityPriceSuffix: "A$/kWh",
      gap: "Purchase price difference",
      gapSuffix: "A$",
      gapHint: "EV purchase price minus petrol purchase price. Leave 0 to skip break-even.",
    };
  }
  return {
    distance: "Annual distance",
    distanceSuffix: "km",
    petrolEconomy: "Petrol consumption",
    petrolEconomySuffix: "L/100 km",
    petrolPrice: "Petrol price",
    petrolPriceSuffix: "€/litre",
    evEconomy: "Battery-side EV consumption",
    evEconomySuffix: "kWh/100 km",
    electricityPrice: "Electricity price",
    electricityPriceSuffix: "€/kWh",
    gap: "Purchase price difference",
    gapSuffix: "€",
    gapHint: "EV purchase price minus petrol purchase price. Leave 0 to skip break-even.",
  };
}

type ComparisonState =
  | { result: EvVsPetrolResult; errors?: undefined }
  | {
      result?: undefined;
      errors: {
        distance?: string;
        petrolEconomy?: string;
        petrolPrice?: string;
        evEconomy?: string;
        electricityPrice?: string;
        efficiency?: string;
        gap?: string;
        general?: string;
      };
    };

export function EvVsPetrolCalculator() {
  const [market, setMarket] = useState<Market>("uk");
  const [annualDistance, setAnnualDistance] = useState(examples.uk.annualDistance);
  const [petrolEconomy, setPetrolEconomy] = useState(examples.uk.petrolEconomy);
  const [petrolPrice, setPetrolPrice] = useState(examples.uk.petrolPrice);
  const [evEconomy, setEvEconomy] = useState(examples.uk.evEconomy);
  const [electricityPrice, setElectricityPrice] = useState(examples.uk.electricityPrice);
  const [efficiency, setEfficiency] = useState(examples.uk.efficiency);
  const [gap, setGap] = useState(examples.uk.gap);

  const labels = labelsFor(market);
  const currency = currencyForMarket(market);

  const state: ComparisonState = (() => {
    const distance = parseLocalizedNumber(annualDistance, market);
    const petrolEcon = parseLocalizedNumber(petrolEconomy, market);
    const petrolCost = parseLocalizedNumber(petrolPrice, market);
    const evEcon = parseLocalizedNumber(evEconomy, market);
    const electricity = parseLocalizedNumber(electricityPrice, market);
    const eff = parseLocalizedNumber(efficiency, market);
    const gapValue = gap.trim() === "" ? 0 : parseLocalizedNumber(gap, market);
    const errors: {
      distance?: string;
      petrolEconomy?: string;
      petrolPrice?: string;
      evEconomy?: string;
      electricityPrice?: string;
      efficiency?: string;
      gap?: string;
      general?: string;
    } = {};

    if (distance === null) errors.distance = "Enter a number.";
    else if (distance <= 0) errors.distance = "Annual distance must be greater than zero.";

    if (petrolEcon === null) errors.petrolEconomy = "Enter a number.";
    else if (petrolEcon <= 0) errors.petrolEconomy = "Petrol economy must be greater than zero.";

    if (petrolCost === null) errors.petrolPrice = "Enter a number.";
    else if (petrolCost < 0) errors.petrolPrice = "Petrol price cannot be negative.";

    if (evEcon === null) errors.evEconomy = "Enter a number.";
    else if (evEcon <= 0) errors.evEconomy = "EV efficiency must be greater than zero.";

    if (electricity === null) errors.electricityPrice = "Enter a number.";
    else if (electricity < 0) errors.electricityPrice = "Electricity price cannot be negative.";

    if (eff === null) errors.efficiency = "Enter a number.";
    else if (eff <= 0 || eff > 100) {
      errors.efficiency = "Efficiency must be greater than 0 and no more than 100.";
    }

    if (gapValue === null) errors.gap = "Enter a number or leave blank.";
    else if (gapValue < 0) errors.gap = "Price difference cannot be negative.";

    if (Object.keys(errors).length > 0) return { errors };

    try {
      return {
        result: calculateEvVsPetrol({
          market,
          annualDistance: distance as number,
          petrolEconomy: petrolEcon as number,
          petrolPrice: petrolCost as number,
          evEconomy: evEcon as number,
          electricityPrice: electricity as number,
          chargingEfficiencyPct: eff as number,
          upfrontPriceDifference: (gapValue ?? 0) as number,
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
    setAnnualDistance(examples[next].annualDistance);
    setPetrolEconomy(examples[next].petrolEconomy);
    setPetrolPrice(examples[next].petrolPrice);
    setEvEconomy(examples[next].evEconomy);
    setElectricityPrice(examples[next].electricityPrice);
    setEfficiency(examples[next].efficiency);
    setGap(examples[next].gap);
  }

  const result = state.result;
  const errors = state.errors;
  const saving = result ? result.annualDifference : 0;
  const totalLabel =
    saving > 0
      ? "Estimated annual saving with the EV"
      : saving < 0
        ? "Estimated extra annual cost with the EV"
        : "Annual running costs are equal";
  const totalValue =
    result && saving !== 0 ? formatMoney(Math.abs(saving), currency) : result ? formatMoney(0, currency) : "—";

  return (
    <CalculatorLayout
      inputs={
        <>
          <SelectInput
            id="ev-vs-market"
            label="Market and units"
            value={market}
            onChange={changeMarket}
            options={[
              { value: "uk", label: "UK — miles, MPG UK, pence" },
              { value: "us", label: "US — miles, MPG US, dollars" },
              { value: "eu", label: "Europe — km, L/100km, euros" },
              { value: "ch", label: "Switzerland — km, L/100km, CHF" },
              { value: "jp", label: "Japan — km, km/L, yen" },
              { value: "in", label: "India — km, km/L, rupees" },
              { value: "kr", label: "South Korea — km, km/L, won" },
              { value: "au", label: "Australia — km, L/100km, A$" },
            ]}
            hint="Changing market resets the example values so the units cannot silently carry over."
          />
          <NumberInput
            id="ev-vs-distance"
            label={labels.distance}
            value={annualDistance}
            onChange={setAnnualDistance}
            suffix={labels.distanceSuffix}
            error={errors?.distance}
          />
          <div className="rounded-lg border border-line bg-paper/60 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Petrol side</p>
            <div className="mt-3 space-y-4">
              <NumberInput
                id="ev-vs-petrol-economy"
                label={labels.petrolEconomy}
                value={petrolEconomy}
                onChange={setPetrolEconomy}
                suffix={labels.petrolEconomySuffix}
                error={errors?.petrolEconomy}
              />
              <NumberInput
                id="ev-vs-petrol-price"
                label={labels.petrolPrice}
                value={petrolPrice}
                onChange={setPetrolPrice}
                suffix={labels.petrolPriceSuffix}
                error={errors?.petrolPrice}
              />
            </div>
          </div>
          <div className="rounded-lg border border-line bg-paper/60 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">EV side</p>
            <div className="mt-3 space-y-4">
              <NumberInput
                id="ev-vs-ev-economy"
                label={labels.evEconomy}
                value={evEconomy}
                onChange={setEvEconomy}
                suffix={labels.evEconomySuffix}
                hint="Use a battery-side (dashboard) figure. EPA MPGe-derived efficiency already includes charging losses."
                error={errors?.evEconomy}
              />
              <NumberInput
                id="ev-vs-electricity"
                label={labels.electricityPrice}
                value={electricityPrice}
                onChange={setElectricityPrice}
                suffix={labels.electricityPriceSuffix}
                error={errors?.electricityPrice}
              />
              <NumberInput
                id="ev-vs-efficiency"
                label="Charging efficiency"
                value={efficiency}
                onChange={setEfficiency}
                suffix="%"
                hint="The share of grid energy that reaches the battery."
                error={errors?.efficiency}
              />
            </div>
          </div>
          <NumberInput
            id="ev-vs-gap"
            label={labels.gap}
            value={gap}
            onChange={setGap}
            suffix={labels.gapSuffix}
            hint={labels.gapHint}
            error={errors?.gap}
          />
          <ExampleTag>
            Starting values are illustrative, not current prices. This comparison covers running
            energy costs only.
          </ExampleTag>
        </>
      }
      results={
        result ? (
          <ResultPanel
            title="Annual running-cost comparison"
            totalLabel={totalLabel}
            totalValue={totalValue}
            totalSub={`Petrol ${formatMoney(result.annualPetrolCost, currency)} per year vs EV ${formatMoney(
              result.annualEvCost,
              currency,
            )} per year. ${
              saving > 0
                ? "The EV is cheaper on these running-cost inputs."
                : saving < 0
                  ? "The EV is more expensive on these running-cost inputs."
                  : "The two are equal on these inputs."
            }`}
            stats={
              <>
                <ResultStat
                  label="Petrol annual cost"
                  value={formatMoney(result.annualPetrolCost, currency)}
                  sublabel={`${formatNumber(result.petrolLitres, 1)} litres`}
                  emphasis
                />
                <ResultStat
                  label="EV annual cost"
                  value={formatMoney(result.annualEvCost, currency)}
                  sublabel={`${formatNumber(result.evGridKwh, 0)} kWh from the grid`}
                  emphasis
                />
                <ResultStat
                  label="Petrol cost per 100 km"
                  value={formatMoney(result.petrolCostPer100Km, currency, 2)}
                />
                <ResultStat
                  label="EV cost per 100 km"
                  value={formatMoney(result.evCostPer100Km, currency, 2)}
                />
                <ResultStat
                  label="Petrol cost per mile"
                  value={formatMoney(result.petrolCostPerMile, currency, 3)}
                />
                <ResultStat
                  label="EV cost per mile"
                  value={formatMoney(result.evCostPerMile, currency, 3)}
                />
                <ResultStat
                  label="Five-year running cost"
                  value={`${formatMoney(result.fiveYearPetrolCost, currency, 0)} vs ${formatMoney(
                    result.fiveYearEvCost,
                    currency,
                    0,
                  )}`}
                  sublabel="Petrol vs EV, energy only"
                />
                {result.breakEvenYears !== null ? (
                  <ResultStat
                    label="Purchase-price break-even"
                    value={`${formatNumber(result.breakEvenYears, 1)} years`}
                    sublabel="Using the price difference and annual saving you entered"
                  />
                ) : null}
              </>
            }
            footer={`Running energy costs only. This does not include purchase price unless you enter a difference, nor depreciation, insurance, maintenance, tyres, road tax, charger installation or resale value. ${
              result.breakEvenYears === null
                ? "Enter a positive purchase-price difference to estimate break-even; no break-even is shown when the EV does not save on running costs."
                : "The break-even estimate ignores financing, resale value and cost changes over time."
            }`}
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
