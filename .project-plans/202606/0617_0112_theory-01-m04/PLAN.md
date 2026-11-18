---
status: done
goal: THEORY-01-M04 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-01-M04.html, reference/abap_glossary.json
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M04 재빌딩

> 📅 **최종수정: 2026-06-17 01:28 KST**

## 배경 (왜)
Chapter 1의 M04는 Domain/Data Element를 실제 행 모양으로 묶는 Structure 기본 생성이다. 기존 Lesson은 설명 중심이라 새 DoD의 조작형 실습과 T-code 칩 연결을 보강해야 한다.

## 접근 (어떻게)
1. 커리큘럼과 기존 Lesson/glossary를 확인해 Structure, Component, Reusable Type 범위를 확정한다.
2. NotebookLM 질의와 SAP 공식 문서로 Structure와 Table Field/프로그램 타입 사용 경계를 재검증한다.
3. v3 관계도, 컴포넌트 그리드, SE11 Structure sandbox, 코드/테이블 preview, recap을 조합한다.
4. 검증 후 `02_PROGRESS.md`와 RESULTS를 갱신하고 commit/push한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../.project-docs/01_AI_SYNC.md).
