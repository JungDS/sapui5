# AI Workspace Synchronization Log (AI-SYNC)

> 📅 **최종수정: 2026-06-10 00:50 KST**

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
- **현재 목표**: 🎉 **Track 1(THEORY-*) 137/137 작성 완료!** (THEORY-01~21 전부). 다음 목표는 **Track 2(PRACTICAL-* 13개 섹션)** 신규 작성.
- **최근 진행(2026-06-09, Claude Opus 4.8)**: Codex 미커밋 THEORY-10 보존 후 **THEORY-11~17 신규 작성**(JOIN과 집계 / Classic DDIC View / Report Event 심화 / Dynpro 기초 / Grid ALV 기초 / Modern ABAP Syntax / New Open SQL). Codex 톤·구조 계승. 글로서리 +111종(섹션별 완전 패리티), 매 섹션 미정의 0건 검증. 추적 3종 동시 갱신.
- **⚠️ 동시 작업 주의**: Gemini(Antigravity)가 같은 작업트리에서 THEORY-01~10 고도화(Chapter/Lesson 명칭·Shiki 복사버튼) 병행 중. 콘텐츠 범위는 안 겹치나(나는 11~21) 공유 문서/`git add -A`로 인한 커밋 혼입 주의. 신규 Lesson도 Chapter/Lesson 용어 사용.
- **⚠️ 인계 핵심 문서**: 이어서 작업할 AI는 **[HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)를 가장 먼저 정독**할 것. 작성 규칙·스타일 기준·복붙용 프롬프트가 모두 거기 있음.

---

## 미결 사항 (Pending Issues / Next Steps)
- **Lesson 본문 양산**: Track 1 완료. 다음은 **Track 2(PRACTICAL-* 13개 섹션, 약 70개 Lesson)** 신규 작성. 같은 스타일(초심자·한눈에 정리·글로서리 패리티·추적 3종 동시 갱신·Chapter/Lesson 용어)을 그대로 적용한다. JSON의 `d.tracks[1]`에서 PRACTICAL 섹션/Lesson ID 추출.
- **[조율] 신규 19~21 코드블록 서식**: Claude가 작성한 THEORY-19~21은 표준 `<pre><code>`로 작성됨. 완성 후 Antigravity의 네이비 ABAP Editor 멱등 포맷터(`archive/_local/format_abap_code.mjs`)를 한 번 돌려 서식 통일 필요.
- **[프로세스] 섹션 작성 후 추적 3종 동시 갱신**: 섹션 커밋 시 ① `HANDOFF_LESSON_CONTENT.md` 진행표 ② 본 파일(99_AI_SYNC) 작업이력/현황 ③ `changelogs/CHANGELOG_<날짜>.md`를 함께 갱신할 것(누락 주의).
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
- **수정 파일**: rchive/_local/format_abap_code.mjs, ssets/abap-lesson-viewer.js, docs/abap/lesson-content/*.html 등 전체 레슨 파일
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
- **수정 파일**: `docs/abap/lesson-content/THEORY-21-M01~M08.html`, `reference/abap_glossary.json`, `HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `changelogs/CHANGELOG_20260609.md`
- **다음 AI를 위한 메모**: ① (서식) THEORY-19~21에 Antigravity 네이비 Editor 멱등 포맷터 1회 적용. ② (콘텐츠) **Track 2(PRACTICAL-* 13개 섹션 ~70 Lesson)** 신규 작성 시작. JSON `d.tracks[1]`에서 섹션/ID 추출, 동일 규칙 적용.
