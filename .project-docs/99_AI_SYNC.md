# AI Workspace Synchronization Log (AI-SYNC)

> 📅 **최종수정: 2026-06-11 KST**

## 목적 및 규칙 (Purpose & Rules)
본 파일(`.project-docs/99_AI_SYNC.md`)은 여러 AI 모델(Codex, Antigravity, Claude 등)이 컨텍스트를 공유하고 작업을 이어가기 위한 공통 데이터베이스 역할을 합니다.
새로운 채팅 또는 새로운 AI 모델이 투입되었을 때, 이 파일을 가장 먼저 읽어 이전 작업의 맥락과 현재 진행 상태를 파악해야 합니다.

### 규칙
1. **작업 시작 시**: 항상 이 파일을 읽고 "Current Status & Goals" 및 "Pending Issues"를 확인합니다.
2. **작업 종료 시**: 수행한 내용을 "Work Log"에 추가하고, 미결 사항(Pending Issues)을 업데이트합니다.
3. 내역을 추가할 때는 최신 내용이 가장 위로 오도록(역순 배치) 기록하거나, 시간 순서대로 기록하되 명확하게 날짜/시간을 명시합니다. (현재는 최신 내용을 아래로 누적하는 것을 권장합니다.)
4. **[필수] 개발 일지 작성**: 작업을 마칠 때마다 `.project-docs/changelogs/CHANGELOG_YYYYMMDD.md` 파일에 작업 상세 내용, 참여 AI 모델, 일시, **고민했던 점(설계 이유 등)**을 의무적으로 남기고, `.project-docs/08_DEV_DIARY.md`에 링크를 연결해야 합니다.
5. **[필수] AI 작업자 표기**: AI Agent가 만든 커밋은 커밋 본문에 `AI-Author: <AI/모델명>` 또는 `Co-Authored-By: <AI/모델명>`을 남깁니다. 과거 커밋처럼 확인이 어려운 경우 PR 본문에 "커밋 단위 확인 불가, 문서 Work Log 기준 추정"이라고 명시합니다.

---

## 현재 상태 및 목표 (Current Status & Goals)
- **현재 목표**: 🎉 **Track 1(THEORY-*) 137/137 작성 완료!** (THEORY-01~21 전부). 사용자의 새 목표에 따라 Track 1을 "고품질 교육용 웹페이지" 기준으로 재감사·보강하는 라운드를 준비 중. 기준 문서: [TRACK1_QUALITY_PLAN.md](TRACK1_QUALITY_PLAN.md). 병행 다음 목표는 **Track 2(PRACTICAL-* 13개 섹션)** 신규 작성.
- **최근 진행(2026-06-11, Codex)**: `Chapter 20`을 Track 1 고품질화 기준으로 보강해 실습 과제, 완료 조건, 확인 퀴즈, 정답/해설, SAP 공식 링크를 추가. NotebookLM, 로컬 reference, SAP 공식 문서를 교차 검증해 CDS View Entity/VDM/Association/Annotation/MDE/DCL 누락 위험을 보정.
- **⚠️ 동시 작업 주의**: AI 작업 간 겹침 방지를 위해 섹션 단위 작업을 엄수.
- **⚠️ 인계 핵심 문서**: 이어서 작업할 AI는 **[HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)를 가장 먼저 정독**할 것. 작성 규칙·스타일 기준·복붙용 프롬프트가 모두 거기 있음.

---

