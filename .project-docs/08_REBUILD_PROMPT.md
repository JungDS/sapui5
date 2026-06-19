# 08. REBUILD PROMPT — 단일목표 실행 표준 프롬프트 (범위 지정형)

> 📅 **최종수정: 2026-06-19 23:30 KST**
> 🎯 **목적:** 사람이 "특정 Chapter 리빌딩"을 AI에게 발주할 때 복붙하는 **표준 프롬프트**. 편의성·정확성·일관성 확보.
> 📖 **읽을 때:** Track 1의 한 Chapter를 리빌딩시키려 할 때.
> ⚡ **TL;DR:**
> - 아래 **복붙 템플릿**에서 `<대상 Chapter>`(필수)와 `<추가 지시·주의>`(선택) **두 칸만** 채워 AI에게 준다.
> - 나머지 정밀함(Lesson 목록·per-Lesson 주의·T-code·DoD)은 **AI가 SSOT에서 런타임 도출** → 누락 없음.
> - 불변 규칙은 [01](01_AI_SYNC.md)/[04](04_CONVENTIONS.md)/[06](06_LEARNING_METHODS.md)을 **링크 참조**만(무중복 SSOT). 샘플 경로/v4 정책이 필요할 때만 [09](09_SAMPLE_LIBRARY.md)를 본다.

## 1. 사용법
1. 아래 **복붙 템플릿** 코드블록을 복사한다.
2. `<대상 Chapter>`를 채운다 (예: `Chapter 2` 또는 `THEORY-02`).
3. (선택) `<추가 지시·주의>`에 그때만 아는 요청을 한 줄 적는다. 없으면 그 줄을 비우거나 삭제한다.
4. AI에게 그대로 전달한다. — 끝. (Lesson 목록·주의·T-code는 AI가 알아서 도출)

> **왜 두 칸뿐인가:** 정밀함은 템플릿이 아니라 SSOT에 산다. Lesson 목록은 커리큘럼 JSON, per-Lesson 주의는
> [02_PROGRESS](02_PROGRESS.md) 챕터 표의 `메모`(특히 `⚠️`), T-code는 `reference/abap_glossary.json`에서
> AI가 매번 읽어 채우므로, 템플릿이 얇아도 디테일이 빠지지 않고 매 Chapter가 동일 절차로 일관되게 처리된다.

## 2. 복붙 템플릿

