"use client";

import { useState } from "react";
import {
  CalculatorLayout,
  ExampleTag,
  InputError,
  NumberInput,
  RadioGroup,
  ResultPanel,
  ResultStat,
  SelectInput,
} from "@/components/calculator-ui";
import {
  calculateEvChargingCost,
  type EvChargingResult,
  type Market,
} from "@/lib/calculations";
import { currencyForMarket, formatMoney, formatNumber, parseLocalizedNumber } from "@/lib/format";

type Mode = "energy" | "battery";

type MarketExample = {
  energy: string;
  capacity: string;
  startSoc: string;
  endSoc: string;
  price: string;
  efficiency: string;
  fee: string;
  consumption: string;
};

const examples: Record<Market, MarketExample> = {
  uk: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "25",
    efficiency: "90",
    fee: "0",
    consumption: "3.5",
  },
  us: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "17",
    efficiency: "90",
    fee: "0",
    consumption: "3.5",
  },
  eu: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "0,35",
    efficiency: "90",
    fee: "0",
    consumption: "17",
  },
  ch: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "0,35",
    efficiency: "90",
    fee: "0",
    consumption: "17",
  },
  jp: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "30",
    efficiency: "90",
    fee: "0",
    consumption: "17",
  },
  in: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "8",
    efficiency: "90",
    fee: "0",
    consumption: "17",
  },
  kr: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "300",
    efficiency: "90",
    fee: "0",
    consumption: "17",
  },
  au: {
    energy: "40",
    capacity: "75",
    startSoc: "20",
    endSoc: "80",
    price: "0.35",
    efficiency: "90",
    fee: "0",
    consumption: "17",
  },
};

const marketOptions: Array<{ value: Market; label: string }> = [
  { value: "uk", label: "UK — p/kWh" },
  { value: "us", label: "US — ¢/kWh" },
  { value: "eu", label: "Europe — €/kWh" },
  { value: "ch", label: "Switzerland — CHF/kWh" },
  { value: "jp", label: "Japan — ¥/kWh" },
  { value: "in", label: "India — ₹/kWh" },
  { value: "kr", label: "South Korea — ₩/kWh" },
  { value: "au", label: "Australia — A$/kWh" },
];

type ChargingState =
  | { result: EvChargingResult; errors?: undefined }
  | {
      result?: undefined;
      errors: {
        energy?: string;
        capacity?: string;
        soc?: string;
        price?: string;
        efficiency?: string;
        fee?: string;
        consumption?: string;
        general?: string;
      };
    };

