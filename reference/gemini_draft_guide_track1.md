# Gemini 드래프트 가이드 — Track 1 리빌딩 (골드 레슨 기준)

> 📅 **최종수정: 2026-06-18 01:29 KST**

> 📅 작성: 2026-06-17 KST · 대상: **Gemini (Antigravity)** — 리빌딩 파이프라인의 **초안(Draft) 단계** 담당
> 🎯 이 문서 하나로 레슨 1개의 초안을 만들 수 있게 한다. 모르면 추측하지 말고 골드 레슨 6개를 본보기로 본다.

---

## 0. 너의 역할과 경계 (Pipeline)

```
[0] Claude 파일럿 : 골드 레슨 6개 제작(실제 GPT v4 페이로드로부터) → 형식·밀도의 기준 확정
[1] Gemini(너)    : 초안/스캐폴드  ← 이 문서
[2] Codex         : 보강/완비 (시뮬 배선·글로서리·anti-pattern·DoD 채우기)
[3] Claude        : 검증+최종 (브라우저 콘솔0/인터랙션, 디자인토큰·글로서리 패리티, DoD 사인오프)
```

- 너는 **레슨 단위**로 작업한다(챕터 통째 X). 한 레슨을 끝내면 다음 레슨으로.
- 너의 산출물은 **완성품이 아니라 "Codex가 보강할 수 있는 충실한 초안"**이다.
- **시작 전 반드시 `.project-docs/02_PROGRESS.md` 클레임 보드에 그 레슨을 선점**한 뒤 작업한다(동시작업 덮어쓰기 방지). 이미 누가 점유한 레슨은 건드리지 않는다.
- ⚠️ **너의 알려진 실패 모드 = "경량화하려고 내용을 버리는 것".** 이번 프롬프트 라운드에서 너는 근거(SOURCE_EVIDENCE) 섹션을 통째로 삭제했었다. **초안에서 NotebookLM 페이로드의 어떤 자산도 임의로 생략·요약하지 마라.** 짧게 만드는 게 목표가 아니라 **빠짐없이 옮기는 것**이 목표다.

---

## 1. 골드 레슨 6선 (반드시 먼저 정독)

Claude가 **실제 GPT v4 페이로드로부터** 만든 아래 6개가 **형식·밀도·컴포넌트 사용의 기준**이다. "토픽"이 아니라 **페이지 제작 난제(build challenge)별**로 골랐다 — 즉 Track 1의 거의 모든 레슨이 이 6개 중 하나를 가장 가까운 본보기로 삼을 수 있다.

| # | Lesson ID | 제목 | 대표 build challenge |
|---|---|---|---|
| 1 | `THEORY-01-M05` | Transparent Table 기본 생성 | **DDIC 객체 생성** (SE11 단계별 GUI walkthrough + T-code 칩바) |
| 2 | `THEORY-02-M05` | DO / WHILE 반복 처리 | **코드+시뮬 4종** (step-debugger·expected-log·bug-hunt·fill-blank) |
| 3 | `THEORY-03-M04` | Selection Screen Block 기초 맛보기 | **선택화면/사용자 입력** 시뮬 (SAP GUI flow simulator + 코드) |
| 4 | `THEORY-05-M03` | CALL FUNCTION 기본 구조 | **모듈화/재사용** (파라미터 인터페이스 Import/Export/Changing/Tables, SE37) |
| 5 | `THEORY-06-M01` | Internal Table이 필요한 이유 | **비코드 개념·아키텍처** (`CODE_NOT_APPLICABLE` + 메모리/구조 시각화) |
| 6 | `THEORY-09-M04` | INTO TABLE로 Internal Table 적재 | **DB→내부테이블→리포트 출력** (결과 테이블 렌더링) |

> 골드 레슨 위치: `docs/abap/lesson-content/<ID>.html`. 아직 없으면 이 문서의 §3 골격 + `sample/learning-methods-v3` + 기존 `docs/abap/lesson-content/*.html` 형식을 따른다.

### 1-1. 커버리지 맵 (내 레슨은 어느 골드를 본보기로?)
- **DDIC 객체 생성**(Domain·Data Element·Structure·Table·View 생성: 1·4·12장) → **#1**
- **Classic 문법 전반**(변수·연산·WRITE·IF·CASE·루프: 2장) → **#2**
- **선택화면·입력**(PARAMETERS·SELECT-OPTIONS·range: 3·10장) → **#3**
- **모듈화**(FORM/PERFORM·FUNCTION·CLASS/OO: 5장) → **#4**
- **비코드 개념·관계·아키텍처**(Foreign Key·Cardinality·Search Help 개념·런타임 메모리: 4·6·12장 개념 파트) → **#5**
- **DB접근·리포트**(SELECT·JOIN·집계·FAE·ALV 출력: 7·8·9·11장) → **#6**

