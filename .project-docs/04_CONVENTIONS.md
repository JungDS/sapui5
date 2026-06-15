# 04. CONVENTIONS — 규칙과 컨벤션

> 📅 **최종수정: 2026-06-15 11:01 KST**
> 🎯 **목적:** 파일을 만들거나 고칠 때 반드시 따르는 규칙(R1~).
> 📖 **읽을 때:** 무엇이든 쓰기/수정하기 **직전**.
> ⚡ **TL;DR:**
> - **R1: 모든 파일은 수정 시 최상단에 `YYYY-MM-DD HH:MM KST`(시·분 필수) 기록.**
> - 운영 HTML은 `body` 메타데이터 + footer 의무. `data-doc-id` = `shell.js` `DOCS` 키.
> - Lesson 본문은 fragment — 인라인 `<script>/<style>/style` 금지, 공통 자산으로.
> - 진행 계획은 [plans/](plans/) 규칙(R10)을 따른다.

---

## R1 ★ 타임스탬프 (수정일자 + 시간) — 최우선
**모든 파일은 수정할 때마다 최상단에 "수정일자 + 수정시간(KST)"을 기록·갱신한다.** 하루에도 여러 번 수정되므로 **시·분까지 필수**. 날짜만 쓰는 것은 **금지**.

| 파일 종류 | 위치/형식 |
|---|---|
| `.md` (본 문서 세트, plans 산출물 등) | 첫 헤더 인용줄 `> 📅 **최종수정: YYYY-MM-DD HH:MM KST**` |
| `.css` | `/* <목적> | 최종수정 YYYY-MM-DD HH:MM KST | v1.2 */` |
| `.js` / `.mjs` | `// <목적> | 최종수정 YYYY-MM-DD HH:MM KST | v1.2` |
| `data/*.json` (주석 불가) | 짝꿍 `data/<name>.json.md` 상단에 `최종수정 … HH:MM KST` |

- 🚫 `2026-06-15 KST` (시간 없음) — 금지. ✅ `2026-06-15 10:15 KST`.
- 적용 범위 **프로젝트 전체**(`archive/`만 제외 — 읽기 전용). 신규 파일은 생성 시 헤더 포함, 기존 파일은 수정 시점에 부여/갱신.

## R2 HTML 메타데이터 (body) — 운영 문서
```html
<body
  data-page-type="doc"            <!-- home | landing | doc -->
  data-active-category="abap"     <!-- roadmap|abap|ui5|module|practice|reference -->
  data-doc-id="abap-classic"      <!-- shell.js DOCS 키와 정확히 일치 -->
  data-doc-title="..." data-doc-version="4.0"
  data-doc-created-at="2026-..T..+09:00" data-doc-updated-at="2026-..T..+09:00"
  data-distributor="정훈영" data-prose-root="true">
```
- 🚫 `data-doc-id` ≠ `DOCS` 키 → 이전/다음 내비 깨짐([05 P2](05_PITFALLS.md)).
- ✅ `data-distributor` 필수. 본문 블록은 가능한 `data-prose`(summary/concept/structure/practice/warning/checklist) 부여.

## R3 Footer 의무 (운영 HTML)
모든 운영 HTML 하단(`</main>` 뒤)에 배포자·저작권 footer 추가:
```html
<footer class="stage7-footer"><div class="stage7-footer__inner">
  <div class="stage7-footer__brand">SAP Developer Learning Library</div>
  <div class="stage7-footer__text"><div>배포자: 정훈영</div>
  <div class="stage7-footer__copy">&copy; 2026 JungDS. All rights reserved.</div></div>
</div></footer>
```

## R4 파일/경로 네이밍
- **`.project-docs/` 문서는 2자리 숫자 prefix 필수**: `NN_TITLE.md` (예외 없음). 새 문서는 다음 번호를 받고 [00_INDEX](00_INDEX.md) 지도에 등록한다. (plans 내부 산출물 `PLAN/TASKS/RESULTS`는 폴더로 묶이므로 제외.)
- 운영 문서: `docs/<category>/<filename>.html` (legacy `v1/v2/v3/`는 금지 → archive).
- 본문 섹션은 `id` 필수(ScrollSpy·TOC). 상대경로 규칙 → [03](03_ARCHITECTURE.md).
- 인라인 `<style>`/`<script>` 금지 → 공유 CSS/JS로(현 예외 부채: `pages/abap.html`, `index.html`).

## R5 버전 시맨틱
| 변경 | 처리 |
|---|---|
| 오타·링크·CSS·셸 | 버전 유지, `data-doc-updated-at`만 갱신 |
| 내용 보강·예제·흐름 | minor 4.0→4.1 |
| 구조 전면 개편 | major 4.x→5.0 |

