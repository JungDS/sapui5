# Stage 7 아키텍처 및 저장소 구조

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
    sapui5-routing-layout.html
  module/
  practice/
  reference/
    (원본/초안 자료 대기용, 처리 후 archive/reference/로 이동)
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
- `reference/`는 신규 원본/초안 학습 자료가 보관되는 공간이며, `docs/`로 운영화된 후 `archive/reference/`로 이동한다.
- `assets/stage7-shell.css`, `assets/stage7-shell.js`는 Stage 7 전환 페이지가 명시적으로 연결하는 opt-in 공통 Shell이다.
- `archive/docs/`는 운영 문서의 수정 전 이력 보관 위치다.
- `archive/v1/`, `archive/v2/`는 legacy v1/v2 문서 보존 위치다.
- `archive/v3/`는 기존 v3 문서 원본 보존 위치다.
- 기존 `v3/` 링크를 유지해야 하면 redirect 또는 최신 docs 안내 페이지로 전환한다.

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
