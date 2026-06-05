# SAP Learning Library · Stage 7 Codex 인수인계 메모

작성일: 2026-05-29 KST  
대상 저장소: `JungDS/sapui5`  
작업 방식: VS Code + Codex 기준  
배포자 표기: 정훈영

---

## 1. 현재 전환 방향

Stage 7의 핵심 목표는 기존 `v3/` HTML을 최신 운영 경로인 `docs/`로 점진적으로 이관하고, `pages/`는 영역별 Landing Page로 유지하며, 공통 Shell과 데이터 카탈로그를 기준으로 전체 링크를 정리하는 것이다.

운영 원칙은 다음과 같다.

- `README.md`: 짧은 운영 대시보드, 현재 상태와 최근 변경 요약만 기록한다.
- `README_ALL.md`: 상세 진행 이력, PR별 변경 내용, 운영 기준, 재개 기준을 기록한다.
- `docs/**`: 최신 운영 문서 경로다.
- `pages/**`: 영역별 Landing Page 경로다.
- `v3/**`: 기존 URL 유지 또는 안내/redirect 정책 대상이다.
- `archive/v1`, `archive/v2`, `archive/v3`: legacy 원본 보존 경로다.
- 모든 배포용 문서에는 `배포자: 정훈영` 표기를 유지한다.

---

## 2. 지금까지 완료된 주요 PR 흐름

### PR #25 · Stage 7 로드맵 문서 docs 이관

- 로드맵 문서 3개를 `docs/roadmap/` 운영 경로로 이관했다.
- 대상:
  - `docs/roadmap/developer-learning-roadmap.html`
  - `docs/roadmap/development-tools-overview.html`
  - `docs/roadmap/debugging-troubleshooting-guide.html`

### PR #26 · Stage 7 Home inline CSS 분리

- `index.html`의 Home 전용 inline CSS를 `assets/stage7-home.css`로 분리했다.

### PR #27 · Stage 7 로드맵 v3 원본 archive 보존

- 로드맵 v3 원본 3개를 `archive/v3/00-roadmap/`에 보존했다.
- 기존 v3 URL은 최신 docs 안내 페이지 성격으로 정리했다.

### PR #28 · Archive legacy v1 and v2 folders

- 루트 `v1/`, `v2/` 파일들을 각각 `archive/v1/`, `archive/v2/`로 이동했다.
- 내용 변경 없이 경로 보존 중심으로 처리했다.

### PR #29 · Stage 7 ABAP 핵심 문서 docs 운영화 1차

- ABAP 핵심 문서 3개를 `docs/abap/` 운영본으로 생성했다.
- 대상:
  - `docs/abap/abap-classic-report-itab-alv.html`
  - `docs/abap/abap-new-syntax.html`
  - `docs/abap/cds-to-odata.html`
- 기존 v3 원본은 `archive/v3/01-abap/`에 보존했다.

### PR #30 / #35 · ABAP docs Navigation 연결

주의: PR 번호가 대화 중 혼선이 있었다. GitHub 상에서는 PR #35가 “Stage 7 ABAP docs navigation links 정리”로 merge된 상태다.

- `assets/stage7-shell.js`에서 ABAP 핵심 3개 문서 링크를 docs 기준으로 변경했다.
- `pages/abap.html`에서 ABAP 핵심 3개 카드/추천 링크를 docs 기준으로 변경했다.
- 기존 v3 경로는 `legacyHref`로 보존했다.

### PR #31 · Stage 7 운영 문서 매핑 데이터 추가

- `data/stage7-operating-docs-map.json` 추가.
- ABAP 운영 문서와 legacy/archive 경로의 매핑 기준을 정리했다.

### PR #32 · README 진행 이력 보강

- `README.md`: 간략 대시보드 업데이트.
- `README_ALL.md`: PR #25~#31 상세 이력 및 재개 기준 보강.

### PR #34 · Stage 7 ABAP catalog paths docs 기준 정리

주의: 사용자가 말한 카탈로그 반영 PR은 #34다. #33은 별도 cleanup PR이었다.

