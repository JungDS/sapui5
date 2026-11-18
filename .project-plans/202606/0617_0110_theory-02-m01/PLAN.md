---
status: active
goal: THEORY-02-M01 "ABAP Program 기본 구조와 주석" 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-02-M01.html + reference/abap_glossary.json(T-code used_in_lessons)
branch: docs/project-docs-ai-native-restructure
---

# THEORY-02-M01 재빌딩 계획

> 📅 **최종수정: 2026-06-17 01:08 KST**

Chapter 2(ABAP 기본 문법과 WRITE 출력) 첫 Lesson. 구 02-M01이 SE38/SE80 진입·
첫 프로그램 작성 설명과 실습이 부족했던 ⚠️ 보강 과제를 1급으로 반영한다.

## 핵심 보강 포인트
- REPORT 문 = 실행 가능 프로그램의 첫 줄, 프로그램 타입/네임스페이스(Z/Y).
- 주석 2종: `*`(전체 줄) vs `"`(인라인) 규칙.
- SE38/SE80 진입 → Create 다이얼로그(제목·타입) → 에디터 → Save → Check → Activate → Execute(F8).
- Save vs Activation(Inactive vs Active 버전) 차이.
- 초심자 흔한 오류(네임스페이스, 미활성화, 구문오류).

## v3 학습수단 (코드=실습 시뮬레이션 필수)
- interactive-sap-sandbox (config 기반): SE38 첫 프로그램 생성→Check→Activate→Execute 시뮬레이션.
- event-tabs (event-tab-buttons): SE38 vs SE80 vs SA38 진입 경로 비교.
- abap-editor-mockup: REPORT + 주석 예제 코드.
- viz-flow / viz-compare / recap-grid / 확인 퀴즈.

## T-code
- SE38(복습, +M01), SE80(복습, +M01), SA38(신규, +M01).
