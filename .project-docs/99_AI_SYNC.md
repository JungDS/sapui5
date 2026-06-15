# AI Workspace Synchronization Log (AI-SYNC)

> 📅 **최종수정: 2026-06-15 KST**

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
- **현재 목표**: 🎉 **Track 1(THEORY-*) 137/137 작성 완료!** (THEORY-01~21 전부). 사용자의 새 목표에 따라 Track 1을 "고품질 교육용 웹페이지" 기준으로 재감사·보강하는 라운드를 진행 중. 기준 문서: [TRACK1_QUALITY_PLAN.md](TRACK1_QUALITY_PLAN.md). 병행 다음 목표는 **Track 2(PRACTICAL-* 13개 섹션)** 신규 작성.
- **학습 수단 카탈로그(2026-06-15, Codex)**: `Chapter 13의 Lesson 1`에 적용된 다이어그램, Sandbox, Bad/Good Practice Hover Mapping, 아코디언 가이드, 디버깅 실행기, 드래그 퀴즈, 단답형 퀴즈 등 고관여 학습 수단을 정리하고, 향후 Lesson 초안 생성 시 선택할 추천 수단을 `.project-docs/10_LEARNING_CONTENT_METHODS.md`에 문서화했다. 새 Lesson/Chapter 고품질화 시작 전 이 문서를 함께 읽을 것.
- **학습 수단 샘플 라이브러리(2026-06-15, Codex)**: 학습 수단을 실제 화면으로 확인할 수 있도록 `sample/learning-methods/`에 38개 standalone HTML 샘플과 README를 추가했다. 진행계획과 작업 로그는 `.project-docs/진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/`에서 관리한다.
- **학습 수단 샘플 v2 전면 재작성(2026-06-15, Claude Opus 4.8)**: v1은 페이지마다 동일한 코드 카드를 반복하고 3열 고정으로 가로 스크롤이 발생해 품질이 낮았다. `sample/learning-methods-v2/`로 전면 재작성하여, Chapter 13 Lesson 1~6의 실제 위젯(탭 다이어그램·Sandbox·Bad/Good Hover Mapping·코드 키워드 아코디언·Step Debugger·드래그/단답 퀴즈)을 각 페이지의 첫 번째 대표 예시로 이식하고, 예시 2·3은 Internal Table/Open SQL/DDIC/ALV/OO/RAP 변형으로 구성했다. 반응형(기본 1열) + 가로 스크롤 차단. **새 학습 자료 초안 작성 시 우선 참조는 v2**(`sample/learning-methods-v2/README.md`)이며, v1은 이력 비교용으로 보존한다.
- **최근 진행(2026-06-15, Codex)**: 사용량 제한으로 중단된 자동화 재시작 후 메모리와 저장소 계획을 대조해 다음 실제 미완료 범위를 `Chapter 13`으로 확정. `Chapter 13의 Lesson 1~7`에 미니 실습, 완료 조건, SAP 공식 링크, 확인 퀴즈/정답 해설, 시각 자료를 보강했고, `THEORY-13-M01`의 남은 인라인 스타일을 공통 CSS 클래스로 이동 및 중간 폭 화면에서 우측 내비와 탭 위젯이 겹치지 않도록 보정했다.
- **최근 진행(2026-06-12, Antigravity)**: **Chapter 10~12 (Range Table, JOIN, Classic View)** 고품질화 완료 및 예제 이름 규칙(정훈영 주인공 규칙) 적용 완료. TMG/SM30 및 Classic/CDS 비교 아키텍처 SVG 흐름 시각화 보강 완료. `abap_glossary.json` 누락 용어 5종 패치 완료. **THEORY-13-M01의 이벤트 라이프사이클 다이어그램을 roadmap.html의 CSS 트리 구조로 개선 교체 완료**. 로컬 웹 서버(localhost:8080) 구동 확인 완료.
- **최근 진행(2026-06-11, Claude)**: 사용자 승인 플랜에 따라 **Track 1 시각화 확산 + 고품질화 통합 라운드** 시작. Phase 0(기반 정비) 완료 — `viz-*` 범용 CSS 별칭/`viz-compare`/`viz-svg` 신설, 시각화 패턴 카탈로그 7종을 HANDOFF에 표준화, Chapter 10 일반 표 정리, 포맷터 SQL 키워드 보강(77개 파일 하이라이트 개선). **NotebookLM MCP 연결 완료**(notebooklm-mcp v2.0.0, 노트북 `ABAP Evolution and Messaging Channels Training Guide` 등록·질의 검증). 이후 Chapter 4→19 통합 패스, 마지막에 Chapter 1~3/6/20~21 시각화 보강 미니 패스 예정.
- **이전 진행(2026-06-11, Codex)**: 사용자 피드백에 따라 `Chapter 1의 Lesson 1`, `Chapter 2의 Lesson 3`, `Chapter 5의 Lesson 2/4/5`, `Chapter 6의 Lesson 1~6`을 보정. 코드 예제 D2Coding 상속, ABAP 키워드 포맷터 확장, Classic `WRITE`와 ADT `out->write( )` 구분, Subroutine 전달 방식, Class 입문 설명, Internal Table 시각 자료를 보강.
- **⚠️ 동시 작업 주의**: AI 작업 간 겹침 방지를 위해 섹션 단위 작업을 엄수.
- **⚠️ 인계 핵심 문서**: 이어서 작업할 AI는 **[HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)**와 **[10_LEARNING_CONTENT_METHODS.md](10_LEARNING_CONTENT_METHODS.md)**를 함께 정독할 것. HANDOFF는 작성 규칙·스타일 기준, 10번 문서는 다이어그램/Sandbox/퀴즈/인터랙션 등 학습 수단 선택 기준을 담고 있음.

