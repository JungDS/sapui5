# 프로젝트 운영 대시보드 및 지침

## 1. 운영 대시보드

- 최종 수정: 2026-05-29 05:05 KST
- 배포자: 정훈영
- 저장소: https://github.com/JungDS/sapui5
- GitHub Pages: https://jungds.github.io/sapui5/
- 운영 방식: Branch → Pull Request → Review/Merge
- 현재 진행: Stage 7 · 완료 (v5.0 전체 개정 및 메타데이터 정비 완료)
- 현재 작업: 전체 78개 문서 목차 개정 체계 반영, 스태퍼 UI 및 준비 중 UX 적용, 배포자 메타데이터 전역 클렌징

---

### 1.1 인수인계 반영 기준

- 응답과 문서는 한국어로 정중하고 전문적인 강의 스타일을 유지한다.
- SAP 설명은 기본적으로 S/4HANA와 SAP GUI 800 기준으로 작성한다.
- SAP 표준 동작과 아키텍처 의도를 우선 설명하고, 불가피한 추정은 `[ 추정 ]`으로 표시한다.
- RAP 예제나 과제에는 Interface View `ZI_*`와 Projection View `ZC_*`를 함께 제시한다.
- `SSCR`은 Selection Screen 의미로 사용한다.
- HTML 학습자료는 밝고 깔끔한 교재형 디자인을 유지하며, v5.0 기준 문서 내 배포자 정보는 제거한다.

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
