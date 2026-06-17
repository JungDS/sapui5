# document-catalog.json 설명

> JSON은 주석을 담지 못하므로 이 md로 역할·구조·관리 규칙을 설명한다.
> 최종 정리: 2026-06-15 11:01 KST

## 역할
운영 문서 전체 **카탈로그**. 문서 수(`document_count`), 공통 asset 목록,
Stage 7 운영 계약(page type, 필수 body 필드, canonical alias) 등 사이트 전역 메타를 담는다.

## 구조 요약
- `version`, `updated`, `distributor`, `document_count`
- `assets[]` : 모든 운영 문서가 공유하는 공통 CSS/JS
- `stage7` : `operating_root`(docs), `legacy_root`(v3), `canonical_aliases`,
  `shell_contract`(page_types, required_body_fields)
- (이하) 문서별 항목 : id, 표시명, `href`, `path`, `legacyHref`

## 관리 규칙 (중요)
- **SSOT는 `assets/shell.js`의 `DOCS`**. 이 파일은 보조 카탈로그이며 수동 동기화 대상.
- `document_count`는 실제 운영 문서 수와 어긋날 수 있으므로 신뢰 시 `shell.js`의
  `DOCS`(preparing 제외)를 기준으로 재확인한다.
- `assets[]`의 `stage7-shell.*`는 다음 라운드에서 `shell.*`로 리네임 예정
  (stage7 명칭 정리 현황 → [05_PITFALLS.md](../.project-docs/05_PITFALLS.md) P10). 리네임 시 이 목록도 갱신 필요.
