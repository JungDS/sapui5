# 개발 일지 - 2026-06-10

> 📅 **최종수정: 2026-06-10 10:05 KST**

## 참여 AI
- **Claude (Opus 4.8)**
- **Antigravity IDE (Gemini 3.1 Pro)**

## 작업 상세 내용

### Claude — ABAP Track 1 완성 (THEORY-19 ~ 21)
- `THEORY-19`(SALV / Grid ALV 표시 제어 심화, M01~M07): SALV Sort/Filter/Functions, Layout/Variant, Grid Column 제어, Deep Structure 기반 Cell Color(LVC_T_SCOL/ctab_fname)·Cell Style(LVC_T_STYL/stylefname), Row/Column/Cell 색상 선택 기준, Stable Refresh.
- `THEORY-20`(CDS View Entity 기초, M01~M06): View Entity(DDL), Interface(ZI_)/Projection(ZC_) 2계층, Association, Annotation, Metadata Extension, DCL/Access Control.
- `THEORY-21`(RAP / ABAP Cloud 입문, M01~M08): RAP 4단 구조, ZI_/ZC_ RAP 설계, Behavior Definition/Implementation, Service Definition/Binding, Validation/Determination/Action, ABAP Cloud·Released API·Clean Core.
- 🎉 **Track 1(THEORY-01~21) 137/137 작성 완료.** 글로서리 총 348개 용어, 전체 137개 Lesson 미정의 0건 최종 검증.
- ⚠️ THEORY-19~21 코드블록은 표준 `<pre><code>` → 네이비 Editor 멱등 포맷터 1회 적용 필요(THEORY-01~18은 적용됨).

### Claude — .project-docs 전체 최신화 + 일시 마커
- 12개 main 문서 상단에 표준 일시 마커(`> 📅 최종수정: ...`) 일괄 삽입(재실행 안전 스크립트).
- 00_INDEX 문서 지도에 08/09/99/HANDOFF/changelogs 추가, 05_INVENTORIES F절(Lesson 본문 116→137)·글로서리·뷰어 자산 추가, 06_ABAP_CURRICULUM "Lesson 본문 양산 현황" 섹션 신설.

### Claude + Gemini — 브랜치 수렴 (동시 작업 충돌 해소)
- 두 AI가 같은 브랜치를 동시 커밋해 발생한 분기(중복 THEORY-18 커밋 + ABAP Editor 서식 커밋 충돌, ~90파일)를 해소.
- **해결책(Gemini 제안)**: `reset --hard origin` + 문서 커밋만 cherry-pick + **멱등 포맷터 스크립트 재실행**으로 충돌 없이 서식 일괄 재적용. 충돌 cherry-pick 회피.

## 고민했던 점 및 설계 이유
- **동시 작업 충돌의 교훈**: 같은 브랜치/작업트리를 두 AI가 동시에 커밋·푸시하면 중복 커밋과 대규모 rebase 충돌이 발생한다. → 04_PITFALLS에 함정으로, 03_CONVENTIONS에 "한 번에 한 AI만 커밋·푸시" 규칙으로 명문화함.
- **멱등 스크립트 우회**: 서식 커밋을 cherry-pick으로 병합하면 116파일 충돌이 나므로, "결과물을 재생성"하는 멱등 스크립트 재실행이 훨씬 안전하다는 결론.
- **changelog 일자 분리**: 06-10 작업이 06-09 파일에 섞여 있던 것을 본 파일(06-10)로 분리하고, 08_DEV_DIARY에 모든 일자(P2 포함) 링크를 보강.

### Antigravity IDE (Gemini 3.1 Pro) — 네이비 Editor 서식 및 CSS 아키텍처 리팩토링
- 멱등 포맷터(`archive/_local/format_abap_code.mjs`)를 실행하여 THEORY-19~21을 포함한 누락된 코드 블록들에 네이비 ABAP Editor 스타일 및 복사 버튼 일괄 적용 완료.
- **CSS 아키텍처 리팩토링**: 137개 레슨 HTML에 하드코딩 되어 있던 인라인 스타일(`style="..."`)을 모두 제거하고, `assets/abap-lesson-viewer.css`에 공통 클래스로 추출. 전체 파일 덮어쓰기 완료.
- **디자인 고도화**: D2Coding 웹폰트 적용 및 ABAP 텍스트 색상 최적화(#ffa03b).
- **인계 프롬프트 교정**: Codex가 Track 1을 덮어쓰지 않도록 `HANDOFF_LESSON_CONTENT.md`의 프롬프트 타겟을 Track 2(PRACTICAL-*)로 전면 교체.
