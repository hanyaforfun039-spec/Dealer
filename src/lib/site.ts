/* Config situs. Satu berkas JSON, dibaca sinkron saat build. */
import type { SiteConfig } from './types';
import data from '../data/site.json';

export const site: SiteConfig = data as SiteConfig;
