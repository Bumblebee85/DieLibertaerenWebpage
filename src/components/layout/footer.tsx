import Link from "next/link";
import Image from "next/image";
import siteConfig from "@/data/site-config.json";

const footerLinks = {
  engagement: [
    { label: "Mitmachen", href: "/mitmachen" },
    { label: "Spenden", href: "/spenden" },
    { label: "Mitglied werden", href: "/werde-mitglied" },
    { label: "Shop", href: siteConfig.shop, external: true },
  ],
  info: [
    { label: "Kontakt", href: "/kontakt" },
    { label: "Programm", href: "/programm" },
    { label: "Events", href: "/events" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Satzung", href: "/programm" },
  ],
};

const socialLinks = [
  { label: "Telegram", href: siteConfig.social.telegram },
  { label: "X", href: siteConfig.social.twitter },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "YouTube", href: siteConfig.social.youtube },
  { label: "TikTok", href: siteConfig.social.tiktok },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="DIE LIBERTÄREN Logo"
              width={200}
              height={65}
              className="mb-6 h-14 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/70">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm text-white/50">{siteConfig.address}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Engagement
            </h3>
            <ul className="space-y-3">
              {footerLinks.engagement.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Information
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Rechtliches
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} DIE LIBERTÄREN e.V. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}