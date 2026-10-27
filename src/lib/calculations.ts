export const US_GALLON_LITRES = 3.785411784;
export const IMPERIAL_GALLON_LITRES = 4.54609;
export const KM_PER_MILE = 1.609344;
export const L100KM_TO_MPG_UK = (100 * IMPERIAL_GALLON_LITRES) / KM_PER_MILE;
export const L100KM_TO_MPG_US = (100 * US_GALLON_LITRES) / KM_PER_MILE;
export const MILES_PER_100KM = 100 / KM_PER_MILE;
export const HP_TO_KW = 0.7456998715822702;
export const PS_TO_KW = 0.73549875;
export const KWH_PER_GALLON_GASOLINE_EQUIVALENT = 33.7;

export type Market =
  | "uk"
  | "us"
  | "eu"
  | "ch"
  | "jp"
  | "in"
  | "kr"
  | "au";
export type FuelEconomyUnit = "l100km" | "mpgUk" | "mpgUs" | "kmPerL";
export type EvEfficiencyUnit = "mpge" | "miPerKwh" | "kwhPer100mi" | "kwhPer100km";
export type PowerUnit = "kw" | "ps" | "hp" | "bhp";

export type FuelEfficiencyResult = {
  l100km: number;
  mpgUk: number;
  mpgUs: number;
  kmPerL: number;
};

export type EvEfficiencyResult = {
  mpge: number;
  miPerKwh: number;
  kwhPer100mi: number;
  kwhPer100km: number;
};

export type FuelCostResult = {
  market: Market;
  currency: "GBP" | "USD" | "EUR" | "CHF" | "JPY" | "INR" | "KRW" | "AUD";
  billableDistance: number;
  distanceUnit: "mi" | "km";
  fuelUsedLitres: number;
  costPerMile: number;
  costPerKm: number;
  costPer100Km: number;
  totalCost: number;
};

export type EvChargingResult = {
  market: Market;
  currency: "GBP" | "USD" | "EUR" | "CHF" | "JPY" | "INR" | "KRW" | "AUD";
  batteryEnergyKwh: number;
  gridEnergyKwh: number;
  energyLostKwh: number;
  electricityCost: number;
  sessionFee: number;
  totalCost: number;
  costPerKwhExcludingFee: number;
  allInCostPerKwh: number;
  rangeDistance?: number;
  rangeDistanceUnit?: "mi" | "km";
  costPerMile?: number;
  costPerKm?: number;
  costPer100Km?: number;
};

export type EvVsPetrolResult = {
  market: Market;
  currency: "GBP" | "USD" | "EUR" | "CHF" | "JPY" | "INR" | "KRW" | "AUD";
  annualPetrolCost: number;
  annualEvCost: number;
  annualDifference: number;
  petrolCostPerMile: number;
  petrolCostPerKm: number;
  petrolCostPer100Km: number;
  evCostPerMile: number;
  evCostPerKm: number;
  evCostPer100Km: number;
  petrolLitres: number;
  evBatteryKwh: number;
  evGridKwh: number;
  fiveYearPetrolCost: number;
  fiveYearEvCost: number;
  breakEvenYears: number | null;
};

export type PowerResult = {
  kw: number;
  ps: number;
  hp: number;
  bhp: number;
};

