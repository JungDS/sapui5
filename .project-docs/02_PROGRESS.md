# 02. PROGRESS — 목표 진행 현황 · 작업 claim 보드

> 📅 **최종수정: 2026-06-20 00:04 KST**
> 🧹 **2026-06-17 04:00 2차 기준선 리셋:** NotebookLM 답변 품질 대폭 향상에 따라 이미 작업된 Lesson들도 전부 다시 리빌딩 대상으로 삼기 위해 **모든 진행률을 0으로 초기화**했다. 이전 완료 이력은 git log로 확인한다.
> 🎯 **목적:** 단일 목표(Track 1 Academy 샘플 우선 리빌딩)가 어디까지 진행됐는지, 지금 누가 무엇을 잡고 있는지 한눈에. 다음 단계 결정과 충돌 방지의 SSOT.
> 📖 **읽을 때:** 작업 **시작 직전(필수)** 과 종료 시. 목표 → [01_AI_SYNC](01_AI_SYNC.md).
> ⚡ **TL;DR:**
> - **Lesson 시작 전:** 아래 `🔄 진행 중`에 내 줄을 먼저 추가(Lesson · AI명 · 시작 KST). 그래야 다른 AI가 중복 점유를 피한다.
> - 공통 자산·문서·샘플/v4 작업은 같은 파일 충돌 가능성이 있을 때만 scope claim을 남긴다.
> - **종료 후:** 그 줄을 `🔄 진행 중`에서 빼고 `✅ 완료 로그`에 옮긴다 + 챕터 표 상태 갱신.
> - 빈 줄을 잡지 말 것: 이미 `🔄 진행 중`에 있는 Lesson은 건드리지 않는다.

## 📌 작동 규칙 (충돌 방지)
1. **claim-before-start**: Lesson 본문을 손대기 전에 `🔄 진행 중`에 행을 추가한다(이게 점유 신호다).
2. **한 Lesson = 한 AI**: `🔄 진행 중`에 이미 있는 Lesson은 다른 AI가 시작하지 않는다.
3. **종료 시 이동**: 완료하면 `🔄`에서 제거 → `✅ 완료 로그`에 1줄 + 챕터 표 갱신.
4. **중단 시**: 미완으로 멈추면 `🔄` 행에 `(중단: 사유)`를 남기거나 제거해 점유를 푼다.
5. 공통 자산·문서·샘플/v4 작업은 여러 AI가 같은 파일을 만질 가능성이 있을 때만 `Lesson` 칸에 `COMMON:<scope>` 형식으로 임시 claim을 남긴다.
6. 이 파일도 [04 R1](04_CONVENTIONS.md) 타임스탬프 규칙 대상(수정 시 헤더 시각 갱신).

## 📊 챕터 진행 표 (Track 1 / THEORY-01~21)

> 상태: ⬜ 미착수 · 🔄 진행 중 · ✅ 완료. 챕터 제목·Lesson 수는 커리큘럼 JSON(`reference/abap_curriculum_v5_4_20260605_000000.json`) 기준으로 채운다. (행이 고정이라 맨 위에 둔다 — 작업이 쌓여도 내려가지 않게.)

| Chapter | 상태 | 완료/전체 Lesson | 메모 |
|---|---|---|---|
| 01 | ✅ | 6 / 6 | THEORY-01-M06 완료. Chapter 01 완료 |
| 02 | ✅ | 6 / 6 | THEORY-02-M06 완료. Chapter 02 완료 |
| 03 | ✅ | 4 / 4 | THEORY-03-M04 완료. Chapter 03 완료 |
| 04 | 🔄 | 1 / 6 | THEORY-04-M01 완료. 다음: THEORY-04-M02 |
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

> 현재 전체: **17 / 137 Lesson 리빌딩 완료** (2026-06-17 2차 기준선 리셋). 이전 라운드 산출물은 진행률에 포함하지 않는다.

## 🔄 진행 중 (Active Claims)

> Lesson 작업은 필수, 공통/문서/샘플 작업은 충돌 가능성이 있을 때만 추가한다. 시작 시 추가, 완료 시 제거.

| Lesson | AI | 시작(KST) | 메모 |
|---|---|---|---|

## ✅ 완료 로그 (최신 위)

> **2026-06-17 04:00 2차 기준선 리셋으로 비움.**
> 리셋 이전의 완료 이력은 **git log**에서 확인한다(`git log -- .project-docs/02_PROGRESS.md`).

