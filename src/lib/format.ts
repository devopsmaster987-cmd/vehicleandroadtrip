import type { Market } from "@/lib/calculations";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export function absoluteUrl(path = "/"): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

export const CONTENT_REVIEWED = "27 October 2026";

export function formatNumber(
  value: number | undefined | null,
  maximumFractionDigits = 2,
): string {
  if (value === undefined || value === null) return "—";
  if (!Number.isFinite(value)) return "∞";
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits,
  }).format(value);
}

export function formatMoney(
  value: number | undefined | null,
  currency: "GBP" | "USD" | "EUR" | "CHF" | "JPY" | "INR" | "KRW" | "AUD",
  maximumFractionDigits = 2,
): string {
  if (value === undefined || value === null) return "—";
  if (!Number.isFinite(value)) return "∞";
  const decimals =
    currency === "JPY" || currency === "KRW" ? 0 : maximumFractionDigits;
  return new Intl.NumberFormat(
    currency === "CHF"
      ? "en-CH"
      : currency === "EUR"
        ? "en-IE"
        : currency === "JPY"
          ? "en-JP"
          : currency === "KRW"
            ? "en-KR"
            : currency === "INR"
              ? "en-IN"
              : currency === "AUD"
                ? "en-US"
                : "en-GB",
    { style: "currency", currency, maximumFractionDigits: decimals },
  ).format(value);
}

export function currencyForMarket(market: Market): "GBP" | "USD" | "EUR" | "CHF" | "JPY" | "INR" | "KRW" | "AUD" {
  return market === "uk"
    ? "GBP"
    : market === "us"
      ? "USD"
      : market === "ch"
        ? "CHF"
        : market === "jp"
          ? "JPY"
          : market === "in"
            ? "INR"
            : market === "kr"
              ? "KRW"
              : market === "au"
                ? "AUD"
                : "EUR";
}

export function parseLocalizedNumber(raw: string, market: Market = "uk"): number | null {
  const trimmed = raw.trim().replace(/[\s\u00a0\u202f'\u2019]/g, "");
  if (trimmed === "" || trimmed === "-" || trimmed === "+") return null;

  let normalized = trimmed;
  const hasComma = trimmed.includes(",");
  const hasDot = trimmed.includes(".");

  if (hasComma && hasDot) {
    const lastComma = trimmed.lastIndexOf(",");
    const lastDot = trimmed.lastIndexOf(".");
    if (lastComma > lastDot) {
      normalized = trimmed.replace(/\./g, "").replace(/,/g, ".");
    } else {
      normalized = trimmed.replace(/,/g, "");
    }
  } else if (hasComma) {
    const groupedThousands = /^\d{1,3}(,\d{3})+$/.test(trimmed);
    const commaCount = (trimmed.match(/,/g) ?? []).length;
    if ((market === "eu" || market === "ch") && !(commaCount > 1 && groupedThousands)) {
      normalized = trimmed.replace(/,/g, ".");
    } else if (groupedThousands) {
      normalized = trimmed.replace(/,/g, "");
    } else {
      normalized = trimmed.replace(/,/g, ".");
    }
  } else if (hasDot && (market === "eu" || market === "ch")) {
    const groupedThousands = /^[1-9]\d{0,2}(\.\d{3})+$/.test(trimmed);
    if (groupedThousands) normalized = trimmed.replace(/\./g, "");
  }

  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}
