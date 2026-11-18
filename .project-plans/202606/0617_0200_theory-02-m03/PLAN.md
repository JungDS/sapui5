---
status: abandoned
goal: THEORY-02-M03 "WRITE 기본 출력" 상향 DoD 기준 v3 재빌딩
scope: docs/abap/lesson-content/THEORY-02-M03.html + reference/abap_glossary.json
branch: docs/project-docs-ai-native-restructure
---

# THEORY-02-M03 재빌딩 계획

> 📅 **최종수정: 2026-06-18 01:29 KST**

> 2026-06-17 04:00 기준선 리셋 이전 active 기록이므로 현재 단일 목표 진행률에서는 제외한다. 새 리빌딩은 리셋 이후 별도 plan/claim으로 다시 진행한다.

Chapter 2 세 번째. 변수 값을 클래식 출력 리스트에 보여주는 WRITE를 실습화.

## 핵심 보강 (nlm/BC405 근거)
- WRITE = 리스트 버퍼에 기록 → START-OF-SELECTION 종료 후 런타임이 화면 렌더.
- 줄바꿈 `/`(다음 줄 1열로), 체이닝 `:`(콜론, 쉼표 구분).
- 위치/길이 `WRITE AT /pos(len)`.
- 포맷: 날짜 DD/MM/YY(사용자 마스터데이터 순서 의존), LEFT/RIGHT-JUSTIFIED(문자 좌·숫자 우 기본), NO-ZERO, COLOR(COL_*), CURRENCY/UNIT, USING EDIT MASK.
- 함정: `/` 누락→이어붙음, `WRITE var1, var2.`(콜론 없이)→구문오류, Classic List vs ALV.

## v3 학습수단
- interactive-sap-sandbox: WRITE 출력 미리보기(여러 줄 출력 리스트로 `/` 효과 시연).
- editor-mockup(WRITE/체이닝/포맷), 포맷 옵션 도감 viz-table, viz-compare, 퀴즈, recap.

## T-code
- SE38(복습).
