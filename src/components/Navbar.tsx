"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { infoSitus, menuNavigasi } from "@/data/situs";

// Bilah navigasi atas, responsif untuk layar ponsel dan desktop
export default function Navbar() {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  const kelasTautan = (href: string) => {
    const aktif = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `rounded-md px-3 py-2 text-sm font-medium transition ${
      aktif ? "bg-primer-50 text-primer-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;
  };

  return (
    <header className="tidak-dicetak sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="wadah flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuTerbuka(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primer-700 text-sm font-bold text-white">
            KB
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-primer-900">{infoSitus.nama}</span>
            <span className="block text-xs text-slate-500">Universitas Labuhanbatu</span>
          </span>
        </Link>

        {/* Menu desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {menuNavigasi.map((menu) => (
            <Link key={menu.href} href={menu.href} className={kelasTautan(menu.href)}>
              {menu.label}
            </Link>
          ))}
        </div>

        {/* Tombol menu ponsel */}
        <button
          type="button"
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Buka menu navigasi"
          aria-expanded={menuTerbuka}
          onClick={() => setMenuTerbuka(!menuTerbuka)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuTerbuka ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu ponsel */}
      {menuTerbuka && (
        <div className="wadah flex flex-col gap-1 pb-4 md:hidden">
          {menuNavigasi.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={kelasTautan(menu.href)}
              onClick={() => setMenuTerbuka(false)}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
