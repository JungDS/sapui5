# CHANGELOG: 2026-06-09

**작업 일시:** 2026-06-09
**작업 담당:** Claude (Opus 4.8)

## 🛠️ 작업 상세 내용 — 운영 분석 문서 동기화 (코드 변경 없음)

2026-06-08 Antigravity가 도입한 **Lesson Single Viewer 아키텍처**가 AI 핸드오프 계층(`99_AI_SYNC.md`·`08_DEV_DIARY.md`·`CHANGELOG_20260608.md`)에만 기록되고, 분석 기준 계층(`.project-docs/01~07` + `README.md`)에는 누락되어 있던 드리프트를 해소했다. 문서만 갱신했고 `assets/`·`docs/`·`data/`·`reference/` 코드·데이터는 일절 수정하지 않았다.

### 갱신 문서
- **`README.md`** — "현재 진행 상황"을 lesson-viewer 도입(2026-06-08) 기준으로 갱신, 최종수정 2026-06-05→2026-06-09. 주요 링크에 `lesson-viewer.html?lesson=THEORY-01-M01` 추가, Stage 7 표에 `7-19` 행 추가.
- **`01_OVERVIEW.md`** — 현재 단계에 Single Viewer 방향 추가, 미결 과제 2개→3개(Lesson 콘텐츠 양산 최상위). 기술부채에 글로서리 2종 병존·footer/stage7 상충 추가. 날짜 갱신.
- **`02_ARCHITECTURE.md`** — 폴더 표에 `docs/abap/lesson-content/`, 커리큘럼 엔진에 `abap-lesson-viewer.*`·`abap-glossary.*` 등재. 뷰어는 `DOCS` 미등록 템플릿임을 명시.
- **`04_PITFALLS.md`** — P9를 "용어 시스템 2종 병존"으로 보강(`data-glossary` 강제), P10에 footer/stage7 상충 메모, **P11**(뷰어 SSOT 미등록 템플릿)·**P12**(신규 자산 헤더 규칙 미적용) 신설.
- **`05_INVENTORIES.md`** — asset 의존 맵에 `abap-lesson-viewer.*`·`abap-glossary.*` 추가, D절에 orphan `_abap-curriculum-gallery.html`·`lesson-viewer.html`·`lesson-content/THEORY-01-M01.html` 기록, E절에 `abap_glossary.json`·`abap_curriculum_20260529_180000.json` 추가.
- **`06_ABAP_CURRICULUM.md`** — "Lesson 단일 뷰어(2026-06-08)" 절 신설(2계층 구조·연결·설계 의도·미결), 다음 단계에 콘텐츠 양산을 1순위로 재배치.

## 🤔 고민했던 점 및 설계 의사결정

- **왜 코드를 안 건드렸나**: 이번 라운드 목표는 "문서가 코드 현실을 정확히 반영하게" 하는 것. 뷰어 `DOCS` 등록·자산 헤더 부여·orphan archive 등은 모두 동작/구조를 바꾸는 코드 변경이라 별도 라운드로 분리하고, 04/06에 "기록만" 남겼다. 분석 라운드와 변경 라운드를 섞지 않는다는 03 §8(구조 PR과 콘텐츠 PR 분리) 정신을 따랐다.
- **드리프트의 구조적 원인**: 여러 AI가 `99_AI_SYNC`를 핸드오프 허브로 쓰는데, 분석 기준 문서(01~07)는 별도로 동결되어 둘이 어긋났다. 앞으로 큰 아키텍처 변경 시 핸드오프 로그뿐 아니라 해당되는 01~07도 함께 갱신해야 함을 환기.
- **검증**: `git status`로 변경이 `.project-docs/*.md`·`README.md`·신규 changelog에만 국한됐는지, 05 인벤토리 표가 실제 `ls assets`·`grep` 참조 결과와 일치하는지 대조.
