# 02. PROGRESS — 목표 진행 현황 · 작업 claim 보드

> 📅 **최종수정: 2026-06-17 01:38 KST**
> 🧹 **2026-06-16 기준선 리셋:** DoD 상향(T-code 노출 + 코드 실습 시뮬레이션 필수 → [01_AI_SYNC](01_AI_SYNC.md))으로 모든 진행률을 **0으로 초기화**했다. 구 Chapter 1~4(THEORY-01~04, 22 Lesson)는 새 기준 미충족이라 미착수로 되돌렸다. 이전 완료 이력은 git log로 확인한다.
> 🎯 **목적:** 단일 목표(Track 1 v3 리빌딩)가 어디까지 진행됐는지, 지금 누가 무엇을 잡고 있는지 한눈에. 다음 단계 결정과 충돌 방지의 SSOT.
> 📖 **읽을 때:** 작업 **시작 직전(필수)** 과 종료 시. 목표 → [01_AI_SYNC](01_AI_SYNC.md).
> ⚡ **TL;DR:**
> - **시작 전:** 아래 `🔄 진행 중`에 내 줄을 먼저 추가(Lesson · AI명 · 시작 KST). 그래야 다른 AI가 중복 점유를 피한다.
> - **종료 후:** 그 줄을 `🔄 진행 중`에서 빼고 `✅ 완료 로그`에 옮긴다 + 챕터 표 상태 갱신.
> - 빈 줄을 잡지 말 것: 이미 `🔄 진행 중`에 있는 Lesson은 건드리지 않는다.

## 📌 작동 규칙 (충돌 방지)
1. **claim-before-start**: 어떤 Lesson이든 손대기 전에 `🔄 진행 중`에 행을 추가한다(이게 점유 신호다).
2. **한 Lesson = 한 AI**: `🔄 진행 중`에 이미 있는 Lesson은 다른 AI가 시작하지 않는다.
3. **종료 시 이동**: 완료하면 `🔄`에서 제거 → `✅ 완료 로그`에 1줄 + 챕터 표 갱신.
4. **중단 시**: 미완으로 멈추면 `🔄` 행에 `(중단: 사유)`를 남기거나 제거해 점유를 푼다.
5. 이 파일도 [04 R1](04_CONVENTIONS.md) 타임스탬프 규칙 대상(수정 시 헤더 시각 갱신).

## 📊 챕터 진행 표 (Track 1 / THEORY-01~21)

> 상태: ⬜ 미착수 · 🔄 진행 중 · ✅ 완료. 챕터 제목·Lesson 수는 커리큘럼 JSON(`reference/abap_curriculum_v5_3_20260602_010000.json`) 기준으로 채운다. (행이 고정이라 맨 위에 둔다 — 작업이 쌓여도 내려가지 않게.)

| Chapter | 상태 | 완료/전체 Lesson | 메모 |
|---|---|---|---|
| 01 | 🔄 | 5 / 6 | THEORY-01-M01~M05 상향 DoD 기준 완료 |
| 02 | 🔄 | 2 / 6 | M01~M02 완료. M03~M06 재빌딩 대상 |
| 03 | 🔄 | 1 / 4 | (리셋) 재빌딩 대상 — 상향 DoD 적용 |
| 04 | ⬜ | 0 / 6 | (리셋) 재빌딩 대상 — 상향 DoD 적용 |
| 05 | ⬜ | 0 / — | |
| 06 | ⬜ | 0 / — | |
| 07 | ⬜ | 0 / — | |
| 08 | ⬜ | 0 / — | |
| 09 | ⬜ | 0 / — | |
| 10 | ⬜ | 0 / — | |
| 11 | ⬜ | 0 / — | |
| 12 | ⬜ | 0 / — | |
| 13 | ⬜ | 0 / — | |
| 14 | ⬜ | 0 / — | |
| 15 | ⬜ | 0 / — | |
| 16 | ⬜ | 0 / — | |
| 17 | ⬜ | 0 / — | |
| 18 | ⬜ | 0 / — | |
| 19 | ⬜ | 0 / — | |
| 20 | ⬜ | 0 / — | |
| 21 | ⬜ | 0 / — | |

> 현재 전체: **8 / 137 Lesson 리빌딩 완료** (2026-06-16 기준선 리셋). 이전 라운드 산출물은 상향 DoD 미충족이라 진행률에 포함하지 않는다.

## 🔄 진행 중 (Active Claims)

> 아래로 계속 누적되는 영역. 시작 시 추가, 완료 시 제거.

| Lesson | AI | 시작(KST) | 메모 |
|---|---|---|---|
| THEORY-02-M03 | Claude Opus 4.8 | 2026-06-17 02:00 | Chapter 2 M03 (WRITE 기본 출력) 진행 |

## ✅ 완료 로그 (최신 위)

> **2026-06-16 기준선 리셋으로 비움.** 상향된 DoD(T-code 노출 + 코드 실습 시뮬레이션) 아래에서 완료된 Lesson만 여기 기록한다.
> 리셋 이전 22개 Lesson(THEORY-01~04)의 완료 이력은 **git log**에서 확인한다(`git log -- .project-docs/02_PROGRESS.md`).

| Lesson | AI | 완료(KST) | 비고 |
|---|---|---|---|
| THEORY-01-M05 | Codex | 2026-06-17 01:35 | Transparent Table 기본 생성 v3 리빌딩. NotebookLM 보강, SAP 공식 재검증, SE11 sandbox, 중복 key preview, 콘솔 오류 0 |
| THEORY-01-M04 | Codex | 2026-06-17 01:26 | Structure 설계 v3 리빌딩. NotebookLM 보강, SAP 공식 재검증, SE11 sandbox, Work Area preview, 콘솔 오류 0 |
| THEORY-02-M02 | Claude Opus 4.8 | 2026-06-17 02:00 | DATA/CONSTANTS/TYPES·기본타입 도감 v3 리빌딩. nlm CLI 보강(BC100/S4D401), 변수 선언 sandbox, SE38/SE11 칩, 콘솔 0 |
| THEORY-01-M03 | Codex | 2026-06-17 01:08 | Data Element 설계 v3 리빌딩. NotebookLM 보강, SAP 공식 재검증, SE11 sandbox, 코드 라벨 preview, 콘솔 오류 0 |
| THEORY-02-M01 | Claude Opus 4.8 | 2026-06-17 01:35 | ABAP 기본구조·주석 v3 리빌딩. nlm CLI로 NotebookLM 보강(BC100), SE38 첫프로그램 sandbox(Save→Activate→F8), SE38/SE80/SA38 칩, 콘솔 0 |
| THEORY-01-M02 | Codex | 2026-06-17 00:58 | Domain 설계 v3 리빌딩. NotebookLM 보강, SAP 공식 재검증, SE11 sandbox, T-code 칩, 콘솔 오류 0 |
| THEORY-03-M01 | Antigravity | 2026-06-17 00:52 | PARAMETERS 기본 선언 v3 리빌딩. NotebookLM 보강, SE38 Sandbox, T-code 칩 등록, 콘솔 검증 |
| THEORY-01-M01 | Codex | 2026-06-17 00:28 | 리셋 후 첫 완료. NotebookLM 보강, SE11/SE38 sandbox, T-code 칩, 콘솔 오류 0 |
