# 인계 문서 — ABAP Lesson 본문 양산 (Track 1)

> 📅 **최종수정: 2026-06-15 KST**

> 이 문서는 ABAP 커리큘럼의 Lesson 본문(`docs/abap/lesson-content/<ID>.html`)을 이어서 작성할 AI를 위한 단일 인계서다.
> **시작 전 이 문서를 끝까지 읽고**, `.project-docs/99_AI_SYNC.md`와 기존 작성본 `THEORY-01-M01.html`(기준 샘플)을 확인할 것.

---

## 1. 무엇을 만드는가

- Track 1(THEORY-*) 전체 Lesson의 **본문 조각 HTML**을 `docs/abap/lesson-content/<sub_2_id>.html`로 하나씩 작성한다.
- 이 파일들은 **순수 본문 조각(fragment)** 이다. `<html>`/`<head>`/CSS/JS가 없다. 뷰어(`docs/abap/lesson-viewer.html`)가 `?lesson=<ID>`로 읽어 조립·렌더한다.
- 데이터 원천: **`reference/abap_curriculum_v5_4_20260605_000000.json`**. 여기에 트랙→섹션→Lesson 구조와 Lesson별 설계 지침이 들어 있다.

### Lesson 목록 / 진행 현황 (Track 1 = THEORY-*, 총 137개)
| 섹션 | 주제 | Lesson 수 | 상태 |
|---|---|---|---|
| THEORY-01 | DDIC 1차: 기본 데이터 구조 | 6 (M01~M06) | **M01~M06 작성 완료** (M02~M06 Codex 재보강 완료) |
| THEORY-02 | ABAP 기본 문법과 WRITE | 6 | **M01~M06 작성 완료** |
| THEORY-03 | PARAMETERS Selection Screen | 4 | **M01~M04 작성 완료** (Codex 고품질화 완료) |
| THEORY-04 | DDIC 2차: 관계와 입력 도움말 | 6 | **M01~M06 작성 완료** (Claude 고품질화+시각화 완료) |
| THEORY-05 | ABAP 모듈화 기초 | 6 | **M01~M06 작성 완료** (Claude 고품질화+시각화 완료) |
| THEORY-06 | Internal Table 기초 | 6 | **M01~M06 작성 완료** (Codex 시각화 + Claude 고품질화 완료) |
| THEORY-07 | Internal Table 응용 / Deep Structure | 9 | **M01~M09 작성 완료** (Claude 고품질화+시각화 완료) |
| THEORY-08 | Simple ALV / SALV 1차 | 5 | **M01~M05 작성 완료** (Claude 고품질화+시각화 완료) |
| THEORY-09 | Open SQL 1차: 기본 조회 | 6 | **M01~M06 작성 완료** (Claude 고품질화+시각화 완료) |
| THEORY-10 | SELECT-OPTIONS와 Range Table | 6 | **M01~M06 고품질화+시각화 완료** (Gemini) |
| THEORY-11 | Open SQL 2차: JOIN과 집계 | 7 | **M01~M07 고품질화+시각화 완료** (Claude/Gemini) |
| THEORY-12 | Classic DDIC View와 유지보수 | 6 | **M01~M06 고품질화+시각화 완료** (Claude/Gemini) |
| THEORY-13 | Report Event와 Selection Screen 심화 | 7 | **M01~M07 고품질화+시각화 완료** (Codex/Gemini) |
| THEORY-14 | Screen Programming / Dynpro 기초 | 7 | **M01~M07 작성 완료** (Claude) |
| THEORY-15 | Grid ALV 기초 | 9 | **M01~M09 작성 완료** (Claude) |
| THEORY-16 | Modern ABAP Syntax | 6 | **M01~M06 작성 완료** (Claude) |
| THEORY-17 | New Open SQL / Modern ABAP SQL | 7 | **M01~M07 작성 완료** (Claude) |
| THEORY-18 | OO ABAP 기본 설계 | 7 | **M01~M07 작성 완료** (Claude) |
| THEORY-19 | SALV / Grid ALV 표시 제어 심화 | 7 | **M01~M07 작성 완료** (Claude) |
| THEORY-20 | CDS View Entity 기초 | 6 | **M01~M06 작성 완료** (Codex 고품질화 완료) |
| THEORY-21 | RAP / ABAP Cloud 입문 | 8 | **M01~M08 작성 완료** (Codex 고품질화 완료) — 🎉 **Track 1 완성(137/137)** |

