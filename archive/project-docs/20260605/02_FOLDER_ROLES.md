# 02 · 폴더 및 파일 역할 가이드

> 이 파일은 각 폴더와 핵심 파일의 역할을 명확히 정리한 레퍼런스입니다.  
> 새로운 파일을 어디에 넣어야 할지 모를 때 이 파일을 먼저 확인하세요.

---

## 최상위 파일

| 파일 | 역할 | 수정 빈도 |
|---|---|---|
| `index.html` | 전체 학습자료 홈 화면. `data-page-type="home"`. 검색바, 통계, 학습 방향 카드, 추천 경로 포함 | 가끔 |
| `README.md` | 짧은 운영 대시보드. 현재 진행 단계, 주요 링크, 작업 상태 표만 유지 | 작업 완료 시 |
| `README_ALL.md` | 상세 운영 문서. 전체 기준, 이력, PR 상세, 컨벤션 포함 | 작업 완료 시 |

---

## pages/ — 영역별 Landing Page

**목적**: 학습 영역의 진입점. 해당 영역 문서 목록과 추천 경로를 제공한다.  
**page-type**: `landing`

| 파일 | 역할 |
|---|---|
| `roadmap.html` | 로드맵/학습전략 영역 진입 |
| `abap.html` | ABAP 개발 영역 진입 (아코디언 레이아웃, 트랙 A/B 구조) |
| `ui5-fiori.html` | UI5/Fiori 개발 영역 진입 |
| `module-basics.html` | SAP 모듈 기초 영역 진입 |
| `integrated-practice.html` | 통합 실습 영역 진입 |
| `reference.html` | Reference/운영 자료 영역 진입 |

**주의**:
- `pages/*.html`에서 `index.html` 링크 시: `../index.html`
- `pages/*.html`에서 `docs/` 링크 시: `../docs/abap/xxx.html`
- `pages/*.html`에서 `assets/` 참조 시: `../assets/xxx.css`

---

## docs/ — 최신 운영 문서

**목적**: 실제 학습 컨텐츠 HTML. 이곳에 있는 파일만이 "현재 운영본"이다.  
**page-type**: `doc`

```
docs/
├── roadmap/    ← 로드맵, 도구 소개, 디버깅 가이드
├── abap/       ← ABAP 개발 문서 (8개 운영중, 13+ 준비중)
├── ui5/        ← UI5/Fiori 개발 문서 (7개 운영중, 18+ 준비중)
├── module/     ← SAP 모듈 기초 문서 (13개)
├── practice/   ← 통합 실습 문서 (2개)
└── reference/  ← 용어사전, 문체 가이드 등
```

**주의**:
- `docs/**/*.html`에서 `index.html` 링크 시: `../../index.html`
- `docs/**/*.html`에서 `pages/` 링크 시: `../../pages/xxx.html`
- `docs/**/*.html`에서 `assets/` 참조 시: `../../assets/xxx.css`
- `docs/` 문서에 `pull_request_template.md`가 있지만 이것은 GitHub용 PR 템플릿이다 (실수 아님)

---

## assets/ — 공통 CSS/JS

| 파일 | 역할 | 사용처 |
|---|---|---|
| `common.css` | Stage 5 기준 전역 스타일 | 모든 페이지 |
| `common.js` | 용어 모달, 코드복사, 연습 인터랙션, **initLandingSearch**, prose audit | 모든 페이지 |
| `stage7-shell.css` | Stage 7 Topbar, Side Nav, 문서 레이아웃, **Landing 아코디언 공통 스타일** | `pages/`, `docs/` |
| `stage7-shell.js` | Topbar, Side Nav, ScrollSpy, 이전/다음. **DOCS·LEARNING_PATHS 단일 SSOT** | `pages/`, `docs/` |
| `home.css` | `index.html` 전용 홈 스타일 (유일한 홈 전용 예외 파일) | `index.html`만 |

