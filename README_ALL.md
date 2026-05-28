# SAP Developer Learning Library · 전체 운영 문서

이 문서는 SAP Developer Learning Library의 상세 운영 기준, Stage 7 전환 기준, archive 규칙, 문서 메타데이터 기준, Pull Request 운영 기준을 보관한다.

간단한 현황은 `README.md`에서 확인한다.

---

## 1. 운영 대시보드

- 최종 수정: 2026-05-28 17:40 KST
- 배포자: 정훈영
- 저장소: https://github.com/JungDS/sapui5
- GitHub Pages: https://jungds.github.io/sapui5/
- 운영 방식: Branch → Pull Request → Review/Merge
- 현재 진행: Stage 7 · README 분리
- 현재 PR: #22 `README / README_ALL 운영 문서 분리`

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
  abap/
    gateway-odata-v2-crud.html
    cds-to-odata.html
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
archive/
  docs/
    home/
      index/
        20260528_164134_v3.0.html
    landing/
      abap/
        20260528_173000_v3.0.html
    abap/
      gateway-odata-v2-crud/
        20260528_171530_v3.0.html
  before/
    legacy-pr-comparison/
  v3/
```

### 구조 기준

- `index.html`은 전체 학습자료 첫 화면이다.
- `README.md`는 짧은 운영 대시보드다.
- `README_ALL.md`는 상세 운영 문서다.
- `pages/*.html`은 영역별 Landing Page다.
- `docs/**.html`은 최신 운영 문서다.
- `assets/stage7-shell.css`, `assets/stage7-shell.js`는 Stage 7 전환 페이지가 명시적으로 연결하는 opt-in 공통 Shell 초안이다.
- `archive/docs/`는 운영 문서의 수정 전 이력 보관 위치다.
- `archive/before/legacy-pr-comparison/`은 기존 PR 비교용 보관 파일을 정리할 위치다.
- `archive/v3/`는 기존 v3 문서 보존 위치다.
- 기존 `v3/` 링크를 유지해야 하면 redirect 또는 보존본 유지 방식을 별도 결정한다.

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
  data-doc-id="gateway-odata-v2-crud"
  data-doc-title="Gateway / OData V2 CRUD 입문"
  data-doc-version="4.0"
  data-doc-created-at="2026-05-28T17:15:30+09:00"
  data-doc-updated-at="2026-05-28T17:15:30+09:00"
  data-distributor="정훈영">
```

### 4.4 메타데이터 의미

| 항목 | 의미 | 기준 |
|---|---|---|
| `data-page-type` | 페이지 유형 | `home`, `landing`, `doc` |
| `data-active-category` | 현재 카테고리 | `abap`, `ui5`, `module`, `practice`, `reference` 등 |
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
archive/docs/abap/gateway-odata-v2-crud/20260610_093000_v4.1.html
```

### 5.2 Archive 파일명 기준

- 날짜와 시간은 archive 수행 시각이 아니라, 현재 운영 HTML의 `data-doc-updated-at` 값을 기준으로 한다.
- 시간대는 KST, `Asia/Seoul` 기준이다.
- 파일명 형식은 `<YYYYMMDD>_<hhmmss>_v<version>.html`을 사용한다.
- 동일 파일명이 이미 존재하면 현재 문서의 `data-doc-updated-at` 또는 archive 생성 로직을 재확인한다.
- 충돌이 불가피한 경우에만 새 timestamp로 재생성한다.
- 기존 문서에 메타데이터가 없는 최초 전환 작업에서는 전환 시점의 기준 timestamp를 사용하고, README 또는 PR 본문에 예외로 기록한다.
- 기존 v3 문서를 직접 수정하지 않고 docs 경로를 신규 생성하는 시범 전환 작업에서는 archive 파일이 v3 원본으로 이동하는 비교 안내 페이지일 수 있다.

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

Home에서는 왼쪽에 홈/라이브러리 식별을 두고, 오른쪽에 수정일자, 배포자, 주요 영역 바로가기를 둔다.

Landing Page에서는 왼쪽에 `SAP 학습자료 홈` 아이콘 링크를 두고, 오른쪽에 수정일자, 배포자, 상위/관련 영역 이동을 둔다.

Document Page에서는 왼쪽에 `SAP 학습자료 홈` 아이콘 링크를 두고, 오른쪽에 수정일자, 배포자, 영역 홈, 이전 문서, 다음 문서를 둔다. 이전/다음은 문자 화살표가 아니라 SVG 아이콘 버튼을 사용한다.

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

### 6.3 디자인 기준

- 본문은 가능한 넓게 유지한다.
- Navigation은 우측 독립 패널로 분리한다.
- Header와 본문 사이에는 적절한 여백을 둔다.
- 제목 폰트는 과도하게 크게 하지 않는다.
- 수정일자/배포자 표시는 단순 흰색 배지보다 정보 카드형 또는 톤이 있는 badge 형태를 우선 검토한다.

---

## 7. Stage 7 Shell 적용 기준

Stage 7 Shell은 기존 `common.css`, `common.js`에 바로 섞지 않고 다음 파일로 분리한다.

```text
assets/stage7-shell.css
assets/stage7-shell.js
```

적용 대상 HTML은 명시적으로 아래 파일을 연결한다.

```html
<link rel="stylesheet" href="./assets/stage7-shell.css" />
<script src="./assets/stage7-shell.js" defer></script>
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
| 7-5a | README / README_ALL 분리 | `README.md`, `README_ALL.md` | 진행 중 (#22) |
| 7-5b | 나머지 Landing 전환 | `pages/*.html` | 진행 예정 |
| 7-6 | v3 운영 문서 docs로 이관 | `v3/**/*.html` → `docs/**` | 진행 예정 |
| 7-7 | archive/v3 보존 또는 redirect 결정 | `v3/`, `archive/v3/` | 진행 예정 |
| 7-8 | data 정비 | `data/site-map.json`, `data/document-catalog.json` | 진행 예정 |
| 7-9 | 전체 링크 검수 | 전체 HTML | 진행 예정 |
| 7-10 | README 최종 갱신 | `README.md`, `README_ALL.md` | 진행 예정 |

---

## 9. 최근 수정 페이지

| 구분 | 문서 | PR |
|---|---|---|
| 진행 중 | README / README_ALL 운영 문서 분리 | #22 |
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

## 10. 현재 운영 링크

- 전체 학습자료 홈: https://jungds.github.io/sapui5/
- 로드맵: https://jungds.github.io/sapui5/pages/roadmap.html
- ABAP 개발: https://jungds.github.io/sapui5/pages/abap.html
- UI5/Fiori 개발: https://jungds.github.io/sapui5/pages/ui5-fiori.html
- SAP 모듈 기초: https://jungds.github.io/sapui5/pages/module-basics.html
- 통합 실습: https://jungds.github.io/sapui5/pages/integrated-practice.html
- Reference/운영: https://jungds.github.io/sapui5/pages/reference.html
- Gateway docs 시범 전환: https://jungds.github.io/sapui5/docs/abap/gateway-odata-v2-crud.html

---

## 11. 문체 기준

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

## 12. Pull Request 기준

- PR 제목과 본문은 한국어로 작성한다.
- 의미 있는 변경은 main 직접 수정 대신 PR로 처리한다.
- PR 본문에는 작업 개요, 변경 내용, 확인 포인트를 작성한다.
- 구조 변경 PR은 문서 상세화 PR과 분리한다.
- 대량 이동, 구조 변경, clean rebuild는 별도 PR로 분리한다.
- GitHub 도구 timeout이나 확인 버튼 누락이 발생하면 수동 반영 가능한 ZIP을 생성한다.

---

## 13. 채팅방이 없어졌을 때의 재개 기준

이 README_ALL을 먼저 읽고 다음 순서로 재개한다.

1. 최신 main commit을 확인한다.
2. 열린 PR이 있는지 확인한다.
3. `README.md`의 현재 진행과 현재 PR을 확인한다.
4. Stage 7 작업 단계표에서 가장 앞선 미완료 단계를 확인한다.
5. archive 규칙에 따라 수정 전 운영본을 먼저 보관한다.
6. 작업 후 README와 README_ALL을 갱신하고 PR을 만든다.

---

## 14. 현재 메모

- README.md는 짧은 운영 대시보드로 유지한다.
- README_ALL.md는 상세 운영 기준과 전체 이력을 보관한다.
- ABAP Landing Page는 Stage 7 Shell 기준으로 전환 완료했다.
- ABAP Landing의 Gateway 항목은 신규 `docs/abap/gateway-odata-v2-crud.html`로 연결한다.
- 기존 v3 ABAP 문서 링크는 아직 유지한다.
- 다음 단계는 나머지 Landing Page 전환 또는 data 정비다.
- archive 파일명은 현재 운영본의 `data-doc-updated-at` 값을 사용한다.
- archive 파일명 표준은 `<YYYYMMDD>_<hhmmss>_v<version>.html`이다.
- 문서별 archive 경로는 `archive/docs/<category>/<doc-id>/`를 사용한다.
