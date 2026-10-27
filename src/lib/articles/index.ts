import type { Article } from "./types";
import { fuelUnitsArticles } from "./fuel-units";
import { tripBudgetArticles } from "./trip-budget";
import { drivingArticles } from "./driving";
import { evArticles } from "./ev";
import { getArticleSources } from "./sources";

export type { Article, ArticleFaq, ArticleSection } from "./types";
export type { ArticleSource } from "./sources";
export { getArticleSources };

export const articles: Article[] = [
  ...fuelUnitsArticles,
  ...tripBudgetArticles,
  ...drivingArticles,
  ...evArticles,
];

export const articleCategories = [
  "Fuel & units",
  "Trip & budget",
  "Driving",
  "EV & charging",
] as const;

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((related): related is Article => Boolean(related));
}