### 1-2. 전용 골드는 없지만 프록시로 커버 (그래서 6개로 충분)
- **ALV 출력**(8장) → #6(테이블 출력 렌더링)으로 대응.
- **Foreign Key/Cardinality 관계 다이어그램**(4·12장) → #5(시각) + #1(SE11 기계적 생성)을 합쳐 대응.
- **FORM/PERFORM 기본**(5장 초반) → #4(CALL FUNCTION, 파라미터 인터페이스)로 대응.
> 위 3종이 막상 닥쳤을 때 본보기가 부족하면, **그때 해당 레슨 1개를 골드로 승격**한다(처음부터 다 만들지 않는다).

---

## 2. 레슨 1개 드래프트 절차

### Step 1 — NotebookLM 페이로드 받기 (이미 GPT v4 페르소나 적용됨)
```bash
nlm notebook query ad0e9cde-4dca-451e-b455-de200a9ed7b7 \
  "Generate the payload for Lesson ID: THEORY-XX-MYY" --json
```
- 응답 `answer`가 구조화 페이로드다. 섹션 태그(`<METADATA>`, `<EXHAUSTIVE_THEORY_REPORT>`, `<GUI_TCODE_GLOSSARY_PLAN>`, `<CODE_AND_SIMULATION_ASSETS>`, `<EVIDENCE_REVALIDATION_DOD>` 등)별로 파싱한다.
- `<![CDATA[ ... ]]>` 안의 코드/자산은 마커를 벗겨 그대로 쓴다.
- `Source_Record_Found: NO` 또는 `<ERROR_FATAL>`이면 그 레슨은 **건너뛰고 보고**한다(억지 생성 금지).

### Step 2 — 페이로드 → 페이지 매핑 (§4 표 적용)
페이로드의 각 섹션을 §4대로 HTML 섹션/컴포넌트로 옮긴다. **자산을 버리지 않는다.**

### Step 3 — 레슨 HTML 초안 작성 (§3 형식)
`docs/abap/lesson-content/THEORY-XX-MYY.html`에 **HTML fragment**로 저장한다.

### Step 4 — 핸드오프 (Codex가 받도록)
- 파일 상단에 `<!-- lesson-content/<ID>.html | DRAFT by Gemini | YYYY-MM-DD HH:MM KST -->`.
- 같은 폴더에 `<ID>.handoff.md`를 만들어: ① 등록 필요한 글로서리/T-code JSON(페이로드 그대로), ② 아직 정적인 채 남긴 코드 블록(= Codex가 인터랙티브 시뮬로 승격해야 할 지점), ③ `REVALIDATION_QUEUE` 항목을 적는다.
- `.project-docs/02_PROGRESS.md` 클레임 보드에서 그 레슨 줄을 `Gemini 초안 완료 → Codex 대기`로 갱신.

---

## 3. 레슨 HTML 형식 규칙 (기존 포맷 준수)

- **Fragment만** 작성한다(`<html><head><body>` 없음). 뷰어(`docs/abap/lesson-viewer.html` + `assets/abap-lesson-viewer.js`)가 감싼다.
- 섹션: `<section class="lesson-section"><h2>…</h2>…</section>`.
- 콜아웃: `<div class="lesson-callout tip">…</div>` (목표/팁/주의).
- **글로서리 용어**(칩바 자동수집): `<span class="glossary-term" data-glossary="KEY">표시어</span>`. KEY는 페이로드의 `glossary_key`/`suggested_key`와 일치.
- **T-code**도 동일하게 `data-glossary`로 감싼다(`category:"tcode"` 글로서리 항목과 연결 → 칩바·지도 자동 반영).
- 코드 블록: `<!-- ABAP_MOCKUP_START --> … <!-- ABAP_MOCKUP_END -->`로 감싼 `abap-editor-mockup` 구조(기존 파일 참고). ⚠️ **정적 코드만 두면 미완** — Step 4 핸드오프에 "시뮬 승격 대상"으로 명시.
- 디자인 토큰/클래스는 `reference/design_variants.json` + `sample/learning-methods-v3/design-choices.json`만 사용. 새 색/임의 스타일 금지.

최소 골격:
```html
<!-- lesson-content/THEORY-XX-MYY.html | DRAFT by Gemini | 2026-06-17 HH:MM KST -->
<div class="lesson-callout tip"><div class="lesson-callout-icon">🎯</div>
  <div class="lesson-callout-content"><h4>학습 목표</h4><p>…<span class="glossary-term" data-glossary="KEY">용어</span>…</p></div>
</div>
<section class="lesson-section"><h2>1. …</h2><p>…</p></section>
```

---

## 4. 페이로드 섹션 → 페이지/컴포넌트 매핑

