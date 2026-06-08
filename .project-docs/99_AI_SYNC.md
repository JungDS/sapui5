# AI Workspace Synchronization Log (AI-SYNC)

## 목적 및 규칙 (Purpose & Rules)
본 파일(`.project-docs/99_AI_SYNC.md`)은 여러 AI 모델(Codex, Antigravity, Claude 등)이 컨텍스트를 공유하고 작업을 이어가기 위한 공통 데이터베이스 역할을 합니다.
새로운 채팅 또는 새로운 AI 모델이 투입되었을 때, 이 파일을 가장 먼저 읽어 이전 작업의 맥락과 현재 진행 상태를 파악해야 합니다.

### 규칙
1. **작업 시작 시**: 항상 이 파일을 읽고 "Current Status & Goals" 및 "Pending Issues"를 확인합니다.
2. **작업 종료 시**: 수행한 내용을 "Work Log"에 추가하고, 미결 사항(Pending Issues)을 업데이트합니다.
3. 내역을 추가할 때는 최신 내용이 가장 위로 오도록(역순 배치) 기록하거나, 시간 순서대로 기록하되 명확하게 날짜/시간을 명시합니다. (현재는 최신 내용을 아래로 누적하는 것을 권장합니다.)
4. **[필수] 개발 일지 작성**: 작업을 마칠 때마다 `.project-docs/changelogs/CHANGELOG_YYYYMMDD.md` 파일에 작업 상세 내용, 참여 AI 모델, 일시, **고민했던 점(설계 이유 등)**을 의무적으로 남기고, `.project-docs/08_DEV_DIARY.md`에 링크를 연결해야 합니다.

---

## 현재 상태 및 목표 (Current Status & Goals)
- **현재 목표**: ABAP 커리큘럼의 실제 "Lesson" 학습 페이지들을 구축하고, Section Detail 요약 페이지에서 진입할 수 있는 흐름 만들기.
- **최근 진행**: 단일 뷰어 아키텍처(`docs/abap/lesson-viewer.html`) 도입 완료. Lesson 본문 콘텐츠는 `docs/abap/lesson-content/*.html` 로 완전히 분리하였으며, JSON 커리큘럼 데이터를 읽어 이전/다음 네비게이션을 동적으로 렌더링함. Inpa Dev 블로그 스타일을 벤치마킹하여 `THEORY-01-M01` 본문을 시각적으로 재설계함. (Antigravity가 진행)

---

## 미결 사항 (Pending Issues / Next Steps)
- 전체 Lesson(Track 1, Track 2 등) 페이지 양산 (현재는 `THEORY-01-M01` 만 작성되어 있음).
- 향후 Lesson 페이지 내에서의 퀴즈, 실습 코드 블록 등 학습자 상호작용 컴포넌트 고도화.

---

## 작업 이력 (Work Log)

### [2026-06-08] Antigravity IDE (Gemini 3.1 Pro)
- **작업 내용**: 
  - 정적 파일 방식(100개 HTML 생성)의 한계를 극복하기 위해 `lesson-viewer.html` 단일 템플릿 아키텍처로 개편.
  - `assets/abap-lesson-viewer.js` 를 신규 작성하여 URL 파라미터(`?lesson=THEORY-01-M01`)로부터 커리큘럼 JSON을 조회하고, 브레드크럼/사이드바/Pager를 동적 생성하도록 구현.
  - 유명 IT 블로그(Inpa Dev)의 시각적 요소(Callout 팁/경고 박스, 인용구, 이모지)를 차용하여 `docs/abap/lesson-content/THEORY-01-M01.html` 학습 콘텐츠 재작성. 본문 내용은 철저히 JSON의 `learning_content_design` 지침에 따름.
  - 학습자 이해를 돕기 위해 `reference/abap_glossary.json` 기반의 용어 사전(Glossary) 시스템 구축 및 마우스 호버 팝업 툴팁 기능 구현. **용어를 클릭하면 팝업이 고정(Pin)되어 텍스트 복사가 가능하도록 사용성 개선 완료.**
  - **Lesson 단일 뷰어 UI/UX 피드백 반영 완료:**
    - 우측 Navigation 패널의 문서목차(Lesson 목록)와 학습경로(전체 Chapter Stepper UI)를 하이브리드 형태로 완벽 융합 완료.
    - Hero 섹션의 눈썹 텍스트 중복 제거, Track 뱃지 파싱(`Track 1`) 및 컬러(`purple`) 차별화, 뱃지 간격(`gap`) 수정 완료.
    - 본문 내 `<h2>` 제목 호버 효과를 섹션(`.lesson-section`) 전체로 영역 확장하여 사용성 개선.
    - 이전/다음 Pager 버튼의 불필요한 화살표 이동 애니메이션을 제거하고 텍스트를 고정하여 깔끔한 UI 복원 완료.
- **수정 파일**: 
  - `docs/abap/lesson-viewer.html` (신규)
  - `assets/abap-lesson-viewer.js`, `assets/abap-lesson-viewer.css` (신규, Nav UI 및 뱃지 파싱 고도화)
  - `assets/abap-glossary.js`, `assets/abap-glossary.css` (신규, Click-to-Pin 기능 및 닫기 버튼 추가)
  - `assets/shell.css` (회색 뱃지 `.stage7-badge.gray` 스타일 추가)
  - `reference/abap_glossary.json` (신규)
  - `docs/abap/lesson-content/THEORY-01-M01.html` (신규)
  - `docs/roadmap/abap-curriculum-section-detail.js` (학습하기 버튼 URL 변경)
- **다음 AI를 위한 메모**: 
  - 새로운 Lesson을 추가할 때는 HTML 뼈대를 새로 만들 필요가 전혀 없습니다. 오직 `docs/abap/lesson-content/[JSON_ID].html` 파일만 생성하고 그 안에 `<p>`, `<h2>`, `<div class="lesson-callout">` 등의 순수 콘텐츠만 넣으면 뷰어가 알아서 조립해 줍니다.
  - JSON의 `learning_content_design` 에 명시된 N단계 흐름을 항상 본문 구성에 반영해 주세요.
  - 용어 사전에 추가하고 싶은 키워드는 `reference/abap_glossary.json`에 등록하면 자동으로 툴팁이 활성화됩니다. 용어 클릭 시 자동 고정(Pin) 기능이 내장되어 있습니다.
  - **[HOTFIX 2026-06-08]**: 기존 `common.js`의 `data-term` 기반 모달과 충돌을 방지하기 위해 새로운 용어 사전 시스템은 `data-glossary="용어"` 속성을 사용하도록 수정되었습니다. 향후 용어 태깅 시 반드시 `data-glossary`를 사용해야 합니다.
