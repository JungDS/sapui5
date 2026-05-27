# SAP Developer Learning Library v3 - Stage 2 Blueprint

- 생성일: 2026-05-27
- 배포자: 정훈영
- 총 문서 설계: 26개

## Categories
- 00. 로드맵 / 학습전략: 3개
- 01. ABAP 개발: 7개
- 02. UI5 / Fiori 개발: 6개
- 03. SAP 모듈 기초: 7개
- 04. 통합 실습: 2개
- 05. Reference: 1개

## Documents
### SAP 개발자 학습 로드맵
- File: `sap-developer-learning-roadmap-v3.html`
- Category: 00. 로드맵 / 학습전략
- Track: Core
- Status: 신규 필요
- Priority: P0
- Summary: ABAP Classic, Gateway, RAP, SAPUI5, Fiori Elements, 모듈 지식까지 전체 학습 순서를 제시합니다.

### SAP 개발 환경과 도구 입문
- File: `sap-development-tools-overview-v3.html`
- Category: 00. 로드맵 / 학습전략
- Track: Core
- Status: 신규 필요
- Priority: P0
- Summary: SAP GUI, ADT, BAS/VS Code, Gateway Client, Browser DevTools 등 개발자가 쓰는 도구 지형도를 설명합니다.

### SAP 개발 디버깅 / 트러블슈팅 통합 가이드
- File: `sap-debugging-troubleshooting-guide-v3.html`
- Category: 00. 로드맵 / 학습전략
- Track: Core
- Status: 신규 필요
- Priority: P1
- Summary: ABAP Debugger, ADT, Gateway Error Log, Browser DevTools, UI5 Support Assistant를 하나의 흐름으로 정리합니다.

### Classic ABAP 기본기
- File: `abap-classic-report-itab-alv-beginner-v3.html`
- Category: 01. ABAP 개발
- Track: ABAP Classic
- Status: 신규 필요
- Priority: P0
- Summary: Report, Selection Screen, Internal Table, Open SQL, ALV의 기본 흐름을 개발자 관점에서 설명합니다.

### ABAP New Syntax 입문
- File: `abap-new-syntax-beginner-guide-v3.html`
- Category: 01. ABAP 개발
- Track: ABAP Classic
- Status: 신규 필요
- Priority: P1
- Summary: DATA(...), VALUE, CORRESPONDING, FOR, REDUCE 등 실무에서 자주 쓰는 New Syntax를 초급자용으로 정리합니다.

### ABAP Cloud App Development 정리
- File: `abap-cloud-app-development-summary-v3.html`
- Category: 01. ABAP 개발
- Track: ABAP Cloud
- Status: 기존 문서 v3 재작성 대상
- Priority: P1
- Summary: ABAP Cloud, CDS, RAP, Code Pushdown의 현대 ABAP 개발 방향을 정리합니다.

### CDS View에서 OData 노출까지
- File: `sap-cds-to-odata-beginner-guide-v3.html`
- Category: 01. ABAP 개발
- Track: CDS / OData
- Status: 신규 필요
- Priority: P0
- Summary: Interface View(ZI_*), Projection View(ZC_*), Association, Annotation, Service Definition/Binding 흐름을 설명합니다.

### Gateway / OData V2 CRUD 입문
- File: `sap-gateway-odata-v2-crud-beginner-guide-v3.html`
- Category: 01. ABAP 개발
- Track: Gateway
- Status: 신규 필요
- Priority: P0
- Summary: SEGW, EntitySet, MPC/DPC, CRUD, Error Handling, Gateway Client 테스트 흐름을 다룹니다.

### RAP End-to-End 입문
- File: `sap-rap-end-to-end-beginner-guide-v3.html`
- Category: 01. ABAP 개발
- Track: RAP
- Status: 신규 필요
- Priority: P0
- Summary: RAP BO, Behavior Definition, Implementation, Validation, Determination, Action, Service Binding까지 전체 흐름을 설명합니다.

### RAP Action 다건 선택 처리
- File: `rap-action-invocation-grouping-v3.html`
- Category: 01. ABAP 개발
- Track: RAP
- Status: 기존 문서 v3 재작성 대상
- Priority: P2
- Summary: RAP Action 다건 선택 시 1회 호출과 Keys 일괄 전달 구조를 설명합니다.

### UI5 Controller 함수 문법 입문
- File: `sapui5-controller-function-intro-v3.html`
- Category: 02. UI5 / Fiori 개발
- Track: Freestyle UI5
- Status: v3 Alpha 완료
- Priority: P0
- Summary: View와 Controller, 이벤트 핸들러, this/byId 기본 패턴을 초심자 기준으로 설명합니다.

### Messaging과 Input Validation 실무 입문
- File: `sapui5-messaging-input-validation-v3.html`
- Category: 02. UI5 / Fiori 개발
- Track: Freestyle UI5
- Status: v3 Alpha 완료
- Priority: P0
- Summary: Input 화면 값과 Model 값의 차이, Messaging, 저장 Guard, 백엔드 메시지를 설명합니다.

