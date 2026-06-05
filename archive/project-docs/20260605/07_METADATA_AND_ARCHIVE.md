# 문서 메타데이터 및 Archive 규칙

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
| `data-distributor` | 배포자 | v5.0 이후 제거 (Deprecated) |

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
