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
- **[P9] 용어 모달 인코딩** — `assets/common.js`의 용어 정의 데이터에 한글 깨짐(mojibake) 흔적 존재.
  과거 `[object Object]` 표시 버그 이력 있음. 용어 모달 수정 시 인코딩 확인.
- **[P10] "stage7" 명칭** — 파일명·JS 전역은 정리 완료(`shell.*`, `SAPShell`). **CSS 클래스 `.stage7-*`만 잔존**
  (커리큘럼 샘플 asset과 얽혀 다음 라운드로 보류). project-docs·data 파일명·prose의 "Stage 7"은 역사 기록으로 유지(→07).
