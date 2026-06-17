---
status: done
goal: THEORY-01-M02 Domain 기본 설계 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-01-M02.html
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M02 Domain 기본 설계

> 📅 **최종수정: 2026-06-16 01:07 KST**

## 배경 (왜)
Chapter 1 목표 범위에서 M01 완료 후 다음 Lesson인 THEORY-01-M02를 진행한다.
기존 Domain 설명을 NotebookLM/SAP 공식 근거와 v3 학습수단 기준으로 재구성해 초급자가 DDIC 설계 판단을 할 수 있게 만든다.

## 접근 (어떻게)
1. NotebookLM과 SAP 공식 문서로 Domain 설계 핵심·주의점을 재확인한다.
2. v3 학습수단을 골라 Domain 속성, 고정값, Data Element와의 경계를 시각적으로 재구성한다.
3. fragment 규칙, 글로서리 정의, 브라우저 콘솔/상호작용 검증을 통과한다.
4. 진행 파일과 결과 파일을 갱신하고 작업 파일만 커밋/푸시한다.

## 완료 정의
- THEORY-01-M02 fragment가 v3 구성요소를 포함하고 인라인 style/script 없이 로드된다.
- `data-glossary` 미정의가 0건이다.
- Lesson viewer에서 콘솔 오류 0건과 주요 접이식 상호작용을 확인한다.
