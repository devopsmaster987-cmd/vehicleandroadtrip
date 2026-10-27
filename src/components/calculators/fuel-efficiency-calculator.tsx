"use client";

import { useState } from "react";
import {
  CalculatorLayout,
  InputError,
  NumberInput,
  ResultPanel,
  ResultStat,
  SelectInput,
} from "@/components/calculator-ui";
import {
  convertEvEfficiency,
  convertFuelEfficiency,
  type EvEfficiencyUnit,
  type FuelEconomyUnit,
} from "@/lib/calculations";
import { formatNumber, parseLocalizedNumber } from "@/lib/format";

const fuelUnits: Array<{ value: FuelEconomyUnit; label: string; suffix: string }> = [
  { value: "l100km", label: "Litres per 100 km (L/100 km)", suffix: "L/100 km" },
  { value: "mpgUk", label: "Miles per gallon — UK (imperial)", suffix: "MPG UK" },
  { value: "mpgUs", label: "Miles per gallon — US", suffix: "MPG US" },
  { value: "kmPerL", label: "Kilometres per litre", suffix: "km/L" },
];

const evUnits: Array<{ value: EvEfficiencyUnit; label: string; suffix: string }> = [
  { value: "mpge", label: "MPGe (EPA gasoline-equivalent)", suffix: "MPGe" },
  { value: "miPerKwh", label: "Miles per kWh", suffix: "mi/kWh" },
  { value: "kwhPer100mi", label: "kWh per 100 miles", suffix: "kWh/100 mi" },
  { value: "kwhPer100km", label: "kWh per 100 km", suffix: "kWh/100 km" },
];

export function FuelEfficiencyCalculator() {
  const [value, setValue] = useState("5");
  const [unit, setUnit] = useState<FuelEconomyUnit>("l100km");

  const parsed = parseLocalizedNumber(value);
  const error =
    parsed === null
      ? "Enter a number."
      : parsed < 0
        ? "Fuel economy cannot be negative."
        : unit !== "l100km" && parsed === 0
          ? "The input must be greater than zero for this unit."
          : undefined;

  const result = (() => {
    if (parsed === null || error) return null;
    try {
      return convertFuelEfficiency(parsed, unit);
    } catch {
      return null;
    }
  })();

  const activeUnit = fuelUnits.find((item) => item.value === unit) ?? fuelUnits[0];

  return (
    <CalculatorLayout
      inputs={
        <>
          <SelectInput
            id="fuel-unit"
            label="Convert from"
            value={unit}
            onChange={setUnit}
            options={fuelUnits.map(({ value: optionValue, label }) => ({
              value: optionValue,
              label,
            }))}
            hint="UK and US MPG use different gallons. Choose the one your figure came from."
          />
          <NumberInput
            id="fuel-value"
            label="Fuel economy"
            value={value}
            onChange={setValue}
            suffix={activeUnit.suffix}
            error={error}
            hint="Use a dot for decimals, for example 3.5. Do not enter units in the field."
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Examples</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { value: "5", unit: "l100km" as const, label: "5 L/100 km" },
                { value: "7", unit: "l100km" as const, label: "7 L/100 km" },
                { value: "40", unit: "mpgUk" as const, label: "40 MPG UK" },
                { value: "30", unit: "mpgUs" as const, label: "30 MPG US" },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setValue(preset.value);
                    setUnit(preset.unit);
                  }}
                  className="rounded-md border border-line-strong bg-paper px-2.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-brand/50 hover:text-brand"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </>
      }
      results={
        result ? (
          <ResultPanel
            title="Liquid fuel economy"
            totalLabel="Litres per 100 km"
            totalValue={`${formatNumber(result.l100km, 3)} L/100 km`}
            totalSub="Lower L/100 km means less fuel used for the same distance."
            stats={
              <>
                <ResultStat
                  label="MPG (UK)"
                  value={formatNumber(result.mpgUk, 2)}
                  sublabel="imperial gallon = 4.54609 L"
                  emphasis
                />
                <ResultStat
                  label="MPG (US)"
                  value={formatNumber(result.mpgUs, 2)}
                  sublabel="US gallon = 3.785411784 L"
                  emphasis
                />
                <ResultStat
                  label="Kilometres per litre"
                  value={`${formatNumber(result.kmPerL, 3)} km/L`}
                />
                <ResultStat
                  label="System used for input"
                  value={unit === "mpgUk" ? "MPG UK" : unit === "mpgUs" ? "MPG US" : activeUnit.suffix}
                  sublabel="The output names both MPG systems explicitly."
                />
              </>
            }
            footer="UK and US MPG differ by a factor of about 1.20095. The calculator never treats them as the same unit."
          />
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-ink">Results will appear here.</p>
            <InputError>{error ?? "Enter a valid fuel economy value."}</InputError>
          </div>
        )
      }
    />
  );
}

