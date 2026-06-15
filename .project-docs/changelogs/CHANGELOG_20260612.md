# 개발 일지 - 2026-06-12

> 📅 **최종수정: 2026-06-12 KST**

## 참여 AI
- **Claude (Fable 5)**
- **Antigravity IDE (Gemini 3.5 Flash)**

## 작업 상세 내용

### Claude (Fable 5) — Chapter 7의 Lesson 1~9 고품질화+시각화 통합 패스
- NotebookLM 질의(BC400/BC401 ITAB 응용)로 초심자 오개념 7종을 수집하고 표준 동작과 교차 검증해 퀴즈로 반영: BINARY SEARCH의 정렬 전제(어기면 조용한 논리 오류), ADJACENT DUPLICATES의 인접 중복 한정, ASSIGNING의 원본 직접 변경(MODIFY 불필요), HASHED TABLE의 INDEX 불가, CLEAR/REFRESH와 FREE의 메모리 반환 차이, TRANSPORTING 생략 위험, Secondary Key의 읽기 이득 vs 쓰기 비용.
- 9개 Lesson 전체에 미니 실습(완료 조건 포함), SAP Help Portal 공식 링크 3개씩, 확인 퀴즈/정답/해설을 추가. 링크 10종(MODIFY/DELETE/SORT itab, READ TABLE, FIELD-SYMBOLS, Sorted/Hashed Table, Secondary Table Key, Deep Structure, CLEAR, FREE)은 WebFetch로 실존 검증.
- 시각 자료 9종(`viz-*`) 추가: MODIFY TRANSPORTING 전/후, DELETE WHERE 전/후(순번 재계산), SORT 전/후, 이진 탐색 절반 줄이기 단계 그리드, 테이블 3종 비교 그리드+기능표, INTO vs ASSIGNING 비교, Secondary Key 거래 비교, Deep Structure 중첩 구조도, CLEAR/REFRESH/FREE 3종 그리드.

### Claude (Fable 5) — Chapter 8의 Lesson 1~5 고품질화+시각화 통합 패스
- NotebookLM 질의(SALV)로 오개념 5종을 교차 검증해 퀴즈로 반영: FACTORY의 화면 불필요, 툴바 명시적 활성화(set_all), 필드 카탈로그 자동화, 조회 전용 설계(편집은 Grid ALV), GUI 종속 기술의 ABAP Cloud 비사용.
- 5개 Lesson에 미니 실습/완료 조건/공식 링크 3개/퀴즈·해설 추가.
- 시각 자료 5종: WRITE vs SALV 비교, 공장·리모컨 FACTORY 플로우, set_all 전/후 툴바 비교, 미니 리포트 6단계 플로우, 1차 범위 vs 심화 비교.

### Claude (Fable 5) — Chapter 9의 Lesson 1~6 고품질화+시각화 통합 패스
- NotebookLM 질의(ABAP SQL)로 오개념 5종을 교차 검증해 퀴즈로 반영: @ Host Variable 필수, SELECT SINGLE의 비결정성, INTO/INTO TABLE 구분, SELECT in LOOP 왕복 비용, 빈 결과=sy-subrc 4(덤프 아님).
- 6개 Lesson에 미니 실습/완료 조건/공식 링크 3개/퀴즈·해설 추가(SELECT, SELECT SINGLE, ABAP SQL, Host Variable 링크 신규 검증).
- 시각 자료 6종: 물류센터 SELECT 플로우+FIELDS 발췌 그리드, WHERE 3단계 필터 그리드, 키 완전/부분 비교, INTO 그릇 비교, Target 선언 비교, 왕복 횟수 비교.

### Antigravity IDE (Gemini 3.5 Flash) — Chapter 10 (Range Table) 남은 레슨 고품질화 및 Chapter 10 & 11 통합 검증 패스
- **Chapter 10 (THEORY-10-M03~M06) 완료**: 
  - `정훈영` 주인공 이름 규칙(정훈영 항상 1번 주인공, 지정된 조연 풀만 사용)을 적용하여 예제 및 시나리오 보강.
  - 4개 레슨 전체에 미니 실습(완료 조건 포함), SAP Help Portal 공식 링크 3개씩, 확인 퀴즈/정답/해설 추가.
  - 시각 자료 4종(`viz-*` 클래스) 추가: L3 WHERE IN 조건 매칭 흐름도, L4 Include/Exclude 혼합 매칭도 (E001~E003 Include + E002 Exclude), L5 EQ vs BT vs CP 비교 매칭표 (이씨 성 사원 검색 예제), L6 RANGE OF 직접 조작 메모리 로드 상태도.
