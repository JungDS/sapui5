# SAP Developer Learning Library

SAP 개발자를 위한 HTML 학습자료 저장소입니다.

- GitHub Pages: https://jungds.github.io/sapui5/
- 운영 관리 문서 (2026-06-10 갱신):
  - [문서 인덱스](.project-docs/00_INDEX.md)
  - [프로젝트 개요](.project-docs/01_OVERVIEW.md)
  - [아키텍처 · 폴더 · 셸](.project-docs/02_ARCHITECTURE.md)
  - [규칙과 컨벤션](.project-docs/03_CONVENTIONS.md)
  - [함정과 주의점](.project-docs/04_PITFALLS.md)
  - [인벤토리(asset/data/샘플)](.project-docs/05_INVENTORIES.md)
  - [ABAP 커리큘럼](.project-docs/06_ABAP_CURRICULUM.md)
  - [미결 결정 · 로드맵](.project-docs/07_DECISIONS_AND_ROADMAP.md)
  - [개발 일지](.project-docs/08_DEV_DIARY.md) · [이미지 규칙](.project-docs/09_IMAGE_ASSETS_RULE.md)
  - [AI 인계 허브(99_AI_SYNC)](.project-docs/99_AI_SYNC.md) · [Lesson 양산 인계서](.project-docs/HANDOFF_LESSON_CONTENT.md)
  - (구 00~10 문서는 `archive/project-docs/20260605/`에 보존)
- 배포자: 정훈영

---

## 현재 진행 상황

- 현재 단계: 🎉 **ABAP 커리큘럼 Track 1(THEORY-01~21) 137개 Lesson 본문 전부 작성 완료** (Lesson Single Viewer + `docs/abap/lesson-content/`)
- 현재 작업: Track 1 완성 (모든 레슨 네이비 ABAP Editor 서식 통일 및 인라인 스타일 제거 CSS 리팩토링 완료). 다음 목표는 **Track 2(PRACTICAL-* 13섹션 ~70 Lesson)** 신규 작성. 글로서리 348개 용어 완전 패리티(미정의 0건)
- 진행 방식: Lesson 본문은 `docs/abap/lesson-viewer.html?lesson=<ID>`로 조립. 작성 규칙/진행 현황은 [HANDOFF_LESSON_CONTENT](.project-docs/HANDOFF_LESSON_CONTENT.md), AI 인계 허브는 [99_AI_SYNC](.project-docs/99_AI_SYNC.md)
- 참여 AI: Antigravity(Gemini) · Codex · Claude 협업 (동시 작업 충돌 회피 규칙 → [04 P11](.project-docs/04_PITFALLS.md))
- 이전 작업: ABAP 커리큘럼 운영본(`docs/roadmap/abap-curriculum.html`), 사용자별 학습친화 스타일, 전체화면 Lesson 집중 모드, 용어 사전 시스템 통합
- 최종 수정: 2026-06-10 18:30 KST

---

## 주요 링크

