# 01. AI SYNC — 단일 목표 · 완료 정의 · 행동 규칙

> 📅 **최종수정: 2026-06-15 11:01 KST**
> 🎯 **목적:** 지금 무엇을, 어떤 제약 아래 해야 하는지. AI 인계 허브.
> 📖 **읽을 때:** 모든 작업 시작 전 (필수, 최우선). 다른 AI가 투입돼도 여기부터.
> ⚡ **TL;DR:**
> - 목표는 **단 하나**: Track 1(THEORY-01~21) 전면 백지화 → **NotebookLM 보강 + `sample/learning-methods-v3` UI로 처음부터 리빌딩**.
> - 접근: **'처음부터 새로 짠다'** — 텍스트 나열 금지, v3 시각/상호작용 컴포넌트로.
> - 작업 전 아래 **행동 체크리스트**를 자가 검증한 뒤 시작한다.

---

## 🎯 단일 집중 목표 (Single Overarching Goal)

**"Track 1 (THEORY 시리즈) 전면 리빌딩 및 고품질화 (v3 기반)"**

Track 1(THEORY-01~21)의 모든 Lesson 페이지를 `sample/learning-methods-v3`의 시각화/상호작용 수단으로 **혁신적인 교육 콘텐츠로 재창조**한다. 모든 페이지는 **'처음부터 새로 짠다'** 는 마인드로 접근한다.

> 진행 현황·다음 단계는 [02_PROGRESS.md](02_PROGRESS.md)에서 확인·기록한다. 다른 목표·로드맵(Track 2 등)은 현재 **범위 밖**.

## ✅ 완료 정의 (Definition of Done) — Lesson 1개 기준

한 Lesson은 아래가 **모두** 충족됐을 때만 "완료"다:
- [ ] **내용 보강**: 연결된 NotebookLM에 질의해 누락 개념·심화 예제·주의사항을 채웠다.
- [ ] **UI 혁신**: 단순 텍스트 나열이 아니라 `sample/learning-methods-v3`의 적절한 시각화/실습/퀴즈/코드 컴포넌트를 적용했다.
- [ ] **디자인 토큰 준수**: `reference/design_variants.json` 확정 토큰(CSS 클래스·구조)을 따랐다.
- [ ] **글로서리 패리티**: 본문 `data-glossary` 용어가 `reference/abap_glossary.json`에 전부 등록(미정의 0건).
- [ ] **검증**: 콘솔 오류 0건 + 인터랙션 동작 확인.

작업 단위 = **한 번에 하나의 Lesson**만 집중해 완벽히 리빌딩한다.

## 🧰 도구 (Tools) — load-bearing, 변경 금지
- **NotebookLM 노트 ID**: `ad0e9cde-4dca-451e-b455-de200a9ed7b7` — Lesson 작업 전 반드시 질의해 내용 보강 근거로 삼는다. (SAP 공식 문서로 재검증)
- **UI 템플릿**: [`sample/learning-methods-v3`](../sample/learning-methods-v3/README.md) — 44개 시각화/실습/퀴즈/코드 다이어그램. 고를 때 → [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md).
- **디자인 토큰 SSOT**: `reference/design_variants.json` (+ v3의 `design-choices.json`). **무조건 준수.**

---

## 🤖 작업 전 행동 체크리스트 (시작 전 자가 검증)

1. [ ] 대상 Lesson 1개로 범위를 좁혔다.
2. [ ] **[02_PROGRESS](02_PROGRESS.md) `🔄 진행 중`에 내 줄을 먼저 기록**했다 — Lesson · 내 AI명 · 시작 KST. (시작 전 필수 — 다른 AI가 같은 Lesson을 잡지 않도록. 이미 점유된 Lesson은 건드리지 않는다.)
3. [ ] 작업 계획을 [plans/](plans/)에 폴더로 만들었다(`PLAN.md`/`TASKS.md`/`RESULTS.md`).
4. [ ] NotebookLM 질의 → 보강 포인트를 확보했다.
5. [ ] v3에서 쓸 학습수단을 골랐다([06](06_LEARNING_METHODS.md)).

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
