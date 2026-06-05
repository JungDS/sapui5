# 06. ABAP 커리큘럼

현재 가장 많은 변경이 발생하는 활성 영역. 다양한 디자인 샘플을 비교 중이며 최종 디자인 미확정.

## 원천 데이터
- 핵심 참고자료: `reference/abap_curriculum_v5_3_20260602_010000.json` (런타임 fetch 대상),
  `reference/abap_curriculum_v5_3.md`, `reference/TRACK1/`.
- 생성 도구: `tools/build-abap-curriculum.mjs`, `tools/build-curriculum-samples.mjs`.

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

## 다음 단계 (배포 전 결정 사항)
1. 최종 샘플 1종 확정(v8 sampleA 유력)
2. 데이터 출처 확정(`reference/*.json` fetch 방식 유지 여부)
3. GitHub Pages 정적 로딩 검증(file:// 및 Pages)
4. 노출 위치 결정: `pages/roadmap.html` vs `pages/abap.html` vs 신규 랜딩
5. 확정 후: 나머지 샘플 archive, 선호본을 운영 파일명으로 승격
6. v8 Unification(단일 엔진 + HTML 모드 토글)로 파편화된 codex-v* asset 통합 검토

> 위 4·5·6은 [07 결정·로드맵](07_DECISIONS_AND_ROADMAP.md)과 연동.
