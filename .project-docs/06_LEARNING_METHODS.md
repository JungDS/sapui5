# 06. LEARNING METHODS — 학습수단·샘플 SSOT

> 📅 **최종수정: 2026-06-20 02:28 KST**
> 🎯 **목적:** Lesson UI, 실습 방식, 샘플 선택, v4 정책을 이 문서 하나로 판단한다.
> 📖 **읽을 때:** Lesson 콘텐츠 흐름을 설계하거나 샘플을 고를 때.
> ⚡ **TL;DR:** Academy 샘플 우선, v4는 선별 표준화, v3는 fallback. 코드가 나오면 페이지 안 조작형 시뮬레이션이 필요하다.

## 선택 우선순위

1. `C:\ui5\study\sap-dev-academy\sample`
2. `sample/learning-methods-v4` (선별 생성 후)
3. `sample/learning-methods-v3` fallback

`sample/learning-methods`와 `sample/learning-methods-v2`는 archive/fallback 성격으로만 본다. 외부 샘플 전체 복사는 하지 않는다.

## Lesson 흐름

기본 흐름은 **읽기 → 보기 → 조작하기 → 풀어보기 → 정리하기**다.

- 한 Lesson에는 핵심 시각자료 1~3개, 실습 1개 이상, 확인 퀴즈/정리를 둔다.
- 코드, SQL, 설정, SAP GUI 절차가 나오면 사용자가 같은 페이지에서 조작해야 한다.
- 운영 fragment에는 인라인 CSS/JS를 넣지 않는다. `sample/`과 v4 standalone 실험 파일은 예외다.

## 시뮬레이션 품질 기준

조작형 실습은 단순 클릭 데모가 아니라 아래 중 해당되는 요소를 갖춘다.

- 시작 상태와 목표가 화면에서 분명하다.
- 사용자가 값을 바꾸거나 단계/선택지를 직접 조작한다.
- 정상 입력과 실패/오답 케이스 중 최소 하나에 즉시 피드백이 있다.
- 예상 출력, 상태 변화, 실행 로그 중 하나로 결과를 확인할 수 있다.
- 다시 시도하거나 초기 상태로 돌아갈 수 있다.

## 코드 = 실습 시뮬레이션

| 코드/절차 성격 | 1차 추천 | fallback |
|---|---|---|
| T-code 진입·화면 입력·실행 | Academy `interactive/sap-gui-sandbox.html`, `interactive/domain-builder.html` | v3 `interactive/interactive-sandbox-simulator.html`, `code-learning/abap-editor-mockup.html` |
| 실행 순서·이벤트·루프·분기 | Academy `code-learning/step-debugger.html` | v3 `interactive/step-debugger-timeline.html`, `interactive/expected-log-comparison.html` |
| 구문 익히기·빈칸 채우기 | Academy `code-learning/fill-blank-code.html`, `code-learning/code-tour-accordion.html` | v3 `code-learning/fill-blank-code.html`, `code-learning/code-line-matching.html` |
| 안티패턴·디버깅 | Academy `code-learning/bug-hunt.html`, `code-learning/diff-mapper.html` | v3 `code-learning/bug-hunt-mission.html`, `code-learning/bad-good-hover-mapping.html` |

## 상황별 샘플

