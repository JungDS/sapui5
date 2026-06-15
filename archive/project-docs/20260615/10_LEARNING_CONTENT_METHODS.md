# 학습 콘텐츠 수단 카탈로그

> 📅 **최종수정: 2026-06-15 KST**

이 문서는 ABAP Lesson 본문을 만들 때 사용할 수 있는 **학습 전달 수단**을 정리한다.
목표는 AI가 초안을 만들 때 텍스트 설명으로만 끝내지 않고, 주제에 맞는 다이어그램, 비교표, 샌드박스, 퀴즈, 디버거형 UI 등을 골라 **처음부터 높은 품질의 학습 자료**를 설계하도록 돕는 것이다.

## 1. 핵심 원칙

- 텍스트는 설명의 뼈대이고, 학습 수단은 이해를 고정하는 장치다.
- 한 Lesson에는 보통 **핵심 시각 자료 1~3개 + 실습 + 확인 퀴즈**를 둔다.
- 복잡한 개념일수록 "읽기 → 보기 → 조작하기 → 풀어보기 → 정리하기" 흐름을 만든다.
- 모든 Lesson에 무거운 인터랙션을 넣을 필요는 없다. 개념 난도, 상태 변화, 분기, 실습 가치가 클 때만 사용한다.
- `docs/abap/lesson-content/*.html`은 fragment이므로 `<script>`, `<style>`, 인라인 `style`은 넣지 않는다. 새 동작은 `assets/abap-lesson-viewer.js`, 새 스타일은 `assets/abap-lesson-viewer.css`에 공통화한다.

## 2. Chapter 13의 Lesson 1에 사용된 수단

| 수단 | 현재 예시 | 학습 효과 | 재사용하기 좋은 상황 |
|---|---|---|---|
| 학습 목표 콜아웃 | `lesson-callout tip` | 이번 Lesson의 도착점을 먼저 제시 | 모든 Lesson |
| 개념 도입 스토리 | "코드는 위에서 아래로가 아니다" | 기존 상식을 흔들어 주의 집중 | 오개념이 강한 주제 |
| 탭형 점진 빌드업 다이어그램 | 5단계 이벤트 라이프사이클 탭 | 복잡한 흐름을 한 번에 보여주지 않고 단계별 확장 | 이벤트, 아키텍처, 처리 흐름 |
| Mermaid 흐름도 | 각 탭의 이벤트 노드/화살표 | 순서와 분기 이해 | 절차형 흐름, 이벤트 순서 |
| 코드와 다이어그램 좌우 비교 | 탭 왼쪽 다이어그램 + 오른쪽 ABAP 코드 | 추상 흐름과 실제 코드 매핑 | 코드가 흐름을 구현하는 주제 |
| 가상 SAP GUI Sandbox | Selection Screen 입력 후 이벤트 로그 출력 | 학습자가 값을 바꿔보며 결과를 관찰 | 입력값, 검증, 화면 흐름 |
| 일상 비유 스토리 | 정훈영 사원의 요리사 하루 | 낯선 영문 이벤트명을 기억하기 쉽게 만듦 | 초심자 개념 도입 |
| Bad/Good Practice Hover Mapping | 잘못된 기본값 위치 vs 올바른 위치 | 실무 실수와 권장 구조를 직접 비교 | 안티패턴, 리팩터링, 코드 리뷰 |
| 실무 주의 콜아웃 | 이벤트 블록 위치/책임 경고 | 실제 업무에서 틀리기 쉬운 포인트 강조 | 모든 Lesson |
| 미니 실습 | 이벤트 실행 순서 추적기 | 설명을 손으로 확인하는 활동 제공 | 모든 Lesson |
| 완료 조건 | 실행 로그와 순서 설명 조건 | 학습자가 어디까지 하면 성공인지 판단 | 모든 실습 |
| 코드 키워드 아코디언 가이드 | 이벤트 구문 클릭 시 설명 열림 | 긴 코드를 작은 설명 단위로 분해 | 초보자용 코드 읽기 |
| Step Debugger Simulator | Next Step으로 이벤트 순서 추적 | 디버깅 경험을 브라우저에서 모사 | 런타임 순서, 루프, 분기 |
| 공식 링크 섹션 | SAP Help Portal 링크 | 정확성 검증과 추가 학습 경로 제공 | 모든 고품질 Lesson |
| 드래그 앤 드롭 퀴즈 | 이벤트 카드 순서 맞추기 | 순서 암기보다 능동적 배열 유도 | 순서, 분류, 매칭 |
| 단답형 확인 퀴즈 | 3문항 + 정답/해설 | 핵심 개념을 말로 회수 | 모든 Lesson |
| 한눈에 정리 | 핵심 bullet + 다음 Lesson 예고 | 학습 마무리와 다음 흐름 연결 | 모든 Lesson |

## 3. 기존 공통 시각화 수단

