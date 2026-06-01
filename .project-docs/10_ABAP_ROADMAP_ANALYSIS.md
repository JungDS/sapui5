# 신규 ABAP 커리큘럼 분석 및 로드맵 변경 검토 보고서

본 보고서는 새롭게 제안된 `abap_curriculum_20260529_180000.json` (Ultimate SAP ABAP Enterprise Master Curriculum v5) 파일을 분석하고, 이를 도입할 경우 기존 ABAP 학습 로드맵이 어떻게 진화해야 하는지 검토한 결과입니다.

## 1. 커리큘럼 아키텍처 분석

신규 커리큘럼은 단순히 문법을 나열하던 기존 방식을 넘어, **"엔터프라이즈 마스터(Enterprise Master)"**를 목표로 하는 깊이 있는 이중 트랙(2-Track) 구조로 설계되어 있습니다.

### 핵심 구조 체계
- **2-Track 시스템**: 
  - `Track 1`: **개발 이론 코스** (문법, 아키텍처, OData/RAP, Cloud)
  - `Track 2`: **실무 기술 코스** (객체지향, ALV 심화, 인터페이스, BDC/BAPI, 레포팅)
- **깊이 있는 모듈화 (Depth 1~3)**: 각 Section 아래 세부 주제들이 체계화되어 있으며, 각 주제(Depth-2)마다 '최소 예제', '오류/성능/권한 분석', '현대화 적용 판단' 등의 Depth-3 학습 유닛을 강제하고 있습니다.
- **실무 지향적 구성**: 모든 학습 항목에 *Hands-on Lab*, *Caution Points (주의점)*, *Performance/Security Tips*가 포함되어 있어, 단순히 '돌아가는 코드'가 아니라 '운영 환경에서 안전한 코드'를 짜도록 유도합니다.

---

## 2. 기존 로드맵과의 비교 (AS-IS vs TO-BE)

### AS-IS (현재 ABAP 로드맵)
현재 `document-catalog.json`에 정의된 ABAP 로드맵은 **"빠른 입문과 요약"**에 초점이 맞춰져 있습니다.
- **문서 수**: 8개 내외의 압축된 요약 문서
- **다루는 내용**:
  1. `abap-classic` (Report, ALV 기초)
  2. `abap-new-syntax` (신문법 요약)
  3. `gateway-odata-v2-crud`, `cds-odata`, `odata-export` (OData/CDS 연계)
  4. `rap-e2e`, `rap-action`, `abap-cloud` (최신 트렌드 요약)
- **한계점**: 객체지향(OOP), BDC/BAPI, 인터페이스(RFC/IDoc), Enhancement(BAdI) 등 실무에서 가장 많이 마주하는 레거시 및 필수 연계 기술이 누락되어 있습니다.

### TO-BE (신규 커리큘럼 도입 시)
로드맵은 단기 속성 가이드에서 **"단계별 전문가 양성 코스"**로 180도 전환됩니다.

| 영역 | AS-IS 로드맵 | TO-BE 로드맵 (개편 후) |
|---|---|---|
| **기초 문법/DDIC** | `abap-classic` 단일 문서 내 요약 | **[개편]** Dictionary, 문법, Internal Table, Open SQL 4개 Depth-1 주제로 분할 및 심화 |
| **객체지향 (OOP)** | (존재하지 않음) | **[신규]** 클래스, 상속/다형성, 이벤트, 디자인 패턴(MVC, Factory) 3개 Depth-1 주제 편성 |
| **ALV 및 UI** | Function ALV 기본 호출만 다룸 | **[심화]** Simple ALV, Grid ALV 초정밀 제어, 트리/차트 등 4개 단계로 세분화 |
| **확장 (Enhancement)**| (존재하지 않음) | **[신규]** User Exits, BTE부터 Classic/New BAdI까지 2개 단계 편성 |
| **인터페이스/데이터** | OData 중심 | **[신규]** BDC, BAPI, RFC, IDoc 파이프라인 전면 추가 |
| **최신 기술** | CDS, RAP, Cloud 요약 | **[강화]** VDM, DCL 권한, AMDP(Native SQL) 등 아키텍처 수준으로 격상 |

---

## 3. 로드맵 변경에 따른 적용(마이그레이션) 전략

이 커리큘럼을 실제 로드맵 페이지(`roadmap.html` 및 `abap.html`)에 도입하려면 다음의 대대적인 구조 개편이 필요합니다.

### 3-1. 네비게이션 및 목차 개편 (Tree Style UI 도입)
- **변경 사항**: 사용자의 요청대로 기존의 단순한 번호 나열식 추천 경로를 버리고, **Track 1(이론) → Track 2(실무)로 이어지는 Tree 스타일의 시각적 네비게이션**을 도입해야 합니다.
- **임시 문서(제가중) 처리**: 커리큘럼에 정의된 문서는 수십 개에 달합니다. 현재 작성된 8개의 문서를 뼈대에 맞게 재배치하고, 아직 내용이 없는 문서는 사용자의 제안대로 **"제작중(WIP)"** 배지를 달아 목차에 먼저 노출시킨 후, 핵심 뼈대만 가진 껍데기 문서로 연결해 두어야 합니다.

### 3-2. 학습 경로(Learning Path) 분리
거대한 커리큘럼을 한 번에 소화할 수 없으므로, 사용자 수준에 따른 로드맵 경로 세분화가 필요합니다.
1. **ABAP Core Path (기본기 코스)**: DDIC → Classic 문법 → Internal Table → Open SQL → Function ALV
2. **ABAP Advanced Path (객체지향 & 실무 코스)**: OOP → Grid ALV → BAPI/BDC → Enhancement
3. **ABAP Modernization Path (최신 기술 코스)**: New Syntax → CDS → OData/Gateway → RAP/Cloud → AMDP

### 3-3. 문서 템플릿(Stage 7)의 기능 확장 요구
신규 커리큘럼은 각 문서마다 `hands_on_lab`, `caution_points`, `performance_security_operations_tips`를 포함합니다.
- 이에 따라 Stage 7 HTML 템플릿(`data-prose`)에 `prose-lab`, `prose-caution`, `prose-tips` 등의 새로운 시맨틱 섹션 컨벤션을 추가해야 합니다.
- 용어(Glossary) 클릭 시 2개의 탭(초급자용/상세 설명용)이 출력되는 팝업 기능을 모든 신규 문서에 적용할 수 있도록 공통 스크립트(`common.js`)에 해당 로직이 굳건히 자리 잡아야 합니다.

---

## 4. 결론 및 다음 단계 제안

신규 커리큘럼은 SAP ABAP 개발자를 단순 코더가 아닌 아키텍트 수준으로 끌어올릴 수 있는 훌륭한 설계도입니다. 

**향후 진행 제안 (Action Items):**
1. **로드맵 및 카탈로그 개편**: `data/document-catalog.json`을 수정하여 신규 커리큘럼의 Tree 구조를 반영하고, 미구현 문서는 '제작중' 상태로 등록합니다.
2. **UI 개편**: `pages/roadmap.html`과 `pages/abap.html`을 업데이트하여 Tree 스타일의 시각적 네비게이션과 2-Track 구조를 렌더링합니다.
3. **빈 문서(Placeholder) 생성**: 신규 커리큘럼에 명시된 주제별 HTML 파일들을 Stage 7 셸 규격에 맞게 껍데기(제가중)로 일괄 생성합니다.
4. **점진적 콘텐츠 채우기**: 생성된 껍데기 문서에 2-Tab 용어 팝업 룰 등을 적용하며 하나씩 고도화해 나갑니다.
