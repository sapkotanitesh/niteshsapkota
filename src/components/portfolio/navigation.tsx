import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, profile } from "@/lib/portfolio-data";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" hash="hero" className="font-display text-sm font-bold tracking-tight">
          {profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              {link.to ? (
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  to="/"
                  hash={link.id}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="space-y-1 border-t border-border bg-background/95 px-6 py-4 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                {...(link.to ? { to: link.to } : { to: "/", hash: link.id })}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
