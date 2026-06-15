# 2026-06-15 변경 기록 — Chapter 13 고품질화+시각화 통합 패스

## 참여 AI
- Codex (GPT-5)

## 작업 범위
- 자동화 ID: `automation`
- 대상: `Chapter 13의 Lesson 1~7` (`THEORY-13-M01~M07`)
- 목적: 사용량 제한으로 중단된 자동화 작업을 재시작하고, 기존 Track 1 고품질화 계획에 따라 다음 미완료 Chapter를 보강.

## 수행 내용
- 자동화 메모리와 `.project-docs/TRACK1_QUALITY_PLAN.md`, `.project-docs/99_AI_SYNC.md`, `.project-docs/HANDOFF_LESSON_CONTENT.md`를 대조해 기존 구현 계획을 확인.
- 정적 감사로 `Chapter 13`의 부족 요소를 재확인하고, `M02~M07`에 아래 요소를 추가.
  - 시각 자료(`viz-*` 패턴)
  - 미니 실습
  - 완료 조건
  - SAP Help Portal 공식 링크 3개
  - 확인 퀴즈
  - 정답/해설
- `THEORY-13-M01`에는 기존 인터랙티브 이벤트 흐름 위젯을 유지하면서 빠져 있던 완료 조건을 추가.
- `THEORY-13-M01`에 남아 있던 인라인 스타일을 `assets/abap-lesson-viewer.css` 공통 클래스로 이동.
- 중간 폭 화면에서 `THEORY-13-M01`의 탭형 좌우 분할 위젯이 우측 내비게이션과 겹치지 않도록 이벤트 탭 전용 반응형 CSS를 추가.
- 사용자 화면에 노출되던 내부 ID 표현을 `Chapter 13의 Lesson 4`, `Chapter 13` 형식으로 정리.

## 검증
- Chapter 13 품질 마커 검증: 실습/완료 조건/퀴즈/정답/공식 링크/시각 자료 7/7 완료.
- Track 1 전체 글로서리 미정의 0건.
- Chapter 13 소스 기준 인라인 style/script/inline event 0건.
- Playwright 로컬 렌더링 확인:
  - `THEORY-13-M01`: 콘솔 오류 0건, 탭 5 활성화 확인, 우측 내비와 탭 위젯 겹침 없음.
  - `THEORY-13-M07`: 콘솔 오류 0건, 보강 섹션 표시 확인.

## 고민했던 점
- 기존 문서에는 `Chapter 13` 완료로 적힌 부분이 있었지만, 실제 파일 감사에서는 `M02~M07`에 실습·퀴즈·공식 링크·시각 자료가 빠져 있었다. 문서 상태보다 소스 상태를 기준으로 범위를 확정했다.
- `THEORY-13-M01`은 이미 인터랙티브 위젯이 크고 복잡해 전면 재작성보다 누락 요소 보강과 CSS 안정화만 수행했다.
- 우측 내비게이션은 전역 레이아웃이므로 건드리지 않고, 겹침이 발생한 이벤트 탭 위젯만 반응형으로 좁게 보정해 변경 범위를 줄였다.

## 다음 후보
- `Chapter 14` Dynpro 기초 고품질화+시각화 패스.
- PBO/PAI, OK_CODE, PF-STATUS/TITLEBAR, Custom Control/Container 흐름을 공식 문서와 대조한 뒤 Lesson 단위로 실습·퀴즈·시각 자료를 추가한다.

---

## 추가 작업 — 학습 콘텐츠 수단 카탈로그

### 배경
- 사용자는 `Chapter 13의 Lesson 1`에 들어간 다이어그램, Sandbox, Hover Mapping, 아코디언, 디버깅 실행기, 드래그 퀴즈, 단답형 퀴즈 같은 수단을 정리해 두면 이후 AI가 Lesson 초안 단계부터 더 높은 품질의 자료를 만들 수 있다고 판단했다.

