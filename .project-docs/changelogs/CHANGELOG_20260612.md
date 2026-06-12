# 개발 일지 - 2026-06-12

> 📅 **최종수정: 2026-06-12 KST**

## 참여 AI
- **Claude (Fable 5)**

## 작업 상세 내용

### Claude (Fable 5) — Chapter 7의 Lesson 1~9 고품질화+시각화 통합 패스
- NotebookLM 질의(BC400/BC401 ITAB 응용)로 초심자 오개념 7종을 수집하고 표준 동작과 교차 검증해 퀴즈로 반영: BINARY SEARCH의 정렬 전제(어기면 조용한 논리 오류), ADJACENT DUPLICATES의 인접 중복 한정, ASSIGNING의 원본 직접 변경(MODIFY 불필요), HASHED TABLE의 INDEX 불가, CLEAR/REFRESH와 FREE의 메모리 반환 차이, TRANSPORTING 생략 위험, Secondary Key의 읽기 이득 vs 쓰기 비용.
- 9개 Lesson 전체에 미니 실습(완료 조건 포함), SAP Help Portal 공식 링크 3개씩, 확인 퀴즈/정답/해설을 추가. 링크 10종(MODIFY/DELETE/SORT itab, READ TABLE, FIELD-SYMBOLS, Sorted/Hashed Table, Secondary Table Key, Deep Structure, CLEAR, FREE)은 WebFetch로 실존 검증.
- 시각 자료 9종(`viz-*`) 추가: MODIFY TRANSPORTING 전/후, DELETE WHERE 전/후(순번 재계산), SORT 전/후, 이진 탐색 절반 줄이기 단계 그리드, 테이블 3종 비교 그리드+기능표, INTO vs ASSIGNING 비교, Secondary Key 거래 비교, Deep Structure 중첩 구조도, CLEAR/REFRESH/FREE 3종 그리드.

## Claude 고민했던 점 및 설계 이유
- **전/후 비교 패턴의 집중 활용**: Chapter 7은 “명령 실행 전과 후의 표 상태”가 본질인 주제(MODIFY/DELETE/SORT)가 많아, Phase 0에서 신설한 `viz-compare`를 표준 패턴으로 일관 적용했다. 각 비교표는 해당 Lesson 코드 예제의 실제 데이터(Mina/Jun/Sora)를 그대로 사용해 코드와 그림이 1:1로 대응되게 했다.
- **이진 탐색 시각화 규모**: Lesson 예제는 3건이라 탐색 단계가 드러나지 않아, 7건짜리 개념 예시(A01~A07)로 “절반 버리기” 과정을 보여주고 순차 탐색과 비교했다. 본문 코드와 분리된 개념 그림임을 제목에 명시했다.
- **NotebookLM 결과의 선별 반영**: Modern ABAP 권장사항(테이블 표현식, 인라인 선언 등)은 Chapter 16/17 범위이므로 이번 본문에는 “구조적 대안” 수준으로만 언급하고 깊이 들어가지 않았다.
