import { articles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/format";
import { guides } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = [
    ...guides.map((guide) => ({
      title: guide.title,
      description: guide.description,
      href: guide.href,
      date: "2026-10-27",
    })),
    ...articles.map((article) => ({
      title: article.title,
      description: article.description,
      href: `/guides/${article.slug}`,
      date: article.updated,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RoadCost guides</title>
    <link>${escapeXml(absoluteUrl("/guides"))}</link>
    <description>Plain-English fuel, EV and efficiency guides from RoadCost.</description>
    <language>en</language>
    <lastBuildDate>${new Date("2026-10-27T00:00:00Z").toUTCString()}</lastBuildDate>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(absoluteUrl(item.href))}</link>
      <guid>${escapeXml(absoluteUrl(item.href))}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
