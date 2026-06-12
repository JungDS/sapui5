# Track 1 Lesson 고품질화 계획

> 📅 **최종수정: 2026-06-11 KST**

이 문서는 Track 1(`THEORY-*`) 137개 Lesson을 "작성 완료" 상태에서 "고품질 교육용 웹페이지" 상태로 끌어올리기 위한 성공 기준과 실행 계획이다.
기존 본문 양산 규칙은 [HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)를 따르고, 본 문서는 그 다음 라운드의 품질 기준을 정의한다.

## 1. 현재 기준선

- 운영 구조: `docs/abap/lesson-viewer.html`이 `docs/abap/lesson-content/<ID>.html` 조각을 로드한다.
- Track 1 범위: `reference/abap_curriculum_v5_4_20260605_000000.json`의 `tracks[0]`, 총 21개 Chapter / 137개 Lesson.
- 본문 상태: `docs/abap/lesson-content/THEORY-*.html` 137개 존재.
- 글로서리 상태: 전체 Lesson에 `data-glossary`가 있으며, 기존 문서 기준 미정의 0건.
- 저장소 상태 확인: 2026-06-10 작업 시작 전 `main`을 `origin/main`과 fast-forward 동기화 완료.

## 2. 품질 감사 결과

2026-06-10 기준 빠른 정적 감사 결과:

| 항목 | 현재 결과 | 해석 |
|---|---:|---|
| Track 1 Lesson 파일 | 137/137 | 전체 Lesson 조각은 존재한다. |
| `한눈에 정리` 섹션 | 137/137 | `Chapter 1의 Lesson 1` 보강으로 전 Lesson에 요약 섹션이 존재한다. |
| `data-glossary` 용어 태깅 | 137/137 | 용어 팝업 기반은 전 Lesson에 존재한다. |
| `lesson-callout warn` | 137/137 | 실무 주의 콜아웃은 전 Lesson에 존재한다. |
| 코드 블록 | 114/137 | 개념형 Lesson 23개는 코드 예시 또는 화면/설계 예시 보강 여부를 재판단해야 한다. |
| 퀴즈/문제/정답/해설 관련 텍스트 | 약 57/137 | `Chapter 1~3`, `Chapter 20~21`에 기준 패턴을 적용했으며, 나머지 Lesson으로 확산 필요. |
| 실습/연습 관련 텍스트 | 약 75/137 | `Chapter 1~3`, `Chapter 20~21`에 완료 조건 포함 실습을 추가했으며, 나머지 Lesson은 표준화 필요. |
| 공식 링크 또는 외부 링크 `<a>` | 30/137 | `Chapter 1~3`, `Chapter 20~21`에 SAP 공식 링크를 추가했으며, 나머지 Lesson으로 확산 필요. |

따라서 다음 라운드는 단순 분량 증가가 아니라, **Lesson별 학습 완결성**을 만드는 작업이다.

## 3. NotebookLM 활용 기준

확인한 노트북:

- 제목: `ABAP Evolution and Messaging Channels Training Guide`
- 요청명과의 관계: 사용자가 언급한 `"ABAP Evolution and Messaging Channels Training"`에 `Guide`가 붙은 소유 노트북.
- Notebook ID: `ad0e9cde-4dca-451e-b455-de200a9ed7b7`
- 소스 수: 69개
- 주요 소스 범위: SAP 교육 PDF(`BC100`, `BC400`, `BC401`, `BC405`, `BC410`, `BC414`, `BC430`, `GW100`, `S4D400`, `S4D401`, `S4D430`, `S4D437`), SAP Learning 페이지, ABAP Cloud FAQ, Clean ABAP, ABAP Docs, CDS/RAP/Open SQL 관련 블로그와 생성 텍스트.

활용 원칙:

- NotebookLM은 개념 확장, 예제 아이디어, 실습/퀴즈 아이디어, 민감 포인트 목록화에 사용한다.
- SAP 표준 동작, 릴리즈 상태, 최신 ABAP Cloud/RAP/CDS 규칙은 SAP 공식 문서 또는 신뢰 가능한 1차 자료로 재검증한다.
- 블로그, Scribd, 생성 텍스트는 직접 근거로 본문에 박지 않고, 설명 아이디어로만 사용한다.
- 출처가 불명확하거나 버전 의존적인 내용은 Lesson 본문에 단정하지 않고 "시스템 릴리즈와 프로젝트 기준 확인" 문구를 둔다.

### 3-1. 노트북 커버리지 메모

NotebookLM 질의 결과, 노트북은 대체로 다음 범위에 강하다.

