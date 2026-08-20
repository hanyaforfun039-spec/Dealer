/* robots.txt dibangkitkan agar alamat sitemap selalu ikut domain yang dipakai
   saat build — tidak perlu diedit manual kalau domainnya berubah. */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site?.href.replace(/\/+$/, '') ?? '';
  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${base}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
