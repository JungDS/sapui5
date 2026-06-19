---
status: done
goal: THEORY-02-M03 WRITE 기본 출력 리셋 이후 DoD 기준 v3 리빌딩
scope: docs/abap/lesson-content/THEORY-02-M03.html + reference/abap_glossary.json + 필요 시 공통 자산
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-02-M03

> 📅 **최종수정: 2026-06-19 23:33 KST**

## 배경
Track 1 전체 자동화 큐에서 현재 작업 단위는 THEORY-02-M03다. 기존 산출물은 참고만 하고, 현재 DoD 기준으로 NotebookLM 보강·v3 실습·T-code 연결·검증까지 다시 확인한다.

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
nlm notebook query ad0e9cde-4dca-451e-b455-de200a9ed7b7 "THEORY-02-M03 WRITE 기본 출력를 Track 1 리빌딩 DoD 기준으로 보강하려고 합니다. 누락 개념, 초보자 오해 포인트, 실습 시뮬레이션 아이디어, T-code/화면 흐름, SAP 공식 문서로 재검증할 키워드를 알려주세요."
```

## 작업 결과
- [x] NotebookLM 질의 완료: WRITE/List Buffer, `:` 체이닝, `/` 줄바꿈, `NO-ZERO`, `AT`, ALV와 WRITE 차이 보강 포인트 확인.
- [x] SAP 공식 재검증 완료: ABAP Keyword Documentation 최신 WRITE, format options, output length, Classic Lists URL 반영.
- [x] v3 시뮬레이션 보강: 출력 모드 선택(`slash`, `single`, `NO-ZERO`, `AT`, syntax error)을 추가하고 결과 variant/오류 흐름 구현.
- [x] 글로서리 패리티 확인: `WRITE`, `OutputList`, `SE38` 모두 등록 및 `used_in_lessons` 포함.
- [x] Fragment 규칙 확인: 인라인 `<script>`, `<style>`, `style=` 없음.
- [x] 브라우저 검증 완료: 9 sections, sandbox 1개, copy buttons 2개, slash/single/NO-ZERO/AT 정상, 체이닝 오류/도시 필수/수량 숫자 오류 차단.
- [x] 모바일/콘솔 확인: 390px overflow 0, console error 0.
