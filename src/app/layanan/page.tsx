import type { Metadata } from "next";
import JudulHalaman from "@/components/JudulHalaman";
import KartuPaket from "@/components/KartuPaket";
import { daftarLayanan } from "@/data/paket";

export const metadata: Metadata = {
  title: "Katalog Paket Jasa",
  description: "Paket jasa mahasiswa FEB Universitas Labuhanbatu untuk UMKM lokal Labuhanbatu.",
};

// Halaman katalog seluruh layanan dan paket harga
export default function HalamanLayanan() {
  return (
    <>
      <JudulHalaman
        label="Katalog Layanan"
        judul="Paket Jasa Mahasiswa untuk UMKM"
        deskripsi="Pilih paket yang sesuai dengan kebutuhan usaha Anda. Tekan tombol pesan untuk langsung terhubung dengan admin kami melalui WhatsApp."
      />

      {/* Navigasi cepat antarlayanan */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white">
        <div className="wadah flex gap-2 overflow-x-auto py-3">
          {daftarLayanan.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 hover:border-primer-600 hover:text-primer-700"
            >
              {l.ikon} {l.nama}
            </a>
          ))}
        </div>
      </div>

      <div className="wadah space-y-20 py-14">
        {daftarLayanan.map((layanan) => (
          <section key={layanan.id} id={layanan.id} className="scroll-mt-36">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-primer-900">
                <span aria-hidden>{layanan.ikon}</span> {layanan.nama}
              </h2>
              <p className="mt-2 text-slate-600">{layanan.ringkasan}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {layanan.paket.map((paket) => (
                <KartuPaket key={paket.nama} namaLayanan={layanan.nama} paket={paket} />
              ))}
            </div>
          </section>
        ))}

        <div className="kartu bg-primer-50 p-6 text-sm text-slate-600">
          <p className="font-semibold text-primer-900">Catatan</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Harga dapat disesuaikan dengan skala dan kompleksitas usaha setelah konsultasi awal.</li>
            <li>Biaya iklan berbayar, cetak, dan transportasi survei di luar kota tidak termasuk dalam paket.</li>
            <li>Seluruh pekerjaan mahasiswa disupervisi oleh dosen pembimbing Klinik Bisnis FEB ULB.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