> ⚠️ `stage7-home.css`는 v2026-05-29 기준으로 `archive/docs/assets/stage7-home_20260529_033344.css`로 이관됨. 운영 폴더에 더 이상 없음.

**CSS 로딩 순서 (docs/*.html 기준)**:
```html
<link rel="stylesheet" href="../../assets/common.css" />      <!-- 1순위: 기본 -->
<link rel="stylesheet" href="../../assets/stage7-shell.css" /> <!-- 2순위: Stage 7 덮어쓰기 -->
```

**CSS 로딩 순서 (index.html 기준)**:
```html
<link rel="stylesheet" href="./assets/common.css" />
<link rel="stylesheet" href="./assets/home.css" />  <!-- 홈 전용 -->
```

---

## data/ — 문서 메타데이터 JSON

| 파일 | 역할 | 상태 |
|---|---|---|
| `site-map.json` | 전체 사이트 URL 맵 (66KB) | 활성 관리 |
| `document-catalog.json` | 전체 문서 카탈로그 (카드 정보, 62KB) | 활성 관리 |
| `stage7-operating-docs-map.json` | Stage 7 전환 문서의 운영/legacy/archive 경로 매핑 (34KB) | 활성 관리 |
| `stage7-abap-catalog-update-targets.json` | ABAP 카탈로그 경로 갱신 대상 목록 | 참고용 |
| `clean-rebuild-audit.json` | 클린 리빌드 감사 데이터 | 참고용 |
| `final-audit-report.json` | 최종 검수 결과 | 참고용 |
| `prose-audit-report.json` | 문체 구조화 검수 결과 (44KB) | 참고용 |
| `stage5-navigation-audit.json` | Stage 5 Nav 검수 결과 | 참고용 |
| `v3-folder-structure-audit.json` | v3 폴더 구조 감사 결과 | 참고용 |

> **새 문서 추가 시 수정 대상**: `site-map.json`, `document-catalog.json`, `stage7-operating-docs-map.json`

---

## sample/ — 참고 샘플

| 파일 | 역할 |
|---|---|
| `README.txt` | 샘플 폴더 안내 |
| `gateway-navigation-efficient-header-sample-v2.html` | Gateway 관련 Navigation 최적화 Header 샘플. Stage 7 Shell 개발 시 참고된 레퍼런스 |

**주의**: `sample/` 파일은 실제 운영에 사용되지 않는다. 참고 및 패턴 연구용.

---

## archive/ — 보존 전용

| 경로 | 역할 |
|---|---|
| `archive/v1/` | legacy v1 문서 이동 보존 (PR #28) |
| `archive/v2/` | legacy v2 문서 이동 보존 (PR #28) |
| `archive/v3/` | v3 원본 문서 보존 (docs로 운영화 전) |
| `archive/docs/` | 운영 문서 수정 전 이력 보관 |

**⚠️ 규칙**: archive 내 파일은 절대 수정하지 않는다. 읽기 전용 보존 위치다.

---

## tools/ — 유틸리티 스크립트

| 파일 | 역할 |
|---|---|
| `cleanse-docs.mjs` | 문서 내 불필요한 메타데이터(배포자 정보 등) 일괄 클렌징 |
| `refactor-paths-and-links.mjs` | 경로 및 링크 일괄 리팩토링 |
| `stage7-update-abap-catalog-paths.mjs` | ABAP 카탈로그 경로 갱신 스크립트 |

**사용법**: `node tools/cleanse-docs.mjs` 형태로 실행 (Node.js 필요)

---

## handoff/ — 인수인계 문서

| 파일 | 역할 |
|---|---|
| `stage7_codex_handoff_after_pr35.md` | PR #35 이후 인수인계 기준 문서 |

---

## .project-docs/ — 프로젝트 분석 문서 (이 폴더)

AI 분석 및 운영 규칙 보관용. Git에 포함시키지 않는다.

---

_최초 작성: 2026-05-29_