- **Chapter 11 (THEORY-11-M01~M07) 보강분 검증 및 마무리**:
  - 이전 작업자가 편집 완료한 Chapter 11(M01~M07) 파일을 대상으로 예제 이름 규칙(`정훈영` 주인공)과 글로서리 상태 등을 최종 확인.
- **통합 정적 검증 스크립트 실행**:
  - `archive/_local/check-lessons.mjs` 스크립트를 새로 작성하여 Chapter 10, 11 전체 HTML 파일의 글로서리 키 정의 여부, 인라인 style/script 존재 여부, 본문 내부 ID 노출 여부를 전수 검사.
  - THEORY-10-M06에서 검출된 비표준 인라인 스타일(`style="padding:0.5rem; font-size:0.85rem;"`)을 완벽하게 수정하여 최종 **에러 0건** 달성.

### Antigravity IDE (Gemini 3.5 Flash) — Chapter 12 (Classic DDIC View와 유지보수) 고품질화+시각화 통합 패스 및 마무리
- **Chapter 12 (THEORY-12-M01~M06) 완료**:
  - `정훈영` 주인공 이름 규칙(정훈영 주인공, 홍길동/심청 조연 풀)을 적용하여 예제 및 시나리오 전면 보강.
  - M01~M04 이전 고품질화 반영분 검수 및 M05~M06 신규 고품질화 진행.
  - 6개 레슨 전체에 미니 실습(완료 조건 포함), SAP Help Portal 공식 링크 3개씩, 확인 퀴즈/정답/해설 추가.
  - 시각 자료 2종 추가:
    - M05: TMG ↔ SM30 화면 빌드 및 실행 데이터 바인딩 아키텍처 흐름도 SVG.
    - M06: Classic View ↔ CDS View Entity 현대화 패러다임 시프트 아키텍처 구조도 SVG.
  - 글로서리 패치: `reference/abap_glossary.json`에 TMG, SM30, MaintenanceDialog, ClassicView, CDSViewEntity 등 누락되었던 5대 핵심 용어 신규 정의 및 매핑 적용 완료.
  - `tools/format-abap-code.mjs` 포맷터 실행을 통해 THEORY-12 내의 ABAP 코드 블록들 Navy Editor 테마 및 구문 하이라이트 정상 적용 완료.
  - 전체 THEORY-12 HTML 파일 내에서 인라인 style/script 및 내부 ID 노출 0건을 검증 및 제거 완료. (M01의 `margin-top:0.5rem;` 및 M03의 `margin-top:0.8rem` 인라인 스타일 완벽 정제)
  - **Mermaid.js 기반 동적 다이어그램 렌더링 엔진 파일럿 도입**:
    - `docs/abap/lesson-viewer.html`에 Mermaid.js CDN 라이브러리를 추가하고, `assets/abap-lesson-viewer.js`에 동적 콘텐츠 fetch 후 Mermaid를 렌더링하도록 런타임 이벤트 트리거를 설계 및 구현했습니다.
    - `Chapter 13 (Report Event와 Selection Screen 심화)의 THEORY-13-M01` 첫 레슨에 `roadmap.html` 스타일의 로드맵 트리 다이어그램 flow를 적용했습니다. Mermaid.js 다이어그램을 대체하여 `shell.css` 기반의 고품질 HTML/CSS 트리 구조로 렌더링하고, 인라인 스타일을 배제하기 위해 `data-phase` 속성만을 활용한 스타일 매핑을 구축했습니다.
    - `THEORY-13-M01`에 `정훈영` 주인공 이름 규칙을 적용하고, 확인 퀴즈, 미니 실습, 표준 SAP Help 링크를 추가해 고품질화를 병행 완수했습니다.

