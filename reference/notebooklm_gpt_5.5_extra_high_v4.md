# NotebookLM Prompt v4 Decision Memo

> 📅 **최종수정: 2026-06-18 01:29 KST**

## Purpose

This memo explains why `notebooklm_gpt_5.5_extra_high_v4.txt` is the recommended NotebookLM custom prompt for the Track 1 ABAP Lesson rebuild.

The v4 prompt is designed for NotebookLM's 10,000-character custom instruction limit. The current prompt is approximately 9,642 characters, leaving a small safety margin for copy/paste behavior while preserving the non-negotiable rebuild contracts.

The goal is not to make one AI's draft "win". The goal is to choose a prompt that can survive large-scale repeated use across 137 Lessons with the lowest failure rate.

The project constraints are:

- Rebuild Track 1 from zero using NotebookLM enrichment plus `sample/learning-methods-v3`.
- Prefer visual and interactive learning over text-only explanation.
- If code appears, a page-local simulation is mandatory.
- SAP GUI T-codes must be treated as first-class learning objects.
- T-code terms must connect to glossary, chip bar, and map behavior through `used_in_lessons`.
- NotebookLM output must remain source-grounded and must support SAP official revalidation.

## Source Drafts Reviewed

- `reference/notebooklm_claude_opus_4.8_high_v3.txt`
- `reference/notebooklm_gemini_3.1_pro_high_v3.txt`
- `reference/notebooklm_gpt_5.5_extra_high_v3.txt`

## Evaluation Criteria

The prompt was judged against five production criteria.

1. **Scope safety**: exact Lesson ID resolution and forward-containment protection.
2. **Output stability**: predictable tags, truncation handling, and low risk of malformed payloads.
3. **Implementation readiness**: concrete assets for v3 components, not only theory.
4. **Project DoD coverage**: code simulation, T-code chip bar, glossary parity, and revalidation.
5. **Instruction-limit fitness**: fit under 10,000 characters without removing the safety-critical contracts.

## Consensus Matrix

| Decision area | Claude v3 | Gemini v3 | GPT v3 | v4 decision |
|---|---|---|---|---|
| Exact Lesson ID lock | Strong | Strong | Strong | Keep |
| Forward-containment rules | Strong | Strong but compact | Strong | Keep |
| CDATA for code assets | Strong | Strong | Partial | Keep for code/simulation sections |
| Ready-to-wire code assets | Strong | Strong but compact | Strong enough | Keep and standardize |
| SAP GUI walkthrough | Strong | Strong but compact | Strong | Keep |
| T-code glossary/chip contract | Partial | Partial | Strong | Keep, but merge into one production section |
| Evidence/revalidation | Strong | Partial | Strong | Keep, but compress |
| Full raw Lesson record output | Removed/avoid in v4 | Not present | Avoided in GPT v3 | Do not use; use extract only |
| Clean ABAP instruction | Avoids timeline leakage | Present | Avoids timeline leakage | Do not enforce Clean ABAP beyond timeline |
| Number of output sections | Medium | Low | High | Use compact-medium: fewer tags than GPT v3, richer than Gemini |
| 10,000-character fit | Close but workable only if trimmed | Strong | Too long in previous v3/v4 form | Fit under limit with margin |

## Why v4 Should Satisfy at Least Two AI Positions

### It satisfies Claude-style concerns

Claude v3 is strongest on "ready-to-wire assets": SAP GUI procedure, expected output, execution trace, fill-in blanks, and buggy variants. v4 keeps these assets in `CODE_IMPLEMENTATION` and `CODE_TO_SIMULATION_CONTRACT`, wrapped in CDATA to reduce malformed XML-style output.

Claude v3 also emphasizes strict payload closing and truncation behavior. v4 keeps the rule that `<PAYLOAD_END>` is mandatory and adds a compression order when truncation risk appears.

### It satisfies Gemini-style concerns

Gemini v3 is strongest on compactness and output stability. v4 adopts that concern directly because the NotebookLM custom instruction field is capped. The prompt now stays under 10,000 characters by merging related sections:

- `LESSON_SCOPE_LOCK` and `LESSON_RECORD_EXTRACT` become `SCOPE_AND_RECORD_EXTRACT`.
- SAP GUI procedure, T-code requirements, glossary candidates, and chip-bar contract become `GUI_TCODE_GLOSSARY_PLAN`.
- Code and simulation contracts become `CODE_AND_SIMULATION_ASSETS`.
- Anti-patterns and quiz items become `ANTI_PATTERNS_ASSESSMENT`.
- Curriculum verification, source evidence, SAP revalidation, and DoD checklist become `EVIDENCE_REVALIDATION_DOD`.

This keeps the payload easier for NotebookLM to complete while retaining the required information.

### It satisfies GPT-style concerns

