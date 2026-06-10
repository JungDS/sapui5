# 개발 일지 - 2026-06-10

> 📅 **최종수정: 2026-06-10 18:20 KST**

## 참여 AI
- **Claude (Opus 4.8)**
- **Antigravity IDE (Gemini 3.1 Pro)**
- **Codex (GPT-5)**

## 작업 상세 내용

### Codex (GPT-5) — Track 1 Lesson 고품질화 목표·계획 수립
- 사용자의 새 목표에 맞춰 실제 Lesson 본문 수정 전에 성공 기준을 먼저 문서화.
- 작업 시작 전 `main`을 `origin/main`과 fast-forward 동기화하고, `codex/track1-quality-plan` 브랜치를 생성.
- `.project-docs` 최신 규칙, Lesson Viewer 구조, Track 1 21개 Chapter / 137개 Lesson 범위를 확인.
- 빠른 정적 감사를 통해 현재 Track 1은 설명·글로서리·실무 주의·요약 기반은 갖췄지만, 퀴즈/정답/해설, 공식 링크, 실습 완료 조건이 일관되지 않음을 확인.
- NotebookLM 노트 `ABAP Evolution and Messaging Channels Training Guide`(69개 소스)를 확인하고, SAP 교육 PDF/SAP Learning/ABAP Cloud/CDS/RAP/Open SQL 자료를 활용하되 공식 문서 검증을 거치도록 원칙화.
- 신규 문서 `.project-docs/TRACK1_QUALITY_PLAN.md`를 추가하고, `00_INDEX`, `03_CONVENTIONS`, `99_AI_SYNC`에 연결.

### Codex 고민했던 점 및 설계 이유
- **작성 완료와 고품질 완료의 차이**: 기존 문서에는 Track 1 137개 작성 완료가 명시되어 있었지만, 사용자 목표의 기준은 퀴즈·실습·공식 링크·NotebookLM 확장까지 포함하므로 별도 완료 기준이 필요했다.
- **NotebookLM 근거 사용 방식**: 노트에는 SAP 교육 PDF와 공식 SAP Learning도 있지만 블로그·Scribd·생성 텍스트도 섞여 있어, 설명 아이디어와 공식 검증 근거를 분리하는 원칙을 먼저 세웠다.
- **Chapter 단위 확산 전략**: 137개를 한 번에 고치면 품질 패턴이 흔들릴 수 있어, Chapter 1에서 퀴즈/실습/링크 패턴을 확정한 뒤 Chapter 단위로 확산하는 계획을 택했다.

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
- 멱등 포맷터(`tools/format-abap-code.mjs`)를 실행하여 THEORY-19~21을 포함한 누락된 코드 블록들에 네이비 ABAP Editor 스타일 및 복사 버튼 일괄 적용 완료.
- **CSS 아키텍처 리팩토링**: 137개 레슨 HTML에 하드코딩 되어 있던 인라인 스타일(`style="..."`)을 모두 제거하고, `assets/abap-lesson-viewer.css`에 공통 클래스로 추출. 전체 파일 덮어쓰기 완료.
- **디자인 고도화**: D2Coding 웹폰트 적용 및 ABAP 텍스트 색상 최적화(#ffa03b).
- **인계 프롬프트 교정**: Codex가 Track 1을 덮어쓰지 않도록 `HANDOFF_LESSON_CONTENT.md`의 프롬프트 타겟을 Track 2(PRACTICAL-*)로 전면 교체.

### Codex (GPT-5) — Lesson 코드 하이라이트 토큰 공통화
- `format-abap-code.mjs`가 인라인 `<span style="...">` 대신 `abap-token-keyword/string/number/comment` 클래스를 생성하도록 수정.
- 포맷터 처리 대상을 `THEORY-*`뿐 아니라 Track 2 `PRACTICAL-*` 파일명까지 포함하도록 확장.
- 215개 코드 mockup을 재생성해 Lesson 본문 `style=` 잔존을 0건으로 정리.
- `abap-lesson-viewer.js`의 사이드바 고정 인라인 스타일과 Copy 버튼 직접 스타일 조작을 CSS 클래스 기반으로 정리하고, clipboard fallback을 추가.
- `lesson-viewer.html`의 CSS/JS 참조에 캐시 버전(`v=20260610-token3`)을 부여해 브라우저가 새 asset을 확실히 로드하도록 조정.

## Codex 고민했던 점 및 설계 이유
- **생성물보다 생성기 우선**: 137개 Lesson을 직접 치환하면 다음 포맷터 실행 때 되돌아갈 수 있으므로, 먼저 포맷터를 고친 뒤 전체 Lesson을 재생성했다.
- **Track 2 대비**: 다음 단계가 `PRACTICAL-*` 신규 작성이므로 파일명 패턴을 미리 확장해 같은 서식 파이프라인을 재사용할 수 있게 했다.
- **캐시 문제**: Lesson Viewer asset 참조에 버전 쿼리가 없으면 로컬/Pages에서 이전 JS가 남을 수 있어, viewer HTML의 CSS/JS URL에 명시적 캐시 버전을 추가했다.
