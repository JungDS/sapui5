---
status: done
goal: THEORY-01-M05 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-01-M05.html, reference/abap_glossary.json
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M05 재빌딩

> 📅 **최종수정: 2026-06-17 01:38 KST**

## 배경 (왜)
Chapter 1의 M05는 Structure와 달리 실제 DB 저장 대상이 되는 Transparent Table 기본 생성이다. Key Field, Client Field, 필드 타입, 저장 전 점검을 직접 조작하는 실습이 필요하다.

## 접근 (어떻게)
1. 커리큘럼과 기존 Lesson/glossary를 확인해 Transparent Table, Key Field, Client Field 범위를 확정한다.
2. NotebookLM 질의와 SAP 공식 문서로 transparent table 활성화, MANDT/client, key 설계, technical settings 연결을 재검증한다.
3. v3 비교표, 키 설계 맵, SE11 Transparent Table sandbox, 오류 체크, recap을 조합한다.
4. 검증 후 `02_PROGRESS.md`와 RESULTS를 갱신하고 commit/push한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../01_AI_SYNC.md).
