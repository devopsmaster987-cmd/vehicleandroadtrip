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
import { convertPower, type PowerUnit } from "@/lib/calculations";
import { formatNumber, parseLocalizedNumber } from "@/lib/format";

const units: Array<{ value: PowerUnit; label: string; suffix: string }> = [
  { value: "kw", label: "Kilowatts (kW)", suffix: "kW" },
  { value: "ps", label: "Metric horsepower (PS)", suffix: "PS" },
  { value: "hp", label: "Mechanical horsepower (hp)", suffix: "hp" },
  { value: "bhp", label: "Brake horsepower (bhp)", suffix: "bhp" },
];

export function PowerCalculator() {
  const [value, setValue] = useState("100");
  const [unit, setUnit] = useState<PowerUnit>("kw");

  const parsed = parseLocalizedNumber(value);
  const error =
    parsed === null
      ? "Enter a number."
      : parsed < 0
        ? "Power cannot be negative."
        : undefined;

  const result = (() => {
    if (parsed === null || error) return null;
    try {
      return convertPower(parsed, unit);
    } catch {
      return null;
    }
  })();

  const activeUnit = units.find((item) => item.value === unit) ?? units[0];

  return (
    <CalculatorLayout
      inputs={
        <>
          <SelectInput
            id="power-unit"
            label="Convert from"
            value={unit}
            onChange={setUnit}
            options={units.map(({ value: optionValue, label }) => ({
              value: optionValue,
              label,
            }))}
            hint="PS is metric horsepower. hp is mechanical horsepower. They are not the same unit."
          />
          <NumberInput
            id="power-value"
            label="Power"
            value={value}
            onChange={setValue}
            suffix={activeUnit.suffix}
            error={error}
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Examples</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { value: "100", unit: "kw" as const, label: "100 kW" },
                { value: "150", unit: "ps" as const, label: "150 PS" },
                { value: "200", unit: "hp" as const, label: "200 hp" },
                { value: "300", unit: "bhp" as const, label: "300 bhp" },
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
            title="Power conversion"
            totalLabel="Metric horsepower"
            totalValue={`${formatNumber(result.ps, 2)} PS`}
            totalSub={`${formatNumber(result.kw, 2)} kW = ${formatNumber(result.hp, 2)} hp.`}
            stats={
              <>
                <ResultStat
                  label="Kilowatts"
                  value={`${formatNumber(result.kw, 3)} kW`}
                  emphasis
                />
                <ResultStat
                  label="Metric horsepower"
                  value={`${formatNumber(result.ps, 2)} PS`}
                  sublabel="1 PS = 0.73549875 kW"
                  emphasis
                />
                <ResultStat
                  label="Mechanical horsepower"
                  value={`${formatNumber(result.hp, 2)} hp`}
                  sublabel="1 hp = 0.745699872 kW"
                />
                <ResultStat
                  label="Brake horsepower"
                  value={`${formatNumber(result.bhp, 2)} bhp`}
                  sublabel="Treated as mechanical hp in this converter"
                />
              </>
            }
            footer="bhp is a measurement convention (brake horsepower), not a separate unit with a different arithmetic factor here. If a source uses a different standard or rounding, start from the unit that source actually names."
          />
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-ink">Results will appear here.</p>
            <InputError>{error ?? "Enter a valid power value."}</InputError>
          </div>
        )
      }
    />
  );
}