## 미결 사항 (Pending Issues / Next Steps)
- **Track 1 고품질화**: `Chapter 1~3`, `Chapter 20` 기준 패턴 적용 완료. 나머지 Lesson은 설명·글로서리·실무 주의·요약 기반은 갖췄지만, 전 Lesson 공통의 퀴즈/정답/해설, 공식 링크, 실습 완료 조건은 아직 부족하다. 다음 진행 범위는 `Chapter 21`이며 RAP/ABAP Cloud/Released API는 공식 SAP 문서로 최신성 재검증 필수.
- **Lesson 본문 양산**: Track 1 완료. 다음은 **Track 2(PRACTICAL-* 13개 섹션, 약 70개 Lesson)** 신규 작성. 같은 스타일(초심자·한눈에 정리·글로서리 패리티·추적 3종 동시 갱신·Chapter/Lesson 용어)을 그대로 적용한다. JSON의 `d.tracks[1]`에서 PRACTICAL 섹션/Lesson ID 추출.
- **[완료] 신규 19~21 코드블록 서식 및 CSS 아키텍처 리팩토링**: Antigravity가 네이비 ABAP Editor 포맷터 개선을 통해 에디터 외곽 인라인 스타일을 CSS 클래스로 분리했고, Codex가 코드 하이라이트 토큰까지 `abap-token-*` 클래스로 공통화함.
- **[프로세스] 섹션 작성 후 추적 3종 동시 갱신**: 섹션 커밋 시 ① `HANDOFF_LESSON_CONTENT.md` 진행표 ② 본 파일(99_AI_SYNC) 작업이력/현황 ③ `changelogs/CHANGELOG_<날짜>.md`를 함께 갱신할 것(누락 주의).
- **글로서리 완전 패리티**: Lesson에서 쓰는 주요 용어는 `reference/abap_glossary.json`에 반드시 함께 등록(일상 비유 포함). 미등록 용어는 툴팁이 안 뜸(깨진 링크).
- (선택) Lesson 내 퀴즈·실습 코드 블록 등 상호작용 컴포넌트 고도화.

### 🐞 용어 팝업이 안 뜬다는 사용자 보고 — 진단 완료(코드 결함 아님)
- 원인: `lesson-content/<ID>.html`은 **조각(fragment) 파일**이라 단독으로 브라우저에서 열면 CSS/JS가 로드되지 않음.
- 올바른 확인법: **로컬 서버**에서 `docs/abap/lesson-viewer.html?lesson=<ID>`로 열 것. (`file://` 직접 열기는 fetch가 CORS로 막힘)
  - 예: 루트에서 `python -m http.server` → `http://localhost:8000/docs/abap/lesson-viewer.html?lesson=THEORY-01-M02`

---

## 작업 이력 (Work Log)

### [2026-06-11] Codex (GPT-5) — Chapter 20의 Lesson 1~6 고품질화 패턴 확산
- **작업 내용**:
  - `Chapter 20의 Lesson 1~6`에 미니 실습, 완료 조건, SAP 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
  - NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`의 CDS/VDM/DCL 근거 매트릭스를 참고하되, View Entity, Association/path expression, Annotation, Metadata Extension, DCL은 SAP Help Portal ABAP Keyword Documentation과 SAP Help Portal 문서로 교차 검증.
  - `@AbapCatalog.sqlViewName`, VDM 계층 책임, Cardinality, `@Metadata.allowExtensions`, `DEFINE ROLE` 등 초심자 오해가 큰 지점을 실습과 퀴즈로 보강.
  - `TRACK1_QUALITY_PLAN.md`, `HANDOFF_LESSON_CONTENT.md`, 개발 일지/체인지로그를 Chapter 20 완료 상태로 갱신.
- **검증 메모**:
  - Chapter 20의 6개 Lesson 모두 완료 조건/퀴즈/공식 링크 3개/사용자 화면 내부 ID 미노출 조건 확인.
  - 이번 변경은 새 plain `<pre><code>` 블록을 만들지 않았고 기존 ABAP editor mockup을 유지했다.

### [2026-06-11] Codex (GPT-5) — Chapter 3의 Lesson 1~4 고품질화 패턴 확산
- **작업 내용**:
  - `Chapter 3의 Lesson 1~4`에 미니 실습, 완료 조건, SAP 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
  - 기존 PARAMETERS/Selection Screen 설명과 코드 예제는 유지하고, 학습 완결 요소만 끝부분에 좁게 보강.
  - SAP Help Portal ABAP Keyword Documentation의 `PARAMETERS`, `SELECTION-SCREEN`, Output Statement 링크와 기존 SAP Learning 링크를 Lesson별 3개씩 연결.
  - NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide` 확인 결과, `SELECT-OPTIONS`, `AT SELECTION-SCREEN`, Variant는 Chapter 3의 PARAMETERS 기초 범위 밖 후속 주제로 분리하는 것이 적절하다고 판단.
  - `TRACK1_QUALITY_PLAN.md`, `HANDOFF_LESSON_CONTENT.md`, 개발 일지/체인지로그를 Chapter 3 완료 및 Chapter 1~3 파일럿 리뷰 상태로 갱신.
