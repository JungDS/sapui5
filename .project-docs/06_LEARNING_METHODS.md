# 06. LEARNING METHODS — 학습수단·샘플 SSOT

> 📅 **최종수정: 2026-06-20 03:35 KST**
> 🎯 **목적:** Lesson UI, 실습 방식, 샘플 선택, v4 정책을 이 문서 하나로 판단한다.
> 📖 **읽을 때:** Lesson 콘텐츠 흐름을 설계하거나 샘플을 고를 때.
> ⚡ **TL;DR:** 검증된 v4가 있으면 v4 우선, 없으면 Academy 샘플을 탐색하고, v3는 fallback. 코드가 나오면 페이지 안 조작형 시뮬레이션이 필요하다.

## 선택 우선순위

1. `sample/learning-methods-v4` — 해당 Lesson 주제에 맞는 검증된 v4 패턴이 있을 때
2. `C:\ui5\study\sap-dev-academy\sample` — v4에 적절한 패턴이 없거나 새 패턴을 탐색할 때
3. `sample/learning-methods-v3` — v4/Academy에 적절한 항목이 없을 때의 fallback

`sample/learning-methods`와 `sample/learning-methods-v2`는 archive/fallback 성격으로만 본다. 외부 샘플 전체 복사는 하지 않는다. v4는 Academy보다 낮은 후보가 아니라 Academy, v3 fallback, 운영 이식 경험 중 반복 가치가 검증된 패턴을 모은 표준 후보로 본다.

## Academy 샘플 사용 절차

1. Lesson 목표를 `개념 설명`, `코드 실행`, `SAP GUI 절차`, `상태/관계 시각화`, `퀴즈/회수` 중 어디에 가까운지 먼저 정한다.
2. 아래 `상황별 샘플`에서 후보 1~3개를 고르고, 부족하면 `Academy 샘플 카탈로그`에서 같은 카테고리만 본다.
3. 후보 HTML을 직접 열어 상호작용과 모바일 폭을 확인한다. `C:\ui5\study\sap-dev-academy\sample\index.html`은 전체 카탈로그를 카드로 볼 때만 쓴다.
4. 운영 Lesson에는 샘플의 구조, 데이터 속성, 상태 전이만 가져오고 인라인 CSS/JS는 공통 `abap-lesson-viewer.css/js`로 옮긴다.
5. 샘플이 Lesson 전용이면 바로 운영 패턴으로 이식하고, 3개 이상 Lesson에서 재사용될 패턴이면 v4 후보로 승격한다.

## 샘플 선택 기록과 재사용 색인

- 개별 Lesson의 선택 근거는 plan `RESULTS.md`나 완료 보고에 `선택 샘플 경로 + 선택 이유 + 제외한 주요 후보` 정도만 짧게 남긴다.
- 재사용 추적이 필요한 Academy/v3/v4 샘플·패턴은 `.project-plans/SAMPLE_USAGE_INDEX.md`에도 1줄 갱신한다.
- v4 또는 공통 패턴 승격 판단은 여러 plan 폴더를 뒤져서 하지 않고, 위 색인의 `Sample / Pattern / Lessons / Count / Decision`만 보고 판단한다.
- `Decision`은 `local`, `watch`, `consider-v4`, `common-candidate`, `promoted` 중 하나로 짧게 둔다.

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
| 이벤트 생명주기 | `code-learning/event-lifecycle-buildup.html`, `visuals/mermaid-flowchart.html` | `LOAD-OF-PROGRAM`, `INITIALIZATION`, `START-OF-SELECTION`처럼 순서가 핵심인 Lesson |
| 공식 문서 연결 | `foundations/official-links.html` | SAP Help, ABAP Keyword Documentation 링크를 정리해야 하는 Lesson |
| 입문 동기 부여 | `foundations/concept-storytelling.html`, `structure/beginner-lesson-template.html` | 왜 배우는지부터 설명해야 하는 초반 Lesson |
| 회수/퀴즈 | `quizzes/*`, `foundations/summary-recap.html` | 마무리 점검, 용어 암기, 순서 배열 |
| 레이아웃/셸 참고 | `structure/lesson-shell-v2-c.html`, `structure/beginner-lesson-template.html` | 공통 뷰어 개선, Lesson 골격 실험 |

