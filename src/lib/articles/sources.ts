import type { Article } from "./types";

export type ArticleSource = {
  href: string;
  label: string;
  note?: string;
};

const nistUnits: ArticleSource = {
  href: "https://www.nist.gov/pml/owm/metric-si/unit-conversion",
  label: "NIST — unit conversion",
  note: "US customary and metric relationships used by the converters.",
};

const ukGallonLaw: ArticleSource = {
  href: "https://www.legislation.gov.uk/ukpga/1985/72",
  label: "UK Weights and Measures Act 1985",
  note: "Statutory context for UK units, including the imperial gallon.",
};

const epaFuelEconomy: ArticleSource = {
  href: "https://www.fueleconomy.gov/feg/",
  label: "fueleconomy.gov — US fuel-economy ratings",
  note: "EPA label values, test-cycle context and consumer guidance.",
};

const ukFuelPrices: ArticleSource = {
  href: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
  label: "GOV.UK — weekly road fuel prices",
  note: "UK price statistics for context, not a live station price.",
};

const eiaFuelPrices: ArticleSource = {
  href: "https://www.eia.gov/petroleum/gasdiesel/",
  label: "US EIA — gasoline and diesel prices",
  note: "US regional and national averages.",
};

const euOilBulletin: ArticleSource = {
  href: "https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en",
  label: "European Commission — Weekly Oil Bulletin",
  note: "EU fuel price monitoring.",
};

const driveHabits: ArticleSource = {
  href: "https://www.fueleconomy.gov/feg/driveHabits.jsp",
  label: "fueleconomy.gov — driving habits",
  note: "Official US guidance on idling, speeding, loads and driving behaviour.",
};

const whyFuelEconomy: ArticleSource = {
  href: "https://www.fueleconomy.gov/feg/why.shtml",
  label: "fueleconomy.gov — factors that affect fuel economy",
  note: "How speed, weather, load and maintenance can change consumption.",
};

const hotWeather: ArticleSource = {
  href: "https://www.fueleconomy.gov/feg/hotweather.shtml",
  label: "fueleconomy.gov — hot weather and fuel economy",
  note: "Air-conditioning and hot-weather effects.",
};

const coldWeather: ArticleSource = {
  href: "https://www.fueleconomy.gov/feg/coldweather.shtml",
  label: "fueleconomy.gov — cold weather and fuel economy",
  note: "Cold-start, heating and winter efficiency effects.",
};

const epaEvTesting: ArticleSource = {
  href: "https://www.epa.gov/greenvehicles/fuel-economy-and-ev-range-testing",
  label: "US EPA — fuel economy and EV range testing",
  note: "Explains MPGe and the test basis for EV efficiency.",
};

const evLabel: ArticleSource = {
  href: "https://www.fueleconomy.gov/feg/label/learn-more-electric-label.shtml",
  label: "fueleconomy.gov — understanding the EV label",
  note: "How MPGe, kWh/100 miles and range appear on US labels.",
};

const afdcHomeCharging: ArticleSource = {
  href: "https://afdc.energy.gov/fuels/electricity_charging_home.html",
  label: "US DOE Alternative Fuels Data Center — home charging",
  note: "Home charging equipment, tariffs and practical considerations.",
};

const epaEvMyths: ArticleSource = {
  href: "https://www.epa.gov/greenvehicles/electric-vehicle-myths",
  label: "US EPA — electric vehicle myths",
  note: "Common EV efficiency, emissions and charging questions.",
};

const eiaElectricity: ArticleSource = {
  href: "https://www.eia.gov/electricity/",
  label: "US EIA — electricity data",
  note: "US electricity prices, generation and sales data.",
};

const hybridGuide: ArticleSource = {
  href: "https://www.fueleconomy.gov/feg/hybrids.jsp",
  label: "fueleconomy.gov — hybrids",
  note: "How hybrid vehicles use fuel and electricity.",
};

const categorySources: Record<Article["category"], ArticleSource[]> = {
  "Fuel & units": [nistUnits, ukGallonLaw, epaFuelEconomy, ukFuelPrices, eiaFuelPrices],
  "Trip & budget": [ukFuelPrices, eiaFuelPrices, euOilBulletin, epaFuelEconomy],
  Driving: [driveHabits, whyFuelEconomy, epaFuelEconomy],
  "EV & charging": [epaEvTesting, evLabel, afdcHomeCharging, epaEvMyths, eiaElectricity],
};

const extraSources: Partial<Record<string, ArticleSource[]>> = {
  "ac-fuel-economy": [hotWeather],
  "ev-range-cold-weather": [coldWeather],
  "hybrid-vs-petrol-cost": [hybridGuide],
};

function dedupe(sources: ArticleSource[]): ArticleSource[] {
  return sources.filter(
    (source, index) => sources.findIndex((candidate) => candidate.href === source.href) === index,
  );
}

export function getArticleSources(article: Article): ArticleSource[] {
  if (article.sources?.length) return article.sources;
  return dedupe([...categorySources[article.category], ...(extraSources[article.slug] ?? [])]);
}
