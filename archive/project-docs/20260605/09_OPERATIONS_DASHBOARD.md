# 프로젝트 운영 대시보드 및 지침

## 1. 운영 대시보드

- 최종 수정: 2026-06-02 17:45 KST
- 배포자: 정훈영
- 저장소: https://github.com/JungDS/sapui5
- GitHub Pages: https://jungds.github.io/sapui5/
- 운영 방식: Branch → Pull Request → Review/Merge
- 현재 진행: Stage 7 · 완료 이후 ABAP 커리큘럼 UI 샘플 검토
- 현재 작업: 신규 ABAP 커리큘럼 2-Track 화면 샘플 제작, 좌측 THEORY 선택형 본문, Navigation 학습 목차, Scroll Spy, 용어 팝업, JSON 데이터 분리 구조 검토

---

### 1.1 인수인계 반영 기준

- 응답과 문서는 한국어로 정중하고 전문적인 강의 스타일을 유지한다.
- SAP 설명은 기본적으로 S/4HANA와 SAP GUI 800 기준으로 작성한다.
- SAP 표준 동작과 아키텍처 의도를 우선 설명하고, 불가피한 추정은 `[ 추정 ]`으로 표시한다.
- RAP 예제나 과제에는 Interface View `ZI_*`와 Projection View `ZC_*`를 함께 제시한다.
- `SSCR`은 Selection Screen 의미로 사용한다.
- HTML 학습자료는 밝고 깔끔한 교재형 디자인을 유지하며, v5.0 기준 문서 내 배포자 정보는 제거한다.
- ABAP 커리큘럼 샘플은 `abap-curriculum-codex-v#_sample#-yyyymmdd-hhmmss.html` 형식을 기본으로 관리한다.
- 동일 버전에서 여러 방향을 비교할 때 sample 번호 또는 알파벳을 사용하되, 후속 요청으로 새 묶음을 만들 때는 v 번호를 1씩 증가시킨다.
- 현재 선호안은 `docs/roadmap/abap-curriculum-codex-v7_sampleA-20260602-165628.html`이며, 운영 반영 전까지는 샘플 문서로 취급한다.

---

## 1.2 ABAP 커리큘럼 샘플 현황

- 목적: 기존 ABAP 요약 로드맵을 2-Track 기반 커리큘럼 화면으로 전환할 수 있는지 검토한다.
- 핵심 구조: 상단 Track 탭, 좌측 THEORY 목록, 우측 또는 Navigation 패널의 학습 목차, 중앙 상세 본문.
- 최종 선호 방향: v7 sampleA의 깔끔한 교재형 디자인을 기반으로 하되, Claude 샘플의 상세 설명/용어 팝업/Navigation 목차와 Codex 샘플의 검색/JSON 데이터 분리 장점을 결합한다.
- 현재 보정 사항: 좌측 THEORY 클릭 시 본문에는 해당 THEORY만 출력한다. Track 탭은 스크롤 중 유지하되 본문을 가리지 않도록 sticky 범위를 Track 영역으로 축소한다. 좌측 패널 스크롤은 본문 스크롤로 전파되지 않게 처리한다.
- 운영 전환 전 확인할 점: 최종 샘플 1개 확정, `docs/roadmap/abap-curriculum-data.js` 또는 별도 JSON 데이터 구조 확정, GitHub Pages 정적 로딩 방식 확인, 기존 로드맵/ABAP 랜딩과 연결 범위 결정.

---


## 11. 현재 운영 링크

- 전체 학습자료 홈: https://jungds.github.io/sapui5/
- 로드맵: https://jungds.github.io/sapui5/pages/roadmap.html
- ABAP 개발: https://jungds.github.io/sapui5/pages/abap.html
- UI5/Fiori 개발: https://jungds.github.io/sapui5/pages/ui5-fiori.html
- SAP 모듈 기초: https://jungds.github.io/sapui5/pages/module-basics.html
- 통합 실습: https://jungds.github.io/sapui5/pages/integrated-practice.html
- Reference/운영: https://jungds.github.io/sapui5/pages/reference.html
- Gateway docs 전환본: https://jungds.github.io/sapui5/docs/abap/gateway-odata-v2-crud.html
- Classic ABAP docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-classic-report-itab-alv.html
- ABAP New Syntax docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-new-syntax.html
- CDS to OData docs 전환본: https://jungds.github.io/sapui5/docs/abap/cds-to-odata.html
- RAP End-to-End docs 전환본: https://jungds.github.io/sapui5/docs/abap/rap-end-to-end.html
- RAP Action docs 전환본: https://jungds.github.io/sapui5/docs/abap/rap-action.html
- ABAP Cloud docs 전환본: https://jungds.github.io/sapui5/docs/abap/abap-cloud.html
- SAP 모듈 기초 docs 전환본: https://jungds.github.io/sapui5/docs/module/module-basics-for-developers.html
- Flight Model docs 전환본: https://jungds.github.io/sapui5/docs/practice/flight-model-table-guide.html
- Flight 통합 실습 docs 전환본: https://jungds.github.io/sapui5/docs/practice/flight-integrated-practice.html
- UI5/Fiori docs 전환본: https://jungds.github.io/sapui5/docs/ui5/sapui5-controller-function-intro.html
- 로드맵 docs 전환본: https://jungds.github.io/sapui5/docs/roadmap/developer-learning-roadmap.html

---


## 12. 문체 기준

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


## 14. 채팅방이 없어졌을 때의 재개 기준

이 README_ALL을 먼저 읽고 다음 순서로 재개한다.

1. 최신 main commit을 확인한다.
2. 열린 PR이 있는지 확인한다.
3. `README.md`의 현재 진행과 현재 PR을 확인한다.
4. 진행 중 PR이 있으면 해당 PR의 변경 파일과 검증 결과를 확인한다.
5. 열린 PR이 없으면 `data/site-map.json`, `data/document-catalog.json`의 ABAP 핵심 문서 경로 갱신을 이어서 진행한다.
6. 이후 다음 v3 문서 묶음을 docs로 운영화한다.
