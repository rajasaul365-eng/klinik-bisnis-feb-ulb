// Data katalog layanan dan paket jasa mahasiswa untuk UMKM.
// Harga bersifat contoh dan dapat disesuaikan oleh pengelola klinik.

export type Paket = {
  nama: string; // Contoh: "Dasar", "Menengah", "Lengkap"
  harga: number; // Dalam Rupiah
  durasi: string;
  fitur: string[];
  unggulan?: boolean; // Tandai paket yang paling direkomendasikan
};

export type Layanan = {
  id: string;
  ikon: string;
  nama: string;
  ringkasan: string;
  paket: Paket[];
};

export const daftarLayanan: Layanan[] = [
  {
    id: "business-plan",
    ikon: "📘",
    nama: "Penyusunan Business Plan",
    ringkasan:
      "Rencana bisnis terstruktur untuk pengajuan modal usaha, KUR, hibah, maupun panduan pengembangan usaha.",
    paket: [
      {
        nama: "Dasar",
        harga: 250000,
        durasi: "7 hari kerja",
        fitur: ["Business Model Canvas", "Profil usaha & produk", "Analisis SWOT ringkas", "1 kali revisi"],
      },
      {
        nama: "Menengah",
        harga: 600000,
        durasi: "14 hari kerja",
        fitur: [
          "Semua fitur paket Dasar",
          "Analisis pasar & pesaing",
          "Rencana pemasaran",
          "Proyeksi keuangan 1 tahun",
          "2 kali revisi",
        ],
        unggulan: true,
      },
      {
        nama: "Lengkap",
        harga: 1200000,
        durasi: "21 hari kerja",
        fitur: [
          "Semua fitur paket Menengah",
          "Proyeksi keuangan 3 tahun",
          "Analisis kelayakan (BEP, NPV, Payback Period)",
          "Dokumen siap ajukan ke bank/KUR",
          "Pendampingan presentasi",
        ],
      },
    ],
  },
  {
    id: "pembukuan",
    ikon: "📒",
    nama: "Pembukuan Keuangan Sederhana",
    ringkasan:
      "Pencatatan arus kas, laba rugi, dan neraca sederhana agar keuangan usaha rapi dan mudah dipantau.",
    paket: [
      {
        nama: "Dasar",
        harga: 150000,
        durasi: "Per bulan",
        fitur: ["Template buku kas harian", "Pelatihan pencatatan 1 sesi", "Rekap pemasukan & pengeluaran"],
      },
      {
        nama: "Menengah",
        harga: 350000,
        durasi: "Per bulan",
        fitur: [
          "Semua fitur paket Dasar",
          "Laporan laba rugi bulanan",
          "Pemisahan keuangan pribadi & usaha",
          "Konsultasi via WhatsApp",
        ],
        unggulan: true,
      },
      {
        nama: "Lengkap",
        harga: 750000,
        durasi: "Per 3 bulan",
        fitur: [
          "Semua fitur paket Menengah",
          "Neraca & laporan arus kas",
          "Pengaturan aplikasi pembukuan digital",
          "Analisis kesehatan keuangan usaha",
        ],
      },
    ],
  },
  {
    id: "pemasaran-digital",
    ikon: "📱",
    nama: "Pemasaran Digital",
    ringkasan:
      "Membantu UMKM tampil profesional di media sosial, marketplace, dan Google Maps untuk menjangkau lebih banyak pelanggan.",
    paket: [
      {
        nama: "Dasar",
        harga: 200000,
        durasi: "1 bulan",
        fitur: [
          "Optimasi profil Instagram/Facebook",
          "Pendaftaran Google Bisnisku (Maps)",
          "8 desain konten feed",
        ],
      },
      {
        nama: "Menengah",
        harga: 500000,
        durasi: "1 bulan",
        fitur: [
          "Semua fitur paket Dasar",
          "16 konten feed + 4 video pendek",
          "Penulisan caption & tagar",
          "Pembukaan toko marketplace",
        ],
        unggulan: true,
      },
      {
        nama: "Lengkap",
        harga: 1000000,
        durasi: "1 bulan",
        fitur: [
          "Semua fitur paket Menengah",
          "Pengelolaan iklan berbayar (di luar biaya iklan)",
          "Foto produk profesional",
          "Laporan performa & rekomendasi",
        ],
      },
    ],
  },
  {
    id: "survei-pasar",
    ikon: "📊",
    nama: "Survei & Riset Pasar",
    ringkasan:
      "Survei konsumen dan analisis pasar berbasis data untuk mengambil keputusan produk, harga, dan lokasi usaha.",
    paket: [
      {
        nama: "Dasar",
        harga: 300000,
        durasi: "10 hari kerja",
        fitur: ["Kuesioner hingga 15 pertanyaan", "50 responden", "Ringkasan hasil dalam grafik"],
      },
      {
        nama: "Menengah",
        harga: 700000,
        durasi: "14 hari kerja",
        fitur: [
          "Kuesioner hingga 30 pertanyaan",
          "100 responden",
          "Analisis kepuasan & preferensi konsumen",
          "Rekomendasi strategi",
        ],
        unggulan: true,
      },
      {
        nama: "Lengkap",
        harga: 1500000,
        durasi: "21 hari kerja",
        fitur: [
          "200 responden + wawancara mendalam",
          "Analisis statistik (SPSS/SmartPLS)",
          "Pemetaan pesaing & segmentasi pasar",
          "Laporan riset lengkap & presentasi",
        ],
      },
    ],
  },
];
