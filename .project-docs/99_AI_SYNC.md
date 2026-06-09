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
- **현재 목표**: Track 1(THEORY-*) Lesson 본문 작성. 총 137개 중 12개(THEORY-01~THEORY-02) 작성 완료. **125개 남음**.
- **최근 진행(2026-06-09, Codex)**: THEORY-02-M01~M06 신규 작성 완료. ABAP Program 기본 구조, DATA/CONSTANTS/TYPES, WRITE, IF/CASE, DO/WHILE, String/System Field를 초심자 학습지 톤으로 작성하고 글로서리 미정의 0건을 확인함.
- **⚠️ 인계 핵심 문서**: 이어서 작업할 AI는 **[HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)를 가장 먼저 정독**할 것. 작성 규칙·스타일 기준·복붙용 프롬프트가 모두 거기 있음.

---

## 미결 사항 (Pending Issues / Next Steps)
- **Lesson 본문 양산**: 다음은 THEORY-03 ~ THEORY-21 (125개). 현재 확정된 10·20대 초심자 친화적 스타일과 "한눈에 정리" 마무리 방식을 그대로 적용한다. Track 2(PRACTICAL-*)는 그 다음.
- **글로서리 완전 패리티**: Lesson에서 쓰는 주요 용어는 `reference/abap_glossary.json`에 반드시 함께 등록(일상 비유 포함). 미등록 용어는 툴팁이 안 뜸(깨진 링크).
- (선택) Lesson 내 퀴즈·실습 코드 블록 등 상호작용 컴포넌트 고도화.

### 🐞 용어 팝업이 안 뜬다는 사용자 보고 — 진단 완료(코드 결함 아님)
- 원인: `lesson-content/<ID>.html`은 **조각(fragment) 파일**이라 단독으로 브라우저에서 열면 CSS/JS가 로드되지 않음.
- 올바른 확인법: **로컬 서버**에서 `docs/abap/lesson-viewer.html?lesson=<ID>`로 열 것. (`file://` 직접 열기는 fetch가 CORS로 막힘)
  - 예: 루트에서 `python -m http.server` → `http://localhost:8000/docs/abap/lesson-viewer.html?lesson=THEORY-01-M02`

---

## 작업 이력 (Work Log)

### [2026-06-08] Antigravity IDE (Gemini 3.1 Pro)
- (기존 내용 생략)

### [2026-06-09] Claude (Opus 4.8)
- (기존 내용 생략)
- **사용자 피드백(작성 직후 수신, 다음 AI가 반드시 반영)**:
  1. 현재 본문이 "아는 사람 복습용" 느낌 → **완전 입문자 학습용**으로 더 친절하게.
  2. **분량 ↑** + 끝에 **핵심만 추린 요약 마무리 섹션** 추가.
  3. **10·20대 젊은 톤**(현재 스타일 유지하되 더 캐주얼).

### [2026-06-09] Antigravity IDE (Gemini 3.1 Pro)
- **작업 내용**:
  - THEORY-01-M02~M06 5개 파일 사용자 피드백(친절한 초심자용 서술, 분량 보강, 한눈에 정리 섹션 추가)에 맞춰 전면 재작성.
  - 글로서리 검증 스크립트 실행(미정의 0건 확인).
  - 진행 현황 문서(HANDOFF) 및 AI_SYNC 업데이트.
- **수정 파일**: `docs/abap/lesson-content/THEORY-01-M02~M06.html`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 이후 THEORY-02부터 작성 시 이번에 재작성된 THEORY-01-M02의 스타일과 분량을 꼭 참조하여 작성 바랍니다.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - 사용자 지시에 따라 범위를 THEORY-01-M02~M06 재보강으로 제한하고, THEORY-02 이후 신규 작성은 진행하지 않음.
  - M02~M06을 "지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 설정/확인 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리" 흐름으로 재정렬.
  - 글로서리 신규 용어 11종 추가 및 기존 `used_in_lessons` 일부 보정, 미정의 0건 확인.
- **수정 파일**: `docs/abap/lesson-content/THEORY-01-M02~M06.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 당시에는 THEORY-02 신규 작성을 보류했으나, 이후 아래 Codex 작업에서 THEORY-02 작성 완료.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-02-M01~M06 6개 Lesson 신규 작성.
  - ABAP 기본 문법을 REPORT → 선언 → WRITE → 조건 → 반복 → 시스템 필드 순서로 연결하고, 각 Lesson에 "한눈에 정리" 마무리 섹션 포함.
  - 글로서리 신규 용어 24종 추가 및 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-02-M01, M03, M06 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-02-M01~M06.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-03 `PARAMETERS 기반 Selection Screen 맛보기`.
