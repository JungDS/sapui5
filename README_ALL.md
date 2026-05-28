# SAP Developer Learning Library · 전체 운영 문서

이 문서는 SAP Developer Learning Library의 상세 운영 기준, Stage 7 전환 기준, archive 규칙, 문서 메타데이터 기준, Pull Request 운영 기준을 보관한다.

간단한 현황은 `README.md`에서 확인한다.

---

## 1. 운영 대시보드

- 최종 수정: 2026-05-28 23:20 KST
- 배포자: 정훈영
- 저장소: https://github.com/JungDS/sapui5
- GitHub Pages: https://jungds.github.io/sapui5/
- 운영 방식: Branch → Pull Request → Review/Merge
- 현재 진행: Stage 7 · v3 문서 docs 운영화 및 운영 데이터 정비
- 현재 PR: #32 README / README_ALL 진행 이력 보강

---

### 1.1 인수인계 반영 기준

- 응답과 문서는 한국어로 정중하고 전문적인 강의 스타일을 유지한다.
- SAP 설명은 기본적으로 S/4HANA와 SAP GUI 800 기준으로 작성한다.
- SAP 표준 동작과 아키텍처 의도를 우선 설명하고, 불가피한 추정은 `[ 추정 ]`으로 표시한다.
- RAP 예제나 과제에는 Interface View `ZI_*`와 Projection View `ZC_*`를 함께 제시한다.
- `SSCR`은 Selection Screen 의미로 사용한다.
- HTML 학습자료는 밝고 깔끔한 교재형 디자인을 유지하고, 모든 배포 문서에는 `배포자: 정훈영`을 표기한다.

---

## 2. Stage 7 목표

Stage 7은 개별 HTML을 계속 직접 수정하는 방식에서 벗어나, 최신 운영 문서를 안정적인 경로와 공통 Shell 기준으로 재구성하는 단계다.

핵심 목표는 다음과 같다.

1. `v3/`를 최신 운영 문서 경로로 계속 사용하지 않는다.
2. 최신 운영 문서는 `docs/` 아래에 둔다.
3. `pages/`는 영역별 Landing Page 전용으로 유지한다.
4. `v3/`는 보존본 또는 redirect 기준으로 정리한다.
5. Header, Navigation, 문서 메타데이터 표시, 이전/다음 이동은 공통 CSS/JS Shell에서 처리한다.
6. 각 HTML 문서는 본문과 최소 메타데이터 중심으로 관리한다.
7. 수정 전 운영본은 `archive/docs/` 아래에 문서별로 보관한다.
8. legacy `v1/`, `v2/`는 운영 루트에서 제거하고 `archive/v1/`, `archive/v2/`로 보존한다.

---

## 3. 목표 저장소 구조

```text
index.html
README.md
README_ALL.md
pages/
  roadmap.html
  abap.html
  ui5-fiori.html
  module-basics.html
  integrated-practice.html
  reference.html
docs/
  roadmap/
    developer-learning-roadmap.html
    development-tools-overview.html
    debugging-troubleshooting-guide.html
  abap/
    abap-classic-report-itab-alv.html
    abap-new-syntax.html
    cds-to-odata.html
    gateway-odata-v2-crud.html
    rap-end-to-end.html
  ui5/
  module/
  practice/
  reference/
assets/
  common.css
  common.js
  stage7-shell.css
  stage7-shell.js
data/
  site-map.json
  document-catalog.json
  stage7-operating-docs-map.json
archive/
  docs/
  before/
  v1/
  v2/
  v3/
```

### 구조 기준

- `index.html`은 전체 학습자료 첫 화면이다.
- `README.md`는 짧은 운영 대시보드다.
- `README_ALL.md`는 상세 운영 문서다.
- `pages/*.html`은 영역별 Landing Page다.
- `docs/**.html`은 최신 운영 문서다.
- `assets/stage7-shell.css`, `assets/stage7-shell.js`는 Stage 7 전환 페이지가 명시적으로 연결하는 opt-in 공통 Shell이다.
- `archive/docs/`는 운영 문서의 수정 전 이력 보관 위치다.
- `archive/v1/`, `archive/v2/`는 legacy v1/v2 문서 보존 위치다.
- `archive/v3/`는 기존 v3 문서 원본 보존 위치다.
- 기존 `v3/` 링크를 유지해야 하면 redirect 또는 최신 docs 안내 페이지로 전환한다.

