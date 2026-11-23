"use client";

import { useState } from "react";

// Tombol untuk menyalin teks ke papan klip (clipboard)
export default function TombolSalin({ teks }: { teks: string }) {
  const [tersalin, setTersalin] = useState(false);

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(teks);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    } catch {
      alert("Gagal menyalin. Silakan blok dan salin teks secara manual.");
    }
  };

  return (
    <button type="button" className="tombol-primer" onClick={salin}>
      {tersalin ? "Tersalin ✓" : "Salin Teks"}
    </button>
  );
}