- **검증 메모**:
  - Track 1 전체 `data-glossary` 미정의 0건, lesson-content 인라인 스타일 0건, `<script>`/`<style>`/인라인 이벤트 0건 확인.
  - Chapter 3의 4개 Lesson 모두 완료 조건/퀴즈/공식 링크 3개/사용자 화면 내부 ID 미노출 조건 확인.
  - Lesson Viewer에서 Chapter 3의 Lesson 1~4 렌더링을 확인.
  - `node tools/format-abap-code.mjs`는 전체 파일 대상 실행 중 `THEORY-19-M01.html` 쓰기 권한 오류로 중단됐다. 이번 변경은 코드 블록을 추가하지 않았고 변경 파일 4개에는 plain `<pre><code>`가 없어 별도 서식 변경은 필요 없었다.

### [2026-06-10] Codex (GPT-5) — Chapter 2의 Lesson 1~6 고품질화 패턴 확산
- **작업 내용**:
  - `Chapter 2의 Lesson 1~6`에 미니 실습, 완료 조건, SAP 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
  - NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`의 ABAP 기본 문법 요약을 참고해 REPORT/선언/WRITE/조건/반복/시스템 필드의 흔한 오해를 퀴즈와 실습 문구로 재구성.
  - SAP Learning Basic ABAP Programming 및 SAP Help Portal ABAP Keyword Documentation 공식 링크를 Lesson별 3개씩 연결.
  - 전체 Track 1 글로서리 미정의 0건을 확인하고, 사용자 화면 본문에 내부 ID가 노출되지 않도록 점검.
- **검증 메모**:
  - `node tools/format-abap-code.mjs`는 기존 후반 Lesson 일부도 다시 쓰려고 했으나, 이번 커밋 범위 밖 변경은 원복하고 Chapter 2의 Lesson 1~6만 남겼다.
  - Lesson Viewer에서 `Chapter 2의 Lesson 1~6` 모두 실습/퀴즈/요약/공식 링크/용어 태그 렌더링과 사용자 화면 내부 ID 미노출을 확인.

### [2026-06-10] Codex (GPT-5) — Chapter 1의 Lesson 2~6 고품질화 패턴 확산
- **작업 내용**:
  - `Chapter 1의 Lesson 2~6`에 미니 실습, 완료 조건, SAP 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
  - NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`의 DDIC 요약을 참고해 Domain/Data Element/Structure/Transparent Table/Technical Settings의 흔한 오해를 퀴즈와 실습 문구로 재구성.
  - SAP Learning 및 SAP Help Portal 공식 링크를 Lesson별 3개씩 연결.
  - 전체 Track 1 글로서리 미정의 0건을 확인하고, 사용자 화면 본문에 내부 ID가 노출되지 않도록 점검.
- **검증 메모**:
  - `node tools/format-abap-code.mjs`는 기존 후반 Lesson 일부도 다시 쓰려고 했으나, 이번 커밋 범위 밖 변경은 원복하고 Chapter 1의 Lesson 2~6만 남겼다.
  - Lesson Viewer에서 `Chapter 1의 Lesson 2~6` 모두 실습/퀴즈/요약/공식 링크/용어 태그 렌더링과 사용자 화면 내부 ID 미노출을 확인.

### [2026-06-10] Codex (GPT-5) — Chapter 1의 Lesson 1 고품질화 패턴 적용
- **작업 내용**:
  - `docs/abap/lesson-content/THEORY-01-M01.html`을 초심자 학습 흐름에 맞춰 재구성.
  - 실습 과제, 완료 조건, 확인 퀴즈, 정답/해설, SAP 공식 링크 3개를 추가.
  - `RepositoryObject` 글로서리 항목을 추가하고, 전체 Track 1 글로서리 미정의 0건을 확인.
  - Lesson Viewer에서 실습/퀴즈/요약/공식 링크/용어 태그 렌더링과 사용자 화면 내부 ID 미노출을 확인.
