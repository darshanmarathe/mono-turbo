import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const tsconfigs = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.turbo', '.git'].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === 'tsconfig.json' || entry.name === 'tsconfig.base.json') {
      tsconfigs.push(full);
    }
  }
}

walk(root);

const issues = [];
for (const file of tsconfigs) {
  const json = JSON.parse(readFileSync(file, 'utf8'));
  const options = json.compilerOptions ?? {};
  const label = relative(root, file);
  if (options.baseUrl !== undefined) issues.push(`${label}: baseUrl is deprecated`);
  if (options.moduleResolution === 'node') issues.push(`${label}: moduleResolution 'node' is deprecated (use 'bundler' or 'nodenext')`);
  if (options.target === 'es5') issues.push(`${label}: target 'es5' is not supported`);
}

if (issues.length > 0) {
  console.error('Deprecated TypeScript 7 flags found:');
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exit(1);
}

console.log(`Checked ${tsconfigs.length} tsconfig files: no deprecated TS7 flags.`);
