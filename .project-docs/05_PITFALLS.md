# 05. PITFALLS — 자주 깨지는 함정

> 📅 **최종수정: 2026-06-20 02:28 KST**
> 🎯 **목적:** 실제로 크게 데었던 지점만 모음. 안정 ID(P1~)로 참조.
> 📖 **읽을 때:** 작업 중 막혔을 때, 구조 변경/멀티-AI 작업 전.
> ⚡ **TL;DR:**
> - 가장 크게 데인 것 → **P11 멀티-AI 동시 커밋 충돌**. 같은 Lesson/공통 파일을 동시에 건드리지 않는다.
> - 셸이 안 뜨면 → **P1 상대경로**, 내비가 끊기면 → **P2 doc-id 불일치**.
> - Lesson 뷰어는 `DOCS`에 **없다**(P14). 새 용어는 `data-glossary`(P9).

## 🔴 깨지기 쉬운 지점
- **P1 상대경로 오산정** — `docs/**/*.html`는 `../../`로 asset 참조. 틀리면 셸 전체 미동작. (경로표 → [03](03_ARCHITECTURE.md))
- **P2 `data-doc-id` ↔ `DOCS` 키 불일치** — 이전/다음 내비가 끊긴다. 신규 문서 1순위 확인.
- **P3 섹션 `id` 누락** — ScrollSpy/TOC가 빈다. `section[id]`·`h2/h3[id]` 필수.
- **P4 archive 파일 수정** — 버전 이력 파괴. archive는 읽기 전용([04 R4](04_CONVENTIONS.md)).

## 🟠 데이터 동기화
- **P5 문서 목록 다중 관리** — SSOT는 `assets/shell.js`의 `DOCS`. `data/site-map.json`·`document-catalog.json`은 수동 동기화라 어긋나기 쉽다. `document_count` 등 수치는 신뢰 전 `DOCS`(preparing 제외)로 재확인.
- **P6 data JSON 참조 착시** — `data/`의 audit류 JSON은 런타임 fetch 대상이 **아니다**. `common.js`/`shell.js`에 보이는 `final-audit-report` 등은 문서 링크(`DOCS` 항목)일 뿐.
- **P7 커리큘럼 데이터 출처** — 커리큘럼 엔진은 `data/`가 아니라 `reference/abap_curriculum_v5_4_20260605_000000.json`을 fetch. `tools/build-*.mjs`도 v5.4 파일을 읽는다. v5.4 이전 커리큘럼 파일은 archive 보존본이며 사용하지 않는다.

## ⚪ 자산·용어
- **P8 샘플 정리 시 asset 연쇄** — `assets/abap-curriculum-codex-v*`·`explorer`·`codex-samples`는 `docs/roadmap`의 orphan 샘플 HTML만 참조. 샘플을 archive로 옮기면 그 asset도 미사용 → **한 묶음으로** 정리.
- **P9 용어 시스템 2종 병존** — 구: `assets/common.js`의 `data-term`(무거운 모달, 과거 mojibake/`[object Object]` 이력). 신: `assets/abap-glossary.js`의 `data-glossary`(가벼운 호버 툴팁, `reference/abap_glossary.json`). ✅ **신규 태깅은 반드시 `data-glossary`.** 두 시스템은 의도적으로 분리됨.
- **P10 "stage7" 명칭 잔존** — 파일명·JS 전역은 정리 완료(`shell.*`, `SAPShell`). **CSS 클래스 `.stage7-*`만 잔존**(커리큘럼 샘플 asset과 얽혀 디자인 확정 라운드로 보류). ⚠️ [04 R3](04_CONVENTIONS.md) footer가 `.stage7-footer`를 쓰므로 de-naming 시 footer 클래스도 함께 처리. data 파일명·prose의 "Stage 7"은 역사 기록으로 유지.

## 🔴 멀티-AI 동시 작업 (가장 크게 겪은 함정)
- **P11 두 AI 동시 작업 → 충돌** — 여러 AI가 같은 작업 디렉토리에서 동시에 커밋해 **동일 커밋이 다른 해시로 중복**되고 ~90개 Lesson이 전부 충돌한 사고(2026-06-10). 원인: `git add -A`로 타 AI 미커밋 파일까지 휩쓸어 커밋.
  - ✅ 회피([04 R9](04_CONVENTIONS.md)): ① Lesson 작업은 시작 전 [02_PROGRESS](02_PROGRESS.md)에 claim ② 공통 파일은 충돌 가능 시 scope claim ③ 내 파일만 `git add`(`-A` 금지) ④ 일반 작업 중 **`git pull` 금지** ⑤ 범위 분리.
  - 복구: 로컬이 기준이므로 `git restore`/`git checkout <rev> -- <path>`로 로컬에서 되돌린 뒤 재작업한다.
- **P12 신규 Lesson 코드블록 서식** — 운영 Lesson 본문은 순수 `<pre><code>`로만. 작업 끝에 멱등 포맷터 `tools/format-abap-code.mjs` 1회 실행. 운영 Lesson의 임의 인라인 style 주입 금지([04 R5](04_CONVENTIONS.md)). `sample/`·v4 standalone 실험 파일은 예외.
- **P13 로컬 Fetch 캐시** — `fetch()`로 `lesson-content/*.html`을 불러올 때 브라우저 캐시가 강해 옛 파일이 보일 수 있음. 동적 로더는 `fetch(url + '?v=' + Date.now())` Cache Buster 권장.
- **P14 Lesson 뷰어는 SSOT 미등록 템플릿** — `docs/abap/lesson-viewer.html`은 `DOCS`에 **없다**(찾지 말 것). 라우팅은 `?lesson=<ID>` ↔ `lesson-content/<ID>.html` + 커리큘럼 JSON으로 자체 처리.
- **P15 신규 자산 헤더 누락** — 신규 `.css/.js/.mjs`는 [04 R1](04_CONVENTIONS.md)의 `최종수정 … HH:MM KST | v…` 헤더 필수. 기존 자산은 수정 시점에 부여/갱신.
- **P16 NotebookLM MCP 프로필 잠김** — `mcp__notebooklm__*`는 헤드리스 Chrome을 단일 `chrome_profile`로 띄우는데, Chromium 영구 프로필은 프로세스 1개만 열 수 있다. **두 번째 AI가 동시에 호출하면 잠김으로 즉시 실패**(`launchPersistentContext ... has been closed`)한다. ✅ 회피: **`nlm` CLI로 질의**(브라우저 미기동, RPC 직접 호출 → 동시 안전). 사용법·노트북 ID → [01 §도구](01_AI_SYNC.md).
- **P17 PR merge 후 로컬 기준점 혼동** — GitHub에서 PR을 merge하면 원격 `main`은 바뀌지만 로컬 작업 브랜치는 그대로다. 다음 작업을 이어가며 무심코 예전 브랜치에서 새 Lesson을 시작하면 PR diff가 섞인다. ✅ 회피: 사용자에게 merge 완료를 확인받은 뒤, working tree clean + active claim 없음 상태에서 `git switch main` 후 [04 R9](04_CONVENTIONS.md)의 fast-forward 동기화 예외를 사용한다. 충돌이 나면 동기화하지 않고 멈춘다.