- 전체 학습자료 홈: https://jungds.github.io/sapui5/
- 로드맵: https://jungds.github.io/sapui5/pages/roadmap.html
- ABAP 개발: https://jungds.github.io/sapui5/pages/abap.html
- UI5/Fiori 개발: https://jungds.github.io/sapui5/pages/ui5-fiori.html
- SAP 모듈 기초: https://jungds.github.io/sapui5/pages/module-basics.html
- 통합 실습: https://jungds.github.io/sapui5/pages/integrated-practice.html
- Reference/운영: https://jungds.github.io/sapui5/pages/reference.html
- Gateway docs 전환본: https://jungds.github.io/sapui5/docs/abap/gateway-odata-v2-crud.html
- Classic ABAP docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-classic-report-itab-alv.html
- ABAP New Syntax docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-new-syntax.html
- CDS to OData docs 전환본: https://jungds.github.io/sapui5/docs/abap/cds-to-odata.html
- RAP End-to-End docs 전환본: https://jungds.github.io/sapui5/docs/abap/rap-end-to-end.html
- RAP Action docs 전환본: https://jungds.github.io/sapui5/docs/abap/rap-action.html
- ABAP Cloud docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-cloud.html
- SAP 모듈 기초 docs 전환본: https://jungds.github.io/sapui5/docs/module/module-basics-for-developers.html
- Flight Model docs 전환본: https://jungds.github.io/sapui5/docs/practice/flight-model-table-guide.html
- Flight 통합 실습 docs 전환본: https://jungds.github.io/sapui5/docs/practice/flight-integrated-practice.html
- UI5/Fiori docs 전환본: https://jungds.github.io/sapui5/docs/ui5/sapui5-controller-function-intro.html
- 로드맵 docs 전환본: https://jungds.github.io/sapui5/docs/roadmap/developer-learning-roadmap.html
- ABAP 커리큘럼 운영본: https://jungds.github.io/sapui5/docs/roadmap/abap-curriculum.html
- Lesson 단일 뷰어(예시): https://jungds.github.io/sapui5/docs/abap/lesson-viewer.html?lesson=THEORY-01-M01

---

## Stage 7 작업 상태

| 단계 | 작업 | 상태 |
|---|---|---|
| 7-0 | README 운영 기준 정리 | 완료 |
| 7-1 | 최종 로컬 샘플 확정 | 완료 |
| 7-2 | index.html Home Shell | 완료 |
| 7-3 | 공통 CSS/JS Shell 초안 | 완료 |
| 7-4 | Gateway 문서 docs 시범 전환 | 완료 |
| 7-5 | ABAP Landing 전환 | 완료 |
| 7-5a | README / README_ALL 분리 | 완료 |
| 7-5b | Navigation/Data 기준 정비 | 완료 |
| 7-5c | 나머지 Landing 전환 | 완료 |
| 7-6 | 우측 Document Navigation 완성 | 완료 |
| 7-7 | v3 운영 문서 docs 이관 | 진행 중 |
| 7-7a | 로드맵 3개 문서 docs 이관 | 완료 |
| 7-7b | v1/v2 legacy archive 이동 | 완료 |
| 7-7c | ABAP 핵심 3개 문서 docs 운영화 | 완료 |
| 7-7d | ABAP docs Navigation 연결 | 완료 |
| 7-7e | 운영 문서 매핑 데이터 추가 | 완료 |
| 7-7f | Stage 7 Shell 문서목차 인식 보정 | 완료 |
| 7-7g | RAP End-to-End 운영 링크 연결 | 완료 |
| 7-7h | UI5/Fiori 문서 7개 docs 운영화 | 완료 |
| 7-7i | ABAP 잔여 문서 2개 docs 운영화 | 완료 |
| 7-7j | 통합 실습 문서 2개 docs 운영화 | 완료 |
| 7-7k | SAP 모듈 기초 문서 13개 docs 운영화 | 완료 |
| 7-8 | archive/v3 보존 또는 redirect 결정 | 완료 |
| 7-9 | 교재형 본문 보강 | 완료 |
| 7-10 | 전체 링크/UX 검수 | 완료 |
| 7-11 | README 최종 갱신 | 완료 |
| 7-12 | ABAP 커리큘럼 2-Track 샘플 UI 설계 및 검토 | 진행 중 |
| 7-13 | claude 계열 공유 엔진 + 5개 레이아웃 샘플 제작 | 진행 중 |
| 7-14 | ABAP 커리큘럼 운영본 + 사용자별 학습친화 스타일 제공 | 완료 |
| 7-15 | index.html 홈 대시보드 ABAP 커리큘럼 운영본 반영 | 완료 |
| 7-16 | ABAP 커리큘럼 Scroll Spy / 전체화면 Lesson 유지 안정화 | 완료 |
| 7-17 | ABAP 커리큘럼 전체화면 패널 높이 / Track 410px 안정화 | 완료 |
| 7-18 | ABAP 커리큘럼 reader 헤더 / 핵심 키워드 블록 정리 | 완료 |
| 7-19 | Lesson Single Viewer 아키텍처 + Glossary 독립화 | 진행 중 (콘텐츠 1/N) |

