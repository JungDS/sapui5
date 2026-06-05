# stage7-operating-docs-map.json 설명

> JSON은 주석을 담지 못하므로 이 md로 역할·구조·관리 규칙을 설명한다.
> 최종 정리: 2026-06-05 KST

## 역할
Stage 7 운영화 과정에서 **legacy v3 문서 ↔ 최신 docs 운영본**의 1:1 매핑을 관리하는 이력 데이터.
각 문서의 운영 경로/legacy 경로/archive 경로, 전환 PR 번호, 전환 메모를 기록한다.

## 구조 요약
- `version`, `updated_at`, `distributor`, `description`
- `documents.<doc-id>` : `title`, `category`, `status`(operating),
  `operating_path`, `operating_href_from_root`, `operating_href_from_pages`,
  `legacy_path`, `archive_path`, `source_pr`, `navigation_pr`, `version`, `updated_at`, `note`
- `next_actions[]`, `notes[]` : 남은 작업·정책 메모

## 관리 규칙
- 이 파일은 **마이그레이션 이력 기록**이 주 목적이다. 신규 문서의 런타임 내비게이션에는 쓰이지 않으며,
  내비게이션 SSOT는 `assets/shell.js`의 `DOCS`이다.
- 파일명에 "stage7"이 들어있으나, 이는 **실제로 수행된 Stage 7 작업의 역사 기록**이므로 유지한다
  (살아있는 코드 명칭과 달리 리네임 대상 아님 — [07_DECISIONS_AND_ROADMAP.md](../.project-docs/07_DECISIONS_AND_ROADMAP.md) 참조).
