import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.delveedu.com',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
});