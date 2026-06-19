---
status: done
goal: THEORY-01-M06 Technical Settings와 데이터 확인 기초 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-01-M06.html
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M06 Technical Settings와 데이터 확인 기초

> 📅 **최종수정: 2026-06-16 01:43 KST**

## 배경 (왜)
Chapter 1의 마지막 Lesson은 Transparent Table을 활성화 가능한 운영 객체로 마무리하는 단계다.
초급자가 Technical Settings를 “물리 운영 힌트”로 이해하고, Data Browser로 테스트 데이터를 확인하되 운영 직접 수정은 위험하다는 감각을 가져야 Chapter 1이 닫힌다.

## 접근 (어떻게)
1. NotebookLM과 SAP 공식 문서로 Data Class, Size Category, Buffering, Data Browser, 운영 수정 금기 범위를 재확인한다.
2. v3 학습수단으로 Technical Settings 판단표, 버퍼링 적합/부적합 비교, 데이터 확인 흐름을 시각화한다.
3. fragment 규칙, 글로서리 정의, 브라우저 콘솔/상호작용 검증을 통과한다.
4. 진행 파일과 결과 파일을 갱신하고 작업 파일만 커밋/푸시한 뒤 Chapter 1 완료를 감사한다.

## 완료 정의
- THEORY-01-M06 fragment가 v3 구성요소를 포함하고 인라인 style/script 없이 로드된다.
- `data-glossary` 미정의가 0건이다.
- Lesson viewer에서 콘솔 오류 0건과 주요 접이식 상호작용을 확인한다.
- Chapter 1 진행 표가 6/6 완료로 갱신된다.
