import { JsonLd } from "@/components/ui";
import { absoluteUrl } from "@/lib/format";
import { getArticleSources, type Article } from "@/lib/articles";

type GuideSchemaInput = {
  slug: string;
  title: string;
  description: string;
  abstract: string;
  section: string;
  published: string;
  updated: string;
  citations?: string[];
};

function buildArticleSchema(guide: GuideSchemaInput) {
  const url = absoluteUrl(`/guides/${guide.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    abstract: guide.abstract,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: "en",
    isAccessibleForFree: true,
    articleSection: guide.section,
    mainEntityOfPage: url,
    url,
    image: absoluteUrl("/og.png"),
    publishingPrinciples: absoluteUrl("/editorial-policy"),
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    ...(guide.citations && guide.citations.length > 0 ? { citation: guide.citations } : {}),
    author: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/authors/roadcost-editorial")}#editorial`,
      name: "RoadCost Editorial",
      url: absoluteUrl("/authors/roadcost-editorial"),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: "RoadCost",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
  };
}

export function GuideArticleJsonLd(props: GuideSchemaInput) {
  return <JsonLd data={buildArticleSchema(props)} />;
}

export function ArticleJsonLd({ article }: { article: Article }) {
  const articleSchema = buildArticleSchema({
    slug: article.slug,
    title: article.title,
    description: article.description,
    abstract: article.quickAnswer,
    section: article.category,
    published: article.published,
    updated: article.updated,
    citations: getArticleSources(article).map((source) => source.href),
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={[articleSchema, faqSchema]} />;
}
