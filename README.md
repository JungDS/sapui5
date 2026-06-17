# SAP Developer Learning Library

> 📅 **최종수정: 2026-06-15 11:01 KST**

SAP 개발자(ABAP / UI5·Fiori)를 위한 HTML 학습자료 저장소입니다. 빌드 프레임워크 없는 **정적 사이트**(순수 HTML + 공유 CSS/JS), GitHub Pages 배포.

- 사이트: https://jungds.github.io/sapui5/
- 저장소: https://github.com/JungDS/sapui5
- 배포자: 정훈영

## 🎯 현재 목표

**Track 1 (THEORY-01~21) 전면 리빌딩** — 텍스트 위주의 기존 Lesson을 전면 백지화하고, NotebookLM 내용 보강 + `sample/learning-methods-v3`의 고품질 UI 툴킷으로 **처음부터 재창조**합니다. 상세 → [.project-docs/01_AI_SYNC.md](.project-docs/01_AI_SYNC.md).

## 🤖 AI 작업자 / 기여자 진입점

작업 시작 전 **[.project-docs/00_INDEX.md](.project-docs/00_INDEX.md)** 부터 읽으세요. `.project-docs`는 AI가 부팅하는 컨텍스트 시스템입니다.

| 문서 | 역할 |
|---|---|
| [00_INDEX](.project-docs/00_INDEX.md) | 부팅 진입점 · 읽기 순서 |
| [01_AI_SYNC](.project-docs/01_AI_SYNC.md) | 단일 목표 · 완료 정의 · AI 행동 규칙 |
| [02_PROGRESS](.project-docs/02_PROGRESS.md) | 목표 진행 현황 · 작업 claim 보드 |
| [03_ARCHITECTURE](.project-docs/03_ARCHITECTURE.md) | 폴더 역할 · 상대경로 · 셸 SSOT |
| [04_CONVENTIONS](.project-docs/04_CONVENTIONS.md) | 타임스탬프 · 네이밍 · git 정책 · plans 규칙 |
| [05_PITFALLS](.project-docs/05_PITFALLS.md) | 자주 깨지는 함정 |
| [06_LEARNING_METHODS](.project-docs/06_LEARNING_METHODS.md) | v3 학습수단 카탈로그 |
| [07_BROWSER_TESTING](.project-docs/07_BROWSER_TESTING.md) | Playwright 로컬 테스트 우회 |
| [plans/](.project-docs/plans/INDEX.md) | 진행 계획 · 태스크 · 결과 |

> 과거 운영 문서·이력은 git과 [archive/project-docs/](archive/project-docs/)에 보존됩니다.

## 주요 링크
- 학습자료 홈: https://jungds.github.io/sapui5/
- 로드맵: https://jungds.github.io/sapui5/pages/roadmap.html
- ABAP 개발: https://jungds.github.io/sapui5/pages/abap.html
- UI5/Fiori 개발: https://jungds.github.io/sapui5/pages/ui5-fiori.html
- SAP 모듈 기초: https://jungds.github.io/sapui5/pages/module-basics.html
- 통합 실습: https://jungds.github.io/sapui5/pages/integrated-practice.html
- Reference/운영: https://jungds.github.io/sapui5/pages/reference.html
- ABAP 커리큘럼 운영본: https://jungds.github.io/sapui5/docs/roadmap/abap-curriculum.html
- Lesson 단일 뷰어(예시): https://jungds.github.io/sapui5/docs/abap/lesson-viewer.html?lesson=THEORY-01-M01

## 운영 원칙
- `README.md`는 짧은 운영 대시보드. 상세 기준은 `.project-docs/`, 진행 이력은 git + `.project-docs/plans/`.
- 운영 문서는 `docs/` 경로 + page-type 기반 셸을 사용. 내비게이션 SSOT는 `assets/shell.js`의 `DOCS`.
- 수정 전 원본·과거 문서는 `archive/`에 보존(읽기 전용).
- 작업은 브랜치 → PR(한국어) → 리뷰 → 머지. main 직접 수정 금지.