- **검증**:
  - `reference/abap_glossary.json` JSON 파싱 성공.
  - Track 1 `data-glossary` 미정의 0건.
  - `node tools/format-abap-code.mjs` 2회차 수정 0건.
  - `http://localhost:8000/docs/abap/lesson-viewer.html?lesson=THEORY-01-M01` 렌더링 확인.

### [2026-06-10] Codex (GPT-5) — Track 1 고품질화 성공 기준 수립
- **작업 내용**:
  - 작업 시작 전 `main`을 `origin/main`과 fast-forward 동기화하고, `codex/track1-quality-plan` 브랜치를 생성.
  - `.project-docs` 최신 규칙, Track 1 파일 구조, Lesson Viewer 구조, 137개 Lesson의 빠른 정적 품질 감사 결과를 확인.
  - NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`(69개 소스)를 확인하고, Track 1 보강 근거로 활용할 기준을 정리.
  - `TRACK1_QUALITY_PLAN.md`를 추가해 성공 기준, 감사 결과, NotebookLM 활용 원칙, Chapter별 실행 계획을 문서화.
- **다음 AI를 위한 메모**: 실제 Lesson 본문 보강은 이 문서의 완료 기준을 기준으로 Chapter 단위로 진행한다. 특히 퀴즈/정답/해설과 공식 링크는 현재 전 Lesson 공통 기준이 없으므로 첫 Chapter에서 패턴을 확정한 뒤 확산하는 것이 좋다.

### [2026-06-10] Codex (GPT-5) — Lesson 코드 하이라이트 공통화 및 포맷터 보강
- **작업 내용**:
  - `assets/abap-lesson-viewer.css`에 `abap-token-keyword/string/number/comment` 토큰 클래스를 추가.
  - `tools/format-abap-code.mjs`가 `<span style="...">` 대신 토큰 클래스를 생성하도록 수정하고, Track 2 `PRACTICAL-*` 파일명도 처리하도록 패턴 확장.
  - 포맷터를 전체 Lesson에 재실행하여 215개 코드 mockup의 하이라이트를 클래스 기반으로 재생성.
  - `assets/abap-lesson-viewer.js`의 사이드바 고정 인라인 스타일과 Copy 버튼 직접 스타일 조작을 CSS 클래스 기반으로 정리.
  - `docs/abap/lesson-viewer.html`의 lesson viewer CSS/JS 참조에 캐시 버전(`v=20260610-token3`) 부여.
- **검증**:
  - `node tools/format-abap-code.mjs` 재실행 시 수정 0건(멱등성 확인).
  - `docs/abap/lesson-content` 기준 인라인 스타일 0건, `<script>`/`<style>`/인라인 이벤트 0건.
  - 글로서리 미정의 0건.
  - 로컬 뷰어에서 `THEORY-02-M01`, `THEORY-20-M01` 코드 블록/토큰 렌더링 확인.
- **다음 AI를 위한 메모**: Track 2 작성 시 코드 블록은 계속 순수 `<pre><code>`로 작성하고, 섹션 종료 후 개선된 포맷터를 돌리면 된다.

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

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-03-M01~M04 4개 Lesson 신규 작성.
  - PARAMETERS 기본 선언, DEFAULT/OBLIGATORY, 입력값 WRITE 출력, Selection Screen Block 기초를 JSON 지침 범위 안에서 작성.
  - SELECT-OPTIONS와 AT SELECTION-SCREEN은 THEORY-03-M04에서 명시적으로 후속 주제로 남김.
  - 글로서리 신규 용어 11종 추가 및 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-03-M01, M03, M04 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-03-M01~M04.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-04 `DDIC 2차: 관계와 입력 도움말`.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-04-M01~M06 6개 Lesson 신규 작성.
  - Foreign Key/Check Table/Cardinality, Value Table과 Foreign Key 차이, Elementary/Collective Search Help, PARAMETERS와 DDIC F4 Help 연결, DDIC 검증과 프로그램 검증 역할 분리를 JSON 지침 범위 안에서 작성.
  - Value Table은 실제 검증이 아니라 Domain 레벨 후보이며, 실제 검증은 Foreign Key 관계가 핵심임을 명시.
  - 글로서리 신규 용어 12종 추가 및 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-04-M01, M03, M06 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-04-M01~M06.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-05 `ABAP 모듈화 기초`.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-05-M01~M06 6개 Lesson 신규 작성.
  - FORM/PERFORM 기본 호출, USING/CHANGING 파라미터, CALL FUNCTION 구조, Local Class 정의/호출, Global Class 호출, Subroutine/Function/Class 선택 기준을 JSON 지침 범위 안에서 작성.
  - 기존 코드 이해에는 FORM과 Function Module이 필요하지만, 신규 설계에서는 Class 기반 모듈화를 우선 고려한다는 실무 감각을 함께 설명.
  - 글로서리 신규 용어 23종 추가 및 기존 `SYSUBRC` 사용 Lesson 보정, 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-05-M01, M03, M06 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-05-M01~M06.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-06 `Internal Table 기초`.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-06-M01~M06 6개 Lesson 신규 작성.
  - Internal Table의 필요성, Runtime Memory와 Application Server 위치, Line Type/Work Area/STANDARD TABLE 선언, APPEND/INSERT, LOOP AT, READ TABLE, 미니 데이터 가공 흐름을 JSON 지침 범위 안에서 작성.
  - Transparent Table과 Internal Table의 차이, 빈 테이블/검색 실패/SY-SUBRC 확인, LOOP 안 성능 비용을 초심자용 경고로 정리.
  - 글로서리 신규 용어 12종 추가 및 기존 `WorkArea`, `WRITEStatement`, `SYSUBRC` 사용 Lesson 보정, 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-06-M01, M04, M06 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-06-M01~M06.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-07 `Internal Table 응용 / Deep Structure`.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-07-M01~M09 9개 Lesson 신규 작성.
  - MODIFY/INDEX/TRANSPORTING, DELETE/WHERE, SORT/ASCENDING/DESCENDING, READ TABLE BINARY SEARCH, SORTED/HASHED TABLE, FIELD-SYMBOLS/ASSIGNING, Secondary Key, Deep Structure, CLEAR/REFRESH/FREE를 JSON 지침 범위 안에서 작성.
  - INDEX 의존, DELETE 조건 과다, BINARY SEARCH 정렬 전제, Field Symbol 원본 변경, Deep Structure 복사/메모리 비용을 초심자용 경고로 정리.
  - 글로서리 신규 용어 26종 추가 및 기존 `SYSUBRC` 사용 Lesson 보정, 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-07-M01, M06, M09 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-07-M01~M09.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-08 `Simple ALV / SALV 1차`.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-08-M01~M05 5개 Lesson 신규 작성.
  - SALV 목적과 CL_SALV_TABLE 개요, FACTORY Method로 Internal Table 출력, 기본 Functions와 DISPLAY 실행, Internal Table → SALV 미니 리포트, Sort/Layout/Variant 심화 범위 분리를 JSON 지침 범위 안에서 작성.
  - SALV는 조회용 기본 표시 도구이며, 복잡한 편집/이벤트/Cell Style/Layout Variant 심화는 THEORY-19로 넘긴다는 범위 경계를 명시.
  - 글로서리 신규 용어 11종 추가 및 기존 `InternalTable` 사용 Lesson 보정, 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-08-M01, M03, M05 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-08-M01~M05.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-09 `Open SQL 1차: 기본 조회`.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-09-M01~M06 6개 Lesson 신규 작성.
  - SELECT FROM/FIELDS 기본 구조, WHERE 조건과 Host Variable @, SELECT SINGLE 단건 조회, INTO TABLE Result Set 적재, 명시적 Target Table 선언, SELECT in LOOP 안티패턴을 JSON 지침 범위 안에서 작성.
  - 조건 없는 대량 조회, SELECT SINGLE 키 조건 부족, INTO TABLE 메모리 부담, 반복 SELECT 성능 위험을 초심자용 경고로 정리.
  - 글로서리 신규 용어 13종 추가 및 기존 `WHEREClause`, `PARAMETERSStatement`, `SYSUBRC`, `InternalTable` 사용 Lesson 보정, 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-09-M01, M03, M06 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-09-M01~M06.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-10 `SELECT-OPTIONS와 Range Table`.

### [2026-06-09] Codex (GPT-5)
- **작업 내용**:
  - THEORY-10-M01~M06 6개 Lesson 신규 작성.
  - Range Table의 SIGN/OPTION/LOW/HIGH 구조, SELECT-OPTIONS와 Selection Table, WHERE field IN @range, Multiple Selection과 Include/Exclude, EQ/BT/CP 옵션, Selection Table 직접 조작을 JSON 지침 범위 안에서 작성.
  - Exclude 조건 해석, CP 패턴 과사용, 빈 Range/넓은 범위 조회, 직접 조작한 Range 조건 검증을 초심자용 경고로 정리.
  - 글로서리 신규 용어 18종 추가 및 기존 `ABAPSQL` 사용 Lesson 보정, 미정의 0건 확인.
  - 로컬 뷰어에서 THEORY-10-M01, M03, M06 로딩 확인 완료.
- **수정 파일**: `docs/abap/lesson-content/THEORY-10-M01~M06.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-11 `Open SQL 2차: JOIN과 집계`.

