---
status: done
goal: THEORY-01-M03 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-01-M03.html, reference/abap_glossary.json
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M03 재빌딩

> 📅 **최종수정: 2026-06-17 01:11 KST**

## 배경 (왜)
Chapter 1의 M03은 Domain 위에 업무 의미와 화면 라벨을 얹는 Data Element 기초다. 기존 Lesson은 설명 중심이라 새 DoD의 페이지 내 조작형 실습과 T-code 칩 연결을 보강해야 한다.

## 접근 (어떻게)
1. 커리큘럼과 기존 Lesson/glossary를 확인해 Data Element, Field Label, Semantic Meaning 범위를 확정한다.
2. NotebookLM 질의와 SAP 공식 문서로 Data Element/Domain 경계, 라벨, 도움말, 코드 타입 사용 기준을 재검증한다.
3. v3 관계도, 라벨 비교, SE11 Data Element sandbox, 퀴즈/recap을 조합해 작성한다.
4. 검증 후 `02_PROGRESS.md`와 RESULTS를 갱신하고 commit/push한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../01_AI_SYNC.md).
