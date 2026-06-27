"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Prinzipien", href: "/unsere-prinzipien" },
  { label: "Programm", href: "/programm" },
  { label: "Wahl-O-Mat", href: "/stimmst-du-mit-uns-ueberein" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  {
    label: "Partei",
    href: "#",
    children: [
      { label: "Bundesvorstand", href: "/bundesvorstand" },
      { label: "Netzwerk", href: "/netzwerk" },
      { label: "Mitmachen", href: "/mitmachen" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image
            src="/logo-dark.png"
            alt="DIE LIBERTÄREN Logo"
            width={180}
            height={58}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                  {item.label}
                </button>
                <div className="invisible absolute left-0 top-full z-50 min-w-[200px] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-border bg-white p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-muted hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/spenden">Spenden</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/werde-mitglied">Mitglied werden</Link>
          </Button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-white transition-all lg:hidden",
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navItems.flatMap((item) =>
            item.children
              ? item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))
              : [
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>,
                ]
          )}
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Button variant="outline" asChild>
              <Link href="/spenden">Spenden</Link>
            </Button>
            <Button asChild>
              <Link href="/werde-mitglied">Mitglied werden</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}