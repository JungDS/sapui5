---
status: done
goal: THEORY-01-M03 Data Element 기본 설계 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-01-M03.html
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M03 Data Element 기본 설계

> 📅 **최종수정: 2026-06-16 01:18 KST**

## 배경 (왜)
Chapter 1 목표 범위에서 Domain Lesson 다음 단계인 Data Element를 리빌딩한다.
초급자가 Domain과 Data Element를 “재질과 의미”로 나누고, Field Label/F1 Help/검색 도움 연결을 설계 판단으로 이해하게 만든다.

## 접근 (어떻게)
1. NotebookLM과 SAP 공식 문서로 Data Element의 의미 속성, 필드 라벨, 문서화, 타입 참조 방식을 재확인한다.
2. v3 학습수단으로 Domain→Data Element→Table Field 관계와 라벨 4종을 시각화한다.
3. fragment 규칙, 글로서리 정의, 브라우저 콘솔/상호작용 검증을 통과한다.
4. 진행 파일과 결과 파일을 갱신하고 작업 파일만 커밋/푸시한다.

## 완료 정의
- THEORY-01-M03 fragment가 v3 구성요소를 포함하고 인라인 style/script 없이 로드된다.
- `data-glossary` 미정의가 0건이다.
- Lesson viewer에서 콘솔 오류 0건과 주요 접이식 상호작용을 확인한다.
