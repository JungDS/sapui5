# archive/tools/20260615 — 일회성 스크립트 보관

> 📅 **보관일: 2026-06-15 11:01 KST**
> 🎯 **목적:** 임무를 완수한 일회성 정리/분석 스크립트를 `tools/`에서 분리 보관(읽기 전용).

`tools/`는 **수명주기**로 정리한다(언어 무관). 재사용 스크립트만 `tools/`에 남기고, 한 번 쓰고 끝난 것은 여기로 옮긴다.

- **`tools/`에 유지(durable)**: `format-abap-code.mjs`(Lesson 코드 포맷터), `build-abap-curriculum.mjs`, `build-curriculum-samples.mjs`, `dev-server.py`(v3 design-choices 로컬 서버).
- **여기 보관(완료된 일회성, 20개)**: `analyze_*`, `audit_v3*`, `fix_*`, `migrate_v3`, `split_*`, `add_standard_headers`, `update_titles`, `verify_v3_all` — v3 샘플 라이브러리 구축/정리 과정에서 사용 후 역할 종료.

읽기 전용. 다시 필요하면 git 이력 또는 여기서 참조하되 수정하지 않는다.
