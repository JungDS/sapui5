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
- **현재 목표**: Track 1(THEORY-*) 전체 Lesson 본문(`docs/abap/lesson-content/<ID>.html`)을 순서대로 작성. 총 137개 중 6개 작성됨(M01 + M02~M06), **131개 남음**.
- **최근 진행(2026-06-09, Claude Opus)**: THEORY-01(DDIC 1차) M02~M06 5개 작성 + 글로서리 12개 추가. 브랜치 `feature/abap-lesson-content`(PR 생성). 작성 직후 **사용자 피드백으로 작성 방향 전면 조정 필요**(아래 미결 사항 참조).
- **⚠️ 인계 핵심 문서**: 이어서 작업할 AI는 **[HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)를 가장 먼저 정독**할 것. 작성 규칙·스타일 기준·복붙용 프롬프트가 모두 거기 있음.

---

## 미결 사항 (Pending Issues / Next Steps)
- **[최우선] 사용자 피드백 반영해 작성 스타일 재정립** (THEORY-01-M02~M06 재작성 + THEORY-02~21 신규에 모두 적용):
  1. **입문자(완전 초심자) 학습용**으로. 현재 M02~M06은 "아는 사람의 복습용" 느낌이 남 → 모르는 사람이 처음 배우는 흐름으로 더 친절하게.
  2. **분량을 더 늘릴 것**. 단, 끝에 **꼭 필요한 내용만 추린 "요약/정리" 마무리 섹션**을 둘 것(AI가 판단해 핵심만).
  3. **10·20대 젊은 층 톤**으로. 현재 문장/스타일도 나쁘지 않으니 유지하되 더 캐주얼·생동감 있게.
- **Lesson 본문 양산**: THEORY-02 ~ THEORY-21 (131개). Track 2(PRACTICAL-*)는 그 다음.
- **글로서리 완전 패리티**: Lesson에서 쓰는 주요 용어는 `reference/abap_glossary.json`에 반드시 함께 등록(일상 비유 포함). 미등록 용어는 툴팁이 안 뜸(깨진 링크).
- (선택) Lesson 내 퀴즈·실습 코드 블록 등 상호작용 컴포넌트 고도화.

### 🐞 용어 팝업이 안 뜬다는 사용자 보고 — 진단 완료(코드 결함 아님)
- 원인: `lesson-content/<ID>.html`은 **조각(fragment) 파일**이라 단독으로 브라우저에서 열면 CSS/JS가 로드되지 않음.
- 올바른 확인법: **로컬 서버**에서 `docs/abap/lesson-viewer.html?lesson=<ID>`로 열 것. (`file://` 직접 열기는 fetch가 CORS로 막힘)
  - 예: 루트에서 `python -m http.server` → `http://localhost:8000/docs/abap/lesson-viewer.html?lesson=THEORY-01-M02`

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

### [2026-06-09] Claude (Opus 4.8)
- **작업 내용**:
  - THEORY-01(DDIC 1차) Lesson 5개 신규 작성: `THEORY-01-M02`(Domain), `M03`(Data Element), `M04`(Structure), `M05`(Transparent Table), `M06`(Technical Settings). M01 스타일(학습목표 콜아웃 → 5섹션 → 콜아웃/blockquote/glossary → 다음 단계) 준수, JSON `learning_content_design`·`technical_keywords`·`caution_points`에 근거.
  - 글로서리 12개 추가(완전 패리티, 각 일상 비유 포함): Domain·DataType·FixedValue·DataElement·FieldLabel·Structure·Component·TransparentTable·KeyField·MANDT·TechnicalSettings·DataBrowser. 본문 `data-glossary` ↔ 사전 키 대조 미정의 0건 검증.
  - 브랜치 `feature/abap-lesson-content`에 커밋(`84ef31a`) 후 PR 생성.
- **사용자 피드백(작성 직후 수신, 다음 AI가 반드시 반영)**:
  1. 현재 본문이 "아는 사람 복습용" 느낌 → **완전 입문자 학습용**으로 더 친절하게.
  2. **분량 ↑** + 끝에 **핵심만 추린 요약 마무리 섹션** 추가.
  3. **10·20대 젊은 톤**(현재 스타일 유지하되 더 캐주얼).
- **수정 파일**: `docs/abap/lesson-content/THEORY-01-M02~M06.html`(신규 5), `reference/abap_glossary.json`(용어 12 추가).
- **다음 AI를 위한 메모**: **[HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)** 에 작성 규칙·스타일 기준·복붙 프롬프트·진행 현황을 모두 정리해 두었으니 그것부터 읽을 것. THEORY-01-M02~M06도 위 피드백 기준으로 **재작성 대상**임.
  - 참고: 운영 거버넌스 정비 작업이 **별도 PR(브랜치 `docs/sync-lesson-viewer-and-pr-backfill`)**로 열려 있음(문서 동기화 + archive 정책 훅). Lesson 작업과 독립적이나 같이 인지할 것.
