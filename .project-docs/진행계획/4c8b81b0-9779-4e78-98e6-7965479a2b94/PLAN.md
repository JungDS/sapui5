# 학습 수단 샘플 제작 계획

## Summary
- 진행계획 위치: `.project-docs/진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/`
- 산출물 위치: `sample/learning-methods/`
- 목표: `.project-docs/10_LEARNING_CONTENT_METHODS.md`의 학습 수단을 실제 standalone HTML 샘플로 제공한다.
- 범위: 중복 수단을 병합한 38개 대표 페이지, 각 페이지 ABAP 예시 초안 3개.

## Implementation Shape
- `sample/learning-methods/README.md`: 수단 목록과 링크.
- `sample/learning-methods/index.html`: 브라우저용 샘플 인덱스.
- `sample/learning-methods/assets/method-samples.css`: 공통 레이아웃과 시각화 스타일.
- `sample/learning-methods/assets/method-samples.js`: 탭, 퀴즈, sandbox, debugger, drag/drop 등 공통 동작.
- 카테고리 폴더: `foundations`, `visuals`, `code-learning`, `interactive`, `quizzes`, `capstone`.

## Representative Method Set
- Foundations: 콜아웃, 스토리텔링, 미니 실습+완료 조건, 공식 링크, 한눈에 정리, 접이식 해설, 치트시트 매트릭스.
- Visuals: 탭형 다이어그램, Mermaid, 코드/다이어그램 비교, 상태 그리드, 관계도, 프로세스 플로우, 전후 비교, 배지, 현재 행 강조, SVG 아키텍처, 화면 갤러리, 샘플 데이터 테이블.
- Code Learning: ABAP Editor Mockup, 코드 키워드 아코디언, Bad/Good Hover Mapping, 빈칸 코드, 코드 라인 매칭, 오류 찾기.
- Interactive: Sandbox, Step Debugger Timeline, 의사결정 트리, 실무 체크리스트, Breakpoint 체크리스트, 예상 로그 비교.
- Quizzes: 드래그 퀴즈, 카드 분류, 순서 배열, 단답형, 플래시카드, 미니 시험.
- Capstone: 미니 프로젝트 미션.

## Verification
- 카테고리 하위 HTML 샘플 페이지 38개 확인.
- 각 HTML 샘플에 `method-example` 3개 확인.
- README 링크가 실제 파일을 가리키는지 확인.
- 대표 상호작용 컴포넌트의 필수 data attribute 확인.

## Commit & Push
- stage는 이번 목표 관련 파일로 제한한다.
- 포함 문서에는 `.project-docs/08_DEV_DIARY.md`와 2026-06-15 changelog 갱신도 포함한다.
- 제외: `.project-docs/virtual_browser_test_guide.md`, `sample/abap-event-diagram-sample.html`.
- commit message: `docs: add learning method sample library`.
- push target: `origin codex/track1-quality-plan`.
