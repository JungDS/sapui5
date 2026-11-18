---
status: done
goal: THEORY-01-M05 Transparent Table 기본 생성 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-01-M05.html
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M05 Transparent Table 기본 생성

> 📅 **최종수정: 2026-06-16 01:34 KST**

## 배경 (왜)
Chapter 1의 M05는 한 줄 타입인 Structure에서 실제 데이터 저장소인 Transparent Table로 넘어가는 단계다.
초급자가 Key Field, MANDT, client dependency, Structure와 Table의 차이를 정확히 구분해야 M06 Technical Settings로 이어질 수 있다.

## 접근 (어떻게)
1. NotebookLM과 SAP 공식 문서로 Transparent Table, Key, MANDT, field typing, activation 리스크를 재확인한다.
2. v3 학습수단으로 Structure/Table 비교, Key 설계, MANDT 칸막이, 생성 흐름을 시각화한다.
3. fragment 규칙, 글로서리 정의, 브라우저 콘솔/상호작용 검증을 통과한다.
4. 진행 파일과 결과 파일을 갱신하고 작업 파일만 커밋/푸시한다.

## 완료 정의
- THEORY-01-M05 fragment가 v3 구성요소를 포함하고 인라인 style/script 없이 로드된다.
- `data-glossary` 미정의가 0건이다.
- Lesson viewer에서 콘솔 오류 0건과 주요 접이식 상호작용을 확인한다.
