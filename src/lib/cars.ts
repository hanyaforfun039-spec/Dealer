/* =============================================================================
   omoda-semarang · DATA MOBIL
   MENAMBAH MOBIL BARU: cukup tambah satu entri di src/data/cars.json.
   Halaman /mobil/<slug> dibangkitkan otomatis oleh src/pages/mobil/[slug].astro,
   dan kartunya otomatis muncul di daftar lineup. Tidak ada berkas halaman baru
   yang perlu dibuat.
   ============================================================================ */
import type { Car, Faq } from './types';
import data from '../data/cars.json';

export const cars: Car[] = data as Car[];

export const getAllCars = (): Car[] => cars;

export const getCarBySlug = (slug: string): Car | undefined =>
  cars.find((c) => c.slug === slug);

/** Label status untuk ditampilkan sebagai lencana pada kartu. */
export function labelStatus(car: Car): string {
  return { 'pre-order': 'Pre-Order', tersedia: 'Tersedia', segera: 'Segera Hadir' }[car.status];
}

/** Teks harga. Selama hargaOtr masih null, tampilkan catatannya — jangan
    pernah menampilkan angka kosong atau "Rp 0". */
export function teksHarga(car: Car): string {
  if (car.hargaOtr == null) return car.hargaCatatan ?? 'Hubungi kami untuk info harga';
  return 'Rp ' + car.hargaOtr.toLocaleString('id-ID');
}

export const punyaHarga = (car: Car): boolean => car.hargaOtr != null;

/** Merek diturunkan dari nama model. Situs ini kini memuat dua merek dalam
    satu grup (OMODA dan JAECOO), dan menyebut merek yang salah di data
    terstruktur membuat Google mengaitkan produk ke merek yang keliru. */
export const merek = (car: Car): 'OMODA' | 'JAECOO' =>
  /jaecoo/i.test(car.nama) ? 'JAECOO' : 'OMODA';

/** Mobil pre-order ditawari tombol pre-order; yang sudah tersedia tidak. */
export const sedangPreOrder = (car: Car): boolean => car.status === 'pre-order';

/** FAQ dengan token terisi.
    Jawaban FAQ boleh memuat {harga}; token itu diganti harga terkini saat
    build. Dulu angka harga ditulis langsung di dalam teks FAQ, dan saat harga
    naik teksnya tertinggal — halaman menampilkan dua angka berbeda sekaligus.
    Dengan token, teks FAQ tidak akan pernah basi lagi. */
export function faqTerisi(car: Car): Faq[] {
  const harga = teksHarga(car);
  return (car.faq ?? []).map((f) => ({
    tanya: f.tanya,
    jawab: f.jawab.replace(/\{harga\}/g, harga),
  }));
}
