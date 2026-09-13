"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/write", label: "Menulis" },
    { href: "/wall", label: "Dinding Pelepasan" },
    { href: "/archive", label: "Arsip" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/40 transition-colors">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/write" className="font-serif text-xl tracking-[0.2em] text-text-primary hover:text-accent transition-colors">
          ELEGY
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-accent font-medium border-b border-accent"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-text-muted/60 hover:text-red-400 transition-colors ml-2 font-mono"
            title="Keluar dari akun"
          >
            Keluar
          </button>
        </nav>
      </div>
    </header>
  );
}
