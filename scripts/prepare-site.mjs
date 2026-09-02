import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('../', import.meta.url);
const output = new URL('../public/', import.meta.url);
const directories = ['about', 'contact', 'content', 'images', 'work', 'works'];
const extensions = new Set(['.css', '.html', '.js']);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const directory of directories) {
  await cp(new URL(`../${directory}/`, import.meta.url), new URL(`../public/${directory}/`, import.meta.url), { recursive: true });
}

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && extensions.has(extname(entry.name))) {
    await cp(join(root.pathname, entry.name), join(output.pathname, entry.name));
  }
}
