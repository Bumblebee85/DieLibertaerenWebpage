import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/shared/json-ld";

type Crumb = { label: string; href?: string };

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonItems = [
    { name: "Startseite", path: "/" },
    ...items.map((item) => ({
      name: item.label,
      path: item.href ?? "",
    })),
  ].filter((item) => item.path);

  return (
    <>
      <BreadcrumbJsonLd items={jsonItems} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pb-4 pt-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              Startseite
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}