function assertFinite(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be a finite number.`);
  }
}

function assertNonNegative(value: number, label: string): void {
  assertFinite(value, label);
  if (value < 0) {
    throw new RangeError(`${label} cannot be negative.`);
  }
}

function assertPositive(value: number, label: string): void {
  assertFinite(value, label);
  if (value <= 0) {
    throw new RangeError(`${label} must be greater than zero.`);
  }
}

export function convertFuelEfficiency(
  value: number,
  from: FuelEconomyUnit,
): FuelEfficiencyResult {
  assertNonNegative(value, "Fuel economy");

  let l100km: number;
  switch (from) {
    case "l100km":
      l100km = value;
      break;
    case "mpgUk":
      if (value === 0) throw new RangeError("MPG must be greater than zero.");
      l100km = L100KM_TO_MPG_UK / value;
      break;
    case "mpgUs":
      if (value === 0) throw new RangeError("MPG must be greater than zero.");
      l100km = L100KM_TO_MPG_US / value;
      break;
    case "kmPerL":
      if (value === 0) throw new RangeError("km/L must be greater than zero.");
      l100km = 100 / value;
      break;
  }

  return {
    l100km,
    mpgUk: l100km === 0 ? Number.POSITIVE_INFINITY : L100KM_TO_MPG_UK / l100km,
    mpgUs: l100km === 0 ? Number.POSITIVE_INFINITY : L100KM_TO_MPG_US / l100km,
    kmPerL: l100km === 0 ? Number.POSITIVE_INFINITY : 100 / l100km,
  };
}

export function convertEvEfficiency(
  value: number,
  from: EvEfficiencyUnit,
): EvEfficiencyResult {
  assertPositive(value, "EV efficiency");

  let miPerKwh: number;
  switch (from) {
    case "mpge":
      miPerKwh = value / KWH_PER_GALLON_GASOLINE_EQUIVALENT;
      break;
    case "miPerKwh":
      miPerKwh = value;
      break;
    case "kwhPer100mi":
      miPerKwh = 100 / value;
      break;
    case "kwhPer100km":
      miPerKwh = MILES_PER_100KM / value;
      break;
  }

  return {
    mpge: miPerKwh * KWH_PER_GALLON_GASOLINE_EQUIVALENT,
    miPerKwh,
    kwhPer100mi: 100 / miPerKwh,
    kwhPer100km: MILES_PER_100KM / miPerKwh,
  };
}

export function calculateFuelCost(input: {
  market: Market;
  distance: number;
  economy: number;
  fuelPrice: number;
  roundTrip?: boolean;
}): FuelCostResult {
  assertPositive(input.distance, "Distance");
  assertPositive(input.economy, "Fuel economy");
  assertNonNegative(input.fuelPrice, "Fuel price");

  const billableDistance = input.roundTrip ? input.distance * 2 : input.distance;
  let kilometres: number;
  let litres: number;
  let totalCost: number;

  switch (input.market) {
    case "uk": {
      kilometres = billableDistance * KM_PER_MILE;
      litres = (billableDistance / input.economy) * IMPERIAL_GALLON_LITRES;
      totalCost = litres * (input.fuelPrice / 100);
      break;
    }
    case "us": {
      kilometres = billableDistance * KM_PER_MILE;
      const gallons = billableDistance / input.economy;
      litres = gallons * US_GALLON_LITRES;
      totalCost = gallons * input.fuelPrice;
      break;
    }
    case "eu":
    case "ch":
    case "au": {
      kilometres = billableDistance;
      litres = (kilometres * input.economy) / 100;
      totalCost = litres * input.fuelPrice;
      break;
    }
    case "jp":
    case "in":
    case "kr": {
      kilometres = billableDistance;
      litres = billableDistance / input.economy;
      totalCost = litres * input.fuelPrice;
      break;
    }
  }

  return {
    market: input.market,
    currency:
      input.market === "uk"
        ? "GBP"
        : input.market === "us"
          ? "USD"
          : input.market === "ch"
            ? "CHF"
            : input.market === "jp"
              ? "JPY"
              : input.market === "in"
                ? "INR"
                : input.market === "kr"
                  ? "KRW"
                  : input.market === "au"
                    ? "AUD"
                    : "EUR",
    billableDistance,
    distanceUnit:
      input.market === "eu" ||
      input.market === "ch" ||
      input.market === "au" ||
      input.market === "jp" ||
      input.market === "in" ||
      input.market === "kr"
        ? "km"
        : "mi",
    fuelUsedLitres: litres,
    costPerMile: totalCost / (kilometres / KM_PER_MILE),
    costPerKm: totalCost / kilometres,
    costPer100Km: (totalCost / kilometres) * 100,
    totalCost,
  };
}

export function calculateEvChargingCost(input: {
  market: Market;
  mode: "energy" | "battery";
  energyAddedKwh?: number;
  batteryCapacityKwh?: number;
  startSoc?: number;
  endSoc?: number;
  pricePerKwh: number;
  efficiencyPct: number;
  sessionFee?: number;
  consumptionValue?: number;
}): EvChargingResult {
  assertNonNegative(input.pricePerKwh, "Electricity price");
  assertPositive(input.efficiencyPct, "Charging efficiency");
  if (input.efficiencyPct > 100) {
    throw new RangeError("Charging efficiency cannot exceed 100%.");
  }
  const sessionFee = input.sessionFee ?? 0;
  assertNonNegative(sessionFee, "Session fee");

  let batteryEnergyKwh: number;
  if (input.mode === "energy") {
    assertPositive(input.energyAddedKwh ?? 0, "Energy added");
    batteryEnergyKwh = input.energyAddedKwh as number;
  } else {
    assertPositive(input.batteryCapacityKwh ?? 0, "Battery capacity");
    const startSoc = input.startSoc ?? 0;
    const endSoc = input.endSoc ?? 0;
    if (startSoc < 0 || startSoc > 100 || endSoc < 0 || endSoc > 100) {
      throw new RangeError("State of charge must be between 0 and 100%.");
    }
    if (endSoc <= startSoc) {
      throw new RangeError("End state of charge must be higher than start state of charge.");
    }
    batteryEnergyKwh =
      (input.batteryCapacityKwh as number) * ((endSoc - startSoc) / 100);
  }

  const efficiency = input.efficiencyPct / 100;
  const gridEnergyKwh = batteryEnergyKwh / efficiency;
  const metricMarket =
    input.market === "eu" ||
    input.market === "ch" ||
    input.market === "au" ||
    input.market === "jp" ||
    input.market === "in" ||
    input.market === "kr";
  const electricityCost =
    gridEnergyKwh * (metricMarket ? input.pricePerKwh : input.pricePerKwh / 100);
  const totalCost = electricityCost + sessionFee;

  let rangeDistance: number | undefined;
  let rangeDistanceUnit: "mi" | "km" | undefined;
  let costPerMile: number | undefined;
  let costPerKm: number | undefined;
  let costPer100Km: number | undefined;

  if (input.consumptionValue !== undefined && input.consumptionValue > 0) {
    if (metricMarket) {
      rangeDistance = batteryEnergyKwh / (input.consumptionValue / 100);
      rangeDistanceUnit = "km";
      costPerKm = totalCost / rangeDistance;
      costPerMile = costPerKm * KM_PER_MILE;
      costPer100Km = costPerKm * 100;
    } else {
      rangeDistance = batteryEnergyKwh * input.consumptionValue;
      rangeDistanceUnit = "mi";
      costPerMile = totalCost / rangeDistance;
      costPerKm = costPerMile / KM_PER_MILE;
      costPer100Km = costPerKm * 100;
    }
  }

  return {
    market: input.market,
    currency:
      input.market === "uk"
        ? "GBP"
        : input.market === "us"
          ? "USD"
          : input.market === "ch"
            ? "CHF"
            : input.market === "jp"
              ? "JPY"
              : input.market === "in"
                ? "INR"
                : input.market === "kr"
                  ? "KRW"
                  : input.market === "au"
                    ? "AUD"
                    : "EUR",
    batteryEnergyKwh,
    gridEnergyKwh,
    energyLostKwh: gridEnergyKwh - batteryEnergyKwh,
    electricityCost,
    sessionFee,
    totalCost,
    costPerKwhExcludingFee: electricityCost / gridEnergyKwh,
    allInCostPerKwh: totalCost / gridEnergyKwh,
    rangeDistance,
    rangeDistanceUnit,
    costPerMile,
    costPerKm,
    costPer100Km,
  };
}

export function calculateEvVsPetrol(input: {
  market: Market;
  annualDistance: number;
  petrolEconomy: number;
  petrolPrice: number;
  evEconomy: number;
  electricityPrice: number;
  chargingEfficiencyPct: number;
  upfrontPriceDifference?: number;
}): EvVsPetrolResult {
  assertPositive(input.annualDistance, "Annual distance");
  assertPositive(input.petrolEconomy, "Petrol economy");
  assertNonNegative(input.petrolPrice, "Petrol price");
  assertPositive(input.evEconomy, "EV efficiency");
  assertNonNegative(input.electricityPrice, "Electricity price");
  assertPositive(input.chargingEfficiencyPct, "Charging efficiency");
  if (input.chargingEfficiencyPct > 100) {
    throw new RangeError("Charging efficiency cannot exceed 100%.");
  }
  const upfrontPriceDifference = input.upfrontPriceDifference ?? 0;
  assertNonNegative(upfrontPriceDifference, "Upfront price difference");

  let petrolLitres: number;
  let annualPetrolCost: number;
  let distanceKm: number;

  switch (input.market) {
    case "uk":
      distanceKm = input.annualDistance * KM_PER_MILE;
      petrolLitres =
        (input.annualDistance / input.petrolEconomy) * IMPERIAL_GALLON_LITRES;
      annualPetrolCost = petrolLitres * (input.petrolPrice / 100);
      break;
    case "us": {
      distanceKm = input.annualDistance * KM_PER_MILE;
      const gallons = input.annualDistance / input.petrolEconomy;
      petrolLitres = gallons * US_GALLON_LITRES;
      annualPetrolCost = gallons * input.petrolPrice;
      break;
    }
    case "eu":
    case "ch":
    case "au": {
      distanceKm = input.annualDistance;
      petrolLitres = (distanceKm * input.petrolEconomy) / 100;
      annualPetrolCost = petrolLitres * input.petrolPrice;
      break;
    }
    case "jp":
    case "in":
    case "kr": {
      distanceKm = input.annualDistance;
      petrolLitres = input.annualDistance / input.petrolEconomy;
      annualPetrolCost = petrolLitres * input.petrolPrice;
      break;
    }
  }

  let evBatteryKwh: number;
  if (
    input.market === "eu" ||
    input.market === "ch" ||
    input.market === "au" ||
    input.market === "jp" ||
    input.market === "in" ||
    input.market === "kr"
  ) {
    evBatteryKwh = (distanceKm * input.evEconomy) / 100;
  } else {
    evBatteryKwh = (distanceKm / KM_PER_MILE) / input.evEconomy;
  }
  const evGridKwh = evBatteryKwh / (input.chargingEfficiencyPct / 100);
  const metricEvMarket =
    input.market === "eu" ||
    input.market === "ch" ||
    input.market === "au" ||
    input.market === "jp" ||
    input.market === "in" ||
    input.market === "kr";
  const annualEvCost =
    evGridKwh * (metricEvMarket ? input.electricityPrice : input.electricityPrice / 100);

  const annualDifference = annualPetrolCost - annualEvCost;
  const breakEvenYears =
    upfrontPriceDifference > 0 && annualDifference > 0
      ? upfrontPriceDifference / annualDifference
      : null;

  return {
    market: input.market,
    currency:
      input.market === "uk"
        ? "GBP"
        : input.market === "us"
          ? "USD"
          : input.market === "ch"
            ? "CHF"
            : input.market === "jp"
              ? "JPY"
              : input.market === "in"
                ? "INR"
                : input.market === "kr"
                  ? "KRW"
                  : input.market === "au"
                    ? "AUD"
                    : "EUR",
    annualPetrolCost,
    annualEvCost,
    annualDifference,
    petrolCostPerMile: annualPetrolCost / (distanceKm / KM_PER_MILE),
    petrolCostPerKm: annualPetrolCost / distanceKm,
    petrolCostPer100Km: (annualPetrolCost / distanceKm) * 100,
    evCostPerMile: annualEvCost / (distanceKm / KM_PER_MILE),
    evCostPerKm: annualEvCost / distanceKm,
    evCostPer100Km: (annualEvCost / distanceKm) * 100,
    petrolLitres,
    evBatteryKwh,
    evGridKwh,
    fiveYearPetrolCost: annualPetrolCost * 5,
    fiveYearEvCost: annualEvCost * 5,
    breakEvenYears,
  };
}

export function convertPower(value: number, from: PowerUnit): PowerResult {
  assertNonNegative(value, "Power");

  let kw: number;
  switch (from) {
    case "kw":
      kw = value;
      break;
    case "ps":
      kw = value * PS_TO_KW;
      break;
    case "hp":
    case "bhp":
      kw = value * HP_TO_KW;
      break;
  }

  return {
    kw,
    ps: kw / PS_TO_KW,
    hp: kw / HP_TO_KW,
    bhp: kw / HP_TO_KW,
  };
}