### SAPUI5 OData Model과 CRUD 입문
- File: `sapui5-odata-model-crud-beginner-guide-v3.html`
- Category: 02. UI5 / Fiori 개발
- Track: Freestyle UI5
- Status: 신규 필요
- Priority: P0
- Summary: JSONModel과 ODataModel 차이, bindElement/bindItems, create/update/delete, submitBatch, busy/error 처리 흐름을 다룹니다.

### SAPUI5 Routing과 Layout 입문
- File: `sapui5-routing-layout-beginner-guide-v3.html`
- Category: 02. UI5 / Fiori 개발
- Track: Freestyle UI5
- Status: 신규 필요
- Priority: P1
- Summary: manifest routing, targets, detail navigation, FlexibleColumnLayout의 기초를 설명합니다.

### Fiori Elements 입문
- File: `sap-fiori-elements-beginner-guide-v3.html`
- Category: 02. UI5 / Fiori 개발
- Track: Fiori Elements
- Status: 신규 필요
- Priority: P0
- Summary: List Report, Object Page, Annotation, Metadata Extension, RAP Service Binding을 이용한 앱 생성 흐름을 설명합니다.

### Fiori Launchpad 배포와 Semantic Object 입문
- File: `sap-fiori-launchpad-deployment-beginner-guide-v3.html`
- Category: 02. UI5 / Fiori 개발
- Track: Fiori Launchpad
- Status: 신규 필요
- Priority: P1
- Summary: Tile, Target Mapping, Semantic Object, Action, Catalog/Space/Page, 권한 연결을 설명합니다.

### SAP 모듈 기초와 개발자 관점
- File: `sap-module-basics-for-developers-v3.html`
- Category: 03. SAP 모듈 기초
- Track: Module Overview
- Status: 신규 필요
- Priority: P0
- Summary: MM, PP, SD, FI, CO가 어떤 업무를 다루고 개발자가 왜 알아야 하는지 설명합니다.

### SAP Standard Table Map 입문
- File: `sap-standard-table-map-for-developers-v3.html`
- Category: 03. SAP 모듈 기초
- Track: Standard Tables
- Status: 신규 필요
- Priority: P0
- Summary: Header/Item 구조, Document Flow, 주요 모듈 테이블을 개발자 관점에서 지도처럼 정리합니다.

### MM 프로세스와 주요 테이블 입문
- File: `sap-mm-process-and-tables-beginner-v3.html`
- Category: 03. SAP 모듈 기초
- Track: MM
- Status: 신규 필요
- Priority: P1
- Summary: 구매요청, 구매오더, 입고, 송장 검증의 흐름과 EKKO/EKPO/MKPF/MSEG 등 주요 테이블을 설명합니다.

### PP 프로세스와 주요 테이블 입문
- File: `sap-pp-process-and-tables-beginner-v3.html`
- Category: 03. SAP 모듈 기초
- Track: PP
- Status: 기존 자료 통합 + 신규 보강
- Priority: P1
- Summary: BOM, Routing, Production Order, MRP, ATP, 안전재고와 MARA/MARC/AFKO/AFPO 등 주요 테이블을 설명합니다.

### SD 프로세스와 주요 테이블 입문
- File: `sap-sd-process-and-tables-beginner-v3.html`
- Category: 03. SAP 모듈 기초
- Track: SD
- Status: 신규 필요
- Priority: P1
- Summary: 판매오더, 납품, 출고, 청구와 VBAK/VBAP/LIKP/LIPS/VBRK/VBRP 등 주요 테이블을 설명합니다.

### FI 프로세스와 주요 테이블 입문
- File: `sap-fi-process-and-tables-beginner-v3.html`
- Category: 03. SAP 모듈 기초
- Track: FI
- Status: 기존 자료 통합 + 신규 보강
- Priority: P1
- Summary: G/L, 전표, 계정과목, 번호범위, BKPF/BSEG/ACDOCA 등 주요 테이블을 설명합니다.

### CO 프로세스와 주요 테이블 입문
- File: `sap-co-process-and-tables-beginner-v3.html`
- Category: 03. SAP 모듈 기초
- Track: CO
- Status: 신규 필요
- Priority: P2
- Summary: Cost Center, Internal Order, Profit Center, 배부/정산과 COEP/COSP/CSKS 등 주요 테이블을 설명합니다.

### SAP Flight Model 데이터 구조 해설
- File: `sap-flight-model-table-guide-v3.html`
- Category: 04. 통합 실습
- Track: Flight Model
- Status: 신규 필요
- Priority: P1
- Summary: SCARR, SPFLI, SFLIGHT, SBOOK 등 Flight 모델 테이블 관계를 통합 실습 전 선행 지식으로 설명합니다.

### Flight 통합 실습 최신본
- File: `sap-flight-integrated-practice-classrun-gateway-ui5-v3.html`
- Category: 04. 통합 실습
- Track: Integrated Practice
- Status: 기존 v1~v4 통합 재작성 대상
- Priority: P0
- Summary: ClassRun, Gateway CRUD, UI5 연동, RAP BO까지 이어지는 실습을 최신본 중심으로 통합합니다.

### SAP 개발자 용어사전
- File: `sap-developer-glossary-v3.html`
- Category: 05. Reference
- Track: Glossary
- Status: 신규 필요
- Priority: P2
- Summary: ABAP, UI5, OData, RAP, 모듈 용어 팝업의 원본 데이터 역할을 하는 용어사전입니다.
