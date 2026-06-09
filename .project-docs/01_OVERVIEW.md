# 01. 프로젝트 개요

> 📅 **최종수정: 2026-06-10 00:50 KST**

## 정체성
- **SAP Developer Learning Library** — SAP 개발자(ABAP / UI5·Fiori)용 HTML 학습자료 저장소.
- **정적 사이트**: 빌드 프레임워크 없이 순수 HTML + 공유 CSS/JS. GitHub Pages 배포.
- 저장소: https://github.com/JungDS/sapui5 · 배포: https://jungds.github.io/sapui5/
- 언어: 한국어. 기준 환경: S/4HANA + SAP GUI 800.

## 기술 스택
- 페이지: 정적 `.html` (home / landing / doc 3종 page type)
- 공통 셸: `assets/common.css·js`(Stage 5 기반 유틸) + `assets/shell.css·js`(셸 + 문서 SSOT)
- 데이터: `data/*.json`(내비 카탈로그·이력), `reference/*.json`(커리큘럼 원천 데이터, 런타임 fetch)
- 도구: `tools/*.mjs` (Node 생성 스크립트)

## 현재 단계 (2026-06-09 18:11)
- **Stage 7 셸 리팩토링은 완료.** 모든 운영 문서가 `docs/` 경로 + page-type 기반 셸을 사용.
- **현재 미결 과제 2개:**
  1. **ABAP 커리큘럼 진행 중** — 01~18번 커리큘럼 신규 작성 완료 및 단일 네이비(Navy) ABAP Editor UI 서식/복사 애니메이션 확정 적용 완료. (→ [06](06_ABAP_CURRICULUM.md))
  2. **폴더/자산 정리** — asset 파일명 간결화, 미사용 정리, 문서 구조 정돈. (→ [07](07_DECISIONS_AND_ROADMAP.md))

## 문서 규모
- 내비게이션 SSOT(`assets/shell.js` `DOCS`)에는 운영본 + `preparing: true` 골격 문서가 함께 등재.
  운영(실제 콘텐츠) 문서 + 다수의 "준비 중" 골격으로 구성된 확장형 커리큘럼 구조다.
- 정확한 운영 문서 수는 `DOCS`에서 `preparing`이 없는 항목 기준으로 산정한다(홈 화면의 고정 수치는 참고용).

## 미결 기술부채 (요약, 상세는 04)
- 문서 목록 다중 관리: `shell.js` `DOCS` ↔ `data/*.json` 수동 동기화
- `pages/abap.html` 인라인 CSS/JS, `index.html` 인라인 스크립트
- "stage7" 명칭 정리: 파일명(`shell.css/js`)·JS 전역(`SAPShell`)은 완료, **CSS 클래스 `.stage7-*`만 잔존**(다음 라운드)
- pages ↔ docs 이원화에 대한 구조적 고민(미결)

## 운영 원칙
- 루트는 `index.html`·`README.md` 중심으로 최소 관리. 분석·기준은 `.project-docs/`에 최신본 유지.
- 수정 전 원본은 `archive/`에 보존(파일명에 수정일시·버전). archive는 읽기 전용.
- 작업은 브랜치 → PR(한국어) → 리뷰 → 머지.
