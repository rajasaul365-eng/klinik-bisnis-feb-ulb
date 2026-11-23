import type { Metadata } from "next";
import Link from "next/link";
import EtalasePublikasi from "@/components/EtalasePublikasi";
import JudulHalaman from "@/components/JudulHalaman";
import { daftarPublikasi } from "@/data/publikasi";

export const metadata: Metadata = {
  title: "Etalase Publikasi",
  description: "Publikasi dan artikel riset dosen serta mahasiswa FEB Universitas Labuhanbatu bidang manajemen.",
};

// Halaman etalase publikasi riset bidang manajemen
export default function HalamanPublikasi() {
  return (
    <>
      <JudulHalaman
        label="Riset & Publikasi"
        judul="Etalase Publikasi Dosen dan Mahasiswa"
        deskripsi="Kumpulan artikel jurnal, prosiding, dan laporan riset bidang manajemen hasil kolaborasi dosen dan mahasiswa FEB Universitas Labuhanbatu."
      />
      <div className="wadah py-12">
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Data publikasi yang ditampilkan saat ini merupakan <strong>contoh</strong>. Pengelola dapat menggantinya
          dengan publikasi asli melalui berkas <code>src/data/publikasi.ts</code>.
        </div>

        <EtalasePublikasi publikasi={daftarPublikasi} />

        <div className="kartu mt-12 flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
          <div>
            <p className="font-semibold text-primer-900">Sedang menyusun artikel ilmiah?</p>
            <p className="text-sm text-slate-600">
              Gunakan Asisten Kerangka Riset untuk menyusun judul, rumusan masalah, hipotesis, dan metode penelitian.
            </p>
          </div>
          <Link href="/asisten-riset" className="tombol-primer">
            Buka Asisten Riset
          </Link>
        </div>
      </div>
    </>
  );
}
