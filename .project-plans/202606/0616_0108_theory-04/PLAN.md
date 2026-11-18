---
status: done        # planned | active | done | abandoned
goal: THEORY-04(Chapter 4 · DDIC 2차: 관계와 입력 도움말) 6개 Lesson 전면 v3 리빌딩
scope: THEORY-04-M01~M06 (docs/abap/lesson-content/)
branch: docs/project-docs-ai-native-restructure
---

# PLAN — Chapter 4 (THEORY-04) v3 리빌딩

> 📅 **최종수정: 2026-06-16 19:05 KST**
> ▶️ **재개:** NotebookLM 프로필을 잠그던 고아 chrome 프로세스 7개 선별 종료 후 연동 복구. M01부터 진행 중. (참고: Bash date가 시계 skew로 부정확 → 타임스탬프는 PowerShell 기준.)

## 배경 (왜)
Chapter 3(THEORY-03)는 Codex가 진행 예정이므로 범위에서 제외. 단일 목표(Track 1 v3 리빌딩)에 따라 Chapter 4를 다음 목표로 잡는다. 기존 THEORY-04-M01~M06은 이전 라운드 산출물(백지화 대상)이라 NotebookLM 보강 + v3 학습수단으로 처음부터 재작성한다.

## 접근 (어떻게)
1. Lesson 1개씩 순차 진행 (M01 → M06). 한 번에 하나만 집중.
2. 각 Lesson: NotebookLM 질의(세션 유지) → SAP 공식 재검증 → 보강 포인트 확보.
3. 06_LEARNING_METHODS에서 주제별 v3 학습수단 선택 → fragment 리빌딩(인라인 script/style 금지).
4. `data-glossary` 전수 패리티 검증 → 코드블록 `format-abap-code.mjs` 1회 → 브라우저 검증(콘솔 0건).
5. Lesson마다 02_PROGRESS·TASKS·RESULTS 갱신.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../.project-docs/01_AI_SYNC.md).
- 추가 조건: Chapter 4 6개 전부 완료 시 02_PROGRESS 챕터 표 04행 `✅`.
- 화면 표기는 Chapter/Lesson, 내부 ID(THEORY-04-Mxx) 노출 금지.

## Chapter 4 Lesson 맵 (커리큘럼 JSON 기준)
| Lesson | 제목 | 핵심 키워드 |
|---|---|---|
| M01 | Foreign Key와 Check Table | Foreign Key, Check Table, Cardinality |
| M02 | Value Table과 Foreign Key의 차이 | Value Table, Domain, Foreign Key |
| M03 | Elementary Search Help | Search Help, F4 Help, Selection Method |
| M04 | Collective Search Help 기초 | Collective Search Help, Search Help Parameter |
| M05 | PARAMETERS와 DDIC F4 Help 연결 | PARAMETERS, Search Help, Data Element |
| M06 | DDIC 검증과 프로그램 검증의 역할 분리 | DDIC Validation, MESSAGE, Input Check |
