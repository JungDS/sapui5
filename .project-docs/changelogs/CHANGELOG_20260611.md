# 개발 일지 - 2026-06-11

> 📅 **최종수정: 2026-06-11 KST**

## 참여 AI
- **Codex (GPT-5)**
- **Claude (Fable 5)**

## 작업 상세 내용

### Codex (GPT-5) — Track 1 사용자 피드백 보정 및 Internal Table 시각화
- `Chapter 1의 Lesson 1` 제목에서 첫 Lesson에 맞지 않는 "지난 시간 연결" 표현을 사용자가 직접 수정한 상태로 커밋 범위에 포함했다.
- `assets/abap-lesson-viewer.css`에서 `.abap-editor-code code`가 부모의 `D2Coding` 폰트를 상속하도록 보정하고, Internal Table 학습 시각 자료용 공통 CSS 클래스를 추가했다.
- `tools/format-abap-code.mjs`의 ABAP 키워드 목록에 `LENGTH`, `TIMES`, `CONTINUE`, `EXIT`, `CONCATENATE`, `SEPARATED BY`, `FIND`, `IN`, `DEFAULT`, `OBLIGATORY`, `BEGIN OF BLOCK`, `END OF BLOCK`, `FRAME TITLE`, `PERFORM`, `OTHERS`, `METHOD`, `ENDMETHOD`, `STANDARD TABLE OF`, `INDEX`를 추가했다.
- `Chapter 2의 Lesson 3`에서 SAP Learning의 ADT 콘솔 `out->write( )` 예제와 Classic ABAP Report의 `WRITE` 문이 다르다는 설명을 추가하고, 공식 링크를 SAP Help Portal `WRITE` 문서 중심으로 교체했다.
- `Chapter 5의 Lesson 2`에서 `USING`, `CHANGING`, pass by reference, pass by value, pass by value and result를 분리해 설명하고, `VALUE(...)`가 `FORM`의 formal parameter 선언 쪽에 붙는다는 점을 예제로 보강했다.
- `Chapter 5의 Lesson 4~5`에서 Class의 Attribute/Method, Static/Instance, Public/Protected/Private 설명을 보강하고, `zcl_demo_text`의 목적과 구조를 먼저 소개한 뒤 호출 예제로 이어지도록 순서를 조정했다.
- `Chapter 6의 Lesson 1~6`에 `정훈영` 중심의 한국어 예제 이름을 적용하고, Internal Table의 빈 상태, Work Area, APPEND/INSERT 전후, LOOP 현재 행, READ TABLE 성공/실패, 미니 가공 흐름을 HTML/CSS 표와 흐름도로 추가했다.

### Codex (GPT-5) — Chapter 21의 Lesson 1~8 고품질화 패턴 확산
- `docs/abap/lesson-content/THEORY-21-M01.html` ~ `THEORY-21-M08.html`에 미니 실습, 완료 조건, 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
- NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`에서 RAP Architecture, Interface/Projection View, BDEF, Behavior Pool, EML, Service Definition/Binding, Validation/Determination/Action, ABAP Cloud/Released API 근거 매트릭스를 받아 누락 위험을 확인했다.
- NotebookLM 결과는 전체로 간주하지 않고 SAP Help Portal, SAP Learning의 공식 문서 후보로 재검증했다.
- Managed RAP, `strict ( 2 )`, EML의 `FAILED/REPORTED/MAPPED`, Service Definition과 Service Binding의 책임 차이, Validation과 Determination의 차이, Public API와 Released API의 차이처럼 초심자 오해가 큰 지점을 실습과 퀴즈에 반영했다.
- Chapter 20~21 사용자 화면 본문에 남아 있던 내부 ID 표현을 `Chapter N의 Lesson M` 형식으로 정리했다.
- `TRACK1_QUALITY_PLAN.md`, `HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`를 Chapter 21 완료 상태로 갱신했다.
- 정적 검증 결과 Chapter 21의 8개 Lesson 모두 실습/퀴즈/details/공식 링크 3개/내부 ID 미노출 조건을 만족했다.

### Codex (GPT-5) — Chapter 20의 Lesson 1~6 고품질화 패턴 확산
- `docs/abap/lesson-content/THEORY-20-M01.html` ~ `THEORY-20-M06.html`에 미니 실습, 완료 조건, 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
- NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`에서 CDS View Entity, VDM 계층, Association, Annotation, Metadata Extension, DCL 근거 매트릭스를 받아 누락 위험을 확인했다.
- NotebookLM 결과는 전체로 간주하지 않고 SAP Help Portal ABAP Keyword Documentation, SAP Help Portal, SAP Learning의 공식 문서 후보로 재검증했다.
- `@AbapCatalog.sqlViewName`, ZI_/ZC_ 책임 분리, Cardinality, Semantics Annotation, `@Metadata.allowExtensions`, DCL Role/Grant Rule처럼 초심자 오해가 큰 지점을 실습과 퀴즈에 반영했다.
- `TRACK1_QUALITY_PLAN.md`, `HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`를 Chapter 20 완료 상태로 갱신했다.
- 정적 검증 결과 Chapter 20의 6개 Lesson 모두 실습/퀴즈/details/공식 링크 3개/내부 ID 미노출 조건을 만족했다.

