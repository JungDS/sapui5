# 01. AI SYNC — 단일 목표 · 완료 정의 · 행동 규칙

> 📅 **최종수정: 2026-06-17 04:35 KST**
> 🎯 **목적:** 지금 무엇을, 어떤 제약 아래 해야 하는지. AI 인계 허브.
> 📖 **읽을 때:** 모든 작업 시작 전 (필수, 최우선). 다른 AI가 투입돼도 여기부터.
> ⚡ **TL;DR:**
> - 목표는 **단 하나**: Track 1(THEORY-01~21) 전면 백지화 → **NotebookLM 보강 + `sample/learning-methods-v3` UI로 처음부터 리빌딩**.
> - 접근: **'처음부터 새로 짠다'** — 텍스트 위주보다 v3 시각/상호작용 컴포넌트 위주로 구성한다. 상황에 따라 v3 시각/상호작용 컴포넌트에 없는 시각/상호작용도 추가할 수 있다.
> - **이론 ↔ 실습 병행이 기본값**: 개념을 설명했으면 곧바로 그 페이지에서 **직접 해보게** 한다.
> - **코드가 나오면 = 그 페이지에서 시뮬레이션 실습 필수**. 정적 코드 블록만 나열하면 미완.
> - **SAP GUI 환경 Lesson은 T-code가 1급 시민**: 본문 트랜잭션은 글로서리 등록 → 칩 바 노출 → 지도 자동 반영(아래 DoD).
> - 작업 전 아래 **행동 체크리스트**를 자가 검증한 뒤 시작한다.
>
> ⚠️ **2026-06-17 04:00 기준선 리셋**: NotebookLM 품질 향상에 따라 **전부 미착수로 되돌렸다**. [02_PROGRESS](02_PROGRESS.md)에서 0부터 다시 진행한다.

---

## 🎯 단일 집중 목표 (Single Overarching Goal)

**"Track 1 (THEORY 시리즈) 전면 리빌딩 및 고품질화 — 이론·실습 병행 (v3 기반)"**

Track 1(THEORY-01~21)의 모든 Lesson 페이지를 `sample/learning-methods-v3`의 시각화/상호작용 수단으로 **혁신적인 교육 콘텐츠로 재창조**한다. 모든 페이지는 **'처음부터 새로 짠다'** 는 마인드로 접근한다. 단, v3에 없지만 상황에 어울리는 시각화/상호작용 수단도 추가가 가능하다. 대신 이 경우 반드시 [02_PROGRESS](02_PROGRESS.md)에도 신규 시각화/상호작용 수단 적용 사실을 기록한다.

핵심은 **"읽고 끝"이 아니라 "읽고 → 곧바로 해본다"**다. 이 커리큘럼은 대부분 SAP GUI 환경의 Classic ABAP을 다루므로:

- **코드는 반드시 실습으로 이어진다.** ABAP/SQL/설정 코드가 한 줄이라도 소개되면, 사용자가 **그 웹페이지 안에서 직접 실행·조작해보는 시뮬레이션**(가상 SAP GUI Sandbox·Step Debugger·빈칸 코드·오류 찾기·예상 로그 비교 등)을 함께 넣어 흥미를 유도한다.
- **T-code는 학습의 뼈대다.** 어떤 화면/도구(SE38·SE80·SE11 …)로 들어가 무엇을 하는지를 초심자가 따라 할 수 있을 만큼 구체적으로 다루고, 글로서리·칩 바·[T-code 지도](../docs/abap/tcode-map.html)로 누적 관리한다.

> 진행 현황·다음 단계는 [02_PROGRESS.md](02_PROGRESS.md)에서 확인·기록한다. 다른 목표·로드맵(Track 2 등)은 현재 **범위 밖**.

## ✅ 완료 정의 (Definition of Done) — Lesson 1개 기준

