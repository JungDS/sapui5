# 학습 수단 샘플 제작 태스크

| ID | 상태 | 작업 |
|---|---|---|
| T01 | done | `.project-docs/진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/` 생성 |
| T02 | done | `PLAN.md`, `TASKS.md`, `RUN_LOG.md` 작성 |
| T03 | done | `99_AI_SYNC.md`에 진행계획 폴더 링크 추가 |
| T04 | done | `sample/learning-methods/` 구조 생성 |
| T05 | done | 공통 CSS/JS 작성 |
| T06 | done | 38개 standalone HTML 샘플 페이지 구현 |
| T07 | done | README 링크, HTML 구조, 상호작용 동작 검증 |
| T08 | done | `TASKS.md`와 `RUN_LOG.md` 최종 상태 반영 |
| T09 | done | Commit & Push 수행 |

## v2 전면 재작성 (2026-06-15)
> v1은 페이지마다 거의 동일한 ABAP 코드 카드 3개를 반복해 품질이 낮고 3열 고정으로 가로 스크롤이 발생함. Chapter 13 Lesson 1~6 원본 위젯을 이식해 `sample/learning-methods-v2/`로 전면 재작성.

| ID | 상태 | 작업 |
|---|---|---|
| V01 | done | THEORY-13-M01~M06 원본 위젯 분석(다이어그램·Sandbox·Hover Mapping·아코디언·디버거·드래그/단답 퀴즈) |
| V02 | done | `assets/method-samples.css` 재작성 — 페이지 셸(반응형 1열 기본, 넓은 화면만 2열) + Chapter 13 위젯 스타일 이식, 가로 스크롤 차단 |
| V03 | done | `assets/method-samples.js` 재작성 — 탭/아코디언/Hover Mapping/드래그/카드분류/디버거/Sandbox를 멀티 인스턴스·JSON 데이터 기반으로 일반화 |
| V04 | done | 38개 standalone 페이지 작성 — 예시 1은 Chapter 13 원본 이식, 예시 2·3은 Internal Table/Open SQL/DDIC/ALV/OO/RAP 변형 |
| V05 | done | `index.html`, `README.md` 작성(원본 위젯 출처 매핑표 포함) |
| V06 | done | 검증 — 38개 유지, 각 method-example 3개, 380/620px 가로 스크롤 0건, mermaid 렌더링, README/index 링크 실존, 콘솔 오류 0건, desktop/mobile 스크린샷 |
| V07 | done | 문서 동기화(TASKS/RUN_LOG/99_AI_SYNC/CHANGELOG) 및 scoped commit/push |

## Stage 범위
- 포함: `.project-docs/진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/`, `.project-docs/10_LEARNING_CONTENT_METHODS.md`, 관련 인계 문서, `sample/learning-methods/`, `.project-docs/08_DEV_DIARY.md`, 2026-06-15 changelog.
- 제외: `.project-docs/virtual_browser_test_guide.md`, `sample/abap-event-diagram-sample.html`.
