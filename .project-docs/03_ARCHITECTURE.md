# 03. ARCHITECTURE — 폴더 역할 · 상대경로 · 셸 SSOT

> 📅 **최종수정: 2026-06-19 23:30 KST**
> 🎯 **목적:** 저장소 구조와 셸 동작 원리. "무엇이 어디에 있고, 어디에 두는가".
> 📖 **읽을 때:** 파일 위치/경로/내비게이션이 헷갈릴 때, 새 파일을 만들기 전.
> ⚡ **TL;DR:**
> - 빌드 없는 **정적 사이트**(순수 HTML + 공유 CSS/JS, GitHub Pages). 언어 한국어, 기준 S/4HANA + SAP GUI 800.
> - 내비게이션 **SSOT는 `assets/shell.js`의 `DOCS`**. `data/*.json`은 수동 동기화 보조본.
> - **Lesson 단일 뷰어**는 `DOCS`에 없다 — `?lesson=<ID>`로 `lesson-content/<ID>.html`을 자체 엔진이 조립.

## 정체성
- **SAP Developer Learning Library** — SAP 개발자(ABAP / UI5·Fiori)용 HTML 학습자료 저장소.
- 저장소 https://github.com/JungDS/sapui5 · 배포 https://jungds.github.io/sapui5/

## 폴더 역할

| 폴더/파일 | 역할 | 비고 |
|---|---|---|
| `index.html` | 홈 (page-type `home`) | 루트 최소 관리 |
| `README.md` | 짧은 운영 대시보드 + 링크 | 루트 최소 관리 |
| `.project-docs/` | **AI 부팅 컨텍스트 문서**(이 세트) | 최신본만, 린하게 |
| `pages/` | 6개 영역 랜딩 (page-type `landing`) | index↔docs 중계 |
| `docs/` | 운영 콘텐츠 본문 (page-type `doc`) | roadmap/abap/ui5/module/practice/reference |
| `docs/abap/lesson-content/` | Lesson 단일 뷰어용 본문 조각(`<ID>.html`) | 뼈대 없는 순수 콘텐츠 |
| `assets/` | 공유 CSS/JS + images | 셸·공통 유틸·영역별 엔진 |
| `data/` | 내비 카탈로그·이력 JSON (+ `*.md` 설명) | 운영 3종만 |
| `reference/` | 커리큘럼 JSON·글로서리·디자인 토큰 | 런타임 fetch 대상 |
| `sample/` | 개발용 샘플/프로토타입 | 샘플 선택은 [06](06_LEARNING_METHODS.md), 외부 경로·v4 정책은 [09](09_SAMPLE_LIBRARY.md) |
| `tools/` | 생성·일괄수정 스크립트 — 재사용 빌드/포맷(`.mjs`) + 일회성 정리(`.py`) | **완료된 일회성은 `archive/tools/<날짜>/`로** (언어 아닌 수명주기로 분리) |
| `archive/` | 수정 전 원본·legacy·구 문서 보존 | **읽기 전용, 수정 금지** |

> 분석 대상 제외: `archive/`(보존본), `.claude/`(워크트리).

## 상대경로 규칙 (깨지면 셸 전체 미동작 → [05 P1](05_PITFALLS.md))

| 위치 | assets/index/pages 접근 | 예 |
|---|---|---|
| `index.html` (루트) | `./` | `./assets/common.css` |
| `pages/*.html` | `../` | `../assets/common.css` |
| `docs/**/*.html` | `../../` | `../../assets/common.css` |
| `archive/docs/**` | 보존본, 수정 금지 | — |

## 셸(Shell) 동작 원리
- **Opt-in**: `body[data-page-type]`가 있을 때만 `shell.js`가 헤더·우측 내비·ScrollSpy·이전/다음을 렌더.
- **page type**: `home`(도메인 ID+링크) / `landing`(홈+카테고리 내비) / `doc`(홈+이전/다음+카테고리).
- **문서 SSOT = `assets/shell.js`**:
  - `DOCS`: 문서 id → {title, category, href, group, preparing?, legacyHref?, aliases?}
  - `LEARNING_PATHS`: 영역별 학습 순서(문서 id 배열) · `CATEGORY_HOME`: 영역→랜딩
  - 접근: `window.SAPShell.docs`
- **보조 데이터**: `data/site-map.json`·`document-catalog.json`은 **수동 동기화** 보조 카탈로그. `data/stage7-operating-docs-map.json`은 v3→docs 마이그레이션 이력. (동기화 함정 → [05 P5](05_PITFALLS.md))
- **준비 중 문서**: `DOCS`의 `preparing: true` → 링크 비활성 + "준비 중" 배지.
- **ScrollSpy/TOC**: 본문 `section[id]`(또는 h2/h3 id)로 목차 생성 → **id 필수**.

## Lesson 단일 뷰어 (현 목표의 무대)
- `docs/abap/lesson-viewer.html`은 **`DOCS`에 등록하지 않는다**(템플릿 성격, [05 P14](05_PITFALLS.md)).
- URL `?lesson=<ID>` → `docs/abap/lesson-content/<ID>.html` 본문 조각을 로드. 이전/다음·목차는 셸이 아니라 `assets/abap-lesson-viewer.js`가 커리큘럼 JSON을 읽어 동적 렌더.
- 새 Lesson 추가 = HTML 뼈대 불필요. 운영 `lesson-content/<JSON_ID>.html`에는 **순수 콘텐츠만** 둔다(`<script>`/`<style>`/인라인 style 금지 → 공통 자산으로). `sample/`·v4 실험 파일은 이 제약의 예외다.

## 관련 엔진 / 데이터 (assets · reference)
- `abap-lesson-viewer.js/css` — **Lesson 단일 뷰어 엔진**. 브레드크럼·사이드바·Pager 동적 생성.
- `abap-glossary.js/css` — 용어 툴팁. `data-glossary` 스캔 → `reference/abap_glossary.json` fetch, 호버 팝업 + 클릭 고정/복사. 구 `common.js`의 `data-term` 모달과 **별도 네임스페이스**([05 P9](05_PITFALLS.md)).
- 커리큘럼 엔진(`abap-curriculum-*`)은 `reference/abap_curriculum_v5_4_20260605_000000.json`을 fetch. v5.4 이전 커리큘럼 파일은 archive 보존본이며 사용하지 않는다.
- 디자인 토큰: `reference/design_variants.json`(SSOT). 운영 Lesson에는 공통 CSS/JS로 이식하고, 샘플/v4 실험 단계에서는 빠른 검토를 위해 standalone 구조를 허용한다.
