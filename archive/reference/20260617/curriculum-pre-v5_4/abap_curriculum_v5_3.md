# ABAP Curriculum v5.3 Review & AI Handoff Notes

생성일: 2026-06-02  
대상 파일: `abap_enterprise_curriculum_v5_3_sequence_refined.json`  
목적: SAP 개발을 막 시작하는 초급 개발자를 위한 ABAP 교육 커리큘럼의 선후수, 난이도, Depth-2 구성, 향후 AI 분석 기준을 정리한다.

---

## 1. 커리큘럼 포지션

이 커리큘럼은 SAP 개발을 처음 시작하는 초급 ABAP 개발자를 대상으로 한다.  
단, 단순 문법 입문 과정이 아니라 **초급자가 실무형 ABAP 개발자로 성장하기 위한 장기형 기초-응용 연결 과정**이다.

핵심 설계 원칙은 다음과 같다.

1. 처음부터 모든 DDIC 기능을 몰아서 가르치지 않는다.
2. `PARAMETERS`는 초반에 맛보기로 다루되, `SELECT-OPTIONS`는 Internal Table과 Open SQL 이후에 다룬다.
3. `SELECT-OPTIONS`는 Range Table 구조를 이해한 뒤 학습한다.
4. Internal Table 직후에는 SALV 1차를 배치하여 학습자가 데이터를 즉시 화면으로 확인할 수 있게 한다.
5. Open SQL은 기본 조회와 JOIN/집계 조회로만 크게 2단계로 나눈다.
6. Classic DDIC View와 Maintenance View는 Open SQL JOIN 학습 직후, CDS View Entity 이전에 다룬다.
7. ABAP Report Event는 DB 조회, SELECT-OPTIONS, Classic View를 배운 뒤 정리한다.
8. Grid ALV는 Screen Programming/Dynpro 기초 이후에 배치한다.
9. Deep Structure는 Internal Table 응용에서 개념만 소개하고, Cell Color/Cell Style은 ALV 표시 제어 심화에서 다룬다.
10. Lock Object는 초급 DDIC가 아니라 Track 2의 트랜잭션/동시성 제어 영역으로 이동한다.

---

## 2. 전체 검토 결론

| 검토 항목 | 결론 |
|---|---|
| 초급 개발자 대상 적합성 | 적합 |
| 배우지 않은 내용이 먼저 등장하는 중대 오류 | 없음 |
| 난이도 흐름 | 대체로 적절 |
| Depth-2 수준의 상세도 | 충분함 |
| 앞뒤 Section 간 연결성 | 명확함 |
| 추가 보완 필요성 | 구조 변경보다는 수업 운영 시 범위 제한 필요 |

최종 판단: **v5.3 구조는 현재 기준으로 사용 가능하다.**  
단, 일부 Section은 초급자에게 과도하게 깊어질 수 있으므로 “사용법 수준”과 “설계/심화 수준”을 명확히 구분해서 운영해야 한다.

---

## 3. Track 1 Section 흐름

| Section | 주제 | 선후수 판단 |
|---|---|---|
| THEORY-01 | DDIC 1차: 기본 데이터 구조 생성 | Domain, Data Element, Structure, Transparent Table까지만 다루므로 적절 |
| THEORY-02 | ABAP 기본 문법과 WRITE 출력 | 변수와 출력, 조건, 반복 흐름으로 적절 |
| THEORY-03 | PARAMETERS 기반 Selection Screen 맛보기 | `SELECT-OPTIONS` 없이 `PARAMETERS`만 다루므로 적절 |
| THEORY-04 | DDIC 2차: 관계와 입력 도움말 | `PARAMETERS` 이후 F4 Help 체감이 가능하므로 적절 |
| THEORY-05 | ABAP 모듈화 기초 | Internal Table 전 코드 분리/호출 개념을 제공하므로 적절 |
| THEORY-06 | Internal Table 기초 | 선언 → 추가 → 반복 → 검색 순서로 적절 |
| THEORY-07 | Internal Table 응용과 Deep Structure 개념 소개 | 변경/삭제/정렬/성능/Deep Structure 소개 순서로 적절 |
| THEORY-08 | Simple ALV / SALV 1차 | Internal Table 직후 기본 출력만 다루므로 적절 |
| THEORY-09 | Open SQL 1차: 기본 조회 | 기본 SELECT와 WHERE, INTO TABLE 중심으로 적절 |
| THEORY-10 | SELECT-OPTIONS와 Range Table | Internal Table/Open SQL 이후라 적절 |
| THEORY-11 | Open SQL 2차: JOIN과 집계 조회 | JOIN, GROUP BY, Aggregate, ORDER BY, FAE 흐름으로 적절 |
| THEORY-12 | Classic DDIC View와 유지보수 객체 | JOIN/FK 이후, CDS 이전이라 적절 |
| THEORY-13 | ABAP Report Event와 Selection Screen 심화 | 조회·View·입력 조건을 배운 뒤 Event 흐름 정리라 적절 |
| THEORY-14 | Screen Programming / Dynpro 기초 | Grid ALV 이전 PBO/PAI/Custom Control 선행으로 적절 |
| THEORY-15 | Grid ALV 기초 | Container, Grid, Field Catalog, Layout, Variant까지 포함하는 구조로 적절 |
| THEORY-16 | Modern ABAP Syntax | 기초 문법과 ITAB/SQL을 배운 뒤라 적절 |
| THEORY-17 | New Open SQL / Modern ABAP SQL | Modern Syntax 이후 심화 배치로 적절 |
| THEORY-18 | OO ABAP 기본 설계 | RAP/CDS 응용 전 기본 설계 학습으로 적절 |
| THEORY-19 | SALV / Grid ALV 표시 제어 심화 | OO ABAP 이후 Sort/Filter/Layout/Cell Style 심화로 적절 |
| THEORY-20 | CDS View Entity 기초 | Classic View와 New Open SQL 이후 배치로 적절 |
| THEORY-21 | RAP / ABAP Cloud 입문 | CDS와 OO 이후 배치로 적절 |