| Lesson | AI | 완료(KST) | 비고 |
|---|---|---|---|
| THEORY-04-M01 | Codex GPT-5 | 2026-06-19 15:38 KST | NotebookLM/SAP 공식 재검증, SE11 Foreign Key/Check Table sandbox 보강, 글로서리/정적/브라우저 DOM 및 sandbox-config 케이스 검증 완료 |
| THEORY-03-M04 | Codex GPT-5 | 2026-06-19 15:20 KST | NotebookLM/SAP 공식 재검증, Selection Screen Block builder sandbox 및 SE38 Text Symbol 흐름 보강, 글로서리/브라우저 검증 완료 |
| THEORY-03-M03 | Codex GPT-5 | 2026-06-19 15:14 KST | NotebookLM/SAP 공식 재검증, PARAMETERS 입력→WRITE Output List sandbox 및 SE38 흐름 보강, 글로서리/브라우저 검증 완료 |
| THEORY-03-M02 | Codex GPT-5 | 2026-06-19 15:07 KST | NotebookLM/SAP 공식 재검증, DEFAULT/OBLIGATORY sandbox 및 SE38 Selection Texts 보강, 글로서리/브라우저 검증 완료 |
| THEORY-03-M01 | Codex GPT-5 | 2026-06-19 14:53 KST | NotebookLM/SAP 공식 재검증, pilot fragment v3 구조 전환, PARAMETERS/Selection Screen sandbox 및 브라우저 검증 완료 |
| THEORY-02-M06 | Codex GPT-5 | 2026-06-19 12:56 KST | NotebookLM/SAP 공식 재검증, String/SY-SUBRC sandbox 추가, SE38 글로서리 연결 및 브라우저 검증 완료 |
| THEORY-02-M05 | Codex GPT-5 | 2026-06-19 12:50 KST | NotebookLM/SAP 공식 재검증, EXIT vs RETURN 보강, debugger 상호작용/글로서리/브라우저 검증 완료 |
| THEORY-02-M04 | Codex GPT-5 | 2026-06-19 12:43 KST | NotebookLM/SAP 공식 재검증, IF/CASE 분기 추적 sandbox 추가, SE38 글로서리 연결 및 브라우저 검증 완료 |
| THEORY-02-M03 | Codex GPT-5 | 2026-06-19 12:36 KST | NotebookLM/SAP 공식 재검증, WRITE 출력 모드 sandbox 보강, 글로서리 패리티 및 브라우저 검증 완료 |
| THEORY-02-M02 | Codex GPT-5 | 2026-06-19 12:30 KST | NotebookLM/SAP 공식 재검증, DATA/TYPES/CONSTANTS 선언 sandbox variant 보강, 글로서리 패리티 및 브라우저 검증 완료 |
| THEORY-02-M01 | Codex GPT-5 | 2026-06-19 12:15 KST | NotebookLM 재질의·SAP 공식 재검증·SE38/SE80/SA38 T-code 칩·REPORT/comment sandbox 검증 완료 |
| THEORY-01-M06 | Codex GPT-5 | 2026-06-19 12:07 KST | NotebookLM 재질의·SAP 공식 재검증·SE11/SE16N T-code 칩·Technical Settings/Data Browser sandbox 검증 완료 |
| THEORY-01-M05 | Codex GPT-5 | 2026-06-19 12:02 KST | NotebookLM 재질의·SAP 공식 재검증·SE11 T-code 칩·Transparent Table tab/popover/Mermaid 검증 완료 |
| THEORY-01-M04 | Codex GPT-5 | 2026-06-19 11:58 KST | NotebookLM 재질의·SAP 공식 재검증·SE11 T-code 칩·Structure sandbox Component Type/Format 검증 완료 |
| THEORY-01-M03 | Codex GPT-5 | 2026-06-19 11:54 KST | NotebookLM 재질의·SAP 공식 재검증·SE11 T-code 칩·Data Element sandbox TYPE/Label 검증 완료 |
| THEORY-01-M02 | Codex GPT-5 | 2026-06-19 11:47 KST | NotebookLM 재질의·SAP 공식 재검증·SE11 T-code 칩·Domain sandbox NUMC Type/Value 검증 완료 |
| THEORY-01-M01 | Codex GPT-5 | 2026-06-19 09:14 | NotebookLM 재질의·SAP 공식 재검증·T-code 칩/샌드박스/모바일 검증 완료 |
