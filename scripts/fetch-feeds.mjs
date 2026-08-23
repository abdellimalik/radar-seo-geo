import Parser from "rss-parser";
import { writeFile } from "node:fs/promises";

const sources = [
  ["search-engine-land", "https://searchengineland.com/feed"],
  ["search-engine-journal", "https://www.searchenginejournal.com/feed/"],
  ["search-engine-roundtable", "https://www.seroundtable.com/index.xml"],
  ["abondance", "https://www.abondance.com/feed"],
  ["google-search-central", "https://developers.google.com/search/blog/feed.xml"],
  ["moz-blog", "https://moz.com/feeds/blog.rss"],
  ["ahrefs-blog", "https://ahrefs.com/blog/feed/"],
  ["backlinko", "https://backlinko.com/feed"],
  ["ipullrank", "https://ipullrank.com/feed"],
  ["growth-memo", "https://www.growth-memo.com/feed"],
  ["onely", "https://www.onely.com/feed/"],
  ["aleyda-solis", "https://www.aleydasolis.com/en/feed/"],
];

const parser = new Parser({
  headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOGEOWatchBot/0.1)" },
});

const perSource = Number(process.argv[2] ?? 3);
const results = [];

for (const [slug, url] of sources) {
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.slice(0, perSource).map((item) => ({
      source_slug: slug,
      title: (item.title ?? "").trim(),
      url: item.link ?? item.guid ?? "",
      guid: item.guid ?? item.link ?? "",
      author: item.creator ?? item.author ?? null,
      published_at: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
      original_excerpt: (item.contentSnippet ?? item.summary ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 600),
    }));
    results.push(...items);
    console.error(`ok  ${slug}: ${items.length} items`);
  } catch (err) {
    console.error(`FAIL ${slug}: ${err.message}`);
  }
}

await writeFile(
  new URL("./fetched-articles.json", import.meta.url),
  JSON.stringify(results, null, 2)
);
console.error(`\nTotal: ${results.length} articles written to scripts/fetched-articles.json`);
