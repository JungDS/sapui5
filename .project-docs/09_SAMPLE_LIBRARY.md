# 09. SAMPLE LIBRARY — 외부 샘플·v4 정책

> 📅 **최종수정: 2026-06-19 23:30 KST**
> 🎯 **목적:** 외부 샘플 경로, 프로젝트 복사 필요성, v4 생성 원칙만 정한다.
> 📖 **읽을 때:** 샘플 파일을 어디서 읽을지, 프로젝트 안으로 복사할지, v4를 만들지 판단할 때.
> ⚡ **TL;DR:**
> - 샘플 선택은 [06_LEARNING_METHODS.md](06_LEARNING_METHODS.md)가 단일 SSOT다.
> - 외부 메인 샘플 경로는 `C:\ui5\study\sap-dev-academy\sample`이다.
> - 외부 샘플은 직접 읽을 수 있지만, 장기 표준은 선별 v4로 프로젝트 안에 고정하는 편이 좋다.
> - `sample/learning-methods`, `sample/learning-methods-v2`, `sample/learning-methods-v3`는 archive/fallback 성격으로 보관한다.

## 1. 외부 경로 사용

현재 로컬 환경에서는 `C:\ui5\study\sap-dev-academy\sample`을 직접 참고할 수 있다. 다만 외부 절대경로만 기준으로 삼으면 다른 실행 환경이나 GitHub 리뷰에서 재현성이 떨어진다.

| 용도 | 처리 |
|---|---|
| 즉시 분석·아이디어 참고 | 외부 경로를 직접 읽는다. |
| 반복 사용할 표준 샘플 | `sample/learning-methods-v4`로 선별 복사한다. |
| 외부 샘플 전체 복사 | 하지 않는다. 폐기 시안과 데모 셸까지 들어와 노이즈가 커진다. |

## 2. v4 생성 원칙

v4는 만드는 편이 좋다. 단, 전체 복사가 아니라 Lesson 리빌딩에 반복 사용될 샘플만 선별한다.

| 단계 | 기준 |
|---|---|
| 선별 | [06](06_LEARNING_METHODS.md)의 상황별 추천표에서 자주 쓰는 샘플만 고른다. |
| 복사 | 원본 경로와 선택 이유를 `sample/learning-methods-v4/MANIFEST.md`에 기록한다. |
| 실험 | v4 standalone 파일은 인라인 CSS/JS를 허용한다. |
| 운영 이식 | Lesson fragment로 옮길 때 공통 `abap-lesson-viewer.css/js`로 분리한다. |
| 검증 | 샘플 카탈로그, 대표 Lesson 1개, 모바일 폭에서 콘솔/인터랙션을 확인한다. |

## 3. archive/fallback 정책

- `sample/learning-methods`, `sample/learning-methods-v2`: 새 Lesson 개발 기준으로 쓰지 않는다.
- `sample/learning-methods-v3`: Academy 샘플과 v4에 맞는 항목이 없을 때만 fallback으로 쓴다.
- 물리 이동이나 삭제는 별도 정리 작업에서 매핑 매니페스트를 남기고 처리한다.