> Track 2(PRACTICAL-*, 13개 섹션)는 현재 진행 중. 정확한 ID/이름은 JSON의 `d.tracks[1]`에서 추출(아래 §6 스크립트 참조).
>
> **Track 1 고품질화 라운드(2026-06-10~11 Codex):** `Chapter 1의 Lesson 1`에 실습 과제, 완료 조건, 확인 퀴즈, 정답/해설, SAP 공식 링크 3개를 추가해 후속 Lesson 보강 패턴을 만들었다. 이어 `Chapter 1의 Lesson 2~6`, `Chapter 2의 Lesson 1~6`, `Chapter 3의 Lesson 1~4`, `Chapter 20의 Lesson 1~6`, `Chapter 21의 Lesson 1~8`에도 같은 패턴을 적용했다. `Chapter 20~21`은 NotebookLM, 로컬 reference, SAP 공식 문서를 교차 검증해 CDS View Entity, Association, Annotation, Metadata Extension, DCL, RAP BO, BDEF, EML, Service Binding, ABAP Cloud/Released API 보강을 완료했다. 상세 기준은 [TRACK1_QUALITY_PLAN.md](TRACK1_QUALITY_PLAN.md).
>
> **시각화 확산 라운드(2026-06-11~):** 고품질화에 시각화(`viz-*` 패턴 카탈로그, 본 문서 §5 참조)를 통합해 Chapter 단위로 진행한다. `Chapter 4의 Lesson 1~6` 완료(FK 관계도, 1:N 카디널리티, Value Table vs FK 비교, F4 플로우, F4 탐색 우선순위 폭포수, 검증 책임 비교). `Chapter 5의 Lesson 1~6` 완료(PERFORM 호출/복귀 플로우, 참조 vs 값 전달 전/후 비교, CALL FUNCTION 데이터 방향 관계도, DEFINITION/IMPLEMENTATION 그리드, Static vs Instance 비교, 모듈화 도구 3종 비교+결정 플로우). `Chapter 6의 Lesson 1~6` 미니 패스 완료(기존 Codex 시각 자료 유지, 미니 실습/공식 링크/퀴즈만 추가). `Chapter 7의 Lesson 1~9` 완료(MODIFY TRANSPORTING·DELETE WHERE·SORT 전/후 비교, 이진 탐색 단계 그리드, 테이블 3종 비교, INTO vs ASSIGNING 비교, Secondary Key 거래 비교, Deep Structure 중첩 구조도, CLEAR/REFRESH/FREE 3종 그리드). `Chapter 8의 Lesson 1~5` 완료(WRITE vs SALV 비교, 공장·리모컨 FACTORY 플로우, set_all 전/후 툴바 비교, 미니 리포트 6단계 플로우, 1차 범위 vs 심화 비교). `Chapter 9의 Lesson 1~6` 완료(SELECT 4단계 물류 플로우+FIELDS 발췌 그리드, WHERE 필터 3단계 그리드, SELECT SINGLE 키 완전/부분 비교, INTO vs INTO TABLE 비교, inline vs 명시적 Target 비교, SELECT in LOOP 왕복 횟수 비교). NotebookLM 질의 → SAP 공식 문서 교차 검증 흐름을 따른다. `Chapter 10의 Lesson 1~6` 완료 (Range Table 구조 비교, 화면 입력 내부 표 매핑, WHERE IN 조건 매칭 흐름, Include/Exclude 혼합 매칭, EQ vs BT vs CP 비교 매칭표, RANGE OF 직접 조작 메모리 로드 상태). `Chapter 11의 Lesson 1~7` 완료 (INNER JOIN 연결 흐름도, LEFT OUTER JOIN 좌우 행 유지 비교, GROUP BY 그룹 요약 흐름 그리드, HAVING 처리 순서 흐름, ORDER BY DB 정렬 vs ABAP SORT 비교, FOR ALL ENTRIES 함정 비교, JOIN/FAE/ABAP 처리 선택 기준). `Chapter 12의 Lesson 1~6` 완료 (Database View 조인 흐름도, Projection View 필드 솎아내기 전/후 비교, Help View 데이터 공급 흐름도, Maintenance View 3개 테이블 통합 관리 구조도, TMG ↔ SM30 아키텍처 및 데이터 흐름도 SVG 추가, Classic View ↔ CDS 아키텍처 비교도 SVG 추가 및 퀴즈/실습/공식 링크/Jung Hunyoung 이름 규칙 완벽 적용). `Chapter 13의 Lesson 1~7` 완료(Report Event 전체 흐름 탭 위젯, INITIALIZATION/DEFAULT 비교, Selection Screen OUTPUT 흐름, 입력 검증 게이트, START/END 처리 흐름, 존재·권한 검증 비교, 미니 실습·완료 조건·공식 링크·확인 퀴즈/정답 해설 추가).

