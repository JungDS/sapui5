# 프로젝트 작업 이력 및 PR 규칙

## 8. Stage 7 작업 단계

| 단계 | 작업 | 대상 | 상태 |
|---|---|---|---|
| 7-0 | README 운영 기준 정리 | `README.md` | 완료 (#17) |
| 7-1 | 최종 로컬 샘플 확정 | local sample | 완료 |
| 7-2 | index.html 메타데이터 적용 | `index.html` | 완료 (#18) |
| 7-3 | 공통 CSS/JS Shell 초안 | `assets/stage7-shell.css`, `assets/stage7-shell.js` | 완료 (#19) |
| 7-4 | Gateway 문서 1개 시범 전환 | `docs/abap/gateway-odata-v2-crud.html` | 완료 (#20) |
| 7-5 | ABAP Landing 전환 | `pages/abap.html` | 완료 (#21) |
| 7-5a | README / README_ALL 분리 | `README.md`, `README_ALL.md` | 완료 (#22) |
| 7-5b | Navigation/Data 기준 정비 | `data/site-map.json`, `data/document-catalog.json`, `assets/stage7-shell.*`, `assets/common.js` | 완료 (#23) |
| 7-5c | 나머지 Landing 전환 | `pages/roadmap.html`, `pages/ui5-fiori.html`, `pages/module-basics.html`, `pages/integrated-practice.html`, `pages/reference.html` | 완료 (#23) |
| 7-6 | 우측 Document Navigation 완성 | `assets/stage7-shell.css`, `assets/stage7-shell.js` | 완료 (#24) |
| 7-7 | v3 운영 문서 docs로 이관 | `v3/**/*.html` → `docs/**` | 완료 |
| 7-7a | 로드맵 문서 3개 docs 이관 | `docs/roadmap/*` | 완료 (#25) |
| 7-7b | Home inline CSS 분리 | `assets/stage7-home.css` | 완료 (#26) |
| 7-7c | 로드맵 v3 원본 archive 보존 | `archive/v3/00-roadmap/*` | 완료 (#27) |
| 7-7d | legacy v1/v2 archive 이동 | `archive/v1`, `archive/v2` | 완료 (#28) |
| 7-7e | ABAP 핵심 3개 문서 docs 운영화 | `docs/abap/*` | 완료 (#29) |
| 7-7f | ABAP docs Navigation 연결 | `stage7-shell.js`, `pages/abap.html` | 완료 (#30) |
| 7-7g | 운영 문서 매핑 데이터 추가 | `data/stage7-operating-docs-map.json` | 완료 (#31) |
| 7-7h | README / README_ALL 진행 이력 보강 | `README.md`, `README_ALL.md` | 완료 (#32) |
| 7-7i | Stage 7 Shell 문서목차 인식 보정 | `assets/stage7-shell.js` | 완료 |
| 7-7j | RAP End-to-End 운영 링크 연결 | `stage7-shell.js`, `pages/abap.html`, `data/*.json` | 완료 |
| 7-7k | UI5/Fiori 문서 7개 docs 운영화 | `docs/ui5/*.html`, `pages/ui5-fiori.html`, `data/*.json` | 완료 |
| 7-7l | ABAP 잔여 문서 2개 docs 운영화 | `docs/abap/rap-action.html`, `docs/abap/abap-cloud.html`, `data/*.json` | 완료 |
| 7-7m | 통합 실습 문서 2개 docs 운영화 | `docs/practice/*.html`, `pages/integrated-practice.html`, `data/*.json` | 완료 |
| 7-7n | SAP 모듈 기초 문서 13개 docs 운영화 | `docs/module/*.html`, `pages/module-basics.html`, `data/*.json` | 완료 |
| 7-8 | archive/v3 보존 또는 redirect 결정 | `v3/`, `archive/v3/` | 완료 |
| 7-9 | 교재형 본문 보강 | `docs/**/*.html` | 완료 |
| 7-10 | 전체 링크/UX 검수 | 전체 HTML | 완료 |
| 7-11 | README 최종 갱신 | `README.md`, `README_ALL.md` | 완료 |
| 7-12 | ABAP 커리큘럼 2-Track 샘플 UI 설계 및 검토 | `docs/roadmap/abap-curriculum-*`, `assets/abap-curriculum-*` | 진행 중 |

---


## 9. 최근 수정 페이지

| 구분 | 문서 | PR |
|---|---|---|
| 진행 중 | ABAP 커리큘럼 2-Track v8 통일 아키텍처(Unification) 기반 전환. 파편화된 JS/CSS를 하나로 통합하고 HTML에서 모드만 전환하도록 리팩토링 기획 중 | 이번 PR |
| 완료 | ABAP 커리큘럼 Sample D (완전체 하이브리드) 제작 및 TDZ 버그 수정, 100% 와이드 화면 최적화 완료 | 이번 PR |
| 진행 중 | ABAP 커리큘럼 2-Track 샘플 페이지 제작 및 비교 검토. 최종 선호안은 `abap-curriculum-codex-v7_sampleA-20260602-165628.html`이며, Track 탭, 좌측 THEORY 목록, 선택 THEORY 단일 본문, Navigation 학습 목차, Scroll Spy, 용어 팝업, JSON 데이터 분리 구조를 조합해 검토 중 | 이번 PR |
| 완료 | Phase 1~4 IT 용어 Dual-Tab 팝업 구현 및 문서 태깅 | 로컬 작업 |
| 완료 | `reference/` 초안 문서 분석 후 archive 이동 프로세스 수립 | 로컬 작업 |
| 완료 | SAP DLL v5.0 개정 및 메타데이터 전역 클렌징 | 로컬 작업 (PR 예정) |
| 완료 | ABAP Landing Page 아코디언 및 트랙 개편 | 로컬 작업 |
| 완료 | Stage 7 Shell 문서목차 인식 보정 | 로컬 작업 |
| 완료 | RAP End-to-End 운영 링크 연결 | 로컬 작업 |
| 완료 | SAP 모듈 기초 문서 13개 docs 운영화 | 로컬 작업 |
| 완료 | 통합 실습 문서 2개 docs 운영화 | 로컬 작업 |
| 완료 | ABAP 잔여 문서 2개 docs 운영화 | 로컬 작업 |
| 완료 | UI5/Fiori 문서 7개 docs 운영화 | 로컬 작업 |
| 완료 | README / README_ALL 진행 이력 보강 | 로컬 작업 |
| 완료 | Stage 7 운영 문서 매핑 데이터 추가 | #31 |
| 완료 | Stage 7 ABAP docs navigation links 정리 | #30 |
| 완료 | Stage 7 ABAP 핵심 문서 docs 운영화 1차 | #29 |
| 완료 | Archive legacy v1 and v2 folders | #28 |
| 완료 | Stage 7 로드맵 v3 원본 archive 보존 | #27 |
| 완료 | Stage 7 Home inline CSS 분리 | #26 |
| 완료 | Stage 7 로드맵 문서 docs 이관 | #25 |
| 완료 | Stage 7 우측 Document Navigation 완성 | #24 |
| 완료 | Stage 7 Navigation/Data 기준 정비 및 Landing 전환 | #23 |
| 완료 | README / README_ALL 운영 문서 분리 | #22 |
| 완료 | ABAP Landing Stage 7 전환 | #21 |
| 완료 | Gateway docs Stage 7 시범 전환 | #20 |
| 완료 | Stage 7 공통 CSS/JS Shell 초안 | #19 |
| 완료 | index.html Stage 7 Home Shell | #18 |
| 완료 | Gateway Navigation 우측 독립 패널 | #16 |
| 완료 | Gateway Scroll Spy | #15 |
| 완료 | Gateway Hybrid Navigation | #14 |
| 완료 | Gateway / OData V2 CRUD 입문 상세화 | #12 |
| 완료 | CDS View에서 OData 노출까지 | #10 |

---


## 10. PR #25~#31 상세 진행 이력

### PR #25 · Stage 7 로드맵 문서 docs 이관

- 로드맵 영역 문서 3개를 `docs/roadmap/` 운영 경로로 이관했다.
- `developer-learning-roadmap.html`, `development-tools-overview.html`, `debugging-troubleshooting-guide.html`을 신규 운영본으로 정리했다.
- `README.md`, `README_ALL.md`, `pages/roadmap.html`의 운영 링크를 docs 기준으로 반영했다.

### PR #26 · Stage 7 Home inline CSS 분리

- `index.html` 내부 inline CSS를 `assets/stage7-home.css`로 분리했다.
- Home Shell은 외부 CSS/JS 기준으로 유지되도록 정리했다.
- 일부 Home 링크를 docs 운영 경로 기준으로 보정했다.

### PR #27 · Stage 7 로드맵 v3 원본 archive 보존

- 로드맵 v3 원본 3개를 `archive/v3/00-roadmap/`에 보존했다.
- 기존 v3 URL은 최신 docs 운영본 안내 페이지로 전환했다.
- 기존 archive 파일, v1, v2 파일은 수정하지 않았다.

### PR #28 · Archive legacy v1 and v2 folders

- 루트 `v1/` 16개 파일을 `archive/v1/`로 이동했다.
- 루트 `v2/` 16개 파일을 `archive/v2/`로 이동했다.
- 총 32개 파일이 rename 처리되었고, additions/deletions는 0으로 파일 내용 변경 없이 경로만 변경했다.

### PR #29 · Stage 7 ABAP 핵심 문서 docs 운영화 1차

- ABAP 핵심 문서 3개를 `docs/abap/` 운영본으로 생성했다.
- 신규 운영본은 `common.css`, `stage7-shell.css`, `common.js`, `stage7-shell.js`를 사용한다.
- 각 문서에는 `data-page-type`, `data-active-category`, `data-doc-id`, `data-distributor`를 적용했다.
- 문서 내용은 단순 복사가 아니라 개념, 구조, 실무 패턴, 주의점, 체크리스트 구조로 상세화했다.
- 기존 v3 원본은 `archive/v3/01-abap/`에 보존했다.

대상 운영본:

```text
docs/abap/abap-classic-report-itab-alv.html
docs/abap/abap-new-syntax.html
docs/abap/cds-to-odata.html
```

### PR #30 · Stage 7 ABAP docs navigation links 정리

- `assets/stage7-shell.js`의 ABAP 핵심 3개 문서 경로를 docs 기준으로 변경했다.
- `pages/abap.html`의 추천 경로와 문서 카드 링크를 docs 기준으로 변경했다.
- 기존 v3 경로는 `legacyHref`로 보존했다.

### PR #31 · Stage 7 운영 문서 매핑 데이터 추가

- `data/stage7-operating-docs-map.json`을 추가했다.
- `abap-classic`, `abap-new-syntax`, `cds-odata`, `gateway-odata-v2-crud`의 운영 경로, pages 기준 href, legacy 경로, archive 경로, 관련 PR 정보를 기록했다.
- 후속 `data/site-map.json`, `data/document-catalog.json` 갱신의 기준점으로 사용한다.

---


## 11. ABAP 커리큘럼 샘플 진행 이력

### 2026-06-02 · 샘플 비교 및 v7 sampleA 방향 확정

- 초기 비교 대상은 Codex, Claude, Antigravity가 생성한 ABAP 커리큘럼 HTML 화면이다.
- 사용자는 색상 자체보다 구조를 중시했으며, 희망 구조는 상단 Track 탭, 좌측 THEORY 리스트, 우측 상세 하위 목록이었다.
- Antigravity 계열 샘플은 전체적인 디자인 완성도와 깔끔한 본문 레이아웃이 강점으로 평가되었다.
- Claude 계열 샘플은 스크롤 시 현재 THEORY 유지, 용어 팝업, 우측 Navigation, 상세 설명, 공통 디자인이 강점으로 평가되었다.
- Codex 계열 샘플은 검색 기능, JSON 데이터 기반 관리, 상세 설명, 공통 디자인이 강점으로 평가되었다.
- v7 sampleA는 최종 선호안으로 남겼으며, 다음 방향을 반영했다.
  - 본문은 모든 THEORY를 한 번에 나열하지 않고 좌측에서 선택한 THEORY만 출력한다.
  - 좌측 THEORY 목록은 자체 스크롤을 사용하며, 끝까지 이동해도 본문 스크롤에 영향을 주지 않는다.
  - 좌측 THEORY 클릭 시 학습 목차는 해당 THEORY의 첫 항목 또는 섹션 개요를 기준으로 초기화한다.
  - 우측 독립 학습 목차는 제거하고 Stage 7 Navigation 패널 안에 학습 목차를 출력한다.
  - 본문 폭을 넓혀 학습 콘텐츠 가독성을 높인다.
  - Track 탭은 스크롤 중 보이게 유지하되, 검색/필터 영역까지 과도하게 고정하지 않는다.
  - 하위 학습 단위 목차는 Scroll Spy와 연동해 현재 읽는 항목을 표시한다.

### 2026-06-02 · Sample D 제작 및 v8 통합 아키텍처 기획

- Sample A의 와이드 레이아웃과 Sample C의 유려한 본문 디자인을 결합하고 스크롤 스파이 기능을 더한 **Sample D**(`abap-curriculum-antigravity-v8_sampleD...html`)를 제작 완료했다.
- 이 과정에서 발견된 용어 팝업의 Temporal Dead Zone (TDZ) 에러를 전역 호이스팅으로 완벽히 수정하고, 좌우 밀착 100% 레이아웃 최적화를 달성했다.
- 두 샘플(Codex, Antigravity)의 유지보수 파편화를 막기 위해, 엔진(`abap-curriculum-v8.js/css`)을 하나로 통합하고 HTML 파일만 나누어 토글하는 **단일 엔진 다중 뷰(Unification)** 형태의 v8 전환 계획을 수립했다.

### 샘플 파일 관리 기준

- Codex 샘플 파일명은 `abap-curriculum-codex-v#_sample#-yyyymmdd-hhmmss.html` 형식을 따른다.
- 새 요청 묶음이 생기면 v 번호를 1씩 증가시킨다.
- 같은 요청에서 여러 샘플을 만들 때는 `sample1`, `sample2`, `sampleA`, `sampleB`처럼 구분한다.
- 현재 운영 반영 후보는 `docs/roadmap/abap-curriculum-codex-v7_sampleA-20260602-165628.html`이다.
- 운영 페이지로 전환하기 전까지는 모든 샘플을 검토용 HTML로 취급한다.

---


## 13. Pull Request 기준

- PR 제목과 본문은 한국어로 작성한다.
- 의미 있는 변경은 main 직접 수정 대신 PR로 처리한다.
- PR 본문에는 작업 개요, 변경 내용, 확인 포인트를 작성한다.
- 구조 변경 PR은 문서 상세화 PR과 분리한다.
- 대량 이동, 구조 변경, clean rebuild는 별도 PR로 분리한다.
- README.md에는 간략 요약을 기록하고, README_ALL.md에는 상세 진행 이력을 기록한다.
- GitHub 도구 timeout이나 확인 버튼 누락이 발생하면 수동 반영 가능한 ZIP 또는 패치로 우회한다.

---
