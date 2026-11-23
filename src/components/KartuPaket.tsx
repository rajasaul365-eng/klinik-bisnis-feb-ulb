import type { Paket } from "@/data/paket";
import { formatRupiah } from "@/lib/format";
import { buatTautanWhatsApp, pesanPemesananPaket } from "@/lib/whatsapp";

// Kartu untuk satu paket harga, lengkap dengan tombol pesan via WhatsApp
type Props = {
  namaLayanan: string;
  paket: Paket;
};

export default function KartuPaket({ namaLayanan, paket }: Props) {
  const harga = formatRupiah(paket.harga);
  const tautanWa = buatTautanWhatsApp(pesanPemesananPaket(namaLayanan, paket.nama, harga));

  return (
    <div
      className={`kartu relative flex flex-col p-6 ${
        paket.unggulan ? "border-2 border-primer-600 shadow-md" : ""
      }`}
    >
      {paket.unggulan && (
        <span className="absolute -top-3 left-6 rounded-full bg-primer-700 px-3 py-1 text-xs font-semibold text-white">
          Paling Diminati
        </span>
      )}
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Paket {paket.nama}</p>
      <p className="mt-2 text-3xl font-bold text-primer-900">{harga}</p>
      <p className="text-sm text-slate-500">{paket.durasi}</p>

      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {paket.fitur.map((fitur) => (
          <li key={fitur} className="flex gap-2">
            <span className="mt-0.5 text-aksen-600" aria-hidden>
              ✓
            </span>
            <span>{fitur}</span>
          </li>
        ))}
      </ul>

      <a href={tautanWa} target="_blank" rel="noopener noreferrer" className="tombol-wa mt-6 w-full">
        <IkonWhatsApp />
        Pesan via WhatsApp
      </a>
    </div>
  );
}

export function IkonWhatsApp() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 01-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 016.67 2.77 9.37 9.37 0 012.76 6.67c0 5.2-4.23 9.43-9.44 9.43M20.08 3.9A11.3 11.3 0 0012.05.6C5.8.6.7 5.7.7 11.95c0 2 .52 3.95 1.52 5.67L.6 23.4l5.92-1.55a11.3 11.3 0 005.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}