---

## 2. 동작 구조 (반드시 이해)

- 뷰어: `docs/abap/lesson-viewer.html` + `assets/abap-lesson-viewer.js`.
  - URL `?lesson=THEORY-02-M01` → JSON에서 해당 Lesson의 트랙/섹션/이전·다음을 찾고, **`lesson-content/THEORY-02-M01.html`을 fetch**해 `[data-lesson-root]`에 주입.
  - Hero(제목·뱃지·breadcrumb), 우측 Nav(같은 Chapter Lesson 목록 + Stepper), 이전/다음 Pager는 **JS가 JSON으로 자동 생성**한다. → 본문 조각에는 제목 h1·뱃지·네비를 넣지 말 것. 본문만.
- 용어 툴팁: `assets/abap-glossary.js` + `reference/abap_glossary.json`.
  - 본문에서 `<span class="glossary-term" data-glossary="키">표시문구</span>` 형태로 태깅하면, 사전에 그 "키"가 있을 때 hover/click 툴팁이 뜬다(클릭 시 고정).
  - **사전에 없는 키는 툴팁이 안 뜬다(밑줄만 있고 무반응 = 깨진 링크).** → 쓰는 용어는 반드시 `abap_glossary.json`에 추가.

### ⚠️ "툴팁이 안 뜬다" 문제 (사용자 보고, 코드 결함 아님)
- 조각 파일을 **단독으로** 열면 CSS/JS가 없어 당연히 안 된다.
- 올바른 확인: **로컬 서버**에서 뷰어로 연다. `file://`은 fetch가 CORS로 막힌다.
  ```bash
  # 프로젝트 루트에서
  python -m http.server 8000
  # 브라우저: http://localhost:8000/docs/abap/lesson-viewer.html?lesson=THEORY-01-M02
  ```

---

## 3. 한 Lesson 작성 절차

1. JSON에서 해당 Lesson의 지침을 읽는다(§6 스크립트 사용): `handled_contents.ko`, `technical_keywords`, `learning_content_design.ko`(보통 5단계), `hands_on_lab.ko`, `caution_points.ko`, `sub_2_name`, 이전/다음 Lesson 이름.
2. `docs/abap/lesson-content/<ID>.html`을 **본문 조각**으로 작성(아래 §4 스타일 규칙·§5 마크업 준수).
3. 본문에서 쓴 주요 용어를 `reference/abap_glossary.json`에 추가(완전 패리티, 각 `everyday_analogy` 포함).
4. 섹션 단위로 묶어 커밋(예: "feat(lesson): THEORY-02 ... 6종 + 글로서리 N종").
5. 검증: 본문 `data-glossary` ↔ 사전 키 대조해 미정의 0건 확인(§6 검증 스크립트). 가능하면 로컬 서버로 1개 육안 확인.

