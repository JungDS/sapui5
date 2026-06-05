# site-map.json 설명

> JSON은 주석을 담지 못하므로 이 md로 역할·구조·관리 규칙을 설명한다.
> 최종 정리: 2026-06-05 KST

## 역할
사이트 내비게이션의 **카테고리 정의 + 문서 목록**을 담는 데이터. 6개 학습 영역
(roadmap / abap / ui5 / module / practice / reference)의 제목·아이콘·랜딩 페이지·설명과,
각 문서의 표시명·경로를 기술한다.

## 구조 요약
- `version`, `created`, `distributor` : 메타데이터
- `categories.<id>` : `title`, `icon`, `page`, `description`, `home_desc`
- (이하) 문서별 항목 : 표시명, `href`, `legacy_href` 등

## 관리 규칙 (중요)
- **SSOT는 `assets/shell.js`의 `DOCS`** 이다. 이 JSON은 보조 카탈로그로,
  문서 추가/경로 변경 시 `shell.js`, `document-catalog.json`과 **수동 동기화**가 필요하다.
  (자세한 함정은 [04_PITFALLS.md](../.project-docs/04_PITFALLS.md) 참조)
- 경로는 루트 기준 상대경로(`docs/...`, `pages/...`)로 기록한다.
- 검증 도구: `tools/build-curriculum-samples.mjs` 등은 `reference/`를 읽고, 이 파일은
  과거 `stage7-update-abap-catalog-paths.mjs`(현재 archive)가 갱신했다.
