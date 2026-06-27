import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <section className={cn("bg-secondary py-24 text-white", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}