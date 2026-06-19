---
status: done
goal: THEORY-01-M01 "SAP Dictionary의 목적과 개발 흐름" 리셋 이후 DoD 재검토·보강
scope: docs/abap/lesson-content/THEORY-01-M01.html + docs/abap/lesson-viewer.html + reference/abap_glossary.json + 검증 문서
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M01

> 📅 **최종수정: 2026-06-19 09:17 KST**

## 배경
2026-06-17 04:00 기준선 리셋 이후 Track 1 진행률이 0으로 초기화되었다. 첫 Lesson인 THEORY-01-M01을 현재 DoD 기준으로 다시 검토하고, NotebookLM 보강·SAP 공식 재검증·v3 실습·T-code 연결을 재확인한다.

## 접근
1. 커리큘럼 JSON에서 Lesson 목표와 키워드를 확정한다.
2. NotebookLM 질의와 SAP 공식 문서 재검증으로 보강 포인트를 정리한다.
3. 기존 Lesson 산출물을 새 기준으로 재검토하고, 부족한 v3 실습/안내/검증 요소를 보강한다.
4. 글로서리 패리티와 T-code used_in_lessons를 확인한다.
5. 로컬 브라우저 검증 후 02_PROGRESS와 RESULTS를 갱신한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../.project-docs/01_AI_SYNC.md).
- 내부 ID는 사용자 화면에 추가 노출하지 않는다.
- 코드/설정 흐름이 등장하면 페이지 내 조작형 시뮬레이션으로 연결한다.
