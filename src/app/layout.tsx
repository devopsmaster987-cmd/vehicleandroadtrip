import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/ui";
import { CONTACT_EMAIL, SITE_URL, absoluteUrl } from "@/lib/format";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RoadCost — Fuel, EV and efficiency calculators for eight markets",
    template: "%s | RoadCost",
  },
  description:
    "Transparent fuel cost, EV charging, efficiency and power calculators with explicit UK, US, European, Swiss and Asia-Pacific units, formulas and tested conversions.",
  applicationName: "RoadCost",
  authors: [{ name: "RoadCost" }],
  creator: "RoadCost",
  publisher: "RoadCost",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "RoadCost",
    title: "RoadCost — Fuel, EV and efficiency calculators",
    description:
      "Transparent fuel, EV and unit calculators for eight markets. Every tool states its units and shows the formula.",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RoadCost — fuel, EV and efficiency calculators",
      },
    ],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "RoadCost — Fuel, EV and efficiency calculators",
    description:
      "Transparent fuel, EV and unit calculators for eight markets. Every tool states its units and shows the formula.",
    images: ["/og.png"],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#f5f7f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="no-print sr-only z-50 rounded-md bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${absoluteUrl("/")}#website`,
              name: "RoadCost",
              url: absoluteUrl("/"),
              description:
                "Fuel, EV and efficiency calculators with explicit UK, US, European, Swiss and Asia-Pacific units.",
              inLanguage: "en",
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${absoluteUrl("/")}#organization`,
              name: "RoadCost",
              url: absoluteUrl("/"),
              logo: absoluteUrl("/logo.png"),
              publishingPrinciples: absoluteUrl("/editorial-policy"),
              correctionsPolicy: absoluteUrl("/corrections"),
              knowsAbout: [
                "Fuel economy",
                "Fuel cost calculation",
                "EV charging cost",
                "Unit conversion",
                "Vehicle efficiency",
              ],
              ...(CONTACT_EMAIL
                ? {
                    email: CONTACT_EMAIL,
                    contactPoint: {
                      "@type": "ContactPoint",
                      email: CONTACT_EMAIL,
                      contactType: "customer support",
                      availableLanguage: "English",
                    },
                  }
                : {}),
            },
          ]}
        />
      </body>
    </html>
  );
}
