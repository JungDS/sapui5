---
status: done
goal: THEORY-03-M01 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-03-M01.html
branch: docs/project-docs-ai-native-restructure
started: 2026-06-16 10:19 KST
completed: 2026-06-16 10:28 KST
---

# THEORY-03-M01 v3 리빌딩 계획

## 목표
- `PARAMETERS` 기본 선언을 초급자가 "입력 필드 + 프로그램 변수"로 이해하도록 재구성한다.
- `DATA`와 `PARAMETERS`의 차이, 자동 생성 Selection Screen 1000 흐름, 이름 길이 제한을 명확히 보여준다.
- NotebookLM MCP 질의와 SAP 공식 문서 재검증을 근거로 기존 fragment를 v3 스타일로 다시 작성한다.

## 범위
- 수정 대상: `docs/abap/lesson-content/THEORY-03-M01.html`
- 필요 시 공용 스타일만 `assets/abap-lesson-viewer.css`에 추가한다.
- 인라인 `<script>`, `<style>`, `style=` 및 새 JS는 추가하지 않는다.

## 검증
- NotebookLM Lesson별 질의 완료
- SAP 공식 문서와 핵심 개념 대조
- formatter 실행 후 raw `<pre>` 제거 확인
- inline script/style/style attribute 없음
- glossary 미정의 0건
- 브라우저에서 콘솔 오류, 가로 overflow, details 동작 확인
