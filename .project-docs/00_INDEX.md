# 00. INDEX — 여기서 시작 (AI 부팅 진입점)

> 📅 **최종수정: 2026-06-17 00:42 KST**
> 🎯 **목적:** 이 저장소에 투입된 AI가 가장 먼저 읽고 부팅하는 진입점.
> 📖 **읽을 때:** 항상 맨 처음. 작업 시작 전 1순위.
> ⚡ **TL;DR:**
> - `.project-docs`는 사람용 위키가 아니라 **AI가 부팅하는 컨텍스트 시스템**이다.
> - **한 파일만 읽는다면 → [01_AI_SYNC.md](01_AI_SYNC.md)** (지금 할 일과 하드 제약).
> - 이력·로그·완료된 과거는 여기 없다. 그건 **git + [plans/](plans/)** 가 가진다.

## 🚀 부팅 시퀀스 (번호 순 = 우선순위 순)

1. **[01_AI_SYNC.md](01_AI_SYNC.md)** — 단일 목표 + 완료 정의(DoD) + 행동 체크리스트. **(필수, 최우선)**
2. **[02_PROGRESS.md](02_PROGRESS.md)** — 목표가 어디까지 왔나 + 지금 누가 무엇을 잡고 있나. **작업 시작 전 claim 필수.**
3. **[03_ARCHITECTURE.md](03_ARCHITECTURE.md)** — 폴더 역할·상대경로·셸 SSOT. "어디에 두는가"를 모를 때.
4. **[04_CONVENTIONS.md](04_CONVENTIONS.md)** — 파일을 쓰기/고치기 직전. 타임스탬프·네이밍·git 정책·plans 규칙.
5. **[05_PITFALLS.md](05_PITFALLS.md)** — 깨지기 쉬운 지점. 작업 중 막히면 즉시.
6. **[06_LEARNING_METHODS.md](06_LEARNING_METHODS.md)** — Lesson 콘텐츠를 만들 때. v3 학습수단 고르기.
7. **[07_BROWSER_TESTING.md](07_BROWSER_TESTING.md)** — 브라우저로 화면을 검증해야 할 때.
8. **[08_REBUILD_PROMPT.md](08_REBUILD_PROMPT.md)** — 특정 Chapter 리빌딩을 **발주할 때** 쓰는 범위 지정형 표준 프롬프트(사람이 복붙).

> 작업 계획·진행·결과는 [plans/INDEX.md](plans/INDEX.md) 에서 시작한다. **문서 번호 순이 곧 읽기 우선순위다.**

## 🗺️ 문서 지도

| 문서 | 역할 | 언제 |
|---|---|---|
| [01_AI_SYNC.md](01_AI_SYNC.md) | **단일 목표 · DoD · AI 행동 규칙 · git 정책** | 항상 (최우선) |
| [02_PROGRESS.md](02_PROGRESS.md) | **목표 진행 현황 · 작업 claim 보드** | 작업 시작·종료 시 (필수) |
| [03_ARCHITECTURE.md](03_ARCHITECTURE.md) | 폴더 역할 · 상대경로 · 셸(DOCS) SSOT · Lesson 뷰어 | 구조가 헷갈릴 때 |
| [04_CONVENTIONS.md](04_CONVENTIONS.md) | 타임스탬프 · 메타데이터 · 네이밍 · archive · 이미지 · Lesson 작성 · v3 · plans · git | 파일 쓰기 직전 |
| [05_PITFALLS.md](05_PITFALLS.md) | 자주 깨지는 함정(P1~) | 막혔을 때 |
| [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md) | v3 학습수단 카탈로그 + 샘플 매핑 | Lesson 콘텐츠 설계 시 |
| [07_BROWSER_TESTING.md](07_BROWSER_TESTING.md) | Playwright 로컬 테스트 우회 | 브라우저 검증 막힐 때 |
| [08_REBUILD_PROMPT.md](08_REBUILD_PROMPT.md) | 범위 지정형 Chapter 리빌딩 발주 프롬프트 (사람 복붙) | Chapter 리빌딩을 시킬 때 |
| [plans/](plans/) | 진행 계획 · 태스크 · 결과 (changelogs 대체) | 작업 단위 시작/종료 |

## 📐 이 폴더의 설계 원칙 (왜 이렇게 생겼나)
- **번호 규칙**: 모든 문서는 `NN_TITLE.md` 2자리 숫자 prefix([04 R4](04_CONVENTIONS.md)). **번호 순 = 읽기 우선순위**(00→08).
- **무중복 SSOT**: 한 사실은 한 문서에만. 재진술 금지, 상대링크로 참조.
- **점진적 공개**: 모든 문서 상단 4줄 헤더(목적/읽을 때/TL;DR)만 읽고 관련성 판단.
- **기계 스캔**: 산문보다 표·체크리스트·안정 ID(`R1`,`P3`).
- **토큰 경제**: 전체 문서가 한 번에 통독 가능한 분량. 상세는 링크/archive 뒤로.
- 직전 문서 세트(13개)는 [../archive/project-docs/20260615/](../archive/project-docs/20260615/) 에 읽기 전용 보존(매핑표 포함).
