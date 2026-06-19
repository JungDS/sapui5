# RESULTS — THEORY-02-M02~M06 리빌딩

> 📅 **최종수정: 2026-06-16 01:55 KST**
> 결과·검증을 표/플래그로. 산문 최소. SSOT는 git.

| Lesson | 섹션 | 코드목업 | 탭 | 접이식 | recap | 글로서리 | 콘솔오류 |
|---|---|---|---|---|---|---|---|
| M02 DATA/CONSTANTS/TYPES | 11 | 2 | 3(동작) | 3 | 4 | 5 | 0 |
| M03 WRITE 출력 | 10 | 2 | 비교형 | 2 | 4 | 5 | 0 |
| M04 IF/CASE | 10 | 2 | 2(동작) | 2 | 4 | 2 | 0 |
| M05 DO/WHILE | 10 | 3 | 3(동작) | 2 | 4 | 4 | 0 |
| M06 문자열/날짜/SY | 10 | 3 | 비교형 | 2 | 4 | 6 | 0 |

| 항목 | 결과 |
|---|---|
| NotebookLM 근거 | ✅ 인증 후 질의 완료(BC100/BC400/S4D400 등) → 인라인 선언, NO-GAP, out->write, IS INITIAL vs '', COND/SWITCH, sy-index↔sy-tabix·TIME_OUT, cl_abap_context_info 등 보강 반영. 사실관계 정확 확인 |
| 대체 근거 | ✅ 커리큘럼 JSON 상세 + SAP Help/Learning 공식 |
| 신규 글로서리 | ✅ 13종 추가, 3종 기존(ElementaryType/FormattingBasic/StringType) |
| 글로서리 패리티 | ✅ 5개 모두 미정의 0건 |
| 코드블록 포맷 | ✅ raw `<pre>` 0개 (format-abap-code.mjs) |
| 범위 밖 영향 | ✅ THEORY-13-M01.html git checkout 원복 |
| 커밋/푸시 | ⏳ 이 결과 포함 후 |

## 메모
- 검증 URL: `http://127.0.0.1:8765/docs/abap/lesson-viewer.html?lesson=THEORY-02-M0[2-6]`
- M03·M06은 정상/오류 대비를 event-tabs 대신 viz-compare로 표현(탭 없음이 의도).
- NotebookLM은 2026-06-16 인증 완료 후 질의·보강까지 마침(Chapter 2 전체 DoD 갭 해소).
