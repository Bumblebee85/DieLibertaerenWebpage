import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LightSectionBackgroundProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Premium paper background using Background_2.jpg.
 * Dark multiply base + contrast filter makes the pale grain readable;
 * a thin wash keeps the zone light and airy.
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