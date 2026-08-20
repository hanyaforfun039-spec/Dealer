/* =============================================================================
   omoda-dealer · PERILAKU ANTARMUKA (client)
   ============================================================================ */

/* ---- Menu ---------------------------------------------------------------- */
const burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('#nav a').forEach((a) => {
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Header solid setelah digulir (hanya halaman berhero transparan) ------ */
const header = document.getElementById('header');
if (header && header.dataset.transparan !== undefined) {
  addEventListener('scroll', () => {
    header.classList.toggle('is-solid', scrollY > 40);
  }, { passive: true });
}

/* ---- Angka reward menghitung naik ----------------------------------------
   Angka akhirnya SUDAH tercetak di HTML. Skrip ini menurunkannya ke 0 lalu
   menghitung naik saat terlihat — jadi tanpa JavaScript pengunjung tetap
   membaca angka yang benar, bukan "Rp 0". */
const angka = document.querySelector<HTMLElement>('.reward__amount-num');
if (angka && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const target = parseInt(angka.dataset.target ?? '0', 10);
  if (target > 0) {
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        obs.disconnect();
        const mulai = performance.now();
        const durasi = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - mulai) / durasi);
          const eased = 1 - Math.pow(1 - t, 3);
          angka.textContent = Math.round(target * eased).toLocaleString('id-ID');
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(angka);
  }
}

/* ---- Galeri halaman model ------------------------------------------------ */
const galeri = document.querySelector<HTMLElement>('[data-galeri]');
if (galeri) {
  const utama = galeri.querySelector<HTMLImageElement>('[data-galeri-utama]');
  galeri.querySelectorAll<HTMLButtonElement>('[data-galeri-pilih]').forEach((tombol) => {
    tombol.addEventListener('click', () => {
      if (!utama) return;
      utama.src = tombol.dataset.src ?? utama.src;
      utama.alt = tombol.dataset.alt ?? utama.alt;
      galeri.querySelectorAll('[data-galeri-pilih]').forEach((b) =>
        b.setAttribute('aria-current', String(b === tombol)),
      );
    });
  });
}
