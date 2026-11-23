import Link from "next/link";
import { infoSitus, menuNavigasi } from "@/data/situs";
import { buatTautanWhatsApp, pesanKonsultasi } from "@/lib/whatsapp";

// Bagian kaki halaman berisi informasi kontak dan tautan cepat
export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="tidak-dicetak mt-16 bg-primer-900 text-primer-100">
      <div className="wadah grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{infoSitus.nama}</p>
          <p className="mt-2 text-sm leading-relaxed">{infoSitus.slogan}</p>
          <p className="mt-4 text-sm leading-relaxed">{infoSitus.alamat}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Tautan Cepat</p>
          <ul className="mt-3 space-y-2 text-sm">
            {menuNavigasi.map((menu) => (
              <li key={menu.href}>
                <Link href={menu.href} className="hover:text-white">
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Hubungi Kami</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Email: {infoSitus.email}</li>
            <li>Jam layanan: {infoSitus.jamLayanan}</li>
          </ul>
          <a
            href={buatTautanWhatsApp(pesanKonsultasi)}
            target="_blank"
            rel="noopener noreferrer"
            className="tombol-wa mt-4"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-primer-800 py-4 text-center text-xs text-primer-100/70">
        © {tahun} Klinik Bisnis Fakultas Ekonomi dan Bisnis, Universitas Labuhanbatu.
      </div>
    </footer>
  );
}
