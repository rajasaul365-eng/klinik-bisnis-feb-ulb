// Komponen judul (banner) yang dipakai di bagian atas setiap halaman
type Props = {
  label: string;
  judul: string;
  deskripsi: string;
};

export default function JudulHalaman({ label, judul, deskripsi }: Props) {
  return (
    <section className="tidak-dicetak bg-gradient-to-br from-primer-900 to-primer-700 text-white">
      <div className="wadah py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-aksen-500">{label}</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{judul}</h1>
        <p className="mt-3 max-w-2xl text-primer-100">{deskripsi}</p>
      </div>
    </section>
  );
}
