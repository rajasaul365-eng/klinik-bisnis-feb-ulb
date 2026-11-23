// Logika analisis SWOT sederhana: skor faktor, posisi kuadran, dan matriks strategi TOWS.
// Skor tiap faktor menggunakan skala 1 (lemah pengaruhnya) sampai 4 (sangat kuat pengaruhnya).

export type FaktorSwot = { teks: string; skor: number };

export type DataSwot = {
  kekuatan: FaktorSwot[]; // Strengths (internal)
  kelemahan: FaktorSwot[]; // Weaknesses (internal)
  peluang: FaktorSwot[]; // Opportunities (eksternal)
  ancaman: FaktorSwot[]; // Threats (eksternal)
};

export type HasilSwot = {
  skorS: number;
  skorW: number;
  skorO: number;
  skorT: number;
  sumbuX: number; // Internal: S - W
  sumbuY: number; // Eksternal: O - T
  kuadran: { nomor: string; nama: string; strategi: string; penjelasan: string };
  strategiSO: string[];
  strategiWO: string[];
  strategiST: string[];
  strategiWT: string[];
};

/** Hanya ambil faktor yang sudah diisi teksnya. */
function bersihkan(daftar: FaktorSwot[]): FaktorSwot[] {
  return daftar.filter((f) => f.teks.trim() !== "");
}

/** Rata-rata skor; 0 bila daftar kosong. */
function rataRata(daftar: FaktorSwot[]): number {
  if (daftar.length === 0) return 0;
  return daftar.reduce((total, f) => total + f.skor, 0) / daftar.length;
}

/** Urutkan faktor dari skor tertinggi lalu ambil n teratas. */
function teratas(daftar: FaktorSwot[], n = 2): string[] {
  return [...daftar].sort((a, b) => b.skor - a.skor).slice(0, n).map((f) => f.teks.trim());
}

/** Membuat kombinasi kalimat strategi dari dua kelompok faktor. */
function kombinasikan(a: string[], b: string[], pola: (x: string, y: string) => string): string[] {
  const hasil: string[] = [];
  a.forEach((x) => b.forEach((y) => hasil.push(pola(x, y))));
  return hasil;
}

function tentukanKuadran(x: number, y: number): HasilSwot["kuadran"] {
  if (x >= 0 && y >= 0)
    return {
      nomor: "I",
      nama: "Agresif (Growth)",
      strategi: "Strategi S-O",
      penjelasan:
        "Usaha memiliki kekuatan internal dan peluang eksternal yang baik. Prioritaskan ekspansi: menambah produk, memperluas pasar, dan meningkatkan kapasitas produksi.",
    };
  if (x < 0 && y >= 0)
    return {
      nomor: "II",
      nama: "Turn-Around (Perbaikan)",
      strategi: "Strategi W-O",
      penjelasan:
        "Peluang pasar besar, tetapi kelemahan internal masih dominan. Fokus memperbaiki kelemahan (SDM, keuangan, kualitas) agar mampu menangkap peluang.",
    };
  if (x < 0 && y < 0)
    return {
      nomor: "III",
      nama: "Defensif (Bertahan)",
      strategi: "Strategi W-T",
      penjelasan:
        "Usaha menghadapi kelemahan internal dan ancaman eksternal sekaligus. Lakukan efisiensi biaya, fokus pada produk inti, dan kurangi risiko.",
    };
  return {
    nomor: "IV",
    nama: "Diversifikasi",
    strategi: "Strategi S-T",
    penjelasan:
      "Usaha memiliki kekuatan, tetapi menghadapi ancaman yang cukup besar. Gunakan kekuatan untuk melakukan diversifikasi produk atau pasar guna mengurangi ancaman.",
  };
}

export function analisisSwot(data: DataSwot): HasilSwot {
  const S = bersihkan(data.kekuatan);
  const W = bersihkan(data.kelemahan);
  const O = bersihkan(data.peluang);
  const T = bersihkan(data.ancaman);

  const skorS = rataRata(S);
  const skorW = rataRata(W);
  const skorO = rataRata(O);
  const skorT = rataRata(T);
  const sumbuX = skorS - skorW;
  const sumbuY = skorO - skorT;

  const s = teratas(S);
  const w = teratas(W);
  const o = teratas(O);
  const t = teratas(T);

  return {
    skorS,
    skorW,
    skorO,
    skorT,
    sumbuX,
    sumbuY,
    kuadran: tentukanKuadran(sumbuX, sumbuY),
    strategiSO: kombinasikan(s, o, (x, y) => `Manfaatkan "${x}" untuk meraih peluang "${y}".`),
    strategiWO: kombinasikan(w, o, (x, y) => `Atasi "${x}" dengan memanfaatkan peluang "${y}".`),
    strategiST: kombinasikan(s, t, (x, y) => `Gunakan "${x}" untuk menghadapi ancaman "${y}".`),
    strategiWT: kombinasikan(w, t, (x, y) => `Minimalkan "${x}" agar tidak diperparah oleh "${y}".`),
  };
}