## Academy 샘플 카탈로그

먼저 위 상황별 표를 보고, 애매할 때만 이 카탈로그에서 후보를 좁힌다. `structure/lesson-shell-v2-a/b/d/e/f/g.html`은 비교·보존용이며 새 Lesson에 직접 쓰지 않는다.

### structure

| 샘플 | 쓰기 좋은 경우 | 주의 |
|---|---|---|
| `structure/lesson-shell-v2-c.html` | 확정된 Lesson shell 표준, 공통 viewer 개선 참고 | 운영 fragment에 그대로 복사하지 않고 패턴만 참고 |
| `structure/beginner-lesson-template.html` | 완전 입문자용 흐름, 왜→무엇→어떻게→주의→정리 구조 | 초반 Lesson 골격 참고용 |
| `structure/code-copy-block.html` | ABAP 에디터 목업, 줄번호, 복사 버튼 | 운영에서는 공통 코드블록/복사 패턴으로 이식 |
| `structure/callout-patterns.html` | info/tip/warn 강조 박스 | 과다 사용 금지, 핵심 주의만 |
| `structure/lesson-shell.html` | 구버전 3탭 사이드바 구조 참고 | v2-C 확정으로 신규 사용 금지 |
| `structure/lesson-shell-v2-a.html` | 폐기된 우측 네비 시안 확인 | 신규 사용 금지 |
| `structure/lesson-shell-v2-b.html` | 폐기된 플랫 시안 확인 | 신규 사용 금지 |
| `structure/lesson-shell-v2-d.html` | v2-C + 프로젝트 색 변형 참고 | 신규 사용 금지 |
| `structure/lesson-shell-v2-e.html` | 아이콘 레일/포커스 모드 아이디어 참고 | 신규 사용 금지 |
| `structure/lesson-shell-v2-f.html` | 학습 여정/진행 바 아이디어 참고 | 신규 사용 금지 |
| `structure/lesson-shell-v2-g.html` | 지식 맵/용어 맵 아이디어 참고 | 신규 사용 금지 |

### foundations

| 샘플 | 쓰기 좋은 경우 | 주의 |
|---|---|---|
| `foundations/concept-storytelling.html` | 개념의 필요성을 불편→전환→해결로 설명 | 길어지면 실습 전 짧게만 |
| `foundations/cheat-sheet-matrix.html` | 구문/의미/주의를 표로 압축 | 공식 옵션 전체를 대체하지 않음 |
| `foundations/foldable-explanation.html` | 초보자/심화 설명을 접이식으로 분리 | 핵심 내용은 접힌 영역에 숨기지 않음 |
| `foundations/summary-recap.html` | Lesson 끝 3포인트 회수 | 퀴즈 대신 쓰려면 능동 질문 포함 |
| `foundations/official-links.html` | SAP 공식 문서 링크 묶음 | 링크만 나열하지 말고 확인한 키워드/문서 종류를 기록 |

### code-learning

| 샘플 | 쓰기 좋은 경우 | 주의 |
|---|---|---|
| `code-learning/code-tour-accordion.html` | 코드 옆에서 키워드 의미를 단계적으로 설명 | 코드가 길면 핵심 줄만 |
| `code-learning/fill-blank-code.html` | 구문 암기, 키워드/옵션 빈칸 채우기 | 정답/오답 피드백 필수 |
| `code-learning/step-debugger.html` | 루프, 분기, 이벤트, 변수 변화 추적 | 실행 전/방금 실행 상태를 구분 |
| `code-learning/bug-hunt.html` | syntax/logic 오류 찾기 | 오류가 Lesson 목표와 직접 연결될 때 |
| `code-learning/diff-mapper.html` | Bad/Good 코드 비교, 리팩터링, 성능 개선 | 단순 스타일 비교에는 과함 |
| `code-learning/event-lifecycle-buildup.html` | ABAP 리포트 이벤트 순서를 점진 빌드업 | Mermaid 의존을 운영 viewer 방식으로 정리 |
| `code-learning/write-output-simulator.html` | `WRITE`, `/`, 콜론 체인, 리스트 출력 실행감 | Classic ABAP Lesson에 우선 |
| `code-learning/write-format-playground.html` | `WRITE` 폭/정렬/색/강조/ULINE/SKIP 비교 | 옵션이 많으므로 Lesson 범위를 제한 |
| `code-learning/select-query-simulator.html` | Classic Open SQL projection/WHERE/`sy-subrc`/`sy-dbcnt` | Modern SQL/ABAP Cloud 문법과 혼동 금지 |

