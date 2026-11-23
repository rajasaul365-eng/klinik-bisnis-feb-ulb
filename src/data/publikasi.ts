// Data etalase publikasi.
// PENTING: data di bawah ini adalah CONTOH (placeholder) dan bukan publikasi nyata.
// Ganti dengan publikasi asli dosen dan mahasiswa FEB Universitas Labuhanbatu.

export type Kategori =
  | "Manajemen Pemasaran"
  | "Manajemen Keuangan"
  | "Manajemen SDM"
  | "Manajemen Strategik"
  | "Kewirausahaan";

export type Publikasi = {
  id: string;
  judul: string;
  penulis: string[];
  tahun: number;
  jurnal: string;
  kategori: Kategori;
  jenis: "Artikel Jurnal" | "Prosiding" | "Laporan Riset";
  abstrak: string;
  kataKunci: string[];
  tautan?: string; // Tautan DOI atau halaman jurnal
};

export const daftarKategori: Kategori[] = [
  "Manajemen Pemasaran",
  "Manajemen Keuangan",
  "Manajemen SDM",
  "Manajemen Strategik",
  "Kewirausahaan",
];

export const daftarPublikasi: Publikasi[] = [
  {
    id: "contoh-1",
    judul: "Pengaruh Pemasaran Media Sosial terhadap Keputusan Pembelian Produk UMKM Kuliner di Rantauprapat",
    penulis: ["Nama Dosen, S.E., M.M.", "Nama Mahasiswa"],
    tahun: 2025,
    jurnal: "Nama Jurnal Manajemen (Contoh)",
    kategori: "Manajemen Pemasaran",
    jenis: "Artikel Jurnal",
    abstrak:
      "Penelitian ini menganalisis pengaruh aktivitas pemasaran media sosial terhadap keputusan pembelian konsumen pada UMKM kuliner. Pendekatan kuantitatif digunakan dengan analisis regresi linear berganda.",
    kataKunci: ["media sosial", "keputusan pembelian", "UMKM"],
  },
  {
    id: "contoh-2",
    judul: "Literasi Keuangan dan Kinerja Usaha Mikro: Studi pada Pedagang Pasar Tradisional Labuhanbatu",
    penulis: ["Nama Dosen, S.E., M.Si.", "Nama Mahasiswa"],
    tahun: 2025,
    jurnal: "Nama Jurnal Ekonomi (Contoh)",
    kategori: "Manajemen Keuangan",
    jenis: "Artikel Jurnal",
    abstrak:
      "Studi ini mengkaji hubungan antara tingkat literasi keuangan pelaku usaha mikro dengan kinerja usaha, serta peran pencatatan keuangan sebagai variabel mediasi.",
    kataKunci: ["literasi keuangan", "kinerja usaha", "usaha mikro"],
  },
  {
    id: "contoh-3",
    judul: "Strategi Pengembangan UMKM Olahan Sawit Berbasis Analisis SWOT",
    penulis: ["Nama Dosen, S.E., M.M.", "Nama Mahasiswa", "Nama Mahasiswa"],
    tahun: 2024,
    jurnal: "Prosiding Seminar Nasional (Contoh)",
    kategori: "Manajemen Strategik",
    jenis: "Prosiding",
    abstrak:
      "Penelitian kualitatif ini merumuskan strategi pengembangan UMKM olahan berbasis kelapa sawit menggunakan matriks IFE, EFE, dan SWOT.",
    kataKunci: ["SWOT", "strategi", "UMKM"],
  },
  {
    id: "contoh-4",
    judul: "Pengaruh Motivasi dan Lingkungan Kerja terhadap Kinerja Karyawan Usaha Ritel",
    penulis: ["Nama Dosen, S.E., M.M.", "Nama Mahasiswa"],
    tahun: 2024,
    jurnal: "Nama Jurnal SDM (Contoh)",
    kategori: "Manajemen SDM",
    jenis: "Artikel Jurnal",
    abstrak:
      "Penelitian ini menguji pengaruh motivasi kerja dan lingkungan kerja terhadap kinerja karyawan dengan pendekatan kuantitatif dan analisis regresi.",
    kataKunci: ["motivasi", "lingkungan kerja", "kinerja karyawan"],
  },
  {
    id: "contoh-5",
    judul: "Minat Berwirausaha Mahasiswa: Peran Pendidikan Kewirausahaan dan Efikasi Diri",
    penulis: ["Nama Mahasiswa", "Nama Dosen, S.E., M.M."],
    tahun: 2025,
    jurnal: "Nama Jurnal Kewirausahaan (Contoh)",
    kategori: "Kewirausahaan",
    jenis: "Artikel Jurnal",
    abstrak:
      "Studi ini menganalisis pengaruh pendidikan kewirausahaan dan efikasi diri terhadap minat berwirausaha mahasiswa Fakultas Ekonomi dan Bisnis.",
    kataKunci: ["minat berwirausaha", "efikasi diri", "pendidikan kewirausahaan"],
  },
  {
    id: "contoh-6",
    judul: "Laporan Riset Pasar: Preferensi Konsumen terhadap Produk Oleh-Oleh Khas Labuhanbatu",
    penulis: ["Tim Klinik Bisnis FEB ULB"],
    tahun: 2025,
    jurnal: "Laporan Internal Klinik Bisnis (Contoh)",
    kategori: "Manajemen Pemasaran",
    jenis: "Laporan Riset",
    abstrak:
      "Laporan hasil survei pasar terhadap konsumen lokal dan pendatang mengenai preferensi rasa, kemasan, dan harga produk oleh-oleh khas daerah.",
    kataKunci: ["riset pasar", "preferensi konsumen", "oleh-oleh"],
  },
];
