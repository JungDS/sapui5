# .project-docs 인덱스

SAP Developer Learning Library 운영 분석 문서. 2026-06-09 18:11 기준으로 **최신화 갱신**했다.
(구 00~10 문서는 `archive/project-docs/20260605/`에 원본 보존)

## 문서 지도

| 문서 | 역할 |
|---|---|
| [01_OVERVIEW.md](01_OVERVIEW.md) | 프로젝트 정체성·현재 단계·배포/스택·미결 과제 한눈 요약 |
| [02_ARCHITECTURE.md](02_ARCHITECTURE.md) | 폴더 역할 + 파일 배치 규칙 + 셸(Shell) 동작 원리 |
| [03_CONVENTIONS.md](03_CONVENTIONS.md) | 네이밍·메타데이터·archive·버전 규칙 + 신규 컨벤션(asset 주석 헤더, data md) |
| [04_PITFALLS.md](04_PITFALLS.md) | 자주 깨지는 지점과 함정 |
| [05_INVENTORIES.md](05_INVENTORIES.md) | 증거 기반 인벤토리: asset 의존 맵 / data JSON / 로드맵 샘플 계보 |
| [06_ABAP_CURRICULUM.md](06_ABAP_CURRICULUM.md) | ABAP 커리큘럼 2-Track 구조·샘플 계보·선호 후보·다음 단계 |
| [07_DECISIONS_AND_ROADMAP.md](07_DECISIONS_AND_ROADMAP.md) | 미결 결정·권고 집약(이원화, sample 폴더, stage7 de-naming, 리네임 제안) |

## 권장 읽기 순서
처음이면 **01 → 02 → 03 → 04**로 운영 기준을 잡고, 작업 영역에 따라 05(정리·인벤토리),
06(커리큘럼), 07(구조 결정)을 참조한다.

## 설계 원칙 (이번 재작성)
- 역할 1:1 분리, 중복 제거 (구 11개 → 8개)
- 증거 기반 인벤토리(05)와 미결 결정(07)을 독립 문서로 분리
- PR/이력 전용 문서는 두지 않음 — git 로그와 루트 `README.md`가 담당
