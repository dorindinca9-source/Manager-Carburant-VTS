import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';

const ROOT = process.cwd();
const app = path.join(ROOT, 'app');
const www = path.join(ROOT, 'www');

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(path.join(www, 'vendor'), { recursive: true });

let html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');

const replacements = new Map([
  ['https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js', 'vendor/exceljs.min.js'],
  ['https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js', 'vendor/jspdf.umd.min.js'],
  ['https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.4/dist/jspdf.plugin.autotable.min.js', 'vendor/jspdf.plugin.autotable.min.js'],
  ['https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js', 'vendor/jszip.min.js']
]);

for (const [from, to] of replacements) html = html.split(from).join(to);
fs.writeFileSync(path.join(www, 'index.html'), html);

for (const icon of ['icon-192.png', 'icon-512.png']) {
  const src = path.join(app, icon);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(www, icon));
}

const vendorFiles = [
  ['node_modules/exceljs/dist/exceljs.min.js', 'vendor/exceljs.min.js'],
  ['node_modules/jspdf/dist/jspdf.umd.min.js', 'vendor/jspdf.umd.min.js'],
  ['node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'vendor/jspdf.plugin.autotable.min.js'],
  ['node_modules/jszip/dist/jszip.min.js', 'vendor/jszip.min.js']
];

for (const [srcRel, dstRel] of vendorFiles) {
  fs.copyFileSync(path.join(ROOT, srcRel), path.join(www, dstRel));
}

await build({
  entryPoints: [path.join(app, 'native-share-entry.js')],
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome120'],
  outfile: path.join(www, 'native-share.bundle.js')
});

console.log('Web build OK');