### [2026-06-09] Claude (Opus 4.8) — THEORY-11~14 신규
- **작업 내용**:
  - Codex 미커밋분 THEORY-10 보존 커밋(`af0fb7f`) 후, THEORY-11~14 4개 섹션 27개 Lesson 신규 작성.
  - THEORY-11 JOIN과 집계(M01~M07), THEORY-12 Classic DDIC View(M01~M06), THEORY-13 Report Event 심화(M01~M07), THEORY-14 Dynpro 기초(M01~M07).
  - 글로서리 +60종(11:18, 12:13, 13:15, 14:14). 섹션별 미정의 0건 검증.
  - 섹션마다 커밋·push, PR #50 갱신.
- **수정 파일**: `docs/abap/lesson-content/THEORY-11~14-*.html`(27개 신규), `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `changelogs/CHANGELOG_20260609.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-15 `Grid ALV 기초`(M01~M09, 9개). 톤·구조·글로서리 패리티·추적 3종 동시 갱신 규칙을 그대로 이어갈 것.

### [2026-06-09] Antigravity IDE (Gemini 3.1 Pro)
- **작업 내용**:
  - THEORY-01~10 구간 `THEORY` → `Chapter`, `MXX` → `Lesson` 명칭 일괄 치환 스크립트 작성 및 51개 파일 치환 완료.
  - 모든 ABAP 예제 코드 블록에 Shiki 복사 버튼 래핑 적용.
  - 이미지 자산 네이밍 규칙 및 위치 추천을 담은 `09_IMAGE_ASSETS_RULE.md` 추가.