| 범위 | 커버리지 | 보강 방향 |
|---|---|---|
| DDIC, Classic ABAP 문법, Internal Table, Open SQL, Classic Report/ALV | 충분 | SAP 교육 PDF를 바탕으로 예제·실습·오개념 퀴즈를 확장한다. |
| Modern ABAP, Advanced ITAB, Gateway/OData | 충분 | 최신 문법 비교와 실습 흐름을 만들되, Track 1 범위 밖 Gateway 내용은 보충 링크 또는 Track 2 후보로 분리한다. |
| CDS, VDM, DCL | 충분 | Chapter 20의 공식 링크와 성능·권한 주의사항 보강 완료. |
| RAP Business Object, BDEF, Validation/Determination/Action | 보통 | Chapter 21의 공식 링크와 strict mode, EML, Service Binding, Validation/Determination/Action 주의사항 보강 완료. |
| ABAP Cloud, Clean Core, Released API | 부족 | Chapter 21의 공식 SAP 링크와 버전/환경 주의 문구 보강 완료. 후속 Chapter 작업 시 최신성 위험 주제는 같은 방식으로 재검증한다. |

주의: NotebookLM의 장문 질의 응답에서는 Dynpro, Report Event, ALV/SALV/Grid ALV 세부 코드 커버리지가 부족하다는 신호도 있었다. 따라서 각 Chapter 작업 시에는 노트북 답변을 그대로 신뢰하지 말고, 실제 소스 제목과 공식 문서 후보를 함께 대조한다.

## 4. Lesson별 완료 기준

각 Lesson은 아래 항목을 갖추면 고품질화 완료로 본다.

1. **학습 흐름**: 학습 목표, 지난 Lesson 연결, 본문 설명, 실무 주의, 한눈에 정리, 다음 Lesson 예고가 자연스럽게 이어진다.
2. **개념 설명**: 초심자가 처음 읽어도 "왜 필요한가 → 무엇인가 → 어떻게 쓰나 → 어디서 조심하나"가 이해된다.
3. **예제**: 주제에 맞는 코드 예제, 설정 예시, 화면 흐름, 업무 시나리오 중 최소 하나를 제공한다.
4. **실습 문제**: 학습자가 직접 해볼 수 있는 작은 과제를 제공하고, 완료 조건을 명확히 적는다.
5. **퀴즈와 해설**: 2~4문항의 확인 퀴즈와 정답/해설을 제공한다. 암기형보다 오개념을 잡는 문항을 우선한다.
6. **용어 팝업**: 핵심 용어는 `data-glossary`로 태깅하고, `reference/abap_glossary.json`과 미정의 0건을 유지한다.
7. **공식 링크/보충 링크**: SAP 공식 문서나 SAP Learning을 우선 연결한다. 본문이 길어지는 주제는 별도 보충 페이지 또는 보충 섹션으로 분리한다.
8. **표현 규칙**: 사용자에게 보이는 본문, 제목, 링크 텍스트에는 `THEORY-01-M02` 같은 내부 ID를 노출하지 않고 `Chapter 1의 Lesson 2` 형식으로 쓴다.
9. **정확성**: NotebookLM 내용은 그대로 복사하지 않고, 공식 문서와 현재 프로젝트 문맥으로 검토해 교육용 설명으로 재구성한다.
10. **렌더링 검증**: 로컬 서버에서 `docs/abap/lesson-viewer.html?lesson=<ID>`로 대표 Lesson을 확인한다. 조각 파일 단독 열람은 검증으로 보지 않는다.
11. **시각 자료**: 텍스트만으로 이해가 어려운 개념(데이터 상태 변화, 요소 간 관계, 처리 흐름, 전/후 비교)에는 Lesson당 최소 1개의 시각 자료를 적용한다. 시각화는 코드 예제 설명에 국한하지 않고 모든 설명 과정에 적용 대상이다. 패턴 카탈로그와 마크업 샘플은 [HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md)의 "시각화 패턴 카탈로그"를 따른다. 신규 작업은 `viz-*` 클래스를 사용한다(`itab-*`는 Chapter 6 기존 호환용 별칭).

## 5. Chapter별 실행 계획

작업 단위는 Chapter를 기본으로 한다.

