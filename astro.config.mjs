// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  output: 'server',
  adapter: netlify()
});
