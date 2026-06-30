"use client";

import { useRouter } from "next/navigation";
import type { WahlomatElectionDisplay } from "@/lib/cms/wahlomat";
import { WahlomatFeature } from "./wahlomat-feature";

type WahlomatPageClientProps = {
  election: WahlomatElectionDisplay;
  elections: WahlomatElectionDisplay[];
};

export function WahlomatPageClient({
  election,
  elections,
}: WahlomatPageClientProps) {
  const router = useRouter();

  const handleElectionChange = (slug: string) => {
    router.push(`/stimmst-du-mit-uns-ueberein?wahl=${slug}`);
  };

  return (
    <WahlomatFeature
      election={election}
      elections={elections}
      onElectionChange={handleElectionChange}
    />
  );
}