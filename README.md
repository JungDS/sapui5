# SAP Developer Learning Library v3

- 생성일: 2026-05-27
- 배포자: 정훈영
- 문서 수: 37개
- 운영 방식: GitHub branch + Pull Request 기준

## 웹페이지

- GitHub Pages: https://jungds.github.io/sapui5/
- Repository: https://github.com/JungDS/sapui5

## 사용 방법

GitHub Pages가 활성화되어 있으면 위 웹페이지 링크로 접속한다.
로컬에서 확인할 때는 저장소를 내려받은 뒤 root의 `index.html`을 브라우저에서 연다.

```bash
git clone https://github.com/JungDS/sapui5.git
cd sapui5
# index.html을 브라우저에서 열어 확인
```

## 구조

- `index.html`: 큰 학습 영역만 보여주는 초급자용 첫 화면
- `pages/*.html`: 영역별 Landing Page
- `assets/common.css`: 공통 디자인
- `assets/common.js`: 용어 팝업, 코드 복사, 실습 로직, 좌측 Tree Navigation
- `v3/*.html`: v3 학습 문서
- `data/document-catalog.json`: 문서 목록
- `data/site-map.json`: 문서/영역/추천 경로 데이터

## 문체 기준

- 개념 설명: 평서형
- 실습/체크리스트: 지시형
- 강사용 메모: 존칭형
- 모든 주요 콘텐츠 블록은 `data-prose`를 기준으로 관리한다.
- 배포자: 정훈영

## Final 검수

- 링크/앵커 검수
- 공통 CSS/JS 참조 검수
- `data-prose` 필수 구조 검수
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

## Stage 6 Detail

핵심 문서를 하나씩 상세화한다. 변경사항은 문서 본문과 함께 이 README에도 꾸준히 반영한다.

### 6-1. SAP 개발자 학습 로드맵

- 대상 문서: `v3/sap-developer-learning-roadmap-v3.html`
- 반영 PR: `#2 Stage 6: expand SAP developer learning roadmap`
- 상태: main 반영 완료
- 반영 내용:
  - 학습 관점 섹션 추가
  - 초급자 권장 학습 순서 확장
  - 목표별 학습 트랙 표 보강
  - 학습 완료 체크리스트 추가
  - 다음 문서 이동 카드 추가
  - `data-prose` 기준 유지 및 문체 정리

### 6-2. SAP 개발 환경과 도구 입문

- 대상 문서: `v3/sap-development-tools-overview-v3.html`
- 작업 브랜치: `feature/stage6-tools-detail`
- 상태: PR 준비 중
- 반영 내용:
  - SAP GUI, ADT, VS Code/BAS, Gateway Client, Browser DevTools 역할 상세화
  - 계층별 문제 확인 관점 추가
  - 개발 흐름별 도구 사용 순서 확장
  - 증상별 첫 확인 도구 선택표 추가
  - 초급자가 자주 헷갈리는 지점 보강
  - 학습 완료 체크리스트 추가
  - 다음 문서 이동 카드 추가
  - `data-prose` 기준 문체 정리

## 다음 상세화 후보

- `v3/sap-debugging-troubleshooting-guide-v3.html`
- `v3/abap-classic-report-itab-alv-beginner-v3.html`
- `v3/sap-cds-to-odata-beginner-guide-v3.html`
- `v3/sap-gateway-odata-v2-crud-beginner-guide-v3.html`
- `v3/sap-rap-end-to-end-beginner-guide-v3.html`

## 운영 원칙

앞으로 큰 변경은 다음 흐름으로 진행한다.

```text
작업 브랜치 생성
→ 문서/코드 수정
→ README 변경사항 반영
→ 검수
→ Pull Request 생성
→ 리뷰 후 main 병합
```

가벼운 오타 수정도 가능하면 PR 방식으로 진행한다.
