# Klinik Bisnis FEB ULB

Platform Klinik Bisnis UMKM & Portal Riset Mahasiswa-Dosen Fakultas Ekonomi dan Bisnis Universitas Labuhanbatu.

Dibangun dengan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**.

## Fitur

| Halaman | Alamat | Keterangan |
| --- | --- | --- |
| Beranda | `/` | Profil klinik, keunggulan, ringkasan layanan, alur layanan, publikasi terbaru |
| Paket Jasa | `/layanan` | Katalog 4 layanan × 3 paket harga dengan tombol **Pesan via WhatsApp** |
| Publikasi | `/publikasi` | Etalase artikel riset dengan pencarian dan filter bidang/tahun |
| Asisten Riset & SWOT | `/asisten-riset` | Penyusun kerangka artikel ilmiah dan analisis SWOT + matriks TOWS |
| Tim | `/tim` | Profil dosen pembimbing dan tim mahasiswa |

Asisten Riset dan SWOT bekerja sepenuhnya di peramban (berbasis templat), tanpa API key dan tanpa mengirim data ke server.

## Menjalankan Proyek

```bash
npm install
cp .env.example .env.local   # lalu isi nomor WhatsApp admin
npm run dev                  # buka http://localhost:3000
```

Perintah lain: `npm run build` (build produksi), `npm start` (jalankan hasil build), `npm run lint` (cek tipe TypeScript).

## Mengubah Konten

Seluruh konten disimpan terpisah dari tampilan di folder `src/data/`:

- `situs.ts` — nama, alamat, email, jam layanan, menu navigasi
- `paket.ts` — daftar layanan, paket, harga, dan fitur
- `publikasi.ts` — daftar publikasi (**saat ini berisi data contoh**)
- `tim.ts` — dosen pembimbing dan mahasiswa (**saat ini berisi data contoh**)

Nomor WhatsApp diatur lewat variabel `NEXT_PUBLIC_WHATSAPP_NUMBER` di `.env.local` (format `628xxxxxxxxxx`).

## Struktur Folder

```
src/
├── app/            # Halaman (routing App Router)
├── components/     # Komponen tampilan yang dapat dipakai ulang
├── data/           # Konten situs (mudah diedit)
└── lib/            # Logika: WhatsApp, format Rupiah, kerangka riset, SWOT
```