한 Lesson은 아래가 **모두** 충족됐을 때만 "완료"다:
- [ ] **내용 보강**: 연결된 NotebookLM에 질의해 누락 개념·심화 예제·주의사항을 채웠다. (SAP 공식 문서로 재검증)
- [ ] **UI 혁신**: 단순 텍스트 나열이 아니라 `sample/learning-methods-v3`의 적절한 시각화/실습/퀴즈/코드 컴포넌트를 적용했다.
- [ ] **코드 = 실습 시뮬레이션 (필수)**: 본문에 코드가 1줄이라도 나오면, 그 코드를 사용자가 **이 페이지에서 직접 실행·조작**하는 시뮬레이션을 넣었다(가상 SAP GUI Sandbox `interactive-sandbox-simulator`, Step Debugger `step-debugger-timeline`, 빈칸 코드 `fill-blank-code`, 오류 찾기 `bug-hunt-mission`, 예상 로그 비교 `expected-log-comparison`, ABAP Editor Mockup 등 중 적합한 것). **정적 코드 블록만 있으면 미완.**
- [ ] **T-code 노출 (필수)**: 본문에 등장하는 트랜잭션마다 ⓐ `reference/abap_glossary.json`에 `category:"tcode"`로 등록(없으면 신규 추가), ⓑ 본문에서 `<span class="glossary-term" data-glossary="키">`로 감싸 상단 **T-code 칩 바**에 뜨게, ⓒ 그 글로서리 항목 `used_in_lessons`에 **현재 Lesson ID 추가** → [T-code 지도](../docs/abap/tcode-map.html)에 자동 반영. SAP GUI 진입 경로(어느 T-code로 들어가 무엇을 하는지)를 초심자가 따라 할 수준으로 설명한다.
- [ ] **디자인 토큰 준수**: `reference/design_variants.json` 확정 토큰(CSS 클래스·구조)을 따랐다.
- [ ] **글로서리 패리티**: 본문 `data-glossary` 용어가 `reference/abap_glossary.json`에 전부 등록(미정의 0건).
- [ ] **검증**: 콘솔 오류 0건 + 인터랙션(시뮬레이션 포함) 동작 확인.

작업 단위 = **한 번에 하나의 Lesson**만 집중해 완벽히 리빌딩한다.

> 🔎 **반면교사 (실제 사례):** 이전 라운드의 `THEORY-02-M01`("첫 ABAP 프로그램 생성")은 정작 핵심인 **SE38/SE80로 어떻게 프로그램을 만드는지** 설명이 빈약했고 실습 시뮬레이션도 없었다(작성: Claude Opus 4.8). 위 "코드=실습"·"T-code 노출"은 바로 이런 미흡을 막기 위한 기준이다 — 재빌딩 시 SE38·SE80 진입과 첫 프로그램 작성을 시뮬레이션으로 직접 해보게 한다.

## 🧰 도구 (Tools) — load-bearing, 변경 금지
- **NotebookLM 노트 ID**: `ad0e9cde-4dca-451e-b455-de200a9ed7b7` — Lesson 작업 전 반드시 질의해 내용 보강 근거로 삼는다. (SAP 공식 문서로 재검증) 고품질 답변하도록 설정되어 답변 수신까지 소요되는 시간을 고려해 넉넉한 Timeout을 설정하고 기다린다.
  - **질의 방법(권장): `nlm` CLI.** `nlm notebook query ad0e9cde-4dca-451e-b455-de200a9ed7b7 "<질문>"` (`--json`, 후속질문은 `-c <conversation_id>`로 세션 유지). 응답에 citation·`cited_text`까지 와서 SAP 교재(BC100/S4D40x 등) 근거 추적이 된다.
  - ⚠️ **NotebookLM MCP(`mcp__notebooklm__*`)는 멀티-AI 동시작업 시 헤드리스 Chrome 프로필 잠김으로 실패**할 수 있다(→ [05 P16](05_PITFALLS.md)). `nlm` CLI는 브라우저를 안 띄우고 RPC를 직접 호출해 충돌이 없다 — **여러 AI가 동시에 써도 안전**하니 기본으로 `nlm`을 쓴다.
