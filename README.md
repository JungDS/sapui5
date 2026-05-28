# SAP Developer Learning Library v3

## 운영 대시보드

- 최종 수정: 2026-05-28 11:07 KST
- 배포자: 정훈영
- 저장소: https://github.com/JungDS/sapui5
- GitHub Pages: https://jungds.github.io/sapui5/
- 운영 방식: Branch → Pull Request → Review/Merge
- 현재 진행: Stage 6 상세화
- 현재 PR: #12 `Stage 6: Gateway OData V2 CRUD 입문 상세화 및 README 운영 대시보드 재작성`

---

## 최근 수정 페이지

| 구분 | 문서 | 수정 후 웹페이지 | 수정 전 웹페이지 | PR |
|---|---|---|---|---|
| 진행 중 | Gateway / OData V2 CRUD 입문 | https://jungds.github.io/sapui5/v3/01-abap/sap-gateway-odata-v2-crud-beginner-guide-v3.html | https://jungds.github.io/sapui5/archive/before/stage6-6-gateway-odata-v2-crud-before.html | https://github.com/JungDS/sapui5/pull/12 |
| 완료 | CDS View에서 OData 노출까지 | https://jungds.github.io/sapui5/v3/01-abap/sap-cds-to-odata-beginner-guide-v3.html | https://jungds.github.io/sapui5/archive/before/stage6-5-cds-to-odata-before.html | https://github.com/JungDS/sapui5/pull/10 |
| 완료 | 홈 화면 | https://jungds.github.io/sapui5/ | https://jungds.github.io/sapui5/archive/before/stage7-1-index-home-layout-before.html | https://github.com/JungDS/sapui5/pull/7 |

> 수정 전 페이지는 소스 보기 링크가 아니라 GitHub Pages에서 직접 열리는 비교용 HTML로 보관한다. 비교용 HTML은 `archive/before/` 아래에 두며, 일반 `index.html` Navigation에서는 노출하지 않는다.

---

## 웹페이지 입구

- 전체 학습자료 홈: https://jungds.github.io/sapui5/
- 로드맵: https://jungds.github.io/sapui5/pages/roadmap.html
- ABAP 개발: https://jungds.github.io/sapui5/pages/abap.html
- UI5/Fiori 개발: https://jungds.github.io/sapui5/pages/ui5-fiori.html
- SAP 모듈 기초: https://jungds.github.io/sapui5/pages/module-basics.html
- 통합 실습: https://jungds.github.io/sapui5/pages/integrated-practice.html
- Reference/운영: https://jungds.github.io/sapui5/pages/reference.html

---

## 저장소 구조

```text
index.html
pages/
  roadmap.html
  abap.html
  ui5-fiori.html
  module-basics.html
  integrated-practice.html
  reference.html
assets/
  common.css
  common.js
data/
  document-catalog.json
  site-map.json
  *audit*.json
archive/
  before/
    stage*-before.html
v3/
  00-roadmap/
  01-abap/
  02-ui5-fiori/
  03-module-basics/
  04-integrated-practice/
  99-reference/
v2/
v1/
```

### 구조 기준

- `index.html`은 전체 학습자료 첫 화면이다.
- `pages/*.html`은 영역별 Landing Page다.
- `v3/` 하위 폴더는 현재 운영 기준 문서다.
- `archive/before/`는 수정 전 화면 비교용 HTML 보관 위치다.
- `archive/before/`의 문서는 README에서만 링크하고, 일반 Navigation에서는 노출하지 않는다.
- `v1/`, `v2/`는 이전 버전 보관용이다.
- 문서가 하위 폴더로 이동하면 CSS/JS 상대 경로를 함께 수정한다.
- 현재 `data/site-map.json`은 실제 Navigation 기준 데이터다.
- `data/document-catalog.json`은 후속 정비에서 `href/path` 필드 기준으로 보강한다.

---

## 문체 기준

| 영역 | 문체 | 기준 |
|---|---|---|
| 개념 설명 | 평서형 | 표준 개념과 구조를 설명한다. |
| 실습 절차 | 지시형 | 학습자가 따라 할 수 있게 단계적으로 작성한다. |
| 체크리스트 | 지시형 / 확인형 | 완료 조건을 명확히 적는다. |
| 강사용 메모 | 존칭형 | 강의 진행 관점의 보충 설명을 적는다. |
| 경고 / 주의 | 단정형 | 실무 위험과 오해를 명확히 적는다. |

모든 주요 콘텐츠 블록에는 가능한 한 `data-prose`를 유지한다.
모든 배포 문서 하단에는 `배포자: 정훈영` 표기를 유지한다.

---

## Stage 6 진행 현황