export function EvChargingCalculator() {
  const [market, setMarket] = useState<Market>("uk");
  const [mode, setMode] = useState<Mode>("energy");
  const [energy, setEnergy] = useState(examples.uk.energy);
  const [capacity, setCapacity] = useState(examples.uk.capacity);
  const [startSoc, setStartSoc] = useState(examples.uk.startSoc);
  const [endSoc, setEndSoc] = useState(examples.uk.endSoc);
  const [price, setPrice] = useState(examples.uk.price);
  const [efficiency, setEfficiency] = useState(examples.uk.efficiency);
  const [fee, setFee] = useState(examples.uk.fee);
  const [consumption, setConsumption] = useState(examples.uk.consumption);

  const currency = currencyForMarket(market);
  const priceSuffix =
    market === "uk"
      ? "p/kWh"
      : market === "us"
        ? "¢/kWh"
        : market === "ch"
          ? "CHF/kWh"
          : market === "jp"
            ? "¥/kWh"
            : market === "in"
              ? "₹/kWh"
              : market === "kr"
                ? "₩/kWh"
                : market === "au"
                  ? "A$/kWh"
                  : "€/kWh";
  const priceHint =
    market === "uk"
      ? "Use pence per kWh, for example 25. Home and public tariffs differ."
      : market === "us"
        ? "Use cents per kWh, for example 17. Time-of-use tariffs can differ by hour."
        : market === "ch"
          ? "Use Swiss francs per kWh, for example 0,35. Home and public tariffs differ."
          : market === "jp"
            ? "Use yen per kWh, for example 30. Home and public tariffs differ."
            : market === "in"
              ? "Use rupees per kWh, for example 8. Home and public tariffs differ."
              : market === "kr"
                ? "Use won per kWh, for example 300. Home and public tariffs differ."
                : market === "au"
                  ? "Use Australian dollars per kWh, for example 0.35. Home and public tariffs differ."
                  : "Use euros per kWh, for example 0,35. Home and public tariffs differ.";
  const metricMarket =
    market === "eu" ||
    market === "ch" ||
    market === "jp" ||
    market === "in" ||
    market === "kr" ||
    market === "au";
  const consumptionSuffix = metricMarket ? "kWh/100 km" : "mi/kWh";
  const consumptionLabel = metricMarket
    ? "Battery-side consumption (optional)"
    : "Battery-side efficiency (optional)";

  const state: ChargingState = (() => {
    const priceValue = parseLocalizedNumber(price, market);
    const efficiencyValue = parseLocalizedNumber(efficiency, market);
    const feeValue = fee.trim() === "" ? 0 : parseLocalizedNumber(fee, market);
    const consumptionValue = consumption.trim() === "" ? undefined : parseLocalizedNumber(consumption, market);
    const errors: {
      energy?: string;
      capacity?: string;
      soc?: string;
      price?: string;
      efficiency?: string;
      fee?: string;
      consumption?: string;
      general?: string;
    } = {};

    if (priceValue === null) errors.price = "Enter a number.";
    else if (priceValue < 0) errors.price = "Price cannot be negative.";

    if (efficiencyValue === null) errors.efficiency = "Enter a number.";
    else if (efficiencyValue <= 0 || efficiencyValue > 100) {
      errors.efficiency = "Efficiency must be greater than 0 and no more than 100.";
    }

    if (feeValue === null) errors.fee = "Enter a number or leave blank.";
    else if (feeValue < 0) errors.fee = "Session fee cannot be negative.";

    if (consumptionValue === null) errors.consumption = "Enter a number or clear the field.";
    else if (consumptionValue !== undefined && consumptionValue <= 0) {
      errors.consumption = "Efficiency must be greater than zero if provided.";
    }

    let energyValue: number | undefined;
    let capacityValue: number | undefined;
    let startValue: number | undefined;
    let endValue: number | undefined;

    if (mode === "energy") {
      const parsed = parseLocalizedNumber(energy, market);
      if (parsed === null) errors.energy = "Enter a number.";
      else if (parsed <= 0) errors.energy = "Energy added must be greater than zero.";
      else energyValue = parsed;
    } else {
      const parsedCapacity = parseLocalizedNumber(capacity, market);
      const parsedStart = parseLocalizedNumber(startSoc, market);
      const parsedEnd = parseLocalizedNumber(endSoc, market);

      if (parsedCapacity === null) errors.capacity = "Enter a number.";
      else if (parsedCapacity <= 0) errors.capacity = "Battery capacity must be greater than zero.";
      else capacityValue = parsedCapacity;

      if (parsedStart === null || parsedEnd === null) {
        errors.soc = "Enter both state-of-charge values.";
      } else if (
        parsedStart < 0 ||
        parsedStart > 100 ||
        parsedEnd < 0 ||
        parsedEnd > 100
      ) {
        errors.soc = "State of charge must be between 0 and 100%.";
      } else if (parsedEnd <= parsedStart) {
        errors.soc = "End state of charge must be higher than start state of charge.";
      } else {
        startValue = parsedStart;
        endValue = parsedEnd;
      }
    }

    if (Object.keys(errors).length > 0) return { errors };

    try {
      return {
        result: calculateEvChargingCost({
          market,
          mode,
          energyAddedKwh: energyValue,
          batteryCapacityKwh: capacityValue,
          startSoc: startValue,
          endSoc: endValue,
          pricePerKwh: priceValue as number,
          efficiencyPct: efficiencyValue as number,
          sessionFee: (feeValue ?? 0) as number,
          consumptionValue: consumptionValue ?? undefined,
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
    setEnergy(examples[next].energy);
    setCapacity(examples[next].capacity);
    setStartSoc(examples[next].startSoc);
    setEndSoc(examples[next].endSoc);
    setPrice(examples[next].price);
    setEfficiency(examples[next].efficiency);
    setFee(examples[next].fee);
    setConsumption(examples[next].consumption);
  }

  const result = state.result;
  const errors = state.errors;

  return (
    <CalculatorLayout
      inputs={
        <>
          <SelectInput
            id="ev-charge-market"
            label="Market and price unit"
            value={market}
            onChange={changeMarket}
            options={marketOptions}
            hint="Changing market resets the example values to the correct price and consumption units."
          />
          <RadioGroup
            legend="How do you want to enter the energy?"
            name="ev-charge-mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: "energy", label: "Energy added", description: "Enter kWh delivered to the battery." },
              { value: "battery", label: "Battery and state of charge", description: "Use capacity and start/end percentages." },
            ]}
          />

          {mode === "energy" ? (
            <NumberInput
              id="ev-charge-energy"
              label="Energy added to the battery"
              value={energy}
              onChange={setEnergy}
              suffix="kWh"
              hint="This is battery-side energy, before charging losses."
              error={errors?.energy}
            />
          ) : (
            <>
              <NumberInput
                id="ev-charge-capacity"
                label="Usable battery capacity"
                value={capacity}
                onChange={setCapacity}
                suffix="kWh"
                error={errors?.capacity}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="ev-charge-start"
                  label="Start state of charge"
                  value={startSoc}
                  onChange={setStartSoc}
                  suffix="%"
                  error={errors?.soc}
                />
                <NumberInput
                  id="ev-charge-end"
                  label="End state of charge"
                  value={endSoc}
                  onChange={setEndSoc}
                  suffix="%"
                  error={errors?.soc}
                />
              </div>
            </>
          )}

          <NumberInput
            id="ev-charge-price"
            label="Electricity price"
            value={price}
            onChange={setPrice}
            suffix={priceSuffix}
            hint={priceHint}
            error={errors?.price}
          />
          <NumberInput
            id="ev-charge-efficiency"
            label="Charging efficiency"
            value={efficiency}
            onChange={setEfficiency}
            suffix="%"
            hint="The share of grid energy that reaches the battery. 90% means 10% is lost."
            error={errors?.efficiency}
          />
          <NumberInput
            id="ev-charge-fee"
            label="Session fee (optional)"
            value={fee}
            onChange={setFee}
            suffix={
              currency === "GBP"
                ? "£"
                : currency === "USD"
                  ? "$"
                  : currency === "CHF"
                    ? "CHF"
                    : "€"
            }
            hint="A fixed fee per charging session, not a per-kWh charge."
            error={errors?.fee}
          />
          <NumberInput
            id="ev-charge-consumption"
            label={consumptionLabel}
            value={consumption}
            onChange={setConsumption}
            suffix={consumptionSuffix}
            hint="Use a dashboard/trip-meter figure based on battery energy. EPA MPGe-derived figures already include charging losses, so do not add them twice."
            error={errors?.consumption}
          />
          <ExampleTag>
            Example values are illustrative, not current tariffs. Use your own home, public or
            time-of-use price.
          </ExampleTag>
        </>
      }
      results={
        result ? (
          <ResultPanel
            title="Charging cost estimate"
            totalLabel="Estimated charging cost"
            totalValue={formatMoney(result.totalCost, currency)}
            totalSub={`Electricity ${formatMoney(result.electricityCost, currency)} + session fee ${formatMoney(
              result.sessionFee,
              currency,
            )}. Energy purchased from the grid: ${formatNumber(result.gridEnergyKwh, 2)} kWh.`}
            stats={
              <>
                <ResultStat
                  label="Energy added to battery"
                  value={`${formatNumber(result.batteryEnergyKwh, 2)} kWh`}
                  emphasis
                />
                <ResultStat
                  label="Grid energy purchased"
                  value={`${formatNumber(result.gridEnergyKwh, 2)} kWh`}
                  sublabel={`${formatNumber(result.energyLostKwh, 2)} kWh lost in charging`}
                  emphasis
                />
                <ResultStat
                  label="All-in cost per grid kWh"
                  value={formatMoney(result.allInCostPerKwh, currency, 3)}
                  sublabel="Includes the session fee"
                />
                <ResultStat
                  label="Electricity cost per kWh"
                  value={formatMoney(result.costPerKwhExcludingFee, currency, 3)}
                  sublabel="Excludes the session fee"
                />
                {result.costPerMile !== undefined ? (
                  <ResultStat
                    label="Cost per mile"
                    value={formatMoney(result.costPerMile, currency, 3)}
                    sublabel={`Estimated range from this charge: ${formatNumber(
                      result.rangeDistance,
                      1,
                    )} ${result.rangeDistanceUnit}`}
                  />
                ) : null}
                {result.costPer100Km !== undefined ? (
                  <ResultStat
                    label="Cost per 100 km"
                    value={formatMoney(result.costPer100Km, currency, 2)}
                  />
                ) : null}
              </>
            }
            footer="This is not a quote. Public charging can include idle fees, parking, membership discounts or per-minute billing that are not modelled here. Home charging may have standing charges and time-of-use rates."
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