### interactive

| 샘플 | 쓰기 좋은 경우 | 주의 |
|---|---|---|
| `interactive/sap-gui-sandbox.html` | T-code 진입, 입력, 실행, ALV 결과 체험 | 실제 SAP GUI와 다른 부분은 단정 금지 |
| `interactive/domain-builder.html` | SE11 Domain 생성, 저장/검사/활성화 lifecycle | Data Element/Table Lesson에는 필요한 부분만 차용 |
| `interactive/salv-grid-simulator.html` | SALV factory→display, Grid 기능, 빈 테이블 케이스 | ALV Grid와 SALV 차이를 구분 |
| `interactive/decision-tree.html` | 선택 기준 학습, 개념 비교 후 권고 | 정답 하나가 아닌 판단 기준일 때 |
| `interactive/checklist-progress.html` | 긴 실습 절차를 단계별 완료로 관리 | 체크만 있고 피드백이 없으면 보강 |
| `interactive/shortcut-simulator.html` | SE38 저장/실행/F8 등 단축키 훈련 | 키보드 이벤트가 모바일에서 제한될 수 있음 |

### quizzes

| 샘플 | 쓰기 좋은 경우 | 주의 |
|---|---|---|
| `quizzes/drag-drop-quiz.html` | 실행 순서, lifecycle, 절차 배열 | 모바일 드래그 대체 확인 |
| `quizzes/card-sort-quiz.html` | 구문/객체/상황을 범주별 분류 | 분류 기준을 화면에 명확히 |
| `quizzes/flashcards.html` | 용어와 정의 회수 | 본문 학습을 대체하지 않음 |
| `quizzes/ox-survival-quiz.html` | 빠른 O/X 판정, 오개념 점검 | 타임어택이 부담되면 일반 퀴즈로 완화 |
| `quizzes/short-answer-quiz.html` | 키워드 직접 입력, 능동 회수 | 복수 정답/대소문자 허용 기준 필요 |
| `quizzes/mini-exam.html` | Lesson 말미 객관식 점검 | 해설 없으면 보강 |

### visuals

| 샘플 | 쓰기 좋은 경우 | 주의 |
|---|---|---|
| `visuals/process-flow.html` | 저장→검사→활성화, 이벤트 순서 등 단계 흐름 | 단계 수가 많으면 쪼갬 |
| `visuals/mermaid-flowchart.html` | 분기/복귀가 있는 흐름도 | Mermaid 의존을 운영 방식으로 확인 |
| `visuals/relationship-map.html` | DDIC 객체, 테이블 키, 계층/참조 관계 | 관계가 실제 학습 목표와 연결될 때 |
| `visuals/static-svg-architecture.html` | ABAP→Gateway→UI5 같은 큰 구조 | 세부 조작 실습과 함께 사용 |
| `visuals/state-change-grid.html` | 내부 테이블, 설정 전후, 처리 단계별 상태 변화 | 전/후 차이를 색만으로 전달하지 않음 |
| `visuals/before-after-comparison.html` | 안티패턴 개선, 코드/결과 비교 | 왜 좋아졌는지 설명 필요 |
| `visuals/image-hotspot-explorer.html` | SE11/SE38 화면 영역 설명 | 실제 스크린샷이 있으면 그 위에 적용 |
| `visuals/sample-data-table.html` | ALV 스타일 결과표, 정렬, 현재 행 강조 | 결과표만 있으면 실습성이 약함 |
| `visuals/interactive-data-chart.html` | 입력값 변화가 수치/막대로 즉시 보이는 개념 | ABAP 결과와 연결되지 않으면 장식화 위험 |

## 이식 규칙

