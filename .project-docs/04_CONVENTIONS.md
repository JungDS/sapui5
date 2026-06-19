# 04. CONVENTIONS — 파일 수정 규칙

> 📅 **최종수정: 2026-06-20 03:35 KST**
> 🎯 **목적:** 파일을 만들거나 고칠 때 반드시 지키는 규칙.
> 📖 **읽을 때:** 실제 수정 직전.
> ⚡ **TL;DR:** 타임스탬프, 운영 fragment 인라인 금지, 명시적 git add, 작업 중 `git pull/fetch` 금지.

## R1 타임스탬프

수정하는 파일은 최상단 최종수정 시각을 `YYYY-MM-DD HH:MM KST` 형식으로 갱신한다.

| 파일 | 형식 |
|---|---|
| `.md` | `> 📅 **최종수정: YYYY-MM-DD HH:MM KST**` |
| `.css` | `/* <목적> \| 최종수정 YYYY-MM-DD HH:MM KST \| v... */` |
| `.js` / `.mjs` | `// <목적> \| 최종수정 YYYY-MM-DD HH:MM KST \| v...` |
| `.html` | 최상단 주석 + 가능하면 `body[data-doc-updated-at]` |

`.githooks/pre-commit`이 staged `.md/.css/.js/.mjs/.html`의 타임스탬프를 커밋 직전 자동 갱신한다. JSON은 주석 불가라 대상이 아니다.
`.project-plans/**/PLAN.md`처럼 YAML frontmatter가 필요한 파일은 frontmatter 다음 제목 아래에 타임스탬프를 둔다.

## R2 운영 HTML 메타데이터

운영 HTML의 `<body>`에는 `data-page-type`, `data-active-category`, `data-doc-id`, `data-doc-title`, `data-doc-version`, `data-doc-created-at`, `data-doc-updated-at`, `data-distributor`, `data-prose-root`를 유지한다.

- `data-doc-id`는 `assets/shell.js`의 `DOCS` 키와 같아야 한다.
- `docs/abap/lesson-viewer.html`은 템플릿이라 `DOCS`에 등록하지 않는다.

## R3 운영 Footer

운영 HTML은 하단 footer를 유지한다. 현재 CSS 클래스는 `.stage7-footer` 계열을 쓴다. de-naming은 별도 디자인 정리 작업에서 footer까지 함께 처리한다.

## R4 경로와 네이밍

- `.project-docs/` 루트 문서는 `NN_TITLE.md` 형식을 쓴다. 새 루트 문서는 `00_INDEX.md`에 등록한다.
- 운영 문서는 `docs/<category>/<filename>.html`에 둔다.
- Lesson 본문은 `docs/abap/lesson-content/<ID>.html` fragment로 둔다.
- `archive/`는 읽기 전용 보존 영역이다. 새 보존본 추가는 가능하지만 기존 tracked archive 파일은 수정하지 않는다.

## R5 운영 Lesson fragment

대상: `docs/abap/lesson-content/*.html`

- `<script>`, `<style>`, 인라인 `style` 금지.
- 새 동작은 공통 `assets/abap-lesson-viewer.js` 또는 명확히 네임스페이스된 viewer 보조 모듈에 둔다. 새 스타일은 공통 CSS에 두고, 단발 실험은 `sample/`/v4에서 먼저 검증한다.
- 코드블록은 표준 `<pre><code>`를 사용하고, 필요 시 `tools/format-abap-code.mjs`를 실행한다.
- 본문 `data-glossary` 용어는 `reference/abap_glossary.json`에 있어야 한다.
- T-code는 `category:"tcode"`와 `used_in_lessons`까지 연결한다.
- 샘플 선택, v4, 외부 샘플 경로는 [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md)가 SSOT다.

## R6 샘플/실험 파일

`sample/`과 `sample/learning-methods-v4` standalone 실험 파일은 빠른 검토를 위해 인라인 CSS/JS를 허용한다. 외부 Academy 샘플(`C:\ui5\study\sap-dev-academy\sample`)은 참고 전용이며, 필요한 실험은 v4 또는 운영 공통 자산으로 옮겨 진행한다. 운영 Lesson으로 승격할 때만 R5를 적용해 공통 CSS/JS로 분리한다.

## R7 plans

- 폴더: `.project-plans/YYYYMM/MMDD_HHMM_<slug>/`
- 파일: `PLAN.md`, `TASKS.md`, `RESULTS.md`
- `.project-plans/INDEX.md`에 한 줄 색인을 추가한다.
- 결과의 장기 SSOT는 git이다. plans는 가벼운 작업 스냅샷이다.

## R8 이미지

- 보관: `assets/images/`
- 파일명: `ch[Chapter]-les[Lesson]-[일련]-[설명].png`
- Lesson 비종속 공통 이미지는 `common-[설명].png`
- 운영 Lesson에는 공통 figure/image 클래스를 사용하고 인라인 스타일을 넣지 않는다.

## R9 Git

- 로컬 작업 디렉토리가 SSOT다.
- 일반 작업 중 `git pull`, `git fetch`, `git add -A` 금지.
- stage는 내가 수정/생성한 파일만 explicit path로 한다.
- 커밋 본문에는 `AI-Author: <모델명>`을 남긴다.
- PR은 브랜치에서 만든다. `main` 직접 수정은 하지 않는다.
- 예외: 사용자가 "PR을 merge했다"고 알리고 로컬 동기화를 요청/동의한 경우에만, working tree clean + active claim 없음 확인 후 `main`을 원격 `main`에 fast-forward로 맞출 수 있다. 절차는 `git switch main` → `git fetch origin main` → `git merge --ff-only origin/main` → `git status --short` 확인 순서다. 이때도 `git pull`은 쓰지 않는다. 충돌/비 fast-forward가 나오면 중단하고 사용자에게 보고한다.

## R10 수정 전 리딩

공통 자산(`base.css`, `sandbox.js`, `abap-lesson-viewer.*` 등)을 수정할 때는 관련 파일을 먼저 읽고 기존 패턴을 따른다. 관련 없는 리팩터링은 하지 않는다.
