import type { Metadata } from "next";
import JudulHalaman from "@/components/JudulHalaman";
import { dosenPembimbing, timMahasiswa, type AnggotaTim } from "@/data/tim";

export const metadata: Metadata = {
  title: "Tim Kami",
  description: "Dosen pembimbing dan tim mahasiswa Klinik Bisnis FEB Universitas Labuhanbatu.",
};

// Kartu profil satu anggota tim
function KartuAnggota({ anggota, warna }: { anggota: AnggotaTim; warna: string }) {
  return (
    <div className="kartu p-6 text-center">
      <span className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white ${warna}`}>
        {anggota.inisial}
      </span>
      <p className="mt-4 font-semibold text-primer-900">{anggota.nama}</p>
      <p className="text-sm text-slate-500">{anggota.peran}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {anggota.keahlian.map((k) => (
          <span key={k} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HalamanTim() {
  return (
    <>
      <JudulHalaman
        label="Tim Kami"
        judul="Dosen Pembimbing dan Tim Mahasiswa"
        deskripsi="Kolaborasi dosen dan mahasiswa Fakultas Ekonomi dan Bisnis Universitas Labuhanbatu dalam mendampingi UMKM daerah."
      />
      <div className="wadah space-y-14 py-12">
        <section>
          <h2 className="text-2xl font-bold text-primer-900">Dosen Pembimbing</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dosenPembimbing.map((d) => (
              <KartuAnggota key={d.nama} anggota={d} warna="bg-primer-700" />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primer-900">Tim Mahasiswa</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timMahasiswa.map((m) => (
              <KartuAnggota key={m.nama} anggota={m} warna="bg-aksen-600" />
            ))}
          </div>
        </section>
        <p className="text-sm text-slate-500">
          Nama dan profil di atas adalah contoh. Perbarui melalui berkas <code>src/data/tim.ts</code>.
        </p>
      </div>
    </>
  );
}
