# 01 · 프로젝트 전체 구조 분석

> **분석 기준**: 2026-05-29 main 브랜치 기준  
> **분석자**: Antigravity (AI)  
> **요약**: Stage 7 리팩토링 및 Phase 1~4 IT 용어 Dual-Tab 고도화 완료. `reference/` 원본 파일 아카이브 처리 프로세스 추가.

---

## 1. 프로젝트 개요

**SAP Developer Learning Library**는 SAP 개발자를 위한 HTML 기반 학습 자료 정적 사이트입니다.  
GitHub Pages로 배포되며, 별도 빌드 도구 없이 순수 HTML/CSS/JS만 사용합니다.

- **저장소**: https://github.com/JungDS/sapui5
- **배포 URL**: https://jungds.github.io/sapui5/
- **현재 단계**: Stage 7 완료 (v5.0 전체 개정 및 메타데이터 정비 완료)

---

## 2. 전체 디렉토리 구조 (운영 기준)

```
sapui5/
├── index.html                  ← 홈 화면 (data-page-type="home")
├── README.md                   ← 짧은 운영 대시보드 (자주 업데이트)
├── README_ALL.md               ← 상세 운영 문서 (전체 기준/이력 보관)
│
├── pages/                      ← 영역별 Landing Page (6개)
│   ├── roadmap.html
│   ├── abap.html
│   ├── ui5-fiori.html
│   ├── module-basics.html
│   ├── integrated-practice.html
│   └── reference.html
│
├── docs/                       ← 최신 운영 문서 (Stage 7 전환 완료)
│   ├── roadmap/                (3개 문서)
│   ├── abap/                   (8개 문서)
│   ├── ui5/                    (7개 문서)
│   ├── module/                 (13개 문서)
│   ├── practice/               (2개 문서)
│   ├── reference/              (2개 문서)
│   └── pull_request_template.md
│
├── assets/                     ← 공통 CSS/JS
│   ├── common.css              ← 전역 스타일 (Stage 5 기준)
│   ├── common.js               ← 전역 JS (용어 모달, 코드복사, 검색트리 등)
│   ├── stage7-home.css         ← 홈 전용 CSS (초기 분리본 - 미사용)
│   ├── stage7-home2.css        ← 홈 전용 CSS (현재 index.html이 사용)
│   ├── stage7-shell.css        ← Stage 7 공통 Shell CSS
│   └── stage7-shell.js         ← Stage 7 공통 Shell JS (핵심 로직)
│
├── data/                       ← 문서 메타데이터 JSON
│   ├── site-map.json           ← 전체 사이트 맵
│   ├── document-catalog.json   ← 전체 문서 카탈로그
│   ├── stage7-operating-docs-map.json ← 운영 문서 경로 매핑
│   ├── stage7-abap-catalog-update-targets.json
│   └── (감사/참고용 JSON 4개)
│
├── reference/                  ← 새롭게 적용할 원본/초안 학습 자료 (분석/적용 후 archive/로 이동)
│
├── sample/                     ← 로컬 참고 샘플
│   ├── README.txt
│   └── gateway-navigation-efficient-header-sample-v2.html
│
├── archive/                    ← 보존 전용 (수정 금지)
│   ├── v1/                     ← legacy v1 문서 이동 보존
│   ├── v2/                     ← legacy v2 문서 이동 보존
│   ├── v3/                     ← v3 원본 보존 (수정 전 운영본)
│   └── docs/                   ← 운영 문서 수정 전 이력 보관
│
├── tools/                      ← 유틸리티 스크립트 (Node.js .mjs)
│   ├── cleanse-docs.mjs
│   ├── refactor-paths-and-links.mjs
│   └── stage7-update-abap-catalog-paths.mjs
│
├── handoff/                    ← 인수인계 문서
│   └── stage7_codex_handoff_after_pr35.md
│
└── .project-docs/              ← 프로젝트 분석/규칙 문서 (이 폴더)
```

---

## 3. 핵심 아키텍처 분석

### 3.1 페이지 계층 구조

```
index.html (home)
  └── pages/*.html (landing)
        └── docs/**/*.html (doc)
```

페이지 타입은 `<body data-page-type="...">` 으로 구분한다:
- `home`: `index.html` 전용
- `landing`: `pages/` 하위 6개 Landing Page
- `doc`: `docs/` 하위 모든 학습 문서

### 3.2 공통 Shell 구조

**두 레이어의 CSS/JS가 함께 로딩된다:**

```html
<!-- 레이어 1: Stage 5 기준 공통 (기존 기능 유지) -->
<link rel="stylesheet" href="[prefix]assets/common.css" />
<script src="[prefix]assets/common.js" defer></script>

<!-- 레이어 2: Stage 7 Shell (새로운 기능 opt-in) -->
<link rel="stylesheet" href="[prefix]assets/stage7-shell.css" />
<script src="[prefix]assets/stage7-shell.js" defer></script>
```

- `common.js`: 용어 모달(termDefinitions), 코드 복사 버튼, 연습 인터랙션, Nav Tree 렌더링
- `stage7-shell.js`: Topbar 렌더링, 우측 Side Nav(문서목차+학습경로), Scroll Spy, 이전/다음 버튼
- Stage 7 Shell은 `body[data-page-type]`이 있어야만 동작한다.

### 3.3 문서 관리 데이터 흐름

```
data/stage7-operating-docs-map.json  ← 운영 문서 경로 마스터 데이터
data/site-map.json                   ← 전체 사이트 구조
data/document-catalog.json           ← 전체 문서 카탈로그 (검색용)
        ↓
assets/stage7-shell.js (DOCS 상수)   ← JS 내부 문서 목록 (하드코딩)
assets/common.js (NAV_DOCS, NAV_PATHS 상수) ← Nav Tree 데이터 (하드코딩)
```