---

## 4. 공통 메타데이터 기준

모든 운영 HTML은 문서 유형에 따라 `body`에 메타데이터를 둔다.

### 4.1 index.html

```html
<body
  data-page-type="home"
  data-doc-id="index"
  data-doc-title="SAP Developer Learning Library"
  data-doc-version="4.0"
  data-doc-created-at="2026-05-28T16:41:34+09:00"
  data-doc-updated-at="2026-05-28T16:45:00+09:00"
  data-distributor="정훈영">
```

### 4.2 pages/*.html

```html
<body
  data-page-type="landing"
  data-active-category="abap"
  data-doc-id="abap"
  data-doc-title="ABAP 개발"
  data-doc-version="4.0"
  data-doc-created-at="2026-05-28T17:30:00+09:00"
  data-doc-updated-at="2026-05-28T17:30:00+09:00"
  data-distributor="정훈영">
```

### 4.3 docs/**/*.html

```html
<body
  data-page-type="doc"
  data-active-category="abap"
  data-doc-id="abap-classic"
  data-doc-title="Classic ABAP 기본기"
  data-doc-version="4.0"
  data-doc-created-at="2026-05-28T21:15:00+09:00"
  data-doc-updated-at="2026-05-28T21:15:00+09:00"
  data-distributor="정훈영">
```

### 4.4 메타데이터 의미

| 항목 | 의미 | 기준 |
|---|---|---|
| `data-page-type` | 페이지 유형 | `home`, `landing`, `doc` |
| `data-active-category` | 현재 카테고리 | `roadmap`, `abap`, `ui5`, `module`, `practice`, `reference` 등 |
| `data-doc-id` | 안정적인 문서 ID | archive 폴더명과 Navigation 키로 사용 |
| `data-doc-title` | 화면 표시 문서명 | Header, 현재 문서 카드에 사용 |
| `data-doc-version` | 문서 버전 | 내용/구조 변경 기준 |
| `data-doc-created-at` | 문서 최초 생성 시각 | KST ISO 8601 |
| `data-doc-updated-at` | 현재 운영본 마지막 수정 시각 | archive 파일명 생성 기준 |
| `data-distributor` | 배포자 | 기본값 `정훈영` |

---

## 5. Archive 규칙

운영 문서를 수정하기 전, 현재 운영본을 먼저 archive에 보관한다.

### 5.1 Archive 경로

```text
archive/docs/<category>/<doc-id>/<YYYYMMDD>_<hhmmss>_v<version>.html
```

예시:

```text
archive/docs/home/index/20260528_164134_v3.0.html
archive/docs/landing/abap/20260528_173000_v3.0.html
archive/docs/abap/gateway-odata-v2-crud/20260528_171530_v3.0.html
archive/docs/roadmap/developer-learning-roadmap/20260528_194500_v4.0.html
archive/v3/01-abap/abap-classic-report-itab-alv-beginner-v3.html
```

### 5.2 Archive 파일명 기준

- 날짜와 시간은 archive 수행 시각이 아니라, 현재 운영 HTML의 `data-doc-updated-at` 값을 기준으로 한다.
- 시간대는 KST, `Asia/Seoul` 기준이다.
- 파일명 형식은 `<YYYYMMDD>_<hhmmss>_v<version>.html`을 사용한다.
- 동일 파일명이 이미 존재하면 현재 문서의 `data-doc-updated-at` 또는 archive 생성 로직을 재확인한다.
- 기존 문서에 메타데이터가 없는 최초 전환 작업에서는 전환 시점의 기준 timestamp를 사용하고, README 또는 PR 본문에 예외로 기록한다.
- 기존 v3 문서를 직접 수정하지 않고 docs 경로를 신규 생성하는 작업에서는 v3 원본을 삭제하지 않고 archive 경로에 보존할 수 있다.
- legacy v1/v2 문서는 내용 수정 없이 `archive/v1/`, `archive/v2/`로 이동한다.