- `data/site-map.json`의 `abap-classic`, `abap-new-syntax`, `cds-odata`를 docs 경로로 변경.
- `data/document-catalog.json`의 동일 3개 항목을 docs 경로로 변경.
- 기존 v3 경로는 `legacyHref`/`legacyPath` 또는 `legacy_href`/`legacy_path`로 보존.
- 보조 파일:
  - `data/stage7-abap-catalog-update-targets.json`
  - `tools/stage7-update-abap-catalog-paths.mjs`

### PR #35 관련 최신 상황

사용자는 “PR #35 merge 완료”라고 했지만, GitHub 상 PR #35는 ABAP 핵심 3개 Navigation 연결 PR로 확인되었다. 이후 RAP End-to-End 문서 작업이 `codex/handoff-stage7-criteria` 브랜치에 누적된 상태에서 PR 생성 시 “이미 열린 PR이 존재” 오류가 있었다.

따라서 VS Code/Codex에서 시작하기 전 반드시 아래를 확인한다.

```bash
git fetch origin
git checkout main
git pull origin main
git log --oneline -5
```

그리고 다음 파일이 main에 실제 존재하는지 확인한다.

```bash
ls docs/abap/rap-end-to-end.html
ls archive/v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html
```

존재하면 RAP End-to-End docs 운영화는 이미 반영된 것으로 보고 연결 작업부터 진행한다.  
존재하지 않으면 아래 “RAP End-to-End 운영화 재적용” 절차를 먼저 수행한다.

---

## 3. 현재 완료된 운영 문서 상태

### Roadmap

- `docs/roadmap/developer-learning-roadmap.html`
- `docs/roadmap/development-tools-overview.html`
- `docs/roadmap/debugging-troubleshooting-guide.html`

### ABAP 기본/중심 문서

- `docs/abap/gateway-odata-v2-crud.html`
- `docs/abap/abap-classic-report-itab-alv.html`
- `docs/abap/abap-new-syntax.html`
- `docs/abap/cds-to-odata.html`

### RAP End-to-End

대화 중 생성된 목표 파일:

- `docs/abap/rap-end-to-end.html`
- `archive/v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html`

단, PR 번호 혼선으로 main 반영 여부는 로컬에서 반드시 확인해야 한다.

---

## 4. 앞으로 진행해야 할 작업 목록

작은 단위 PR 원칙을 따른다.

### 4.1 RAP End-to-End main 반영 확인 또는 재적용

#### 확인

```bash
ls docs/abap/rap-end-to-end.html
ls archive/v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html
```

#### 없으면 수행

- `docs/abap/rap-end-to-end.html` 생성.
- 원본 `v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html`을 `archive/v3/01-abap/`로 복사 보존.
- docs 운영본은 `stage7-shell` 적용.
- `body` 메타데이터 예:

```html
<body
  data-page-type="doc"
  data-active-category="abap"
  data-doc-id="rap-e2e"
  data-doc-title="RAP End-to-End 입문"
  data-doc-version="4.0"
  data-doc-created-at="2026-05-28T23:55:00+09:00"
  data-doc-updated-at="2026-05-28T23:55:00+09:00"
  data-distributor="정훈영">
```

#### PR 권장

- PR 제목: `Stage 7 RAP End-to-End docs 운영화`
- 범위:
  - `docs/abap/rap-end-to-end.html`
  - `archive/v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html`

### 4.2 RAP End-to-End 연결 PR

RAP End-to-End docs 운영본이 main에 존재한다는 전제에서 진행한다.

변경 파일:

- `assets/stage7-shell.js`
- `pages/abap.html`

목표:

- `rap-e2e` href를 `docs/abap/rap-end-to-end.html`로 변경.
- 기존 v3 경로는 `legacyHref`로 보존.
- `pages/abap.html`의 RAP End-to-End 카드 링크를 docs 경로로 변경.

권장 PR 제목:

```text
Stage 7 RAP End-to-End navigation 연결
```

### 4.3 RAP End-to-End catalog 연결 PR

변경 파일:

- `data/site-map.json`
- `data/document-catalog.json`

목표:

- `rap-e2e` href/path를 docs 기준으로 변경.
- 기존 v3 경로 보존.