export function EvEfficiencyCalculator() {
  const [value, setValue] = useState("150");
  const [unit, setUnit] = useState<EvEfficiencyUnit>("mpge");

  const parsed = parseLocalizedNumber(value);
  const error =
    parsed === null
      ? "Enter a number."
      : parsed <= 0
        ? "EV efficiency must be greater than zero."
        : undefined;

  const result = (() => {
    if (parsed === null || error) return null;
    try {
      return convertEvEfficiency(parsed, unit);
    } catch {
      return null;
    }
  })();

  const activeUnit = evUnits.find((item) => item.value === unit) ?? evUnits[0];

  return (
    <CalculatorLayout
      inputs={
        <>
          <SelectInput
            id="ev-unit"
            label="Convert from"
            value={unit}
            onChange={setUnit}
            options={evUnits.map(({ value: optionValue, label }) => ({
              value: optionValue,
              label,
            }))}
            hint="MPGe is an EPA gasoline-equivalent rating, not a liquid-fuel measurement."
          />
          <NumberInput
            id="ev-value"
            label="EV efficiency"
            value={value}
            onChange={setValue}
            suffix={activeUnit.suffix}
            error={error}
            hint="Use the consumption figure for the same cycle where possible (for example EPA or WLTP)."
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Examples</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { value: "150", unit: "mpge" as const, label: "150 MPGe" },
                { value: "3.5", unit: "miPerKwh" as const, label: "3.5 mi/kWh" },
                { value: "17", unit: "kwhPer100km" as const, label: "17 kWh/100 km" },
                { value: "28", unit: "kwhPer100mi" as const, label: "28 kWh/100 mi" },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setValue(preset.value);
                    setUnit(preset.unit);
                  }}
                  className="rounded-md border border-line-strong bg-paper px-2.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-brand/50 hover:text-brand"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </>
      }
      results={
        result ? (
          <ResultPanel
            title="Electric vehicle efficiency"
            totalLabel="MPGe (EPA)"
            totalValue={`${formatNumber(result.mpge, 1)} MPGe`}
            totalSub="Based on 33.7 kWh per gallon of gasoline equivalent. EPA MPGe includes charging losses."
            stats={
              <>
                <ResultStat
                  label="Miles per kWh"
                  value={formatNumber(result.miPerKwh, 3)}
                  sublabel="EPA wall-to-wheel energy basis"
                  emphasis
                />
                <ResultStat
                  label="kWh per 100 miles"
                  value={formatNumber(result.kwhPer100mi, 2)}
                  sublabel="Common US EV consumption unit"
                  emphasis
                />
                <ResultStat
                  label="kWh per 100 km"
                  value={formatNumber(result.kwhPer100km, 2)}
                  sublabel="Common European EV consumption unit"
                />
                <ResultStat
                  label="Input system"
                  value={activeUnit.suffix}
                  sublabel="MPGe is a derived equivalent, not a real liquid-fuel figure."
                />
              </>
            }
            footer="This is an energy-equivalence conversion. EPA MPGe and kWh/100 mi are wall-to-outlet figures that already include charging losses; do not add losses a second time when comparing them with a charging cost."
          />
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-ink">Results will appear here.</p>
            <InputError>{error ?? "Enter a valid EV efficiency value."}</InputError>
          </div>
        )
      }
    />
  );
}
