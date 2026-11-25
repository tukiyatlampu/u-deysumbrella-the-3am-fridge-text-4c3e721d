// The 3AM Fridge Text — one line a smart fridge texts its owner at 3am.
//
// The program writes exactly one text, one line, to entry.txt and nothing
// else. The file is what the judge reads; console output is only a log.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, 86 characters. Setup: the fridge has been counting the owner's
// 3am visits and keeps the tally out loud. Turn: the pickles — the only
// witnesses — refuse to testify. The laugh is the appliance as keeper of
// incriminating evidence, with a small voice and no shame about speaking
// at 3am. Fresh angle: surveillance + witness silence, not milk, ice,
// or a door left open.
const LINE =
  "You again. 3am. Visit six. The pickles saw everything and they will not be testifying.";

// The gate: entry.txt must be UTF-8 text of 1 to 140 characters, one line,
// not only white space. The file holds exactly the text — no trailing
// newline — so the byte count the leaderboard shows is the text itself,
// which also helps the size tie-break (fewer bytes wins an exact tie).
const byteLength = Buffer.byteLength(LINE, "utf8");
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`Line must be 1-140 characters, got ${LINE.length}.`);
}
if (byteLength > 140) {
  throw new Error(`Line must be at most 140 bytes, got ${byteLength}.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only white space.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to ${entryPath}`);
