---
status: done
goal: THEORY-01-M02 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-01-M02.html, reference/abap_glossary.json
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M02 재빌딩

> 📅 **최종수정: 2026-06-17 00:59 KST**

## 배경 (왜)
Chapter 1은 새 DoD 기준으로 M01만 완료됐다. M02는 Domain, Data Type, Length, Fixed Value를 초심자가 SE11 흐름과 함께 직접 조작할 수 있도록 다시 구성한다.

## 접근 (어떻게)
1. 커리큘럼과 기존 Lesson/glossary를 확인해 학습 범위와 T-code를 확정한다.
2. NotebookLM 질의와 SAP 공식 문서 재검증으로 Domain 설계 기준과 오류 포인트를 보강한다.
3. v3 상태 그리드, 관계도, sandbox, foldable, recap을 조합해 읽기→보기→조작→정리 흐름으로 작성한다.
4. 검증 후 `02_PROGRESS.md`와 RESULTS를 갱신하고 commit/push한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../01_AI_SYNC.md).
