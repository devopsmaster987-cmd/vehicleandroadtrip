export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  formula?: string;
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: "Fuel & units" | "Trip & budget" | "Driving" | "EV & charging";
  readingTime: string;
  published: string;
  updated: string;
  intro: string;
  quickAnswer: string;
  takeaways: string[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  tool: { href: string; name: string; description: string };
  related: string[];
  sources?: Array<{ href: string; label: string; note?: string }>;
};