| 수단 | 기본 클래스/형태 | 적합한 내용 |
|---|---|---|
| 상태 변화 그리드 | `viz-state-grid`, `viz-state`, `viz-table` | 선언 전/후, APPEND 전/후, 조회 결과 변화 |
| 관계도 | `viz-relation`, `viz-concept`, `viz-arrow` | Domain → Data Element → Field, FK → Check Table |
| 프로세스 플로우 | `viz-flow`, `viz-flow-step` | 실행 순서, 검증 단계, 데이터 처리 단계 |
| 전/후 비교 | `viz-compare`, `viz-compare-before`, `viz-compare-after` | Bad/Good, Classic/Modern, 실행 전/후 |
| 성공/실패 배지 | `viz-badge success/fail` | `sy-subrc`, 검증 통과/실패, 권한 있음/없음 |
| 현재 행 강조 | `viz-current-row` | LOOP, READ, BINARY SEARCH 포인터 |
| 인라인 SVG | `viz-svg` | 계층 구조, 아키텍처, 복잡한 시스템 관계 |
| ABAP Editor Mockup | `abap-editor-mockup`, `shiki-copy-wrapper` | 코드 예제, 복사 가능한 샘플 |
| 콜아웃 | `lesson-callout tip/warn` | 학습 목표, 팁, 실무 주의 |
| 접이식 해설 | `<details><summary>` | 정답/해설, 보충 설명, 고급 팁 |

## 4. 앞으로 추가할 수 있는 추천 수단

| 추천 수단 | 설명 | 좋은 적용 후보 |
|---|---|---|
| 치트시트 매트릭스 | "언제 사용 / 넣을 코드 / 금지할 코드 / 디버깅 포인트" 표 | Report Event, Dynpro PBO/PAI, ALV 메서드 |
| Breakpoint 체크리스트 | 어디에 breakpoint를 걸고 어떤 순서로 멈추는지 정리 | 이벤트, 루프, SQL 실행, PBO/PAI |
| 예상 로그 비교 | 정상 로그와 오류 로그를 나란히 보여줌 | 검증, 권한, SELECT 결과 없음 |
| 의사결정 트리 | 조건에 따라 어떤 기술을 고를지 안내 | JOIN vs FAE, SALV vs Grid ALV, DEFAULT vs INITIALIZATION |
| 카드 분류 퀴즈 | 카드를 "초기화/검증/조회/출력" 같은 영역으로 분류 | 이벤트 책임 분리, 모듈화 도구 선택 |
| 순서 배열 퀴즈 | 처리 단계 카드를 올바른 순서로 배열 | Dynpro Flow Logic, RAP save sequence |
| 빈칸 코드 완성 | 핵심 키워드 또는 조건식을 채워 넣기 | ABAP 문법, SELECT, AUTHORITY-CHECK |
| 코드 라인 매칭 | 코드 라인을 다이어그램 단계와 연결 | 복잡한 예제 코드 해석 |
| 오류 찾기 미션 | 일부러 틀린 코드에서 버그를 찾게 함 | 안티패턴, 성능, 권한, 화면 제어 |
| 미니 케이스 시뮬레이터 | 입력값을 바꾸면 결과/메시지가 달라지는 작은 UI | Selection Screen, 권한, Range Table |
| 디버거 타임라인 | Step 버튼으로 현재 변수/이벤트/출력 상태를 이동 | LOOP, READ TABLE, PBO/PAI, Event flow |
| 용어 플래시카드 | 앞면/뒷면으로 주요 용어 반복 | 초반 DDIC, OO ABAP, RAP 용어 |
| 미니 시험 모드 | 퀴즈만 모아서 점수와 해설 제공 | Chapter 마무리 Lesson |
| 실무 체크리스트 | PR 전 확인 항목처럼 사용 | 성능, 권한, 예외 처리, 출력 UX |
| 샘플 데이터 테이블 | 작은 데이터셋으로 쿼리/가공 결과 확인 | Open SQL, Internal Table, JOIN |
| 캡처 이미지 | 실제 SAP GUI/ADT 화면 캡처 | 화면 조작, 메뉴 경로, 설정 화면 |
| 단계별 스크린샷 갤러리 | 화면이 어떻게 변하는지 순서대로 보여줌 | Dynpro, F4 Help, TMG/SM30 |
| 애니메이션 없는 SVG 아키텍처 | 정적 SVG로 시스템/계층 관계 표현 | CDS, RAP, Gateway, ALV Container |
| 미니 프로젝트 미션 | 여러 Lesson을 묶어 작은 완성물을 만들기 | Chapter 마지막 Lesson, Track 2 |

## 5. 수단 선택 가이드

