import { JsonLd } from "@/components/ui";
import { absoluteUrl } from "@/lib/format";
import type { ToolFaq } from "@/lib/tool-faqs";

export function CalculatorJsonLd({
  name,
  description,
  path,
  faqs = [],
}: {
  name: string;
  description: string;
  path: string;
  faqs?: ToolFaq[];
}) {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript for live calculations",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    isAccessibleForFree: true,
    inLanguage: "en",
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return <JsonLd data={faqSchema ? [calculatorSchema, faqSchema] : calculatorSchema} />;
}