---

## 미결 사항 (Pending Issues / Next Steps)
- **Track 1 고품질화**: Chapter 1~13, Chapter 20~21 기준 패턴 적용 완료. 나머지 Chapter 14~19는 설명·글로서리·실무 주의·요약 기반은 갖췄지만, 전 Lesson 공통의 퀴즈/정답/해설, 공식 링크, 실습 완료 조건과 시각 자료가 아직 부족하다. 다음 진행 후보는 Chapter 14(Dynpro 기초)이며, 이후 Chapter 15~19(ALV/Modern ABAP/Open SQL/OO ABAP/표시 제어)는 로컬 reference와 공식 문서로 범위 재검증 후 진행한다.
- **Lesson 본문 양산**: Track 1 완료. 다음은 **Track 2(PRACTICAL-* 13개 섹션, 약 70개 Lesson)** 신규 작성. 같은 스타일(초심자·한눈에 정리·글로서리 패리티·추적 3종 동시 갱신·Chapter/Lesson 용어)을 그대로 적용한다. JSON의 `d.tracks[1]`에서 PRACTICAL 섹션/Lesson ID 추출.
- **[완료] 신규 19~21 코드블록 서식 및 CSS 아키텍처 리팩토링**: Antigravity가 네이비 ABAP Editor 포맷터 개선을 통해 에디터 외곽 인라인 스타일을 CSS 클래스로 분리했고, Codex가 코드 하이라이트 토큰까지 `abap-token-*` 클래스로 공통화함.
- **[프로세스] 섹션 작성 후 추적 3종 동시 갱신**: 섹션 커밋 시 ① `HANDOFF_LESSON_CONTENT.md` 진행표 ② 본 파일(99_AI_SYNC) 작업이력/현황 ③ `changelogs/CHANGELOG_<날짜>.md`를 함께 갱신할 것(누락 주의).
- **[프로세스] Lesson 초안 생성 전 학습 수단 선택**: 텍스트 설명으로만 끝내지 말고 `.project-docs/10_LEARNING_CONTENT_METHODS.md`의 선택 가이드에 따라 시각 자료, 비교표, Sandbox, Hover Mapping, 아코디언, 디버거, 드래그/분류 퀴즈 등 적절한 수단을 최소 1개 이상 검토한다.
- **[프로세스] 학습 수단 샘플 확인**: 새 수단을 실제 페이지로 설계할 때는 **`sample/learning-methods-v2/README.md`(우선)**에서 38개 standalone 샘플 중 가장 가까운 패턴을 먼저 확인한다(v2는 Chapter 13 원본 위젯을 이식한 고품질 샘플, v1 `sample/learning-methods/`는 이력 비교용 보존). 구현 진행/검증 상태는 `.project-docs/진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/TASKS.md`와 `RUN_LOG.md`를 기준으로 이어간다.
- **글로서리 완전 패리티**: Lesson에서 쓰는 주요 용어는 `reference/abap_glossary.json`에 반드시 함께 등록(일상 비유 포함). 미등록 용어는 툴팁이 안 뜸(깨진 링크).
- (선택) Lesson 내 퀴즈·실습 코드 블록 등 상호작용 컴포넌트 고도화.

### 🐞 용어 팝업이 안 뜬다는 사용자 보고 — 진단 완료(코드 결함 아님)
- 원인: `lesson-content/<ID>.html`은 **조각(fragment) 파일**이라 단독으로 브라우저에서 열면 CSS/JS가 로드되지 않음.
- 올바른 확인법: **로컬 서버**에서 `docs/abap/lesson-viewer.html?lesson=<ID>`로 열 것. (`file://` 직접 열기는 fetch가 CORS로 막힘)
  - 예: 루트에서 `python -m http.server` → `http://localhost:8000/docs/abap/lesson-viewer.html?lesson=THEORY-01-M02`

---

## 작업 이력 (Work Log)

