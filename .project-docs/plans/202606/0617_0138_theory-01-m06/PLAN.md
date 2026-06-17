---
status: done
goal: THEORY-01-M06 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-01-M06.html, reference/abap_glossary.json
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M06 재빌딩

> 📅 **최종수정: 2026-06-17 01:50 KST**

## 배경 (왜)
Chapter 1의 마지막 M06은 Transparent Table 생성 뒤 Technical Settings와 Data Browser로 실제 데이터 확인 흐름을 닫는 Lesson이다. 새 DoD 기준으로 SE11/SE16N 흐름을 직접 조작하는 sandbox와 T-code 칩 연결이 필요하다.

## 접근 (어떻게)
1. 커리큘럼과 기존 Lesson/glossary를 확인해 Technical Settings, Data Browser, Test Data 범위를 확정한다.
2. NotebookLM 질의와 SAP 공식 문서로 data class, size category, buffering, test data 조회/중복 key를 재검증한다.
3. v3 운영 설정 판단표, SE11/SE16N sandbox, 예상 로그 비교, recap을 조합한다.
4. 검증 후 `02_PROGRESS.md`와 RESULTS를 갱신하고 Chapter 1 완료 상태로 commit/push한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../01_AI_SYNC.md).