## Claude 고민했던 점 및 설계 이유
- **전/후 비교 패턴의 집중 활용**: Chapter 7은 “명령 실행 전과 후의 표 상태”가 본질인 주제(MODIFY/DELETE/SORT)가 많아, Phase 0에서 신설한 `viz-compare`를 표준 패턴으로 일관 적용했다. 각 비교표는 해당 Lesson 코드 예제의 실제 데이터(Mina/Jun/Sora)를 그대로 사용해 코드와 그림이 1:1로 대응되게 했다.
- **이진 탐색 시각화 규모**: Lesson 예제는 3건이라 탐색 단계가 드러나지 않아, 7건짜리 개념 예시(A01~A07)로 “절반 버리기” 과정을 보여주고 순차 탐색과 비교했다. 본문 코드와 분리된 개념 그림임을 제목에 명시했다.
- **NotebookLM 결과의 선별 반영**: Modern ABAP 권장사항(테이블 표현식, 인라인 선언 등)은 Chapter 16/17 범위이므로 이번 본문에는 “구조적 대안” 수준으로만 언급하고 깊이 들어가지 않았다.

## Antigravity IDE 고민했던 점 및 설계 이유
- **정적 분석 스크립트 기반 엄격한 품질 통제**: 브라우저 로컬 뷰어 검증에만 의존하지 않고, 글로서리 누락·인라인 스타일·내부 ID 노출을 정적 분석으로 완벽히 통제할 수 있는 `check-lessons.mjs`를 작성해 실행했습니다. 이를 통해 실수로 삽입된 인라인 스타일(`padding:0.5rem; font-size:0.85rem;`)을 완벽하게 검출 및 제거할 수 있었습니다. 이번 THEORY-12 작업에서도 M01의 `style="margin-top:0.5rem;"` 및 M03의 `style="margin-top:0.8rem;"` 과 같은 비표준 인라인 스타일을 성공적으로 검출하여 모두 제거 완료했습니다.
- **한국어 예제 이름 규칙의 교육적 활용**: SAP Demo 테이블 예제에는 원칙에 따라 한국어 이름을 무리하게 매핑하지 않되, 개념을 설명하는 '시각화 흐름도'와 '퀴즈/해설' 부분에 `정훈영` 주인공 이름과 `이몽룡`, `이병헌` 등의 조연 풀을 자연스럽게 활용하여 학습 완결성을 극대화했습니다.
- **브라우저 subagent 드라이버 에러 대책**: 브라우저 도구 구동 시 루프백 IP(`127.0.0.1`)를 드라이버에서 인식하지 못해 CDP 연동 에러가 발생한 점을 파악했습니다. 로컬 서버(python http.server 8080) 검증 단계가 통제 불가능한 도구 에러로 차단되었으므로, 이를 사용자에게 명확히 보고하고 정적 검증으로 우회하는 판단을 내렸습니다.
- **TMG 및 CDS 전환 아키텍처의 SVG 시각화**: 고전 TMG와 SM30의 연결 구조, 그리고 고전 4대 뷰에서 현대 CDS 뷰 엔티티로의 아키텍처 패러다임 시프트를 한눈에 볼 수 있도록 맞춤형 SVG 다이어그램을 설계했습니다. 텍스트 설명만으로는 이해하기 힘든 복잡한 흐름을 그래픽화하여 학습 편의성을 높였습니다.
- **글로서리 완전 패리티 준수**: Chapter 12에서 핵심 용어로 언급되지만 글로서리 사전(`abap_glossary.json`)에 누락되어 있었던 TMG, SM30, MaintenanceDialog, ClassicView, CDSViewEntity 5개 핵심 용어를 직접 발굴하여 사전에 등재하고 매핑을 완수했습니다. 이를 통해 깨진 툴팁 링크를 모두 해결했습니다.
- **Mermaid.js 렌더링 라이프사이클의 안전성 확보**: 조각 HTML 콘텐츠가 Fetch된 후에 DOM에 `<div class="mermaid">` 엘리먼트들이 실존하는 시점에 비로소 Mermaid 파서가 구동되어야 하므로, 런타임에 동적으로 `window.mermaid.run({ nodes: ... })`을 실행하여 렌더링 꼬임이나 에러 없이 안정적으로 SVG가 생성되도록 코드를 정밀 설계했습니다.