### Codex (GPT-5) — Chapter 3의 Lesson 1~4 고품질화 패턴 확산
- `docs/abap/lesson-content/THEORY-03-M01.html` ~ `THEORY-03-M04.html`에 미니 실습, 완료 조건, 공식 문서 링크, 확인 퀴즈, 정답/해설을 추가.
- 기존 PARAMETERS, DEFAULT/OBLIGATORY, WRITE 출력, Selection Screen Block 설명과 ABAP 예제는 유지하고, 품질 기준에서 빠져 있던 학습 완결 요소만 보강.
- Lesson별 공식 링크는 SAP Help Portal ABAP Keyword Documentation의 `PARAMETERS`, `SELECTION-SCREEN`, Output Statement와 기존 SAP Learning Basic ABAP Programming 링크를 우선 사용.
- NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide` 결과를 다시 확인해, `SELECT-OPTIONS`, `AT SELECTION-SCREEN`, Variant는 Chapter 3의 PARAMETERS 기초 범위 밖 후속 주제로 분리하기로 정리.
- `TRACK1_QUALITY_PLAN.md`의 정적 감사 수치와 다음 우선순위를 갱신하고, Chapter 1~3 파일럿 리뷰 결과 및 후속 운영 규칙을 추가.
- `HANDOFF_LESSON_CONTENT.md`, `99_AI_SYNC.md`, `08_DEV_DIARY.md`를 Chapter 3 완료 및 파일럿 리뷰 상태로 갱신.
- 검증 결과 Track 1 전체 `data-glossary` 미정의 0건, lesson-content 인라인 스타일 0건, `<script>`/`<style>`/인라인 이벤트 0건, Chapter 3 내부 ID 사용자 화면 노출 0건을 확인.
- Lesson Viewer에서 Chapter 3의 Lesson 1~4가 실습/퀴즈/공식 링크/용어 태그를 렌더링하는지 확인.

## Codex 고민했던 점 및 설계 이유
- **좁은 보강 범위**: Chapter 3 본문은 이미 초심자 설명, 예제, 정상/오류 흐름, 실무 주의, 요약을 갖추고 있었다. 그래서 본문을 다시 쓰지 않고 실습 완료 조건, 공식 링크, 퀴즈/해설만 추가했다.
- **후속 주제 경계 유지**: Selection Screen은 `SELECT-OPTIONS`, `AT SELECTION-SCREEN`, F4 Help로 확장되기 쉽지만, Chapter 3은 PARAMETERS 맛보기 범위이므로 범위 입력과 이벤트 검증은 후속 Chapter로 남겼다.
- **포맷터 제한**: `node tools/format-abap-code.mjs`는 전체 파일 대상 실행 중 `THEORY-19-M01.html` 쓰기 권한 오류로 중단됐다. 이번 변경은 코드 블록을 새로 만들지 않았고 Chapter 3 파일의 코드 mockup 형식이 이미 유지되어, 정적 검증으로 범위를 확인했다.
- **파일럿 후속 규칙**: Chapter 1~3을 먼저 끝낸 뒤 바로 다음 Chapter로 확산하지 않고, 부족 요소 사전 감사, 공식 링크 검증, 범위 밖 주제 분리, 포맷터 영향 확인을 계획 문서에 추가했다.
- **Chapter 20 교차 검증 강화**: NotebookLM이 제안한 심화 포인트 중 릴리스·성능·권한과 관련된 내용은 단정하지 않고, SAP Help Portal 공식 링크로 확인 가능한 범위만 Lesson 본문에 반영했다.
- **Chapter 21 최신성 관리**: RAP와 ABAP Cloud는 릴리즈별 차이가 크므로 NotebookLM의 초안 포인트를 그대로 쓰지 않고, SAP Help Portal/SAP Learning으로 확인 가능한 구조와 입문 수준의 책임 분리만 본문에 반영했다.
- **사용자 피드백 반영 방식**: 사용자가 직접 고친 `Chapter 1의 Lesson 1` 제목은 보존하고, 이번 수정 커밋에 포함했다. AI가 만든 변경과 사용자 변경을 구분해 확인한 뒤 같은 목적의 커밋으로 묶었다.
- **정확한 문법 위치 보정**: `USING VALUE(...)`는 호출문이 아니라 `FORM` formal parameter 선언 쪽의 표현이므로 예제에서 `PERFORM change_copy USING gv_name.`과 `FORM change_copy USING VALUE(iv_name) TYPE string.`의 위치 차이를 분리해 보여줬다.
- **시각 자료 구현 선택**: Internal Table 이해 보강은 별도 이미지 파일보다 유지보수 가능한 HTML/CSS 표와 흐름도를 선택했다. Lesson fragment에는 인라인 스타일을 넣지 않고 공통 CSS만 확장했다.
- **포맷터 범위 관리**: 키워드 목록은 전역으로 확장했지만, 전체 Lesson 재포맷으로 생긴 줄끝/재생성성 변경은 제외하고 요청 범위와 직접 검증한 Lesson 변경만 남겼다.

---

### Claude (Fable 5) — Track 1 시각화 확산 기반 정비 (Phase 0)
- 사용자 요구(시각화를 코드 예제 설명에 국한하지 말고 모든 설명 과정에 확산)에 따라 Track 1 시각화 현황을 감사: Chapter 6에만 itab-* 시각 자료가 집중되어 있고 129/137개 Lesson은 텍스트+코드만 있는 상태를 확인.
- `assets/abap-lesson-viewer.css`의 모든 `itab-*` 셀렉터에 범용 `viz-*` 별칭을 병기하고, 전/후 비교용 `viz-compare(-before/-after/-label/-body)`와 인라인 SVG 래퍼 `viz-svg`를 신규 추가. `lesson-viewer.html` CSS 캐시 버스터를 `v=20260611-viz1`로 갱신.
- `TRACK1_QUALITY_PLAN.md` 완료 기준에 11번 "시각 자료" 항목을 추가하고, `HANDOFF_LESSON_CONTENT.md`에 시각화 패턴 카탈로그 7종(상태 변화 그리드, 관계도, 포인터 추적, 성공/실패 비교, 프로세스 플로우, 전/후 비교, 인라인 SVG)과 적용 판단 체크리스트, SVG 작성 규칙을 문서화.
- `Chapter 10의 Lesson 1/4/5`에 남아 있던 스타일 미적용 일반 `<table>` 6건을 `viz-visual` + `viz-table`로 정리하고, Include/Exclude 표에는 success/fail 배지를 적용.
- `tools/format-abap-code.mjs` 키워드에 `LEFT/RIGHT OUTER JOIN`, `INNER JOIN`, `GROUP BY`, `ORDER BY`, `HAVING`, `AND`, `OR`, `SINGLE`, 집계 함수 등 SQL 계열을 보강하고 전체 재실행(77개 파일 하이라이트 개선, 2차 실행 0건으로 멱등성 확인).
- NotebookLM MCP(`notebooklm-mcp` v2.0.0, 비공식)를 사용자 스코프에 등록하고 Google 인증·노트북(`ABAP Evolution and Messaging Channels Training Guide`) 등록·실질의 검증까지 완료. 이후 Chapter 패스는 NotebookLM 질의 → SAP 공식 문서 교차 검증 흐름으로 진행.

### Claude (Fable 5) — Chapter 4의 Lesson 1~6 고품질화+시각화 통합 패스
- NotebookLM에 Chapter 4 주제를 질의해 BC430 기반 오개념/시각화 아이디어/실무 주의점을 수집하고, SAP Help Portal 공식 링크 7종을 실존 검증 후 Lesson별 3개씩 연결.
- `Chapter 4의 Lesson 1~6`에 미니 실습(완료 조건 포함), 확인 퀴즈/정답/해설을 추가하고 한눈에 정리 섹션 번호를 재정렬.
- 시각 자료 6종 추가: FK 검증 관계도, 1:N 카디널리티 그리드, Value Table vs FK 전/후 비교, F4 동작 5단계 플로우, F4 탐색 우선순위 폭포수, DDIC vs 프로그램 검증 책임 비교 — 신규 `viz-*` 클래스 첫 실전 적용.
- 교차 검증된 심화 사실 반영: DDIC Foreign Key는 DB 물리 제약이 아니라 화면 입력 단계의 논리 검증이라는 점, Search Help Export 파라미터 누락 시 값 미반환, Check Table만으로도 F4 후보가 생성되는 메커니즘.

## Claude 고민했던 점 및 설계 이유
- **별칭 방식 선택**: itab-* 전면 리네이밍 대신 CSS 셀렉터 병기를 택해 Chapter 6 기존 HTML을 건드리지 않고 신규 작업의 의미(범용 viz-*)만 명확히 했다.
- **viz-compare 색상 설계**: before(연한 적색 헤더)/after(연한 녹색 헤더)로 전/후 방향을 색으로 직관화하되, 기존 팔레트(#fff0f0/#e8f8ef 계열) 안에서만 선택해 시각 일관성을 유지했다.
- **포맷터 변경 범위**: 키워드 보강으로 77개 파일이 갱신됐지만 diff가 토큰 span 추가뿐임을 스팟체크로 확인하고 멱등성(2차 실행 0건)을 검증한 뒤 커밋 범위에 포함했다.
