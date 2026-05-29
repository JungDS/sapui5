# 04 · 주의사항 및 자주 발생하는 실수

> 이 파일은 작업 중 자주 발생하는 실수와 알아야 할 함정을 정리한 문서입니다.  
> 새로운 작업을 시작하기 전, 관련 항목을 먼저 확인하세요.

---

## ⚠️ 고위험 주의사항

### [A1] 상대 경로를 잘못 계산하면 Shell이 동작하지 않는다

**증상**: Topbar가 보이지 않거나, CSS가 깨지거나, JS 오류 발생

**원인**: `docs/*.html`에서 `assets/` 참조 시 `../../`를 써야 하는데 `../`를 쓰는 경우

```html
<!-- ❌ 잘못된 예 (docs/abap/xxx.html에서) -->
<link rel="stylesheet" href="../assets/stage7-shell.css" />

<!-- ✅ 올바른 예 -->
<link rel="stylesheet" href="../../assets/stage7-shell.css" />
```

**경로 기준표**:
| 파일 위치 | assets/ 참조 | index.html 링크 | pages/ 링크 |
|---|---|---|---|
| `index.html` | `./assets/` | (자기 자신) | `./pages/` |
| `pages/*.html` | `../assets/` | `../index.html` | `./xxx.html` |
| `docs/**/*.html` | `../../assets/` | `../../index.html` | `../../pages/` |
| `archive/docs/**/*.html` | `../../../assets/` | `../../../index.html` | `../../../pages/` |

---

### [A2] `data-doc-id`가 `stage7-shell.js`의 DOCS 키와 불일치하면 이전/다음 버튼이 동작하지 않는다

**증상**: 우측 Side Nav에서 학습 경로가 표시되지 않거나, 이전/다음 버튼이 비활성화됨

**원인**: HTML의 `data-doc-id`와 `stage7-shell.js`의 `DOCS` 객체 키가 다름

```html
<!-- ❌ 잘못된 예: data-doc-id가 DOCS 키와 다름 -->
<body data-doc-id="abap-classic-report">

<!-- ✅ 올바른 예: DOCS 객체의 키와 정확히 일치 -->
<body data-doc-id="abap-classic">
<!-- stage7-shell.js: "abap-classic": { title: "...", ... } -->
```

**확인 방법**: `stage7-shell.js` 파일의 `const DOCS = { ... }` 블록에서 해당 키 확인

---

### [A3] archive/ 내부 파일을 수정하면 이력 보존 원칙이 무너진다

**규칙**: `archive/` 하위 모든 파일은 **절대 수정 금지**

- `archive/v1/`, `archive/v2/`, `archive/v3/`: legacy 보존
- `archive/docs/`: 수정 전 이력 보존

운영 문서를 수정해야 하면:
1. 현재 운영본을 `archive/docs/` 에 먼저 보관
2. 그 다음 `docs/` 파일 수정

---

### [A4] v3/ 경로로 새 문서를 생성하면 안 된다

**규칙**: `v3/` 디렉토리는 Stage 7 이후 더 이상 운영 경로가 아니다.  
모든 새 운영 문서는 `docs/` 하위에 생성한다.

---

## ⚡ 중요 주의사항

### [B1] ✅ (해결됨) ~~새 문서 추가 시 5곳을 동시에 수정해야 한다~~

> **v2026-05-29 업데이트**: `common.js`의 `NAV_DOCS`, `NAV_PATHS`, `NAV_TREE` 블록이 제거되었습니다.  
> 이제 문서 데이터 SSOT는 `stage7-shell.js` 단일 파일입니다.

**현재 기준 새 문서 추가 수정 대상 (4+1곳)**:
1. `assets/stage7-shell.js` → `DOCS` + `LEARNING_PATHS`
2. `data/site-map.json`
3. `data/document-catalog.json`
4. `data/stage7-operating-docs-map.json`
5. `pages/[category].html` → 카드 추가

> ⚠️ **이제 `common.js`는 수정하지 않아도 된다.** 문서 목록 데이터가 `stage7-shell.js`로 일원화됨.

---

### [B2] ✅ (해결됨) ~~`stage7-home.css`와 `stage7-home2.css` 혼동 주의~~

> **v2026-05-29 업데이트**: 구조 정리 완료.
> - `stage7-home.css` → `archive/docs/assets/stage7-home_20260529_033344.css` 이동 (미사용 파일 정리)
> - `stage7-home2.css` → `assets/home.css` 로 이름 통일
> - `index.html` → `./assets/home.css` 참조로 수정

