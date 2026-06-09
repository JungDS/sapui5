# 05. 인벤토리 (증거 기반)

2026-06-05 재분석 + **2026-06-09 lesson-viewer 반영** 시점의 실제 참조 검색 결과. 이후 변경 시 갱신한다.

## A. asset 의존 맵 (assets/*.css·js)
비-archive HTML 기준 참조. **완전 미사용 asset은 0개**(모두 최소 1개 HTML이 참조).

| asset | 참조 수 | 참조처 / 메모 |
|---|---|---|
| `common.css` / `common.js` | 다수(사이트 전역) | 모든 운영 페이지 공통 |
| `shell.css` / `shell.js` | 다수(셸 페이지 전역) | page-type 셸 + 문서 SSOT |
| `home.css` | 1 | `index.html` 전용 |
| `abap-curriculum.css` / `.js` | 1 | `docs/roadmap/abap-curriculum.html` 운영본 전용 |
| `metro-process.css` / `.js` | 2 | `docs/module/erp-business-process-metro.html`, `docs/roadmap/abap-curriculum-v5-3-antigravity.html` |
| `abap-curriculum-section-detail.*` | 1 | `docs/roadmap/abap-curriculum-section-detail.html` |
| `abap-lesson-viewer.css` / `.js` | 1 | `docs/abap/lesson-viewer.html` (2026-06-08 신규 단일 뷰어 엔진) |
| `abap-glossary.css` / `.js` | 1 | `docs/abap/lesson-viewer.html` (2026-06-08 신규 `data-glossary` 툴팁) |
| `abap-curriculum-v5-3.*` | 1 | `docs/roadmap/abap-curriculum-codex-20260602-113746.html` |
| `abap-curriculum-codex-v7.*` | 2 | codex v7 sampleA, v8 sampleA |
| `abap-curriculum-codex-v8.*` | 1 | codex v8 sampleA (v7 위 오버레이) |
| `abap-curriculum-codex-v2~v6.*` | 1~3 each | **오직 같은 버전 codex 샘플 HTML만** 참조 |
| `abap-curriculum-codex-samples.*` | 3 | codex v1 sample1~3 |
| `abap-curriculum-explorer.*` | 5 | claude v1 sample1~4, v2 sample1 |
| `assets/images/erp-metro.png` | 1 | `docs/module/erp-business-process-metro.html` |

> **연쇄 의존**: codex-v1~v6·explorer·codex-samples는 전부 `docs/roadmap` orphan 샘플 전용.
> 샘플을 정리하면 동시에 미사용 전환 → 샘플+asset을 한 묶음으로 정리해야 함(다음 라운드).

## B. data/ JSON 카탈로그

| 파일 | 상태 | 비고 |
|---|---|---|
| `site-map.json` | **운영 유지** | 내비 카탈로그(보조). `*.json.md` 작성 |
| `document-catalog.json` | **운영 유지** | 문서 카탈로그(보조). `*.json.md` 작성 |
| `stage7-operating-docs-map.json` | **운영 유지** | v3→docs 마이그레이션 이력. `*.json.md` 작성 |
| `clean-rebuild-audit.json` | → archive | 런타임 `.json` 참조 0건 |
| `final-audit-report.json` | → archive | 런타임 `.json` 참조 0건(동명 HTML은 별개) |
| `prose-audit-report.json` | → archive | 런타임 `.json` 참조 0건 |
| `stage5-navigation-audit.json` | → archive | 런타임 `.json` 참조 0건 |
| `stage7-abap-catalog-update-targets.json` | → archive | 런타임 `.json` 참조 0건 |
| `v3-folder-structure-audit.json` | → archive | 런타임 `.json` 참조 0건 |

> audit 6종은 `archive/data/20260605/`로 이동 완료. 검증 근거 → [04 P6](04_PITFALLS.md).

## C. tools/ 인벤토리

| 파일 | 상태 | 근거 |
|---|---|---|
| `build-abap-curriculum.mjs` | **유지** | `reference/abap_curriculum_20260529_180000.json`로 커리큘럼 생성(활성 영역) |
| `build-curriculum-samples.mjs` | **유지** | `reference/abap_curriculum_v5_3_...json`로 샘플 생성(활성 영역) |
| `cleanse-docs.mjs` | → archive | 일회성 문서 클렌징(완료) |
| `refactor-paths-and-links.mjs` | → archive | 일회성 경로/링크 리팩토링(완료) |
| `stage7-update-abap-catalog-paths.mjs` | → archive | Stage 7 카탈로그 경로 갱신(완료) |

> 완료 3종은 `archive/tools/20260605/`로 이동 완료. 필요 시 git/archive에서 복원 가능.

## D. docs/roadmap ABAP 커리큘럼 샘플 계보 (인벤토리만, archive 보류)
운영본 `docs/roadmap/abap-curriculum.html`은 `pages/roadmap.html`과 `assets/shell.js`에 등록했다.
아래 샘플은 **index/pages에서 링크되지 않는 orphan**(직접 URL 또는 section-detail 구 이력으로만 도달).

| 패밀리 | 항목 | 최신/후보 |
|---|---|---|
| **codex** | v1 sample1~3, v2 sample1~3, v3~v5 sample1, v6 sampleA~C, v7 sampleA, **v8 sampleA** | **v8 sampleA = 사실상 최신 후보** (section-detail이 링크) |
| **claude** | base, v1 sample1~4, v2 sample1 | v2 sample1 (explorer 엔진, 대용량 inline data) |
| **antigravity** | base, v7 sampleA~C, v8 sampleD | v8 sampleD |
| **v5-3** | antigravity / claude / codex 3종 | 안정 표시본(별도 라인) |
| 특수 | `abap-curriculum-section-detail.html`(Chapter 상세), `abap-curriculum-data.js`(로컬 데이터) | 유지 |

> 정리 제안(패밀리별 최신만 유지)은 [07](07_DECISIONS_AND_ROADMAP.md)에 제안서로 기록. 본 라운드 미실행.

### orphan / 신규 (2026-06-08~)
- `docs/roadmap/_abap-curriculum-gallery.html` — **어디서도 링크되지 않는 orphan**(임시 샘플 갤러리, 커밋 `b0256bb`). archive 또는 삭제 후보.
- `docs/abap/lesson-viewer.html` — Lesson 단일 뷰어 템플릿(SSOT 미등록, [04 P11](04_PITFALLS.md)).
- `docs/abap/lesson-content/THEORY-01-M01.html` — **현재 유일한 Lesson 콘텐츠 조각**(나머지 미작성).

## E. reference/ ABAP 커리큘럼 JSON

| 파일 | 상태 | 비고 |
|---|---|---|
| `abap_curriculum_v5_4_20260605_000000.json` | **운영 유지** | 운영본 fetch 대상. `learning_friendly.handled_contents.ko` 추가 |
| `abap_curriculum_v5_3_20260602_010000.json` | 유지 | 샘플/비교 원본, v5.4의 기반 |
| `abap_curriculum_v5_3.md`, `TRACK1/` | 유지 | 커리큘럼 설계 참고자료 |
| `abap_glossary.json` | **운영 유지** | Lesson 뷰어 용어 툴팁 원천(~35개 용어). `abap-glossary.js`가 fetch (2026-06-08 신규) |
| `abap_curriculum_20260529_180000.json` | 유지 | `tools/build-abap-curriculum.mjs` 입력 원본 |
