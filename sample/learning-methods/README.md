# 학습 수단 샘플 라이브러리

> ABAP Lesson 초안 생성 시 텍스트 설명을 넘어 어떤 시각화, 상호작용, 퀴즈 수단을 선택할지 빠르게 참고하기 위한 standalone HTML 샘플 모음입니다.

## 사용 방법
- 먼저 `.project-docs/10_LEARNING_CONTENT_METHODS.md`에서 수단 선택 기준을 확인합니다.
- 아래 목록에서 주제에 맞는 샘플 페이지를 열고, 예시 초안 3개 중 가장 가까운 구성을 Lesson에 맞게 변형합니다.
- 실제 `docs/abap/lesson-content/*.html`에 넣을 때는 fragment 규칙에 맞춰 CSS/JS를 공통 asset으로 분리합니다.

## 샘플 목록

### 기초 구성
- [콜아웃 패턴](foundations/callout-patterns.html) - 학습 목표, 실무 주의, 팁을 짧고 눈에 띄게 고정하는 수단 / 원천 수단: 학습 목표 콜아웃, 실무 주의 콜아웃, 일반 콜아웃
- [개념 도입 스토리](foundations/concept-storytelling.html) - 오개념을 흔들고 새 개념을 일상적인 업무 흐름으로 연결하는 수단 / 원천 수단: 개념 도입 스토리, 일상 비유 스토리
- [미니 실습과 완료 조건](foundations/practice-and-completion.html) - 학습자가 직접 해볼 작업과 성공 판정 기준을 한 세트로 제공하는 수단 / 원천 수단: 미니 실습, 완료 조건
- [공식 링크 섹션](foundations/official-links-section.html) - 학습 내용의 정확성 근거와 추가 학습 경로를 제공하는 수단 / 원천 수단: SAP Help 링크, 공식 문서 경로
- [한눈에 정리](foundations/summary-recap.html) - Lesson 마지막에 핵심과 다음 학습 연결을 압축하는 수단 / 원천 수단: 핵심 요약, 다음 Lesson 예고
- [접이식 해설](foundations/foldable-explanation.html) - 정답, 고급 팁, 보충 설명을 필요할 때만 펼치게 하는 수단 / 원천 수단: details 해설, 보충 설명
- [치트시트 매트릭스](foundations/cheat-sheet-matrix.html) - 언제 쓰는지, 어떤 코드가 필요한지, 금지할 패턴을 표로 정리하는 수단 / 원천 수단: 치트시트 매트릭스

### 시각화
- [탭형 점진 빌드업 다이어그램](visuals/progressive-tab-diagram.html) - 복잡한 흐름을 단계별 탭으로 나누어 하나씩 확장하는 수단 / 원천 수단: 탭형 점진 빌드업 다이어그램
- [Mermaid 흐름도](visuals/mermaid-flowchart.html) - 순서와 분기를 간결한 다이어그램 문법으로 표현하는 수단 / 원천 수단: Mermaid 흐름도
- [코드와 다이어그램 좌우 비교](visuals/code-diagram-split.html) - 추상 흐름과 실제 ABAP 코드를 같은 화면에서 매핑하는 수단 / 원천 수단: 코드와 다이어그램 좌우 비교
- [상태 변화 그리드](visuals/state-change-grid.html) - 실행 전후 데이터 상태를 행과 열로 비교하는 수단 / 원천 수단: 상태 변화 그리드
- [관계도](visuals/relationship-map.html) - DDIC, 객체, 데이터 흐름의 관계를 노드와 연결선으로 보여주는 수단 / 원천 수단: 관계도
- [프로세스 플로우](visuals/process-flow.html) - 업무 또는 런타임 처리 순서를 단계 카드로 보여주는 수단 / 원천 수단: 프로세스 플로우
- [전후 비교](visuals/before-after-comparison.html) - Bad/Good, Classic/Modern, 실행 전후 차이를 나란히 보여주는 수단 / 원천 수단: 전/후 비교
- [성공 실패 배지](visuals/success-failure-badges.html) - 분기 결과나 sy-subrc 상태를 즉시 읽히는 배지로 표시하는 수단 / 원천 수단: 성공/실패 배지
- [현재 행 강조](visuals/current-row-highlight.html) - LOOP, READ, 검색 알고리즘에서 현재 처리 위치를 강조하는 수단 / 원천 수단: 현재 행 강조
- [정적 SVG 아키텍처](visuals/static-svg-architecture.html) - CDS, RAP, ALV Container 같은 계층 구조를 외부 이미지 없이 표현하는 수단 / 원천 수단: 인라인 SVG, 애니메이션 없는 SVG 아키텍처
- [화면 캡처 갤러리](visuals/visual-media-gallery.html) - SAP GUI나 ADT 화면 변화를 순서형 이미지처럼 보여주는 수단 / 원천 수단: 캡처 이미지, 단계별 스크린샷 갤러리
- [샘플 데이터 테이블](visuals/sample-data-table.html) - 작은 데이터셋과 결과셋을 함께 제시해 SQL과 Internal Table 변화를 이해시키는 수단 / 원천 수단: 샘플 데이터 테이블