**현재 홈 CSS**: `assets/home.css` (단일 파일, 혼동 없음)

---

### [B3] `data-distributor` 속성은 v5.0 이후 deprecated

```html
<!-- ❌ v5.0 이후 신규 문서에는 넣지 않는다 -->
<body data-distributor="정훈영">

<!-- ✅ v5.0 이후 올바른 방식 - 속성 생략 -->
<body data-page-type="doc" data-active-category="abap" ...>
```

단, `stage7-shell.js`의 `buildTopbar()`는 여전히 `data-distributor`를 읽어 Header에 표시한다.  
속성이 없으면 JS 기본값 `"정훈영"`을 사용한다.

---

### [B4] `data-doc-version`은 파일 내용 변경 기준이다

```html
<!-- 오탈자 수정 → 버전 유지, 날짜만 갱신 -->
<body data-doc-version="4.0" data-doc-updated-at="2026-05-29T10:00:00+09:00">

<!-- 내용 보강 → minor 증가 -->
<body data-doc-version="4.1" data-doc-updated-at="2026-05-29T10:00:00+09:00">

<!-- 구조 대폭 변경 → major 증가 -->
<body data-doc-version="5.0" data-doc-updated-at="2026-05-29T10:00:00+09:00">
```

---

### [B5] ScrollSpy는 `section[id]` 또는 `h2[id]`, `h3[id]`를 기준으로 동작한다

문서 목차가 비어 있다면 HTML 섹션에 `id` 속성이 없는 것이다.

```html
<!-- ❌ id 없음 → 목차 미생성 -->
<section class="stage7-section prose-concept" data-prose="concept">

<!-- ✅ id 있음 → 목차 자동 생성 -->
<section class="stage7-section prose-concept" data-prose="concept" id="role">
```

---

## 💡 알아두면 좋은 사항

### [C1] `preparing: true` 문서는 JS에서 자동으로 비활성화된다

`stage7-shell.js`의 `DOCS` 객체에서 `preparing: true`로 표시된 문서는:
- 링크가 `javascript:void(0)`으로 처리됨
- 학습 경로에서 "준비 중" 뱃지 표시
- 이전/다음 버튼 계산 시 건너뜀

실제 파일을 만들었으면 `preparing: true`를 제거해야 클릭 가능해진다.

---

### [C2] `rootPrefix()`와 `depthPrefix()`는 다른 함수다

- `stage7-shell.js`의 `rootPrefix()`: Stage 7 Topbar/SideNav 에서 사용
- `common.js`의 `depthPrefix()`: Stage 5 Nav Tree에서 사용

두 함수는 비슷한 로직이지만 완전히 독립적으로 동작한다. 경로 계산 버그가 생기면 두 곳 모두 확인한다.

---

### [C3] `pages/abap.html`은 인라인 CSS와 JS를 포함하고 있다

현재 `pages/abap.html`에만 아코디언 스타일 인라인 CSS와 검색 연동 인라인 JS가 있다.  
다른 `pages/*.html`에는 없다. 이것은 기술 부채 상태다.

아코디언 스타일 및 검색 스크립트를 다른 Landing Page에도 적용하려면:
- 인라인 CSS → `stage7-shell.css`로 이동
- 인라인 JS → `stage7-shell.js` 또는 `common.js`로 이동

---

### [C4] `RELATED_DOCS`는 현재 4개 문서에만 명시되어 있다

`stage7-shell.js`의 `RELATED_DOCS` 상수에는 gateway, cds, ui5-odata-crud, ui5-messaging 4개만 관련 문서가 명시되어 있다.  
다른 문서는 같은 카테고리 첫 4개가 자동으로 표시된다.

---

### [C5] `docs/pull_request_template.md`는 GitHub PR 자동 템플릿이다

`docs/` 폴더 안에 있는 `pull_request_template.md`는 학습 문서가 아니다.  
GitHub이 PR 생성 시 이 파일을 자동으로 템플릿으로 사용한다.

---

### [C6] `data/` 폴더의 JSON 파일과 JS 하드코딩은 현재 동기화 상태

새 문서 추가 시 JSON과 JS 양쪽을 수동으로 맞춰야 한다.  
장기적으로는 JSON을 SSOT로 삼고 JS가 fetch하는 구조로 개선 필요.

---

_최초 작성: 2026-05-29_
