# 06. ABAP 커리큘럼

현재 가장 많은 변경이 발생하는 활성 영역. 다양한 디자인 샘플 비교 결과를 바탕으로 2026-06-05에
운영본 `docs/roadmap/abap-curriculum.html`을 신규 작성했다. 구 샘플들은 비교/보존용으로 남겨 둔다.

## 원천 데이터
- 운영본 런타임 데이터: `reference/abap_curriculum_v5_4_20260605_000000.json`.
- 원본/비교 참고자료: `reference/abap_curriculum_v5_3_20260602_010000.json`,
  `reference/abap_curriculum_v5_3.md`, `reference/TRACK1/`.
- 생성 도구: `tools/build-abap-curriculum.mjs`, `tools/build-curriculum-samples.mjs`.

## 운영본 (2026-06-05)
- 파일: `docs/roadmap/abap-curriculum.html`
- 전용 자산: `assets/abap-curriculum.js`, `assets/abap-curriculum.css`
- 기본 화면: v8 sampleA 계열의 Track 탭 + 좌측 Chapter 목록 + 선택 Chapter 본문 + Shell Navigation.
- 전체화면: Chapter 목록 / Lesson 목록 / 선택 Lesson 본문 3열 구조.
- Section 헤더: antigravity 계열의 학습시간·Section·난이도·Lesson 수 배지와 핵심 키워드 칩을 반영.
- Lesson 카드: `자세히` 링크를 Lesson 제목 우측으로 이동하고 짧은 라벨로 통일.
- 안정화: 기본 화면 본문 스크롤 시 현재 보이는 Lesson을 학습 목차와 내부 선택 상태에 반영한다.
  전체화면 진입 시에는 전환 직전의 Lesson을 보존해 reader가 같은 Lesson으로 열린다.
  `abap-curriculum.html`은 `assets/abap-curriculum.js?v=20260605-scrollspy1`로 캐시를 갱신한다.
- 레이아웃 안정화: 일반/전체화면 Track 메뉴 폭을 410px로 통일한다. 전체화면에서는 공통 Shell 상단바 높이를
  고려해 커리큘럼 영역을 남은 화면 높이에 맞추고, Track/Lesson/본문 패널과 좁은 폭의 그리드가 영역 내부에서
  스크롤되도록 한다. CSS 캐시는 `assets/abap-curriculum.css?v=20260605-layout6`로 갱신한다.
- reader 헤더 정리: 전체화면 본문 상단을 `abc-panel-head` 기반으로 맞춰 좌측에 Chapter/Lesson/제목,
  우측에 `이전`/`다음`/`자세히` 액션을 배치한다. 본문 키워드는 `핵심 내용`과 같은 `abc-info-block`
  디자인의 `핵심 키워드` 블록으로 표시한다. 운영 CSS/JS 캐시는 `v=20260605-readerhead1`로 갱신한다.

## 사용자별 학습친화 스타일 제공
- 전문 스타일: 기존 `handled_contents.ko` 사용.
- 쉬운 문장 스타일: 각 Lesson의 `learning_friendly.handled_contents.ko` 사용.
- 작성 원칙: 해당 Lesson만 단독으로 쉽게 쓰지 않고, 같은 Chapter 안의 앞 Lesson/다음 Lesson 또는 다음 Chapter와
  이어지는 흐름을 문장에 포함한다. ABAP 핵심 용어는 유지하되 문장 구조를 짧고 친근하게 만든다.
- fallback: 친화 필드가 없는 경우 기존 `handled_contents.ko`를 표시한다.

## 2-Track 구조 (지향)
- **Track 1 — 개발 이론**: 문법·아키텍처·DDIC·CDS/OData·RAP·Cloud
- **Track 2 — 실무 역량**: OOP·ALV 심화·인터페이스(BDC/BAPI/RFC/IDoc)·Reporting
- 3-depth 모듈화(대섹션 → 토픽 → 학습 단위), 단위마다 실습/주의/성능·보안·운영 팁 지향.

## 화면 디자인 샘플 비교 (docs/roadmap)
세 계열로 프로토타입을 제작해 비교했다(전부 orphan, 인벤토리 → [05 D](05_INVENTORIES.md)).
- **codex 계열**: 검색·난이도 필터·JSON 데이터 분리. v7이 본체 엔진, **v8 sampleA**가 전체화면·와이드 오버레이.
- **claude 계열**: 단일 공유 엔진(`abap-curriculum-explorer`) 위 5개 레이아웃 스킨, 대용량 inline data + fetch 폴백.
- **antigravity 계열**: 본문 디자인·여백 정돈안.

## 선호 후보 (정정)
- **사실상 최신 = `docs/roadmap/abap-curriculum-codex-v8_sampleA-20260602-185021.html`**.
  `abap-curriculum-section-detail.html`이 `data-explorer-href`로 v8을 링크한다.
- ⚠️ **표기 불일치 정정**: 구 문서는 v7 sampleA를, 루트 README는 v8 sampleA를 선호로 적어 어긋났었다.
  본 분석에서 **v8 sampleA로 통일**한다.

## 지향 동작 (선호안 합의 사항)
- 좌측 THEORY 목록(독립 스크롤) → 선택 THEORY 단일 본문 표출(전체 나열 X)
- 상단 Track 탭(sticky, 본문과 비겹침), 검색·난이도 필터 분리
- 우측 Navigation: 문서 목차 + 학습경로 탭 + Scroll Spy + 현재 위치
- 용어 클릭 팝업, 해시 딥링크, 하단 "Chapter 상세 보기"(→ `?section=` 단일 템플릿)
- 데이터는 HTML과 분리(JSON)

## 다음 단계
1. GitHub Pages 정적 로딩 검증(file:// 및 Pages)
2. 운영본 사용성 검토 후 `pages/abap.html`에도 노출할지 결정
3. 나머지 샘플 archive 여부 결정
4. v8 Unification 또는 샘플 asset 정리는 운영본 안정화 후 별도 라운드에서 검토

> 샘플 archive와 asset 정리는 [07 결정·로드맵](07_DECISIONS_AND_ROADMAP.md)과 연동.
