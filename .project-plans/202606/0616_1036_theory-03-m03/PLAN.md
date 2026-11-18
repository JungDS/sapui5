---
status: done
goal: THEORY-03-M03 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-03-M03.html
branch: docs/project-docs-ai-native-restructure
started: 2026-06-16 10:36 KST
completed: 2026-06-16 10:43 KST
---

# THEORY-03-M03 v3 리빌딩 계획

## 목표
- Selection Screen 입력값이 같은 이름의 프로그램 변수에 들어가고 `WRITE`로 List Output에 표시되는 흐름을 설명한다.
- 화면 → 메모리 → 출력 순서를 process-flow와 코드/결과 비교로 구성한다.
- NotebookLM MCP 질의와 SAP 공식 문서 재검증을 반영해 기존 fragment를 v3 스타일로 다시 작성한다.

## 범위
- 수정 대상: `docs/abap/lesson-content/THEORY-03-M03.html`
- 기존 Selection Screen mockup과 v3 flow/compare/card 스타일을 재사용한다.
- 인라인 `<script>`, `<style>`, `style=` 및 새 JS는 추가하지 않는다.

## 검증
- NotebookLM Lesson별 질의 완료
- SAP 공식 문서로 PARAMETERS, Selection Screen, WRITE 근거 재검증
- formatter 실행 후 raw `<pre>` 제거 확인
- inline script/style/style attribute 없음
- glossary 미정의 0건
- 브라우저에서 콘솔 오류, 가로 overflow, details 동작, 모바일 배치 확인
