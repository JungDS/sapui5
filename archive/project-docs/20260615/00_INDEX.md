# .project-docs 인덱스

> 📅 **최종수정: 2026-06-15 KST**

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
| [08_DEV_DIARY.md](08_DEV_DIARY.md) | 개발 일지 — 일자별 changelog 링크 모음 |
| [09_IMAGE_ASSETS_RULE.md](09_IMAGE_ASSETS_RULE.md) | 이미지 자산 명명·보관·삽입 규칙 |
| [10_LEARNING_CONTENT_METHODS.md](10_LEARNING_CONTENT_METHODS.md) | Lesson 학습 수단 카탈로그 — 다이어그램·Sandbox·퀴즈·인터랙션 선택 기준 |
| [진행계획/](진행계획/) | GUID 단위 실행 계획·태스크·런로그 보관 폴더 |
| [99_AI_SYNC.md](99_AI_SYNC.md) | **AI 인계 허브** — 여러 AI 공유 현황/미결/Work Log (작업 시작 시 1순위 정독) |
| [HANDOFF_LESSON_CONTENT.md](HANDOFF_LESSON_CONTENT.md) | ABAP Lesson 본문 양산 인계서 — 작성 규칙·진행표·복붙 프롬프트 |
| [TRACK1_QUALITY_PLAN.md](TRACK1_QUALITY_PLAN.md) | Track 1 Lesson 고품질화 성공 기준·감사 결과·Chapter별 실행 계획 |
| [changelogs/](changelogs/) | 일자별 개발 상세 일지(CHANGELOG_YYYYMMDD.md) |

## 권장 읽기 순서
처음이면 **99(AI 인계 허브) → 01 → 02 → 03 → 04**로 현재 상태와 운영 기준을 잡고, 작업 영역에 따라
05(정리·인벤토리), 06(커리큘럼·Lesson 양산), 07(구조 결정), HANDOFF(Lesson 작성)를 참조한다.
Track 1 Lesson 품질 고도화 작업은 [TRACK1_QUALITY_PLAN.md](TRACK1_QUALITY_PLAN.md)를 함께 읽는다.
Lesson 초안 생성 시 텍스트 설명을 넘어선 학습 수단 선택은 [10_LEARNING_CONTENT_METHODS.md](10_LEARNING_CONTENT_METHODS.md)를 함께 읽는다.
학습 수단을 실제 화면 샘플로 확인해야 하면 [진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/PLAN.md](진행계획/4c8b81b0-9779-4e78-98e6-7965479a2b94/PLAN.md)와 `sample/learning-methods/README.md`를 함께 확인한다.

## 설계 원칙 (이번 재작성)
- 역할 1:1 분리, 중복 제거 (구 11개 → 8개)
- 증거 기반 인벤토리(05)와 미결 결정(07)을 독립 문서로 분리
- PR/이력 전용 문서는 두지 않음 — git 로그와 루트 `README.md`가 담당
