import { JsonLd } from "@/components/ui";
import { absoluteUrl } from "@/lib/format";

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ href?: string; label: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          ...(item.href ? { item: absoluteUrl(item.href) } : {}),
        })),
      }}
    />
  );
}
