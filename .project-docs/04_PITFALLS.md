# 04. 함정과 주의점

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
- **[P9] 용어 시스템 2종 병존** — 글로서리가 **두 갈래**다.
  - 구: `assets/common.js`의 `data-term` → 무거운 모달. 정의 데이터에 한글 깨짐(mojibake) + 과거 `[object Object]` 버그 이력.
  - 신(2026-06-08): `assets/abap-glossary.js`의 `data-glossary` → 가벼운 호버 툴팁(`reference/abap_glossary.json`, ~35개 용어).
  - **신규 용어 태깅은 반드시 `data-glossary`를 쓴다.** 두 시스템은 충돌을 피하려 의도적으로 분리됨(근거: `changelogs/CHANGELOG_20260608.md`). 구 모달 수정 시에만 인코딩 확인.
- **[P10] "stage7" 명칭** — 파일명·JS 전역은 정리 완료(`shell.*`, `SAPShell`). **CSS 클래스 `.stage7-*`만 잔존**
  (커리큘럼 샘플 asset과 얽혀 다음 라운드로 보류). project-docs·data 파일명·prose의 "Stage 7"은 역사 기록으로 유지(→07).
  ⚠️ `03_CONVENTIONS` footer 의무화가 `.stage7-footer`를 **신규 도입**해 [07 결정 1]의 `.stage7-*` 제거 방향과 상충 — de-naming 라운드에서 footer 클래스도 함께 처리.

- **[P11] Lesson 뷰어는 SSOT 미등록 템플릿** — `docs/abap/lesson-viewer.html`은 `shell.js` `DOCS`에 **없다**(`DOCS`에서 찾지 말 것).
  라우팅은 `?lesson=<ID>` ↔ `docs/abap/lesson-content/<ID>.html` + 커리큘럼 JSON으로 자체 처리. 현재 콘텐츠 조각은 `THEORY-01-M01` **1개뿐**(나머지는 미작성).
  새 Lesson 추가 시 HTML 뼈대 불필요 — `lesson-content/<JSON_ID>.html`에 순수 콘텐츠만 넣으면 뷰어가 조립.

- **[P12] 신규 자산 헤더 규칙 미적용** — `abap-glossary.*`, `abap-lesson-viewer.*`는 `03 §6`의 주석 헤더(`| 최종수정 … | v…`)를 따르지 않는다.
  asset 리네임/정리 라운드에서 헤더 부여 대상.