---

## 4. 스타일 규칙 (사용자 피드백 반영 — 매우 중요)

기준 샘플은 `THEORY-01-M01.html`이지만, 사용자 피드백으로 **다음을 강화**해야 한다.
**THEORY-01-M02~M06은 2026-06-09 Codex가 이 기준으로 재보강 완료**했으며, 이후 Lesson은 이 톤과 구조를 기준으로 작성한다.

1. **완전 입문자 학습용**: SAP/ABAP을 처음 보는 사람이 따라오도록. 용어를 처음 꺼낼 때 한 줄로 풀어주고, "왜 이게 필요한가 → 무엇인가 → 어떻게 쓰나 → 실수/주의 → 정리" 흐름을 친절하게. 아는 사람을 위한 압축 설명 금지.
2. **분량 ↑**: M01~현재보다 더 길고 충실하게(설명·비유·예시·작은 코드/설정 예 추가). 단 장황하지 않게.
3. **요약 마무리 섹션 필수**: 맨 끝에 핵심만 추린 정리 섹션을 둔다(AI가 판단해 꼭 필요한 것만). 예: `한눈에 정리` 콜아웃 + 3~6개 핵심 bullet + "다음 Lesson 예고" 한 줄.
4. **10·20대 젊은 톤**: 현재 톤(이모지·콜아웃·비유)은 유지하되 더 캐주얼·생동감 있게. 과한 인터넷 밈/유행어는 지양(가독성·정확성 우선).
5. **정확성**: ABAP 사실관계 정확히(트랜잭션 코드, 문법, 표준 객체명). JSON `caution_points`를 "실무 주의" 콜아웃으로 녹일 것.
6. **연결성**: 첫 문단에서 직전 Lesson을 한 줄로 잇고, 마지막에 다음 Lesson을 예고(JSON의 이름 사용).
7. **예제 이름 규칙**: 코드 예제·시각화 표·실습 시나리오에 사람 이름이 필요할 때는 아래 풀에서 고른다. 항상 **`정훈영`을 주인공(1번 인물)**으로 쓰고, 나머지 조연은 목록에서 필요한 만큼 선택한다. 목록 밖의 이름(홍길순, 김철수 등 일반 이름)은 쓰지 않는다.

   | 구분 | 이름 목록 |
   |---|---|
   | **주인공 (항상 1번)** | 정훈영 |
   | **고전/설화** | 홍길동, 심청, 이몽룡, 성춘향, 바보온달, 평강공주, 손오공, 사오정, 저팔계 |
   | **스포츠·연예·셀럽** | 유재석, 손흥민, 강호동, 이병헌, 마동석, 지드래곤, 차은우, 박지성, 류현진, 아이유, 김연아, 이효리, 김혜수, 전지현, 송혜교, 김태희, 한가인, 장도연, 장윤정, 이영지, 수지, 윤아, 손예진, 김고은, 홍진경, 박세리, 신유빈, 안유진 |

   - Internal Table·SQL 결과 표에서 여러 행이 필요할 때: 정훈영, 홍길동, 아이유, 유재석, 손흥민 순서로 채운다.
   - 업무 역할이 필요할 때 예시: 정훈영(개발팀), 홍길동(영업팀), 아이유(마케팅팀) 식으로 자연스럽게 배정.
   - SAP 표준 Demo 테이블(SPFLI, SCARR, SBOOK 등)을 그대로 쓰는 SQL 예제에서는 이름을 억지로 끼워 넣지 않되, 실습 시나리오 설명·비유·퀴즈에는 이름을 사용한다.

---

## 5. 마크업 관례 (THEORY-01-M01 기준)

