import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);
const errors = [], warnings = [], idsByFile = new Map(), htmlByFile = new Map();
const rel = file => path.relative(root, file).split(path.sep).join('/');
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  htmlByFile.set(file, html);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
  const seen = new Set(), duplicate = new Set();
  for (const id of ids) { if (seen.has(id)) duplicate.add(id); seen.add(id); }
  if (duplicate.size) errors.push(rel(file) + ': duplicate id(s): ' + [...duplicate].join(', '));
  idsByFile.set(file, seen);
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) errors.push(rel(file) + ': missing or empty title');
  if (!/<meta\s+name=["']description["']\s+content=["'][^"']{40,}["']/i.test(html)) warnings.push(rel(file) + ': missing or short meta description');
}
for (const file of htmlFiles) {
  const html = htmlByFile.get(file);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const raw = match[1].trim();
    if (!raw || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) continue;
    const hashIndex = raw.indexOf('#');
    const pathAndQuery = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
    const hash = hashIndex >= 0 ? decodeURIComponent(raw.slice(hashIndex + 1)) : '';
    const cleanPath = pathAndQuery.split('?')[0];
    let target = cleanPath ? path.resolve(path.dirname(file), decodeURIComponent(cleanPath)) : file;
    if (raw.startsWith('/')) target = path.resolve(root, decodeURIComponent(cleanPath).replace(/^\/+/, ''));
    if (cleanPath.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      errors.push(rel(file) + ': missing local target "' + raw + '"');
      continue;
    }
    if (hash && /\.html?$/i.test(target) && idsByFile.has(target) && !idsByFile.get(target).has(hash)) {
      errors.push(rel(file) + ': missing anchor "' + raw + '"');
    }
  }
}
const jsFiles = [];
function walkJs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkJs(full);
    else if (entry.isFile() && entry.name.endsWith('.js')) jsFiles.push(full);
  }
}
walkJs(root);
for (const file of jsFiles) if (!fs.readFileSync(file, 'utf8').trim()) warnings.push(rel(file) + ': empty JavaScript file');
console.log('WILDCORE QA: ' + htmlFiles.length + ' HTML pages, ' + jsFiles.length + ' JavaScript files');
for (const warning of warnings) console.warn('WARNING: ' + warning);
if (errors.length) {
  for (const error of errors) console.error('ERROR: ' + error);
  console.error('QA failed with ' + errors.length + ' error(s).');
  process.exit(1);
}
console.log('QA passed with ' + warnings.length + ' warning(s).');
