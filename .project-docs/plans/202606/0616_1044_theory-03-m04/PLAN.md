---
status: done
goal: THEORY-03-M04 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-03-M04.html
branch: docs/project-docs-ai-native-restructure
started: 2026-06-16 10:44 KST
completed: 2026-06-16 10:49 KST
---

# THEORY-03-M04 v3 리빌딩 계획

## 목표
- `SELECTION-SCREEN BEGIN OF BLOCK ... WITH FRAME TITLE ...`이 입력 필드를 시각적으로 묶는 기본 구조임을 설명한다.
- `BEGIN OF BLOCK`과 `END OF BLOCK`의 짝, `WITH FRAME`, `TITLE`의 역할을 코드와 화면 목업으로 연결한다.
- `SELECT-OPTIONS`와 `AT SELECTION-SCREEN`은 이번 Chapter 범위 밖임을 명확히 둔다.

## 범위
- 수정 대상: `docs/abap/lesson-content/THEORY-03-M04.html`
- 필요 시 기존 Selection Screen mockup과 static SAP wrapper를 재사용한다.
- 인라인 `<script>`, `<style>`, `style=` 및 새 JS는 추가하지 않는다.

## 검증
- NotebookLM Lesson별 질의 완료
- SAP 공식 문서로 SELECTION-SCREEN BLOCK 근거 재검증
- formatter 실행 후 raw `<pre>` 제거 확인
- inline script/style/style attribute 없음
- glossary 미정의 0건
- 브라우저에서 콘솔 오류, 가로 overflow, details 동작, 모바일 배치 확인
