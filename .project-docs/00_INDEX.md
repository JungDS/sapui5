# 00. INDEX — AI 부팅 진입점

> 📅 **최종수정: 2026-06-20 02:28 KST**
> 🎯 **목적:** AI가 어떤 문서를 언제 읽을지 결정하는 라우터.
> 📖 **읽을 때:** 새 AI 부팅 경로를 정하거나 문서 위치가 헷갈릴 때.
> ⚡ **TL;DR:** 작업 필수는 `01` → `02`/`04`다. 이 문서는 라우터이고, 나머지는 필요할 때만 연다.

## 부팅 필수

| 순서 | 문서 | 읽는 이유 |
|---|---|---|
| 1 | [01_AI_SYNC.md](01_AI_SYNC.md) | 현재 목표, Lesson DoD, 하드 제약 |
| 2 | [02_PROGRESS.md](02_PROGRESS.md) | 진행률, active claim, 다음 Lesson |
| 3 | [04_CONVENTIONS.md](04_CONVENTIONS.md) | 파일 수정 직전 규칙, git 정책 |

## 필요할 때만 열기

| 문서 | 언제 |
|---|---|
| [03_ARCHITECTURE.md](03_ARCHITECTURE.md) | 위치, 경로, 셸/뷰어 구조가 필요할 때 |
| [05_PITFALLS.md](05_PITFALLS.md) | 막혔거나 깨지기 쉬운 지점을 확인할 때 |
| [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md) | Lesson UI, 실습, 샘플, v4 판단이 필요할 때 |
| [07_BROWSER_TESTING.md](07_BROWSER_TESTING.md) | 화면/인터랙션 검증 절차가 필요할 때 |
| [08_REBUILD_PROMPT.md](08_REBUILD_PROMPT.md) | 사람에게 Chapter 리빌딩 발주 프롬프트가 필요할 때 |
| [.project-plans/](../.project-plans/) | 작업 단위별 계획·결과를 확인할 때 |

## 설계 원칙

- `.project-docs`는 장문 위키가 아니라 AI 작업용 부팅 컨텍스트다.
- 한 사실은 한 문서에만 둔다. 다른 문서는 링크로만 참조한다.
- 완료 이력의 SSOT는 git이고, 현재 진행 상태는 `02_PROGRESS.md`다.
- 대형 프롬프트와 과거 문서는 부팅 경로에서 제외하고 `archive/`에 둔다.
- `.project-plans/`는 전체 스캔하지 않는다. 먼저 `.project-plans/INDEX.md`를 보고 현재 작업 폴더만 연다.