- **수정 파일**: `docs/abap/lesson-content/THEORY-01~10*.html`, `.project-docs/09_IMAGE_ASSETS_RULE.md`, `.project-docs/99_AI_SYNC.md`, `changelogs/CHANGELOG_20260609.md`
- **다음 AI를 위한 메모**: 다음 섹션 작성은 그대로 이어나가면 됩니다. 신규 작성 시에도 Chapter/Lesson 용어를 사용하고 Shiki 포맷을 적용하는 것이 좋습니다.

### [2026-06-09] Claude (Opus 4.8) — THEORY-15~17 신규 (Work Log 보강)
- **작업 내용**: (앞선 THEORY-11~14 항목에 이어) THEORY-15·16·17을 신규 작성. 이전에 현황/CHANGELOG만 갱신하고 본 Work Log 항목을 누락했던 것을 사용자 지적으로 보강함.
  - THEORY-15 Grid ALV 기초(M01~M09): Container/Grid 생성, 출력 Internal Table, Field Catalog, Layout, Variant, SET_TABLE_FOR_FIRST_DISPLAY, refresh(Stable), 컬럼/행 색상.
  - THEORY-16 Modern ABAP Syntax(M01~M06): 인라인 선언, VALUE, CORRESPONDING, Table Expression, String Template, Legacy 리팩터링.
  - THEORY-17 New Open SQL(M01~M07): Classic vs Modern, @Host Variable/Expression, @DATA 인라인 타겟, SQL 표현식(CASE/CAST/COALESCE), 문자/날짜 함수, SELECT FROM @itab, 코드 푸시다운.
  - 글로서리: 15(+26), 16(+12), 17(+13). 섹션별 미정의 0건 검증.