| 단계 | 문서 | 상태 | PR | 현재 경로 |
|---|---|---|---|---|
| 6-1 | SAP 개발자 학습 로드맵 | 완료 | #2 | `v3/00-roadmap/sap-developer-learning-roadmap-v3.html` |
| 6-2 | SAP 개발 환경과 도구 입문 | 완료 | #3 | `v3/00-roadmap/sap-development-tools-overview-v3.html` |
| 6-3 | SAP 디버깅 / 트러블슈팅 통합 가이드 | 완료 | #4 | `v3/00-roadmap/sap-debugging-troubleshooting-guide-v3.html` |
| 6-4 | Classic ABAP 기본기 | 완료 | Clean Rebuild | `v3/01-abap/abap-classic-report-itab-alv-beginner-v3.html` |
| 6-5 | CDS View에서 OData 노출까지 | 완료 | #10 | `v3/01-abap/sap-cds-to-odata-beginner-guide-v3.html` |
| 6-6 | Gateway / OData V2 CRUD 입문 | PR 진행 중 | #12 | `v3/01-abap/sap-gateway-odata-v2-crud-beginner-guide-v3.html` |

### 다음 상세화 후보

| 우선순위 | 문서 | 경로 |
|---|---|---|
| 6-7 | RAP End-to-End 입문 | `v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html` |
| 6-8 | SAPUI5 Controller 함수 문법 입문 | `v3/02-ui5-fiori/sapui5-controller-function-intro-v3.html` |
| 6-9 | Fiori Elements Annotation Practice | `v3/02-ui5-fiori/fiori-elements-annotation-practice-v3.html` |
| 6-10 | SAPUI5 OData Model과 CRUD 입문 | `v3/02-ui5-fiori/sapui5-odata-model-crud-beginner-guide-v3.html` |

---

## 변경 기록 작성 규칙

새 PR을 만들 때 README의 아래 항목을 반드시 갱신한다.

1. `최종 수정` 날짜와 시간은 KST 기준으로 작성한다.
2. `현재 진행`과 `현재 PR`을 최신 상태로 바꾼다.
3. 변경 대상 문서의 수정 전 HTML을 `archive/before/` 아래에 보관한다.
4. 수정 전 HTML 파일명은 `stage<단계>-<문서키>-before.html` 형식을 사용한다.
5. `최근 수정 페이지` 표에는 수정 후 웹페이지와 수정 전 웹페이지를 모두 `https://jungds.github.io/sapui5/...` 링크로 기록한다.
6. 수정 전 웹페이지는 일반 Navigation에 넣지 않는다.
7. `Stage 6 진행 현황`의 상태와 PR 번호를 최신화한다.
8. 새 문서가 추가되거나 이동되면 `저장소 구조`와 `현재 경로`를 갱신한다.
9. 문서 footer의 `배포자: 정훈영` 표기를 확인한다.

---

## 운영 원칙

```text
작업 브랜치 생성
→ 수정 전 HTML을 archive/before에 보관
→ 문서/코드 수정
→ README 변경사항 반영
→ fallback ZIP 생성
→ Pull Request 생성
→ 리뷰 후 main 병합
→ README의 진행 현황 최신화
```

### Pull Request 기준

- PR 제목과 본문은 한국어로 작성한다.
- 의미 있는 변경은 main 직접 수정 대신 PR로 처리한다.
- PR 본문에는 작업 개요, 변경 내용, 확인 포인트를 작성한다.
- 문서 상세화 PR은 가능하면 한 문서 단위로 작게 유지한다.
- 대량 이동, 구조 변경, clean rebuild는 별도 PR로 분리한다.

### 링크 기준

- 배포 링크는 GitHub Pages URL을 사용한다.
- 수정 전 비교 페이지도 GitHub Pages URL을 사용한다.
- 수정 전 HTML은 `archive/before/` 아래에 보관한다.
- GitHub blob URL은 내부 검수용으로만 사용하고, README의 비교 링크로 사용하지 않는다.
- 하위 폴더 문서에서는 `../../assets/common.css`, `../../assets/common.js`를 사용한다.
- 같은 폴더 내 문서 링크는 파일명만 사용한다.
- 다른 영역 문서 링크는 상대 경로를 명확히 작성한다.

### 오류 / timeout 대응

- GitHub 도구 timeout이나 확인 버튼 누락이 발생하면 같은 변경분을 수동 반영 가능한 ZIP으로 남긴다.
- ZIP에는 변경 파일, 삭제 파일 목록, 수동 적용 안내 문서를 포함한다.
- 불확실한 상태에서는 main에 추가 변경을 진행하지 말고, 먼저 GitHub 상태를 검수한다.

### 채팅방이 없어졌을 때의 재개 기준

이 README를 먼저 읽고 다음 순서로 재개한다.

1. 최신 main commit을 확인한다.
2. 열린 PR이 있는지 확인한다.
3. `현재 진행`과 `Stage 6 진행 현황`을 확인한다.
4. 최근 수정 페이지의 수정 후 웹페이지와 수정 전 웹페이지를 비교한다.
5. 다음 상세화 후보 중 가장 앞선 문서를 대상으로 새 브랜치를 만든다.
6. 작업 후 README를 먼저 갱신한 뒤 PR을 만든다.

---

## 현재 메모

- `v3` 루트 HTML 중복 파일은 제거된 상태다.
- `v3/` 문서는 영역별 하위 폴더 기준으로 관리한다.
- `archive/before/`는 README 비교용 이전 화면 보관 위치다.
- `data/site-map.json`은 새 하위 폴더 경로를 사용한다.
- `data/document-catalog.json`은 후속 데이터 정비 PR에서 경로 필드 보강이 필요하다.
