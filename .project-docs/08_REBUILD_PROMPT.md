# 08. REBUILD PROMPT — Chapter 리빌딩 발주문

> 📅 **최종수정: 2026-06-20 02:28 KST**
> 🎯 **목적:** 사람이 특정 Chapter 리빌딩을 AI에게 맡길 때 쓰는 짧은 복붙 프롬프트.
> 📖 **읽을 때:** 새 AI에게 Track 1 Chapter 작업을 발주할 때.
> ⚡ **TL;DR:** 대상 Chapter와 추가 지시만 채운다. 세부 규칙은 `01/02/04/06`에서 런타임 도출한다.

## 복붙 템플릿

```text
# 지시: Track 1 단일목표 수행 — <대상 Chapter> 리빌딩

당신은 C:\ui5\study\sapui5 의 SAPUI5/ABAP 학습 콘텐츠 프로젝트를 작업하는 AI 개발자다.
추측하지 말고 프로젝트 SSOT 문서를 읽고 행동한다.

## 0. 부팅
먼저 아래 문서를 읽는다.
- .project-docs/00_INDEX.md
- .project-docs/01_AI_SYNC.md
- .project-docs/02_PROGRESS.md
- .project-docs/04_CONVENTIONS.md

필요할 때만 추가로 읽는다.
- 구조/경로: .project-docs/03_ARCHITECTURE.md
- 함정: .project-docs/05_PITFALLS.md
- 샘플/학습수단/v4: .project-docs/06_LEARNING_METHODS.md
- 브라우저 검증: .project-docs/07_BROWSER_TESTING.md

## 1. 범위
대상: <대상 Chapter>

reference/abap_curriculum_v5_4_20260605_000000.json 에서 대상 Chapter의 Lesson 목록, 제목, 학습범위를 직접 조회한다.
02_PROGRESS.md의 active claim을 확인하고, 다른 AI가 잡은 Lesson은 건드리지 않는다.
한 번에 한 Lesson만 진행한다.

## 2. 완료 기준
Lesson 완료 기준은 01_AI_SYNC.md의 "Lesson 완료 정의"를 그대로 적용한다.
샘플과 학습수단은 06_LEARNING_METHODS.md에서 고른다.
파일 작성, 인라인 금지, git 정책은 04_CONVENTIONS.md를 따른다.

## 3. 작업 루프
1. 02_PROGRESS.md에 대상 Lesson claim을 남긴다.
2. 필요하면 `.project-plans/YYYYMM/MMDD_HHMM_<slug>/`를 만든다.
3. SAP 공식 문서를 먼저 확인하고 NotebookLM으로 설명·예시·시뮬레이션 보강 포인트를 확보한다. 상세 출처 우선순위는 01_AI_SYNC.md를 따른다.
4. Lesson fragment, glossary, 공통 CSS/JS를 수정한다.
5. 브라우저에서 콘솔, T-code 칩/해당 없음, glossary, 시뮬레이션을 검증한다.
6. 02_PROGRESS.md와 plans 결과를 갱신한다.
7. 사용자 요청 또는 PR 준비 시에만 explicit path로 stage/commit/push 한다.

## 4. 금지
일반 작업 중 git pull/fetch/add -A 금지. PR merge 후 로컬 동기화는 04_CONVENTIONS.md의 Git 예외 절차를 따른다.
운영 Lesson fragment 인라인 script/style/style 금지.
정적 코드블록만 두고 시뮬레이션 생략 금지.
T-code를 glossary/chip/used_in_lessons 없이 본문에만 언급 금지.

## 5. 추가 지시
<추가 지시·주의>
```

## 사용법

- `<대상 Chapter>` 예: `Chapter 4`, `THEORY-04`, `Dictionary 관계와 Foreign Key`.
- `<추가 지시·주의>`는 그때만 필요한 요구사항만 쓴다.
- Lesson 목록, T-code, DoD는 프롬프트에 복사하지 않는다. AI가 SSOT에서 직접 읽는다.
