import { describe, expect, it } from "vitest";
import {
  L100KM_TO_MPG_UK,
  L100KM_TO_MPG_US,
  calculateEvChargingCost,
  calculateEvVsPetrol,
  calculateFuelCost,
  convertEvEfficiency,
  convertFuelEfficiency,
  convertPower,
} from "@/lib/calculations";
import { parseLocalizedNumber } from "@/lib/format";

describe("conversion constants", () => {
  it("uses the exact UK and US MPG factors", () => {
    expect(L100KM_TO_MPG_UK).toBeCloseTo(282.480936, 5);
    expect(L100KM_TO_MPG_US).toBeCloseTo(235.214583, 5);
  });
});

describe("convertFuelEfficiency", () => {
  it("converts L/100 km to both MPG systems and km/L", () => {
    const result = convertFuelEfficiency(5, "l100km");
    expect(result.mpgUk).toBeCloseTo(56.496187, 5);
    expect(result.mpgUs).toBeCloseTo(47.042917, 5);
    expect(result.kmPerL).toBeCloseTo(20, 10);
  });

  it("round-trips UK MPG", () => {
    const result = convertFuelEfficiency(40, "mpgUk");
    expect(result.l100km).toBeCloseTo(7.0620234, 6);
    expect(result.mpgUs).toBeCloseTo(33.3069, 3);
    expect(convertFuelEfficiency(result.l100km, "l100km").mpgUk).toBeCloseTo(40, 10);
  });

  it("round-trips US MPG", () => {
    const result = convertFuelEfficiency(30, "mpgUs");
    expect(result.l100km).toBeCloseTo(7.840486, 5);
    expect(result.mpgUk).toBeCloseTo(36.0285, 3);
  });

  it("handles zero L/100 km as infinite MPG", () => {
    const result = convertFuelEfficiency(0, "l100km");
    expect(result.mpgUk).toBe(Number.POSITIVE_INFINITY);
    expect(result.mpgUs).toBe(Number.POSITIVE_INFINITY);
  });

  it("rejects zero MPG and negative values", () => {
    expect(() => convertFuelEfficiency(0, "mpgUk")).toThrow(RangeError);
    expect(() => convertFuelEfficiency(-1, "l100km")).toThrow(RangeError);
  });
});

describe("convertEvEfficiency", () => {
  it("converts MPGe using 33.7 kWh per gasoline-equivalent gallon", () => {
    const result = convertEvEfficiency(150, "mpge");
    expect(result.miPerKwh).toBeCloseTo(4.451038, 5);
    expect(result.kwhPer100mi).toBeCloseTo(22.4666, 3);
    expect(result.kwhPer100km).toBeCloseTo(13.96014, 3);
  });

  it("round-trips kWh/100 km", () => {
    const result = convertEvEfficiency(17, "kwhPer100km");
    expect(result.mpge).toBeCloseTo(123.1777, 2);
    expect(result.miPerKwh).toBeCloseTo(3.6551, 3);
    expect(result.kwhPer100mi).toBeCloseTo(27.3586, 3);
  });

  it("rejects zero and negative efficiency", () => {
    expect(() => convertEvEfficiency(0, "mpge")).toThrow(RangeError);
    expect(() => convertEvEfficiency(-1, "miPerKwh")).toThrow(RangeError);
  });
});

