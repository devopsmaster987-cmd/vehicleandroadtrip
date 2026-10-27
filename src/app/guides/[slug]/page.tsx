import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/article-jsonld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import {
  Breadcrumbs,
  FaqList,
  LastReviewed,
  Notice,
  RelatedTools,
  SourceList,
} from "@/components/ui";
import {
  articles,
  getArticle,
  getArticleSources,
  getRelatedArticles,
} from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/guides/${article.slug}`,
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "RoadCost — fuel, EV and efficiency calculators",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/og.png"],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const sources = getArticleSources(article);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs
        items={[{ href: "/guides", label: "Guides" }, { label: article.title }]}
      />
      <BreadcrumbJsonLd
        items={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { label: article.title },
        ]}
      />
      <ArticleJsonLd article={article} />

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {article.category}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span>
            By{" "}
            <Link
              href="/authors/roadcost-editorial"
              className="font-medium text-brand hover:underline"
            >
              RoadCost Editorial
            </Link>
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span>
            Updated{" "}
            <time dateTime={article.updated}>
              {new Date(`${article.updated}T00:00:00Z`).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </span>
        </div>
        <p className="mt-4 text-base leading-7 text-ink-soft">{article.intro}</p>

        <div className="mt-6 rounded-xl border border-brand/25 bg-brand-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-dark">
            Quick answer
          </p>
          <p className="mt-2 text-base leading-7 text-ink">{article.quickAnswer}</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              In this guide
            </p>
            <ol className="mt-3 space-y-2 text-sm leading-5">
              {article.sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#section-${index + 1}`}
                    className="text-ink-soft hover:text-brand hover:underline"
                  >
                    {index + 1}. {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href="#questions" className="text-ink-soft hover:text-brand hover:underline">
                  Questions
                </a>
              </li>
            </ol>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Key takeaways
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
              {article.takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {article.sections.map((section, index) => (
            <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-sm leading-7 text-ink-soft">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.formula ? (
                  <pre className="formula rounded-lg border border-line bg-surface p-4 text-ink-soft">
                    {section.formula}
                  </pre>
                ) : null}
                {section.table ? (
                  <div className="overflow-x-auto rounded-xl border border-line bg-surface">
                    <table className="w-full min-w-[34rem] border-collapse text-sm">
                      <caption className="border-b border-line px-4 py-3 text-left font-semibold text-ink">
                        {section.table.caption}
                      </caption>
                      <thead className="bg-paper text-left text-xs uppercase tracking-wide text-muted">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header} scope="col" className="px-4 py-2.5 font-semibold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {section.table.rows.map((row) => (
                          <tr key={row.join("-")}>
                            {row.map((cell, cellIndex) =>
                              cellIndex === 0 ? (
                                <th
                                  key={cell}
                                  scope="row"
                                  className="px-4 py-2.5 font-medium text-ink"
                                >
                                  {cell}
                                </th>
                              ) : (
                                <td key={cell} className="numeric px-4 py-2.5 text-ink-soft">
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <section id="questions" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Questions</h2>
          <div className="mt-4">
            <FaqList items={article.faqs} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Sources</h2>
          <div className="mt-4">
            <SourceList sources={sources} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Try the calculator</h2>
          <div className="mt-4">
            <RelatedTools items={[article.tool]} />
          </div>
        </section>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Related guides</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/guides/${relatedArticle.slug}`}
                  className="group rounded-lg border border-line bg-surface p-4 transition hover:border-brand/40 hover:bg-brand-soft/40"
                >
                  <p className="text-sm font-semibold text-ink group-hover:text-brand">
                    {relatedArticle.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {relatedArticle.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10">
          <Notice title="A note on prices and rules">
            This guide explains arithmetic and units. It does not publish live fuel prices,
            electricity tariffs or changing tax rules. Use your own price and check official
            sources for anything that changes.
          </Notice>
        </div>

        <div className="mt-8">
          <LastReviewed />
        </div>
      </article>
    </div>
  );
}
