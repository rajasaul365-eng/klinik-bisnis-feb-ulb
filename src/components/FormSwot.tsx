"use client";

import { useState } from "react";
import { analisisSwot, type DataSwot, type FaktorSwot, type HasilSwot } from "@/lib/swot";
import TombolSalin from "./TombolSalin";

type KunciSwot = keyof DataSwot;

// Pengaturan tampilan untuk masing-masing kelompok faktor SWOT
const kelompok: { kunci: KunciSwot; judul: string; keterangan: string; warna: string }[] = [
  { kunci: "kekuatan", judul: "Kekuatan (Strengths)", keterangan: "Faktor internal yang menjadi keunggulan usaha", warna: "border-emerald-300 bg-emerald-50" },
  { kunci: "kelemahan", judul: "Kelemahan (Weaknesses)", keterangan: "Faktor internal yang perlu diperbaiki", warna: "border-rose-300 bg-rose-50" },
  { kunci: "peluang", judul: "Peluang (Opportunities)", keterangan: "Faktor eksternal yang dapat dimanfaatkan", warna: "border-sky-300 bg-sky-50" },
  { kunci: "ancaman", judul: "Ancaman (Threats)", keterangan: "Faktor eksternal yang berpotensi merugikan", warna: "border-amber-300 bg-amber-50" },
];

const faktorKosong = (): FaktorSwot => ({ teks: "", skor: 3 });

const dataAwal: DataSwot = {
  kekuatan: [faktorKosong(), faktorKosong()],
  kelemahan: [faktorKosong(), faktorKosong()],
  peluang: [faktorKosong(), faktorKosong()],
  ancaman: [faktorKosong(), faktorKosong()],
};

const dataContoh: DataSwot = {
  kekuatan: [
    { teks: "Resep khas dan cita rasa disukai pelanggan", skor: 4 },
    { teks: "Harga lebih terjangkau dibanding pesaing", skor: 3 },
  ],
  kelemahan: [
    { teks: "Pencatatan keuangan belum rapi", skor: 3 },
    { teks: "Kemasan produk kurang menarik", skor: 2 },
  ],
  peluang: [
    { teks: "Tren belanja melalui media sosial dan marketplace", skor: 4 },
    { teks: "Program pembiayaan KUR untuk UMKM", skor: 3 },
  ],
  ancaman: [
    { teks: "Munculnya pesaing baru dengan produk serupa", skor: 3 },
    { teks: "Kenaikan harga bahan baku", skor: 3 },
  ],
};

