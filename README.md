# SAP Developer Learning Library

SAP 개발자를 위한 HTML 학습자료 저장소입니다.

- GitHub Pages: https://jungds.github.io/sapui5/
- 운영 관리 문서:
  - [아키텍처 및 저장소 구조](.project-docs/06_STAGE7_ARCHITECTURE.md)
  - [메타데이터 및 Archive 규칙](.project-docs/07_METADATA_AND_ARCHIVE.md)
  - [작업 이력 및 PR 규칙](.project-docs/08_HISTORY_AND_PR.md)
  - [운영 대시보드 및 지침](.project-docs/09_OPERATIONS_DASHBOARD.md)
- 배포자: 정훈영

---

## 현재 진행 상황

- 현재 단계: Stage 7 · 완료 이후 ABAP 커리큘럼 UI 샘플 검토
- 현재 작업: 신규 ABAP 커리큘럼 2-Track 화면 샘플 제작, 좌측 THEORY 선택형 본문, Navigation 학습 목차, Scroll Spy, 용어 팝업, JSON 데이터 분리 구조 검토
- 추가 작업(claude 계열): 단일 공유 엔진(`assets/abap-curriculum-explorer.js/css`) 위에 Studio / Library / Focus / Dashboard / Focus Library 5개 레이아웃 스킨을 얹은 샘플 세트. 인라인 JSON + fetch 폴백으로 file:// 직접 열람 지원, 검색·난이도 필터·용어 팝업·해시 딥링크 통합
- 최종 수정: 2026-06-02 18:55 KST

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

---

## 최근 변경

| 구분 | 문서 | 링크 |
|---|---|---|
| 완료 | ABAP 커리큘럼 claude 계열 샘플 — 단일 공유 엔진(`assets/abap-curriculum-explorer.js/css`) + Studio/Library/Focus/Dashboard/Focus Library 5개 레이아웃. 인라인 JSON+fetch 폴백(file:// 지원), 검색·난이도 필터·용어 팝업·해시 딥링크. 용어 모달 `[object Object]` 표시 버그(`assets/common.js`) 수정 | 로컬 작업 (PR) |
| 진행 중 | ABAP 커리큘럼 2-Track v8 통일 아키텍처(Unification) 기반 전환. 파편화된 JS/CSS를 하나로 통합하고 HTML에서 모드만 전환하도록 리팩토링 기획 중 | 로컬 작업 |
| 완료 | ABAP 커리큘럼 Sample D (완전체 하이브리드) 제작 및 TDZ 버그 수정, 100% 와이드 화면 최적화 완료 | 로컬 작업 |
| 진행 중 | ABAP 커리큘럼 2-Track 샘플 페이지 제작 및 비교 검토. 최종 선호안은 `docs/roadmap/abap-curriculum-codex-v7_sampleA-20260602-165628.html`이며, Track 탭, 좌측 THEORY 목록, 선택 THEORY 단일 본문, Navigation 학습 목차, Scroll Spy, 용어 팝업, JSON 데이터 분리 구조를 조합해 검토 중 | 로컬 작업 |
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
