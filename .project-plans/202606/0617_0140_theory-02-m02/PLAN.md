---
status: active
goal: THEORY-02-M02 "DATA / CONSTANTS / TYPES 선언" 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-02-M02.html + reference/abap_glossary.json(T-code/concept)
branch: docs/project-docs-ai-native-restructure
---

# THEORY-02-M02 재빌딩 계획

> 📅 **최종수정: 2026-06-17 01:18 KST**

Chapter 2 두 번째 Lesson. 변수(DATA)·상수(CONSTANTS)·타입(TYPES) 선언과
ABAP 기본 elementary 타입을 초심자 기준으로 실습화한다.

## 핵심 보강 포인트 (NotebookLM/BC100·S4D401 근거)
- DATA: 메모리에 데이터 오브젝트 할당. `DATA name TYPE t [VALUE v].`
- elementary 타입 + 기본길이/초기값: c(1,공백) n(1,'0') d(8,YYYYMMDD) t(6,HHMMSS) i(4B,0) p(8,DECIMALS 필요) string(가변,empty) x(1,'00').
- TYPES: 메모리 없는 설계도. 재사용·일관성.
- CONSTANTS: VALUE 필수, 불변, 매직넘버 제거.
- 함정: c/n 길이 생략→1→truncation, p DECIMALS 누락, CONSTANTS VALUE 누락→구문오류.
- (간단히) 인라인 DATA(x)= 7.40+ 타입 추론.

## v3 학습수단
- 기본 타입 도감(viz-state-grid/viz-table 치트시트).
- interactive-sap-sandbox: 변수 선언 시뮬레이터(name/type/value 검증→선언→WRITE 결과).
- CONSTANTS 매직넘버 viz-compare, editor-mockup(TYPES/CONSTANTS/DATA), 퀴즈, recap.

## T-code
- SE38(복습), SE11(복습, 전역 타입 참조).
