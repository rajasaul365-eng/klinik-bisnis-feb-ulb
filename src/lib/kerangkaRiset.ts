// Logika penyusun kerangka riset (berbasis templat, tanpa layanan AI/API eksternal).
// Hasilnya adalah draf awal yang WAJIB dikembangkan dan diverifikasi oleh mahasiswa bersama dosen pembimbing.

export type Pendekatan = "kuantitatif" | "kualitatif" | "campuran";

export type InputRiset = {
  topik: string; // Fenomena atau isu yang diangkat
  variabelBebas: string; // Dipisahkan koma, contoh: "Kualitas Produk, Harga"
  variabelTerikat: string; // Contoh: "Keputusan Pembelian"
  variabelMediasi: string; // Opsional
  objek: string; // Contoh: "UMKM Kuliner di Rantauprapat"
  populasi: string; // Contoh: "Konsumen UMKM kuliner"
  pendekatan: Pendekatan;
};

export type HasilRiset = {
  usulanJudul: string[];
  latarBelakang: string[];
  rumusanMasalah: string[];
  tujuan: string[];
  hipotesis: string[];
  kerangkaKonseptual: string;
  metode: { label: string; isi: string }[];
  sistematika: { bagian: string; isi: string }[];
  kataKunciPencarian: string[];
};

