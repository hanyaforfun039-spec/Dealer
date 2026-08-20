/* =============================================================================
   omoda-semarang · DATA MOBIL
   MENAMBAH MOBIL BARU: cukup tambah satu entri di src/data/cars.json.
   Halaman /mobil/<slug> dibangkitkan otomatis oleh src/pages/mobil/[slug].astro,
   dan kartunya otomatis muncul di daftar lineup. Tidak ada berkas halaman baru
   yang perlu dibuat.
   ============================================================================ */
import type { Car } from './types';
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
