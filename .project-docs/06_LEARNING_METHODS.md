# 06. LEARNING METHODS — v3 학습수단 카탈로그

> 📅 **최종수정: 2026-06-16 19:05 KST**
> 🎯 **목적:** Lesson을 만들 때 텍스트만 나열하지 않고, 주제에 맞는 시각화·실습·퀴즈·코드 컴포넌트를 고르는 가이드.
> 📖 **읽을 때:** Lesson 콘텐츠를 설계할 때(본문 쓰기 전에 흐름부터 설계).
> ⚡ **TL;DR:**
> - 흐름 설계: **읽기 → 보기 → 조작하기 → 풀어보기 → 정리하기**.
> - 한 Lesson = 핵심 시각자료 1~3개 + 실습 + 확인 퀴즈.
> - **🚨 코드가 나오면 = 그 페이지에서 시뮬레이션 실습 필수**(아래 §1.5). "정적 코드 블록만"은 미완([01 DoD](01_AI_SYNC.md)).
> - 실제 구현 샘플(44개)은 [`sample/learning-methods-v3`](../sample/learning-methods-v3/README.md). 디자인 토큰은 `reference/design_variants.json`.

## 1. 핵심 원칙
- 텍스트는 뼈대, 학습수단은 이해를 고정하는 장치.
- **이론 ↔ 실습 병행이 기본값**: 개념을 설명했으면 곧바로 그 페이지에서 직접 해보게 한다.
- 복잡한 개념일수록 단계 흐름(읽기→보기→조작→풀기→정리)을 만든다.
- 상태 변화·분기·런타임 흐름은 무거운 인터랙션으로 보상이 크다.
- `docs/abap/lesson-content/*.html`은 fragment → `<script>`/`<style>`/인라인 `style` 금지. 동작은 `assets/abap-lesson-viewer.js`, 스타일은 `assets/abap-lesson-viewer.css`로([04 R11](04_CONVENTIONS.md)).

## 1.5 🚨 코드 = 실습 시뮬레이션 (필수 규칙)
본문에 ABAP/SQL/설정 코드가 **1줄이라도** 나오면, 사용자가 **그 코드를 이 페이지 안에서 직접 실행·조작**하는 시뮬레이션을 반드시 함께 넣는다. 목적은 "흥미 유도 + 손으로 익히기". 코드 성격에 따라 아래에서 고른다:

| 코드 성격 | 추천 시뮬레이션 수단 (v3) |
|---|---|
| T-code 진입·화면 입력·실행 흐름 (예: SE38/SE80로 첫 프로그램) | 가상 SAP GUI Sandbox `interactive-sandbox-simulator`, ABAP Editor Mockup `abap-editor-mockup` |
| 실행 순서·이벤트·루프·분기 추적 | Step Debugger Timeline `step-debugger-timeline`, Breakpoint 체크리스트, 예상 로그 비교 `expected-log-comparison` |
| 구문 익히기·키워드 채우기 | 빈칸 코드 `fill-blank-code`, 코드 라인 매칭 `code-line-matching`, 코드 키워드 아코디언 |
| 안티패턴·디버깅 감각 | 오류 찾기 `bug-hunt-mission`, Bad/Good Hover Mapping, 성능 프로파일러 모의 |

- **정적 `shiki-copy-wrapper` 코드 블록만** 있고 위 시뮬레이션이 없으면 그 Lesson은 **미완**이다.
- 동작 로직은 이미 `abap-lesson-viewer.js`에 있다(`initSapSandbox`·`initDebugger`·`initPuzzleQuiz`·`initCodeTour`·`initEventTabs` 등) — 새 로직보다 기존 위젯 재사용을 우선한다.

## 2. v3 샘플 카테고리 (구현 출처)
`sample/learning-methods-v3/<category>/`에 standalone 샘플로 존재. 각 페이지 상단 A/B/C 시안 → `design-choices.json` 누적.

| 카테고리 | 대표 수단 |
|---|---|
| `foundations/` | 콜아웃, 스토리텔링, 미니 실습+완료조건, 공식 링크, 한눈에 정리, 접이식 해설, 치트시트 매트릭스 |
| `visuals/` | 탭형 다이어그램, Mermaid 흐름도, 코드↔다이어그램 비교, 상태 그리드, 관계도, 프로세스 플로우, 전후 비교, 배지, 현재 행 강조, SVG 아키텍처, **이미지 핫스팟**, **인터랙티브 차트** |
| `code-learning/` | ABAP Editor Mockup, 코드 키워드 아코디언, Bad/Good Hover Mapping, 빈칸 코드, 코드 라인 매칭, 오류 찾기, **성능 프로파일러 모의** |
| `interactive/` | Sandbox, Step Debugger Timeline, 의사결정 트리, 실무 체크리스트, Breakpoint 체크리스트, 예상 로그 비교, **아키텍처 조립기**, **단축키 시뮬레이터** |
| `quizzes/` | 드래그 퀴즈, 카드 분류, 순서 배열, 단답형, 플래시카드, 미니 시험, **O/X 타임어택** |
| `capstone/` | 미니 프로젝트 미션 |

(**볼드** = v3 신규 6종)

## 3. 수단 선택 가이드 (상황 → 수단)

| 학습 상황 | 추천 수단 |
|---|---|
| 복잡한 흐름/이벤트/아키텍처 | 탭형 점진 빌드업 다이어그램, Mermaid 흐름도, 코드↔다이어그램 좌우 비교 |
| 입력값·검증·화면 흐름 | 가상 SAP GUI Sandbox, 예상 로그 비교 |
| 안티패턴·리팩터링·코드리뷰 | Bad/Good Hover Mapping, 전/후 비교, 치트시트 매트릭스 |
| 런타임 순서·루프·분기 | Step Debugger Simulator, Breakpoint 체크리스트, 현재 행 강조 |
| 초보자용 코드 읽기 | 코드 키워드 아코디언, ABAP Editor Mockup |
| 기술 선택 분기 | 의사결정 트리(JOIN vs FAE, SALV vs Grid ALV 등) |
| 상태 변화(전/후) | 상태 변화 그리드, 성공/실패 배지 |
| 암기·회수 | 드래그/카드분류/순서배열 퀴즈, 단답형, O/X 타임어택, 플래시카드 |
| 마무리 | 한눈에 정리 + 다음 Lesson 예고 |

## 4. 공통 시각화 클래스 (참고)
`viz-state-grid`/`viz-state`/`viz-table`(상태 변화), `viz-relation`/`viz-concept`/`viz-arrow`(관계도), `viz-flow`/`viz-flow-step`(플로우), `viz-compare-before|after`(전후), `viz-badge success|fail`, `viz-current-row`, `viz-svg`, `abap-editor-mockup`/`shiki-copy-wrapper`(코드), `lesson-callout tip|warn`, `<details><summary>`(접이식 해설).

> 적용 시 반드시 `reference/design_variants.json` 확정 토큰을 따른다([01 DoD](01_AI_SYNC.md)).
