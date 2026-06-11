# 개발 일지 - 2026-06-11

> 📅 **최종수정: 2026-06-11 KST**

## 참여 AI
- **Codex (GPT-5)**

## 작업 상세 내용

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