- **수정 파일**: `docs/abap/lesson-content/THEORY-15~17-*.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `changelogs/CHANGELOG_20260609.md`
- **주의(동시 작업)**: Gemini 커밋 `07b5a7f`이 THEORY-17 M01~M06을 함께 담아감(내용 보존). M07·글로서리는 본 커밋으로 마감.
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-18 `OO ABAP 기본 설계`(M01~M07). Work Log는 섹션마다 항목을 즉시 추가할 것(현황/CHANGELOG만 갱신하지 말 것).

### [2026-06-09] Claude (Opus 4.8) — THEORY-18 신규
- **작업 내용**: THEORY-18 OO ABAP 기본 설계(M01~M07) 신규 작성.
  - 클래스/객체 개념, 속성·메서드·Visibility(캡슐화), 생성자, Static vs Instance Method, 인터페이스/다형성, 예외 클래스(TRY...CATCH/RAISE EXCEPTION), 상속/재정의.
  - 글로서리 +14종. 미정의 0건 검증(총 304종).
- **수정 파일**: `docs/abap/lesson-content/THEORY-18-M01~M07.html`, `reference/abap_glossary.json`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `changelogs/CHANGELOG_20260609.md`
- **참고(동시 작업)**: Gemini가 THEORY-11~18 코드블록에 Shiki 복사버튼을 입히는 중(콘텐츠 보존, glossary 태그 영향 없음). 같은 작업트리라 커밋 시 현재 on-disk 상태를 그대로 포함.
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-19 `SALV / Grid ALV 표시 제어 심화`(M01~M07).

### [2026-06-09] Antigravity IDE (Gemini 3.1 Pro) — ABAP Editor 테마 및 동기화 이슈 해결
- **작업 내용**:
  - **에디터 UI 개선**: 모든 ABAP 코드 블록을 네이비 헤더(#343e6a) 기반의 모던한 ABAP Editor 스타일로 일괄 변경 (라인 넘버 및 복사 완료 애니메이션 추가).
  - **버그 픽스**: 스크립트 재실행 시 윈도우가 중첩되는(인셉션) 렌더링 버그 수정 및 멱등성 확보.
  - **하이라이팅 보강**: CONCATENATE, SPLIT, REPLACE, CONDENSE 등 문자열 조작 키워드를 구문 강조 목록에 대거 추가.
  - **유실 커밋 복구**: 리셋 과정에서 날아갈 뻔했던 Claude의 THEORY-18 작업분(M01~M07 및 추적 문서 등)을 Cherry-pick을 통해 완벽하게 복구 후 UI 재적용.
- **수정 파일**: tools/format-abap-code.mjs, assets/abap-lesson-viewer.js, docs/abap/lesson-content/*.html 등 전체 레슨 파일
- **다음 AI를 위한 메모**: 디자인 및 UI 서식은 안정화되었습니다. 계속 이어서 THEORY-19 SALV / Grid ALV 표시 제어 심화(M01~M07) 작성 작업을 진행해주세요.

### [2026-06-10] Claude (Opus 4.8) — THEORY-19 신규
- **작업 내용**: THEORY-19 SALV / Grid ALV 표시 제어 심화(M01~M07) 신규 작성.
  - SALV Sort/Filter/Functions 제어, Layout/Variant 심화, Grid Column 제어(no_out/key/edit/Edit Mask),
    Deep Structure 기반 Cell Color(LVC_T_SCOL/ctab_fname), Cell Style(LVC_T_STYL/stylefname),
    Row/Column/Cell 색상 선택 기준, Stable Refresh 표시 상태 보존.
  - 글로서리 +15종(총 319). 미정의 0건 검증.
  - ⚠️ 본문 코드블록은 표준 `<pre><code>`로 작성됨 → Antigravity 네이비 Editor 포맷터 1회 적용 필요.
- **수정 파일**: `docs/abap/lesson-content/THEORY-19-M01~M07.html`, `reference/abap_glossary.json`, `HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `changelogs/CHANGELOG_20260609.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-20 `CDS View Entity 기초`(M01~M06).

### [2026-06-10] Claude (Opus 4.8) — THEORY-20 신규
- **작업 내용**: THEORY-20 CDS View Entity 기초(M01~M06) 신규 작성.
  - View Entity 기본 구조(DDL), Interface(ZI_)/Projection(ZC_) 2계층, Association, Annotation(@Semantics/@UI/@EndUserText), Metadata Extension, DCL/Access Control.
  - 글로서리 +13종(총 332). 미정의 0건 검증.
  - ⚠️ 코드블록 표준 `<pre><code>` → 네이비 Editor 포맷터 1회 적용 필요.
- **수정 파일**: `docs/abap/lesson-content/THEORY-20-M01~M06.html`, `reference/abap_glossary.json`, `HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `changelogs/CHANGELOG_20260609.md`
- **다음 AI를 위한 메모**: 다음 섹션은 THEORY-21 `RAP / ABAP Cloud 입문`(M01~M08) — **Track 1 마지막 섹션**.

