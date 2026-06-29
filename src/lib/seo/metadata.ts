import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getSiteUrl } from "@/lib/seo/site-url";
import siteConfig from "@/data/site-config.json";

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogImageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
};

const SITE_NAME = siteConfig.name;

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = `${SITE_NAME} – ${siteConfig.tagline}`,
  type = "website",
  noIndex = false,
  publishedTime,
}: PageSeoInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${path}`;
  const ogTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const openGraph = {
    title: ogTitle,
    description,
    url: canonical,
    siteName: SITE_NAME,
    locale: "de_DE",
    type,
    images: [
      {
        url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
    ...(type === "article" && publishedTime ? { publishedTime } : {}),
  } satisfies Metadata["openGraph"];

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function createRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${SITE_NAME} – Libertäre Partei für Freiheit & Minimalstaat`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "DIE LIBERTÄREN: Deutschlands konsequente libertäre Partei für individuelle Freiheit, Eigentum, freien Markt und Minimalstaat – freiheitlich aus Prinzip.",
    keywords: [
      "Libertarismus",
      "Freiheit",
      "liberale Partei",
      "Minimalstaat",
      "Nichtaggressionsprinzip",
      "Eigentum",
      "freier Markt",
      "DIE LIBERTÄREN",
      "libertäre Partei Deutschland",
    ],
    authors: [{ name: SITE_NAME, url: siteUrl }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Politik",
    alternates: { canonical: siteUrl },
    openGraph: {
      title: `${SITE_NAME} – ${siteConfig.tagline}`,
      description: siteConfig.description,
      url: siteUrl,
      siteName: SITE_NAME,
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: `${siteUrl}${DEFAULT_OG_IMAGE}`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Die_Libertaeren",
      creator: "@hummel_mathias",
    },
    robots: { index: true, follow: true },
    icons: {
      icon: "/images/favicon.ico",
      apple: "/images/logo.png",
    },
  };
}