### [2026-06-15] Claude (Opus 4.8) — 학습 수단 샘플 라이브러리 v2 전면 재작성
- **작업 내용**:
  - v1(`sample/learning-methods/`)의 품질 문제(동일 코드 카드 3개 반복, 3열 고정으로 가로 스크롤)를 확인하고 `sample/learning-methods-v2/`로 38개 페이지를 전면 재작성.
  - `THEORY-13-M01~M06.html`과 `assets/abap-lesson-viewer.css/js`에서 실제 위젯의 마크업·스타일·동작을 추출해 공통 asset(`assets/method-samples.css/js`)에 이식. 각 페이지 예시 1 = Chapter 13 원본 위젯(탭 다이어그램·Sandbox·Bad/Good Hover Mapping·코드 키워드 아코디언·Step Debugger·드래그/단답 퀴즈), 예시 2·3 = Internal Table/Open SQL/Selection Screen·Report Event/DDIC/ALV/OO/RAP 변형.
  - 공통 JS를 멀티 인스턴스 + JSON 구동(Sandbox/Step Debugger/Decision)으로 일반화하고 카드 분류 핸들러를 신설. 반응형(기본 1열, 넓은 화면만 일부 2열) + `overflow-x: hidden`으로 가로 스크롤 차단.
  - `index.html`, `README.md`(원본 위젯 출처 매핑표 포함) 작성.
- **검증 메모**:
  - HTML 38개 유지, 각 페이지 `method-example` 정확히 3개, README/index 링크 실존(누락 0).
  - 로컬 서버 iframe 스윕: 전 38페이지 380px·핵심 페이지 620px 가로 스크롤 0건.
  - 탭/아코디언/Hover Mapping/드래그 퍼즐(4/4)/카드 분류/Step Debugger/Sandbox(이벤트 로그+ALV) 동작 확인, mermaid SVG 렌더링 확인, 콘솔 오류 0건, desktop/mobile 스크린샷 확인.
  - 버그 수정: Sandbox `selectResult` 라벨 누락→기본 'SELECT', 카드 분류 재채점 시 클래스 유실→`cardsort-feedback` 보존.
- **다음 AI를 위한 메모**: 새 학습 자료 초안 설계 시 `sample/learning-methods-v2/README.md`를 우선 참조한다. 위젯을 Lesson fragment로 옮길 때는 v2의 마크업/동작이 `assets/abap-lesson-viewer.css/js`와 호환되도록 이식돼 있으니 그대로 적용하면 된다.

### [2026-06-15] Codex (GPT-5) — 학습 수단 샘플 라이브러리 구현
- **작업 내용**:
  - `.project-docs/진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/`에 `PLAN.md`, `TASKS.md`, `RUN_LOG.md`를 추가해 구현 계획과 진행 상태를 관리하도록 구성.
  - `sample/learning-methods/`에 38개 standalone HTML 샘플 페이지, 브라우저용 `index.html`, Markdown `README.md`, 공통 CSS/JS(`assets/method-samples.*`)를 추가.
  - 각 샘플 페이지는 학습 수단 설명, 샘플 컴포넌트, ABAP 예시 초안 3개, AI 작성 메모를 포함한다.
- **다음 AI를 위한 메모**: Lesson 초안 생성 시 `10_LEARNING_CONTENT_METHODS.md`로 수단을 고른 뒤 `sample/learning-methods/README.md`에서 유사 샘플을 확인하면 초안 품질을 안정적으로 끌어올릴 수 있다.

### [2026-06-15] Codex (GPT-5) — 학습 콘텐츠 수단 카탈로그 문서화
- **작업 내용**:
  - `Chapter 13의 Lesson 1`에 사용된 고관여 학습 수단을 분석해 `.project-docs/10_LEARNING_CONTENT_METHODS.md`를 신규 작성.
  - 현재 사용된 수단(탭형 다이어그램, Mermaid 흐름도, Sandbox, Hover Mapping, 아코디언 가이드, Step Debugger, 드래그 퀴즈, 단답형 퀴즈 등)과 향후 추천 수단(치트시트, Breakpoint 체크리스트, 예상 로그 비교, 의사결정 트리, 카드 분류 퀴즈, 오류 찾기 미션 등)을 정리.
  - `.project-docs/00_INDEX.md`와 `HANDOFF_LESSON_CONTENT.md`에 링크를 추가하고, 본 `99_AI_SYNC.md`에도 시작 전 참조 문서로 반영.
- **다음 AI를 위한 메모**: 새 Lesson을 만들 때는 JSON 지침을 읽은 뒤 바로 본문을 쓰지 말고, 먼저 `10_LEARNING_CONTENT_METHODS.md`의 선택 가이드로 "읽기/보기/조작하기/풀어보기/정리하기" 흐름을 설계한다.

### [2026-06-15] Codex (GPT-5) — Chapter 13 고품질화+시각화 통합 패스
- **작업 내용**:
  - 자동화 메모리와 저장소 문서를 대조해 기존 계획이 존재함을 확인하고, 정적 감사 결과 기준 다음 미완료 범위를 `Chapter 13의 Lesson 1~7`로 확정.
  - `THEORY-13-M02~M07`에 각 Lesson별 시각 자료, 미니 실습, 완료 조건, SAP 공식 링크 3개, 확인 퀴즈, 정답/해설을 추가.
  - `THEORY-13-M01`은 기존 인터랙티브 위젯을 유지하면서 빠져 있던 완료 조건을 추가하고, 인라인 스타일을 `assets/abap-lesson-viewer.css` 공통 클래스로 이동.
  - 중간 폭 화면에서 `THEORY-13-M01`의 탭형 좌우 분할 위젯이 우측 내비게이션과 겹치지 않도록 이벤트 탭 컨테이너 전용 반응형 CSS를 추가.
