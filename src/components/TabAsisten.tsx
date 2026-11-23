"use client";

import { useState } from "react";
import FormKerangkaRiset from "./FormKerangkaRiset";
import FormSwot from "./FormSwot";

// Pengalih tab antara Asisten Kerangka Riset dan Analisis SWOT
const daftarTab = [
  { id: "riset", label: "Kerangka Riset Artikel Ilmiah" },
  { id: "swot", label: "Analisis SWOT Usaha" },
] as const;

type IdTab = (typeof daftarTab)[number]["id"];

export default function TabAsisten() {
  const [tabAktif, setTabAktif] = useState<IdTab>("riset");

  return (
    <div>
      <div className="tidak-dicetak mb-8 flex gap-2 border-b border-slate-200" role="tablist">
        {daftarTab.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tabAktif === tab.id}
            onClick={() => setTabAktif(tab.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition ${
              tabAktif === tab.id
                ? "border-primer-700 text-primer-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Kedua formulir tetap dirender agar isian tidak hilang saat berpindah tab */}
      <div hidden={tabAktif !== "riset"}>
        <FormKerangkaRiset />
      </div>
      <div hidden={tabAktif !== "swot"}>
        <FormSwot />
      </div>
    </div>
  );
}