---

## 최근 변경

| 구분 | 문서 | 링크 |
|---|---|---|
| 완료 | 🎉 **ABAP Track 1 완성** — THEORY-01~21 **137개 Lesson 본문 전부 작성**(Lesson Single Viewer). 글로서리 348개 용어 완전 패리티(미정의 0건). THEORY-19~21 포함 137개 전체 파일에 네이비 Editor 서식 적용 및 인라인 스타일 분리(CSS 클래스 아키텍처 리팩토링) 완료. 다음은 Track 2(PRACTICAL-*) | https://github.com/JungDS/sapui5/pull/51 |
| 완료 | `.project-docs` 전체 최신화 + 파일별 "최종수정" 일시 마커, 인계 문서 타겟(Track 2) 교정, changelogs 일자 분리(06-10) | 로컬 작업 |
| 완료 | ABAP 커리큘럼 Lesson 양산 1차 (01~18) 및 Editor UI 개편 — THEORY-01~18 (총 116개 파일) 신규 작성 완료. 전체 Lesson 및 예제 코드 블록에 모던한 네이비 헤더(#343e6a) 기반 ABAP Editor 디자인 일괄 적용, Shiki 기반 코드 하이라이팅 및 복사 버튼(Copy) 애니메이션 적용, D2Coding 웹폰트 적용, 글로서리(용어 사전) 패리티 100% 동기화 | 로컬 작업 |
| 완료 | ABAP 커리큘럼 reader 헤더 정리 — 전체화면 본문 상단을 `abc-panel-head` 기반으로 통일, 좌측 Chapter/Lesson/제목·우측 이전/다음/자세히 배치, `핵심 키워드`를 `abc-info-block` 디자인으로 변경, 운영 CSS/JS 캐시 버전(`v=20260605-readerhead1`) 적용 | https://github.com/JungDS/sapui5/pull/47 |
| 완료 | ABAP 커리큘럼 전체화면 레이아웃 안정화 — 일반/전체화면 Track 메뉴 폭 410px 통일, 전체화면 Track/Lesson/본문 높이를 viewport 안으로 제한, 본문 내부 스크롤 전환, 운영 CSS 캐시 버전(`v=20260605-layout6`) 적용 | https://github.com/JungDS/sapui5/pull/47 |
| 완료 | ABAP 커리큘럼 운영본 안정화 — 본문 스크롤 위치에 따라 학습 목차와 Lesson 선택 상태 자동 동기화, 전체화면 전환 시 현재 보고 있던 Lesson 유지, 운영 JS 캐시 버전(`v=20260605-scrollspy1`) 적용 | https://github.com/JungDS/sapui5/pull/47 |
| 완료 | index.html 홈 최신화 — ABAP 커리큘럼 운영본 진입 섹션, 상단 커리큘럼 링크, 최신 문서 수(39개), 로드맵/모듈 통계, 추천 경로, 최근 업데이트(2026-06-05) 반영. `assets/home.css` v1.1 갱신 | https://github.com/JungDS/sapui5/pull/47 |
| 완료 | 용어 사전(Glossary) 시스템 독립화 및 UI 고도화 — `abap_glossary.json` 연동 툴팁 팝업 기능 구축, `common.js` 구형 모달과 충돌하는 `data-term`을 `data-glossary`로 분리하여 문제 해결. 본문 마이크로 애니메이션 복구 및 디자인 보강. **용어 클릭 시 팝업 고정(Pin) 및 복사 기능, 닫기 버튼(X) 추가**. | https://github.com/JungDS/sapui5/pull/48 |
| 완료 | Lesson 단일 뷰어 UI/UX 피드백 반영 — 상단 뱃지 누락(회색 배경 CSS 클래스) 오류 수정, 우측 Navigation 패널의 문서목차(Lesson 목록)와 학습경로(전체 Chapter Stepper UI) 하이브리드 융합, 이전/다음 Pager 버튼 애니메이션 정돈, Hero 섹션 눈썹 텍스트 및 Track 뱃지 색상/간격 개선 완료. | https://github.com/JungDS/sapui5/pull/48 |
| 완료 | Lesson 단일 뷰어(Single Viewer) 아키텍처 개편 — 100개가 넘는 Lesson 페이지를 효율적으로 관리하기 위해 `docs/abap/lesson-viewer.html` 단일 템플릿과 `lesson-content/` 부분 파일로 분리. Inpa Dev 블로그 스타일(콜아웃, 시각화)을 참고하여 `THEORY-01-M01` 재작성. JSON 기반 동적 내비게이션(이전/다음, 목차) 구현 및 `99_AI_SYNC.md` 체계 수립 | https://github.com/JungDS/sapui5/pull/48 |
| 완료 | ABAP 커리큘럼 초심자 모드 및 UI 개선 — 전체화면 우측 헤더/스크롤 안정화, 불필요한 라벨 제거, `전문`/`쉬운 문장`을 `전문가 모드`/`초심자 모드`로 명칭 변경, 초심자 모드에서 문장 동적 개행(마침표/쉼표 기준) 및 여백/폰트/배경 가독성 대폭 향상 | 로컬 작업 |
| 완료 | ABAP 커리큘럼 운영본 제작 — `docs/roadmap/abap-curriculum.html` 신규 작성, 전용 자산(`assets/abap-curriculum.js/css`) 추가, v5.4 JSON(`reference/abap_curriculum_v5_4_20260605_000000.json`) 생성 + 모든 Lesson `learning_friendly.handled_contents.ko` 추가, 전체화면 Chapter/Lesson/본문 3열 구조, `자세히` 버튼 우상단 배치, Shell/roadmap/data 카탈로그 동기화 | 로컬 작업 |
| 진행 중 | ABAP 커리큘럼 v8 sampleA 개선 — 전체화면 토글 공통 셸(`assets/shell.js`) 이관·진입 시 Nav 자동 접힘, Navigation 리디자인(현재 항목 제목 동기화·TOC 트리·학습 경로 탭→상세 페이지), 본문 핵심 내용 정리 + unit별 앵커 링크 + 'Chapter 상세 보기' FAB, Chapter 상세 페이지 시범(`docs/roadmap/abap-curriculum-section-detail.html`, 단일 템플릿 `?section=` 전체 필드), 화면 표기 `THEORY/M##`→`Chapter/Lesson` 통일(JSON id는 키로 유지) | https://github.com/JungDS/sapui5/pull/44 |
| 완료 | ABAP 커리큘럼 claude 계열 샘플 — 단일 공유 엔진(`assets/abap-curriculum-explorer.js/css`) + Studio/Library/Focus/Dashboard/Focus Library 5개 레이아웃. 인라인 JSON+fetch 폴백(file:// 지원), 검색·난이도 필터·용어 팝업·해시 딥링크. 용어 모달 `[object Object]` 표시 버그(`assets/common.js`) 수정 | https://github.com/JungDS/sapui5/pull/43 |
| 진행 중 | ABAP 커리큘럼 2-Track v8 통일 아키텍처(Unification) 기반 전환. 파편화된 JS/CSS를 하나로 통합하고 HTML에서 모드만 전환하도록 리팩토링 기획 중 | https://github.com/JungDS/sapui5/pull/42 |
| 완료 | ABAP 커리큘럼 Sample D (완전체 하이브리드) 제작 및 TDZ 버그 수정, 100% 와이드 화면 최적화 완료 | https://github.com/JungDS/sapui5/pull/42 |
| 진행 중 | ABAP 커리큘럼 2-Track 샘플 페이지 제작 및 비교 검토. 최종 선호안은 `docs/roadmap/abap-curriculum-codex-v7_sampleA-20260602-165628.html`이며, Track 탭, 좌측 THEORY 목록, 선택 THEORY 단일 본문, Navigation 학습 목차, Scroll Spy, 용어 팝업, JSON 데이터 분리 구조를 조합해 검토 중 | https://github.com/JungDS/sapui5/pull/41 |
| 완료 | ERP Metro 문서 헤더 통일·이미지 본문 이동, 용어 팝업 중복/여백 개선, 학습자용 용어 사전 대폭 확장(본문 자동 용어 링크 + 80개 용어 칩 자동 생성, `assets/metro-process.js`) | 로컬 작업 |
| 완료 | Phase 1~4 IT 용어 Dual-Tab 팝업 구현 및 문서 태깅 | 로컬 작업 |
| 완료 | `reference/` 초안 문서 분석 후 archive 이동 프로세스 수립 | 로컬 작업 |
| 완료 | SAP DLL v5.0 개정 및 메타데이터 전역 클렌징 | 로컬 작업 (PR 예정) |
| 완료 | Stage 7 Shell 문서목차 인식 보정 | 로컬 작업 |
| 완료 | RAP End-to-End 운영 링크 연결 | 로컬 작업 |
| 완료 | SAP 모듈 기초 문서 13개 docs 운영화 | 로컬 작업 |
| 완료 | 통합 실습 문서 2개 docs 운영화 | 로컬 작업 |
| 완료 | ABAP 잔여 문서 2개 docs 운영화 | 로컬 작업 |
| 완료 | UI5/Fiori 문서 7개 docs 운영화 | 로컬 작업 |
| 완료 | README / README_ALL 진행 이력 보강 | 로컬 작업 |
| 완료 | Stage 7 운영 문서 매핑 데이터 추가 | https://github.com/JungDS/sapui5/pull/31 |
| 완료 | Stage 7 ABAP docs navigation links 정리 | https://github.com/JungDS/sapui5/pull/30 |
| 완료 | Stage 7 ABAP 핵심 문서 docs 운영화 1차 | https://github.com/JungDS/sapui5/pull/29 |
| 완료 | Archive legacy v1 and v2 folders | https://github.com/JungDS/sapui5/pull/28 |
| 완료 | Stage 7 로드맵 v3 원본 archive 보존 | https://github.com/JungDS/sapui5/pull/27 |
| 완료 | Stage 7 Home inline CSS 분리 | https://github.com/JungDS/sapui5/pull/26 |
| 완료 | Stage 7 로드맵 문서 docs 이관 | https://github.com/JungDS/sapui5/pull/25 |
| 완료 | Stage 7 우측 Document Navigation 완성 | https://github.com/JungDS/sapui5/pull/24 |
| 완료 | Stage 7 Navigation/Data 기준 정비 및 Landing 전환 | https://github.com/JungDS/sapui5/pull/23 |
| 완료 | README / README_ALL 운영 문서 분리 | https://github.com/JungDS/sapui5/pull/22 |
| 완료 | ABAP Landing Stage 7 전환 | https://github.com/JungDS/sapui5/pull/21 |
| 완료 | Gateway docs Stage 7 시범 전환 | https://github.com/JungDS/sapui5/pull/20 |
| 완료 | Stage 7 공통 CSS/JS Shell 초안 | https://github.com/JungDS/sapui5/pull/19 |
| 완료 | index.html Stage 7 Home Shell | https://github.com/JungDS/sapui5/pull/18 |

---

## 운영 원칙 요약

- `README.md`는 짧은 운영 대시보드로 유지한다.
- 상세 기준과 전체 이력은 `.project-docs/` 내의 관련 문서들에 분할하여 기록한다.
- 최신 운영 문서는 점진적으로 `docs/` 경로로 전환한다.
- 수정 전 운영본은 `archive/docs/` 또는 `archive/v3/` 아래에 보관한다.
- legacy `v1/`, `v2/`는 `archive/v1/`, `archive/v2/`로 이동한다.
- archive 파일명은 `<YYYYMMDD>_<hhmmss>_v<version>.html` 형식을 사용한다.
- 배포 문서의 배포자 메타데이터는 v5.0 개정 시점에 전역 제거(클렌징) 완료하였다.
