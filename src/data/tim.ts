// Data tim Klinik Bisnis. Nama di bawah ini adalah CONTOH; ganti dengan data asli.

export type AnggotaTim = {
  nama: string;
  peran: string;
  keahlian: string[];
  inisial: string;
};

export const dosenPembimbing: AnggotaTim[] = [
  { nama: "Nama Dosen Pembimbing 1", peran: "Koordinator Klinik Bisnis", keahlian: ["Manajemen Strategik", "Kewirausahaan"], inisial: "D1" },
  { nama: "Nama Dosen Pembimbing 2", peran: "Pembimbing Keuangan", keahlian: ["Akuntansi UMKM", "Manajemen Keuangan"], inisial: "D2" },
  { nama: "Nama Dosen Pembimbing 3", peran: "Pembimbing Pemasaran & Riset", keahlian: ["Pemasaran Digital", "Metodologi Riset"], inisial: "D3" },
];

export const timMahasiswa: AnggotaTim[] = [
  { nama: "Nama Mahasiswa 1", peran: "Divisi Business Plan", keahlian: ["Business Model Canvas", "Proyeksi Keuangan"], inisial: "M1" },
  { nama: "Nama Mahasiswa 2", peran: "Divisi Pembukuan", keahlian: ["Pencatatan Kas", "Laporan Laba Rugi"], inisial: "M2" },
  { nama: "Nama Mahasiswa 3", peran: "Divisi Pemasaran Digital", keahlian: ["Desain Konten", "Media Sosial"], inisial: "M3" },
  { nama: "Nama Mahasiswa 4", peran: "Divisi Riset Pasar", keahlian: ["Survei", "Analisis Data"], inisial: "M4" },
];