### 코드 학습
- [ABAP Editor Mockup](code-learning/abap-editor-mockup.html) - 브라우저 안에 코드 편집기 느낌을 만들어 코드 읽기를 돕는 수단 / 원천 수단: ABAP Editor Mockup
- [코드 키워드 아코디언](code-learning/code-keyword-accordion.html) - 긴 예제 코드의 키워드 단위 의미를 접이식으로 설명하는 수단 / 원천 수단: 코드 키워드 아코디언 가이드
- [Bad/Good Practice Hover Mapping](code-learning/bad-good-hover-mapping.html) - 안티패턴 위에 hover하면 좋은 코드와 대응 이유를 연결하는 수단 / 원천 수단: Bad/Good Practice Hover Mapping
- [빈칸 코드 완성](code-learning/fill-blank-code.html) - 핵심 키워드나 조건식을 직접 채워 개념 회수를 유도하는 수단 / 원천 수단: 빈칸 코드 완성
- [코드 라인 매칭](code-learning/code-line-matching.html) - 코드 줄과 실행 단계 또는 설명을 연결하게 하는 수단 / 원천 수단: 코드 라인 매칭
- [오류 찾기 미션](code-learning/bug-hunt-mission.html) - 일부러 틀린 코드에서 실무 버그를 찾아 고치게 하는 수단 / 원천 수단: 오류 찾기 미션

### 상호작용
- [가상 Sandbox 시뮬레이터](interactive/interactive-sandbox-simulator.html) - 입력값을 바꾸면 로그나 결과가 달라지는 작은 브라우저 실험실 / 원천 수단: 가상 SAP GUI Sandbox, 미니 케이스 시뮬레이터
- [Step Debugger Timeline](interactive/step-debugger-timeline.html) - Next 버튼으로 현재 이벤트, 변수, 출력 상태를 따라가는 수단 / 원천 수단: Step Debugger Simulator, 디버거 타임라인
- [의사결정 트리](interactive/decision-tree.html) - 조건에 따라 어떤 ABAP 기술을 선택할지 안내하는 수단 / 원천 수단: 의사결정 트리
- [실무 체크리스트](interactive/practical-checklist.html) - PR 전 점검표처럼 품질 기준을 빠짐없이 확인하는 수단 / 원천 수단: 실무 체크리스트
- [Breakpoint 체크리스트](interactive/breakpoint-checklist.html) - 어디에 breakpoint를 걸고 어떤 값을 봐야 하는지 안내하는 수단 / 원천 수단: Breakpoint 체크리스트
- [예상 로그 비교](interactive/expected-log-comparison.html) - 정상 로그와 오류 로그를 비교해 런타임 차이를 이해시키는 수단 / 원천 수단: 예상 로그 비교

### 퀴즈
- [드래그 앤 드롭 퀴즈](quizzes/drag-drop-quiz.html) - 카드나 단계 토큰을 올바른 위치로 옮기며 회수 학습하는 수단 / 원천 수단: 드래그 앤 드롭 퀴즈
- [카드 분류 퀴즈](quizzes/card-sorting-quiz.html) - 기술, 책임, 이벤트를 여러 그룹으로 분류하게 하는 수단 / 원천 수단: 카드 분류 퀴즈
- [순서 배열 퀴즈](quizzes/sequence-ordering-quiz.html) - 처리 단계 카드를 올바른 실행 순서로 배열하는 수단 / 원천 수단: 순서 배열 퀴즈
- [단답형 확인 퀴즈](quizzes/short-answer-quiz.html) - 핵심 개념을 짧은 말로 직접 회수하게 하는 수단 / 원천 수단: 단답형 확인 퀴즈
- [용어 플래시카드](quizzes/flashcards.html) - 앞면과 뒷면을 반복하며 용어를 암기하는 수단 / 원천 수단: 용어 플래시카드
- [미니 시험 모드](quizzes/mini-exam-mode.html) - 여러 문항을 한 번에 풀고 점수와 해설을 확인하는 수단 / 원천 수단: 미니 시험 모드

### 종합 미션
- [미니 프로젝트 미션](capstone/mini-project-mission.html) - 여러 Lesson을 묶어 작은 완성물을 만드는 수단 / 원천 수단: 미니 프로젝트 미션

## 검증 기준
- 카테고리 하위 HTML 샘플 페이지는 38개입니다.
- 각 샘플 페이지는 `method-example` 예시 카드를 정확히 3개 포함합니다.
- 공통 스타일은 `assets/method-samples.css`, 공통 동작은 `assets/method-samples.js`에 둡니다.