예상 값:

```json
{
  "href": "../docs/abap/rap-end-to-end.html",
  "path": "docs/abap/rap-end-to-end.html",
  "file": "rap-end-to-end.html",
  "legacyHref": "../v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html",
  "legacyPath": "v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html"
}
```

`site-map.json`에서는 기존 스타일에 맞춰 snake_case 필드를 사용한다.

```json
{
  "legacy_href": "../v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html",
  "operating_path": "docs/abap/rap-end-to-end.html",
  "legacy_path": "v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html"
}
```

권장 PR 제목:

```text
Stage 7 RAP End-to-End catalog 경로 정리
```

### 4.4 README / README_ALL 갱신 PR

위 RAP End-to-End 작업이 merge되면 기록을 남긴다.

`README.md`:

- 최근 변경 1~2줄 추가.
- Stage 7 작업 상태에서 RAP End-to-End 운영화/연결 완료 표시.

`README_ALL.md`:

- 상세 PR 이력 추가.
- 재개 기준 업데이트.

권장 PR 제목:

```text
Stage 7 RAP End-to-End 진행 이력 기록
```

### 4.5 RAP Action 문서 운영화

대상 원본:

```text
v3/01-abap/rap-action-invocation-grouping-v3.html
```

운영본 권장 경로:

```text
docs/abap/rap-action.html
```

archive 경로:

```text
archive/v3/01-abap/rap-action-invocation-grouping-v3.html
```

필수 내용:

- RAP Action 호출 단위.
- 다건 선택 시 keys가 어떻게 전달되는지.
- Action 결과 반환 구조.
- UI 버튼과 Action의 관계.
- 단일/다건 처리 시 주의점.

권장 PR을 두 개로 분리:

1. `Stage 7 RAP Action docs 운영화`
2. `Stage 7 RAP Action navigation/catalog 연결`

### 4.6 ABAP Cloud 문서 운영화

대상 원본:

```text
v3/01-abap/abap-cloud-app-development-summary-v3.html
```

운영본 권장 경로:

```text
docs/abap/abap-cloud.html
```

archive 경로:

```text
archive/v3/01-abap/abap-cloud-app-development-summary-v3.html
```

필수 내용:

- ABAP Cloud의 목적.
- Clean Core.
- Released API 사용.
- Classic ABAP과의 차이.
- CDS/RAP/Service Binding 중심 개발 흐름.
- S/4HANA Public Cloud와 Private Cloud 관점 차이.

권장 PR을 두 개로 분리:

1. `Stage 7 ABAP Cloud docs 운영화`
2. `Stage 7 ABAP Cloud navigation/catalog 연결`

### 4.7 ABAP 영역 최종 검수

검수 대상:

- `pages/abap.html`
- `assets/stage7-shell.js`
- `data/site-map.json`
- `data/document-catalog.json`
- `data/stage7-operating-docs-map.json`
- `docs/abap/*.html`
- `archive/v3/01-abap/*`

검수 기준:

- docs 운영본은 모두 `common.css`, `stage7-shell.css`, `common.js`, `stage7-shell.js`를 연결한다.
- `data-doc-id`가 `stage7-shell.js`, `site-map.json`, `document-catalog.json`과 일치한다.
- `href`는 docs 기준이다.
- legacy 경로는 보존되어 있다.
- Landing Page 카드 링크가 최신 docs로 이동한다.
- README/README_ALL에 진행 이력이 남아 있다.

---

## 5. Codex 작업 시 주의사항

### 5.1 PR 번호 주의

- #33은 cleanup PR이었다.
- #34가 ABAP catalog 경로 정리 PR이다.
- #35는 GitHub 기준 ABAP docs navigation links 정리 PR로 확인되었다.
- 사용자가 #36은 샘플 추가 용도로 사용했다고 했으므로, 앞으로 새 PR 번호는 GitHub에서 실제 생성되는 번호를 기준으로 본다.
- 문서나 커밋 메시지에서 PR 번호를 미리 확정해 쓰지 말고, 생성 후 실제 번호를 README에 반영한다.

### 5.2 작은 단위 PR 원칙

