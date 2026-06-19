# 01. AI SYNC — 현재 목표와 하드 제약

> 📅 **최종수정: 2026-06-20 02:28 KST**
> 🎯 **목적:** 지금 무엇을 해야 하고, 어떤 조건을 반드시 지켜야 하는지 정의한다.
> 📖 **읽을 때:** 모든 작업 시작 전 최우선.
> ⚡ **TL;DR:** Track 1 Lesson을 Academy 샘플 우선으로 리빌딩한다. Lesson은 이론+실습+핵심 흐름 시뮬레이션까지 끝나야 완료다.

## 현재 단일 목표

Track 1 `THEORY-01~21` Lesson을 처음부터 다시 만든다.

- UI/학습수단 기준: [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md)
- 진행 상태/claim: [02_PROGRESS.md](02_PROGRESS.md)
- 파일 작성 규칙: [04_CONVENTIONS.md](04_CONVENTIONS.md)
- 구조/경로: [03_ARCHITECTURE.md](03_ARCHITECTURE.md)

## Lesson 완료 정의

Lesson 본문 1개는 아래를 모두 만족해야 완료다. 문서 정리, 샘플 정리, v4 제작, 공통 자산 작업에는 이 DoD를 그대로 적용하지 않는다.

- NotebookLM 질의로 누락 개념·주의사항을 보강한다. 키워드·문법·명령을 소개할 때는 SAP 공식 문서를 최우선 기준으로 삼고, 해당 키워드의 주요 옵션/변형은 공식 문서에서 확인한 뒤 NotebookLM으로 누락 후보를 대조한다. Classic ABAP, Modern ABAP 문법 스타일, ABAP Cloud 제한은 서로 다른 축이므로 현재 Lesson 맥락에 맞게 구분한다. SAP 공식 재검증은 문장 전체가 아니라 syntax, runtime behavior, SAP GUI 절차, T-code 역할처럼 틀리면 학습을 망치는 핵심 주장에 적용한다.
- 공식 문서는 상황 설명, 초심자용 예시, 실습 흐름, 시뮬레이션 설계가 부족할 수 있다. 이 부분은 AI가 직접 구성한 설명안과 NotebookLM 보강 내용을 교차비교해 완성도를 높이되, 공식 문서의 syntax/behavior와 충돌시키지 않는다.
- 초반 Track 1은 Classic ABAP/SAP GUI 중심이다. `WRITE`, `REPORT`, List Processing처럼 Classic 문서에만 있는 항목은 Classic ABAP Keyword Documentation으로 확인하고, ABAP Cloud 문서에 없다는 이유로 제거하거나 축소하지 않는다.
- [06](06_LEARNING_METHODS.md)의 추천 샘플/학습수단을 골라 텍스트 나열이 아닌 조작형 Lesson으로 만든다.
- 핵심 코드, SQL, 설정, SAP GUI 절차가 나오면 페이지 안에서 직접 실행·조작하는 시뮬레이션을 넣는다. 보조 예시만 정적 코드블록으로 두는 것은 가능하지만, Lesson의 핵심 흐름이 정적 설명뿐이면 미완이다.
- T-code를 본문에 노출하면 `reference/abap_glossary.json`에 `category:"tcode"`로 등록/확인하고, 본문 `data-glossary`와 `used_in_lessons`를 연결한다. 절차에 필요 없는 보조 T-code는 억지로 넣지 않는다.
- 운영 Lesson fragment는 `docs/abap/lesson-content/<ID>.html`에 두고, 인라인 `<script>`, `<style>`, `style` 속성을 넣지 않는다.
- `reference/design_variants.json` 토큰과 공통 `assets/abap-lesson-viewer.css/js` 패턴을 따른다.
- 검증 결과는 콘솔 오류 0건, T-code 칩 바/미노출 판단, 주요 인터랙션/시뮬레이션 동작 확인까지 포함한다.

## Lesson 작업 루프

