# 06. LEARNING METHODS — 샘플 선택 SSOT

> 📅 **최종수정: 2026-06-19 23:30 KST**
> 🎯 **목적:** Lesson UI·실습·샘플 선택을 이 문서 하나로 판단한다.
> 📖 **읽을 때:** Lesson 콘텐츠 흐름을 설계할 때, 코드/화면/퀴즈용 인터랙션을 고를 때.
> ⚡ **TL;DR:**
> - 샘플 선택은 여기만 본다. 외부 경로·v4·archive 정책이 필요할 때만 [09](09_SAMPLE_LIBRARY.md)를 추가로 본다.
> - 우선순위: `C:\ui5\study\sap-dev-academy\sample` → `sample/learning-methods-v4`(생성 후) → `sample/learning-methods-v3` fallback.
> - 흐름 설계: **읽기 → 보기 → 조작하기 → 풀어보기 → 정리하기**.
> - 코드가 나오면 그 페이지에서 직접 실행·조작하는 시뮬레이션이 필요하다. 정적 코드블록만 있으면 Lesson DoD 미완.
> - 운영 Lesson fragment는 인라인 `<script>/<style>/style` 금지. `sample/`·v4 standalone 실험 파일은 예외다.

## 1. 핵심 원칙

- 텍스트는 뼈대, 학습수단은 이해를 고정하는 장치다.
- 한 Lesson = 핵심 시각자료 1~3개 + 실습 1개 이상 + 확인 퀴즈/정리.
- 개념을 설명했으면 곧바로 같은 페이지에서 해보게 한다.
- 상태 변화·분기·런타임 흐름은 무거운 인터랙션으로 보상이 크다.
- 운영 `docs/abap/lesson-content/*.html`은 fragment다. 동작은 `assets/abap-lesson-viewer.js`, 스타일은 `assets/abap-lesson-viewer.css`로 이식한다([04 R11](04_CONVENTIONS.md)).

## 2. 코드 = 실습 시뮬레이션

본문에 ABAP/SQL/설정 코드가 1줄이라도 나오면, 사용자가 그 코드를 이 페이지 안에서 직접 실행·조작하는 시뮬레이션을 함께 넣는다.

| 코드 성격 | 1차 추천 | fallback |
|---|---|---|
| T-code 진입·화면 입력·실행 흐름 | Academy `interactive/sap-gui-sandbox.html`, `interactive/domain-builder.html` | v3 `interactive/interactive-sandbox-simulator.html`, `code-learning/abap-editor-mockup.html` |
| 실행 순서·이벤트·루프·분기 추적 | Academy `code-learning/step-debugger.html` | v3 `interactive/step-debugger-timeline.html`, `interactive/expected-log-comparison.html` |
| 구문 익히기·키워드 채우기 | Academy `code-learning/fill-blank-code.html`, `code-learning/code-tour-accordion.html` | v3 `code-learning/fill-blank-code.html`, `code-learning/code-line-matching.html` |
| 안티패턴·디버깅 감각 | Academy `code-learning/bug-hunt.html`, `code-learning/diff-mapper.html` | v3 `code-learning/bug-hunt-mission.html`, `code-learning/bad-good-hover-mapping.html` |

## 3. 상황별 샘플 선택표