앞으로는 아래 순서를 지킨다.

```text
문서 1개 docs 운영화
→ PR
→ merge
→ navigation 연결
→ PR
→ merge
→ catalog 연결
→ PR
→ merge
→ README 기록
→ PR
```

단, 너무 작은 수정이 많아지면 navigation + catalog를 한 PR로 묶어도 된다. 다만 문서 본문 신규 작성과 데이터/링크 연결은 가능하면 분리한다.

### 5.3 README 기록 원칙

- `README.md`: 현재 단계, 최근 변경, 주요 링크만 간단히.
- `README_ALL.md`: PR별 상세 이력, 변경 파일, 재개 기준, 주의사항.
- PR을 여러 개 진행한 뒤 README를 나중에 몰아서 쓰지 않는다.
- 적어도 2~3개 PR마다 README_ALL은 갱신한다.

### 5.4 SAP 문서 작성 원칙

- S/4HANA 기준으로 작성한다.
- SAP GUI 800 기준 설명이 필요한 경우 해당 기준을 전제로 한다.
- 표준 동작과 아키텍처 의도를 설명한다.
- 추정이 필요한 내용은 `[ 추정 ]`으로 표시한다.
- RAP/CDS 예제에는 Interface View `ZI_*`와 Projection View `ZC_*`를 함께 제시한다.
- 초급자용이라도 지나치게 단순화하지 않는다.
- 실무 위험, 주의점, 체크리스트를 포함한다.

### 5.5 HTML 문서 작성 원칙

- 밝고 깔끔한 교재형 구조 유지.
- `stage7-shell` 적용.
- 본문은 가능한 `section` 단위로 나눈다.
- 주요 섹션에는 `id`를 부여해 우측 navigation이 동작할 수 있게 한다.
- 하단 또는 메타데이터에 배포자 `정훈영` 유지.
- 링크 경로는 문서 위치 기준 상대경로를 정확히 맞춘다.

### 5.6 Git 작업 주의

VS Code/Codex 시작 전 항상:

```bash
git checkout main
git pull origin main
git status
```

새 작업은 별도 브랜치 사용:

```bash
git checkout -b stage7-rap-e2e-linking
```

PR merge 후 다음 작업 전:

```bash
git checkout main
git pull origin main
```

기존 `codex/handoff-stage7-criteria` 브랜치는 대화 중 여러 번 재사용되어 히스토리가 꼬일 수 있으므로, VS Code에서는 새 브랜치를 명확히 만드는 것이 안전하다.

---

## 6. 바로 다음 권장 작업

사용자가 VS Code Codex로 이어갈 경우, 가장 먼저 할 작업은 다음이다.

### Step A. main에 RAP End-to-End 운영본이 있는지 확인

```bash
ls docs/abap/rap-end-to-end.html
ls archive/v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html
```

### Step B. 존재하면 연결 PR부터 진행

브랜치:

```bash
git checkout -b stage7-rap-e2e-linking
```

수정 파일:

```text
assets/stage7-shell.js
pages/abap.html
```

목표:

```text
rap-e2e → docs/abap/rap-end-to-end.html
legacyHref → v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html
```

### Step C. 존재하지 않으면 운영본 PR부터 재생성

브랜치:

```bash
git checkout -b stage7-rap-e2e-docs
```

수정 파일:

```text
docs/abap/rap-end-to-end.html
archive/v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html
```

---

## 7. 최종 목표 상태

ABAP 영역에서 최종적으로 다음 문서들이 모두 docs 운영 기준으로 정리되어야 한다.

```text
docs/abap/gateway-odata-v2-crud.html
docs/abap/abap-classic-report-itab-alv.html
docs/abap/abap-new-syntax.html
docs/abap/cds-to-odata.html
docs/abap/rap-end-to-end.html
docs/abap/rap-action.html
docs/abap/abap-cloud.html
```

그리고 다음 파일들이 모두 같은 경로를 바라봐야 한다.

```text
pages/abap.html
assets/stage7-shell.js
data/site-map.json
data/document-catalog.json
data/stage7-operating-docs-map.json
README.md
README_ALL.md
```