### 5.3 버전 증가 기준

| 변경 유형 | 버전 처리 |
|---|---|
| 오탈자, 링크, CSS, Navigation Shell 수정 | 버전 유지, `data-doc-updated-at`만 갱신 |
| 문서 내용 보강, 예제 추가, 학습 흐름 일부 변경 | minor 증가: `4.0 → 4.1` |
| 교육 구조 대폭 변경, 문서 체계 재구축 | major 증가: `4.x → 5.0` |

---

## 6. Global Shell 기준

### 6.1 Header

공통 Header는 페이지 유형별로 다르게 구성한다.

- Home에서는 왼쪽에 홈/라이브러리 식별을 두고, 오른쪽에 수정일자, 배포자, 주요 영역 바로가기를 둔다.
- Landing Page에서는 왼쪽에 `SAP 학습자료 홈` 아이콘 링크를 두고, 오른쪽에 수정일자, 배포자, 상위/관련 영역 이동을 둔다.
- Document Page에서는 왼쪽에 `SAP 학습자료 홈` 아이콘 링크를 두고, 오른쪽에 수정일자, 배포자, 영역 홈, 이전 문서, 다음 문서를 둔다.
- 홈 이동은 뒤로가기 화살표가 아니라 집 모양 Home 아이콘을 사용한다.
- 이전/다음은 문자 화살표가 아니라 SVG 아이콘 버튼을 사용한다.

### 6.2 Document Navigation

문서 페이지의 Navigation은 본문 그리드 안에 넣지 않고 화면 우측 독립 패널로 둔다.

구성 기준은 다음과 같다.

1. 현재 문서 카드
2. 탭 버튼
   - 문서목차
   - 학습경로
3. 문서목차 탭
   - 이 문서 안에서
   - 관련 문서
4. 학습경로 탭
   - 진행률
   - 학습 단계
   - 완료 / 현재 / 다음 상태
5. 접기/열기 토글 버튼
6. Scroll Spy active 표시

관련 문서는 문서목차 탭 안에서만 표시하고, 학습경로 탭에는 표시하지 않는다.

### 6.3 디자인 기준

- 본문은 가능한 넓게 유지한다.
- Navigation은 우측 독립 패널로 분리한다.
- Header와 본문 사이에는 적절한 여백을 둔다.
- 제목 폰트는 과도하게 크게 하지 않는다.
- 수정일자와 배포자는 badge 또는 카드형 정보로 표시한다.
- 좁은 화면에서는 Navigation이 본문을 가리지 않도록 정적 배치 또는 접힘 상태를 사용한다.

---

## 7. Stage 7 Shell 적용 기준

Stage 7 Shell은 기존 `common.css`, `common.js`에 바로 섞지 않고 다음 파일로 분리한다.

```text
assets/stage7-shell.css
assets/stage7-shell.js
```

적용 대상 HTML은 명시적으로 아래 파일을 연결한다.

```html
<link rel="stylesheet" href="../../assets/stage7-shell.css" />
<script src="../../assets/stage7-shell.js" defer></script>
```

하위 폴더 문서는 상대 경로에 맞게 `../` 또는 `../../`를 사용한다.

Stage 7 Shell은 `body[data-page-type]`이 있는 페이지에서만 동작한다. 기존 v3 문서는 명시적으로 연결하지 않는 한 영향을 받지 않는다.

