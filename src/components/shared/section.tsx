import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "on-dark";
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  tone = "default",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center")}>
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          tone === "on-dark" ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-3xl text-lg leading-relaxed",
            tone === "on-dark" ? "text-white/70" : "text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}