# archive/project-docs/20260615 — 아카이빙 매니페스트

> 📅 **보관일: 2026-06-15 10:15 KST**
> 🎯 **목적:** `.project-docs`를 AI-Native 린 구조로 전면 재구성하면서, 직전 문서 세트(13개 md + changelogs/ + 진행계획/)를 통째 보관한 스냅샷.

## 왜 보관했나
`.project-docs`가 비대해지고 역할 중복(개요↔README, 완료 이력, 구 양산 인계서 등)이 심해 **AI가 "지금 무엇을, 어떤 규칙으로" 하는지** 빠르게 못 잡았다. "AI가 부팅하는 컨텍스트 시스템"으로 만들기 위해 **빈 캔버스에서 6개 문서로 재구성**했고, 옛 세트 전체를 여기에 읽기 전용으로 남긴다. (영구 이력의 SSOT는 git이며, 이 폴더는 사람이 바로 열어보는 큐레이션 스냅샷이다.)

## old → new 매핑

| 구 파일 | 새 위치 | 비고 |
|---|---|---|
> 새 번호는 **읽기 우선순위 순**으로 채번됨: `00 INDEX · 01 AI_SYNC · 02 PROGRESS(신규) · 03 ARCHITECTURE · 04 CONVENTIONS · 05 PITFALLS · 06 LEARNING_METHODS · 07 BROWSER_TESTING`.

| 구 파일 | 새 위치 | 비고 |
|---|---|---|
| `00_INDEX.md` | → 새 `.project-docs/00_INDEX.md` | 부팅 진입점으로 재작성 |
| `99_AI_SYNC.md` | → 새 `.project-docs/01_AI_SYNC.md` | 단일 목표·AI규칙 핵심만, NotebookLM ID·design_variants 강제 verbatim 보존 |
| `02_ARCHITECTURE.md` | → 새 `.project-docs/03_ARCHITECTURE.md` | 구 `01_OVERVIEW`의 정체성 1문단 흡수 |
| `01_OVERVIEW.md` | (흡수 후 보관) | 정체성만 03(ARCHITECTURE)으로, 나머지는 README/git와 중복 |
| `03_CONVENTIONS.md` | → 새 `.project-docs/04_CONVENTIONS.md` | 구 09 이미지규칙 흡수, §9·§10 v3 목표로 재작성, plans·타임스탬프 규칙 신설 |
| `09_IMAGE_ASSETS_RULE.md` | (흡수 후 보관) | → 새 04(CONVENTIONS) R9 이미지 |
| `04_PITFALLS.md` | → 새 `.project-docs/05_PITFALLS.md` | 폐기 작업 관련 함정 제거, stage7 네이밍 1줄만 유지 |
| `10_LEARNING_CONTENT_METHODS.md` | → 새 `.project-docs/06_LEARNING_METHODS.md` | v3 샘플 매핑 추가 |
| `virtual_browser_test_guide.md` | → 새 `.project-docs/07_BROWSER_TESTING.md` | 번호 체계로 통일 + 표준 헤더 부여 |
| `05_INVENTORIES.md` | (보관) | 살아있는 엔진/JSON 경로는 새 03(ARCHITECTURE)에 존재 |
| `06_ABAP_CURRICULUM.md` | (보관) | Track 2 로드맵은 단일 목표에서 제외 |
| `07_DECISIONS_AND_ROADMAP.md` | (보관) | 대부분 완료. 살아있는 `.stage7-*` de-naming만 새 05(PITFALLS)로 1줄 이관 |
| `08_DEV_DIARY.md` | (보관) | `plans/` + git이 대체 |
| `99_AI_WORK_LOG.md` | (보관) | `plans/` RESULTS + git log가 대체 |
| `HANDOFF_LESSON_CONTENT.md` | (보관) | 구(텍스트 위주) 양산 인계서 — 전면 백지화 대상 |
| `TRACK1_QUALITY_PLAN.md` | (보관) | v3 리빌딩 계획이 `plans/`에서 대체 |
| `changelogs/*` (7개) | (보관) | 옛 번호 참조 그대로, 역사 기록 |
| `진행계획/<GUID>/*` | (보관) | `plans/YYYYMM/...` 체계로 대체 |
| _(신규)_ `02_PROGRESS.md` | 새로 생성 | 목표 진행·claim 보드(archive 원본 없음) |

## 규칙
- 이 폴더의 파일은 **읽기 전용**. 수정 금지(git이 영구 이력 SSOT).
- 과거 맥락이 필요하면 여기를 열되, "현재" 기준은 항상 새 `.project-docs`를 본다.
