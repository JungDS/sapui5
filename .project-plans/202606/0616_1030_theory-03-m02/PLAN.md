---
status: done
goal: THEORY-03-M02 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-03-M02.html
branch: docs/project-docs-ai-native-restructure
started: 2026-06-16 10:30 KST
completed: 2026-06-16 10:35 KST
---

# THEORY-03-M02 v3 리빌딩 계획

## 목표
- `DEFAULT`와 `OBLIGATORY`의 역할 차이를 Selection Screen 전후 흐름으로 설명한다.
- `DEFAULT`는 초기 표시값, `OBLIGATORY`는 빈 값 실행 방지라는 기준을 초급자가 구분하게 한다.
- NotebookLM MCP 질의와 SAP 공식 문서 재검증을 반영해 기존 fragment를 v3 스타일로 다시 작성한다.

## 범위
- 수정 대상: `docs/abap/lesson-content/THEORY-03-M02.html`
- 필요 시 이미 추가한 공용 Selection Screen/inline code 스타일을 재사용한다.
- 인라인 `<script>`, `<style>`, `style=` 및 새 JS는 추가하지 않는다.

## 검증
- NotebookLM Lesson별 질의 완료
- SAP 공식 문서와 `DEFAULT`/`OBLIGATORY` 의미 대조
- formatter 실행 후 raw `<pre>` 제거 확인
- inline script/style/style attribute 없음
- glossary 미정의 0건
- 브라우저에서 콘솔 오류, 가로 overflow, details 동작, 모바일 배치 확인
