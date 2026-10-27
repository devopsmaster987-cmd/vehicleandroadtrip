"use client";

import type { ReactNode } from "react";

export function CalculatorLayout({
  inputs,
  results,
}: {
  inputs: ReactNode;
  results: ReactNode;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
      <div className="print-block min-w-0 rounded-xl border border-line bg-surface p-5 sm:p-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Your inputs
        </p>
        <div className="space-y-5">{inputs}</div>
      </div>
      <div className="print-block min-w-0 rounded-xl border border-brand/25 bg-surface p-5 sm:p-6">
        {results}
      </div>
    </div>
  );
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  suffix,
  hint,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  hint?: ReactNode;
  error?: string;
  placeholder?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-base text-ink shadow-sm outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/15 ${
            error ? "border-danger" : "border-line-strong"
          } ${suffix ? "pr-24" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted">
            {suffix}
          </span>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs leading-5 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SelectInput<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
  hint,
}: {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  hint?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="mt-1.5 w-full min-w-0 max-w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-base text-ink shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="mt-1.5 text-xs leading-5 text-muted">{hint}</p> : null}
    </div>
  );
}

export function RadioGroup<T extends string>({
  legend,
  name,
  value,
  onChange,
  options,
  hint,
}: {
  legend: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string; description?: string }>;
  hint?: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition focus-within:ring-2 focus-within:ring-brand/20 ${
                checked
                  ? "border-brand bg-brand-soft text-brand-dark"
                  : "border-line-strong bg-white text-ink-soft hover:border-brand/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="block font-medium">{option.label}</span>
              {option.description ? (
                <span className="mt-0.5 block text-xs leading-5 text-muted">
                  {option.description}
                </span>
              ) : null}
            </label>
          );
        })}
      </div>
      {hint ? <p className="mt-1.5 text-xs leading-5 text-muted">{hint}</p> : null}
    </fieldset>
  );
}

export function CheckboxInput({
  id,
  label,
  checked,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-line-strong text-brand accent-brand"
        />
        <span className="font-medium">{label}</span>
      </label>
      {hint ? <p className="ml-7 mt-1 text-xs leading-5 text-muted">{hint}</p> : null}
    </div>
  );
}

export function ResultStat({
  label,
  value,
  sublabel,
  emphasis = false,
}: {
  label: string;
  value: ReactNode;
  sublabel?: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3.5 ${
        emphasis ? "border-brand/30 bg-brand-soft/60" : "border-line bg-paper/60"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">{label}</p>
      <p
        className={`numeric mt-1 font-semibold tracking-tight text-ink ${
          emphasis ? "text-2xl" : "text-xl"
        }`}
      >
        {value}
      </p>
      {sublabel ? <p className="mt-1 text-xs leading-5 text-muted">{sublabel}</p> : null}
    </div>
  );
}

export function ResultPanel({
  title,
  totalLabel,
  totalValue,
  totalSub,
  stats,
  footer,
}: {
  title: string;
  totalLabel: string;
  totalValue: string;
  totalSub?: ReactNode;
  stats: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div aria-live="polite">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Estimated result
      </p>
      <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink">{title}</h2>
      <div className="mt-5 rounded-lg border border-line bg-paper/60 p-4">
        <p className="text-sm font-medium text-ink-soft">{totalLabel}</p>
        <p className="numeric mt-1 text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
          {totalValue}
        </p>
        {totalSub ? <p className="mt-2 text-sm leading-6 text-muted">{totalSub}</p> : null}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{stats}</div>
      {footer ? <div className="mt-4 rounded-lg bg-brand-soft/60 p-3 text-xs leading-5 text-ink-soft">{footer}</div> : null}
    </div>
  );
}

export function InputError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="rounded-md border border-danger/25 bg-danger-soft px-3 py-2 text-sm leading-5 text-danger">
      {children}
    </p>
  );
}

export function ExampleTag({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs leading-5 text-muted">
      <span className="mr-1.5 inline-block rounded border border-line-strong bg-paper px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
        Example
      </span>
      {children}
    </p>
  );
}