1. 작업 전 `git pull --ff-only`로 원격 최신 상태를 확인한다.
2. 해당 Chapter의 현재 Lesson 파일, JSON 지침, NotebookLM 관련 자료, 공식 링크 후보를 수집한다.
3. 각 Lesson에 실습, 퀴즈/정답/해설, 공식 링크, 보충 설명이 필요한 지점을 표시한다.
4. Lesson 본문을 보강하고, 필요한 글로서리 항목을 함께 갱신한다.
5. 코드 블록을 새로 만들거나 표준 `<pre><code>`가 남은 경우 `node tools/format-abap-code.mjs`를 실행해 코드 블록 서식을 통일한다. 단, 포맷터가 범위 밖 파일을 수정하거나 기존 후반 Lesson 권한 문제로 중단되면, 대상 Chapter 변경만 남기고 범위 밖 변경은 즉시 되돌린 뒤 검증 메모에 사유를 기록한다.
6. 글로서리 미정의 0건, 인라인 스타일 0건, 내부 ID 노출 여부, 대표 Lesson 렌더링을 확인한다.
7. `HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `changelogs/CHANGELOG_<날짜>.md`를 함께 갱신한다.
8. 최소 Chapter별 1개 커밋을 만들고 push한다. 변경량이 크면 Lesson 단위로 세분화한다.

## 6. 우선순위

1. **Chapter 1~3**: 최신 기준과 가장 차이가 큰 초반 Lesson을 먼저 정비한다. `Chapter 1~3`은 요약, 실습, 퀴즈, 정답/해설, 공식 링크 기준 패턴 적용 완료.
2. **Chapter 20~21**: CDS/RAP/ABAP Cloud는 최신성 위험이 높으므로 SAP 공식 링크와 버전 주의 문구를 우선 보강했다. `Chapter 20~21`은 NotebookLM, 로컬 reference, SAP 공식 문서 교차 검증 후 완료.
3. **Chapter 11~19**: SQL, Dynpro, ALV, OO ABAP는 실습과 오개념 퀴즈를 강화한다.
4. **Chapter 4~10**: DDIC, 모듈화, Internal Table, SALV, Selection Screen은 초심자 실습과 화면 흐름을 보강한다.

## 7. Chapter 1~3 파일럿 리뷰 결과

2026-06-11 기준으로 사용자가 지정한 우선 범위인 `Chapter 1~3`만 먼저 보강하고 검토했다.

- **유효했던 패턴**: 기존 Lesson 본문을 무리하게 다시 쓰지 않고, 끝부분에 미니 실습, 완료 조건, 공식 링크, 확인 퀴즈, 정답/해설을 덧붙이는 방식이 안정적이었다. 이미 설명 흐름이 충분한 Lesson에는 전면 재작성보다 학습 완결 요소 보강이 적합하다.
- **사전 감사 필수**: 다음 Chapter부터는 먼저 Lesson별 부족 요소를 표로 확인한다. 설명 자체가 부족한 Lesson만 본문을 확장하고, 이미 충분한 Lesson은 실습/퀴즈/링크/해설 중심으로 보강한다.
- **공식 링크 원칙**: 문법 중심 Lesson은 SAP Help Portal ABAP Keyword Documentation을 우선하고, 초심자 학습 흐름에는 SAP Learning 링크를 함께 붙인다. 링크 텍스트에도 내부 ID를 노출하지 않는다.
- **Chapter 3 범위 경계**: NotebookLM 확인 결과 `SELECT-OPTIONS`, `AT SELECTION-SCREEN`, Variant는 `PARAMETERS` 기초와 난도가 다르므로 Chapter 3에 과도하게 넣지 않고 후속 Chapter 또는 보충 페이지로 분리한다.
- **포맷터 운영 규칙**: 포맷터는 전역 파일을 대상으로 동작할 수 있으므로 실행 후 `git diff --name-only`로 범위 밖 변경을 확인한다. 이번 파일럿처럼 코드 블록을 새로 만들지 않았고 대상 Chapter의 기존 코드 mockup이 유지되는 경우에는 정적 검증과 Lesson Viewer 렌더링 확인으로 커밋할 수 있다.
- **다음 단계**: 현재 턴에서는 Chapter 1~3 파일럿과 계획 보완에서 멈춘다. 이후 Chapter는 이 리뷰를 반영해 사용자가 승인한 범위부터 진행한다.

## 8. Chapter 20~21 리뷰 결과

2026-06-11 기준으로 사용자가 지정한 우선 범위인 `Chapter 20~21`도 같은 패턴으로 보강했다.

- **CDS/RAP 최신성 재검증**: NotebookLM에서 받은 누락 위험 포인트는 모두 SAP Help Portal, SAP Learning, ABAP Keyword Documentation의 공식 문서 후보와 대조했다. 공식 근거가 불명확한 표현은 단정하지 않고 시스템 릴리즈와 프로젝트 기준 확인 문구로 제한했다.
- **고급 주제의 초심자화**: View Entity, VDM 계층, DCL, RAP BO, BDEF, EML, Service Definition/Binding, Validation/Determination/Action, ABAP Cloud/Released API를 실습 과제와 오개념 퀴즈로 재구성했다.
- **표현 정리**: 사용자 화면에 보이는 Lesson 본문에서는 내부 ID를 제거하고 `Chapter 20의 Lesson 1`, `Chapter 21의 Lesson 8` 같은 표현으로 통일했다.
- **다음 단계**: 후속 우선 후보는 `Chapter 11~19` 또는 `Chapter 4~10`이다. 특히 SQL, Dynpro, ALV, OO ABAP는 실습과 퀴즈의 교육 효과가 크므로 먼저 정적 감사 후 Chapter 단위로 진행한다.

## 9. 사용자 피드백 보정 메모

2026-06-11 사용자 피드백에 따라 `Chapter 1의 Lesson 1`, `Chapter 2의 Lesson 3`, `Chapter 5의 Lesson 2/4/5`, `Chapter 6의 Lesson 1~6`을 보정했다.

- **첫 Lesson 연결 문구**: `Chapter 1의 Lesson 1`처럼 선행 Lesson이 없는 첫 Lesson에는 "지난 시간 연결" 표현을 쓰지 않는다.
- **WRITE 링크 구분**: Classic ABAP Report의 `WRITE` 문을 설명할 때 ADT 콘솔 앱의 `out->write( )` 예제를 대표 링크로 쓰지 않는다. 필요하면 `IF_OO_ADT_CLASSRUN` 기반 콘솔 출력과 Classic `WRITE`의 차이를 명시한다.
- **Subroutine 전달 방식**: `USING`/`CHANGING` 방향과 pass by reference/value/value-and-result를 분리해서 설명한다. `VALUE(...)`는 `PERFORM` 호출문이 아니라 `FORM`의 formal parameter 선언 쪽에 붙는다는 점을 예제로 보여준다.
- **Class 입문 순서**: Class를 처음 소개하는 Lesson에서는 Attribute/Method, Static/Instance, Public/Protected/Private를 먼저 설명하고, Event/Interface는 존재만 소개한 뒤 후속 OO ABAP Chapter로 넘긴다.
- **Internal Table 시각화**: Internal Table 입문 Lesson은 텍스트만으로 설명하지 말고 빈 테이블, Work Area, APPEND/INSERT 전후, LOOP 현재 행, READ TABLE 성공/실패를 표·흐름도 같은 HTML/CSS 시각 자료로 보여준다.
- **포맷터 범위 관리**: ABAP 키워드 사전은 전역으로 확장하되, 포맷터 실행 후 줄끝 변경이나 범위 밖 재생성이 생기면 요청 범위와 직접 검증한 변경만 남긴다.

## 10. 추가 주의사항

- `docs/abap/lesson-content/*.html`은 fragment이므로 `<html>`, `<head>`, `<script>`, 인라인 CSS를 넣지 않는다.
- 새 CSS/JS가 필요할 때는 먼저 기존 `assets/abap-lesson-viewer.*` 확장 가능성을 검토한다.
- 이미지가 필요한 경우 [09_IMAGE_ASSETS_RULE.md](09_IMAGE_ASSETS_RULE.md)의 파일명 규칙을 따르되, 인라인 `style` 대신 공통 CSS 클래스 추가를 우선한다.
- 공식 링크는 Lesson마다 무리하게 많이 넣지 않는다. 초심자가 더 읽을 수 있는 핵심 링크 1~3개를 우선한다.
- 한 번에 여러 AI가 같은 Chapter를 만지지 않는다. 작업 범위와 커밋 범위를 분리한다.
- **예제 이름 규칙** (2026-06-12 사용자 확정): 코드 예제·시각화 표·실습 시나리오에 사람 이름이 필요할 때는 아래 풀을 사용한다. **`정훈영`은 항상 주인공(1번 인물)**이며, 나머지는 조연 풀에서 필요한 만큼 선택한다. 목록 밖의 이름(홍길순, 김철수 등)은 쓰지 않는다.
  - **고전/설화**: 홍길동, 심청, 이몽룡, 성춘향, 바보온달, 평강공주, 손오공, 사오정, 저팔계
  - **스포츠·연예·셀럽**: 유재석, 손흥민, 강호동, 이병헌, 마동석, 지드래곤, 차은우, 박지성, 류현진, 아이유, 김연아, 이효리, 김혜수, 전지현, 송혜교, 김태희, 한가인, 장도연, 장윤정, 이영지, 수지, 윤아, 손예진, 김고은, 홍진경, 박세리, 신유빈, 안유진
  - 여러 행이 필요할 때 기본 순서: 정훈영 → 홍길동 → 아이유 → 유재석 → 손흥민
  - SAP Demo 테이블 SQL 예제는 이름을 억지로 넣지 않고, 실습 설명·비유·퀴즈에서 이름을 사용한다.
  - 상세 규칙 원문: [HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md) §4-7 참조.

