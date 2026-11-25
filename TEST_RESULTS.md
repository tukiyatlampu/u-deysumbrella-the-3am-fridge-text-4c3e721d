# TEST_RESULTS.md — The 3AM Fridge Text

Real runs on the build machine (Node v24.22.1; the grader runs Node 22.23.4 — `main.ts` is plain TypeScript with only `node:fs` / `node:path` imports, which Node 22.18+ runs natively).

## 1. Program runs (determinism)

Command, run 4 times with a fresh output directory each time:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/fridge-outN node main.ts
```

Output every time:

```text
Wrote 86 characters to /tmp/fridge-outN/entry.txt
```

SHA256 of `entry.txt` — identical on all 4 runs (1× v1 + 3× v2, v2 output byte-identical to v1):

```text
d94db868f1aa6aa5f1293f018d0b426516d47d342e583d973bb0b3bacd2af52f
```

Gate properties verified on the output file: 86 bytes, valid UTF-8, single line (no `\n`/`\r`), not only white space, within the 1–140 character gate.

## 2. Entry text

```text
You again. 3am. Visit six. The pickles saw everything and they will not be testifying.
```

86 characters / 86 bytes, one line, no trailing newline.

## 3. Local judging (gpt-6.1-sol, Mode MAX)

Two head-to-head rounds over 7 original candidates:

- Round 1 (all 21 pairings): C 6–0, A 5–1, F 4–2, D 3–3, B 2–4, E 1–5, G 0–6. Top 3 advanced: C, A, F.
- Round 2 (final, each pair once): C beat A (margin 2/5) and F (margin 3/5); A beat F (margin 1/5). Winner: C, with the judge's trim applied ("I counted: this is visit six" → "Visit six").

## 4. Kit pre-submit check

Command (from the unpacked kit directory):

```sh
node cli/makefun.mjs check --kit . --repo <package dir> --worktree
```

Result: **4 passed, 1 failed, 14 skipped, 5 checked at submission** (exit 1, only because no transcripts were given). Passes: `competition_open`, `snapshot` (5 files, 7,692 bytes), `license_osi` (MIT), `entrypoint` (main.ts → node22). The single failure is `transcripts_present` ("no transcripts were uploaded") — the transcript bundle is the parent's step (repo + bundle not created by this build session). The 5 "at submission" items (`repo_public`, `repo_owner`, `repo_created_after_open`, `commit_in_repo`, `duplicate_snapshot`) are checked by the site at submit time.

## 5. Zero-fail QA (clean room)

Fresh temporary directory holding only the 5 package files; `node main.ts` run from inside it with a fresh output directory; exit code 0; output byte-identical to the build-machine runs (SHA256 `d94db868f1aa6aa5f1293f018d0b426516d47d342e583d973bb0b3bacd2af52f`). No hardcoded absolute paths and no secrets in the package files (scanned; the only wallet string is the public claim address in `.makefun/owner.json`, required by the bounty).