- **검증 메모**:
  - Chapter 13 품질 마커(실습/완료 조건/퀴즈/정답/공식 링크/시각 자료) 7/7 완료.
  - Track 1 전체 글로서리 미정의 0건.
  - Chapter 13 소스 기준 인라인 style/script/inline event 0건.
  - Playwright 렌더링 확인: `THEORY-13-M01`, `THEORY-13-M07` 콘솔 오류 0건, M01 탭 위젯과 우측 내비 겹침 없음.
- **다음 AI를 위한 메모**: 다음은 Chapter 14(Dynpro 기초) 고품질화+시각화 패스. Screen Flow Logic, PBO/PAI, OK_CODE, PF-STATUS, Custom Control/Container 흐름을 먼저 공식 문서와 대조한 뒤 Lesson 단위로 보강한다.

### [2026-06-12] Antigravity IDE (Gemini 3.5 Flash) — THEORY-13-M01 다이어그램 디자인 개선
- **작업 내용**:
  - `Chapter 13의 THEORY-13-M01`에 시범 적용되어 있던 Mermaid.js 다이어그램을 `roadmap.html`에 사용된 트리 다이어그램 스타일(`.roadmap-tree`, `.tree-node`, `.connector-line` 등 CSS 활용)로 전면 교체했습니다.
  - 인라인 스타일 금지 규칙을 엄격히 준수하기 위해 `data-phase` 속성을 통해 색상을 매핑하였으며, 6단계 이벤트 실행 흐름과 검증 실패 루프 힌트를 직관적으로 구조화했습니다.
  - `tools/format-abap-code.mjs` 포맷터 및 `tools/build-abap-curriculum.mjs` 빌드 스크립트를 재수행하여 검증 완료했습니다.
- **검증 메모**:
  - 인라인 style 속성 없음, 정적 분석 오류 없음.

### [2026-06-12] Antigravity IDE (Gemini 3.5 Flash) — Chapter 12 고품질화+시각화 통합 패스 및 마무리
- **작업 내용**:
  - `Chapter 12 (THEORY-12-M01~M06)` 6개 레슨 고품질화, 미니 실습, 퀴즈, 공식 링크 3개 및 `정훈영` 이름 규칙 적용 완료.
  - M01~M04 이전 고품질화 반영분 포함, M05 및 M06 신규 고품질화 및 전수 정적 분석 검사(인라인 스타일 제거, 내부 ID 비노출, 글로서리 누락 방지) 완료.
  - 시각 자료 추가: M05 TMG ↔ SM30 화면 빌드 및 실행 데이터 바인딩 아키텍처 흐름도 SVG, M06 Classic View ↔ CDS View Entity 현대화 패러다임 시프트 아키텍처 구조도 SVG.
  - 글로서리 패치: `reference/abap_glossary.json`에 TMG, SM30, MaintenanceDialog, ClassicView, CDSViewEntity 등 누락되었던 5대 핵심 용어 신규 정의 및 매핑 적용 완료.
  - `tools/format-abap-code.mjs` 포맷터 실행을 통해 THEORY-12 내의 ABAP 코드 블록들 Navy Editor 테마 및 구문 하이라이트 정상 적용 완료.
- **검증 메모**:
  - Chapter 12 인라인 style/script 0건, 내부 ID 노출 0건, 글로서리 미정의 0건.
- **다음 AI를 위한 메모**: 다음은 Chapter 13(Report Event와 Selection Screen 심화, 7개 레슨) 고품질화 + 시각화 패스. 이벤트 생명주기 흐름도 시각화 및 퀴즈/실습 추가가 핵심.

### [2026-06-12] Antigravity IDE (Gemini 3.5 Flash) — Chapter 10 & 11 고품질화+시각화 통합 패스 및 마무리
- **작업 내용**:
  - `Chapter 10 (THEORY-10-M03~M06)`의 남은 4개 레슨 고품질화 및 예제 이름 규칙(`정훈영` 주인공 규칙) 적용 완료.
  - 시각 자료 4종 추가: L3 WHERE IN 조건 매칭 흐름도, L4 Include/Exclude 혼합 매칭도 (E001~E003 Include + E002 Exclude), L5 EQ vs BT vs CP 비교 매칭표 (이씨 성 사원 검색 예제), L6 RANGE OF 직접 조작 메모리 로드 상태도.
  - `Chapter 11 (THEORY-11-M01~M07)` 이전 Claude 보강분에 대해 예제 이름 규칙 및 본문 매칭 상태 최종 확인.
  - Chapter 10, 11 전체 13개 HTML 파일을 전수 정적 분석하는 `archive/_local/check-lessons.mjs` 검증 스크립트 작성 및 실행: 글로서리 정의 매핑 검증, 인라인 style/script 제거 검증, 내부 ID 노출 검증 진행. THEORY-10-M06의 인라인 스타일(`style="padding:0.5rem; font-size:0.85rem;"`) 제거로 **최종 에러 0건** 검증 완료.
