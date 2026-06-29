import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LightSectionBackgroundProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Dezenter Section-Hintergrund mit Background_2.jpg.
 * Nur für helle Inhaltsbereiche unterhalb von Hero + Highlights.
 */
export function LightSectionBackground({
  children,
  className,
}: LightSectionBackgroundProps) {
  return (
    <div className={cn("light-section-texture relative isolate", className)}>
      {children}
    </div>
  );
}