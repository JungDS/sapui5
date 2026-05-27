# SAP Developer Learning Library v3

- 생성일: 2026-05-27
- 배포자: 정훈영
- 문서 수: 37개

## 사용 방법
압축을 해제한 뒤 `index.html`을 브라우저에서 여세요.

## 구조
- `assets/common.css`: 공통 디자인
- `assets/common.js`: 용어 팝업, 코드 복사, 실습 로직
- `v3/*.html`: v3 학습 문서
- `data/document-catalog.json`: 문서 목록


## 문체 기준
- 개념 설명: 평서형
- 실습/체크리스트: 지시형
- 강사용 메모: 존칭형
- 배포자: 정훈영


## Final 검수
- 링크/앵커 검수
- 공통 CSS/JS 참조 검수
- data-prose 필수 구조 검수
- 문체 후보 검수
- 푸터/배포자 표기 검수
- 최종 리포트: `v3/final-audit-report-v3.html`
- JSON 리포트: `data/final-audit-report.json`


## Stage 5 Navigation
- `index.html`: 큰 학습 영역만 보여주는 초급자용 첫 화면
- `pages/*.html`: 영역별 Landing Page
- `assets/common.js`: 좌측 Tree Navigation 자동 렌더링
- `data/site-map.json`: 문서/영역/추천 경로 데이터
- `v3/stage5-navigation-audit.html`: Stage 5 구조 검수 리포트
