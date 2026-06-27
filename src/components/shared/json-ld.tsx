import siteConfig from "@/data/site-config.json";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "PoliticalParty",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    slogan: siteConfig.tagline,
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}