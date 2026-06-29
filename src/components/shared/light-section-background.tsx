import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LightSectionBackgroundProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Light paper background using Background_2.jpg.
 * Soft multiply + bright off-white wash: visible grain, airy stationery feel.
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