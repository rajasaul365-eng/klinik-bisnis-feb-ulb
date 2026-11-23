// Utilitas untuk membuat tautan pemesanan WhatsApp.
// Nomor diambil dari variabel lingkungan agar tidak ditulis langsung di dalam kode.

const NOMOR_CADANGAN = "6280000000000"; // Nomor contoh, ganti melalui .env.local

export function ambilNomorWhatsApp(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || NOMOR_CADANGAN;
}

/** Membuat tautan wa.me dengan pesan yang sudah terisi otomatis. */
export function buatTautanWhatsApp(pesan: string): string {
  return `https://wa.me/${ambilNomorWhatsApp()}?text=${encodeURIComponent(pesan)}`;
}

/** Pesan baku untuk memesan sebuah paket jasa. */
export function pesanPemesananPaket(namaLayanan: string, namaPaket: string, harga: string): string {
  return [
    "Halo Admin Klinik Bisnis FEB Universitas Labuhanbatu,",
    "",
    `Saya tertarik memesan layanan *${namaLayanan}* - Paket *${namaPaket}* (${harga}).`,
    "",
    "Nama: ",
    "Nama usaha: ",
    "Jenis usaha: ",
    "Alamat usaha: ",
    "",
    "Mohon informasi langkah selanjutnya. Terima kasih.",
  ].join("\n");
}

/** Pesan umum untuk konsultasi gratis. */
export const pesanKonsultasi =
  "Halo Admin Klinik Bisnis FEB Universitas Labuhanbatu, saya ingin berkonsultasi mengenai usaha saya.";