export default function FormSwot() {
  const [namaUsaha, setNamaUsaha] = useState("");
  const [data, setData] = useState<DataSwot>(dataAwal);
  const [hasil, setHasil] = useState<HasilSwot | null>(null);
  const [galat, setGalat] = useState("");

  // Mengubah teks atau skor pada satu faktor
  const ubahFaktor = (kunci: KunciSwot, indeks: number, perubahan: Partial<FaktorSwot>) => {
    const baru = data[kunci].map((f, i) => (i === indeks ? { ...f, ...perubahan } : f));
    setData({ ...data, [kunci]: baru });
  };
  const tambahFaktor = (kunci: KunciSwot) => setData({ ...data, [kunci]: [...data[kunci], faktorKosong()] });
  const hapusFaktor = (kunci: KunciSwot, indeks: number) =>
    setData({ ...data, [kunci]: data[kunci].filter((_, i) => i !== indeks) });

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    const adaKosong = kelompok.some((k) => data[k.kunci].every((f) => f.teks.trim() === ""));
    if (adaKosong) {
      setGalat("Mohon isi minimal satu faktor pada setiap kelompok SWOT.");
      return;
    }
    setGalat("");
    setHasil(analisisSwot(data));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={kirim} className="kartu tidak-dicetak space-y-6 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="w-full max-w-md">
            <label htmlFor="nama-usaha" className="label-form">Nama usaha / objek analisis</label>
            <input id="nama-usaha" className="input-form" placeholder="mis. Keripik Pisang Bu Sari" value={namaUsaha} onChange={(e) => setNamaUsaha(e.target.value)} />
          </div>
          <button type="button" className="text-sm font-medium text-primer-600 hover:underline" onClick={() => { setData(dataContoh); setNamaUsaha("UMKM Kuliner (Contoh)"); }}>
            Isi contoh
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Beri skor setiap faktor: <strong>1</strong> = pengaruh kecil, <strong>2</strong> = sedang,{" "}
          <strong>3</strong> = besar, <strong>4</strong> = sangat besar.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {kelompok.map((k) => (
            <fieldset key={k.kunci} className={`rounded-xl border p-4 ${k.warna}`}>
              <legend className="px-1 font-semibold text-slate-800">{k.judul}</legend>
              <p className="mb-3 text-xs text-slate-600">{k.keterangan}</p>
              <div className="space-y-2">
                {data[k.kunci].map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className="input-form"
                      placeholder={`Faktor ${i + 1}`}
                      aria-label={`${k.judul} faktor ${i + 1}`}
                      value={f.teks}
                      onChange={(e) => ubahFaktor(k.kunci, i, { teks: e.target.value })}
                    />
                    <select
                      className="input-form w-20"
                      aria-label="Skor"
                      value={f.skor}
                      onChange={(e) => ubahFaktor(k.kunci, i, { skor: Number(e.target.value) })}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="rounded-lg px-2 text-slate-400 hover:bg-white hover:text-red-600 disabled:opacity-30"
                      aria-label="Hapus faktor"
                      disabled={data[k.kunci].length <= 1}
                      onClick={() => hapusFaktor(k.kunci, i)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-3 text-sm font-medium text-primer-700 hover:underline" onClick={() => tambahFaktor(k.kunci)}>
                + Tambah faktor
              </button>
            </fieldset>
          ))}
        </div>

        {galat && <p className="text-sm text-red-600">{galat}</p>}

        <div className="flex gap-3">
          <button type="submit" className="tombol-primer">Analisis SWOT</button>
          <button type="button" className="tombol-sekunder" onClick={() => { setData(dataAwal); setNamaUsaha(""); setHasil(null); }}>
            Atur Ulang
          </button>
        </div>
      </form>

      {hasil && <HasilAnalisis namaUsaha={namaUsaha} data={data} hasil={hasil} />}
    </div>
  );
}

// Tampilan hasil analisis SWOT
function HasilAnalisis({ namaUsaha, data, hasil }: { namaUsaha: string; data: DataSwot; hasil: HasilSwot }) {
  const f = (n: number) => n.toFixed(2).replace(".", ",");
  const isiTerisi = (k: KunciSwot) => data[k].filter((x) => x.teks.trim());

  // Posisi titik pada diagram kuadran (skala -3 s.d. +3 dipetakan ke 0–100%)
  const batas = (n: number) => Math.max(-3, Math.min(3, n));
  const posX = ((batas(hasil.sumbuX) + 3) / 6) * 100;
  const posY = 100 - ((batas(hasil.sumbuY) + 3) / 6) * 100;

  const teksSalin = [
    `ANALISIS SWOT${namaUsaha ? ` - ${namaUsaha}` : ""}`,
    "",
    ...kelompok.flatMap((k) => [k.judul.toUpperCase(), ...isiTerisi(k.kunci).map((x, i) => `${i + 1}. ${x.teks} (skor ${x.skor})`), ""]),
    `Skor internal (S - W): ${f(hasil.sumbuX)}`,
    `Skor eksternal (O - T): ${f(hasil.sumbuY)}`,
    `Posisi: Kuadran ${hasil.kuadran.nomor} - ${hasil.kuadran.nama} (${hasil.kuadran.strategi})`,
    hasil.kuadran.penjelasan,
    "",
    "STRATEGI S-O", ...hasil.strategiSO.map((s, i) => `${i + 1}. ${s}`), "",
    "STRATEGI W-O", ...hasil.strategiWO.map((s, i) => `${i + 1}. ${s}`), "",
    "STRATEGI S-T", ...hasil.strategiST.map((s, i) => `${i + 1}. ${s}`), "",
    "STRATEGI W-T", ...hasil.strategiWT.map((s, i) => `${i + 1}. ${s}`),
  ].join("\n");

  return (
    <div className="kartu space-y-8 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-primer-900">Hasil Analisis SWOT{namaUsaha && `: ${namaUsaha}`}</h2>
        <div className="tidak-dicetak flex gap-2">
          <TombolSalin teks={teksSalin} />
          <button type="button" className="tombol-sekunder" onClick={() => window.print()}>Cetak / PDF</button>
        </div>
      </div>

      {/* Matriks SWOT */}
      <div className="grid gap-4 md:grid-cols-2">
        {kelompok.map((k) => (
          <div key={k.kunci} className={`rounded-xl border p-4 ${k.warna}`}>
            <p className="font-semibold text-slate-800">{k.judul}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {isiTerisi(k.kunci).map((x, i) => (
                <li key={i}>{x.teks} <span className="text-slate-400">(skor {x.skor})</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skor & diagram kuadran */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-semibold text-primer-900">Ringkasan Skor (rata-rata)</h3>
          <table className="mt-3 w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              <tr><td className="py-1.5">Kekuatan (S)</td><td className="text-right font-medium">{f(hasil.skorS)}</td></tr>
              <tr><td className="py-1.5">Kelemahan (W)</td><td className="text-right font-medium">{f(hasil.skorW)}</td></tr>
              <tr><td className="py-1.5">Peluang (O)</td><td className="text-right font-medium">{f(hasil.skorO)}</td></tr>
              <tr><td className="py-1.5">Ancaman (T)</td><td className="text-right font-medium">{f(hasil.skorT)}</td></tr>
              <tr className="bg-slate-50"><td className="py-1.5 font-semibold">Sumbu X (S − W)</td><td className="text-right font-bold">{f(hasil.sumbuX)}</td></tr>
              <tr className="bg-slate-50"><td className="py-1.5 font-semibold">Sumbu Y (O − T)</td><td className="text-right font-bold">{f(hasil.sumbuY)}</td></tr>
            </tbody>
          </table>
          <div className="mt-4 rounded-lg bg-primer-50 p-4">
            <p className="text-sm font-semibold text-primer-800">
              Kuadran {hasil.kuadran.nomor}: {hasil.kuadran.nama} — {hasil.kuadran.strategi}
            </p>
            <p className="mt-1 text-sm text-slate-600">{hasil.kuadran.penjelasan}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-primer-900">Diagram Posisi Usaha</h3>
          <div className="relative mx-auto mt-3 aspect-square w-full max-w-xs rounded-lg border border-slate-200 bg-white text-xs text-slate-500">
            {/* Garis sumbu */}
            <div className="absolute left-1/2 top-0 h-full w-px bg-slate-300" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-slate-300" />
            {/* Label kuadran */}
            <span className="absolute right-2 top-2 text-right">I · Agresif</span>
            <span className="absolute left-2 top-2">II · Turn-Around</span>
            <span className="absolute bottom-2 left-2">III · Defensif</span>
            <span className="absolute bottom-2 right-2 text-right">IV · Diversifikasi</span>
            {/* Label sumbu */}
            <span className="absolute left-1/2 top-1 -translate-x-1/2 bg-white px-1">Peluang</span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white px-1">Ancaman</span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 bg-white px-1">W</span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 bg-white px-1">S</span>
            {/* Titik posisi */}
            <span
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primer-700 ring-4 ring-primer-100"
              style={{ left: `${posX}%`, top: `${posY}%` }}
              title={`(${f(hasil.sumbuX)}; ${f(hasil.sumbuY)})`}
            />
          </div>
        </div>
      </div>

      {/* Matriks strategi TOWS */}
      <div>
        <h3 className="font-semibold text-primer-900">Matriks Strategi (TOWS)</h3>
        <p className="mt-1 text-xs text-slate-500">
          Disusun dari dua faktor dengan skor tertinggi pada tiap kelompok. Strategi yang ditandai sesuai dengan
          posisi kuadran usaha.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <KotakStrategi judul="Strategi S-O (Kekuatan × Peluang)" isi={hasil.strategiSO} disorot={hasil.kuadran.strategi === "Strategi S-O"} />
          <KotakStrategi judul="Strategi W-O (Kelemahan × Peluang)" isi={hasil.strategiWO} disorot={hasil.kuadran.strategi === "Strategi W-O"} />
          <KotakStrategi judul="Strategi S-T (Kekuatan × Ancaman)" isi={hasil.strategiST} disorot={hasil.kuadran.strategi === "Strategi S-T"} />
          <KotakStrategi judul="Strategi W-T (Kelemahan × Ancaman)" isi={hasil.strategiWT} disorot={hasil.kuadran.strategi === "Strategi W-T"} />
        </div>
      </div>

      <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
        Rumusan strategi di atas merupakan kerangka awal. Lengkapi dengan langkah konkret, penanggung jawab, dan
        jadwal pelaksanaan sesuai kondisi nyata usaha. Untuk analisis lebih mendalam (matriks IFE/EFE berbobot),
        konsultasikan dengan dosen pembimbing.
      </p>
    </div>
  );
}

function KotakStrategi({ judul, isi, disorot }: { judul: string; isi: string[]; disorot: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${disorot ? "border-2 border-primer-600 bg-primer-50" : "border-slate-200"}`}>
      <p className="font-semibold text-slate-800">
        {judul} {disorot && <span className="ml-1 rounded-full bg-primer-700 px-2 py-0.5 text-xs text-white">Prioritas</span>}
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
        {isi.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