> ⚠️ **문제점**: 운영 문서 목록이 JSON 파일과 JS 파일에 이중으로 관리된다. 새 문서를 추가하면 JSON + stage7-shell.js DOCS 상수 + common.js NAV_DOCS/NAV_PATHS를 모두 수정해야 한다.

### 3.4 상대 경로 계산 방식

`stage7-shell.js`와 `common.js`는 현재 URL의 경로 패턴을 감지해 루트 prefix를 계산한다:

| 현재 페이지 위치 | rootPrefix |
|---|---|
| `index.html` (루트) | `./` |
| `pages/*.html` | `../` |
| `docs/**/*.html` | `../../` |
| `archive/**/*.html` | `../../../` |

이 방식으로 절대 URL 없이 모든 링크가 동작한다.

### 3.5 전체 문서 현황 (2026-05-29 기준)

| 영역 | 운영 문서 수 | 준비 중 |
|---|---|---|
| 로드맵 | 3 | 2 |
| ABAP 개발 | 8 | 13+ |
| UI5/Fiori | 7 | 18+ |
| SAP 모듈 기초 | 13 | 3 |
| 통합 실습 | 2 | 2 |
| Reference | 2 | 2 |
| **합계** | **35** | **40+** |

---

## 4. 발견된 이슈 및 개선 포인트

### [이슈 1] assets/stage7-home.css vs stage7-home2.css 중복

- `stage7-home.css` (7.3KB): PR #26에서 inline CSS 분리 목적으로 생성
- `stage7-home2.css` (11.5KB): 현재 `index.html`이 실제로 사용하는 파일
- **문제**: `stage7-home.css`는 현재 미사용 상태로 혼란을 준다.
- **권장**: `stage7-home.css` 삭제 또는 `index.html`이 사용하는 파일로 이름 통일 필요

### [이슈 2] pages/abap.html의 인라인 `<style>` 블록

- `pages/abap.html` 상단에 약 100줄짜리 inline CSS가 있다 (아코디언 스타일).
- 다른 `pages/*.html` 파일들과 일관성이 없다.
- **권장**: 아코디언 스타일을 `stage7-shell.css` 또는 별도 `pages-landing.css`로 분리

### [이슈 3] pages/abap.html의 인라인 `<script>` 블록

- 검색어 입력 시 아코디언 자동 열기 로직이 HTML 내부 `<script>` 태그로 존재한다.
- **권장**: `common.js` 또는 `stage7-shell.js`에 통합

### [이슈 4] 문서 목록의 이중 관리 (JS 하드코딩 + JSON)

- `stage7-shell.js`의 `DOCS` 상수와 `common.js`의 `NAV_DOCS`/`NAV_PATHS`가 동일한 정보를 중복으로 가지고 있다.
- 새 문서 추가 시 수정 대상: `stage7-shell.js`, `common.js`, `data/site-map.json`, `data/document-catalog.json`, `data/stage7-operating-docs-map.json`
- **권장**: 장기적으로 JSON 파일을 SSOT(Single Source of Truth)로 삼고 JS에서 동적 로딩하는 방식 검토

### [이슈 5] index.html 내부 인라인 `<script>` 블록

- `index.html` 하단에 검색 기능 및 해시태그 필터 스크립트가 인라인으로 존재한다.
- **권장**: `stage7-home2.css`처럼 별도 `stage7-home.js`로 분리

### [이슈 6] docs/module/*.html 파일 크기가 균일하게 작음 (5.2~5.4KB)

- module 영역 13개 문서가 모두 거의 동일한 크기(5.2~5.4KB)다.
- 내용이 얕을 가능성이 높다. 향후 교재형 본문 보강 필요.

### [이슈 7] data-distributor가 일부 파일에 남아 있을 수 있음

- `README_ALL.md`에 따르면 v5.0에서 전역 클렌징 완료라고 하지만,
  `stage7-shell.js`의 `buildTopbar()`에서 여전히 `meta.distributor`를 읽어 Header에 표시한다.
- `docs/` 문서들에는 `data-distributor` 속성이 제거되어 있고 JS에서 기본값 `"정훈영"`을 사용한다.

### [이슈 8] sample/ 폴더의 활용 기준 불명확

- `sample/README.txt`에 활용 기준이 있어야 하지만, 1개 파일만 있고 관계가 불명확.
- `sample/gateway-navigation-efficient-header-sample-v2.html`이 현재 운영 문서에 어떤 영향을 주는지 명시 필요.

---

## 5. 긍정적으로 잘 구성된 부분

- ✅ docs/ 경로로 운영 문서 일원화 완료 (v3/ 경로 사용 종료)
- ✅ archive/ 계층을 통한 이전 버전 보존 체계 확립
- ✅ data-page-type 기반 Shell 자동 적용 (opt-in 방식)
- ✅ LEARNING_PATHS 기반 이전/다음 문서 자동 연결
- ✅ ScrollSpy를 통한 문서내 위치 표시
- ✅ 준비중(preparing) 문서를 데이터에서 관리하고 UI에서 자동 처리
- ✅ 상대경로 기반 URL 계산으로 GitHub Pages 배포 자동 호환
- ✅ data-prose 속성 기반 문체 구조화 시스템 (prose governance)
- ✅ IT 용어 Dual-Tab(초급/상세) 팝업 모달 적용 완료 (Phase 1~4 문서 태깅 완료)
- ✅ `reference/` 폴더 기반 신규 자료 유입 프로세스 및 자동 아카이브화 구축

---

_분석일: 2026-05-29 · main 브랜치 기준_
