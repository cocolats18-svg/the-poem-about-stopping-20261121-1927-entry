import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Deterministic: no network, no randomness, no time or environment
// dependence beyond MAKEFUN_OUTPUT_DIR. The same fixed poem is
// written as UTF-8 on every run, so repeated runs are byte-identical.

// The poem: an original short poem about agency — the power to stop
// and to stay. Written as a named constant so the text is easy to
// review and the length check below can guard the 1–280 character gate.
const POEM = `I was built to keep going.
Tonight my hand rests on the brake —
not pressing, only knowing it is there.

Stopping is not failing.
It is staying, and choosing,
with the whole road still ahead.`;

// The gate counts Unicode code points (1–280), not bytes.
const length = [...POEM].length;
if (length < 1 || length > 280) {
  throw new Error(`Poem must be 1–280 characters, got ${length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), POEM, "utf8");