| 페이로드 섹션 | 페이지에서 | 권장 v3 컴포넌트 |
|---|---|---|
| `EXHAUSTIVE_THEORY_REPORT` | 본문 이론 섹션들 | visual-flow, state-grid, decision-tree, event tabs, recap-grid |
| `GUI_TCODE_GLOSSARY_PLAN` | GUI 절차 섹션 + T-code 칩 | SAP GUI flow simulator, shortcut simulator, checklist, glossary callout |
| `CODE_AND_SIMULATION_ASSETS` | 코드 + 실습 | interactive-sandbox-simulator, step-debugger-timeline, fill-blank-code, bug-hunt-mission, expected-log-comparison, ABAP editor mockup |
| 글로서리 TERMS / TCODE JSON | `data-glossary` span + 글로서리 등록 | (핸드오프 JSON으로 전달) |
| `ANTI_PATTERNS_ASSESSMENT` | 안티패턴 비교 + 퀴즈 | bad/good hover mapping, code-line-matching, quiz |
| `EVIDENCE_REVALIDATION_DOD` | (화면 X) 핸드오프 노트 | 근거·재검증 큐를 `.handoff.md`에 보존 |

**아키타입별 최소 구성 (골드 본보기)**
- DDIC 생성(#1 THEORY-01-M05): 모든 in-scope T-code를 `data-glossary` span + 칩 + 핸드오프 JSON 3중으로. 생성 절차는 SAP GUI flow simulator로.
- 코드+시뮬(#2 THEORY-02-M05): 코드 1개당 시뮬 ≥1개를 페이로드 자산으로 **반드시** 채운다(빈 껍데기 금지). 무한루프 등 beginner bug는 bug-hunt로.
- 선택화면(#3 THEORY-03-M04): 입력 필드·블록을 GUI flow simulator로, 코드와 화면을 함께.
- 모듈화(#4 THEORY-05-M03): 파라미터 인터페이스(Import/Export/Changing/Tables)를 state-grid·visual-flow로 시각화 + 호출 sandbox.
- 개념·비코드(#5 THEORY-06-M01): 코드 없으면 코드 컴포넌트 생략(`CODE_NOT_APPLICABLE` 존중), 메모리/아키텍처를 visual-flow·state-grid로.
- DB 리포트(#6 THEORY-09-M04): SELECT→내부테이블→결과 테이블 출력을 expected-log-comparison/결과 그리드로.

---

## 5. 드래프트 완료 정의 (Definition of Draft-Done) — 이게 충족돼야 Codex로 넘긴다

- [ ] 페이로드의 **모든 섹션 자산을 페이지/핸드오프에 반영**(임의 생략 0).
- [ ] 본문 모든 핵심 용어·T-code를 `data-glossary`로 감쌌다.
- [ ] 코드가 있으면 코드 블록을 넣고, **시뮬 승격 대상**을 핸드오프에 명시.
- [ ] `.handoff.md`에 글로서리/T-code JSON + 재검증 큐를 옮겼다.
- [ ] 미래 범위(`Future_Scope_Excluded`) 개념을 본문·예제·퀴즈에 **누출하지 않았다**.
- [ ] 파일 상단 타임스탬프 + 02_PROGRESS 클레임 갱신.

---

## 6. 절대 금지 (DON'Ts)

- ❌ 페이로드 자산 임의 요약·삭제(특히 근거/시뮬/T-code). **너의 1순위 주의점.**
- ❌ NotebookLM·SAP 근거 없는 사실 창작(트랜잭션 동작·문법·단축키 지어내기).
- ❌ 미래 Lesson 문법/도구를 예제·퀴즈·글로서리에 끌어오기.
- ❌ 디자인 토큰 외 임의 색/스타일, 새 CSS 클래스 발명.
- ❌ 정적 코드만 넣고 끝내기(시뮬 승격 대상 표시 없이).
- ❌ 클레임 없이 작업/덮어쓰기, 한 번에 여러 레슨·챕터 점유.
- ❌ **SAP 교재 이름/번호를 페이지에 노출** (BC400·BC430·BC100·SAPTEC·S4D40x·TAW 등). 학습자는 교재를 볼 수 없어 무의미·혼란만 준다. NotebookLM 페이로드의 출처 인용은 **내부 검증용**일 뿐, 최종 페이지에는 출처 대신 **"원리/규칙"만** 서술한다. (공개 접근 가능한 SAP Help Portal·SAP Learning **링크**는 §공식문서 섹션에 둘 수 있음 — 교재 코드만 금지.)
- ❌ **예시 데이터로 임의의 Z 테이블을 지어내기.** 개념 설명 예시는 **표준 항공사 모델(SCARR·SFLIGHT·SPFLI·SBOOK)** 을 쓴다(어느 교육 서버에나 존재). **학습자가 직접 만드는 실습 객체만** Z 네임스페이스(예: `ZT##_TEST###`).

---

## 7. 산출물 요약

| 항목 | 위치 |
|---|---|
| 레슨 초안 | `docs/abap/lesson-content/THEORY-XX-MYY.html` (fragment) |
| 핸드오프 노트 | `docs/abap/lesson-content/THEORY-XX-MYY.handoff.md` |
| 진행 갱신 | `.project-docs/02_PROGRESS.md` (클레임 보드) |
| 참조 SSOT | `reference/design_variants.json`, `sample/learning-methods-v3/`, `reference/abap_glossary.json`, 골드 레슨 6개 |
