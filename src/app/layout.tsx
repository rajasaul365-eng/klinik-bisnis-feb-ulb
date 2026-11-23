import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { infoSitus } from "@/data/situs";

// Metadata default untuk seluruh halaman (judul tab & deskripsi mesin pencari)
export const metadata: Metadata = {
  title: {
    default: infoSitus.namaLengkap,
    template: `%s | ${infoSitus.nama}`,
  },
  description:
    "Klinik Bisnis Fakultas Ekonomi dan Bisnis Universitas Labuhanbatu: layanan konsultasi, pembukuan, pemasaran digital, dan riset pasar untuk UMKM, serta portal publikasi riset manajemen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
