# 학습 수단 샘플 라이브러리 v2

> ABAP Lesson 초안을 만들 때, 각 학습 수단이 **실제로 적용된 모습**을 standalone HTML로 확인하고 그대로 복사·변형하기 위한 샘플 모음입니다.

## v1과 무엇이 다른가
- v1(`sample/learning-methods/`)은 대부분의 페이지가 거의 동일한 "ABAP Source 카드 3개"를 반복해 품질이 낮았습니다.
- v2는 각 페이지의 예시 3개가 **그 수단이 실제로 적용된 컴포넌트/상호작용/다이어그램/퀴즈**입니다.
- **Chapter 13 Lesson 1~6**에 이미 적용된 수단은 그 원본을 분석해 **첫 번째 대표 예시**로 이식했습니다(다이어그램·Sandbox·Bad/Good Hover Mapping·아코디언·Step Debugger·드래그 퀴즈·단답형 퀴즈 등).
- 나머지 두 예시는 Internal Table / Open SQL / Selection Screen·Report Event / DDIC / ALV / OO ABAP / RAP·CDS 등 다른 주제에 같은 수단을 적용한 변형입니다.
- 레이아웃은 **가로 스크롤 없는 반응형**(기본 1열, 넓은 화면에서만 일부 2열)으로 재설계했습니다.

## 사용 방법
1. `.project-docs/10_LEARNING_CONTENT_METHODS.md`에서 수단 선택 기준을 확인합니다.
2. 아래 목록에서 주제에 맞는 샘플을 열고, 예시 3개 중 가장 가까운 구성을 Lesson에 맞게 변형합니다.
3. 로컬 서버로 열어야 mermaid CDN과 fetch가 정상 동작합니다. 예: 저장소 루트에서 `python -m http.server` 후 `http://localhost:8000/sample/learning-methods-v2/index.html`.
4. 실제 `docs/abap/lesson-content/*.html`은 fragment이므로, 옮길 때는 CSS/JS를 공통 asset(`assets/abap-lesson-viewer.css/js`)으로 분리합니다. v2의 위젯 마크업/동작은 그 공통 asset과 호환되도록 이식했습니다.

## 원본 위젯 출처 (Chapter 13 Lesson 1~6)
| v2 샘플 | 이식한 원본 |
|---|---|
| 탭형 점진 빌드업 다이어그램 | THEORY-13-M01 5단계 이벤트 라이프사이클 탭 |
| Mermaid 흐름도 / 코드·다이어그램 좌우 비교 | THEORY-13-M01 탭 좌우 분할 |
| 가상 Sandbox 시뮬레이터 | THEORY-13-M01 Selection Screen Sandbox |
| Bad/Good Hover Mapping | THEORY-13-M01 잘못된/올바른 기본값 위치 비교 |
| 코드 키워드 아코디언 | THEORY-13-M01 이벤트 키워드 클릭 투어 |
| Step Debugger Timeline | THEORY-13-M01 이벤트 실행 순서 디버거 |
| 드래그 앤 드롭 / 순서 배열 퀴즈 | THEORY-13-M01 이벤트 카드 순서 맞추기 |
| 단답형 / 접이식 해설 | THEORY-13-M01~M06 확인 퀴즈·정답/해설 |
| 전후 비교 | THEORY-13-M02 DEFAULT vs INITIALIZATION, M06 0건 vs 결과 |
| 프로세스 플로우 / 성공·실패 배지 | THEORY-13-M03~M05 단계 플로우, M04 검증 배지 |
| 콜아웃 / 실습+완료 조건 / 공식 링크 / 한눈에 정리 | THEORY-13-M01~M06 공통 구조 |

## 샘플 목록

### 기초 구성 (foundations/)
- [콜아웃 패턴](foundations/callout-patterns.html)
- [개념 도입 스토리](foundations/concept-storytelling.html)
- [미니 실습과 완료 조건](foundations/practice-and-completion.html)
- [공식 링크 섹션](foundations/official-links-section.html)
- [한눈에 정리](foundations/summary-recap.html)
- [접이식 해설](foundations/foldable-explanation.html)
- [치트시트 매트릭스](foundations/cheat-sheet-matrix.html)

### 시각화 (visuals/)
- [탭형 점진 빌드업 다이어그램](visuals/progressive-tab-diagram.html)
- [Mermaid 흐름도](visuals/mermaid-flowchart.html)
- [코드와 다이어그램 좌우 비교](visuals/code-diagram-split.html)
- [상태 변화 그리드](visuals/state-change-grid.html)
- [관계도](visuals/relationship-map.html)
- [프로세스 플로우](visuals/process-flow.html)
- [전후 비교](visuals/before-after-comparison.html)
- [성공 실패 배지](visuals/success-failure-badges.html)
- [현재 행 강조](visuals/current-row-highlight.html)
- [정적 SVG 아키텍처](visuals/static-svg-architecture.html)
- [화면 캡처 갤러리](visuals/visual-media-gallery.html)
- [샘플 데이터 테이블](visuals/sample-data-table.html)

### 코드 학습 (code-learning/)
- [ABAP Editor Mockup](code-learning/abap-editor-mockup.html)
- [코드 키워드 아코디언](code-learning/code-keyword-accordion.html)
- [Bad/Good Practice Hover Mapping](code-learning/bad-good-hover-mapping.html)
- [빈칸 코드 완성](code-learning/fill-blank-code.html)
- [코드 라인 매칭](code-learning/code-line-matching.html)
- [오류 찾기 미션](code-learning/bug-hunt-mission.html)

### 상호작용 (interactive/)
- [가상 Sandbox 시뮬레이터](interactive/interactive-sandbox-simulator.html)
- [Step Debugger Timeline](interactive/step-debugger-timeline.html)
- [의사결정 트리](interactive/decision-tree.html)
- [실무 체크리스트](interactive/practical-checklist.html)
- [Breakpoint 체크리스트](interactive/breakpoint-checklist.html)
- [예상 로그 비교](interactive/expected-log-comparison.html)

### 퀴즈 (quizzes/)
- [드래그 앤 드롭 퀴즈](quizzes/drag-drop-quiz.html)
- [카드 분류 퀴즈](quizzes/card-sorting-quiz.html)
- [순서 배열 퀴즈](quizzes/sequence-ordering-quiz.html)
- [단답형 확인 퀴즈](quizzes/short-answer-quiz.html)
- [용어 플래시카드](quizzes/flashcards.html)
- [미니 시험 모드](quizzes/mini-exam-mode.html)

### 종합 미션 (capstone/)
- [미니 프로젝트 미션](capstone/mini-project-mission.html)

## 검증 기준
- 카테고리 하위 HTML 샘플 페이지는 38개입니다(`index.html` 제외).
- 각 샘플 페이지는 `method-example` 예시를 정확히 3개 포함하며, 그중 첫 번째는 Chapter 13 원본을 이식했거나(해당 수단이 Chapter 13에 있을 때) Report Event 주제 대표 예시입니다.
- 공통 스타일은 `assets/method-samples.css`, 공통 동작은 `assets/method-samples.js`에 둡니다.
- 모든 페이지에서 가로 스크롤이 발생하지 않습니다(코드 블록만 내부에서 가로 스크롤).