```html
<!-- lesson-content/<ID>.html -->

<div class="lesson-callout tip">
  <div class="lesson-callout-icon">🎯</div>
  <div class="lesson-callout-content">
    <h4>학습 목표</h4>
    <p>... <span class="glossary-term" data-glossary="키">표시문구</span> ...</p>
  </div>
</div>

<section class="lesson-section">
  <h2>1. 소제목 🧱</h2>
  <p>...</p>
  <ul><li>...</li></ul>
  <blockquote>핵심 한마디</blockquote>
</section>

<!-- 콜아웃 종류: class="lesson-callout tip|warn|" (기본=정보). 아이콘: 🎯 💡 ⚠️ 🔗 🧪 등 -->
<!-- 코드/객체명: <code>CHAR 3</code>. 강조: <strong> -->

<!-- 맨 끝: 요약 마무리 섹션(피드백 §4-3) -->
<section class="lesson-section">
  <h2>N. 한눈에 정리 🏁</h2>
  <div class="lesson-callout tip"> ... 핵심 bullet ... </div>
  <p>다음 Lesson 예고 ...</p>
</section>
```
- CSS 클래스는 `assets/abap-lesson-viewer.css`/`abap-glossary.css`에 정의됨. 새 클래스를 임의로 만들지 말고 기존 것 재사용.

### 시각화 패턴 카탈로그 (전 Lesson 공통 — 2026-06-11 도입)

> 시각화는 코드 예제 설명 전용이 아니다. **데이터 상태 변화 / 요소 간 관계 / 처리 흐름 / 전·후 차이** 중 하나에 해당하는 설명이면 본문 어디든 시각 자료를 넣는다 (Lesson당 최소 1개, 보통 1~3개).
> 신규 작업은 `viz-*` 클래스를 사용한다. `itab-*`는 Chapter 6에서 시작된 동일 스타일의 기존 별칭(호환 유지)이다.

**적용 판단 체크리스트** — 아래 중 하나라도 "예"면 시각화한다:
- [ ] 한 대상의 **상태가 단계별로 변하는가**? → ① 상태 변화 그리드
- [ ] 둘 이상의 **요소가 관계/순서로 연결되는가**? → ② 관계도 or ⑤ 프로세스 플로우
- [ ] 반복/이벤트의 **현재 위치를 추적해야 하는가**? → ③ 포인터 추적
- [ ] **성공/실패(분기) 결과가 갈리는가**? → ④ 성공/실패 비교
- [ ] 명령 실행 **전과 후의 데이터/코드가 달라지는가**? → ⑥ 전/후 비교
- [ ] **계층/아키텍처 구조**(3-Tier, VDM, RAP 등)인가? → ⑦ 인라인 SVG

```html
<!-- ① 상태 변화 그리드: 선언→채움→추가→읽기 등 단계별 스냅샷 -->
<div class="viz-visual">
  <p class="viz-visual-title">제목</p>
  <div class="viz-state-grid">
    <div class="viz-state">
      <span class="viz-state-label">1. 단계명</span>
      <table class="viz-table">
        <thead><tr><th>필드</th></tr></thead>
        <tbody><tr class="viz-highlight-row"><td>값</td></tr></tbody>
      </table>
      <!-- 빈 상태는: <div class="viz-empty">아직 행이 없습니다</div> -->
    </div>
  </div>
  <p class="viz-note">하단 설명</p>
</div>

<!-- ② 관계도: A → B → C (Domain→Data Element→Field, FK→Check Table 등) -->
<div class="viz-relation">
  <div class="viz-concept"><span class="viz-concept-label">A</span>...</div>
  <div class="viz-arrow">→</div>
  <div class="viz-concept"><span class="viz-concept-label">B</span>...</div>
  <div class="viz-arrow">→</div>
  <div class="viz-concept"><span class="viz-concept-label">C</span>...</div>
</div>

<!-- ③ 포인터 추적: 현재 처리 행 강조 -->
<tr class="viz-current-row"><td>...</td></tr>

<!-- ④ 성공/실패 비교 배지 -->
<span class="viz-badge success">sy-subrc = 0</span>
<span class="viz-badge fail">sy-subrc = 4</span>

<!-- ⑤ 프로세스 플로우: 이벤트/처리 순서 -->
<div class="viz-flow">
  <div class="viz-flow-step"><strong>1. 단계</strong><span>설명</span></div>
  <div class="viz-flow-step"><strong>2. 단계</strong><span>설명</span></div>
</div>

<!-- ⑥ 전/후 비교: SORT/DELETE/MODIFY, Classic vs Modern -->
<div class="viz-compare">
  <div class="viz-compare-before">
    <span class="viz-compare-label">실행 전 (또는 Classic)</span>
    <div class="viz-compare-body"><table class="viz-table">...</table></div>
  </div>
  <div class="viz-compare-after">
    <span class="viz-compare-label">실행 후 (또는 Modern)</span>
    <div class="viz-compare-body"><table class="viz-table">...</table></div>
  </div>
</div>

<!-- ⑦ 인라인 SVG 다이어그램: 계층/아키텍처 (viz-visual 안에 중첩) -->
<div class="viz-svg">
  <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="다이어그램 설명">
    <!-- 정적 도형/텍스트만. <script>·애니메이션 금지 -->
  </svg>
</div>
```