```text
# 지시: Track 1 단일목표 수행 — <대상 Chapter> 리빌딩

당신은 SAPUI 학습 사이트(C:\ui5\study\sapui5)의 Track 1(THEORY) 리빌딩을 수행하는 AI 개발자다.
추측하지 말고 SSOT 문서를 읽고 행동한다. 아래를 처음부터 끝까지 누락 없이 따른다.

## 0. 부팅 (착수 전 필수 통독)
`.project-docs/` 를 번호 순으로 읽는다: 00_INDEX → 01_AI_SYNC(최우선 SSOT) → 02_PROGRESS
→ 03_ARCHITECTURE → 04_CONVENTIONS → 05_PITFALLS → 06_LEARNING_METHODS → 07_BROWSER_TESTING
→ 08_REBUILD_PROMPT(현재 문서). 샘플 경로/v4/archive 정책이 필요하면 09_SAMPLE_LIBRARY도 본다.
- 단일 목표·완료 정의(DoD)·하드 제약·git 정책의 SSOT는 위 문서다. 이 프롬프트와 충돌하면 "더 엄격한 쪽"을 따른다.
- 02_PROGRESS `🔄 진행 중`을 확인한다. 다른 AI가 claim한 Lesson은 절대 건드리지 않는다.

## 1. 범위 (하드코딩 금지 — 런타임에 SSOT에서 직접 도출)
대상: **<대상 Chapter>**.
1) reference/abap_curriculum_v5_4_20260605_000000.json 에서 이 Chapter(섹션)에 속한 Lesson 전체
   (sub_2_id·제목·학습범위)를 조회해 작업 목록을 만든다.
2) 02_PROGRESS.md 챕터 표에서 이 Chapter 행의 `메모`를 읽는다.
   **`⚠️` 표시가 있으면 그 항목을 해당 Lesson의 "필수 보강 과제"로 취급**한다.
3) 한 번에 한 Lesson씩, 번호 순(M01→…)으로 진행한다. 범위 밖 Chapter/Track은 건드리지 않는다.

## 2. 완료 정의(DoD) — 01_AI_SYNC §DoD를 그대로 적용. 한 Lesson은 아래 6가지 "모두" 충족 시에만 완료:
   ① 내용 보강(NotebookLM 노트 ad0e9cde-4dca-451e-b455-de200a9ed7b7 질의 + SAP 공식 재검증)
   ② UI 혁신(06_LEARNING_METHODS 기준으로 샘플/학습수단 선택, 텍스트 나열 금지)
   ③ 코드 = 실습 시뮬레이션(필수): 코드가 1줄이라도 나오면 그 페이지에서 직접 실행·조작하는
      시뮬레이션을 넣는다(SAP GUI Sandbox/Step Debugger/빈칸 코드/오류 찾기/예상 로그 비교/Editor Mockup 등).
      정적 코드블록만이면 미완.
   ④ T-code 노출(필수): 등장 트랜잭션마다 abap_glossary.json에 category:"tcode" 등록(없으면 추가) +
      본문을 <span class="glossary-term" data-glossary="키">로 감싸 상단 칩 바 노출 +
      그 글로서리 항목 used_in_lessons에 현재 Lesson ID 추가(→ tcode-map 자동 반영). 진입 경로를 초심자 수준으로 설명.
   ⑤ 디자인 토큰(reference/design_variants.json 확정 토큰만)
   ⑥ 검증(콘솔 오류 0 + 칩 바·시뮬레이션 등 인터랙션 동작)
   ※ 세부 정의·예외는 01_AI_SYNC, 학습수단 선택은 06_LEARNING_METHODS, Lesson 작성 규칙은 04 R11을 따른다(여기서 재진술하지 않음).

## 3. Lesson 1개 작업 루프 (작업 목록의 각 Lesson에 그대로 반복)
1) claim: 02_PROGRESS `🔄`에 줄 추가(Lesson · 내 AI명 · 시작 KST).
2) plans/YYYYMM/MMDD_HHMM_<slug>/ 생성(PLAN.md/TASKS.md/RESULTS.md, 04 R10).
3) NotebookLM 질의 + SAP 공식 재검증 → 보강 포인트.
4) 커리큘럼 JSON에서 이 Lesson 학습목표 확정 + (있으면) ⚠️ 보강 과제 반영.
5) 06_LEARNING_METHODS에서 학습수단 선택. 코드가 나오면 그 코드용 시뮬레이션 수단 1개 이상 필수 포함.
6) 이 Lesson T-code 추출 → 글로서리 등록/확인 + used_in_lessons 갱신, 본문 data-glossary 연결.
7) 본문 작성: docs/abap/lesson-content/<ID>.html (운영 fragment; <script>/<style>/인라인 style 금지;
   동작은 abap-lesson-viewer.js, 스타일은 abap-lesson-viewer.css; 신규 파일이면 최상단 주석 헤더).
8) 글로서리 패리티 점검(미정의 0건).
9) 검증(07): 프로젝트 루트 정적 서버(.claude/launch.json "static", 포트 8765)로
   docs/abap/lesson-viewer.html?lesson=<ID> 열어 — 콘솔 0 + T-code 칩 바 + 시뮬레이션/인터랙션 동작 확인.
10) 종료: 02_PROGRESS의 내 `🔄`를 `✅ 완료 로그`로 이동 + 챕터 표 상태 갱신. plans TASKS/RESULTS 갱신.
11) git(04 R12): 사용자 요청 또는 PR 준비 시, Lesson 완료 단위나 문서/공통 변경 묶음 단위로 내가 만든/고친 파일만 git add(`-A` 금지) → git commit(본문에 `AI-Author: <내 모델명>`) → git push.
    git pull/fetch 금지(로컬이 SSOT). 타임스탬프는 .githooks/pre-commit 훅이 커밋 시 자동 처리.

## 4. 착수 전 자가 점검 (모호하면 빌드 전에 질문)
Chapter 범위·Lesson 목록·`⚠️` 메모·커리큘럼을 다 파악했는가? SSOT에 없는 불명확함이 있으면
빌드를 시작하지 말고 **먼저 사용자에게 질문**한다.

## 5. 보고
- Lesson마다: 보강 근거(출처)·적용한 샘플/학습수단·노출 T-code(신규/복습)·검증 결과를 요약.
- Chapter 전체가 끝나면 02_PROGRESS 챕터 표를 ✅로 갱신하고 마무리 보고.

## 6. 하지 말 것
다른 AI claim Lesson 수정 / git pull·fetch·add -A / 코드 임의 생략 / 공통 자산 미리딩 후 수정 /
운영 fragment에 인라인 script/style/style 속성 삽입 / 정적 코드블록만 두고 시뮬레이션 생략 / T-code를 글로서리·칩·지도에 연결하지 않고 본문에만 언급 /
내부 Lesson ID(THEORY-..-M..)를 사용자 화면에 노출.

## 7. 추가 지시·주의 (선택 — 없으면 무시)
<추가 지시·주의>
```

## 3. 채운 예시 (Chapter 2)

복붙 후 두 칸만 이렇게 채운다 — 나머지 본문은 위 템플릿 그대로 둔다:

- `<대상 Chapter>` → `Chapter 2 (THEORY-02, 섹션 "ABAP 기본 문법과 WRITE 출력")`
- `<추가 지시·주의>` → (선택) 비워도 됨.
  - 이 경우 M01의 SE38/SE80 보강은 **자동으로 반영된다** — 02_PROGRESS 챕터 표 Chapter 2 행에
    `⚠️ 구 02-M01 SE38/SE80 설명·실습 부족 → 보강 필수`가 이미 적혀 있어, 템플릿 §1-2가 이를 필수 과제로 끌어온다.
  - 손으로 강조하고 싶다면: `M01은 SE38/SE80 진입→첫 프로그램 작성→실행을 Sandbox/Editor Mockup으로 직접 해보게 할 것.`

> AI는 위 두 값만 받고도 커리큘럼 JSON에서 THEORY-02-M01~M06(ABAP 구조·주석 / DATA·TYPES / WRITE /
> IF·CASE / DO·WHILE / 문자열·날짜·SY 필드)을 스스로 도출해 한 Lesson씩 진행한다.

## 4. 설계 메모 (왜 이렇게 얇은가 — 유지보수 관점)
- **불변 규칙 미재진술:** DoD·작성 규칙·git 정책은 01/04/06 링크로만 참조. DoD가 바뀌어도 이 문서는 낡지 않는다.
- **가변 디테일은 SSOT 도출:** Lesson 목록=커리큘럼 JSON, per-Lesson 주의=02_PROGRESS `메모(⚠️)`, T-code=글로서리.
  → 사람은 Chapter만 지정, 정밀함은 손실 없음, 매 Chapter 동일 절차(일관성).
- **unknown-unknowns 방어:** `<추가 지시·주의>` 슬롯 + "모호하면 빌드 전 질문"(템플릿 §4)으로 SSOT에 없는 변수를 흡수.