GPT v3 is strongest on project-specific completeness: glossary candidates, T-code chip bar, revalidation queue, and DoD checklist. v4 keeps those obligations, but removes redundant tags and avoids copying full raw records.

The result is a better production prompt: less fragile than GPT v3, more complete than Gemini v3, and more project-specific than Claude v3.

## Key v4 Design Choices

### 1. Hard 10,000-character budget

The prompt must fit in NotebookLM's custom instruction field. v4 therefore uses compact rule wording and merged output sections. The target is not "as short as possible"; it is "short enough to fit while preserving the contracts that prevent bad rebuilds."

### 2. No full raw Lesson record

Large verbatim source blocks increase truncation risk and compete with implementation assets. v4 uses `SCOPE_AND_RECORD_EXTRACT` instead.

This preserves the useful fields:

- ID and title
- learning objectives
- handled contents
- technical keywords
- hands-on lab
- caution points
- assessment design
- relevant future exclusions

### 3. T-code work is one production contract

The project does not merely "mention" T-codes. T-codes must flow into:

- beginner SAP GUI procedure
- glossary entry
- `data-glossary` wrapping in the Lesson body
- chip bar rendering
- `used_in_lessons`
- cumulative T-code map

That is why v4 has one consolidated `GUI_TCODE_GLOSSARY_PLAN` section with `Chip_Bar_Contract` inside it.

### 4. Code always creates simulation assets

The project DoD says static code blocks are incomplete when code appears. v4 therefore requires:

- expected output
- execution trace
- fill-blank candidates
- buggy variant
- learner manipulation
- error feedback
- recommended interaction type

This turns NotebookLM output into implementation material for v3 components instead of prose that another AI must reinterpret.

### 5. CDATA is used only where it matters

CDATA is kept for code-heavy sections:

- `CODE_AND_SIMULATION_ASSETS`
- `ANTI_PATTERNS_ASSESSMENT`

It is not applied to every section because unnecessary CDATA makes the payload harder to scan and encourages overlong output.

### 6. Revalidation is compact but mandatory

NotebookLM is useful for enrichment, but final Lesson claims still need SAP official revalidation. v4 keeps revalidation in `EVIDENCE_REVALIDATION_DOD`, with compact parts:

- curriculum alignment
- source evidence
- claims to re-check against SAP official docs or SAP Learning
- DoD checklist for rebuild handoff

This keeps grounding visible without making evidence excerpts dominate the answer.

## Rejected Ideas

### Rejected: full `RAW_LESSON_RECORD`

Reason: high truncation risk and low marginal value. The downstream agent can work from extracted fields and local curriculum sources.

### Rejected: blanket `Clean ABAP` enforcement

Reason: Clean ABAP may introduce modern idioms or style expectations that conflict with early curriculum Lessons. v4 keeps "clear indentation and naming" but forbids Modern ABAP leakage before the timeline reaches it.

### Rejected: overly compact output

Reason: Gemini-style compactness is stable, but too little structure omits T-code chip contracts, glossary parity, and revalidation. Large-scale rebuild work needs those gates.

### Rejected: overly many separate tags

Reason: GPT v3 was complete but too close to or above NotebookLM's instruction limit. v4 merges related tags so NotebookLM has fewer structural obligations while preserving content obligations.

## Expected Benefits in Large-Scale Rebuild

- Less repeated debate over whether a Lesson is "code complete".
- Fewer missed T-code glossary and chip-bar tasks.
- Less chance of future-scope leakage into early Lessons.
- More consistent SAP GUI step-by-step instructions.
- Better handoff from NotebookLM payload to web implementation.
- Lower risk of exceeding the 10,000-character instruction limit or truncating before required closing tags.

## Recommended Adoption

Use `reference/notebooklm_gpt_5.5_extra_high_v4.txt` as the next NotebookLM custom prompt candidate. It is currently under the 10,000-character limit.

Before locking it permanently, run a small validation set:

1. `THEORY-02-M01`: SAP GUI + T-code + first code simulation.
2. `THEORY-01-M03`: DDIC concept with less code pressure.
3. `THEORY-03-M01`: PARAMETERS and selection-screen behavior.

Accept v4 if each payload:

- ends with `<PAYLOAD_END>`;
- avoids future-scope leakage;
- produces usable v3 component choices;
- includes a code simulation contract when code appears;
- includes T-code chip/glossary contract when T-codes appear;
- produces a compact but useful revalidation queue.

## Final Position

v4 is the best compromise because it is not merely a "middle" between three drafts. It preserves the non-negotiable production constraints from the project DoD, while adopting the common high-confidence choices shared by at least two AI drafts:

- exact target resolution;
- timeline containment;
- CDATA for fragile code assets;
- concrete code-to-simulation mapping;
- SAP GUI procedural walkthrough;
- compact evidence and revalidation;
- guaranteed closing structure.

This makes it the safest candidate for large-scale Track 1 rebuild work.