- **UI 템플릿**: [`sample/learning-methods-v3`](../sample/learning-methods-v3/README.md) — 44개 시각화/실습/퀴즈/코드 다이어그램. 고를 때 → [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md).
- **디자인 토큰 SSOT**: `reference/design_variants.json` (+ v3의 `design-choices.json`). **무조건 준수.**
- **T-code 시스템 (단일목표의 일부)**:
  - 글로서리 SSOT: `reference/abap_glossary.json` — `category:"tcode"` 항목이 T-code 마스터(현재 63개: Classic 개발 + Fiori/Launchpad + Gateway OData V2/V4). 새 트랜잭션은 같은 스키마(`category`·`tcode`·`desc`·`everyday_analogy`·`used_in_lessons:[]`)로 추가.
  - 칩 바: 각 Lesson 상단에 "이번 Lesson 트랜잭션 코드"를 본문 `data-glossary`에서 자동 수집(신규/복습 구분). 렌더링은 `assets/abap-lesson-viewer.js` `renderTcodeBar()`.
  - 누적 지도: [`docs/abap/tcode-map.html`](../docs/abap/tcode-map.html) — `used_in_lessons`로 "처음 등장/다시 쓰임"을 자동 표기. Lesson 뷰어 사이드내비의 "지금까지 배운 T-code"가 `?upto=현재Lesson`으로 연결.
  - **운영 규칙**: T-code를 Lesson에 노출하려면 글로서리에서 그 항목의 `used_in_lessons`에 Lesson ID만 추가하면 된다(박스 수기 작성 금지).

---

## 🤖 작업 전 행동 체크리스트 (시작 전 자가 검증)

1. [ ] 대상 Lesson 1개로 범위를 좁혔다.
2. [ ] **[02_PROGRESS](02_PROGRESS.md) `🔄 진행 중`에 내 줄을 먼저 기록**했다 — Lesson · 내 AI명 · 시작 KST. (시작 전 필수 — 다른 AI가 같은 Lesson을 잡지 않도록. 이미 점유된 Lesson은 건드리지 않는다.)
3. [ ] 작업 계획을 [plans/](plans/)에 폴더로 만들었다(`PLAN.md`/`TASKS.md`/`RESULTS.md`).
4. [ ] NotebookLM 질의 → 보강 포인트를 확보했다.
5. [ ] v3에서 쓸 학습수단을 골랐다([06](06_LEARNING_METHODS.md)) — **코드가 있으면 그 코드용 시뮬레이션 수단을 반드시 1개 이상 포함**.
6. [ ] 이 Lesson에 등장하는 **T-code 목록을 뽑고**, 글로서리 등록 여부를 확인했다(미등록은 추가, 등록분은 `used_in_lessons`에 이 Lesson 추가 예정).

## 🚨 코드 안전 수칙 (위반 금지)
- 🚫 **코드 임의 생략 금지**: `// Abbreviated for brevity` 등으로 기존 코드를 요약/삭제하지 않는다.
- ✅ **공통 모듈 전체 사전 리딩**: `base.css`·`sandbox.js`·`abap-lesson-viewer.*` 등 공통 자산은 수정 전 **전체를 먼저 읽어** 중복을 막는다.
- ✅ **대규모 파일은 Chunk 분할**: 너무 길면 임의 요약 말고 단계 계획을 브리핑 후 부분 수정.
- ✅ **구조 변경은 스크립트 + spot-check**: 다수 파일 치환은 직접 타이핑 말고 스크립트로, 실행 후 산출물 1~2개를 눈으로 교차 검증.

## 📋 작업 종료 시
- [ ] **[02_PROGRESS](02_PROGRESS.md) 갱신** — 내 `🔄` 줄을 `✅ 완료 로그`로 옮기고 챕터 표 상태 반영.
- [ ] 모든 수정 파일 최상단에 `YYYY-MM-DD HH:MM KST`(시·분 포함) 갱신 → [04 R1](04_CONVENTIONS.md).
- [ ] 해당 plans 폴더의 `TASKS.md`/`RESULTS.md` 갱신.
- [ ] 내 파일만 `git add`(`-A` 금지) → `git commit`(`AI-Author: <모델명>`) → `git push`. **`git pull` 금지** — 로컬이 항상 기준([04 R12](04_CONVENTIONS.md)).

> 과거 작업 이력이 필요하면 git log와 [../archive/project-docs/20260615/](../archive/project-docs/20260615/)(구 `99_AI_WORK_LOG.md`·changelogs 포함)를 본다.
