import { legal } from "@/data/legal";
import siteConfig from "@/data/site-config.json";
import { getSiteUrl } from "@/lib/seo/site-url";

export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  const politicalParty = {
    "@context": "https://schema.org",
    "@type": "PoliticalParty",
    "@id": `${siteUrl}/#politicalparty`,
    name: legal.organization,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    logo: `${siteUrl}/images/logo-dark.png`,
    image: `${siteUrl}/images/logo-dark.png`,
    email: legal.contact.emailPublic,
    telephone: legal.contact.phone,
    slogan: siteConfig.tagline,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: legal.streetAddress.street,
        postalCode: legal.streetAddress.postalCode,
        addressLocality: legal.streetAddress.city,
        addressCountry: "DE",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: legal.streetAddress.street,
      postalCode: legal.streetAddress.postalCode,
      addressLocality: legal.streetAddress.city,
      addressCountry: "DE",
    },
    sameAs: Object.values(siteConfig.social),
    memberOf: {
      "@type": "Organization",
      name: "Libertäre Bewegung Deutschland",
    },
    knowsAbout: [
      "Libertarismus",
      "Freiheit",
      "Minimalstaat",
      "Nichtaggressionsprinzip",
      "Eigentum",
      "freier Markt",
      "Sezession",
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: legal.organization,
    url: siteUrl,
    logo: `${siteUrl}/images/logo-dark.png`,
    email: legal.contact.emailPublic,
    telephone: legal.contact.phone,
    sameAs: Object.values(siteConfig.social),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "de-DE",
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [politicalParty, organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author?: string;
  image?: string;
};

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  author = siteConfig.name,
  image = "/images/logo-dark.png",
}: ArticleJsonLdProps) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: siteUrl,
    },
    publisher: {
      "@type": "PoliticalParty",
      name: legal.organization,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo-dark.png`,
      },
    },
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    inLanguage: "de-DE",
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}