**SVG 작성 규칙**:
- `<script>`, 이벤트 핸들러, 외부 참조 금지 — 정적 마크업만.
- 색상은 표준 팔레트 hex를 직접 사용: 주(#0056b3/#eef5ff), 성공(#00a884/#e8f8ef), 실패(#9b2530/#fff0f0), 강조(#fff7db), 제목(#12365f), 본문 회색(#56657a), 테두리(#d7e1ee).
- 한글 텍스트 허용. `font-family`는 지정하지 않거나 `inherit`(뷰어 폰트 상속).
- `viewBox` 필수, 고정 width/height 금지 (`viz-svg`가 반응형 처리).
- 접근성: `role="img"` + `aria-label`로 그림 내용 한 줄 설명.

**인터랙션이 필요한 경우**: 조각 파일에 단독 `<script>`를 넣지 말고 `assets/abap-lesson-viewer.js`에 공통 스크립트로 추가한다(클래스/data-속성 기반 위임). 단독 스크립트는 공통화가 불가능한 예외에만 허용.

### 글로서리 항목 스키마 (`reference/abap_glossary.json`)
```json
"키": {
  "title": "표시 제목 (영문/한글)",
  "desc": "한두 문장 정의",
  "everyday_analogy": "이해하기 쉬운 일상 사례: ...",
  "used_in_lessons": ["THEORY-02-M01"],
  "design_theme": "info | primary | code | warn",
  "html_content": "<p>보충(선택)</p>"
}
```

---

## 6. 유용한 스크립트

JSON은 커서 한 줄 eval이 깨지기 쉬우니 임시 스크립트 파일을 쓴다. **`archive/_local/`은 .gitignore라 거기에 임시파일을 두면 커밋에 안 섞인다.**

**(a) 특정 섹션의 Lesson 지침 덤프** — `archive/_local/dump.mjs`:
```js
import { readFileSync } from "node:fs";
const d = JSON.parse(readFileSync("reference/abap_curriculum_v5_4_20260605_000000.json","utf8"));
const sec = d.tracks[0].sections.find(s => s.section_id === process.argv[2]);
sec.sub_levels_1.forEach(g => g.sub_levels_2.forEach(u => {
  console.log("\n######", u.sub_2_id, "|", u.sub_2_name);
  console.log("[handled]", u.handled_contents.ko);
  console.log("[keywords]", (u.technical_keywords||[]).join(", "));
  (u.learning_content_design.ko||[]).forEach(x => console.log("  -", x));
  console.log("[lab]", u.hands_on_lab.ko);
  (u.caution_points.ko||[]).forEach(x => console.log("  ! ", x));
}));
```
실행: `node archive/_local/dump.mjs THEORY-02`

**(b) 글로서리 미정의 용어 검증**:
```js
import { readFileSync, readdirSync } from "node:fs";
const g = JSON.parse(readFileSync("reference/abap_glossary.json","utf8"));
const keys = new Set(Object.keys(g));
let miss = 0;
readdirSync("docs/abap/lesson-content").forEach(f => {
  const html = readFileSync("docs/abap/lesson-content/"+f,"utf8");
  [...html.matchAll(/data-glossary="([^"]+)"/g)].forEach(m => {
    if (!keys.has(m[1])) { console.log("MISSING:", m[1], "in", f); miss++; }
  });
});
console.log(miss === 0 ? "OK: 미정의 0" : "미정의 "+miss);
```

---

## 7. 작업/커밋 규칙 (이 저장소)

- 브랜치: 현재 `feature/abap-lesson-content`에서 이어서. 섹션 단위 커밋. main 직접 수정 금지.
- 커밋 메시지 한국어. 끝에 `Co-Authored-By: ...`.
- 컨벤션 상세는 `.project-docs/03_CONVENTIONS.md`. (코드 파일 주석 헤더 규칙 §6, archive 정책 §4 등)
- **주의**: 별도 PR `docs/sync-lesson-viewer-and-pr-backfill`(문서 동기화 + archive 자동 스냅샷 훅)이 열려 있음. 그 브랜치가 도입한 `.claude/` PreToolUse 훅은 Claude 편집 직전 원본을 `archive/_local/`(gitignore)에 스냅샷함 — Lesson 작업에 영향 없음.

---

## 8. 다음 AI에게 줄 복붙 프롬프트

> 아래를 그대로 새 AI 세션에 붙여넣으면 된다.

```
이 저장소(c:\ui5\study\sapui5)는 SAP 개발자용 정적 HTML 학습 사이트야.
Track 1(THEORY-*) 137개 레슨은 모두 작성 완료되었고, 이제 **Track 2(PRACTICAL-*)** 의 Lesson 본문을 순서대로 신규 작성하려고 해.

먼저 아래 3개를 정독해:
1) .project-docs/HANDOFF_LESSON_CONTENT.md  ← 작성 규칙·스타일·스크립트·진행현황 전부 여기 있음
2) .project-docs/99_AI_SYNC.md              ← AI 인계 허브(현재 상태/미결/이력)
3) docs/abap/lesson-content/THEORY-01-M01.html ← 마크업 기준 샘플

해야 할 일:
- 브랜치 feature/abap-lesson-content 에서 이어서 작업.
- 다음 목표는 Track 2(PRACTICAL-*) 13개 섹션, 약 70개 레슨을 신규 작성하는 거야.
- reference/abap_curriculum_v5_4_20260605_000000.json 의 **d.tracks[1].sections** 를 순회하면서 작성해.
- 각 Lesson은 json의 지침(handled_contents, technical_keywords, learning_content_design, hands_on_lab, caution_points)에 근거해서 정확하게.
- Track 1에서 확립된 톤앤매너(완전 초심자용, 분량 보강, 한눈에 정리, 10·20대 학습지 톤)를 철저히 유지해.
- **[매우 중요]** 코드 블록은 순수 `<pre><code>` 로만 작성해. 내가 나중에 포맷터 스크립트로 네이비 에디터 서식(CSS 공통 클래스 기반)을 일괄 적용할 거야. 임의로 인라인 style 속성을 넣지 마.
- 본문에서 쓰는 주요 용어는 reference/abap_glossary.json 에 "완전 패리티"로 함께 등록
  (title/desc/everyday_analogy/used_in_lessons/design_theme). 미등록 용어는 툴팁이 안 뜸.
- 섹션 단위로 커밋하고, 매 섹션 후 글로서리 미정의 0건을 검증(HANDOFF 문서 §6 스크립트).
- 한 섹션 끝낼 때마다 진행현황 표(HANDOFF §1)와 99_AI_SYNC 작업이력을 갱신.

작업 규칙: main 직접 수정 금지, 커밋 메시지 한국어, 컨벤션은 .project-docs/03_CONVENTIONS.md.
확인 팁: 본문 조각은 단독으로 열면 스타일/툴팁이 안 보임. 반드시 로컬 서버에서
docs/abap/lesson-viewer.html?lesson=<ID> 로 확인. (로컬 캐시가 강력하므로 강제 새로고침 주의)
```
