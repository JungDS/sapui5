---
status: done
goal: THEORY-03-M04 Selection Screen Block 기초 맛보기 리셋 이후 DoD 기준 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-03-M04.html + reference/abap_glossary.json + 필요 시 공통 자산
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-03-M04

> 📅 **최종수정: 2026-06-19 23:33 KST**

## 배경
Track 1 전체 자동화 큐에서 현재 작업 단위는 THEORY-03-M04다. 기존 산출물은 참고만 하고, 현재 DoD 기준으로 NotebookLM 보강·v3 실습·T-code 연결·검증까지 다시 확인한다.

## 접근
1. 커리큘럼 JSON에서 Lesson 목표와 범위를 확정한다.
2. NotebookLM 질의 후 SAP 공식 문서로 핵심 사실을 재검증한다.
3. v3 학습수단을 먼저 고르고, 코드/화면 흐름은 페이지 내 조작형 시뮬레이션으로 연결한다.
4. 본문 T-code를 글로서리와 `used_in_lessons`에 연결하고, `data-glossary` 패리티를 점검한다.
5. 로컬 lesson-viewer에서 콘솔 오류, 칩 바, 주요 인터랙션을 검증한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../../01_AI_SYNC.md).
- 내부 ID는 사용자 화면에 추가 노출하지 않는다.
- 코드/설정 흐름이 등장하면 페이지 내 조작형 시뮬레이션으로 연결한다.

## NotebookLM 시작 질의
```powershell
nlm notebook query ad0e9cde-4dca-451e-b455-de200a9ed7b7 "THEORY-03-M04 Selection Screen Block 기초 맛보기를 Track 1 리빌딩 DoD 기준으로 보강하려고 합니다. 누락 개념, 초보자 오해 포인트, 실습 시뮬레이션 아이디어, T-code/화면 흐름, SAP 공식 문서로 재검증할 키워드를 알려주세요."
```

## 검증 결과
- [x] NotebookLM 보강: BEGIN/END 이름 일치, WITH FRAME TITLE, text-001 유지보수, Block은 UI 묶음이라는 오해 방지 반영.
- [x] SAP 공식 재검증: SELECTION-SCREEN screen_elements, Selection Screens Overview, PARAMETERS 최신 문서 확인.
- [x] Fragment 규칙: sandbox config 1개 JSON parse, 인라인 script/style/style attr 0건.
- [x] 글로서리 패리티: `SelectionScreenBlock`, `SelectionScreenBeginBlock`, `FrameTitle`, `PARAMETERSStatement`, `SelectionScreen`, `SE38` 모두 등록 및 `used_in_lessons` 포함.
- [x] Browser 검증: 10 sections, 1 sandbox, 1 copy button, 콘솔 error/warn 0건.
- [x] 인터랙션: 정상 프레임, BEGIN/END 이름 불일치, text-001 누락, 프레임 없음 비교, P_DATE 날짜 형식 오류 확인.
- [x] 모바일 390x844: 문서 overflow 없음. Browser screenshot API만 CDP 타임아웃.
