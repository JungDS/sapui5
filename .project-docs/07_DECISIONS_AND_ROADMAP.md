# 07. 미결 결정 · 로드맵 (권고 집약)

구조 변경을 수반하는 항목의 결정·권고를 모은다. 완료분은 "✅ 완료"로 표기한다.

## 결정 1. asset 파일명 + "stage7" de-naming
**배경**: "stage7"은 도메인 개념이 아니라 진행 단계 라벨이다. 셸이 안정·완성된 지금
살아있는 코드의 영구 명칭에 박혀 있는 것은 부적절하다. 단, 실제 수행된 작업 이력 기록에는 유지한다.

| 레이어 | 처리 | 상태 |
|---|---|---|
| asset 파일명 `stage7-shell.css/js` → `shell.css/js` | 90개 참조 HTML/문서 일괄 갱신 | ✅ 완료 (2026-06-05) |
| JS 전역 `window.SAPStage7Shell` → `window.SAPShell` | 정의·참조 일괄 변경 | ✅ 완료 |
| 코어 asset 주석 헤더 부여 | `shell.css/js`, `common.css/js`, `home.css`에 [03 §6] 규칙 적용 | ✅ 완료 |
| **CSS 클래스 `.stage7-*`** | `.shell-*` 등으로 일괄 변경 | ⏸ **보류** (아래 사유) |
| data 파일명(`stage7-operating-docs-map.json`) | 단독 리네임 비권장 | 유지 |
| `.project-docs`·본문 prose의 "Stage 7" | 정당한 작업 이력 기록 | 유지 |

### CSS 클래스 `.stage7-*` 보류 사유 (다음 라운드)
- 규모: HTML ~1,840 + CSS ~300 + JS ~180 occurrences (전 사이트).
- **커리큘럼 샘플 asset과 얽힘**: `.stage7-doc-side-nav` 등이 디자인 동결 중인
  `assets/abap-curriculum-codex-v*.css`에 존재한다. 클래스를 완전히 정리하려면 동결된
  샘플 asset까지 손대야 하므로, **커리큘럼 디자인 확정 + 샘플 asset 통합/리네임 시점에 함께** 수행한다.
- 실행 시 주의: `stage7-operating-docs-map`·`stage7-navigation-data` 등 **data 파일명/버전 문자열은 보호**하고,
  클래스 토큰만 치환. 치환 전후 occurrence 수·JSON 유효성·시각 점검 필수.

## 결정 2. docs/roadmap 샘플 정리안 (다음 라운드 · 제안서)
- 패밀리별 최신만 유지: codex=**v8 sampleA**, claude/antigravity/v5-3는 각 최신 1종.
- 나머지 구버전 샘플 HTML → archive, **동시에 연쇄 미사용 asset**(codex-v1~v6, explorer, codex-samples)도 정리.
- 단, **디자인 최종 확정 전까지 보류**(현재 비교 진행 중). → [06](06_ABAP_CURRICULUM.md)
- [결정 1]의 CSS 클래스 정리와 한 묶음으로 진행하는 것이 효율적.

## 결정 3. pages ↔ docs 이원화 (권고만)
**현황**: 웹페이지가 `pages/`(랜딩 중계)와 `docs/`(본문)로 이원화. 분리하지 않는 편이 나았을지 고민 중.
- **장점(현 구조)**: page-type 분리로 셸 동작·상대경로가 단순, 랜딩/본문 책임 명확.
- **단점**: 한 영역이 두 폴더에 흩어져 추가/이동 시 양쪽 동기화 필요.
- **권고**: 당장 통합하지 말 것. 통합은 상대경로·SSOT·다수 링크에 광범위 영향. asset/클래스 정리를
  마쳐 변경 표면을 줄인 뒤, 별도 라운드에서 통합 여부를 재평가한다.

## 결정 4. sample/ 폴더 위치 (권고만)
**현황**: `docs/roadmap`에서 샘플을 생성·비교 중이고, `sample/`에는 별도 프로토타입이 있다.
- **권고 워크플로**: 신규 디자인 샘플은 `docs/roadmap`(또는 격리된 샘플 경로)에서 생성 →
  **확정본만 운영으로 승격**, 나머지는 archive. `sample/`은 셸과 무관한 순수 프로토타입 전용으로 명확화.
- 본 라운드에서는 실제 이동 없음(기록만).

## 실행 이력
### 라운드 1 — 분석 + 저위험 정리 (2026-06-05)
- `.project-docs` 8문서 신규 작성, 구 00~10 → `archive/project-docs/20260605/`
- `handoff/` → `archive/handoff/`
- `data/` audit JSON 6종 → `archive/data/20260605/` (런타임 참조 0건 검증)
- `tools/` 완료 스크립트 3종 → `archive/tools/20260605/`
- `data/*.json.md` 설명 3종 신규 작성, 루트 `README.md` 링크 갱신

### 라운드 2 — asset 파일명 + global de-naming (2026-06-05)
- `assets/stage7-shell.css/js` → `assets/shell.css/js` (git mv), 90개 참조 일괄 갱신
- `window.SAPStage7Shell` → `window.SAPShell`
- 코어 asset 5종에 주석 헤더 부여, `data/document-catalog.json`의 `assets[]` 갱신
- 잔여: CSS 클래스 `.stage7-*` (결정 1 보류 사유 참조)
