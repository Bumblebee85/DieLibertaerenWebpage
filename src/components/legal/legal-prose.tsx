import Link from "next/link";
import { cn } from "@/lib/utils";

/** Lesbare Typografie für Impressum und Datenschutz. */
export function LegalProse({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function LegalNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Inhaltsverzeichnis"
      className="rounded-2xl border border-border bg-muted/40 p-6"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
        Inhalt
      </p>
      <ol className="space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="text-primary transition-colors hover:underline"
            >
              {index + 1}. {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}