"use client";

import { useState } from "react";
import {
  hasilRisetKeTeks,
  susunKerangkaRiset,
  type HasilRiset,
  type InputRiset,
  type Pendekatan,
} from "@/lib/kerangkaRiset";
import TombolSalin from "./TombolSalin";

// Nilai awal formulir (contoh pengisian agar pengguna mudah memahami)
const nilaiAwal: InputRiset = {
  topik: "",
  variabelBebas: "",
  variabelTerikat: "",
  variabelMediasi: "",
  objek: "",
  populasi: "",
  pendekatan: "kuantitatif",
};

const contohIsian: InputRiset = {
  topik: "Menurunnya penjualan UMKM kuliner akibat persaingan dan perubahan perilaku belanja konsumen",
  variabelBebas: "Kualitas Produk, Harga, Promosi Media Sosial",
  variabelTerikat: "Keputusan Pembelian",
  variabelMediasi: "",
  objek: "UMKM Kuliner di Kota Rantauprapat",
  populasi: "Konsumen UMKM kuliner di Kota Rantauprapat",
  pendekatan: "kuantitatif",
};

export default function FormKerangkaRiset() {
  const [input, setInput] = useState<InputRiset>(nilaiAwal);
  const [hasil, setHasil] = useState<HasilRiset | null>(null);
  const [galat, setGalat] = useState("");

  // Fungsi umum untuk memperbarui satu kolom formulir
  const ubah = (kolom: keyof InputRiset, nilai: string) => setInput({ ...input, [kolom]: nilai });

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.variabelBebas.trim() || !input.variabelTerikat.trim() || !input.objek.trim()) {
      setGalat("Mohon isi minimal variabel bebas, variabel terikat, dan objek penelitian.");
      return;
    }
    setGalat("");
    setHasil(susunKerangkaRiset(input));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulir isian */}
      <form onSubmit={kirim} className="kartu tidak-dicetak space-y-4 p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primer-900">Data Penelitian</h2>
          <button type="button" className="text-sm font-medium text-primer-600 hover:underline" onClick={() => setInput(contohIsian)}>
            Isi contoh
          </button>
        </div>

        <div>
          <label htmlFor="topik" className="label-form">Fenomena / isu penelitian</label>
          <textarea id="topik" rows={3} className="input-form" placeholder="Masalah nyata yang ingin diteliti..." value={input.topik} onChange={(e) => ubah("topik", e.target.value)} />
        </div>
        <div>
          <label htmlFor="x" className="label-form">Variabel bebas (X) *</label>
          <input id="x" className="input-form" placeholder="Pisahkan dengan koma, mis. Kualitas Produk, Harga" value={input.variabelBebas} onChange={(e) => ubah("variabelBebas", e.target.value)} />
        </div>
        <div>
          <label htmlFor="y" className="label-form">Variabel terikat (Y) *</label>
          <input id="y" className="input-form" placeholder="mis. Keputusan Pembelian" value={input.variabelTerikat} onChange={(e) => ubah("variabelTerikat", e.target.value)} />
        </div>
        <div>
          <label htmlFor="z" className="label-form">Variabel mediasi (Z) — opsional</label>
          <input id="z" className="input-form" placeholder="mis. Kepuasan Pelanggan" value={input.variabelMediasi} onChange={(e) => ubah("variabelMediasi", e.target.value)} />
        </div>
        <div>
          <label htmlFor="objek" className="label-form">Objek / lokasi penelitian *</label>
          <input id="objek" className="input-form" placeholder="mis. UMKM Kuliner di Rantauprapat" value={input.objek} onChange={(e) => ubah("objek", e.target.value)} />
        </div>
        <div>
          <label htmlFor="populasi" className="label-form">Populasi / informan</label>
          <input id="populasi" className="input-form" placeholder="mis. Konsumen UMKM kuliner" value={input.populasi} onChange={(e) => ubah("populasi", e.target.value)} />
        </div>
        <div>
          <label htmlFor="pendekatan" className="label-form">Pendekatan penelitian</label>
          <select id="pendekatan" className="input-form" value={input.pendekatan} onChange={(e) => ubah("pendekatan", e.target.value as Pendekatan)}>
            <option value="kuantitatif">Kuantitatif</option>
            <option value="kualitatif">Kualitatif</option>
            <option value="campuran">Campuran (Mixed Methods)</option>
          </select>
        </div>

        {galat && <p className="text-sm text-red-600">{galat}</p>}

        <div className="flex gap-3">
          <button type="submit" className="tombol-primer flex-1">Susun Kerangka</button>
          <button type="button" className="tombol-sekunder" onClick={() => { setInput(nilaiAwal); setHasil(null); }}>
            Atur Ulang
          </button>
        </div>
      </form>

      {/* Hasil kerangka */}
      <div className="lg:col-span-3">
        {!hasil ? (
          <div className="kartu flex h-full min-h-64 items-center justify-center p-10 text-center text-slate-500">
            Isi formulir di samping lalu tekan <strong className="mx-1">Susun Kerangka</strong> untuk melihat draf kerangka riset.
          </div>
        ) : (
          <div className="kartu space-y-6 p-6">
            <div className="tidak-dicetak flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-primer-900">Draf Kerangka Riset</h2>
              <div className="flex gap-2">
                <TombolSalin teks={hasilRisetKeTeks(hasil)} />
                <button type="button" className="tombol-sekunder" onClick={() => window.print()}>Cetak / PDF</button>
              </div>
            </div>

            <BagianDaftar judul="Usulan Judul" isi={hasil.usulanJudul} />
            <BagianDaftar judul="Poin-Poin Latar Belakang" isi={hasil.latarBelakang} />
            <BagianDaftar judul="Rumusan Masalah" isi={hasil.rumusanMasalah} />
            <BagianDaftar judul="Tujuan Penelitian" isi={hasil.tujuan} />
            {hasil.hipotesis.length > 0 && <BagianDaftar judul="Hipotesis" isi={hasil.hipotesis} />}

            <div>
              <h3 className="font-semibold text-primer-900">Kerangka Konseptual</h3>
              <p className="mt-2 overflow-x-auto rounded-lg bg-primer-50 p-4 text-center font-mono text-sm text-primer-800">
                {hasil.kerangkaKonseptual}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-primer-900">Metode Penelitian</h3>
              <dl className="mt-2 divide-y divide-slate-100 text-sm">
                {hasil.metode.map((m) => (
                  <div key={m.label} className="grid gap-1 py-2 sm:grid-cols-3">
                    <dt className="font-medium text-slate-700">{m.label}</dt>
                    <dd className="text-slate-600 sm:col-span-2">{m.isi}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="font-semibold text-primer-900">Sistematika Artikel Ilmiah (IMRaD)</h3>
              <dl className="mt-2 divide-y divide-slate-100 text-sm">
                {hasil.sistematika.map((s) => (
                  <div key={s.bagian} className="grid gap-1 py-2 sm:grid-cols-3">
                    <dt className="font-medium text-slate-700">{s.bagian}</dt>
                    <dd className="text-slate-600 sm:col-span-2">{s.isi}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="font-semibold text-primer-900">Kata Kunci Pencarian Literatur</h3>
              <p className="mt-1 text-xs text-slate-500">Gunakan di Google Scholar, Garuda, Sinta, atau Scopus.</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {hasil.kataKunciPencarian.map((k) => (
                  <code key={k} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{k}</code>
                ))}
              </div>
            </div>

            <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
              Hasil ini adalah draf awal berbasis templat. Kembangkan, lengkapi dengan referensi ilmiah, dan
              konsultasikan dengan dosen pembimbing sebelum digunakan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Komponen kecil untuk menampilkan daftar bernomor dengan judul
function BagianDaftar({ judul, isi }: { judul: string; isi: string[] }) {
  return (
    <div>
      <h3 className="font-semibold text-primer-900">{judul}</h3>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
        {isi.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