- **검증 메모**:
  - Chapter 10 & 11 인라인 style/script 0건, 내부 ID 노출 0건, 글로서리 미정의 0건.
  - 브라우저 subagent CDP 루프백 주소 오류로 인해 자동화 스크래치 렌더링 확인은 불가했으나, 사용자가 직접 구동한 `python http.server 8080` 웹 서버를 통한 수동 로컬 뷰어 검증이 가능하도록 준비 완료.
- **다음 AI를 위한 메모**: 다음은 Chapter 12(Classic DDIC View와 유지보수, 6개 레슨) 고품질화 + 시각화 패스. VDM 기반 뷰 매커니즘, 뷰 유지보수기 화면 흐름도 및 퀴즈/실습 추가가 핵심.

### [2026-06-12] Claude (Fable 5) — Chapter 9의 Lesson 1~6 고품질화+시각화 통합 패스
- **작업 내용**:
  - NotebookLM 세션 질의(ABAP SQL 기초)로 오개념 5종을 수집·교차 검증: Strict Mode에서 Host Variable @ 필수, SELECT SINGLE은 키 부족 시 “아무 1건”(결정적 1건은 ORDER BY + UP TO 1 ROWS), INTO와 INTO TABLE의 그릇 차이, SELECT in LOOP 안티패턴(왕복 비용), 빈 결과는 덤프가 아니라 sy-subrc=4(조용한 버그 위험).
  - `Chapter 9의 Lesson 1~6`에 미니 실습+완료 조건, 검증된 공식 링크 3개씩(SELECT/SELECT SINGLE/ABAP SQL/Host Variable 등 신규 4종 WebFetch 검증), 확인 퀴즈/정답/해설 추가.
  - 시각 자료 6종 추가: L1 물류센터 4단계 플로우(FROM→FIELDS→배송→INTO)+DB/결과셋 발췌 그리드, L2 WHERE 필터 3단계 상태 그리드(조건 통과마다 줄 감소), L3 SELECT SINGLE 키 완전/부분 지정 비교, L4 INTO vs INTO TABLE 그릇 비교, L5 inline vs 명시적 Target 비교, L6 SELECT in LOOP 왕복 10,000번 vs 1번 비교.
- **검증 메모**:
  - Chapter 9 인라인 style/script 0건, 내부 ID 노출 0건, 글로서리 미정의 0건, 포맷터 재실행 0건(멱등), 6개 Lesson 모두 퀴즈/실습/viz 존재 확인.
  - 로컬 뷰어에서 THEORY-09-M02(필터 그리드/퀴즈/실습/링크 3개) 렌더링 확인.
- **다음 AI를 위한 메모**: 다음은 Chapter 10(Range Table) 미니 패스 — Phase 0에서 표는 이미 viz 클래스로 정리됨, Include/Exclude 해석 시각화와 퀴즈/실습/링크 추가가 남음. 이후 Chapter 11(JOIN)은 두 테이블→JOIN 결과 표가 핵심.

### [2026-06-12] Claude (Fable 5) — Chapter 8의 Lesson 1~5 고품질화+시각화 통합 패스
- **작업 내용**:
  - NotebookLM 세션 질의(SALV/CL_SALV_TABLE)로 오개념 5종을 수집·교차 검증: FACTORY는 화면/Container 없이 전체 화면 ALV 생성, 툴바는 get_functions+set_all로 명시적으로 켜야 함, 필드 카탈로그는 자동 구성, SALV는 조회 전용(편집은 Grid ALV), SALV/Grid ALV는 GUI 종속이라 ABAP Cloud 미사용.
  - `Chapter 8의 Lesson 1~5`에 미니 실습+완료 조건, 검증된 공식 링크 3개씩(SAP Learning Basic ABAP Programming, TRY, Class, Internal Table, Output Statement, MESSAGE, SORT itab), 확인 퀴즈/정답/해설 추가.
  - 시각 자료 5종 추가: L1 WRITE vs SALV 화면 책임 비교, L2 공장·리모컨 5단계 플로우(FACTORY는 생성, display는 송출), L3 set_all 전/후 툴바 비교, L4 미니 리포트 6단계 플로우(빈 데이터 분기 포함), L5 1차 범위 vs 심화 범위 비교.
- **검증 메모**:
  - Chapter 8 인라인 style/script 0건, 내부 ID 노출 0건, 글로서리 미정의 0건, 포맷터 재실행 0건(멱등), 5개 Lesson 모두 퀴즈/실습/viz 존재 확인.
  - 로컬 뷰어에서 THEORY-08-M03(전/후 비교/퀴즈/실습/링크 3개) 렌더링 확인.
- **다음 AI를 위한 메모**: 다음은 Chapter 9(Open SQL 기초, 6개 Lesson). DB 테이블→WHERE 필터→결과셋 상태 그리드와 SELECT SINGLE 1행 강조가 핵심 시각화. SELECT in LOOP 안티패턴은 Chapter 7 질의에서 받은 FOR ALL ENTRIES/단일 SQL 근거 재활용 가능.

