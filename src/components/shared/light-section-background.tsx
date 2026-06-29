import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LightSectionBackgroundProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Heller Section-Hintergrund mit kontrastreicher Background_2.jpg-Papierstruktur.
 * Multiply-Blend + warmes Tint-Overlay – Textur sichtbar, Text lesbar.
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