---

## 4. Track 2 Section 흐름

| Section | 주제 | 선후수 판단 |
|---|---|---|
| PRACTICAL-01 | 실무 데이터 변경과 트랜잭션 제어 | Track 1의 조회 중심 Open SQL 이후 데이터 변경으로 확장하므로 적절 |
| PRACTICAL-02 | Lock Object와 동시성 제어 | LUW/COMMIT/ROLLBACK 이후 배치라 적절 |
| PRACTICAL-03 | OO ABAP 고급 설계와 패턴 | Track 1 OO 기본 설계 이후 심화로 적절 |
| PRACTICAL-04 | ALV 고급 Event 응용 | Track 1 Grid ALV 기초 이후 Event 심화로 적절 |
| PRACTICAL-05 | Editable Grid ALV와 입력 검증 | ALV Event 이후 입력 검증으로 확장하므로 적절 |
| PRACTICAL-06 | Enhancement / BAdI / User Exit | 기본 개발/OO/트랜잭션 이해 후 확장기술로 적절 |
| PRACTICAL-07 | 인터페이스 실무: BAPI / RFC / BDC / File / Excel | 기본 ABAP과 트랜잭션 처리 이후 적절 |
| PRACTICAL-08 | IDoc / ALE / Gateway V2 | 인터페이스 실무 후 확장 영역으로 적절 |
| PRACTICAL-09 | 성능 분석과 튜닝 | SQL/ITAB/실무 처리 이후 분석 단계로 적절 |
| PRACTICAL-10 | AMDP / ADBC / Pushdown | 성능 분석 이후 고급 Pushdown으로 적절 |
| PRACTICAL-11 | Forms / Output / PDF | 실무 산출물 영역으로 독립 배치 가능 |
| PRACTICAL-12 | 운영 품질과 배포 관리 | 개발 산출물을 운영 품질로 연결하므로 적절 |
| PRACTICAL-13 | RAP + Fiori 실무 Capstone | 전체 Track 1/2를 통합하는 최종 과제로 적절 |

---

## 5. 중점 검토 결과

### 5.1 배우지 않은 내용이 먼저 등장하는가?

중대 선후수 오류는 발견되지 않았다.

다만 다음 항목은 초급 과정에서 깊이를 제한해야 한다.

| 항목 | 이유 | 운영 기준 |
|---|---|---|
| THEORY-05 Local/Global Class 호출 | OO 설계는 아직 배우지 않았음 | “호출 방법” 중심, 설계는 THEORY-18에서 학습 |
| THEORY-08 SALV 1차 | `CL_SALV_TABLE`은 객체 메서드 호출이 필요함 | `FACTORY`와 `DISPLAY`만 패턴처럼 사용 |
| THEORY-09 Host Variable `@` | New Open SQL은 THEORY-17에서 심화 | 이 단계에서는 ABAP 변수 표시 규칙으로만 설명 |
| THEORY-15 Grid ALV | OO 설계 전이지만 클래스 사용은 필요함 | Container/Grid 생성 패턴 중심, 설계는 THEORY-18 이후 |
| THEORY-15 색상 기초 | Cell 단위 Style은 Deep Structure 필요 | 컬럼 색상/행 색상 기초만, Cell Color/Style은 THEORY-19 |

---