### [2026-06-12] Claude (Fable 5) — Chapter 7의 Lesson 1~9 고품질화+시각화 통합 패스
- **작업 내용**:
  - NotebookLM 세션 질의(BC400/BC401 ITAB 응용)로 오개념 7종을 수집·교차 검증: BINARY SEARCH는 정렬을 대신하지 않으며 어기면 덤프 없이 잘못된 결과, ADJACENT DUPLICATES는 인접 중복만 제거(SORT 선행), ASSIGNING은 원본 직접 변경이라 MODIFY 불필요, HASHED는 INDEX 불가, CLEAR/REFRESH는 메모리 미반환(FREE만 반환), TRANSPORTING 생략 시 행 전체 덮어쓰기, Secondary Key는 읽기 이득 vs 쓰기 비용 거래.
  - `Chapter 7의 Lesson 1~9` 전체에 미니 실습+완료 조건, 검증된 SAP Help 링크 3개씩(MODIFY/DELETE/SORT itab, FIELD-SYMBOLS, Sorted/Hashed Table, Secondary Table Key, Deep Structure, CLEAR/FREE 등 10종 WebFetch 검증), 확인 퀴즈/정답/해설 추가.
  - 시각 자료 9종 추가: L1 MODIFY TRANSPORTING 전/후, L2 DELETE WHERE 전/후(순번 재계산 강조), L3 SORT 전/후, L4 이진 탐색 절반 줄이기 단계 그리드+순차 탐색 비교, L5 테이블 3종 보관 방식 그리드+기능 비교표, L6 INTO 복사 vs ASSIGNING 직접 참조 비교, L7 Secondary Key 이득/비용 비교, L8 Deep Structure 중첩 구조도(셀 속의 표), L9 CLEAR/REFRESH/FREE 3종 그리드.
- **검증 메모**:
  - Chapter 7 인라인 style/script 0건, 내부 ID 노출 0건, 글로서리 미정의 0건, 포맷터 재실행 0건(멱등), 9개 Lesson 모두 퀴즈/실습/viz-visual 존재 확인.
  - 로컬 뷰어에서 THEORY-07-M04(이진 탐색 그리드/배지/퀴즈/링크 3개) 렌더링 확인.
- **다음 AI를 위한 메모**: 다음은 Chapter 8(SALV, 5개 Lesson) 통합 패스. itab→SALV 출력 변환 플로우가 핵심 시각화. 이후 Chapter 9(Open SQL 기초)는 DB 테이블→WHERE 필터→결과셋 상태 그리드.

### [2026-06-11] Claude (Fable 5) — Chapter 6의 Lesson 1~6 고품질화 미니 패스
- **작업 내용**:
  - Codex가 추가한 itab-* 시각 자료는 그대로 유지하고, 빠져 있던 학습 완결 요소(미니 실습+완료 조건, SAP 공식 링크 3개, 확인 퀴즈/정답/해설)만 6개 Lesson에 추가.
  - NotebookLM 스모크 테스트 답변(Internal Table 시각화 3대 포인트: DB/메모리 분리·동적 확장, Line Type/Key/Table Kind, 생명주기)을 퀴즈 근거로 활용하고 표준 동작과 교차 검증.
  - 공식 링크는 ABAP Keyword Documentation의 Internal Table/Work Area/TYPES/APPEND/INSERT itab/LOOP AT itab/READ TABLE 문서를 WebFetch로 실존 검증 후 사용.
  - 퀴즈는 오개념 중심: ITAB 영구 저장 아님, TYPES는 설계도일 뿐, APPEND 위치/INSERT INDEX, 빈 테이블 LOOP는 오류 아님, INTO는 복사라 원본 불변, 검색 실패 후 Work Area 잔존값 위험 등.
- **검증 메모**:
  - Chapter 6 인라인 style/script 0건, 내부 ID 노출 0건, 글로서리 미정의 0건, 포맷터 재실행 0건(멱등), 6개 Lesson 모두 퀴즈/실습 존재 확인.
  - 로컬 뷰어에서 THEORY-06-M05(실습/퀴즈/링크 3개/기존 시각 자료) 렌더링 확인.
- **다음 AI를 위한 메모**: 다음은 Chapter 7(ITAB 응용, 9개 Lesson) 통합 패스. SORT/DELETE/MODIFY 전/후 비교(viz-compare), BINARY SEARCH 탐색 포인터, Deep Structure 중첩 구조가 핵심 시각화.

