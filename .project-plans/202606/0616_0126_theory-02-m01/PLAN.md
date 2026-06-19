---
status: done
goal: THEORY-02-M01을 v3 기반 고품질 Lesson으로 리빌딩
scope: docs/abap/lesson-content/THEORY-02-M01.html, 관련 glossary/공통 자산/검증 문서
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-02-M01 리빌딩 (ABAP Program 기본 구조와 주석)

> 📅 **최종수정: 2026-06-16 01:26 KST**

## 배경 (왜)
Chapter 2(ABAP 기본 문법과 WRITE 출력)의 첫 Lesson. Chapter 1에서 DDIC로 "데이터의 모양"을 만들었다면, 이제 실행 가능한 가장 작은 ABAP 프로그램(REPORT)과 주석, 저장→활성화→실행 흐름을 초심자가 시각적으로 잡는다. 이전 라운드 산출물은 백지화 대상이므로 Chapter 1 신규 표준(viz 컴포넌트·탭·비교·플로우·퀴즈)에 맞춰 다시 짠다.

## 접근 (어떻게)
1. 커리큘럼 JSON 상세(handled_contents/hands_on_lab/caution_points/assessment_design)와 SAP 공식 문서로 보강 포인트 확정. **NotebookLM은 미인증(authenticated=false)이라 질의 불가 — 대체 근거 사용.**
2. v3 학습수단: 코드 목업(ABAP Editor) + 프로세스 플로우(저장/활성화/실행) + 전후 비교(정상/오류) + 탭(REPORT 위치) + 접이식 + 미니 실습 + 확인 퀴즈 + 한눈에 정리.
3. fragment 제약: 인라인 style/script 금지. 코드는 plain `<pre><code>` 작성 후 `tools/format-abap-code.mjs` 1회.
4. `data-glossary` ↔ `reference/abap_glossary.json` 패리티 검증(미정의 0건).
5. 로컬 lesson-viewer에서 콘솔 오류 0건 + 인터랙션 확인, 결과 기록.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../../.project-docs/01_AI_SYNC.md). NotebookLM 항목은 미인증으로 보류(보고).