### 수행 내용
- `.project-docs/10_LEARNING_CONTENT_METHODS.md` 신규 작성.
- 현재 사용된 고관여 학습 수단과 향후 추천 수단을 카탈로그화.
- 수단 선택 가이드, AI 작성 절차, 품질 기준, Chapter 14~19 우선 확산 후보를 정리.
- `.project-docs/00_INDEX.md`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`에 참조 링크와 시작 전 확인 지침을 추가.

### 설계 이유
- 기존 HANDOFF의 시각화 패턴은 `viz-*` 마크업 중심이었다. 새 문서는 그보다 한 단계 위에서 "이 Lesson에는 어떤 학습 경험을 넣을 것인가"를 고르는 기획 문서 역할을 한다.
- 모든 Lesson에 무거운 인터랙션을 넣기보다, 순서·상태 변화·분기·오개념·실무 실수 여부에 따라 적절한 수단을 선택하도록 기준을 분리했다.

---

## 추가 작업 — 학습 수단 샘플 라이브러리 구현

### 배경
- 사용자는 정리된 학습 수단을 문서로만 남기는 것을 넘어, AI가 실제 초안 생성 시 바로 참고할 수 있는 화면 샘플 묶음을 원했다.
- 또한 구현 계획, 태스크, 런로그를 GUID 기반 진행계획 폴더에서 함께 관리하도록 요청했다.

### 수행 내용
- `.project-docs/진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/`를 생성하고 `PLAN.md`, `TASKS.md`, `RUN_LOG.md`를 추가.
- `sample/learning-methods/`에 38개 standalone HTML 샘플 페이지와 `README.md`, `index.html`을 추가.
- 공통 스타일 `assets/method-samples.css`와 공통 동작 `assets/method-samples.js`를 추가.
- 각 샘플 페이지에 학습 수단 설명, 샘플 컴포넌트, ABAP 예시 초안 3개, AI 작성 메모를 포함.
- `.project-docs/00_INDEX.md`, `.project-docs/HANDOFF_LESSON_CONTENT.md`, `.project-docs/99_AI_SYNC.md`에서 새 샘플 라이브러리와 진행계획 폴더를 참조하도록 갱신.

### 설계 이유
- 원본 카탈로그의 46개 항목은 학습 경험 관점에서 겹치는 부분이 있어 38개 대표 수단으로 병합했다.
- 샘플 페이지는 실제 Lesson fragment가 아니라 독립 실행 가능한 참고 자료이므로, 공통 CSS/JS를 두되 각 HTML이 바로 열리는 형태로 구성했다.
- 실제 SAP 화면 캡처가 없는 수단은 mock screenshot 형태로 표현해 저작권과 환경 의존성을 피했다.

---

## 추가 작업 — 학습 수단 샘플 라이브러리 v2 전면 재작성

### 배경
- v1(`sample/learning-methods/`)은 거의 모든 페이지가 동일한 ABAP 코드 카드 3개를 반복해 "수단이 실제 적용된 모습"을 보여주지 못했고, 3열 고정 카드로 가로 스크롤이 발생했다.
- 사용자는 Chapter 13 Lesson 1~6에 이미 적용된 실제 위젯(다이어그램·Sandbox·Bad/Good Hover Mapping·아코디언·디버거·드래그/단답 퀴즈)을 원본 예시로 활용해 38개 페이지를 전면 재작성하길 요청했다.

### 수행 내용
- `sample/learning-methods-v2/`를 신설하고 38개 standalone 페이지 + `index.html` + `README.md` + 공통 `assets/method-samples.css/js`를 작성.
- `THEORY-13-M01~M06.html`과 `assets/abap-lesson-viewer.css/js`에서 위젯의 마크업·스타일·동작을 추출해 공통 asset에 이식. 각 페이지 예시 1은 Chapter 13 원본 이식, 예시 2·3은 Internal Table/Open SQL/Selection Screen·Report Event/DDIC/ALV/OO ABAP/RAP·CDS 변형.
- 공통 JS를 멀티 인스턴스 + JSON 데이터 기반으로 일반화(Sandbox/Step Debugger/Decision Tree config, 드래그 퍼즐 data-expected/data-answer). 카드 분류 핸들러를 신설.
- 레이아웃을 반응형(기본 1열, 넓은 화면만 일부 2열)으로 재설계하고 `overflow-x: hidden` + 코드 블록 내부 스크롤로 가로 스크롤을 차단.

### 검증
- HTML 38개 유지, 각 페이지 `method-example` 3개, README/index 링크 실존, 380/620px 가로 스크롤 0건, mermaid 렌더링, 주요 위젯 동작, 콘솔 오류 0건, desktop/mobile 스크린샷 확인.
- 수정 버그: Sandbox `selectResult` 라벨 누락(`[undefined]`) → 기본값 'SELECT'; 카드 분류 재채점 시 클래스 유실 → `cardsort-feedback` 보존.

### 설계 이유
- "코드 카드 나열"이 아니라 "수단이 실제 작동하는 컴포넌트"를 보여주는 것이 핵심이므로, Chapter 13의 검증된 위젯을 그대로 이식해 신뢰도와 재사용성을 동시에 확보했다.
- 위젯 동작을 JSON config로 분리해, 한 페이지에 같은 수단의 서로 다른 인스턴스 3개가 충돌 없이 공존하도록 했다.
- v1은 그대로 보존했다(이력 비교용). 신규 참조는 v2를 사용한다.