### [2026-06-10] Claude (Opus 4.8) — THEORY-21 신규 🎉 Track 1 완성
- **작업 내용**: THEORY-21 RAP / ABAP Cloud 입문(M01~M08) 신규 작성 → **Track 1(THEORY-01~21) 137개 전부 완성**.
  - RAP 아키텍처 개요, Interface(ZI_)/Projection(ZC_) RAP 설계, Behavior Definition(managed)/Implementation(Behavior Pool), Service Definition/Binding, Validation/Determination/Action, ABAP Cloud·Released API·Clean Core. M08에서 Track 1 전체를 정리·축하.
  - 글로서리 +16종(총 348). **전체 137개 Lesson 미정의 0건 최종 검증 완료.**
  - ⚠️ THEORY-19~21 코드블록은 표준 `<pre><code>` → 네이비 Editor 포맷터 1회 적용 필요(THEORY-01~18은 적용됨).
- **다음 AI를 위한 메모**: ① (서식) THEORY-19~21에 Antigravity 네이비 Editor 멱등 포맷터 1회 적용. ② (콘텐츠) **Track 2(PRACTICAL-* 13개 섹션 ~70 Lesson)** 신규 작성 시작. JSON `d.tracks[1]`에서 섹션/ID 추출, 동일 규칙 적용.

### [2026-06-10] Antigravity IDE (Gemini 3.1 Pro) — 네이비 Editor 서식 일괄 재적용 및 아키텍처 리팩토링
- **작업 내용**: 
  - THEORY-19~21 신규 작성분에 누락되었던 네이비 ABAP Editor 코드 블록 서식(Shiki 복사 버튼 포함)을 멱등 포맷터(`tools/format-abap-code.mjs`)를 통해 일괄 적용 완료. 
  - **CSS 아키텍처 리팩토링**: 137개 레슨 HTML에 하드코딩 되어 있던 인라인 스타일을 모두 제거하고, `assets/abap-lesson-viewer.css`에 공통 클래스로 추출하여 137개 파일 전체 덮어쓰기 완료.
  - **디자인 보강**: D2Coding 웹폰트를 CDN으로 로드하여 코드 블록에 적용, ABAP 텍스트 색상 최적화(#ffa03b).
  - **캐시 버스터**: 로컬 `fetch` 시 강력한 브라우저 캐시 문제를 우회하기 위해 `lesson-viewer.js`에 시간 기반 쿼리스트링 추가.
  - **인계 문서 정비**: Codex가 Track 1을 덮어쓰지 않도록 `HANDOFF_LESSON_CONTENT.md`의 프롬프트 전면 수정.
- **다음 AI를 위한 메모**: Track 1(THEORY)의 모든 문서 작업 및 디자인/서식/아키텍처 정비가 완벽히 종료되었습니다. 이제 **Track 2(PRACTICAL-* 13개 섹션)** 작성을 시작할 수 있습니다. 화이팅!
