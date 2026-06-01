// ERP Business Process Metro 전용 스크립트
// 페이지 자체 용어 사전 팝업(dialog) + 학습 수준 탭.
// - SAP를 막 배우는 학습자를 위해 본문에 등장하는 주요 용어를 자동으로 스캔하여
//   첫 등장 위치를 클릭 가능한 용어 버튼으로 감싼다(autoLinkTerms).
// - 하단 용어 사전 칩 목록(.term-cloud)도 glossary 데이터로부터 자동 생성한다.
// - common.js 전역 용어 모달과 중복 실행되지 않도록 용어 클릭 시 stopPropagation()으로 차단한다.
(function () {
  "use strict";

  // title: 팝업 제목 / definition: 한 줄 설명 / examples: 보충 예시 / aliases: 본문에서 자동 인식할 표기들
  const glossary = {
    "erp": { title: "ERP", definition: "Enterprise Resource Planning의 약자입니다. 재무, 구매, 영업, 생산, 인사 등 기업 운영 업무를 공통 데이터와 표준 프로세스로 연결하는 통합 시스템입니다.", examples: ["부서별 데이터 중복을 줄이고, 업무 결과를 하나의 흐름으로 연결하는 것이 핵심입니다."], aliases: ["ERP"] },
    "s4hana": { title: "SAP S/4HANA", definition: "SAP의 차세대 ERP 제품군입니다. HANA 데이터베이스 기반의 단순화된 데이터 모델, Fiori 사용자 경험, 실시간 분석을 특징으로 합니다.", examples: ["FI/CO, MM, SD, PP 같은 전통 모듈 개념과 함께 LoB 앱 관점도 함께 이해하면 좋습니다."], aliases: ["SAP S/4HANA", "S/4HANA"] },
    "master-data": { title: "Master Data (마스터 데이터)", definition: "고객, 공급업체, 자재, G/L 계정, Cost Center처럼 여러 거래에서 반복적으로 참조되는 기준정보입니다.", examples: ["마스터 데이터 품질이 낮으면 판매, 구매, 생산, 회계 전 과정의 오류로 이어질 수 있습니다."], aliases: ["Master Data", "마스터 데이터"] },
    "transaction-data": { title: "Transaction Data (트랜잭션 데이터)", definition: "판매오더, 구매오더, 입고문서, 청구문서, 회계전표처럼 실제 업무 이벤트가 발생하면서 생성되는 거래 데이터입니다.", examples: ["마스터 데이터는 기준이고, 트랜잭션 데이터는 실제 발생 기록입니다."], aliases: ["Transaction Data"] },

    "fico": { title: "FI/CO (재무·관리회계)", definition: "FI(재무회계)와 CO(관리회계)를 함께 부르는 표현입니다. 외부 보고용 회계와 내부 원가·수익성 관리 회계를 묶어 설명할 때 씁니다.", examples: ["다른 모듈의 업무 결과는 대부분 FI/CO로 모여 손익과 원가로 정리됩니다."], aliases: ["FI/CO", "FI·CO", "CO/FI"] },
    "fi": { title: "FI (재무회계)", definition: "Financial Accounting. 외부 보고를 위한 총계정원장, 채권/채무, 자산, 결산을 다루는 회계 모듈입니다.", examples: ["매출, 매입, 급여 등 모든 거래의 회계 결과가 FI 전표로 기록됩니다."], aliases: ["FI"] },
    "co": { title: "CO (관리회계)", definition: "Controlling. 원가 센터, 내부 오더, 제품 원가, 수익성 분석 등 내부 의사결정을 위한 관리 회계 모듈입니다.", examples: ["FI가 '얼마가 들어오고 나갔나'라면 CO는 '어디서·왜 비용이 발생했나'를 봅니다."], aliases: ["CO"] },
    "mm": { title: "MM (자재관리)", definition: "Materials Management. 구매, 입고, 송장검증, 재고 관리 등 외부 조달과 자재 흐름을 담당하는 모듈입니다.", examples: ["구매오더 → 입고 → 송장 흐름이 MM의 대표 시나리오입니다."], aliases: ["MM"] },
    "sd": { title: "SD (영업관리)", definition: "Sales and Distribution. 판매 주문, 납품, 출고, 청구 등 고객 대상 영업·물류 프로세스를 담당하는 모듈입니다.", examples: ["판매오더 → 납품 → 청구 흐름이 SD의 대표 시나리오입니다."], aliases: ["SD"] },
    "pp": { title: "PP (생산계획)", definition: "Production Planning. BOM, Routing, MRP, 생산오더 등 제조 계획과 실행을 담당하는 모듈입니다.", examples: ["계획(MRP) → 생산오더 → 자재소비 → 완제품 입고 흐름이 PP의 핵심입니다."], aliases: ["PP"] },
    "hcm": { title: "HCM (인사관리)", definition: "Human Capital Management. 채용, 직원정보, 근태, 급여 등 인사 업무를 다루는 SAP 영역입니다. 클라우드 제품인 SuccessFactors와 함께 쓰이기도 합니다.", examples: ["근무시간과 급여 결과가 비용으로 회계에 연결되는 출발점입니다."], aliases: ["HCM"] },
    "successfactors": { title: "SAP SuccessFactors", definition: "SAP의 클라우드 기반 인사관리(HR) 제품군입니다. 채용, 성과, 학습, 급여 등을 클라우드에서 제공합니다.", examples: ["S/4HANA와 통합해 인사 데이터를 회계·원가와 연결하는 구조가 흔합니다."], aliases: ["SuccessFactors"] },

    "lead-to-cash": { title: "Lead-to-Cash", definition: "잠재 고객 확보부터 판매·납품·청구·수금까지, 고객에게 팔고 현금을 회수하는 영업 중심의 엔드투엔드(End-to-End) 프로세스입니다.", examples: ["주로 SD 모듈과 연결되며 마지막은 현금 회수입니다."], aliases: ["Lead-to-Cash"] },
    "procure-to-pay": { title: "Procure-to-Pay (Source-to-Pay)", definition: "공급업체 선정·구매오더·입고·송장검증·지급까지, 사오고 값을 치르는 구매 중심의 엔드투엔드 프로세스입니다.", examples: ["주로 MM 모듈과 연결되며 GR/IR이 핵심 개념입니다."], aliases: ["Procure-to-Pay", "Source-to-Pay"] },
    "plan-to-produce": { title: "Plan-to-Produce", definition: "수요 계획·생산오더·자재소비·완제품 입고·정산까지, 만들기를 계획하고 실행하는 생산 중심의 엔드투엔드 프로세스입니다.", examples: ["주로 PP 모듈과 연결되며 수량 흐름과 가치 흐름을 함께 봅니다."], aliases: ["Plan-to-Produce"] },
    "record-to-report": { title: "Record-to-Report", definition: "거래 전기·전표·결산·리포팅까지, 회계 기록을 모아 재무·관리 보고서를 만드는 재무 중심의 엔드투엔드 프로세스입니다.", examples: ["다른 노선의 업무 결과가 모두 이 흐름으로 모입니다."], aliases: ["Record-to-Report"] },
    "hire-to-retire": { title: "Hire-to-Retire", definition: "채용·온보딩·근태·급여·성과·퇴직까지, 직원의 생애주기를 관리하는 인사 중심의 엔드투엔드 프로세스입니다.", examples: ["인건비가 비용·원가로 회계에 연결됩니다."], aliases: ["Hire-to-Retire"] },
    "time-to-cost": { title: "Time-to-Cost", definition: "근무시간 기록·급여/평가·원가 배부까지, 사람의 시간을 비용·원가로 연결하는 흐름입니다.", examples: ["HR 데이터가 HR에서 끝나지 않고 CO/FI로 이어집니다."], aliases: ["Time-to-Cost"] },
    "payment": { title: "Payment (지급·입금·수금)", definition: "대금을 주고받아 채권·채무를 현금으로 정리하는 단계입니다. 받는 쪽은 입금/수금, 주는 쪽은 지급입니다.", examples: ["수금 시 고객채권이, 지급 시 공급업체 채무가 청산됩니다."], aliases: ["Payment", "지급", "입금", "수금"] },

    "sales-order": { title: "Sales Order (판매오더)", definition: "고객에게 판매할 품목, 수량, 가격, 납기, 납품 조건 등을 확정하는 판매 문서입니다.", examples: ["후속 문서로 Delivery와 Billing Document가 이어질 수 있습니다."], aliases: ["Sales Order", "판매오더", "판매 주문"] },
    "delivery": { title: "Delivery (납품)", definition: "판매오더 등을 바탕으로 실제 물류 실행을 관리하는 납품 문서입니다. 출고 처리와 연결되며 재고와 원가에 영향을 줄 수 있습니다.", examples: ["Outbound Delivery, Post Goods Issue(PGI)를 함께 보면 이해가 쉽습니다."], aliases: ["Delivery", "납품"] },
    "invoice": { title: "Invoice (인보이스/송장)", definition: "대금 청구 또는 송장 문서입니다. 영업에서는 고객 청구문서, 구매에서는 공급업체 송장으로 구분합니다.", examples: ["청구문서가 회계로 전기되면 매출·채권 또는 채무 영향이 발생합니다."], aliases: ["Invoice", "인보이스", "송장"] },
    "purchase-order": { title: "Purchase Order (구매오더)", definition: "공급업체에 자재나 서비스를 어떤 조건으로 구매할지 확정하는 구매 문서입니다.", examples: ["구매오더 자체보다 입고와 송장검증 단계에서 회계 영향이 구체화됩니다."], aliases: ["Purchase Order", "구매오더"] },
    "goods-receipt": { title: "Goods Receipt (입고)", definition: "자재나 서비스가 실제로 입고 또는 수령되었음을 기록하는 물류 이벤트입니다.", examples: ["구매오더 이력 갱신, 재고 증가, GR/IR 반영과 연결됩니다."], aliases: ["Goods Receipt", "입고"] },
    "grir": { title: "GR/IR", definition: "Goods Receipt / Invoice Receipt의 약자입니다. 입고와 송장이 다른 시점에 발생할 때 두 단계를 연결해 주는 정리 계정 개념입니다.", examples: ["입고는 되었지만 송장이 아직 없는 상태를 설명할 때 유용합니다."], aliases: ["GR/IR"] },
    "pgi": { title: "PGI (Post Goods Issue · 출고)", definition: "납품 품목을 실제로 출고 처리하는 단계입니다. 이 시점에 재고가 줄고 매출원가가 회계로 반영될 수 있습니다.", examples: ["판매오더 자체가 아니라 출고(PGI) 시점에 재고·원가 영향이 발생합니다."], aliases: ["PGI", "Post Goods Issue", "출고"] },
    "billing": { title: "Billing (청구)", definition: "고객에게 대금을 청구하는 단계로, 청구문서를 생성합니다. 회계로 전기되면 매출과 고객채권이 반영됩니다.", examples: ["납품 이후 Billing 단계에서 매출이 인식되는 것이 일반적입니다."], aliases: ["Billing", "청구"] },
    "document-flow": { title: "Document Flow (문서 흐름)", definition: "선행 문서와 후속 문서의 관계를 보여주는 흐름입니다. 판매오더에서 납품, 청구, 회계문서로 이어지는 진행 상태를 이해하는 데 중요합니다.", examples: ["문서 하나만 보지 말고 전체 체인을 따라가는 훈련이 필요합니다."], aliases: ["Document Flow"] },

    "posting": { title: "Posting (전기)", definition: "업무 이벤트를 회계전표, 자재문서 등 시스템 장부에 확정 반영하는 처리입니다.", examples: ["전기 후에는 보고서와 원장, 재고 수량·가치에 영향을 줄 수 있습니다."], aliases: ["Posting", "전기"] },
    "accounting-document": { title: "전표 (회계전표)", definition: "거래의 회계적 결과를 차변/대변으로 기록한 문서입니다. 어떤 계정이 얼마 움직였는지를 담습니다.", examples: ["하나의 업무에서 물류 문서와 회계전표가 함께 생성되는 경우가 많습니다."], aliases: ["회계전표", "전표"] },
    "journal-entry": { title: "Journal Entry (회계전표)", definition: "S/4HANA에서 회계 전기 결과를 담는 핵심 단위입니다. FI와 CO 정보를 함께 담는 Universal Journal(ACDOCA)에 기록됩니다.", examples: ["업무 결과가 Journal Entry로 바뀌면서 손익과 원가에 반영됩니다."], aliases: ["Journal Entry"] },
    "universal-journal": { title: "Universal Journal", definition: "S/4HANA에서 FI와 CO를 하나의 원장(ACDOCA 테이블)으로 통합한 구조입니다. 재무·관리회계를 같은 데이터로 분석할 수 있게 합니다.", examples: ["재무 리포트와 관리회계 분석의 공통 기반이 됩니다."], aliases: ["Universal Journal"] },
    "acdoca": { title: "ACDOCA", definition: "S/4HANA의 Universal Journal 라인 아이템을 저장하는 핵심 회계 테이블입니다. FI/CO 원장성 데이터가 모입니다.", examples: ["전통적으로 나뉘어 있던 회계 데이터가 ACDOCA로 통합되었습니다."], aliases: ["ACDOCA"] },
    "gl-account": { title: "G/L Account (총계정원장 계정)", definition: "거래가 어떤 회계 계정으로 기록될지 결정하는 기준 계정입니다.", examples: ["매출, 재고, 매출원가, 고객채권, 공급업체채무 같은 계정으로 설명할 수 있습니다."], aliases: ["G/L Account", "G/L 계정", "G/L"] },
    "cost-center": { title: "Cost Center (코스트센터)", definition: "비용이 발생하는 조직 또는 책임 단위입니다. 부서 비용 집계, 예산 관리, 배부의 기준이 됩니다.", examples: ["급여, 활동비, 일반비용을 어느 조직 비용으로 볼지 결정할 때 사용합니다."], aliases: ["Cost Center", "코스트센터", "코스트 센터"] },
    "cost-object": { title: "Cost Object (원가 객체)", definition: "원가를 모으는 대상을 통칭합니다. 생산오더, 내부오더, Cost Center 등이 원가 객체가 될 수 있습니다.", examples: ["급여 결과가 원가 배부 규칙에 따라 Cost Center나 Cost Object로 넘어갑니다."], aliases: ["Cost Object"] },
    "profit-center": { title: "Profit Center (이익 센터)", definition: "수익과 비용을 함께 보아 책임 단위별 손익을 관리하는 조직 개념입니다.", examples: ["Cost Center가 비용 중심이라면 Profit Center는 손익 중심입니다."], aliases: ["Profit Center"] },
    "receivables": { title: "고객채권 (AR)", definition: "판매 후 아직 회수하지 못한, 고객으로부터 받을 돈입니다. 청구 시점에 발생하고 수금 시 청산됩니다.", examples: ["청구문서가 회계로 전기되면 매출과 함께 고객채권이 잡힙니다."], aliases: ["고객채권", "채권"] },
    "payables": { title: "공급업체 채무 (AP)", definition: "구매 후 아직 지급하지 않은, 공급업체에 줄 돈입니다. 송장검증 시 확정되고 지급 시 청산됩니다.", examples: ["공급업체 송장이 들어오면 채무가 확정됩니다."], aliases: ["공급업체 채무", "채무"] },
    "arap": { title: "AR/AP", definition: "Accounts Receivable(고객채권) / Accounts Payable(공급업체 채무)의 약자입니다. 받을 돈과 줄 돈을 함께 부르는 표현입니다.", examples: ["영업은 AR로, 구매는 AP로 회계에 연결됩니다."], aliases: ["AR/AP"] },
    "cost": { title: "원가", definition: "제품이나 서비스를 만드는 데 투입된 비용입니다. 자재비, 인건비, 활동비 등이 모여 구성됩니다.", examples: ["생산오더에 원가가 모이고 정산을 통해 손익으로 연결됩니다."], aliases: ["원가"] },
    "pnl": { title: "손익 (P&L)", definition: "일정 기간 동안의 수익에서 비용을 뺀 결과, 즉 이익 또는 손실입니다.", examples: ["여러 모듈의 거래 결과가 결산을 거쳐 손익으로 정리됩니다."], aliases: ["손익"] },
    "closing": { title: "Closing (결산)", definition: "일정 기간의 거래를 마감하고 손익·재무상태를 확정하는 회계 절차입니다.", examples: ["월/분기/연 단위 결산을 통해 리포트가 생성됩니다."], aliases: ["Closing", "결산"] },

    "production-order": { title: "Production Order (생산오더)", definition: "무엇을 얼마나 만들지 지시하는 동시에 원가를 모으는 객체입니다. 자재소비·작업확정·완제품 입고·정산의 기준이 됩니다.", examples: ["단순 작업지시서가 아니라 원가 집계의 중심이라는 점이 중요합니다."], aliases: ["Production Order", "생산오더"] },
    "confirmation": { title: "Confirmation (작업확정)", definition: "생산 작업이 실제로 수행되었음을 확정해 작업시간·수량을 기록하는 단계입니다.", examples: ["확정된 활동이 생산오더 원가에 반영됩니다."], aliases: ["Confirmation", "작업확정"] },
    "settlement": { title: "Settlement (정산)", definition: "생산오더 등에 모인 원가를 실제원가·차이·재고 등으로 배부하여 재무·관리회계로 넘기는 마감 단계입니다.", examples: ["완제품 입고 후 정산을 통해 차이와 WIP가 손익으로 연결됩니다."], aliases: ["Settlement", "정산"] },
    "bom": { title: "BOM (자재명세서)", definition: "Bill of Materials. 완제품 하나를 만들 때 필요한 자재와 수량의 목록입니다.", examples: ["MRP가 BOM을 펼쳐 필요한 하위 자재 소요량을 계산합니다."], aliases: ["BOM"] },
    "routing": { title: "Routing (공정)", definition: "제품을 생산할 때 거치는 작업 순서와 작업장, 표준 시간을 정의한 정보입니다.", examples: ["BOM이 '무엇으로'라면 Routing은 '어떻게·어디서·얼마 동안'입니다."], aliases: ["Routing"] },
    "mrp": { title: "MRP (자재소요량계획)", definition: "Material Requirements Planning. 수요와 재고를 바탕으로 무엇을 언제 얼마나 사거나 만들지 계산하는 기능입니다.", examples: ["MRP 결과로 구매요청이나 계획오더 같은 조달 제안이 생성됩니다."], aliases: ["MRP"] },
    "wip": { title: "WIP (재공품)", definition: "Work In Process. 생산이 진행 중이어서 아직 완제품이 되지 못한, 가공 중인 가치를 말합니다.", examples: ["정산 시 WIP와 차이가 계산되어 손익에 반영됩니다."], aliases: ["WIP"] },

    "timesheet": { title: "Time Sheet (타임시트)", definition: "직원 또는 작업자의 근무시간·작업시간을 기록하는 도구입니다. 급여, 프로젝트, 원가 배부와 연결될 수 있습니다.", examples: ["HR 데이터가 원가회계로 넘어가는 대표적인 환승 지점입니다."], aliases: ["Time Sheet", "타임시트"] },
    "payroll": { title: "Payroll (급여)", definition: "근무 기록을 바탕으로 급여를 계산하고 결과를 생성하는 처리입니다. 결과는 비용·원가로 회계에 연결됩니다.", examples: ["급여 결과가 소속 조직이나 배부 규칙에 따라 Cost Center로 넘어갑니다."], aliases: ["Payroll", "급여"] },
    "wage-type": { title: "Wage Type (임금유형)", definition: "급여를 구성하는 항목(기본급, 수당, 공제 등)을 분류하는 단위입니다.", examples: ["Wage Type별로 어떤 비용 계정·원가로 갈지 결정됩니다."], aliases: ["Wage Type"] },
    "activity-type": { title: "Activity Type (활동유형)", definition: "CO에서 작업시간 같은 내부 활동을 측정·배부하기 위한 단위입니다.", examples: ["생산 작업시간을 Activity Type 단가로 환산해 오더에 배부합니다."], aliases: ["Activity Type"] },
    "cost-allocation": { title: "Cost Allocation (원가 배부)", definition: "발생한 비용을 적절한 Cost Center나 원가 객체로 나누어 보내는 처리입니다.", examples: ["인건비를 어느 부서·제품 원가로 볼지 배부 규칙으로 결정합니다."], aliases: ["Cost Allocation", "원가 배부", "활동배부"] },

    "material-document": { title: "Material Document (자재문서)", definition: "입고·출고 같은 재고 이동을 기록하는 물류 문서입니다. 재고 수량·가치 변화의 근거가 됩니다.", examples: ["S/4HANA에서는 MATDOC 테이블에 통합 저장됩니다."], aliases: ["Material Document", "자재문서"] },
    "matdoc": { title: "MATDOC", definition: "S/4HANA에서 자재문서와 재고 데이터를 단순화하여 저장하는 핵심 테이블입니다.", examples: ["대량 데이터 분석 관점에서 재고 흐름을 추적할 때 중요합니다."], aliases: ["MATDOC"] },
    "vbfa": { title: "VBFA (문서 흐름 테이블)", definition: "SD에서 선행·후속 문서 관계(Document Flow)를 저장하는 테이블입니다.", examples: ["판매오더에서 납품, 청구로 이어지는 연결을 추적할 때 사용합니다."], aliases: ["VBFA"] },
    "ekko-ekpo": { title: "EKKO / EKPO (구매오더 테이블)", definition: "구매오더의 헤더(EKKO)와 아이템(EKPO)을 저장하는 테이블입니다.", examples: ["구매오더 조건과 품목 라인을 함께 볼 때 사용합니다."], aliases: ["EKKO/EKPO", "EKKO", "EKPO"] },
    "bp": { title: "BP (Business Partner)", definition: "고객·공급업체 등 거래 상대를 통합 관리하는 마스터 개념입니다. S/4HANA에서는 BP가 단일 진입점입니다.", examples: ["같은 BP가 역할에 따라 고객도, 공급업체도 될 수 있습니다."], aliases: ["BP"] },
    "plant": { title: "Plant (플랜트)", definition: "생산·보관·조달이 일어나는 물리적/논리적 사업장 단위입니다.", examples: ["같은 자재라도 플랜트별로 재고와 조달 조건이 다를 수 있습니다."], aliases: ["플랜트", "Plant"] },
    "company-code": { title: "Company Code (회사코드)", definition: "독립된 재무제표를 작성하는 법적 회계 단위입니다.", examples: ["전표는 특정 회사코드 안에서 기록되고 결산됩니다."], aliases: ["회사코드", "회사 코드", "Company Code"] },

    "chart-of-accounts": { title: "Chart of Accounts (계정과목표)", definition: "회사가 사용할 G/L 계정의 전체 목록과 구조를 정의한 것입니다.", examples: ["어떤 거래를 어떤 계정으로 기록할지의 기준이 됩니다."], aliases: ["Chart of Accounts"] },
    "valuation-area": { title: "Valuation Area (평가영역)", definition: "재고 가치를 어느 단위(보통 플랜트 또는 회사코드)에서 평가할지 정의하는 설정입니다.", examples: ["평가영역 설정에 따라 재고 금액 계산 방식이 달라질 수 있습니다."], aliases: ["Valuation Area"] },
    "account-determination": { title: "Account Determination (자동계정결정)", definition: "물류 거래가 발생할 때 어떤 G/L 계정으로 전기할지 시스템이 자동으로 결정하는 설정입니다.", examples: ["입고·출고 시 어떤 재고/원가 계정으로 갈지 자동 결정됩니다."], aliases: ["Account Determination", "자동계정결정"] },
    "pricing": { title: "Pricing (가격 결정)", definition: "판매·구매 시 단가, 할인, 부가비용 등을 조건으로 계산하는 가격 결정 로직입니다.", examples: ["가격조건(Condition)에 따라 최종 금액이 산출됩니다."], aliases: ["Pricing", "가격 책정", "가격조건"] },
    "tax": { title: "Tax (세금)", definition: "거래에 적용되는 부가세 등 세금 처리입니다. 국가·거래 유형에 따라 코드와 계정이 달라집니다.", examples: ["전표의 세금 라인은 세금 코드 설정에 따라 자동 계산됩니다."], aliases: ["Tax"] },

    "fiori": { title: "SAP Fiori", definition: "SAP의 현대적 사용자 경험(UX)입니다. 역할 기반의 앱 타일과 일관된 화면 디자인을 제공합니다.", examples: ["사용자는 업무 역할에 따라 Fiori 앱으로 업무를 처리합니다."], aliases: ["Fiori"] },
    "sap-gui": { title: "SAP GUI", definition: "전통적인 SAP 트랜잭션을 실행하는 클라이언트 화면입니다. 트랜잭션 코드(예: VA01)로 업무를 처리합니다.", examples: ["Fiori 앱과 SAP GUI 트랜잭션은 같은 백엔드 문서를 다룹니다."], aliases: ["SAP GUI"] },
    "fiori-launchpad": { title: "Fiori Catalog / Business Role", definition: "사용자에게 어떤 Fiori 앱을 보여줄지 묶는 카탈로그와, 업무 역할 단위로 권한을 부여하는 Business Role 개념입니다.", examples: ["역할에 따라 보이는 앱과 접근 가능한 데이터가 달라집니다."], aliases: ["Fiori Catalog", "Business Role"] },
    "odata": { title: "OData", definition: "SAP 백엔드와 화면(프론트엔드)이 데이터를 주고받는 REST 기반 표준 API 프로토콜입니다.", examples: ["Fiori 앱은 주로 OData 서비스를 통해 데이터를 읽고 씁니다."], aliases: ["OData"] },
    "ina": { title: "InA", definition: "Information Access. SAP 분석 도구가 데이터를 조회할 때 사용하는 분석용 인터페이스 프로토콜입니다.", examples: ["분석 화면 권한을 다룰 때 OData와 함께 검토됩니다."], aliases: ["InA"] },
    "api": { title: "API", definition: "Application Programming Interface. 시스템 간 기능·데이터를 표준 방식으로 주고받게 하는 연결점입니다.", examples: ["표준 코어를 직접 고치지 않고 공개 API로 확장하는 것이 권장됩니다."], aliases: ["API"] },
    "event": { title: "Event (이벤트)", definition: "특정 업무가 발생했음을 알리는 신호입니다. 이를 구독해 비동기로 후속 처리를 연결할 수 있습니다.", examples: ["납품 완료 이벤트를 받아 외부 포털에 상태를 알리는 식으로 확장합니다."], aliases: ["이벤트", "Event"] },
    "btp": { title: "SAP BTP", definition: "SAP Business Technology Platform. 앱 개발, 통합, 자동화, 데이터·분석, 확장 기능을 제공하는 SAP의 기술 플랫폼입니다.", examples: ["표준 ERP 코어를 직접 수정하지 않고 외부 확장 앱을 구성할 때 활용됩니다."], aliases: ["SAP BTP", "BTP"] },
    "clean-core": { title: "Clean Core", definition: "표준 핵심 시스템을 깨끗하게 유지하고, 차별화 요구사항은 공개 확장 방식이나 외부 계층으로 분리하려는 아키텍처 원칙입니다.", examples: ["업그레이드 안정성과 유지보수성을 높이는 방향으로 설명할 수 있습니다."], aliases: ["Clean Core"] },
    "key-user-extensibility": { title: "Key User Extensibility", definition: "개발 코드 없이 권한 있는 현업 담당자가 화면에 필드를 추가하는 등 표준 범위 안에서 확장하는 방식입니다.", examples: ["간단한 확장은 Key User 도구로, 복잡한 것은 BTP로 분리합니다."], aliases: ["Key User Extensibility"] },
    "side-by-side": { title: "Side-by-Side 확장", definition: "표준 ERP를 건드리지 않고 BTP 같은 외부 플랫폼에 별도 앱을 두어 기능을 확장하는 방식입니다.", examples: ["외부 포털 알림 기능은 side-by-side 확장으로 구성하는 것이 안전합니다."], aliases: ["Side-by-Side", "side-by-side"] },
    "industry-cloud": { title: "Industry Cloud Apps", definition: "특정 산업의 요구사항을 반영한 앱입니다. 표준 프로세스를 바꾸기보다 산업별 시나리오를 보완합니다.", examples: ["같은 구매·판매라도 제조·유통·공공·금융에서 필요한 기능이 다릅니다."], aliases: ["Industry Cloud Apps"] },
    "lob": { title: "Line of Business (LoB)", definition: "Finance, Sales, Procurement, Manufacturing 같은 업무 영역을 가리키는 표현입니다.", examples: ["LoB 앱은 업무 영역별 SAP 표준 앱을 의미합니다."], aliases: ["Line of Business", "SAP LOB Apps", "LoB"] }
  };

  function openTermFactory(refs) {
    return function openTerm(key) {
      const item = glossary[key];
      if (!item) return;
      refs.title.textContent = item.title;
      refs.definition.textContent = item.definition;
      refs.examples.innerHTML = "";
      (item.examples || []).forEach((example) => {
        const li = document.createElement("li");
        li.textContent = example;
        refs.examples.appendChild(li);
      });
      refs.dialog.showModal();
    };
  }

  // 본문에 등장하는 용어를 첫 등장 위치 기준으로 클릭 가능한 버튼으로 감싼다.
  function autoLinkTerms(linkedKeys) {
    const main = document.getElementById("main");
    if (!main) return;

    const SKIP_TAGS = new Set(["BUTTON", "A", "H1", "H2", "H3", "H4", "CODE", "SUMMARY", "SCRIPT", "STYLE"]);
    const SKIP_CLASSES = ["tag", "mock-title", "route-head", "section-title", "term-cloud", "stage7-section__label", "breadcrumb"];

    const candidates = [];
    Object.keys(glossary).forEach((key) => {
      (glossary[key].aliases || []).forEach((alias) => candidates.push({ key, alias }));
    });
    candidates.sort((a, b) => b.alias.length - a.alias.length); // 긴 표기 우선(FI/CO가 FI보다 먼저)

    const isWordChar = (ch) => /[A-Za-z0-9]/.test(ch);
    const isAscii = (s) => /^[\x00-\x7F]+$/.test(s);

    function bestMatchAt(text, i) {
      for (const c of candidates) {
        if (linkedKeys.has(c.key)) continue;
        const a = c.alias;
        if (text.substr(i, a.length) !== a) continue;
        if (isAscii(a)) {
          const prev = i > 0 ? text[i - 1] : "";
          const next = i + a.length < text.length ? text[i + a.length] : "";
          if (isWordChar(prev) || isWordChar(next)) continue; // 단어 일부에 걸리는 오인식 방지
        }
        return c;
      }
      return null;
    }

    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        let el = node.parentElement;
        while (el && el !== main) {
          if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
          if (el.classList && SKIP_CLASSES.some((c) => el.classList.contains(c))) return NodeFilter.FILTER_REJECT;
          if (el.hasAttribute && el.hasAttribute("data-term")) return NodeFilter.FILTER_REJECT;
          el = el.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    textNodes.forEach((textNode) => {
      const text = textNode.nodeValue;
      const frag = document.createDocumentFragment();
      let i = 0;
      let last = 0;
      let changed = false;
      while (i < text.length) {
        const c = bestMatchAt(text, i);
        if (c) {
          if (i > last) frag.appendChild(document.createTextNode(text.slice(last, i)));
          const btn = document.createElement("button");
          btn.className = "term-btn";
          btn.type = "button";
          btn.setAttribute("data-term", c.key);
          btn.textContent = text.substr(i, c.alias.length);
          frag.appendChild(btn);
          linkedKeys.add(c.key);
          i += c.alias.length;
          last = i;
          changed = true;
        } else {
          i += 1;
        }
      }
      if (changed) {
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        textNode.parentNode.replaceChild(frag, textNode);
      }
    });
  }

  // 하단 용어 사전 칩 목록을 glossary로부터 생성한다.
  function renderTermCloud() {
    const cloud = document.querySelector(".term-cloud");
    if (!cloud) return;
    cloud.innerHTML = "";
    Object.keys(glossary).forEach((key) => {
      const chip = document.createElement("button");
      chip.className = "term-chip";
      chip.type = "button";
      chip.setAttribute("data-term", key);
      chip.textContent = glossary[key].title;
      cloud.appendChild(chip);
    });
  }

  function initGlossary() {
    const dialog = document.getElementById("glossaryDialog");
    if (!dialog) return;
    const refs = {
      dialog: dialog,
      title: document.getElementById("dialogTitle"),
      definition: document.getElementById("dialogDefinition"),
      examples: document.getElementById("dialogExamples")
    };
    const openTerm = openTermFactory(refs);

    // 수동으로 이미 감싼 용어 버튼(.term-btn)은 중복 링크하지 않도록 먼저 표시
    const linkedKeys = new Set();
    document.querySelectorAll("#main .term-btn[data-term]").forEach((btn) => linkedKeys.add(btn.getAttribute("data-term")));

    autoLinkTerms(linkedKeys);
    renderTermCloud();

    document.querySelectorAll("[data-term]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation(); // common.js 전역 핸들러로 전파되어 중복 팝업이 뜨지 않도록 차단
        openTerm(button.dataset.term);
      });
    });

    document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!isInside) dialog.close();
    });
  }

  function initLevelTabs() {
    const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
    const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
    if (!tabButtons.length) return;

    function activateTab(activeButton) {
      tabButtons.forEach((button) => {
        const isSelected = button === activeButton;
        button.setAttribute("aria-selected", String(isSelected));
        button.tabIndex = isSelected ? 0 : -1;
      });
      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === activeButton.getAttribute("aria-controls"));
      });
    }

    tabButtons.forEach((button, index) => {
      button.addEventListener("click", () => activateTab(button));
      button.addEventListener("keydown", (event) => {
        const prev = (index - 1 + tabButtons.length) % tabButtons.length;
        const next = (index + 1) % tabButtons.length;
        if (event.key === "ArrowLeft") { tabButtons[prev].focus(); }
        if (event.key === "ArrowRight") { tabButtons[next].focus(); }
        if (event.key === "Home") { tabButtons[0].focus(); }
        if (event.key === "End") { tabButtons[tabButtons.length - 1].focus(); }
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activateTab(button); }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGlossary();
    initLevelTabs();
  });
}());
