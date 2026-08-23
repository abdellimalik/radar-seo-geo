import { readFile, writeFile } from "node:fs/promises";
import { ENRICHMENT } from "./enrichment-map.mjs";

const articles = JSON.parse(
  await readFile(new URL("./fetched-articles.json", import.meta.url))
);

function sqlStr(v) {
  if (v === null || v === undefined) return "null";
  return `'${String(v).replace(/'/g, "''")}'`;
}

function sqlArray(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  return `ARRAY[${arr.map((s) => sqlStr(s)).join(", ")}]::text[]`;
}

const rows = [];
let skipped = 0;

for (const a of articles) {
  const enrichment = ENRICHMENT[a.url];
  if (!enrichment) {
    skipped++;
    continue;
  }
  const now = new Date().toISOString();
  rows.push(`(
    (select id from public.sources where slug = ${sqlStr(a.source_slug)}),
    ${sqlStr(a.guid)},
    ${sqlStr(a.url)},
    ${sqlStr(a.title)},
    ${sqlStr(a.original_excerpt)},
    ${sqlStr(a.author)},
    ${sqlStr(a.published_at)},
    ${sqlStr(enrichment.summary_fr)},
    ${sqlArray(enrichment.themes)},
    ${sqlStr(enrichment.impact_level)},
    ${sqlStr(enrichment.impact_reason)},
    ${sqlStr(now)}
  )`);
}

const sql = `insert into public.articles
  (source_id, guid, url, title, original_excerpt, author, published_at, summary_fr, themes, impact_level, impact_reason, enriched_at)
values
${rows.join(",\n")}
on conflict (url) do nothing;`;

await writeFile(new URL("./seed-articles.sql", import.meta.url), sql);
console.error(`Wrote ${rows.length} rows to scripts/seed-articles.sql (${skipped} skipped, no enrichment found)`);