describe("calculateFuelCost", () => {
  it("calculates a UK trip from MPG UK and pence per litre", () => {
    const result = calculateFuelCost({
      market: "uk",
      distance: 100,
      economy: 50,
      fuelPrice: 145,
    });
    expect(result.fuelUsedLitres).toBeCloseTo(9.09218, 5);
    expect(result.totalCost).toBeCloseTo(13.183661, 5);
    expect(result.costPerMile).toBeCloseTo(0.13183661, 8);
    expect(result.costPer100Km).toBeCloseTo(8.191947, 5);
  });

  it("calculates a US trip from MPG US and dollars per gallon", () => {
    const result = calculateFuelCost({
      market: "us",
      distance: 300,
      economy: 30,
      fuelPrice: 3.5,
    });
    expect(result.fuelUsedLitres).toBeCloseTo(37.85411784, 8);
    expect(result.totalCost).toBeCloseTo(35, 8);
    expect(result.costPerMile).toBeCloseTo(0.1166667, 6);
    expect(result.costPer100Km).toBeCloseTo(7.249331, 5);
  });

  it("calculates a European trip from L/100 km and euros per litre", () => {
    const result = calculateFuelCost({
      market: "eu",
      distance: 500,
      economy: 6.5,
      fuelPrice: 1.75,
    });
    expect(result.fuelUsedLitres).toBeCloseTo(32.5, 10);
    expect(result.totalCost).toBeCloseTo(56.875, 8);
    expect(result.costPerKm).toBeCloseTo(0.11375, 8);
    expect(result.costPer100Km).toBeCloseTo(11.375, 8);
  });

  it("calculates a Japanese trip in kilometres, km/L and yen", () => {
    const result = calculateFuelCost({
      market: "jp",
      distance: 300,
      economy: 15,
      fuelPrice: 170,
    });
    expect(result.currency).toBe("JPY");
    expect(result.distanceUnit).toBe("km");
    expect(result.fuelUsedLitres).toBeCloseTo(20, 10);
    expect(result.totalCost).toBeCloseTo(3400, 8);
    expect(result.costPerKm).toBeCloseTo(11.3, 1);
    expect(result.costPer100Km).toBeCloseTo(1133.3, 1);
  });

  it("calculates an Indian trip in kilometres, km/L and rupees", () => {
    const result = calculateFuelCost({
      market: "in",
      distance: 300,
      economy: 18,
      fuelPrice: 100,
    });
    expect(result.currency).toBe("INR");
    expect(result.fuelUsedLitres).toBeCloseTo(16.7, 1);
    expect(result.totalCost).toBeCloseTo(1666.7, 1);
    expect(result.costPerKm).toBeCloseTo(5.6, 1);
    expect(result.costPer100Km).toBeCloseTo(555.6, 1);
  });

  it("calculates an Australian trip in kilometres, L/100 km and Australian dollars", () => {
    const result = calculateFuelCost({
      market: "au",
      distance: 300,
      economy: 8,
      fuelPrice: 1.8,
    });
    expect(result.currency).toBe("AUD");
    expect(result.distanceUnit).toBe("km");
    expect(result.fuelUsedLitres).toBeCloseTo(24, 10);
    expect(result.totalCost).toBeCloseTo(43.2, 8);
    expect(result.costPerKm).toBeCloseTo(0.144, 8);
    expect(result.costPer100Km).toBeCloseTo(14.4, 8);
  });

  it("calculates a South Korean trip in kilometres, km/L and won", () => {
    const result = calculateFuelCost({
      market: "kr",
      distance: 300,
      economy: 13,
      fuelPrice: 1700,
    });
    expect(result.currency).toBe("KRW");
    expect(result.fuelUsedLitres).toBeCloseTo(23.1, 1);
    expect(result.totalCost).toBeCloseTo(39230.8, 1);
    expect(result.costPerKm).toBeCloseTo(130.8, 1);
    expect(result.costPer100Km).toBeCloseTo(13076.9, 1);
  });

  it("calculates a Swiss trip in kilometres and Swiss francs", () => {
    const result = calculateFuelCost({
      market: "ch",
      distance: 500,
      economy: 6.5,
      fuelPrice: 1.75,
    });
    expect(result.currency).toBe("CHF");
    expect(result.fuelUsedLitres).toBeCloseTo(32.5, 10);
    expect(result.totalCost).toBeCloseTo(56.875, 8);
    expect(result.costPerKm).toBeCloseTo(0.11375, 8);
  });

  it("doubles the distance for a round trip", () => {
    const oneWay = calculateFuelCost({
      market: "eu",
      distance: 100,
      economy: 5,
      fuelPrice: 1.8,
    });
    const roundTrip = calculateFuelCost({
      market: "eu",
      distance: 100,
      economy: 5,
      fuelPrice: 1.8,
      roundTrip: true,
    });
    expect(roundTrip.billableDistance).toBe(200);
    expect(roundTrip.totalCost).toBeCloseTo(oneWay.totalCost * 2, 10);
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculateFuelCost({ market: "uk", distance: 0, economy: 50, fuelPrice: 145 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateFuelCost({ market: "uk", distance: 10, economy: 0, fuelPrice: 145 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateFuelCost({ market: "uk", distance: 10, economy: 50, fuelPrice: -1 }),
    ).toThrow(RangeError);
  });
});

describe("calculateEvChargingCost", () => {
  it("calculates a UK battery-percentage charge with losses", () => {
    const result = calculateEvChargingCost({
      market: "uk",
      mode: "battery",
      batteryCapacityKwh: 75,
      startSoc: 20,
      endSoc: 80,
      pricePerKwh: 25,
      efficiencyPct: 90,
      sessionFee: 0,
      consumptionValue: 3.5,
    });
    expect(result.batteryEnergyKwh).toBeCloseTo(45, 10);
    expect(result.gridEnergyKwh).toBeCloseTo(50, 10);
    expect(result.energyLostKwh).toBeCloseTo(5, 10);
    expect(result.electricityCost).toBeCloseTo(12.5, 10);
    expect(result.allInCostPerKwh).toBeCloseTo(0.25, 10);
    expect(result.rangeDistance).toBeCloseTo(157.5, 10);
    expect(result.costPerMile).toBeCloseTo(0.079365, 6);
    expect(result.costPer100Km).toBeCloseTo(4.9313, 3);
  });

  it("includes a session fee in the all-in cost", () => {
    const result = calculateEvChargingCost({
      market: "us",
      mode: "energy",
      energyAddedKwh: 40,
      pricePerKwh: 17,
      efficiencyPct: 90,
      sessionFee: 2,
    });
    expect(result.gridEnergyKwh).toBeCloseTo(44.4444, 4);
    expect(result.electricityCost).toBeCloseTo(7.5556, 4);
    expect(result.totalCost).toBeCloseTo(9.5556, 4);
    expect(result.allInCostPerKwh).toBeCloseTo(0.215, 4);
  });

  it("calculates a European charge from battery capacity", () => {
    const result = calculateEvChargingCost({
      market: "eu",
      mode: "battery",
      batteryCapacityKwh: 50,
      startSoc: 10,
      endSoc: 60,
      pricePerKwh: 0.35,
      efficiencyPct: 88,
      consumptionValue: 17,
    });
    expect(result.batteryEnergyKwh).toBeCloseTo(25, 10);
    expect(result.gridEnergyKwh).toBeCloseTo(28.40909, 5);
    expect(result.totalCost).toBeCloseTo(9.94318, 5);
    expect(result.rangeDistance).toBeCloseTo(147.0588, 3);
    expect(result.costPer100Km).toBeCloseTo(6.7613, 3);
  });

  it("calculates a Japanese EV charge in yen and kWh/100 km", () => {
    const result = calculateEvChargingCost({
      market: "jp",
      mode: "battery",
      batteryCapacityKwh: 50,
      startSoc: 10,
      endSoc: 60,
      pricePerKwh: 30,
      efficiencyPct: 88,
      consumptionValue: 17,
    });
    expect(result.currency).toBe("JPY");
    expect(result.batteryEnergyKwh).toBeCloseTo(25, 10);
    expect(result.gridEnergyKwh).toBeCloseTo(28.40909, 5);
    expect(result.totalCost).toBeCloseTo(852.3, 1);
    expect(result.rangeDistance).toBeCloseTo(147.0588, 3);
    expect(result.costPer100Km).toBeCloseTo(579.5, 1);
  });

  it("calculates an Indian EV charge in rupees and kWh/100 km", () => {
    const result = calculateEvChargingCost({
      market: "in",
      mode: "battery",
      batteryCapacityKwh: 50,
      startSoc: 10,
      endSoc: 60,
      pricePerKwh: 8,
      efficiencyPct: 88,
      consumptionValue: 17,
    });
    expect(result.currency).toBe("INR");
    expect(result.batteryEnergyKwh).toBeCloseTo(25, 10);
    expect(result.gridEnergyKwh).toBeCloseTo(28.40909, 5);
    expect(result.totalCost).toBeCloseTo(227.3, 1);
    expect(result.rangeDistance).toBeCloseTo(147.0588, 3);
  });

  it("calculates an Australian EV charge in Australian dollars and kWh/100 km", () => {
    const result = calculateEvChargingCost({
      market: "au",
      mode: "battery",
      batteryCapacityKwh: 50,
      startSoc: 10,
      endSoc: 60,
      pricePerKwh: 0.35,
      efficiencyPct: 88,
      consumptionValue: 17,
    });
    expect(result.currency).toBe("AUD");
    expect(result.batteryEnergyKwh).toBeCloseTo(25, 10);
    expect(result.gridEnergyKwh).toBeCloseTo(28.40909, 5);
    expect(result.totalCost).toBeCloseTo(9.94318, 5);
    expect(result.rangeDistance).toBeCloseTo(147.0588, 3);
    expect(result.costPer100Km).toBeCloseTo(6.7613, 3);
  });

  it("calculates a Swiss charge with metric consumption and CHF", () => {
    const result = calculateEvChargingCost({
      market: "ch",
      mode: "battery",
      batteryCapacityKwh: 50,
      startSoc: 10,
      endSoc: 60,
      pricePerKwh: 0.35,
      efficiencyPct: 88,
      consumptionValue: 17,
    });
    expect(result.currency).toBe("CHF");
    expect(result.batteryEnergyKwh).toBeCloseTo(25, 10);
    expect(result.gridEnergyKwh).toBeCloseTo(28.40909, 5);
    expect(result.totalCost).toBeCloseTo(9.94318, 5);
    expect(result.rangeDistance).toBeCloseTo(147.0588, 3);
  });

  it("rejects an end state of charge below the start", () => {
    expect(() =>
      calculateEvChargingCost({
        market: "uk",
        mode: "battery",
        batteryCapacityKwh: 75,
        startSoc: 80,
        endSoc: 20,
        pricePerKwh: 25,
        efficiencyPct: 90,
      }),
    ).toThrow(RangeError);
  });

  it("rejects efficiency above 100 percent", () => {
    expect(() =>
      calculateEvChargingCost({
        market: "uk",
        mode: "energy",
        energyAddedKwh: 10,
        pricePerKwh: 25,
        efficiencyPct: 101,
      }),
    ).toThrow(RangeError);
  });
});

describe("calculateEvVsPetrol", () => {
  it("compares UK annual running costs and a purchase-price break-even", () => {
    const result = calculateEvVsPetrol({
      market: "uk",
      annualDistance: 10000,
      petrolEconomy: 50,
      petrolPrice: 145,
      evEconomy: 3.5,
      electricityPrice: 25,
      chargingEfficiencyPct: 90,
      upfrontPriceDifference: 5000,
    });
    expect(result.petrolLitres).toBeCloseTo(909.218, 3);
    expect(result.annualPetrolCost).toBeCloseTo(1318.366, 3);
    expect(result.annualEvCost).toBeCloseTo(793.6508, 3);
    expect(result.annualDifference).toBeCloseTo(524.715, 3);
    expect(result.breakEvenYears).toBeCloseTo(9.5289, 3);
    expect(result.evCostPer100Km).toBeCloseTo(4.9313, 3);
  });

  it("compares US annual running costs", () => {
    const result = calculateEvVsPetrol({
      market: "us",
      annualDistance: 12000,
      petrolEconomy: 30,
      petrolPrice: 3.5,
      evEconomy: 3.5,
      electricityPrice: 17,
      chargingEfficiencyPct: 90,
    });
    expect(result.annualPetrolCost).toBeCloseTo(1400, 8);
    expect(result.annualEvCost).toBeCloseTo(647.619, 3);
    expect(result.annualDifference).toBeCloseTo(752.381, 3);
    expect(result.breakEvenYears).toBeNull();
  });

  it("compares European annual running costs", () => {
    const result = calculateEvVsPetrol({
      market: "eu",
      annualDistance: 15000,
      petrolEconomy: 6.5,
      petrolPrice: 1.75,
      evEconomy: 17,
      electricityPrice: 0.35,
      chargingEfficiencyPct: 90,
    });
    expect(result.annualPetrolCost).toBeCloseTo(1706.25, 8);
    expect(result.annualEvCost).toBeCloseTo(991.6667, 3);
    expect(result.annualDifference).toBeCloseTo(714.5833, 3);
    expect(result.evCostPer100Km).toBeCloseTo(6.6111, 3);
  });

  it("compares Japanese annual running costs in yen", () => {
    const result = calculateEvVsPetrol({
      market: "jp",
      annualDistance: 15000,
      petrolEconomy: 13,
      petrolPrice: 170,
      evEconomy: 17,
      electricityPrice: 30,
      chargingEfficiencyPct: 90,
    });
    expect(result.currency).toBe("JPY");
    expect(result.annualPetrolCost).toBeCloseTo(196153.846, 3);
    expect(result.annualEvCost).toBeCloseTo(85000, 3);
    expect(result.annualDifference).toBeCloseTo(111153.846, 3);
    expect(result.evCostPer100Km).toBeCloseTo(566.667, 3);
  });

  it("compares Australian annual running costs in Australian dollars", () => {
    const result = calculateEvVsPetrol({
      market: "au",
      annualDistance: 15000,
      petrolEconomy: 8,
      petrolPrice: 1.8,
      evEconomy: 17,
      electricityPrice: 0.35,
      chargingEfficiencyPct: 90,
    });
    expect(result.currency).toBe("AUD");
    expect(result.annualPetrolCost).toBeCloseTo(2160, 8);
    expect(result.annualEvCost).toBeCloseTo(991.667, 3);
    expect(result.annualDifference).toBeCloseTo(1168.333, 3);
    expect(result.evCostPer100Km).toBeCloseTo(6.6111, 3);
  });

  it("compares Indian annual running costs in rupees", () => {
    const result = calculateEvVsPetrol({
      market: "in",
      annualDistance: 15000,
      petrolEconomy: 18,
      petrolPrice: 100,
      evEconomy: 17,
      electricityPrice: 8,
      chargingEfficiencyPct: 90,
    });
    expect(result.currency).toBe("INR");
    expect(result.annualPetrolCost).toBeCloseTo(83333.3, 1);
    expect(result.annualEvCost).toBeCloseTo(22666.7, 1);
    expect(result.annualDifference).toBeCloseTo(60666.7, 1);
    expect(result.evCostPer100Km).toBeCloseTo(151.1, 1);
  });

  it("compares Swiss annual running costs in CHF", () => {
    const result = calculateEvVsPetrol({
      market: "ch",
      annualDistance: 15000,
      petrolEconomy: 6.5,
      petrolPrice: 1.75,
      evEconomy: 17,
      electricityPrice: 0.35,
      chargingEfficiencyPct: 90,
    });
    expect(result.currency).toBe("CHF");
    expect(result.annualPetrolCost).toBeCloseTo(1706.25, 8);
    expect(result.annualEvCost).toBeCloseTo(991.6667, 3);
    expect(result.evCostPer100Km).toBeCloseTo(6.6111, 3);
  });

  it("never reports a break-even when the EV costs more to run", () => {
    const result = calculateEvVsPetrol({
      market: "uk",
      annualDistance: 10000,
      petrolEconomy: 50,
      petrolPrice: 145,
      evEconomy: 2,
      electricityPrice: 60,
      chargingEfficiencyPct: 80,
      upfrontPriceDifference: 5000,
    });
    expect(result.annualDifference).toBeLessThan(0);
    expect(result.breakEvenYears).toBeNull();
  });
});

describe("convertPower", () => {
  it("converts kW to PS and hp", () => {
    const result = convertPower(100, "kw");
    expect(result.ps).toBeCloseTo(135.962, 2);
    expect(result.hp).toBeCloseTo(134.102, 2);
    expect(result.bhp).toBeCloseTo(134.102, 2);
  });

  it("round-trips PS", () => {
    const result = convertPower(150, "ps");
    expect(result.kw).toBeCloseTo(110.3248, 3);
    expect(result.hp).toBeCloseTo(147.948, 2);
  });

  it("round-trips hp and treats bhp as mechanical hp", () => {
    const result = convertPower(150, "hp");
    expect(result.kw).toBeCloseTo(111.855, 2);
    expect(result.ps).toBeCloseTo(152.081, 2);
    expect(convertPower(result.kw, "kw").hp).toBeCloseTo(150, 10);
    expect(convertPower(150, "bhp").kw).toBeCloseTo(result.kw, 10);
  });

  it("accepts zero but rejects negative values", () => {
    expect(convertPower(0, "kw").hp).toBe(0);
    expect(() => convertPower(-1, "kw")).toThrow(RangeError);
  });
});

describe("parseLocalizedNumber", () => {
  it.each([
    ["1.5", 1.5],
    ["1,5", 1.5],
    ["1,500", 1500],
    ["1.234,5", 1234.5],
    ["1,234.5", 1234.5],
    ["1 234,5", 1234.5],
    [" 42 ", 42],
  ])("parses %s", (input, expected) => {
    expect(parseLocalizedNumber(input)).toBe(expected);
  });

  it("rejects empty and non-numeric input", () => {
    expect(parseLocalizedNumber("")).toBeNull();
    expect(parseLocalizedNumber("abc")).toBeNull();
    expect(parseLocalizedNumber("-")).toBeNull();
  });

  it("uses EU decimal-comma conventions when a market is supplied", () => {
    expect(parseLocalizedNumber("1,5", "eu")).toBe(1.5);
    expect(parseLocalizedNumber("1,500", "eu")).toBe(1.5);
    expect(parseLocalizedNumber("0,123", "eu")).toBe(0.123);
    expect(parseLocalizedNumber("1.500", "eu")).toBe(1500);
    expect(parseLocalizedNumber("15.000", "eu")).toBe(15000);
    expect(parseLocalizedNumber("0.123", "eu")).toBe(0.123);
    expect(parseLocalizedNumber("1 234,5", "eu")).toBe(1234.5);
    expect(parseLocalizedNumber("1.234,5", "eu")).toBe(1234.5);
    expect(parseLocalizedNumber("1,234.5", "eu")).toBe(1234.5);
    expect(parseLocalizedNumber("1,234,567", "eu")).toBe(1234567);
  });

  it("uses Swiss decimal-comma and apostrophe conventions when a market is supplied", () => {
    expect(parseLocalizedNumber("1,5", "ch")).toBe(1.5);
    expect(parseLocalizedNumber("15.000", "ch")).toBe(15000);
    expect(parseLocalizedNumber("15'000", "ch")).toBe(15000);
    expect(parseLocalizedNumber("1 234,5", "ch")).toBe(1234.5);
  });
});
