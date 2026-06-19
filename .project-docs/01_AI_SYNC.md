# 01. AI SYNC — 현재 목표와 하드 제약

> 📅 **최종수정: 2026-06-20 00:04 KST**
> 🎯 **목적:** 지금 무엇을 해야 하고, 어떤 조건을 반드시 지켜야 하는지 정의한다.
> 📖 **읽을 때:** 모든 작업 시작 전 최우선.
> ⚡ **TL;DR:** Track 1 Lesson을 Academy 샘플 우선으로 리빌딩한다. Lesson은 이론+실습+시뮬레이션+T-code 연결까지 끝나야 완료다.

## 현재 단일 목표

Track 1 `THEORY-01~21` Lesson을 처음부터 다시 만든다.

- UI/학습수단 기준: [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md)
- 진행 상태/claim: [02_PROGRESS.md](02_PROGRESS.md)
- 파일 작성 규칙: [04_CONVENTIONS.md](04_CONVENTIONS.md)
- 구조/경로: [03_ARCHITECTURE.md](03_ARCHITECTURE.md)

## Lesson 완료 정의

Lesson 본문 1개는 아래를 모두 만족해야 완료다. 문서 정리, 샘플 정리, v4 제작, 공통 자산 작업에는 이 DoD를 그대로 적용하지 않는다.

- NotebookLM 질의로 누락 개념·주의사항을 보강하고, 핵심 사실은 SAP 공식 문서로 재검증한다.
- [06](06_LEARNING_METHODS.md)의 추천 샘플/학습수단을 골라 텍스트 나열이 아닌 조작형 Lesson으로 만든다.
- 코드, SQL, 설정, SAP GUI 절차가 나오면 페이지 안에서 직접 실행·조작하는 시뮬레이션을 넣는다. 정적 코드블록만 있으면 미완이다.
- T-code가 나오면 `reference/abap_glossary.json`에 `category:"tcode"`로 등록/확인하고, 본문 `data-glossary`와 `used_in_lessons`를 연결한다.
- 운영 Lesson fragment는 `docs/abap/lesson-content/<ID>.html`에 두고, 인라인 `<script>`, `<style>`, `style` 속성을 넣지 않는다.
- `reference/design_variants.json` 토큰과 공통 `assets/abap-lesson-viewer.css/js` 패턴을 따른다.
- 검증 결과는 콘솔 오류 0건, T-code 칩 바, 주요 인터랙션/시뮬레이션 동작 확인까지 포함한다.

## Lesson 작업 루프

1. `02_PROGRESS.md`에서 active claim이 없는지 확인하고 대상 Lesson 1개만 잡는다.
2. 필요하면 `plans/YYYYMM/MMDD_HHMM_<slug>/`를 만든다.
3. NotebookLM 질의와 SAP 공식 재검증으로 보강 포인트를 확보한다.
4. `06_LEARNING_METHODS.md`에서 학습수단을 고른다.
5. Lesson fragment, glossary, 공통 CSS/JS를 필요한 만큼 수정한다.
6. 브라우저/정적 검증을 수행한다. 절차는 [07_BROWSER_TESTING.md](07_BROWSER_TESTING.md).
7. `02_PROGRESS.md`와 plans 결과를 갱신한다.
8. git은 사용자 요청 또는 PR 준비 시에만 수행한다. 내 파일만 stage하고 `git add -A`, `git pull`, `git fetch`는 사용하지 않는다.

## 도구와 SSOT

| 항목 | 기준 |
|---|---|
| NotebookLM 노트 ID | `ad0e9cde-4dca-451e-b455-de200a9ed7b7` |
| NotebookLM 권장 실행 | `nlm notebook query <노트ID> "<질문>"` |
| 커리큘럼 | `reference/abap_curriculum_v5_4_20260605_000000.json` |
| 글로서리/T-code | `reference/abap_glossary.json` |
| 디자인 토큰 | `reference/design_variants.json` |
| 샘플/학습수단 | [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md) |

## 작업 구분

- Lesson 본문: 한 번에 하나만 작업한다.
- 공통 CSS/JS, 문서, 샘플/v4 작업: 명확한 범위와 검증 계획이 있으면 묶어서 처리할 수 있다.
- 작업 중 막히면 [05_PITFALLS.md](05_PITFALLS.md)를 먼저 확인한다.
