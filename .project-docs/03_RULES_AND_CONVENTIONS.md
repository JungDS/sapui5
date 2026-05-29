# 03 · 규칙과 컨벤션

> 이 파일은 프로젝트에서 반드시 지켜야 할 규칙과 컨벤션을 정리한 문서입니다.  
> 새 파일을 만들거나 기존 파일을 수정할 때 이 파일의 내용을 기준으로 삼으세요.

---

## 1. 운영 문서 경로 규칙

### ✅ 올바른 경로
```
docs/roadmap/xxx.html       ← 로드맵 운영 문서
docs/abap/xxx.html          ← ABAP 운영 문서
docs/ui5/xxx.html           ← UI5/Fiori 운영 문서
docs/module/xxx.html        ← 모듈 기초 운영 문서
docs/practice/xxx.html      ← 통합 실습 운영 문서
docs/reference/xxx.html     ← Reference 운영 문서
```

### ❌ 사용하지 않는 경로 (legacy)
```
v1/, v2/, v3/   ← archive/ 하위로 이동 완료. 새 문서 생성 금지.
```

---

## 2. HTML 파일 작성 규칙

### 2.1 `<head>` 구조 (docs/*.html 기준)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>[문서 제목] · SAP Developer Learning Library</title>
<link rel="stylesheet" href="../../assets/common.css" />
<link rel="stylesheet" href="../../assets/stage7-shell.css" />
<script src="../../assets/common.js" defer></script>
<script src="../../assets/stage7-shell.js" defer></script>
</head>
```

- `pages/*.html` 기준: `../assets/`
- `index.html` 기준: `./assets/common.css` + `./assets/home.css`
- **`<style>` 인라인 CSS는 넣지 않는다** → `stage7-shell.css`로 통합
- **`<script>` 인라인 JS는 넣지 않는다** → `common.js` 또는 `stage7-shell.js`로 통합

### 2.2 `<body>` 메타데이터 (docs/*.html 기준)

```html
<body
  data-page-type="doc"
  data-active-category="abap"
  data-doc-id="abap-classic"
  data-doc-title="Classic ABAP 기본기"
  data-doc-version="4.0"
  data-doc-created-at="2026-05-28T21:15:00+09:00"
  data-doc-updated-at="2026-05-28T21:15:00+09:00"
  data-prose-root="true">
```

| 속성 | 허용값 | 필수 여부 |
|---|---|---|
| `data-page-type` | `home` / `landing` / `doc` | **필수** |
| `data-active-category` | `roadmap` / `abap` / `ui5` / `module` / `practice` / `reference` | 필수 (home 제외) |
| `data-doc-id` | `stage7-shell.js`의 DOCS 키와 일치해야 함 | **필수** |
| `data-doc-title` | 화면 표시 문서명 | **필수** |
| `data-doc-version` | `4.0`, `5.0` 등 | 필수 |
| `data-doc-created-at` | ISO 8601 KST `+09:00` 포함 | 필수 |
| `data-doc-updated-at` | ISO 8601 KST `+09:00` 포함 | 필수 |
| `data-prose-root` | `true` | 권장 |
| `data-distributor` | ~~`"정훈영"`~~ | **v5.0부터 제거 (Deprecated)** |

### 2.3 `<body>` 메타데이터 (pages/*.html 기준)

```html
<body
  class="stage7-home"
  data-page-type="landing"
  data-active-category="abap"
  data-doc-id="abap"
  data-doc-title="ABAP 개발"
  data-doc-version="5.0"
  data-doc-created-at="2026-05-28T17:30:00+09:00"
  data-doc-updated-at="2026-05-29T03:45:00+09:00"
  data-prose-root="true">
```

### 2.4 문서 본문 구조 (docs/*.html 기준)

```html
<div class="stage7-doc-layout">
  <section class="stage7-hero prose-summary" data-prose="summary">
    <div class="breadcrumb" data-prose="summary">
      <a href="../../index.html">Home</a>
      <span>›</span>
      <a href="../../pages/abap.html">ABAP 개발</a>
      <span>›</span>
      <span>문서 제목</span>
    </div>
    <div class="stage7-hero__eyebrow">SAP Developer Learning Library</div>
    <h1>문서 제목</h1>
    <p class="lead">한 줄 설명</p>
    <div class="home-badges">
      <span class="stage7-badge blue">Stage 7</span>
      <span class="stage7-badge green">카테고리</span>
    </div>
  </section>

  <main>
    <section class="stage7-section prose-concept" data-prose="concept" id="role">
      <div class="stage7-section__label">01 · 역할</div>
      <h2>섹션 제목</h2>
      <!-- 본문 -->
    </section>
    <!-- 추가 section들 -->
  </main>
</div>
```

---

## 3. 섹션 구성 규칙 (docs 문서 표준 구조)

각 문서는 아래 섹션 유형 중 적합한 것을 선택해 구성한다:

| 섹션 번호 | data-prose 값 | 용도 |
|---|---|---|
| 01 | `concept` | 역할/개념 설명 |
| 02 | `structure` | 구조/흐름 설명 |
| 03 | `practice` | 실무 패턴/예제 |
| 04 | `warning` | 주의점/함정 |
| 05 | `checklist` | 완료 체크리스트 |

`section`에는 반드시 `id` 속성을 부여한다 (ScrollSpy 및 목차 생성에 사용됨).

---

## 4. 새 문서 추가 시 체크리스트

새 `docs/*.html` 파일을 추가하면 반드시 아래 항목도 함께 수정해야 한다:

- [ ] **`assets/stage7-shell.js`** → `DOCS` 상수에 새 문서 항목 추가
- [ ] **`assets/stage7-shell.js`** → `LEARNING_PATHS` 해당 영역 배열에 docId 추가
- [ ] **`data/site-map.json`** → 새 문서 URL 항목 추가
- [ ] **`data/document-catalog.json`** → 새 문서 카드 정보 추가
- [ ] **`data/stage7-operating-docs-map.json`** → 운영 경로 및 legacy 경로 기록
- [ ] **`pages/[category].html`** → 문서 카드 추가
- [ ] **`README.md`** → 최근 변경 목록 업데이트
- [ ] **`README_ALL.md`** → 진행 이력 상세 기록

---

## 5. 버전 증가 기준

| 변경 유형 | 버전 처리 |
|---|---|
| 오탈자, 링크, CSS, Navigation Shell 수정 | 버전 유지, `data-doc-updated-at`만 갱신 |
| 문서 내용 보강, 예제 추가, 학습 흐름 일부 변경 | minor 증가: `4.0 → 4.1` |
| 교육 구조 대폭 변경, 문서 체계 재구축 | major 증가: `4.x → 5.0` |

---

## 6. Reference 처리 및 Archive 규칙

### 6.1 Reference 파일 처리 흐름
`reference/` 폴더는 사용자가 새롭게 프로젝트에 추가하고 싶은 원본 정보나 초안 자료를 두는 곳이다. 다음 흐름으로 처리한다.
1. `reference/` 내의 파일을 분석한다.
2. 분석된 내용을 바탕으로 `docs/` 경로 아래에 적절한 운영 문서를 생성하거나 기존 문서를 보강한다.
3. 새롭게 추가/보강된 문서를 `index.html` 등에서 접근할 수 있도록 카탈로그 및 네비게이션에 연결한다.
4. 작업이 성공적으로 웹사이트에 반영되면, `reference/` 에 있던 원본 파일은 `archive/` 폴더(예: `archive/reference/`)로 이동하여 보관한다. 이렇게 하면 더 이상 중복 확인하지 않아도 반영되었음을 알 수 있다.

### 6.2 기본 Archive 규칙

운영 문서를 수정하기 전, 현재 운영본을 archive에 보관한다.

### 경로 형식
```
archive/docs/[category]/[doc-id]/[YYYYMMDD]_[hhmmss]_v[version].html
```

### 예시
```
archive/docs/abap/abap-classic/20260528_211500_v4.0.html
archive/docs/landing/abap/20260529_015502_v4.0.html
```

- 날짜/시간은 archive 수행 시각이 아닌, **현재 운영본의 `data-doc-updated-at` 값**을 기준으로 한다.
- 시간대: KST (`Asia/Seoul`, `+09:00`)
- archive 파일은 절대 수정하지 않는다.

---

## 7. PR 운영 규칙

- PR 제목과 본문은 **한국어**로 작성한다.
- main 브랜치 직접 수정 대신 **Branch → PR → Merge** 흐름을 따른다.
- 구조 변경 PR과 문서 상세화 PR을 분리한다.
- 대량 이동, 구조 변경, clean rebuild는 별도 PR로 분리한다.
- PR 본문: 작업 개요, 변경 내용, 확인 포인트를 포함한다.

---

## 8. 문체 기준

| 영역 | 문체 |
|---|---|
| 개념 설명 | 평서형 ("~이다", "~한다") |
| 실습 절차 | 지시형 ("~한다", "~확인한다") |
| 체크리스트 | 지시형 / 확인형 |
| 강사용 메모 | 존칭형 |
| 경고/주의 | 단정형 |

---

## 9. 디자인 기준

- 본문은 가능한 넓게 유지 (Navigation은 우측 독립 패널)
- 제목 폰트는 과도하게 크게 하지 않음
- 좁은 화면: Navigation이 본문을 가리지 않도록 접힘 처리
- 수정일자와 배포자는 badge 또는 카드형 정보로 표시
- 홈 이동: 집 모양 Home 아이콘 (`ICON_HOME` SVG)
- 이전/다음: SVG 아이콘 버튼 (`ICON_PREV`, `ICON_NEXT`)

---

## 10. 문서 데이터 SSOT

**단일 진실 원천(Single Source of Truth): `assets/stage7-shell.js`**

```
stage7-shell.js 안의 데이터
  DOCS          ← 운영 문서 목록, 카테고리, href, preparing 여부
  LEARNING_PATHS ← 학습 순서 (이전/다음 버튼 기준)
  RELATED_DOCS  ← 관련 문서 연결
  CATEGORY_HOME ← 카테고리 Landing Page 링크
```

- `common.js`는 이제 문서 목록 데이터를 보유하지 않는다.
- `window.SAPStage7Shell.docs`로 이 데이터에 외부에서 접근 가능하다.
- 새 문서 유형이 필요하다면 `stage7-shell.js` **한 곳만** 수정하면 된다.

## 11. CSS/JS 첨부 원칙

**기본 원칙: 파일을 늘리지 않는다.**

```
[기본 CSS 코어]
  common.css       - 전역 기본 (Stage 5 기반)
  stage7-shell.css - Stage 7 Shell, 아코디언 공통 포함

[예외 CSS]
  home.css         - 홈카드(index.html)가 진짜 특수한 레이아웃일 때만

[기본 JS 코어]
  common.js         - 공통 유틸 (용어 모달, 코드복사, 연습, 검색)
  stage7-shell.js   - Shell 렌더링 + 문서 데이터 SSOT
```

| 상황 | 처리방법 |
|---|---|
| 모든 Landing 페이지에 공통으로 필요한 CSS | `stage7-shell.css`에 추가 |
| 특정 페이지에만 필요한 CSS | 해당 `.html` 인라인 쓰지 말고 `stage7-shell.css`에 켜리순 2줄 주석과 함께 추가 |
| 정말 특수한 페이지 전용 CSS가 필요한 경우 | 별도 CSS 파일 생성 (but 메이저 화면 단위만) |
| Landing 아코디언 등 JS 기능 | `common.js`로 통합 |
| 별도 JS 파일이 필요한 경우 | 충분한 이유 있을 때만 생성 |

---

## 12. 프로젝트 전역 변경 사항 갱신 원칙 (신규 규정)

프로젝트 내에서 구조 변경, 파일 추가, 내용 대거 개편 등 의미 있는 작업이 발생한 경우 다음 **3대 문서**를 반드시 함께 업데이트하여 프로젝트 상태의 정합성을 유지해야 한다.

1. **`README.md`**: 상태 갱신 및 관련 링크 점검
2. **`01_PROJECT_ANALYSIS.md`**: 분석 내용, 아키텍처 흐름, 향후 계획(Next Steps) 업데이트
3. **`.project-docs/ 내 관련 주제 문서`** (예: 아키텍처 규칙 변경이면 `06_STAGE7_ARCHITECTURE.md` 갱신)

---

_작성: 2026-05-29_
