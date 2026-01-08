// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nodakmesh.org',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Higher priority for key pages
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === 'https://nodakmesh.org/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Blog posts and guides get high priority
        else if (item.url.includes('/blog/') && !item.url.includes('/category/') && !item.url.includes('/author/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Getting started pages
        else if (item.url.includes('/getting-started')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Category and author pages get lower priority
        else if (item.url.includes('/category/') || item.url.includes('/author/')) {
          item.priority = 0.4;
          item.changefreq = 'weekly';
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});