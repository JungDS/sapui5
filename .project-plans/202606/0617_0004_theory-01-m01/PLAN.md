---
status: done
goal: THEORY-01-M01 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-01-M01.html, reference/abap_glossary.json, 관련 공통 자산(필요 시)
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M01 재빌딩

> 📅 **최종수정: 2026-06-17 00:31 KST**

## 배경 (왜)
2026-06-16 기준선 리셋으로 기존 Chapter 1 완료분은 상향 DoD를 충족하지 못해 진행률에서 제외됐다. 첫 Lesson부터 T-code 노출, 코드 실습 시뮬레이션, NotebookLM 보강, v3 학습수단을 모두 반영해 다시 완료 처리한다.

## 접근 (어떻게)
1. 기존 Lesson, 커리큘럼, 글로서리, v3 샘플을 확인해 범위와 T-code를 확정한다.
2. NotebookLM 질의와 SAP 공식 문서 재검증으로 ABAP Workbench/SE38/SE80 입문 포인트를 보강한다.
3. `sample/learning-methods-v3` 패턴으로 읽기→보기→조작→풀기→정리 흐름을 설계하고, 코드가 나오면 페이지 내 시뮬레이션을 포함한다.
4. 글로서리 `used_in_lessons`와 Lesson fragment를 갱신한 뒤 포맷터와 브라우저 검증을 수행한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../.project-docs/01_AI_SYNC.md).
- 리셋 후 첫 완료 로그로 `02_PROGRESS.md`에 반영한다.