---

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
| 7-7 | v3 운영 문서 docs로 이관 | `v3/**/*.html` → `docs/**` | 진행 중 |
| 7-7a | 로드맵 문서 3개 docs 이관 | `docs/roadmap/*` | 완료 (#25) |
| 7-7b | Home inline CSS 분리 | `assets/stage7-home.css` | 완료 (#26) |
| 7-7c | 로드맵 v3 원본 archive 보존 | `archive/v3/00-roadmap/*` | 완료 (#27) |
| 7-7d | legacy v1/v2 archive 이동 | `archive/v1`, `archive/v2` | 완료 (#28) |
| 7-7e | ABAP 핵심 3개 문서 docs 운영화 | `docs/abap/*` | 완료 (#29) |
| 7-7f | ABAP docs Navigation 연결 | `stage7-shell.js`, `pages/abap.html` | 완료 (#30) |
| 7-7g | 운영 문서 매핑 데이터 추가 | `data/stage7-operating-docs-map.json` | 완료 (#31) |
| 7-7h | README / README_ALL 진행 이력 보강 | `README.md`, `README_ALL.md` | 진행 중 (#32) |
| 7-8 | archive/v3 보존 또는 redirect 결정 | `v3/`, `archive/v3/` | 진행 중 |
| 7-9 | 교재형 본문 보강 | `docs/**/*.html` | 진행 중 |
| 7-10 | 전체 링크/UX 검수 | 전체 HTML | 진행 예정 |
| 7-11 | README 최종 갱신 | `README.md`, `README_ALL.md` | 진행 중 |

---

## 9. 최근 수정 페이지

| 구분 | 문서 | PR |
|---|---|---|
| 진행 중 | README / README_ALL 진행 이력 보강 | #32 예정 |
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

## 11. 현재 운영 링크

- 전체 학습자료 홈: https://jungds.github.io/sapui5/
- 로드맵: https://jungds.github.io/sapui5/pages/roadmap.html
- ABAP 개발: https://jungds.github.io/sapui5/pages/abap.html
- UI5/Fiori 개발: https://jungds.github.io/sapui5/pages/ui5-fiori.html
- SAP 모듈 기초: https://jungds.github.io/sapui5/pages/module-basics.html
- 통합 실습: https://jungds.github.io/sapui5/pages/integrated-practice.html
- Reference/운영: https://jungds.github.io/sapui5/pages/reference.html
- Gateway docs 전환본: https://jungds.github.io/sapui5/docs/abap/gateway-odata-v2-crud.html
- Classic ABAP docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-classic-report-itab-alv.html
- ABAP New Syntax docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-new-syntax.html
- CDS to OData docs 전환본: https://jungds.github.io/sapui5/docs/abap/cds-to-odata.html
- 로드맵 docs 전환본: https://jungds.github.io/sapui5/docs/roadmap/developer-learning-roadmap.html

---

## 12. 문체 기준

| 영역 | 문체 | 기준 |
|---|---|---|
| 개념 설명 | 평서형 | 표준 개념과 구조를 설명한다. |
| 실습 절차 | 지시형 | 학습자가 따라 할 수 있게 단계적으로 작성한다. |
| 체크리스트 | 지시형 / 확인형 | 완료 조건을 명확히 적는다. |
| 강사용 메모 | 존칭형 | 강의 진행 관점의 보충 설명을 적는다. |
| 경고 / 주의 | 단정형 | 실무 위험과 오해를 명확히 적는다. |

모든 주요 콘텐츠 블록에는 가능한 한 `data-prose`를 유지한다.

모든 배포 문서 하단에는 `배포자: 정훈영` 표기를 유지한다.

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

## 14. 채팅방이 없어졌을 때의 재개 기준

이 README_ALL을 먼저 읽고 다음 순서로 재개한다.

1. 최신 main commit을 확인한다.
2. 열린 PR이 있는지 확인한다.
3. `README.md`의 현재 진행과 현재 PR을 확인한다.
4. 진행 중 PR이 있으면 해당 PR의 변경 파일과 검증 결과를 확인한다.
5. 열린 PR이 없으면 `data/site-map.json`, `data/document-catalog.json`의 ABAP 핵심 문서 경로 갱신을 이어서 진행한다.
6. 이후 다음 v3 문서 묶음을 docs로 운영화한다.
