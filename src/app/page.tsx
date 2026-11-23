import Link from "next/link";
import { daftarLayanan } from "@/data/paket";
import { daftarPublikasi } from "@/data/publikasi";
import { infoSitus } from "@/data/situs";
import { formatRupiah } from "@/lib/format";
import { buatTautanWhatsApp, pesanKonsultasi } from "@/lib/whatsapp";

// Keunggulan Klinik Bisnis yang ditampilkan di beranda
const keunggulan = [
  {
    judul: "Didampingi Dosen Ahli",
    isi: "Setiap pekerjaan mahasiswa disupervisi oleh dosen pembimbing FEB sesuai bidang keahliannya.",
  },
  {
    judul: "Harga Terjangkau UMKM",
    isi: "Paket jasa dirancang khusus agar ramah kantong pelaku usaha mikro dan kecil di Labuhanbatu.",
  },
  {
    judul: "Berbasis Data & Ilmiah",
    isi: "Rekomendasi disusun dengan metode manajemen yang teruji dan data lapangan yang akurat.",
  },
  {
    judul: "Dekat & Mengenal Daerah",
    isi: "Tim berasal dari Labuhanbatu sehingga memahami karakter pasar dan konsumen lokal.",
  },
];

// Alur kerja layanan dari konsultasi sampai serah terima
const alurLayanan = [
  { no: "1", judul: "Konsultasi Awal", isi: "Hubungi kami via WhatsApp dan ceritakan kebutuhan usaha Anda." },
  { no: "2", judul: "Pilih Paket", isi: "Tim merekomendasikan paket yang paling sesuai dengan kebutuhan." },
  { no: "3", judul: "Pengerjaan", isi: "Mahasiswa mengerjakan layanan di bawah supervisi dosen pembimbing." },
  { no: "4", judul: "Serah Terima", isi: "Hasil diserahkan beserta penjelasan dan pendampingan penerapan." },
];

export default function Beranda() {
  const publikasiTerbaru = daftarPublikasi.slice(0, 3);

  return (
    <>
      {/* Bagian pembuka (hero) */}
      <section className="bg-gradient-to-br from-primer-900 via-primer-800 to-primer-700 text-white">
        <div className="wadah grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aksen-500">
              Fakultas Ekonomi dan Bisnis · Universitas Labuhanbatu
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Klinik Bisnis UMKM &amp; Portal Riset Manajemen
            </h1>
            <p className="mt-4 text-lg text-primer-100">
              Mitra pendamping UMKM Labuhanbatu untuk menyusun rencana bisnis, merapikan keuangan, memperluas
              pemasaran digital, dan memahami pasar, dikerjakan oleh mahasiswa dan dibimbing langsung oleh dosen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/layanan" className="tombol-wa">
                Lihat Paket Jasa
              </Link>
              <a
                href={buatTautanWhatsApp(pesanKonsultasi)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { angka: "4", label: "Bidang layanan UMKM" },
              { angka: "12", label: "Pilihan paket jasa" },
              { angka: "5", label: "Rumpun riset manajemen" },
              { angka: "100%", label: "Disupervisi dosen" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 p-6 backdrop-blur">
                <p className="text-3xl font-bold">{s.angka}</p>
                <p className="mt-1 text-sm text-primer-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profil singkat */}
      <section className="wadah py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primer-600">Tentang Kami</p>
            <h2 className="mt-2 text-3xl font-bold text-primer-900">Laboratorium Kewirausahaan dan Riset Terapan</h2>
          </div>
          <div className="space-y-4 text-slate-600">
            <p>
              Klinik Bisnis FEB Universitas Labuhanbatu adalah unit layanan yang menghubungkan ilmu manajemen di
              ruang kuliah dengan kebutuhan nyata pelaku usaha di Kabupaten Labuhanbatu dan sekitarnya.
            </p>
            <p>
              Melalui klinik ini, mahasiswa memperoleh pengalaman profesional sekaligus pendapatan dari jasa yang
              mereka tawarkan, sementara UMKM mendapatkan pendampingan berkualitas dengan biaya terjangkau. Hasil
              pendampingan juga menjadi bahan riset dan publikasi ilmiah dosen dan mahasiswa.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keunggulan.map((k) => (
            <div key={k.judul} className="kartu p-6">
              <p className="font-semibold text-primer-900">{k.judul}</p>
              <p className="mt-2 text-sm text-slate-600">{k.isi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ringkasan layanan */}
      <section className="bg-white py-16">
        <div className="wadah">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primer-600">Layanan Kami</p>
              <h2 className="mt-2 text-3xl font-bold text-primer-900">Paket Jasa untuk UMKM</h2>
            </div>
            <Link href="/layanan" className="tombol-sekunder">
              Lihat semua paket →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {daftarLayanan.map((layanan) => {
              const hargaTermurah = Math.min(...layanan.paket.map((p) => p.harga));
              return (
                <Link
                  key={layanan.id}
                  href={`/layanan#${layanan.id}`}
                  className="kartu group p-6 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl" aria-hidden>
                    {layanan.ikon}
                  </span>
                  <p className="mt-3 font-semibold text-primer-900 group-hover:text-primer-600">{layanan.nama}</p>
                  <p className="mt-2 text-sm text-slate-600">{layanan.ringkasan}</p>
                  <p className="mt-4 text-sm text-slate-500">
                    Mulai <span className="font-bold text-aksen-600">{formatRupiah(hargaTermurah)}</span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alur layanan */}
      <section className="wadah py-16">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-primer-600">Alur Layanan</p>
        <h2 className="mt-2 text-center text-3xl font-bold text-primer-900">Empat Langkah Mudah</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {alurLayanan.map((a) => (
            <div key={a.no} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primer-700 text-lg font-bold text-white">
                {a.no}
              </span>
              <p className="mt-4 font-semibold text-primer-900">{a.judul}</p>
              <p className="mt-1 text-sm text-slate-600">{a.isi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Publikasi terbaru */}
      <section className="bg-white py-16">
        <div className="wadah">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primer-600">Riset &amp; Publikasi</p>
              <h2 className="mt-2 text-3xl font-bold text-primer-900">Karya Ilmiah Dosen dan Mahasiswa</h2>
            </div>
            <Link href="/publikasi" className="tombol-sekunder">
              Lihat etalase publikasi →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {publikasiTerbaru.map((p) => (
              <div key={p.id} className="kartu p-6">
                <p className="text-xs font-semibold uppercase text-aksen-600">{p.kategori}</p>
                <p className="mt-2 font-semibold leading-snug text-primer-900">{p.judul}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {p.penulis.join(", ")} · {p.tahun}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ajakan bertindak */}
      <section className="wadah py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primer-800 to-primer-600 p-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Siap Mengembangkan Usaha Anda?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primer-100">
            Konsultasi awal tidak dipungut biaya. Ceritakan kebutuhan usaha Anda dan tim kami akan membantu
            menemukan solusi terbaik. Jam layanan: {infoSitus.jamLayanan}.
          </p>
          <a
            href={buatTautanWhatsApp(pesanKonsultasi)}
            target="_blank"
            rel="noopener noreferrer"
            className="tombol-wa mt-6"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