/** Memecah teks berpisah koma menjadi daftar variabel yang bersih. */
export function pecahVariabel(teks: string): string[] {
  return teks
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

/** Menggabungkan daftar menjadi kalimat: "A, B, dan C". */
function gabung(daftar: string[]): string {
  if (daftar.length <= 1) return daftar.join("");
  if (daftar.length === 2) return `${daftar[0]} dan ${daftar[1]}`;
  return `${daftar.slice(0, -1).join(", ")}, dan ${daftar[daftar.length - 1]}`;
}

export function susunKerangkaRiset(input: InputRiset): HasilRiset {
  const X = pecahVariabel(input.variabelBebas);
  const Y = input.variabelTerikat.trim() || "Variabel Terikat";
  const Z = input.variabelMediasi.trim();
  const objek = input.objek.trim() || "Objek Penelitian";
  const populasi = input.populasi.trim() || "populasi penelitian";
  const topik = input.topik.trim() || `${gabung(X)} dan ${Y}`;
  const daftarX = X.length ? X : ["Variabel Bebas"];
  const teksX = gabung(daftarX);
  const kualitatif = input.pendekatan === "kualitatif";

  // 1. Usulan judul
  const usulanJudul = kualitatif
    ? [
        `Analisis ${teksX} dalam Meningkatkan ${Y} pada ${objek}`,
        `Strategi ${Y} Melalui ${teksX}: Studi Kasus pada ${objek}`,
        `Eksplorasi Peran ${teksX} terhadap ${Y} pada ${objek}`,
      ]
    : [
        `Pengaruh ${teksX} terhadap ${Y} pada ${objek}`,
        Z
          ? `Pengaruh ${teksX} terhadap ${Y} dengan ${Z} sebagai Variabel Mediasi pada ${objek}`
          : `Analisis Pengaruh ${teksX} terhadap ${Y}: Studi Empiris pada ${objek}`,
        `Peran ${teksX} dalam Meningkatkan ${Y} pada ${objek}`,
      ];

  // 2. Poin latar belakang
  const latarBelakang = [
    `Gambaran umum fenomena: ${topik}, beserta data pendukung (statistik BPS, data dinas terkait, atau data internal ${objek}).`,
    `Peran strategis ${objek} bagi perekonomian daerah Labuhanbatu dan tantangan yang sedang dihadapi.`,
    `Kesenjangan (gap) antara kondisi ideal dan kondisi aktual ${Y} di lapangan, didukung hasil pra-survei atau observasi awal.`,
    `Tinjauan singkat penelitian terdahulu mengenai ${teksX} dan ${Y}, termasuk hasil yang tidak konsisten (research gap).`,
    `Alasan pemilihan ${objek} sebagai objek penelitian dan kebaruan (novelty) yang ditawarkan.`,
  ];

  // 3. Rumusan masalah & 4. Tujuan
  const rumusanMasalah: string[] = [];
  const tujuan: string[] = [];
  if (kualitatif) {
    rumusanMasalah.push(
      `Bagaimana kondisi ${teksX} pada ${objek}?`,
      `Bagaimana ${teksX} berperan dalam membentuk ${Y} pada ${objek}?`,
      `Apa saja faktor pendukung dan penghambat dalam upaya meningkatkan ${Y} pada ${objek}?`,
    );
    tujuan.push(
      `Mendeskripsikan kondisi ${teksX} pada ${objek}.`,
      `Menganalisis peran ${teksX} dalam membentuk ${Y} pada ${objek}.`,
      `Mengidentifikasi faktor pendukung dan penghambat peningkatan ${Y} pada ${objek}.`,
    );
  } else {
    daftarX.forEach((x) => {
      rumusanMasalah.push(`Apakah ${x} berpengaruh terhadap ${Y} pada ${objek}?`);
      tujuan.push(`Menguji dan menganalisis pengaruh ${x} terhadap ${Y} pada ${objek}.`);
    });
    if (daftarX.length > 1) {
      rumusanMasalah.push(`Apakah ${teksX} secara simultan berpengaruh terhadap ${Y} pada ${objek}?`);
      tujuan.push(`Menguji dan menganalisis pengaruh ${teksX} secara simultan terhadap ${Y}.`);
    }
    if (Z) {
      rumusanMasalah.push(`Apakah ${Z} memediasi pengaruh ${teksX} terhadap ${Y}?`);
      tujuan.push(`Menguji peran ${Z} sebagai variabel mediasi antara ${teksX} dan ${Y}.`);
    }
  }

  // 5. Hipotesis (hanya untuk pendekatan kuantitatif/campuran)
  const hipotesis: string[] = [];
  if (!kualitatif) {
    let n = 1;
    daftarX.forEach((x) => hipotesis.push(`H${n++}: ${x} berpengaruh positif dan signifikan terhadap ${Y}.`));
    if (daftarX.length > 1 && !Z) {
      hipotesis.push(`H${n++}: ${teksX} secara simultan berpengaruh signifikan terhadap ${Y}.`);
    }
    if (Z) {
      daftarX.forEach((x) => hipotesis.push(`H${n++}: ${x} berpengaruh positif dan signifikan terhadap ${Z}.`));
      hipotesis.push(`H${n++}: ${Z} berpengaruh positif dan signifikan terhadap ${Y}.`);
      daftarX.forEach((x) => hipotesis.push(`H${n++}: ${Z} memediasi pengaruh ${x} terhadap ${Y}.`));
    }
  }

  // 6. Kerangka konseptual dalam bentuk teks sederhana
  const kerangkaKonseptual = Z
    ? `[${daftarX.join("] + [")}]  →  [${Z}]  →  [${Y}]`
    : `[${daftarX.join("] + [")}]  →  [${Y}]`;

  // 7. Metode penelitian
  const metode = kualitatif
    ? [
        { label: "Jenis penelitian", isi: "Kualitatif deskriptif dengan pendekatan studi kasus." },
        { label: "Informan", isi: `Pemilik/pengelola dan pihak terkait pada ${objek}, dipilih secara purposive.` },
        { label: "Teknik pengumpulan data", isi: "Wawancara mendalam, observasi partisipatif, dan dokumentasi." },
        { label: "Teknik analisis", isi: "Model Miles & Huberman: reduksi data, penyajian data, dan penarikan kesimpulan." },
        { label: "Keabsahan data", isi: "Triangulasi sumber, triangulasi teknik, dan member check." },
      ]
    : [
        {
          label: "Jenis penelitian",
          isi:
            input.pendekatan === "campuran"
              ? "Metode campuran (mixed methods) dengan desain sekuensial eksplanatori."
              : "Kuantitatif dengan pendekatan asosiatif kausal.",
        },
        { label: "Populasi & sampel", isi: `Populasi: ${populasi}. Sampel ditentukan dengan rumus Slovin/Hair et al. dan teknik purposive atau accidental sampling.` },
        { label: "Instrumen", isi: "Kuesioner skala Likert 1–5 yang disusun berdasarkan indikator setiap variabel." },
        { label: "Uji instrumen", isi: "Uji validitas dan reliabilitas (Cronbach's Alpha / Composite Reliability)." },
        {
          label: "Teknik analisis",
          isi: Z
            ? "Structural Equation Modeling berbasis Partial Least Squares (SEM-PLS) menggunakan SmartPLS, termasuk uji efek mediasi (bootstrapping)."
            : "Regresi linear berganda dengan uji asumsi klasik, uji t, uji F, dan koefisien determinasi (R²) menggunakan SPSS.",
        },
      ];

  // 8. Sistematika artikel ilmiah (format IMRaD)
  const sistematika = [
    { bagian: "Abstrak", isi: "150–250 kata: tujuan, metode, hasil utama, implikasi; disertai 3–5 kata kunci." },
    { bagian: "Pendahuluan", isi: "Latar belakang, fenomena, research gap, tujuan, dan kontribusi penelitian." },
    { bagian: "Tinjauan Pustaka", isi: `Grand theory, definisi & indikator ${gabung([...daftarX, ...(Z ? [Z] : []), Y])}, penelitian terdahulu${kualitatif ? "" : ", dan pengembangan hipotesis"}.` },
    { bagian: "Metode Penelitian", isi: "Desain, populasi/sampel atau informan, instrumen, dan teknik analisis data." },
    { bagian: "Hasil dan Pembahasan", isi: "Penyajian hasil analisis lalu dibandingkan dengan teori dan penelitian terdahulu." },
    { bagian: "Kesimpulan", isi: "Jawaban atas rumusan masalah, implikasi manajerial bagi UMKM, keterbatasan, dan saran." },
    { bagian: "Daftar Pustaka", isi: "Minimal 80% sumber primer (jurnal) 10 tahun terakhir; gunakan Mendeley/Zotero gaya APA." },
  ];

  // 9. Kata kunci pencarian literatur (Google Scholar, Garuda, Sinta, Scopus)
  const kataKunciPencarian = [
    ...daftarX.map((x) => `"${x}" "${Y}"`),
    ...(Z ? [`"${Z}" mediasi "${Y}"`] : []),
    `"${Y}" UMKM`,
    `"${daftarX[0]}" SMEs`,
  ];

  return {
    usulanJudul,
    latarBelakang,
    rumusanMasalah,
    tujuan,
    hipotesis,
    kerangkaKonseptual,
    metode,
    sistematika,
    kataKunciPencarian,
  };
}

/** Mengubah hasil menjadi teks polos agar mudah disalin ke dokumen Word. */
export function hasilRisetKeTeks(h: HasilRiset): string {
  const daftar = (judul: string, isi: string[]) =>
    isi.length ? `${judul}\n${isi.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n` : "";
  return [
    daftar("USULAN JUDUL", h.usulanJudul),
    daftar("POIN LATAR BELAKANG", h.latarBelakang),
    daftar("RUMUSAN MASALAH", h.rumusanMasalah),
    daftar("TUJUAN PENELITIAN", h.tujuan),
    daftar("HIPOTESIS", h.hipotesis),
    `KERANGKA KONSEPTUAL\n${h.kerangkaKonseptual}\n`,
    daftar("METODE PENELITIAN", h.metode.map((m) => `${m.label}: ${m.isi}`)),
    daftar("SISTEMATIKA ARTIKEL", h.sistematika.map((s) => `${s.bagian}: ${s.isi}`)),
    daftar("KATA KUNCI PENCARIAN LITERATUR", h.kataKunciPencarian),
  ].join("\n");
}