| 상황 | 먼저 볼 샘플 | 쓰기 좋은 경우 |
|---|---|---|
| SAP GUI/T-code 흐름 | `interactive/sap-gui-sandbox.html` | SE38, SE11, SE16N처럼 입력→실행→결과가 있는 Lesson |
| DDIC Domain 생성 | `interactive/domain-builder.html` | Domain 타입/길이/고정값/활성화 lifecycle |
| WRITE 출력 | `code-learning/write-output-simulator.html` | `WRITE`, `/`, 콜론 체인, 리스트 출력 |
| WRITE 서식 | `code-learning/write-format-playground.html` | 폭, 정렬, COLOR, ULINE, SKIP 비교 |
| SELECT/Open SQL | `code-learning/select-query-simulator.html` | projection, WHERE, `sy-subrc`, `sy-dbcnt` |
| 한 줄 실행 추적 | `code-learning/step-debugger.html` | 루프, 분기, 이벤트, 변수 변화 |
| 코드 설명 | `code-learning/code-tour-accordion.html` | 초보자가 키워드를 코드 옆에서 봐야 할 때 |
| 버그 찾기 | `code-learning/bug-hunt.html` | 흔한 syntax/logic 오류, 디버깅 감각 |
| Bad/Good 비교 | `code-learning/diff-mapper.html` | 리팩터링, 성능, 안티패턴 교정 |
| SALV/ALV 출력 | `interactive/salv-grid-simulator.html`, `visuals/sample-data-table.html` | Grid 표시, 정렬, 합계, 빈 테이블 케이스 |
| 흐름도 | `visuals/process-flow.html`, `visuals/mermaid-flowchart.html` | 저장→검사→활성화, 이벤트 순서 |
| 관계/계층 | `visuals/relationship-map.html`, `visuals/static-svg-architecture.html` | DDIC 객체 관계, ABAP→Gateway→UI5 구조 |
| 상태 변화 | `visuals/state-change-grid.html`, `visuals/before-after-comparison.html` | 내부 테이블 변경, 설정 전후, 성공/실패 비교 |
| 화면 영역 설명 | `visuals/image-hotspot-explorer.html` | SE38/SE11 화면 부위 설명 |
| 판단 분기 | `interactive/decision-tree.html` | JOIN vs FAE, SALV vs Grid ALV처럼 선택 기준 |
| 실습 진행률 | `interactive/checklist-progress.html` | 긴 실습을 단계별로 완료시키는 Lesson |
| 단축키 훈련 | `interactive/shortcut-simulator.html` | 저장, 실행, F8 등 키보드 흐름 |
| 회수/퀴즈 | `quizzes/*`, `foundations/summary-recap.html` | 마무리 점검, 용어 암기, 순서 배열 |
| 레이아웃/셸 참고 | `structure/lesson-shell-v2-c.html`, `beginner-lesson-template.html` | 공통 뷰어 개선, Lesson 골격 실험 |

## 이식 규칙

| 대상 | 인라인 CSS/JS | 처리 |
|---|---|---|
| 운영 Lesson fragment | 금지 | `abap-lesson-viewer.css/js`로 이식 |
| `sample/` standalone | 허용 | 디자인·동작 검토 우선 |
| `sample/learning-methods-v4` | 허용 | 확정 전까지 self-contained 가능 |
| v4 → 운영 Lesson | 금지로 전환 | 공통 CSS/JS와 데이터 속성 패턴으로 정리 |

운영 fragment로 옮길 때는 샘플 HTML의 구조, 데이터 속성, 상태 전이만 가져온다. 반복 스타일/동작은 공통 자산에 통합한다.

## v4 생성 기준

v4는 만드는 편이 좋다. 단, 전체 복사가 아니라 반복 사용될 우수 샘플만 선별한다. 3개 이상 Lesson에서 재사용될 패턴이거나 공통 viewer에 없는 새 interaction type일 때 v4를 만든다. 단발 Lesson 전용이면 Academy/v3 구조를 바로 운영 공통 패턴으로 이식한다.

| 단계 | 기준 |
|---|---|
| 선별 | 위 상황별 표에서 자주 쓰는 샘플만 고른다. |
| 복사 | 원본 경로와 선택 이유를 `sample/learning-methods-v4/MANIFEST.md`에 기록한다. |
| 실험 | standalone 파일은 인라인 CSS/JS를 허용한다. |
| 운영 이식 | 공통 `abap-lesson-viewer.css/js`로 분리한다. |
| 검증 | 샘플 카탈로그, 대표 Lesson 1개, 모바일 폭에서 콘솔/인터랙션을 확인한다. |

## 공통 시각화 클래스

`viz-state-grid`, `viz-state`, `viz-table`, `viz-relation`, `viz-concept`, `viz-flow`, `viz-flow-step`, `viz-compare-before`, `viz-compare-after`, `viz-badge`, `viz-current-row`, `viz-svg`, `abap-editor-mockup`, `shiki-copy-wrapper`, `lesson-callout`, `<details><summary>`.

운영 Lesson 적용 시 최종 기준은 `reference/design_variants.json`이다.
