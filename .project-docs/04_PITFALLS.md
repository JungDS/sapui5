# 04. 함정과 주의점

> 📅 **최종수정: 2026-06-10 10:05 KST**

## 🔴 깨지기 쉬운 지점
- **[P1] 상대경로 오산정** — `docs/**/*.html`는 `../../`로 asset을 참조해야 한다. 틀리면 셸 전체 미동작.
  (page-type별 경로 표 → [02](02_ARCHITECTURE.md))
- **[P2] `data-doc-id` ↔ `DOCS` 키 불일치** — 이전/다음 내비가 끊긴다. 신규 문서 시 1순위 확인.
- **[P3] 섹션 `id` 누락** — ScrollSpy/TOC가 비어 보인다. `section[id]`·`h2/h3[id]` 필수.
- **[P4] archive 파일 수정** — 버전 이력 파괴. archive는 읽기 전용. 수정은 항상 운영본을 먼저 archive 후.

## 🟠 데이터 동기화 함정
- **[P5] 문서 목록 다중 관리** — SSOT는 `assets/shell.js`의 `DOCS`. 그러나
  `data/site-map.json`·`document-catalog.json`은 **수동 동기화**라 어긋나기 쉽다.
  `document_count` 같은 수치는 신뢰 전 `DOCS`(preparing 제외)로 재확인.
- **[P6] data JSON 참조 착시** — `data/`의 audit류 JSON은 런타임에서 `.json`으로 fetch되지 **않는다**.
  `common.js`/`shell.js`/`pages/reference.html`에 보이는 `final-audit-report` 등은
  **`archive/v3/99-reference/*.html` 문서 링크**(`DOCS` 항목)일 뿐, data JSON과 무관하다.
  → 이 사실 확인 후 audit JSON 6종은 `archive/data/20260605/`로 이동 완료.
- **[P7] 커리큘럼 데이터 출처 혼동** — 커리큘럼 엔진은 `data/`가 아니라
  `reference/abap_curriculum_v5_3_20260602_010000.json`을 fetch한다. `tools/build-*.mjs`도 `reference/`를 읽는다.

## 🟡 자산↔샘플 연쇄 의존
- **[P8] 샘플 정리 시 asset 연쇄** — `assets/abap-curriculum-codex-v1~v6.*`,
  `abap-curriculum-explorer.*`, `codex-samples.*`는 **오직 `docs/roadmap`의 orphan 샘플 HTML만** 참조한다.
  해당 샘플을 archive로 옮기면 그 asset도 미사용이 된다. 샘플과 asset은 **한 묶음으로** 정리해야 한다.
  (현 시점 완전 미사용 asset은 0개 — 상세 → [05](05_INVENTORIES.md))

## ⚪ 기타
- **[P9] 용어 모달 인코딩** — `assets/common.js`의 용어 정의 데이터에 한글 깨짐(mojibake) 흔적 존재.
  과거 `[object Object]` 표시 버그 이력 있음. 용어 모달 수정 시 인코딩 확인.
- **[P10] "stage7" 명칭** — 파일명·JS 전역은 정리 완료(`shell.*`, `SAPShell`). **CSS 클래스 `.stage7-*`만 잔존**
  (커리큘럼 샘플 asset과 얽혀 다음 라운드로 보류). project-docs·data 파일명·prose의 "Stage 7"은 역사 기록으로 유지(→07).

## 🔴 멀티 AI 동시 작업 (가장 크게 겪은 함정)
- **[P11] 같은 브랜치를 두 AI가 동시 커밋 → 분기·충돌** — Claude·Codex·Antigravity(Gemini)가 같은 작업트리/브랜치(`feature/abap-lesson-content`)를 동시에 커밋·푸시하면서
  **동일 커밋이 다른 해시로 중복**(예: THEORY-18이 `4cb7b45`와 `eb7c7fc`로 이중) 생성 → rebase 시 **~90개 Lesson 파일이 전부 충돌**한 사고가 있었음(2026-06-10).
  - **원인**: `git add -A`로 타 AI의 미커밋 파일까지 휩쓸어 커밋, 서로 다른 베이스에서 같은 서식 작업을 중복 적용.
  - **회피 규칙(→[03 §9](03_CONVENTIONS.md))**: ① **한 번에 한 AI만** 커밋·푸시 ② 작업 시작·푸시 직전 `git pull` ③ 내 파일만 명시적 `git add`(`-A` 금지) ④ 범위 분리(예: A=서식, B=신규 Lesson).
  - **충돌 복구**: 서식 커밋을 cherry-pick으로 병합하면 대규모 충돌 → `reset --hard origin` + 문서 커밋만 cherry-pick + **멱등 포맷터 재실행**으로 결과물을 재생성하는 편이 안전.
- **[P12] 신규 Lesson 코드블록 서식 누락 위험** — 다른 AI가 신규 레슨 작성 시 HTML 본문에는 순수 `<pre><code>`로만 작성해야 함. 작업 마지막에 네이비 ABAP Editor 멱등 포맷터(`archive/_local/format_abap_code.mjs`)를 1회 돌려 서식을 통일해야 함.
  - **CSS 리팩토링 완료**: 포맷터는 더 이상 인라인 스타일(`style="..."`)을 하드코딩하지 않고, `assets/abap-lesson-viewer.css`에 정의된 공통 클래스를 삽입함. 따라서 신규 레슨 파일에는 임의로 인라인 스타일을 주입하지 말 것.
- **[P13] 로컬 Fetch 캐시 주의 (신규)** — 순수 HTML/JS 환경에서 `fetch()` API로 `lesson-content/*.html` 조각을 동적으로 불러올 때, 브라우저 로컬 캐시가 강력하게 작용하여 새로고침을 해도 옛날 파일이 보일 수 있음.
  - `lesson-viewer.js` 등 동적 로딩 스크립트 작성 시 `fetch(url + '?v=' + Date.now())`와 같은 **Cache Buster** 파라미터를 붙이는 것을 권장함.
