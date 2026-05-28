# SAP Developer Learning Library v3

- 생성일: 2026-05-27
- 배포자: 정훈영
- 운영 방식: GitHub branch + Pull Request 기준
- 배포 주소: https://jungds.github.io/sapui5/
- 저장소: https://github.com/JungDS/sapui5

## Clean Rebuild 기준

이 저장소는 2026-05-28 기준으로 `feature/clean-rebuild-learning-library` 브랜치에서 전체 파일 세트를 다시 구성한다.
기준 배포본은 Stage 5 Navigation 패키지이며, Stage 6에서 상세화한 핵심 문서를 덮어쓴다.

정리 목적은 다음과 같다.

- 잘못 생성된 테스트 파일 제거
- 중복 PR과 브랜치로 인한 상태 혼선 해소
- GitHub Pages 배포 기준을 root `index.html`로 고정
- README를 운영 현황판으로 재정리
- 이후 변경은 PR 단위로 관리

## 웹페이지

- 전체 학습자료 홈: https://jungds.github.io/sapui5/
- 로드맵: https://jungds.github.io/sapui5/pages/roadmap.html
- ABAP 개발: https://jungds.github.io/sapui5/pages/abap.html
- UI5/Fiori 개발: https://jungds.github.io/sapui5/pages/ui5-fiori.html
- SAP 모듈 기초: https://jungds.github.io/sapui5/pages/module-basics.html
- 통합 실습: https://jungds.github.io/sapui5/pages/integrated-practice.html
- Reference/운영: https://jungds.github.io/sapui5/pages/reference.html

## 구조

- `index.html`: 전체 학습자료 첫 화면
- `pages/*.html`: 영역별 Landing Page
- `assets/common.css`: 공통 디자인
- `assets/common.js`: 용어 팝업, 코드 복사, 좌측 Tree Navigation
- `v3/*.html`: 현재 기준 학습 문서
- `v2/*.html`, `v1/*.html`: 이전 버전 보관 문서
- `data/document-catalog.json`: 문서 목록
- `data/site-map.json`: 카테고리와 추천 경로 데이터
- `data/*audit*.json`: 검수 리포트 데이터

## 문체 기준

- 개념 설명: 평서형
- 실습/체크리스트: 지시형
- 강사용 메모: 존칭형
- 주요 콘텐츠 블록은 `data-prose` 기준으로 관리
- 모든 배포 문서 하단에는 `배포자: 정훈영` 표기 유지

## Stage 6 Detail 진행 현황

핵심 문서를 하나씩 상세화한다. 변경사항은 문서 본문과 함께 README에도 반영한다.

### 6-1. SAP 개발자 학습 로드맵

- 대상 문서: `v3/sap-developer-learning-roadmap-v3.html`
- 상태: clean rebuild 세트에 포함
- 반영 내용:
  - SAP 개발 학습의 큰 그림 재정리
  - 데이터 흐름 중심 학습 관점 추가
  - 초급자 권장 학습 순서 확장
  - 목표별 학습 트랙 표 보강
  - 학습 완료 체크리스트 추가
  - 다음 문서 이동 카드 추가

### 6-2. SAP 개발 환경과 도구 입문

- 대상 문서: `v3/sap-development-tools-overview-v3.html`
- 상태: clean rebuild 세트에 포함
- 반영 내용:
  - SAP GUI, ADT, VS Code/BAS, Gateway Client, Browser DevTools 역할 상세화
  - 계층별 문제 확인 관점 추가
  - 개발 흐름별 도구 사용 순서 보강
  - 증상별 첫 확인 도구 선택표 추가
  - 학습 완료 체크리스트 추가

### 6-3. SAP 디버깅 / 트러블슈팅 통합 가이드

- 대상 문서: `v3/sap-debugging-troubleshooting-guide-v3.html`
- 상태: clean rebuild 세트에 포함
- 반영 내용:
  - 디버깅을 범위 축소 과정으로 재정의
  - UI5, OData, ABAP, 데이터/권한, 설정 계층별 오류 판단표 추가
  - 화면 오류 발생 시 표준 점검 순서 추가
  - ABAP Debugger 확인 관점과 체크리스트 보강

### 6-4. Classic ABAP 기본기

- 대상 문서: `v3/abap-classic-report-itab-alv-beginner-v3.html`
- 상태: clean rebuild 세트에 포함
- 반영 내용:
  - Report Program 기본 구조 상세화
  - Selection Screen, PARAMETERS, SELECT-OPTIONS 설명 보강
  - Internal Table, Work Area, Structure 차이 정리
  - Open SQL 기본 조회 예시 추가
  - LOOP, READ, MODIFY, APPEND 처리 흐름 정리
  - ALV 출력 예시와 초급자 실수 정리

## 다음 상세화 후보

- 6-5. `v3/sap-cds-to-odata-beginner-guide-v3.html`
- 6-6. `v3/sap-gateway-odata-v2-crud-beginner-guide-v3.html`
- 6-7. `v3/sap-rap-end-to-end-beginner-guide-v3.html`
- 6-8. `v3/sapui5-controller-function-intro-v3.html`
- 6-9. `v3/fiori-elements-annotation-practice-v3.html`

## 운영 원칙

앞으로 큰 변경은 다음 흐름으로 진행한다.

```text
작업 브랜치 생성
→ 문서/코드 수정
→ README 변경사항 반영
→ fallback ZIP 생성
→ Pull Request 생성
→ 리뷰 후 main 병합
```

GitHub API timeout, 확인 버튼 누락, 업로드 실패가 발생하면 같은 변경분을 수동 반영 가능한 ZIP으로 남긴다.