| 대상 | 인라인 CSS/JS | 처리 |
|---|---|---|
| 운영 Lesson fragment | 금지 | `abap-lesson-viewer.css/js`로 이식 |
| `sample/` standalone | 허용 | 디자인·동작 검토 우선 |
| `sample/learning-methods-v4` | 허용 | 확정 전까지 self-contained 가능 |
| v4 → 운영 Lesson | 금지로 전환 | 공통 CSS/JS와 데이터 속성 패턴으로 정리 |

운영 fragment로 옮길 때는 샘플 HTML의 구조, 데이터 속성, 상태 전이만 가져온다. 반복 스타일/동작은 공통 자산에 통합한다.

## Academy 샘플 이식 네이밍

Academy 샘플을 운영 Lesson으로 이식할 때 기존 공통 클래스/JS를 이름만 보고 재사용하지 않는다. 먼저 `assets/abap-lesson-viewer.css/js`의 정의와 기존 사용처를 확인한다.

- 기존 클래스/함수를 재사용하거나 수정하면 근처에 출처·용도 주석을 남긴다.
- `sample/learning-methods-v3` 유래 공통 클래스는 Academy 샘플 자동 재사용 대상으로 보지 않는다.
- Academy 샘플에서 새로 이식하는 CSS class는 `academy-*` prefix를 쓴다.
- Academy 샘플에서 새로 이식하는 JS data attribute는 `data-academy-pattern="..."` 형식을 쓴다.
- Academy 샘플용 JS 초기화 함수는 `initAcademy...` 이름을 쓴다.

출처 주석 예시:

```css
/* origin: sap-dev-academy/sample/code-learning/write-output-simulator.html
   use: Classic WRITE 출력 시뮬레이션
   namespace: academy-write-output */
.academy-write-output { ... }
```

## v4 생성 기준

v4는 만드는 편이 좋다. 단, 전체 복사가 아니라 Academy/v3 fallback/운영 구현에서 반복 사용 가치가 검증된 패턴만 선별한다. 3개 이상 Lesson에서 재사용될 패턴이거나 공통 viewer에 없는 새 interaction type일 때 v4를 만든다. 이 판단은 `.project-plans/SAMPLE_USAGE_INDEX.md`의 `Count`와 `Decision`을 기준으로 한다. 단발 Lesson 전용이면 원본 샘플 구조를 바로 운영 공통 패턴으로 이식한다.

| 단계 | 기준 |
|---|---|
| 선별 | 위 상황별 표에서 자주 쓰는 샘플만 고른다. |
| 복사 | 원본 경로와 선택 이유를 `sample/learning-methods-v4/MANIFEST.md`에 기록한다. |
| 실험 | standalone 파일은 인라인 CSS/JS를 허용한다. |
| 운영 이식 | 공통 `abap-lesson-viewer.css/js`로 분리한다. |
| 검증 | 샘플 카탈로그, 대표 Lesson 1개, 모바일 폭에서 콘솔/인터랙션을 확인한다. |

## 운영 fragment 공통 클래스

아래 클래스는 Academy 샘플 카탈로그가 아니라 현재 `assets/abap-lesson-viewer.css/js`에 이미 정의된 운영 Lesson fragment용 공통 클래스다. Academy 샘플을 이식할 때는 이름만 보고 재사용하지 말고, 정의·기존 사용처·부작용 가능성을 확인한 뒤 의미가 맞을 때만 재사용한다. 의미가 다르면 샘플의 구조·상태 전이에 맞춰 공통 CSS/JS 또는 별도 네임스페이스 패턴으로 정리한다.

`viz-state-grid`, `viz-state`, `viz-table`, `viz-relation`, `viz-concept`, `viz-flow`, `viz-flow-step`, `viz-compare-before`, `viz-compare-after`, `viz-badge`, `viz-current-row`, `viz-svg`, `abap-editor-mockup`, `shiki-copy-wrapper`, `lesson-callout`, `<details><summary>`.

## 디자인 기준

Academy 샘플은 자체 디자인 톤과 상호작용 패턴을 우선 참고한다.
`sample/learning-methods-v3`를 사용할 때만 `reference/design_variants.json`을 참고해 적용할 디자인을 결정한다.
