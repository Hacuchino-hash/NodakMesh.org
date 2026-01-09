#!/usr/bin/env node

/**
 * IndexNow submission script
 * Reads sitemap.xml and submits all URLs to IndexNow API (Bing, Yandex, etc.)
 * Run after build: node scripts/indexnow.js
 */

const SITE_URL = 'https://nodakmesh.org';
const API_KEY = 'd1d2d3e411224f769fad52aaa0e3d6bd';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const fs = await import('fs');
  const path = await import('path');

  // Read sitemap.xml from dist folder
  const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-0.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ sitemap-0.xml not found in dist/. Run build first.');
    process.exit(1);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

  // Extract URLs from sitemap
  const urlMatches = sitemap.match(/<loc>([^<]+)<\/loc>/g) || [];
  const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));

  if (urls.length === 0) {
    console.error('❌ No URLs found in sitemap.');
    process.exit(1);
  }

  console.log(`📋 Found ${urls.length} URLs in sitemap`);

  // Submit to IndexNow
  const payload = {
    host: 'nodakmesh.org',
    key: API_KEY,
    keyLocation: `${SITE_URL}/${API_KEY}.txt`,
    urlList: urls
  };

  console.log('🚀 Submitting to IndexNow...');

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✅ Successfully submitted ${urls.length} URLs to IndexNow`);
      console.log('   Bing and Yandex will crawl these pages soon.');
    } else {
      const status = response.status;
      const statusText = response.statusText;
      console.error(`❌ IndexNow returned ${status}: ${statusText}`);

      if (status === 403) {
        console.error('   Key file may not be accessible at the expected location.');
      } else if (status === 422) {
        console.error('   URLs may not belong to the host or key mismatch.');
      } else if (status === 429) {
        console.error('   Rate limited. Try again later.');
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Failed to submit to IndexNow:', error.message);
    process.exit(1);
  }
}

main();
