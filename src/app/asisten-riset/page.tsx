import type { Metadata } from "next";
import JudulHalaman from "@/components/JudulHalaman";
import TabAsisten from "@/components/TabAsisten";

export const metadata: Metadata = {
  title: "Asisten Riset & Analisis SWOT",
  description:
    "Alat bantu mahasiswa FEB Universitas Labuhanbatu untuk menyusun kerangka artikel ilmiah dan menganalisis SWOT usaha klien.",
};

// Halaman ruang kerja: asisten kerangka riset dan analisis SWOT
export default function HalamanAsistenRiset() {
  return (
    <>
      <JudulHalaman
        label="Ruang Kerja Mahasiswa"
        judul="Asisten Kerangka Riset & Analisis SWOT"
        deskripsi="Susun draf kerangka artikel ilmiah bidang manajemen atau analisis SWOT usaha klien UMKM dengan cepat dan terstruktur. Semua data diproses di peramban Anda dan tidak dikirim ke server."
      />
      <div className="wadah py-12">
        <TabAsisten />
      </div>
    </>
  );
}