## 6. 난이도 판단

현재 난이도는 초급 개발자에게 **다소 촘촘하지만 적절한 편**이다.

다만 Track 1은 “입문 문법만 배우는 과정”이 아니라 다음 목표를 포함한다.

- Classic Report 작성 가능
- Internal Table 기반 데이터 가공 가능
- Open SQL 조회 가능
- Selection Screen과 Report Event 이해
- SALV/Grid ALV 기초 출력 가능
- Classic DDIC View와 CDS View의 차이 이해
- RAP/ABAP Cloud 입문 구조 이해

따라서 강의 운영 시 다음 원칙을 적용한다.

1. Track 1에서는 “실무 전체 구조를 이해하는 수준”까지 다룬다.
2. Track 2에서는 “업무 적용, 고급 이벤트, 운영 품질, 성능, 인터페이스”로 확장한다.
3. 초급자에게 Track 1 전체를 한 번에 완벽히 숙달시키기보다, 각 Section별 미니 실습으로 단계적으로 완성도를 높인다.

---

## 7. Depth-2 구성 판단

v5.3 JSON은 총 205개 Depth-2 모듈을 가진다.

각 Depth-2 항목은 다음 정보를 포함한다.

- `sub_2_id`
- `sub_2_name`
- `handled_contents`
- `learning_objectives`
- `technical_keywords`
- `module_metadata`
- `learning_content_design`
- `sequence_notes`
- `hands_on_lab`
- `caution_points`
- `assessment_design`

검토 결과, Depth-2 수준은 충분히 상세하다.  
특히 각 항목에 `sequence_notes`가 있어 앞뒤 Section과의 관계를 설명할 수 있는 구조를 갖는다.

---

## 8. 향후 AI가 분석할 때 주의할 점

이 커리큘럼은 단순 목차가 아니라 **선후수 기반 교육 흐름**으로 설계되었다.  
따라서 다른 AI가 분석하거나 수정할 때 다음 원칙을 지켜야 한다.

### 8.1 DDIC는 한 번에 몰아서 가르치지 않는다

- 초반: Domain, Data Element, Structure, Transparent Table
- PARAMETERS 이후: Foreign Key, Check Table, Search Help
- JOIN 이후/CDS 이전: DB View, Maintenance View, TMG
- 실무 Track: Lock Object

### 8.2 Selection Screen은 2단계로 나눈다

- 초반: `PARAMETERS`만 맛보기
- Internal Table/Open SQL 이후: `SELECT-OPTIONS`, Range Table
- DB View 이후: Report Event와 Selection Screen 심화

### 8.3 SALV와 Grid ALV는 분리한다

- SALV 1차: Internal Table 직후 기본 출력
- Grid ALV 기초: Screen Programming 이후
- 표시 제어 심화: OO ABAP 이후
- Event/Editable Grid: Track 2

### 8.4 Open SQL은 2단계만 유지한다

- Open SQL 1차: 기본 조회
- Open SQL 2차: JOIN, GROUP BY, Aggregate, ORDER BY, FOR ALL ENTRIES
- New Open SQL은 Modern ABAP Syntax 이후 별도 Section

### 8.5 초급자 과정에서는 “사용법”과 “설계”를 분리한다

예시:

- Track 1 초반 Local/Global Class: 호출 방법 중심
- Track 1 후반 OO ABAP: 설계 중심
- Track 2 OO ABAP: 패턴/구조화/테스트 가능성 중심

---

## 9. 최종 AI Handoff Summary

v5.3 커리큘럼은 현재 기준에서 초급 SAP ABAP 개발자를 위한 교육 흐름으로 사용할 수 있다.  
중대한 선후수 오류는 없으며, 난이도는 “초급 입문 + 실무 기초 확장” 수준으로 적절하다.  
향후 수정 시에는 Section을 임의로 합치지 말고, 특히 DDIC, Selection Screen, Open SQL, ALV, OO ABAP, CDS/RAP의 선후수 경계를 유지해야 한다.

가장 중요한 순서는 다음과 같다.

```text
DDIC 테이블 생성
→ ABAP 기본 문법
→ PARAMETERS
→ Foreign Key / Search Help
→ 모듈화
→ Internal Table
→ SALV 1차
→ Open SQL 기본 조회
→ SELECT-OPTIONS / Range Table
→ Open SQL JOIN / 집계
→ Classic DDIC View / Maintenance View
→ ABAP Report Event
→ Screen Programming
→ Grid ALV 기초
→ Modern ABAP Syntax
→ New Open SQL
→ OO ABAP 기본 설계
→ ALV 표시 제어 심화
→ CDS View Entity
→ RAP / ABAP Cloud
```