| 상황 | 먼저 볼 샘플 | 좋은 Lesson 상황 | 피할 상황 |
|---|---|---|---|
| SAP GUI/T-code 입력 흐름 | `interactive/sap-gui-sandbox.html` | SE38, SE11, SE16N처럼 입력→실행→결과가 있는 Lesson | 순수 개념 설명만 있는 Lesson |
| DDIC Domain 생성 | `interactive/domain-builder.html` | Domain 타입/길이/고정값/활성화 lifecycle | Data Element/Structure처럼 별도 객체 중심 Lesson |
| WRITE 출력 체감 | `code-learning/write-output-simulator.html` | `WRITE`, `/`, 콜론 체인, 리스트 출력 | DB 조회나 ALV 중심 Lesson |
| WRITE 서식 비교 | `code-learning/write-format-playground.html` | 폭·정렬·COLOR·ULINE·SKIP 비교 | 기본 WRITE 첫 소개만 할 때 |
| SELECT/Open SQL | `code-learning/select-query-simulator.html` | projection, WHERE, `sy-subrc`, `sy-dbcnt` 설명 | SQL이 본문 핵심이 아닐 때 |
| 한 줄씩 실행 추적 | `code-learning/step-debugger.html` | 루프, 분기, 이벤트, 변수 변화 | 화면 입력이 핵심일 때 |
| 코드 옆 설명 | `code-learning/code-tour-accordion.html` | 초보자가 키워드 의미를 코드 맥락에서 봐야 할 때 | 이미 설명이 짧고 명확한 코드 |
| 버그 찾기 | `code-learning/bug-hunt.html` | 흔한 실수, syntax/logic 오류, 디버깅 감각 | 오류보다 정상 흐름 체험이 목표일 때 |
| Bad/Good 비교 | `code-learning/diff-mapper.html` | 리팩터링, 성능, 안티패턴 교정 | 단일 정답 실습 |
| SALV/ALV 출력 | `interactive/salv-grid-simulator.html`, `visuals/sample-data-table.html` | Grid 표시, 정렬, 합계, 빈 테이블 케이스 | 리스트 출력만 다루는 Lesson |
| 흐름도 | `visuals/process-flow.html`, `visuals/mermaid-flowchart.html` | 저장→검사→활성화, 이벤트 순서, 요청/응답 | 사용자가 조작해야 하는 핵심 실습 |
| 관계/계층 | `visuals/relationship-map.html`, `visuals/static-svg-architecture.html` | DDIC 객체 관계, ABAP→Gateway→UI5 구조 | 단일 화면 절차 |
| 상태 변화 | `visuals/state-change-grid.html`, `visuals/before-after-comparison.html` | 내부 테이블 변경, 설정 전후, 성공/실패 비교 | 변화가 한 단계뿐일 때 |
| 화면 영역 설명 | `visuals/image-hotspot-explorer.html` | SE38/SE11 화면 부위 설명, 버튼/필드 학습 | 실제 화면 맥락이 없을 때 |
| 판단 분기 | `interactive/decision-tree.html` | JOIN vs FAE, SALV vs Grid ALV처럼 선택 기준 | 정답이 하나뿐인 절차 |
| 실습 진행률 | `interactive/checklist-progress.html` | 긴 실습을 단계별로 완료시키는 Lesson | 짧은 확인 문제 |
| 단축키 훈련 | `interactive/shortcut-simulator.html` | SE38 저장/실행/F8 등 키보드 흐름 | 개념 위주 Lesson |
| 회수/퀴즈 | `quizzes/*`, `foundations/summary-recap.html` | 마무리 점검, 용어 암기, 순서 배열 | 본문 핵심 실습을 대체할 때 |
| 레이아웃/셸 참고 | `structure/lesson-shell-v2-c.html`, `beginner-lesson-template.html` | 공통 뷰어 개선, Lesson 골격 실험 | 운영 fragment에 그대로 붙여 넣기 |

## 4. 이식 규칙

| 대상 | 인라인 CSS/JS | 기준 |
|---|---|---|
| 운영 Lesson fragment `docs/abap/lesson-content/*.html` | 금지 | 공통 `abap-lesson-viewer.css/js`로 이식 |
| `sample/` standalone 실험 | 허용 | 빠른 디자인·동작 검토 우선 |
| `sample/learning-methods-v4` 제작 파일 | 허용 | v4 확정 전까지 self-contained 가능 |
| v4에서 운영 Lesson으로 승격 | 금지로 전환 | 공통 CSS/JS와 데이터 속성 패턴으로 정리 |

운영 fragment로 옮길 때는 샘플 HTML에서 본문 구조, 데이터 속성, 상태 전이만 가져오고, 반복되는 스타일/동작은 공통 자산에 통합한다. 새 데이터 설정은 가능하면 `<template type="application/json">` 또는 기존 sandbox config 패턴을 쓴다.

## 5. 공통 시각화 클래스

`viz-state-grid`/`viz-state`/`viz-table`(상태 변화), `viz-relation`/`viz-concept`/`viz-arrow`(관계도), `viz-flow`/`viz-flow-step`(플로우), `viz-compare-before|after`(전후), `viz-badge success|fail`, `viz-current-row`, `viz-svg`, `abap-editor-mockup`/`shiki-copy-wrapper`(코드), `lesson-callout tip|warn`, `<details><summary>`(접이식 해설).

운영 Lesson 적용 시 `reference/design_variants.json` 확정 토큰을 따른다([01 DoD](01_AI_SYNC.md)).