### [2026-06-11] Claude (Fable 5) — Chapter 5의 Lesson 1~6 고품질화+시각화 통합 패스
- **작업 내용**:
  - NotebookLM 세션 재사용 질의로 BC400 기반 모듈화 오개념(USING 기본 참조 전달, FM 예외 미처리 시 런타임 오류, Local Class 외부 접근 불가, value-and-result의 정상 종료 조건, 신규 개발 Class 우선/Subroutine Obsolete)을 수집하고 표준 동작과 교차 검증.
  - `Chapter 5의 Lesson 1~6`에 미니 실습+완료 조건, 확인 퀴즈/정답/해설을 추가. 링크가 없던 Lesson 1/3/6에는 검증된 SAP Help 링크 3개씩 추가(PERFORM/CALL FUNCTION/Function Module/Class 등), Lesson 2/4/5는 기존 Codex 링크 유지.
  - 시각 자료 추가: Lesson 1(PERFORM 호출→점프→복귀 플로우+출력 순서 표), Lesson 2(참조 vs 값 전달 전/후 비교), Lesson 3(호출자⇄CALL FUNCTION⇄FM 데이터 방향 관계도), Lesson 4(DEFINITION 메뉴판/IMPLEMENTATION 주방 그리드), Lesson 5(Static `=>` vs Instance `->` 비교), Lesson 6(모듈화 도구 3종 비교표+선택 결정 플로우).
- **검증 메모**:
  - Chapter 5 인라인 style/script 0건, 내부 ID 노출 0건, 글로서리 미정의 0건, 포맷터 재실행 0건(멱등).
  - 로컬 뷰어에서 THEORY-05-M06(비교표/플로우/배지/실습/퀴즈/링크 3개) 렌더링 확인.
- **다음 AI를 위한 메모**: 다음은 Chapter 6 시각화 보강 미니 패스(기존 itab-* 시각 자료 유지, 퀴즈/링크/실습만 추가) 또는 Chapter 7 통합 패스. Chapter 7은 SORT/DELETE/MODIFY 전/후 비교(viz-compare)가 핵심.

### [2026-06-11] Claude (Fable 5) — Chapter 4의 Lesson 1~6 고품질화+시각화 통합 패스
- **작업 내용**:
  - NotebookLM(`ABAP Evolution and Messaging Channels Training Guide`)에 Chapter 4 주제(FK/Check Table/Cardinality/Value Table/Search Help/F4)를 질의하고, BC430 기반 초심자 오개념·시각화 구조·실무 주의점을 수집. SAP Help Portal ABAP Keyword Documentation 공식 링크 7종(Foreign Key/Check Table/Value Table/Search Help/Input Help/Data Element/MESSAGE)을 WebFetch로 실존 검증 후 사용.
  - `Chapter 4의 Lesson 1~6`에 미니 실습+완료 조건, SAP 공식 링크 3개씩, 확인 퀴즈/정답/해설을 추가(Chapter 1~3 확정 패턴).
  - 시각 자료 추가: Lesson 1(FK 검증 관계도 + 1:N 카디널리티 상태 그리드), Lesson 2(Value Table vs FK 전/후 비교), Lesson 3(F4 5단계 플로우 + 후보 목록 선택 표), Lesson 4(Collective/Elementary 구조 그리드), Lesson 5(선언 방식 비교 + F4 탐색 우선순위 폭포수 플로우), Lesson 6(DDIC vs 프로그램 검증 책임 비교).
  - NotebookLM 근거 중 교차 검증된 사실 반영: DDIC FK는 DB 물리 제약이 아닌 Application Server 논리 검증(배치/직접 INSERT는 우회 가능), F4 탐색 우선순위(화면 로직→Search Help→Check Table→Data Element→Fixed Value), Search Help Export 파라미터 누락 시 값 미반환, 대량 후보 Search Help의 값 제한 다이얼로그.
- **검증 메모**:
  - Chapter 4 인라인 style/script 0건, 사용자 화면 내부 ID 노출 0건, Track 1 글로서리 미정의 0건, 포맷터 재실행 0건(멱등).
  - 로컬 뷰어에서 THEORY-04-M01(관계도/배지/퀴즈/링크 3개)과 THEORY-04-M05(viz-compare 2열, 플로우 5단계) 렌더링 및 모바일(375px)에서 비교 그리드 1열 축소 확인.
- **다음 AI를 위한 메모**: 다음은 Chapter 5(모듈화) 통합 패스. 호출 스택 플로우와 pass by reference/value 전/후 비교가 핵심 시각화 후보. Chapter 5의 Lesson 2/4/5는 Codex가 이미 일부 보강했으므로 중복 추가 주의.