1. `02_PROGRESS.md`에서 active claim이 없는지 확인하고 대상 Lesson 1개만 잡는다.
2. 필요하면 `.project-plans/YYYYMM/MMDD_HHMM_<slug>/`를 만든다.
3. NotebookLM 질의와 SAP 공식 재검증으로 보강 포인트를 확보한다.
4. `06_LEARNING_METHODS.md`에서 학습수단을 고른다.
5. Lesson fragment, glossary, 공통 CSS/JS를 필요한 만큼 수정한다.
6. 브라우저/정적 검증을 수행한다. 절차는 [07_BROWSER_TESTING.md](07_BROWSER_TESTING.md).
7. `02_PROGRESS.md`와 plans 결과를 갱신한다.
8. git은 사용자 요청 또는 PR 준비 시에만 수행한다. 내 파일만 stage하고 일반 작업 중 `git add -A`, `git pull`, `git fetch`는 사용하지 않는다.

## 도구와 SSOT

| 항목 | 기준 |
|---|---|
| NotebookLM 노트 ID | `ad0e9cde-4dca-451e-b455-de200a9ed7b7` |
| NotebookLM 권장 실행 | `nlm notebook query <노트ID> "<질문>"` |
| 커리큘럼 | `reference/abap_curriculum_v5_4_20260605_000000.json` |
| 글로서리/T-code | `reference/abap_glossary.json` |
| 디자인 토큰 | `reference/design_variants.json` |
| 샘플/학습수단 | [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md) |
| ABAP Keyword Documentation — Classic | [latest/en-US/ABENABAP.html](https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/ABENABAP.html) — Classic ABAP/SAP GUI Lesson 기본 기준 |
| ABAP Keyword Documentation — ABAP Cloud | [CLOUD/en-US/ABENABAP.html](https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/ABENABAP.html) — ABAP Cloud/RAP/Cloud 제한 확인용 |

## 작업 구분

- Lesson 본문: 한 번에 하나만 작업한다.
- 공통 CSS/JS, 문서, 샘플/v4 작업: 명확한 범위와 검증 계획이 있으면 묶어서 처리할 수 있다.
- 작업 중 막히면 [05_PITFALLS.md](05_PITFALLS.md)를 먼저 확인한다.

## 규칙 적용 판단

- 문서/샘플/v4 정리에는 NotebookLM/SAP 공식 재검증을 요구하지 않는다.
- SAP 공식 재검증은 `help.sap.com`, SAP Learning, ABAP Keyword Documentation 등 공식 출처를 우선한다. 공식 출처를 바로 확보하지 못하면 `RESULTS.md`나 보고에 제한을 남긴다.
- 문법·키워드·명령 설명의 출처 우선순위는 SAP 공식 문서가 1순위다. NotebookLM, 기존 Lesson, 샘플, 블로그가 공식 문서와 충돌하면 공식 문서를 따른다.
- 교육적 설명, 상황 예시, 실습 과제, 페이지 내 시뮬레이션은 공식 문서만으로 부족하면 AI 작성안과 NotebookLM 응답을 서로 검증해 보강한다. 단, 보강 내용은 공식 문서로 확인한 문법/동작 범위를 넘겨 단정하지 않는다.
- ABAP Keyword Documentation은 같은 제목으로 보여도 Classic(`abapdocu_latest_index_htm/latest`)과 ABAP Cloud(`abapdocu_cp_index_htm/CLOUD`)를 구분한다. Lesson이 Classic ABAP/SAP GUI 흐름이면 Classic 문서를 기본값으로 삼고, ABAP Cloud 문서는 호환성/제한 비교가 필요할 때만 보조로 본다. Modern ABAP은 ABAP Cloud와 동의어가 아니므로 별도로 판단한다.
- 키워드 옵션 커버리지는 "모든 옵션을 본문에 나열"이 아니라 "공식 옵션 전체를 확인한 뒤, 현재 Lesson 범위에서 다룰 항목과 제외할 항목을 의도적으로 판단"하는 기준이다.
- 공식 문서 검증 결과는 `RESULTS.md`나 완료 보고에 최소한 문서 종류(Classic/Cloud/SAP Learning 등), 확인한 키워드 또는 URL, 미확인 제한을 남긴다.
- T-code는 초심자가 실제로 들어가야 하는 화면/도구일 때만 본문에 남긴다. 본문에 남긴 T-code는 글로서리/칩/지도 연결을 생략하지 않는다. T-code가 없는 Lesson은 칩을 억지로 만들지 않고 "해당 없음"으로 검증한다.
- 공통 CSS/JS를 바꾸면 모든 Lesson을 전수 확인하지 않는다. 영향 받은 상호작용 유형별 대표 Lesson을 [07_BROWSER_TESTING.md](07_BROWSER_TESTING.md) 기준으로 확인한다.