| 학습 대상 | 우선 선택 수단 | 보조 수단 |
|---|---|---|
| 실행 순서 | 프로세스 플로우, 탭형 빌드업, 순서 배열 퀴즈 | 디버거 타임라인, 예상 로그 |
| 상태 변화 | 상태 변화 그리드, 전/후 비교 | Step Debugger, 샘플 데이터 테이블 |
| 분기/검증 | 성공/실패 비교, 미니 Sandbox | 오류 로그, 단답형 퀴즈 |
| 코드 구조 | ABAP Editor Mockup, 코드 라인 매칭 | 아코디언 가이드, Bad/Good 비교 |
| 개념 관계 | 관계도, SVG 아키텍처 | 치트시트 매트릭스 |
| 도구 선택 | 의사결정 트리, 비교표 | 카드 분류 퀴즈 |
| 실무 주의 | 실무 체크리스트, 오류 찾기 미션 | warn 콜아웃 |
| 암기/회수 | 드래그 퀴즈, 단답형 퀴즈, 플래시카드 | Chapter 미니 시험 |

## 6. AI 작성 절차

새 Lesson을 만들 때는 아래 순서로 수단을 고른다.

1. JSON 지침에서 핵심 키워드, 실습, 주의사항을 읽는다.
2. Lesson 핵심을 한 문장으로 정한다. 예: "AT SELECTION-SCREEN은 메인 로직 전 검문소다."
3. 아래 질문에 답한다.
   - 순서가 중요한가?
   - 상태가 변하는가?
   - 성공/실패 분기가 있는가?
   - 코드와 개념을 매핑해야 하는가?
   - 실무에서 자주 하는 실수가 있는가?
4. 답에 맞는 수단을 §5에서 고른다.
5. 첫 초안부터 최소 1개의 시각 자료, 1개의 실습, 1개의 확인 퀴즈를 포함한다.
6. 새 CSS/JS가 필요하면 fragment에 직접 넣지 말고 공통 asset에 추가한다.
7. 렌더링 검증은 조각 파일이 아니라 `docs/abap/lesson-viewer.html?lesson=<ID>`로 확인한다.

## 7. 품질 기준

좋은 학습 수단은 아래 조건을 만족한다.

- 학습자가 무엇을 해야 하는지 즉시 알 수 있다.
- 텍스트만 읽을 때보다 이해가 빨라진다.
- ABAP 표준 동작과 맞고, 과장된 단순화가 없다.
- 모바일/데스크톱에서 레이아웃이 깨지지 않는다.
- 내부 ID(`THEORY-13-M01`)를 사용자 화면에 노출하지 않는다.
- 정답/해설 또는 완료 조건이 있어 학습자가 스스로 확인할 수 있다.
- 같은 유형의 Lesson에서 재사용 가능한 공통 CSS/JS 패턴으로 남는다.

## 8. 우선 확산 후보

- `Chapter 14`: PBO/PAI 디버거 타임라인, OK_CODE 분기 Sandbox, Screen Flow Logic 순서 배열 퀴즈.
- `Chapter 15`: Container → Grid → Field Catalog → Display 단계 플로우, ALV 출력 전/후 비교.
- `Chapter 16`: Classic vs Modern ABAP 코드 변환 Hover Mapping, 빈칸 코드 완성.
- `Chapter 17`: SQL Expression 결과 테이블 시뮬레이터, `@` Host Variable 오류 찾기.
- `Chapter 18`: Class/Object 관계 SVG, Static/Instance 카드 분류 퀴즈.
- `Chapter 19`: SALV/Grid ALV 기능 선택 의사결정 트리, Stable Refresh 상태 보존 시뮬레이터.

## 8.5 실제 적용 샘플 참조 (learning-methods-v2)

- 각 수단이 **실제로 작동하는 모습**은 `sample/learning-methods-v2/`에서 확인한다(우선 참조). README의 "원본 위젯 출처" 표가 어떤 샘플이 Chapter 13 Lesson 1~6의 어느 위젯을 이식했는지 알려준다.
- 새 Lesson에 위젯을 넣을 때는 v2 샘플의 마크업/클래스를 그대로 가져오되, fragment 규칙(인라인 `style`/`script` 금지)에 맞춰 CSS는 `assets/abap-lesson-viewer.css`, JS는 `assets/abap-lesson-viewer.js`에 둔다. v2의 위젯은 이 공통 asset과 호환되도록 이식돼 있다.
- v1 `sample/learning-methods/`는 품질이 낮아(동일 코드 카드 반복, 가로 스크롤) 신규 참조에 쓰지 않는다. 이력 비교용으로만 보존한다.

## 9. 주의할 점

- 무거운 인터랙션은 학습 효과가 분명할 때만 넣는다. 단순 설명은 `viz-flow`, `viz-compare`, `details`로 충분한 경우가 많다.
- 한 화면에 너무 많은 장치를 몰아넣으면 산만해진다. Chapter 13의 Lesson 1처럼 전체 개요 Lesson일 때만 여러 수단을 집중 배치한다.
- 새 수단을 만들면 이 문서에 "언제 쓰는지"와 "재사용 조건"을 추가한다.
