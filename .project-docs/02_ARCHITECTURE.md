# 02. 아키텍처 — 폴더 역할 · 파일 배치 · 셸 동작

> 📅 **최종수정: 2026-06-10 00:50 KST**

## 폴더 역할

| 폴더/파일 | 역할 | 비고 |
|---|---|---|
| `index.html` | 홈 (page-type `home`) | 루트 최소 관리 |
| `README.md` | 짧은 운영 대시보드 + 링크 | 루트 최소 관리 |
| `.project-docs/` | 분석·운영 기준 문서(본 문서 세트) | 최신본만 유지 |
| `pages/` | 6개 영역 랜딩 페이지 (page-type `landing`) | index↔docs 중계 |
| `docs/` | 운영 콘텐츠 본문 (page-type `doc`) | roadmap/abap/ui5/module/practice/reference |
| `assets/` | 공유 CSS/JS + images | 셸·공통 유틸·영역별 엔진 |
| `data/` | 내비 카탈로그·이력 JSON (+ `*.md` 설명) | 운영 3종만 유지 |
| `reference/` | 개발 참고 원천자료(커리큘럼 JSON, TRACK1) | 런타임 fetch 대상 |
| `sample/` | 개발용 샘플/프로토타입 | 위치 재정의 권고(→07) |
| `tools/` | Node 생성 스크립트 | 완료 스크립트는 archive |
| `archive/` | 수정 전 원본·legacy 보존 | **읽기 전용, 수정 금지** |

> 분석 대상에서 제외: `archive/`(보존본), `.claude`(워크트리).

## 파일 배치 규칙 (상대경로)
page-type별로 셸·asset 참조 깊이가 다르다. 깨지면 셸 전체가 동작하지 않으므로 핵심 규칙이다.

| 위치 | assets/index/pages 접근 | 예 |
|---|---|---|
| `index.html` (루트) | `./` | `./assets/common.css` |
| `pages/*.html` | `../` | `../assets/common.css` |
| `docs/**/*.html` | `../../` | `../../assets/common.css` |
| `archive/docs/**` | 보존본, 수정 금지 | — |

## 셸(Shell) 동작 원리
- **Opt-in**: `body[data-page-type]`가 있을 때만 `shell.js`가 헤더·우측 내비·ScrollSpy·이전/다음을 렌더.
- **page type**: `home`(도메인 ID+링크), `landing`(홈 아이콘+카테고리 내비), `doc`(홈+이전/다음+카테고리).
- **문서 SSOT**: `assets/shell.js`
  - `DOCS` : 문서 id → {title, category, href, group, preparing?, legacyHref?, aliases?}
  - `LEARNING_PATHS` : 영역별 학습 순서(문서 id 배열)
  - `CATEGORY_HOME` : 영역 → 랜딩 페이지
  - `window.SAPShell.docs`로 접근
- **데이터 보조본**: `data/site-map.json`, `data/document-catalog.json`은 보조 카탈로그로 **수동 동기화** 필요.
  `data/stage7-operating-docs-map.json`은 v3→docs 마이그레이션 이력.
- **준비 중 문서**: `DOCS`의 `preparing: true`면 링크 비활성 + "준비 중" 배지 자동 표시.
- **ScrollSpy/TOC**: 본문 `section[id]`(또는 h2/h3 id)로 목차를 생성하므로 **id가 필수**.

## 커리큘럼 엔진 (assets)
- `abap-curriculum-codex-v2~v8.js/css` : codex 계열 샘플 엔진(버전별). v7이 본체, v8은 전체화면·와이드 오버레이.
- `abap-curriculum-explorer.js/css` : claude 계열 공유 엔진.
- `abap-curriculum-section-detail.js/css` : Chapter 상세 페이지(`?section=`) 단일 템플릿.
- `abap-curriculum-v5-3.js/css`, `metro-process.js/css` : 특정 페이지 전용.
- 모든 커리큘럼 엔진은 `reference/abap_curriculum_v5_3_20260602_010000.json`을 fetch한다.
  (상세 의존 맵 → [05](05_INVENTORIES.md))