### [2026-06-11] Claude (Fable 5) — Track 1 시각화 확산 Phase 0 (기반 정비) + NotebookLM MCP 연결
- **작업 내용**:
  - 시각화 현황 감사: itab-* 시각 자료가 Chapter 6에 집중(91건), 129/137개 Lesson은 텍스트+코드만 있음을 확인하고, 시각화 확산 + 고품질화 통합 플랜을 사용자 승인 하에 수립.
  - `assets/abap-lesson-viewer.css`의 모든 `itab-*` 셀렉터에 범용 `viz-*` 별칭 병기, 전/후 비교 `viz-compare`와 인라인 SVG 래퍼 `viz-svg` 신규 추가, 캐시 버스터 `v=20260611-viz1` 갱신.
  - `TRACK1_QUALITY_PLAN.md` 완료 기준 11번 "시각 자료" 추가, `HANDOFF_LESSON_CONTENT.md`에 시각화 패턴 카탈로그 7종 + 적용 판단 체크리스트 + SVG 작성 규칙 문서화.
  - `Chapter 10의 Lesson 1/4/5`의 스타일 미적용 `<table>` 6건을 `viz-visual`+`viz-table`로 정리(Include/Exclude에 success/fail 배지).
  - `tools/format-abap-code.mjs`에 SQL 키워드(`LEFT OUTER JOIN`, `INNER JOIN`, `GROUP BY`, `AND` 등) 보강 후 전체 재실행 — 77개 파일 하이라이트 개선.
  - **NotebookLM MCP 연결**: `notebooklm-mcp` v2.0.0을 `~/.claude.json` 사용자 스코프에 등록, Google 인증 완료, 노트북 `ABAP Evolution and Messaging Channels Training Guide`(ID: abap-evolution-and-messaging-c) 등록·실질의 검증 완료. 이후 Chapter 패스는 NotebookLM 질의 → SAP 공식 문서 교차 검증으로 진행.
- **검증 메모**:
  - 포맷터 2차 실행 0건(멱등성), diff는 토큰 span 추가만 확인.
  - lesson-content 인라인 `style=` 0건, `<script>`/인라인 이벤트 0건, plain `<pre><code>` 0건.
  - 로컬 뷰어에서 THEORY-10-M04(viz-visual/viz-table/viz-badge 렌더링)와 THEORY-11-M02(`LEFT OUTER JOIN`/`AND` 키워드 하이라이트) 확인.
- **다음 AI를 위한 메모**: 신규 시각화는 `viz-*` 클래스를 사용할 것(itab-*는 Chapter 6 호환용). 시각화 마크업 샘플과 판단 체크리스트는 HANDOFF의 "시각화 패턴 카탈로그" 참조. 다음은 Chapter 4부터 고품질화+시각화 통합 패스.

### [2026-06-11] Codex (GPT-5) — Track 1 사용자 피드백 보정 및 Internal Table 시각화
- **작업 내용**:
  - `Chapter 1의 Lesson 1`에 사용자가 직접 수정한 첫 Lesson 제목 보정을 커밋 범위에 포함.
  - `.abap-editor-code code`가 부모의 `D2Coding` 폰트를 상속하도록 CSS를 보정하고, ABAP 코드 포맷터 키워드 목록을 확장.
  - `Chapter 2의 Lesson 3` 공식 링크를 Classic `WRITE` 공식 문서 중심으로 교체하고, ADT `IF_OO_ADT_CLASSRUN`의 `out->write( )`와 다르다는 설명을 추가.
  - `Chapter 5의 Lesson 2`에 pass by reference/value/value-and-result와 FORM formal parameter의 `VALUE(...)` 위치를 보강.
  - `Chapter 5의 Lesson 4~5`에 Class Attribute/Method, Static/Instance, Visibility, `zcl_demo_text` 구조 설명과 공식 링크를 보강.
  - `Chapter 6의 Lesson 1~6`에 `정훈영` 중심 예제 데이터와 Internal Table 상태/흐름 HTML/CSS 시각 자료를 추가.
- **검증 메모**:
  - 대상 Lesson fragment의 `<script>`, `<style>`, 인라인 `style=`, 인라인 이벤트, plain `<pre><code>` 잔여 0건을 확인.
  - 포맷터 전역 재실행으로 생긴 범위 밖 줄끝/재생성 변경은 커밋에서 제외하고, 요청 범위 변경만 남겼다.

### [2026-06-11] Codex (GPT-5) — Chapter 21의 Lesson 1~8 고품질화 패턴 확산
- **작업 내용**:
  - `Chapter 21의 Lesson 1~8`에 미니 실습, 완료 조건, SAP 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
  - NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`의 RAP/ABAP Cloud 근거 매트릭스를 참고하되, RAP Architecture, Interface/Projection View, BDEF, Behavior Pool, EML, Service Definition/Binding, Validation/Determination/Action, ABAP Cloud/Released API/Clean Core는 SAP Help Portal과 SAP Learning 공식 문서로 교차 검증.
  - `strict ( 2 )`, Managed BO, Projection Layer, Service Binding publish, validation과 determination의 책임 차이, Public API와 Released API의 차이를 초심자 오개념 퀴즈로 보강.
  - `TRACK1_QUALITY_PLAN.md`, `HANDOFF_LESSON_CONTENT.md`, 개발 일지/체인지로그를 Chapter 21 완료 상태로 갱신.
  - Chapter 20~21의 사용자 화면 본문에서 내부 ID 표현을 제거하고 `Chapter N의 Lesson M` 형식으로 정리.
- **검증 메모**:
  - Chapter 21의 8개 Lesson 모두 완료 조건/퀴즈/공식 링크 3개/사용자 화면 내부 ID 미노출 조건 확인.
  - 이번 변경은 새 plain `<pre><code>` 블록을 만들지 않았고 기존 ABAP editor mockup을 유지했다.

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
