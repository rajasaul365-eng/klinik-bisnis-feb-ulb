"use client";

import { useMemo, useState } from "react";
import { daftarKategori, type Publikasi } from "@/data/publikasi";

// Etalase publikasi dengan fitur pencarian dan penyaringan kategori/tahun
export default function EtalasePublikasi({ publikasi }: { publikasi: Publikasi[] }) {
  const [kataCari, setKataCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [tahun, setTahun] = useState("Semua");

  // Daftar tahun unik, diurutkan dari terbaru
  const daftarTahun = useMemo(
    () => Array.from(new Set(publikasi.map((p) => p.tahun))).sort((a, b) => b - a),
    [publikasi],
  );

  // Hasil penyaringan berdasarkan input pengguna
  const hasil = useMemo(() => {
    const cari = kataCari.toLowerCase().trim();
    return publikasi.filter((p) => {
      const cocokKategori = kategori === "Semua" || p.kategori === kategori;
      const cocokTahun = tahun === "Semua" || p.tahun === Number(tahun);
      const cocokCari =
        cari === "" ||
        [p.judul, p.abstrak, p.jurnal, ...p.penulis, ...p.kataKunci].join(" ").toLowerCase().includes(cari);
      return cocokKategori && cocokTahun && cocokCari;
    });
  }, [publikasi, kataCari, kategori, tahun]);

  return (
    <div>
      {/* Panel penyaringan */}
      <div className="kartu grid gap-4 p-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <label htmlFor="cari" className="label-form">
            Cari publikasi
          </label>
          <input
            id="cari"
            type="search"
            className="input-form"
            placeholder="Judul, penulis, atau kata kunci..."
            value={kataCari}
            onChange={(e) => setKataCari(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="kategori" className="label-form">
            Bidang
          </label>
          <select id="kategori" className="input-form" value={kategori} onChange={(e) => setKategori(e.target.value)}>
            <option>Semua</option>
            {daftarKategori.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tahun" className="label-form">
            Tahun
          </label>
          <select id="tahun" className="input-form" value={tahun} onChange={(e) => setTahun(e.target.value)}>
            <option>Semua</option>
            {daftarTahun.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">Menampilkan {hasil.length} publikasi</p>

      {/* Daftar publikasi */}
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {hasil.map((p) => (
          <article key={p.id} className="kartu flex flex-col p-6">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-primer-50 px-2.5 py-1 text-primer-700">{p.kategori}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{p.jenis}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{p.tahun}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-primer-900">{p.judul}</h3>
            <p className="mt-1 text-sm text-slate-500">{p.penulis.join(", ")}</p>
            <p className="text-sm italic text-slate-500">{p.jurnal}</p>
            <p className="mt-3 flex-1 text-sm text-slate-600">{p.abstrak}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {p.kataKunci.map((k) => (
                  <span key={k} className="rounded bg-slate-50 px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200">
                    #{k}
                  </span>
                ))}
              </div>
              {p.tautan && (
                <a href={p.tautan} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primer-600 hover:underline">
                  Baca artikel →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {hasil.length === 0 && (
        <div className="kartu mt-4 p-10 text-center text-slate-500">
          Tidak ada publikasi yang sesuai dengan pencarian Anda.
        </div>
      )}
    </div>
  );
}