## R6 Archive 규칙
- **원칙: 과거 버전 영구 이력의 SSOT는 git.** 별도 누적 archive는 두지 않는다.
- `archive/`의 추적된 파일은 **절대 수정 금지**(읽기 전용).
- 내부 운영 문서·자산 **일괄 정리/이동**은 `archive/<영역>/<YYYYMMDD>/` + **매핑 매니페스트** 동봉(예: `archive/project-docs/20260615/README.md`).
- 커밋 전 잦은 편집 되돌리기는 PreToolUse 훅 `.claude/hooks/snapshot-before-edit.mjs`가 `archive/_local/`(gitignore)로 스냅샷.

## R7 코드 파일 주석 헤더 (R1과 함께)
모든 `.css`·`.js`·`.mjs`는 최상단에 `<목적> | 최종수정 … KST | v…` 헤더(R1 표 참조). 수정 시 갱신.

## R8 data/ 설명 md
`data/*.json`은 주석 불가 → 운영 JSON마다 `data/<name>.json.md`로 역할·구조·동기화 규칙 설명. 현재: `site-map.json.md`, `document-catalog.json.md`, `stage7-operating-docs-map.json.md`.

## R9 이미지 자산 (구 09 흡수)
- 보관: `assets/images/`.
- 파일명: `ch[Chapter]-les[Lesson]-[일련]-[설명].png` (소문자+하이픈). 예 `ch01-les02-01-domain-creation.png`. Lesson 비종속 공통은 `common-[설명].png`.
- 삽입: 반응형 `<img>` — `<img src="../../assets/images/<name>.png" alt="..." style="max-width:100%;border-radius:6px;margin:16px 0;" />`.

## R10 ★ plans/ 규칙 (changelogs 대체)
진행 계획·작업·결과를 **한 곳에서** 관리. changelogs/ 폴더는 폐지.
- 폴더: `plans/YYYYMM/MMDD_HHMM_<slug>/` (**KST**, 정렬 가능, 사람이 읽는 slug).
- `PLAN.md` frontmatter: `status: planned|active|done|abandoned` / `goal` / `scope` / `branch`. 짧은 산문.
- `TASKS.md`: 체크박스/표(상태 플래그). **산문 금지.**
- `RESULTS.md`: 결과·검증을 표/플래그로. 산문 최소. **결과 SSOT는 git**, RESULTS는 가벼운 스냅샷.
- `assets/`: 작업용 이미지·초안.
- 새 폴더 생성 시 [plans/INDEX.md](plans/INDEX.md) 한 줄 색인에 추가.

## R11 Lesson 작성 규칙 (현 목표 핵심)
대상: `docs/abap/lesson-content/<ID>.html`. 완료 정의 → [01_AI_SYNC §DoD](01_AI_SYNC.md).
- **스타일**: 완전 초심자 + 캐주얼 톤. 흐름 `학습목표 콜아웃 → 지난 시간 연결 → 본문 → 실무 주의(warn) → 한눈에 정리`. 화면 표기는 **Chapter/Lesson**(JSON id는 키로 유지) — 사용자에게 `THEORY-01-M02` 같은 내부 ID 노출 금지.
- **fragment 제약**: `<script>`/`<style>`/인라인 `style` 금지. 새 동작 → `assets/abap-lesson-viewer.js`, 새 스타일 → `assets/abap-lesson-viewer.css`.
- **v3 디자인 토큰 강제**: `reference/design_variants.json` 확정 토큰 준수. 학습수단 선택 → [06](06_LEARNING_METHODS.md), 샘플 → `sample/learning-methods-v3`.
- **글로서리 완전 패리티**: 본문 `data-glossary` 용어는 `reference/abap_glossary.json`에 등록(title/desc/everyday_analogy/used_in_lessons/design_theme). 섹션마다 **미정의 0건 검증**.
- **코드블록**: 표준 `<pre><code>`로 작성 후 멱등 포맷터 `tools/format-abap-code.mjs` 1회 실행(Shiki 하이라이팅 + Copy). 인라인 style 주입 금지([05 P12](05_PITFALLS.md)).

## R12 Git 정책 / 멀티-AI
- **로컬이 SSOT**: 모든 AI가 같은 컴퓨터·같은 작업 디렉토리에서 작업한다. **로컬 파일이 항상 최신·기준**.
- 🚫 **`git pull`/`git fetch`로 가져오지 않는다** — GitHub는 소스 보관·퍼블리싱 전용. 원격을 가져오면 로컬과 꼬일 수 있다.
- ✅ 작업 후: 내 파일만 `git add`(`-A` 금지) → `git commit`(본문에 `AI-Author: <모델명>`) → `git push`.
- **충돌 방지**: 두 AI가 같은 Lesson을 동시에 작업하지 않는다. 시작 전 [02_PROGRESS](02_PROGRESS.md)에 claim(`🔄`)을 기록해 점유를 알린다. 상세 사고 → [05 P11](05_PITFALLS.md).
- 퍼블리싱: 브랜치 → PR(한국어) → 리뷰 → 머지. main 직접 수정 금지. 구조 변경 PR과 콘텐츠 PR 분리.
