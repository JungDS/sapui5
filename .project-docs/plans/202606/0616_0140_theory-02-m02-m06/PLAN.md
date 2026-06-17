---
status: done
goal: THEORY-02-M02~M06을 v3 기반 고품질 Lesson으로 리빌딩 (Chapter 2 완성)
scope: docs/abap/lesson-content/THEORY-02-M02..M06.html, reference/abap_glossary.json, 검증 문서
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-02-M02~M06 리빌딩 (Chapter 2 나머지)

> 📅 **최종수정: 2026-06-16 01:40 KST**

## 배경 (왜)
Chapter 2(ABAP 기본 문법과 WRITE 출력)의 M01에 이어 나머지 5개 Lesson을 Chapter 1 신규 표준으로 일괄 리빌딩한다. M01과 같은 워크플로·디자인 토큰을 적용해 챕터 일관성을 확보한다.

## 대상 Lesson
- M02: DATA / CONSTANTS / TYPES 선언
- M03: WRITE 기본 출력
- M04: IF / CASE 조건 분기
- M05: DO / WHILE 반복 처리
- M06: 문자열·날짜·시스템 필드 기초 (Chapter 2 마무리)

## 접근 (어떻게)
1. 커리큘럼 JSON 상세(handled_contents/hands_on_lab/caution_points/assessment_design) + SAP 공식 문서 근거. **NotebookLM 미인증(authenticated=false)으로 질의 보류.**
2. v3 학습수단: 코드 목업, 상태 그리드(3분류), 관계도, 치트시트 표, 정상/오류 탭·비교, 접이식, 미니 실습, 퀴즈, recap.
3. fragment 제약(인라인 script/style 금지), 코드는 plain `<pre><code>` → `tools/format-abap-code.mjs`.
4. 신규 글로서리 용어는 `reference/abap_glossary.json`에 R11 스키마로 추가(멱등 스크립트). 패리티 미정의 0건.
5. lesson-viewer에서 5개 모두 콘솔 오류 0건 + 탭/접이식 동작 확인.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../../01_AI_SYNC.md). NotebookLM 항목만 미인증으로 보류(보고).
