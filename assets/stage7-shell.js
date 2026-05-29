// SAP Developer Learning Library - Stage 7 Global Shell Draft
// Opt-in helper. Existing pages are not affected unless data-page-type exists.
(function () {
  "use strict";

  const ICON_HOME = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3 2.5 11.2l1.3 1.5L5 11.6V20h5.5v-5h3v5H19v-8.4l1.2 1.1 1.3-1.5L12 3Zm0 2.6 5 4.3V18h-1.5v-5h-7v5H7v-8.1l5-4.3Z"/></svg>';
  const ICON_PREV = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.7 6.3 9 12l5.7 5.7-1.4 1.4L6.2 12l7.1-7.1 1.4 1.4Z"/></svg>';
  const ICON_NEXT = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m9.3 17.7 5.7-5.7-5.7-5.7 1.4-1.4 7.1 7.1-7.1 7.1-1.4-1.4Z"/></svg>';

  const CATEGORY_HOME = {
    roadmap: { title: "로드맵", href: "pages/roadmap.html" },
    abap: { title: "ABAP 개발 홈", href: "pages/abap.html" },
    ui5: { title: "UI5/Fiori 홈", href: "pages/ui5-fiori.html" },
    module: { title: "SAP 모듈 기초 홈", href: "pages/module-basics.html" },
    practice: { title: "통합 실습 홈", href: "pages/integrated-practice.html" },
    reference: { title: "Reference 홈", href: "pages/reference.html" }
  };

  const DOCS = {
    // Area A: Roadmap (로드맵)
    "roadmap": { title: "SAP 개발자 학습 로드맵", category: "roadmap", href: "docs/roadmap/developer-learning-roadmap.html", group: "학습 가이드" },
    "tools": { title: "SAP 개발 환경과 도구 입문", category: "roadmap", href: "docs/roadmap/development-tools-overview.html", group: "학습 가이드" },
    "abap-learning-path": { title: "ABAP 개발자 단계별 학습 가이드", category: "roadmap", href: "docs/roadmap/abap-learning-path.html", preparing: true, skeleton: true, group: "학습 가이드" },
    "ui5-learning-path": { title: "UI5/Fiori 개발자 단계별 학습 가이드", category: "roadmap", href: "docs/roadmap/ui5-learning-path.html", preparing: true, skeleton: true, group: "학습 가이드" },
    "sap-module-orientation": { title: "SAP 모듈 이해와 개발자 관점 오리엔테이션", category: "roadmap", href: "docs/roadmap/sap-module-orientation.html", preparing: true, skeleton: true, group: "학습 가이드" },
    "requirements-analysis": { title: "SAP 개발 요구사항 분석법", category: "roadmap", href: "docs/roadmap/requirements-analysis-guide.html", preparing: true, skeleton: true, group: "학습 가이드" },
    "cts-transport": { title: "Transport Request / CTS 입문", category: "roadmap", href: "docs/roadmap/cts-transport-intro.html", preparing: true, skeleton: true, group: "학습 가이드" },
    "debug": { title: "SAP 개발 디버깅 / 트러블슈팅 통합 가이드", category: "roadmap", href: "docs/roadmap/dev-debugging.html", aliases: ["debugging"], group: "학습 가이드" },

    // Area B: ABAP 개발 (ABAP)
    "abap-as-abap-overview": { title: "SAP AS ABAP 개요 & 아키텍처 기초", category: "abap", href: "docs/abap/abap-as-abap-overview.html", preparing: true, group: "1단계. 아키텍처 기초" },
    "abap-basic-syntax": { title: "ABAP 기본 문법 및 메모리 처리", category: "abap", href: "docs/abap/abap-basic-syntax.html", preparing: true, group: "2단계. 기본 문법" },
    "abap-ddic-basics": { title: "ABAP Dictionary (DDIC) 설계", category: "abap", href: "docs/abap/abap-ddic-basics.html", preparing: true, group: "3단계. DDIC 설계" },
    "abap-classic": { title: "Classic Report & ALV 기초", category: "abap", href: "docs/abap/abap-classic-report-itab-alv.html", legacyHref: "v3/01-abap/abap-classic-report-itab-alv-beginner-v3.html", group: "4단계. Classic Report" },
    "abap-db-luw-lock": { title: "DB 제어 및 트랜잭션 관리", category: "abap", href: "docs/abap/abap-db-luw-lock.html", preparing: true, group: "5단계. DB & 트랜잭션" },
    "abap-screen-dynpro": { title: "Screen UI 개발 (Dynpro)", category: "abap", href: "docs/abap/abap-screen-dynpro.html", preparing: true, group: "6단계. Dynpro UI" },
    "abap-object-oriented": { title: "Object-Oriented ABAP", category: "abap", href: "docs/abap/abap-object-oriented.html", preparing: true, group: "7단계. OO ABAP" },
    "abap-debugging-analysis": { title: "디버깅 및 런타임 분석", category: "abap", href: "docs/abap/abap-debugging-analysis.html", preparing: true, group: "8단계. 성능 분석" },
    "abap-enhancement-badi": { title: "표준 확장 및 Enhancement", category: "abap", href: "docs/abap/abap-enhancement-badi.html", preparing: true, group: "9단계. 표준 확장" },
    "abap-new-syntax": { title: "Modern ABAP & Clean Code", category: "abap", href: "docs/abap/abap-new-syntax.html", legacyHref: "v3/01-abap/abap-new-syntax-beginner-guide-v3.html", group: "10단계. Modern ABAP" },
    "abap-clean-unit-test": { title: "Clean ABAP & ABAP Unit Test", category: "abap", href: "docs/abap/abap-clean-unit-test.html", preparing: true, group: "10단계. Modern ABAP" },
    "cds-odata": { title: "ABAP Core Data Services (CDS)", category: "abap", href: "docs/abap/cds-to-odata.html", legacyHref: "v3/01-abap/sap-cds-to-odata-beginner-guide-v3.html", group: "11단계. CDS View" },
    "odata-export": { title: "SAP 데이터를 외부로 내보내는 방법 정리", category: "abap", href: "docs/abap/abap-odata-export.html", group: "11단계. CDS View" },
    "gateway-odata-v2-crud": { title: "Gateway / OData V2 CRUD 입문", category: "abap", href: "docs/abap/gateway-odata-v2-crud.html", legacyHref: "v3/01-abap/sap-gateway-odata-v2-crud-beginner-guide-v3.html", aliases: ["gateway"], group: "12단계. 현대적 개발 모델" },
    "rap-e2e": { title: "RAP End-to-End 입문", category: "abap", href: "docs/abap/rap-end-to-end.html", legacyHref: "v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html", group: "12단계. 현대적 개발 모델" },
    "rap-action": { title: "RAP Action 다건 선택 처리", category: "abap", href: "docs/abap/rap-action.html", legacyHref: "v3/01-abap/rap-action-invocation-grouping-v3.html", group: "12단계. 현대적 개발 모델" },
    "abap-cloud": { title: "ABAP Cloud App Development 정리", category: "abap", href: "docs/abap/abap-cloud.html", legacyHref: "v3/01-abap/abap-cloud-app-development-summary-v3.html", group: "12단계. 현대적 개발 모델" },
    "abap-rfc-bapi": { title: "RFC / BAPI 인터페이스 입문", category: "abap", href: "docs/abap/abap-rfc-bapi.html", preparing: true, group: "부록. 실무 심화" },
    "abap-idoc-intro": { title: "IDoc 연계 아키텍처 입문", category: "abap", href: "docs/abap/abap-idoc-intro.html", preparing: true, group: "부록. 실무 심화" },
    "abap-amdp-tuning": { title: "AMDP & SQL Performance Tuning", category: "abap", href: "docs/abap/abap-amdp-tuning.html", preparing: true, group: "부록. 실무 심화" },
    "abap-smart-adobe-forms": { title: "SAP 출력 Form (Smart Forms / Adobe Forms)", category: "abap", href: "docs/abap/abap-smart-adobe-forms.html", preparing: true, group: "부록. 실무 심화" },

    // Area C: UI5/Fiori 개발 (UI5)
    "js-core-basics": { title: "Modern Javascript 핵심", category: "ui5", href: "docs/ui5/js-core-basics.html", preparing: true, group: "Part 1. JS 기초" },
    "js-async-promise": { title: "비동기 Javascript 입문", category: "ui5", href: "docs/ui5/js-async-promise.html", preparing: true, group: "Part 1. JS 기초" },
    "ui5-architecture-project": { title: "UI5 아키텍처 및 개발 환경", category: "ui5", href: "docs/ui5/ui5-architecture-project.html", preparing: true, group: "Part 2. UI5 입문" },
    "ui5-mvc-xmlview": { title: "UI5 MVC 패턴과 XML View 기초", category: "ui5", href: "docs/ui5/ui5-mvc-xmlview.html", preparing: true, group: "Part 2. UI5 입문" },
    "ui5-controller": { title: "UI5 Controller 함수 문법 입문", category: "ui5", href: "docs/ui5/ui5-controller-basics.html", legacyHref: "v3/02-ui5-fiori/sapui5-controller-function-intro-v3.html", group: "Part 2. UI5 입문" },
    "ui5-odata-crud": { title: "SAPUI5 OData Model과 CRUD 입문", category: "ui5", href: "docs/ui5/ui5-odata-crud.html", legacyHref: "v3/02-ui5-fiori/sapui5-odata-model-crud-beginner-guide-v3.html", group: "Part 2. UI5 입문" },
    "ui5-messaging": { title: "Messaging과 Input Validation 실무 입문", category: "ui5", href: "docs/ui5/ui5-validation-messaging.html", legacyHref: "v3/02-ui5-fiori/sapui5-messaging-input-validation-v3.html", group: "Part 2. UI5 입문" },
    "ui5-routing": { title: "SAPUI5 Routing과 Layout 입문", category: "ui5", href: "docs/ui5/ui5-routing-layout.html", legacyHref: "v3/02-ui5-fiori/sapui5-routing-layout-beginner-guide-v3.html", group: "Part 2. UI5 입문" },
    "ui5-fragment-dialog": { title: "UI5 Fragment & Dialog 활용", category: "ui5", href: "docs/ui5/ui5-fragment-dialog.html", preparing: true, group: "Part 2. UI5 입문" },
    "ui5-i18n-multilingual": { title: "UI5 i18n 글로벌 다국어 처리", category: "ui5", href: "docs/ui5/ui5-i18n-multilingual.html", preparing: true, group: "Part 2. UI5 입문" },
    "ui5-custom-control": { title: "Custom Control 및 Reuse Component 구현", category: "ui5", href: "docs/ui5/sapui5-custom-control.html", preparing: true, group: "Part 3. UI5 심화" },
    "ui5-metadata-patterns": { title: "Metadata 활용 및 애플리케이션 패턴", category: "ui5", href: "docs/ui5/ui5-metadata-patterns.html", preparing: true, group: "Part 3. UI5 심화" },
    "ui5-mockserver-git": { title: "UI5 Mock Server와 Git 협업 기법", category: "ui5", href: "docs/ui5/ui5-mockserver-git.html", preparing: true, group: "Part 3. UI5 심화" },
    "ui5-qunit-opa-testing": { title: "UI5 테스팅 기초 (QUnit & OPA)", category: "ui5", href: "docs/ui5/ui5-qunit-opa-testing.html", preparing: true, group: "Part 3. UI5 심화" },
    "ui5-data-flow": { title: "SAPUI5 데이터 흐름과 Messaging 아키텍처", category: "ui5", href: "docs/ui5/ui5-data-flow.html", legacyHref: "v3/02-ui5-fiori/sapui5-messaging-data-flow-v3.html", group: "Part 3. UI5 심화" },
    "gateway-segw-crud-details": { title: "SAP Gateway & OData V2 CRUD 개발 실무", category: "ui5", href: "docs/ui5/gateway-segw-crud-details.html", preparing: true, group: "Part 4. Gateway 연동" },
    "gateway-odata-advanced": { title: "OData 고급 연계 (Batch, Function Import)", category: "ui5", href: "docs/ui5/gateway-odata-advanced.html", preparing: true, group: "Part 4. Gateway 연동" },
    "flp": { title: "Fiori 디자인 원칙과 Launchpad 배포", category: "ui5", href: "docs/ui5/fiori-launchpad.html", legacyHref: "v3/02-ui5-fiori/sap-fiori-launchpad-deployment-beginner-guide-v3.html", group: "Part 5. Launchpad 통합" },
    "fiori-intent-navigation": { title: "Intent Navigation과 Semantic Object 설계", category: "ui5", href: "docs/ui5/fiori-intent-navigation.html", preparing: true, group: "Part 5. Launchpad 통합" },
    "fiori-elements-annotation": { title: "CDS View와 OData Annotation 설계", category: "ui5", href: "docs/ui5/fiori-elements-annotation.html", preparing: true, group: "Part 6. Fiori Elements" },
    "fiori-elements": { title: "Fiori Elements 애플리케이션 개발", category: "ui5", href: "docs/ui5/fiori-elements.html", legacyHref: "v3/02-ui5-fiori/sap-fiori-elements-beginner-guide-v3.html", group: "Part 6. Fiori Elements" },
    "fiori-elements-advanced": { title: "Fiori Elements 심화 (Action, Draft)", category: "ui5", href: "docs/ui5/fiori-elements-advanced.html", preparing: true, group: "Part 6. Fiori Elements" },
    "rap-behavior-logic": { title: "RAP Behavior와 비즈니스 로직 구현", category: "ui5", href: "docs/ui5/rap-behavior-logic.html", preparing: true, group: "Part 7. RAP + UI5 통합" },
    "rap-service-binding-ui": { title: "RAP 기반 Service Definition 및 UI 연동", category: "ui5", href: "docs/ui5/rap-service-binding-ui.html", preparing: true, group: "Part 7. RAP + UI5 통합" },
    "rap-fiori-elements-advanced": { title: "RAP Fiori Elements 자동 생성 및 Draft 연동", category: "ui5", href: "docs/ui5/rap-fiori-elements-advanced.html", preparing: true, group: "Part 7. RAP + UI5 통합" },

    // Area D: SAP 모듈 기초 (module)
    "module-overview": { title: "SAP 모듈 기초와 개발자 관점", category: "module", href: "docs/module/module-basics-for-developers.html", legacyHref: "v3/03-module-basics/sap-module-basics-for-developers-v3.html", group: "공통 지식" },
    "erp-metro": { title: "ERP Business Process Metro", category: "module", href: "docs/module/erp-business-process-metro.html", group: "공통 지식" },
    "table-map": { title: "SAP Standard Table Map 입문", category: "module", href: "docs/module/standard-table-map.html", legacyHref: "v3/03-module-basics/sap-standard-table-map-for-developers-v3.html", group: "공통 지식" },
    "mm": { title: "MM 프로세스와 주요 테이블 입문", category: "module", href: "docs/module/mm-process-tables.html", legacyHref: "v3/03-module-basics/sap-mm-process-and-tables-beginner-v3.html", group: "구매 (MM)" },
    "pp": { title: "PP 프로세스와 주요 테이블 입문", category: "module", href: "docs/module/pp-process-tables.html", legacyHref: "v3/03-module-basics/sap-pp-process-and-tables-beginner-v3.html", group: "생산 (PP)" },
    "atp": { title: "SAP ATP 학생 학습 패키지", category: "module", href: "docs/module/pp-atp.html", legacyHref: "v3/03-module-basics/sap-pp-atp-learning-package-v3.html", group: "생산 (PP)" },
    "mrp": { title: "MRP 학생 배포용 학습 패키지", category: "module", href: "docs/module/pp-mrp.html", legacyHref: "v3/03-module-basics/sap-pp-mrp-learning-package-v3.html", group: "생산 (PP)" },
    "safety-stock": { title: "SAP 안전재고 관리 학생 학습 패키지", category: "module", href: "docs/module/pp-safety-stock.html", legacyHref: "v3/03-module-basics/sap-pp-safety-stock-learning-package-v3.html", group: "생산 (PP)" },
    "sd": { title: "SD 프로세스와 주요 테이블 입문", category: "module", href: "docs/module/sd-process-tables.html", legacyHref: "v3/03-module-basics/sap-sd-process-and-tables-beginner-v3.html", group: "영업 (SD)" },
    "fi": { title: "FI 프로세스와 주요 테이블 입문", category: "module", href: "docs/module/fi-process-tables.html", legacyHref: "v3/03-module-basics/sap-fi-process-and-tables-beginner-v3.html", group: "회계 (FI)" },
    "fi-gl-adult": { title: "SAP FI G/L Accounts 번호범위 정리", category: "module", href: "docs/module/fi-gl-number-range.html", legacyHref: "v3/03-module-basics/sap-fi-gl-number-range-adult-v3.html", group: "회계 (FI)" },
    "fi-gl-elementary": { title: "SAP FI G/L Accounts 번호범위 초급 비유형", category: "module", href: "docs/module/fi-gl-number-range-elementary.html", legacyHref: "v3/03-module-basics/sap-fi-gl-number-range-elementary-v3.html", group: "회계 (FI)" },
    "fi-gl-visual": { title: "SAP FI G/L Accounts 번호범위 Visual Guide", category: "module", href: "docs/module/fi-gl-number-range-visual-guide.html", legacyHref: "v3/03-module-basics/sap-fi-gl-number-range-visual-deck-v3.html", group: "회계 (FI)" },
    "co": { title: "CO 프로세스와 주요 테이블 입문", category: "module", href: "docs/module/co-process-tables.html", legacyHref: "v3/03-module-basics/sap-co-process-and-tables-beginner-v3.html", group: "원가 (CO)" },
    "auth-intro": { title: "Authorization / 권한 개념 입문", category: "module", href: "docs/module/auth-intro.html", preparing: true, group: "추가 핵심 모듈" },
    "wm-ewm-basics": { title: "WM/EWM 창고관리 기초 (개발자 관점)", category: "module", href: "docs/module/wm-ewm-basics.html", preparing: true, group: "추가 핵심 모듈" },
    "hr-hcm-basics": { title: "HR/HCM 인사관리 기초 (개발자 관점)", category: "module", href: "docs/module/hr-hcm-basics.html", preparing: true, group: "추가 핵심 모듈" },

    // Area E: 통합 실습 (practice)
    "flight-model": { title: "SAP Flight Model 데이터 구조 해설", category: "practice", href: "docs/practice/flight-model-guide.html", legacyHref: "v3/04-integrated-practice/sap-flight-model-table-guide-v3.html", group: "실습 준비" },
    "flight-integrated": { title: "Flight 통합 실습 — Classic ABAP + Gateway + UI5", category: "practice", href: "docs/practice/flight-practice.html", legacyHref: "v3/04-integrated-practice/sap-flight-integrated-practice-classrun-gateway-ui5-v3.html", group: "실습 수행" },
    "flight-rap-migration": { title: "Flight 통합 실습 — RAP BO 전환 시나리오", category: "practice", href: "docs/practice/flight-rap-migration.html", preparing: true, group: "실습 수행" },
    "mini-project-sd": { title: "미니 프로젝트 — 주문/납품 조회 시스템 설계", category: "practice", href: "docs/practice/mini-project-sd-query.html", preparing: true, group: "실습 수행" },

    // Area F: Reference / 운영 (reference)
    "glossary": { title: "SAP 개발자 용어사전", category: "reference", href: "docs/reference/sap-developer-glossary.html", group: "참고 자료" },
    "style-guide": { title: "SAP Developer Learning Library 문체 기준", category: "reference", href: "docs/reference/sap-developer-writing-style-guide.html", group: "운영 가이드" },
    "prose-audit": { title: "문체 구조화 자동 검수 리포트", category: "reference", href: "archive/v3/99-reference/prose-audit-report-v3-5.html", group: "운영 가이드" },
    "final-audit": { title: "SAP Developer Learning Library v3 최종 검수 리포트", category: "reference", href: "archive/v3/99-reference/final-audit-report-v3.html", group: "운영 가이드" },
    "stage5-navigation-report": { title: "Stage 5 Navigation 검수 리포트", category: "reference", href: "archive/v3/99-reference/stage5-navigation-report.html", group: "운영 가이드" },
    "abap-unit-test-intro": { title: "ABAP Unit Test 입문", category: "reference", href: "docs/reference/abap-unit-test-intro.html", preparing: true, group: "추가 가이드" },
    "sap-coding-convention": { title: "SAP 코딩 컨벤션 가이드", category: "reference", href: "docs/reference/sap-coding-convention.html", preparing: true, group: "추가 가이드" }
  };

  const LEARNING_PATHS = {
    roadmap: {
      title: "로드맵 / 학습전략",
      items: ["roadmap", "tools", "abap-learning-path", "ui5-learning-path", "sap-module-orientation", "requirements-analysis", "cts-transport", "debug"]
    },
    abap: {
      title: "ABAP 개발자 경로",
      items: [
        "abap-as-abap-overview", "abap-basic-syntax", "abap-ddic-basics", "abap-classic",
        "abap-db-luw-lock", "abap-screen-dynpro", "abap-object-oriented", "abap-debugging-analysis",
        "abap-enhancement-badi", "abap-new-syntax", "abap-clean-unit-test", "cds-odata",
        "odata-export", "gateway-odata-v2-crud", "rap-e2e", "rap-action",
        "abap-cloud", "abap-rfc-bapi", "abap-idoc-intro", "abap-amdp-tuning", "abap-smart-adobe-forms"
      ]
    },
    ui5: {
      title: "UI5/Fiori 개발자 경로",
      items: [
        "js-core-basics", "js-async-promise", "ui5-architecture-project", "ui5-mvc-xmlview",
        "ui5-controller", "ui5-odata-crud", "ui5-messaging", "ui5-routing",
        "ui5-fragment-dialog", "ui5-i18n-multilingual", "ui5-custom-control", "ui5-metadata-patterns",
        "ui5-mockserver-git", "ui5-qunit-opa-testing", "ui5-data-flow", "gateway-segw-crud-details",
        "gateway-odata-advanced", "flp", "fiori-intent-navigation", "fiori-elements-annotation",
        "fiori-elements", "fiori-elements-advanced", "rap-behavior-logic", "rap-service-binding-ui",
        "rap-fiori-elements-advanced"
      ]
    },
    module: {
      title: "모듈/테이블 이해 경로",
      items: [
        "module-overview", "erp-metro", "table-map", "mm", "pp",
        "atp", "mrp", "safety-stock", "sd",
        "fi", "fi-gl-adult", "fi-gl-elementary", "fi-gl-visual",
        "co", "auth-intro", "wm-ewm-basics", "hr-hcm-basics"
      ]
    },
    practice: {
      title: "실무형 빠른 경로",
      items: ["flight-model", "flight-integrated", "flight-rap-migration", "mini-project-sd"]
    },
    reference: {
      title: "Reference / 운영",
      items: ["glossary", "style-guide", "prose-audit", "final-audit", "stage5-navigation-report", "abap-unit-test-intro", "sap-coding-convention"]
    }
  };

  const RELATED_DOCS = {
    "gateway-odata-v2-crud": ["cds-odata", "ui5-odata-crud", "ui5-messaging", "rap-e2e", "flight-integrated"],
    "cds-odata": ["gateway-odata-v2-crud", "rap-e2e", "odata-export"],
    "ui5-odata-crud": ["gateway-odata-v2-crud", "ui5-messaging", "ui5-routing"],
    "ui5-messaging": ["ui5-odata-crud", "ui5-data-flow", "flight-integrated"]
  };

  function canonicalDocId(id) {
    if (!id) return "";
    if (DOCS[id]) return id;
    return Object.keys(DOCS).find(function (key) {
      return (DOCS[key].aliases || []).includes(id);
    }) || id;
  }

  function rootPrefix() {
    const path = window.location.pathname;
    if (path.includes("/docs/") || path.includes("/v3/")) return "../../";
    if (path.includes("/pages/")) return "../";
    if (path.includes("/archive/")) return "../../../";
    return "./";
  }

  function toDateLabel(value) {
    if (!value) return "미기록";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value.slice(0, 10) || value;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function metadata() {
    const body = document.body;
    return {
      pageType: body.dataset.pageType || "",
      category: body.dataset.activeCategory || "",
      docId: canonicalDocId(body.dataset.docId || body.dataset.activeDoc || ""),
      title: body.dataset.docTitle || document.title || "SAP Developer Learning Library",
      version: body.dataset.docVersion || "",
      createdAt: body.dataset.docCreatedAt || "",
      updatedAt: body.dataset.docUpdatedAt || "",
      distributor: body.dataset.distributor || "정훈영"
    };
  }

  function buildTopbar(meta) {
    const prefix = rootPrefix();
    const category = CATEGORY_HOME[meta.category];
    const currentPath = findPathForDoc(meta.docId);
    const topbar = document.createElement("header");
    topbar.className = "stage7-topbar prose-summary";
    topbar.setAttribute("data-prose", "summary");

    const links = [];
    if (meta.pageType === "home") {
      links.push('<a class="stage7-quick-link" href="' + prefix + 'pages/roadmap.html">로드맵</a>');
      links.push('<a class="stage7-quick-link" href="' + prefix + 'pages/abap.html">ABAP</a>');
      links.push('<a class="stage7-quick-link" href="' + prefix + 'pages/ui5-fiori.html">UI5/Fiori</a>');
    } else if (category) {
      links.push('<a class="stage7-quick-link" href="' + prefix + category.href + '">' + category.title + '</a>');
    }
    if (meta.pageType === "doc" && currentPath) {
      links.push(buildStepLink(currentPath.prev, "prev", prefix));
      links.push(buildStepLink(currentPath.next, "next", prefix));
    }

    topbar.innerHTML = '' +
      '<div class="stage7-topbar__inner">' +
        '<a class="stage7-brand" href="' + prefix + 'index.html" aria-label="SAP 학습자료 홈">' +
          '<span class="stage7-brand__icon">' + ICON_HOME + '</span>' +
          '<span>SAP 학습자료 홈</span>' +
        '</a>' +
        '<div class="stage7-actions" aria-label="페이지 운영 정보">' +
          '<span class="stage7-info-pill">수정일자 <strong data-shell-field="updated-date">' + toDateLabel(meta.updatedAt) + '</strong></span>' +
          '<span class="stage7-info-pill">배포자 <strong data-shell-field="distributor">' + meta.distributor + '</strong></span>' +
          links.join("") +
        '</div>' +
      '</div>';

    return topbar;
  }

  function ensureTopbar(meta) {
    if (!meta.pageType) return;
    if (document.querySelector(".stage7-topbar")) return;
    document.body.insertBefore(buildTopbar(meta), document.body.firstChild);
  }

  function localTocEntries() {
    const entries = [];
    const seen = new Set();

    function addEntry(id, label) {
      if (!id || seen.has(id)) return;
      const cleanLabel = (label || "").trim();
      if (!cleanLabel) return;
      seen.add(id);
      entries.push({ id: id, label: cleanLabel });
    }

    Array.from(document.querySelectorAll("main section[id], .stage7-shell section[id]")).forEach(function (section) {
      const heading = section.querySelector("h2, h3");
      if (!heading) return;
      addEntry(section.id, heading.textContent);
    });

    Array.from(document.querySelectorAll("main h2[id], main h3[id], .stage7-shell h2[id], .stage7-shell h3[id]")).forEach(function (heading) {
      addEntry(heading.id, heading.textContent);
    });

    return entries;
  }

  function buildLocalToc() {
    const entries = localTocEntries();
    if (!entries.length) return '<p class="muted">이 문서 안의 이동 가능한 제목이 아직 없다.</p>';
    return '<div class="stage7-side-heading">이 문서 안에서</div>' +
      '<nav class="stage7-local-toc" aria-label="이 문서 안에서">' +
      entries.map(function (entry) {
        return '<a href="#' + entry.id + '">' + entry.label + '</a>';
      }).join("") +
      '</nav>';
  }

  function docHref(docId, prefix) {
    const doc = DOCS[docId];
    return doc ? prefix + doc.href : "#";
  }

  function buildStepLink(docId, direction, prefix) {
    const doc = DOCS[docId];
    const icon = direction === "prev" ? ICON_PREV : ICON_NEXT;
    const label = direction === "prev" ? "이전 문서" : "다음 문서";
    if (!doc) {
      return '<span class="stage7-icon-button disabled" aria-label="' + label + '">' + icon + '</span>';
    }
    return '<a class="stage7-icon-button" href="' + docHref(docId, prefix) + '" title="' + label + ': ' + doc.title + '" aria-label="' + label + ': ' + doc.title + '">' + icon + '</a>';
  }

  function findPathForDoc(docId) {
    const canonical = canonicalDocId(docId);
    const keys = Object.keys(LEARNING_PATHS);
    for (let i = 0; i < keys.length; i += 1) {
      const path = LEARNING_PATHS[keys[i]];
      const index = path.items.indexOf(canonical);
      if (index >= 0) {
        // Find previous non-preparing document (allow skeleton)
        let prev = "";
        for (let j = index - 1; j >= 0; j -= 1) {
          const doc = DOCS[path.items[j]];
          if (doc && (!doc.preparing || doc.skeleton)) {
            prev = path.items[j];
            break;
          }
        }
        // Find next non-preparing document (allow skeleton)
        let next = "";
        for (let j = index + 1; j < path.items.length; j += 1) {
          const doc = DOCS[path.items[j]];
          if (doc && (!doc.preparing || doc.skeleton)) {
            next = path.items[j];
            break;
          }
        }
        return {
          key: keys[i],
          title: path.title,
          items: path.items,
          index: index,
          prev: prev,
          next: next
        };
      }
    }
    return null;
  }

  function buildRelatedDocs(meta) {
    const prefix = rootPrefix();
    const current = canonicalDocId(meta.docId);
    const related = RELATED_DOCS[current] || Object.keys(DOCS).filter(function (id) {
      return id !== current && DOCS[id].category === meta.category;
    }).slice(0, 4);
    if (!related.length) return "";
    return '<div class="stage7-related-docs">' +
      '<div class="stage7-side-heading">관련 문서</div>' +
      related.map(function (id) {
        const doc = DOCS[id];
        if (!doc) return "";
        return '<a href="' + docHref(id, prefix) + '">' + doc.title + '</a>';
      }).join("") +
    '</div>';
  }

  function buildLearningPath(meta) {
    const prefix = rootPrefix();
    const current = canonicalDocId(meta.docId);
    const path = findPathForDoc(current);
    if (!path) {
      return '<p class="muted">이 문서는 아직 학습경로에 연결되지 않았다.</p>';
    }

    // Progress calculation based on ACTIVE (non-preparing) documents.
    let totalActiveCount = 0;
    let activeItems = [];
    
    path.items.forEach(function (id) {
      const doc = DOCS[id];
      if (doc && !doc.preparing) {
        activeItems.push(id);
      }
    });
    
    totalActiveCount = activeItems.length;
    const currentActiveIndex = activeItems.indexOf(current);
    
    // We consider it completed if it is at or before the current document's position in the active items list.
    const completedCount = currentActiveIndex >= 0 ? currentActiveIndex + 1 : 0;
    const progress = totalActiveCount > 0 ? Math.round((completedCount / totalActiveCount) * 100) : 0;

    let html = '<div class="stage7-path-panel">' +
      '<div class="stage7-progress-card">' +
        '<div><span>학습 완료 진행률</span><strong>' + completedCount + ' / ' + totalActiveCount + '</strong></div>' +
        '<div class="stage7-progress-bar"><span style="width:' + progress + '%"></span></div>' +
      '</div>' +
      '<div class="stage7-side-heading">' + path.title + '</div>' +
      '<div class="stage7-stepper-container">';

    let currentGroup = null;
    let groupOpen = false;

    path.items.forEach(function (id) {
      const doc = DOCS[id];
      if (!doc) return;

      const groupName = doc.group || "일반";
      if (groupName !== currentGroup) {
        if (groupOpen) {
          html += '</div></div>'; // close previous group items and group card
        }
        currentGroup = groupName;
        html += '<div class="stage7-stepper-group">' +
          '<div class="stage7-stepper-group-header">' +
            '<span class="stage7-stepper-group-dot"></span>' +
            '<span class="stage7-stepper-group-title">' + groupName + '</span>' +
          '</div>' +
          '<div class="stage7-stepper-group-items">';
        groupOpen = true;
      }

      // Determine state: done, active, next, preparing
      let state = "next";
      let isCurrent = id === current;
      
      if (doc.preparing) {
        state = "preparing";
      } else {
        const itemActiveIdx = activeItems.indexOf(id);
        if (itemActiveIdx >= 0) {
          if (itemActiveIdx < currentActiveIndex) {
            state = "done";
          } else if (itemActiveIdx === currentActiveIndex) {
            state = "active";
          }
        }
      }

      // SVG icons for states
      let icon = "";
      if (state === "done") {
        icon = '<svg class="stage7-stepper-card-icon done" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      } else if (state === "active") {
        icon = '<svg class="stage7-stepper-card-icon active" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
      } else if (state === "preparing") {
        icon = '<svg class="stage7-stepper-card-icon preparing" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
      } else {
        icon = '<svg class="stage7-stepper-card-icon next" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
      }

      const isSkeleton = doc.preparing && doc.skeleton;
      const cardHref = (doc.preparing && !isSkeleton) ? "javascript:void(0)" : docHref(id, prefix);
      const badgeHtml = doc.preparing ? '<span class="stage7-stepper-badge">준비 중</span>' : '';
      const disabledAttr = (doc.preparing && !isSkeleton) ? ' style="pointer-events: none; cursor: default; color: #94a3b8;"' : '';

      html += '<div class="stage7-stepper-card ' + state + (isCurrent ? ' current' : '') + '">' +
        '<div class="stage7-stepper-card-left">' + icon + '</div>' +
        '<div class="stage7-stepper-card-right">' +
          '<a href="' + cardHref + '"' + disabledAttr + ' class="stage7-stepper-card-title">' + doc.title + '</a>' +
          badgeHtml +
        '</div>' +
      '</div>';
    });

    if (groupOpen) {
      html += '</div></div>'; // close the last group
    }

    html += '</div></div>';
    return html;
  }

  function buildDocSideNav(meta) {
    const side = document.createElement("aside");
    side.id = "stage7DocSideNav";
    side.className = "stage7-doc-side-nav";
    side.setAttribute("aria-label", "문서 Navigation");
    side.innerHTML = '' +
      '<div class="stage7-doc-side-nav__scroll">' +
        '<div class="stage7-doc-current">' +
          '<div class="label">현재 문서</div>' +
          '<strong>' + meta.title + '</strong>' +
          (meta.version ? '<span class="stage7-badge blue">v' + meta.version + '</span>' : '') +
        '</div>' +
        '<div class="stage7-tabs" role="tablist">' +
          '<button type="button" class="active" data-stage7-tab="toc" aria-selected="true" aria-controls="stage7TocPanel">문서목차</button>' +
          '<button type="button" data-stage7-tab="path" aria-selected="false" aria-controls="stage7PathPanel">학습경로</button>' +
        '</div>' +
        '<section id="stage7TocPanel" data-stage7-panel="toc">' + buildLocalToc() + buildRelatedDocs(meta) + '</section>' +
        '<section id="stage7PathPanel" data-stage7-panel="path" hidden>' + buildLearningPath(meta) + '</section>' +
      '</div>';
    return side;
  }

  function buildDocNavToggle() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "stage7-doc-nav-toggle";
    button.setAttribute("aria-controls", "stage7DocSideNav");
    button.setAttribute("aria-expanded", "true");
    button.innerHTML = '<span class="stage7-doc-nav-toggle__close">Navigation 접기</span>' +
                       '<span class="stage7-doc-nav-toggle__open">Navigation 열기</span>';
    return button;
  }

  function ensureDocumentSideNav(meta) {
    if (meta.pageType !== "doc") return;
    if (document.querySelector(".stage7-doc-side-nav")) return;
    document.body.appendChild(buildDocSideNav(meta));
  }

  function ensureDocumentNavToggle(meta) {
    if (meta.pageType !== "doc") return;
    if (document.querySelector(".stage7-doc-nav-toggle")) return;
    document.body.appendChild(buildDocNavToggle());
  }

  function setDocNavCollapsed(collapsed) {
    const side = document.querySelector(".stage7-doc-side-nav");
    const button = document.querySelector(".stage7-doc-nav-toggle");
    document.body.classList.toggle("stage7-doc-nav-collapsed", collapsed);
    if (side) side.setAttribute("aria-hidden", String(collapsed));
    if (button) {
      button.setAttribute("aria-expanded", String(!collapsed));
      button.setAttribute("title", collapsed ? "Navigation 열기" : "Navigation 접기");
    }
    try {
      window.localStorage.setItem("stage7-doc-nav-collapsed", collapsed ? "1" : "0");
    } catch (error) {
      // localStorage can be blocked for file:// previews.
    }
  }

  function initDocumentNavToggle(meta) {
    if (meta.pageType !== "doc") return;
    let collapsed = false;
    try {
      collapsed = window.localStorage.getItem("stage7-doc-nav-collapsed") === "1";
    } catch (error) {
      collapsed = false;
    }
    setDocNavCollapsed(collapsed);
    document.addEventListener("click", function (event) {
      const button = event.target.closest(".stage7-doc-nav-toggle");
      if (!button) return;
      setDocNavCollapsed(!document.body.classList.contains("stage7-doc-nav-collapsed"));
    });
  }

  function initTabs() {
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-stage7-tab]");
      if (!button) return;
      const side = button.closest(".stage7-doc-side-nav");
      if (!side) return;
      const tab = button.getAttribute("data-stage7-tab");
      side.querySelectorAll("[data-stage7-tab]").forEach(function (el) {
        el.classList.toggle("active", el === button);
        el.setAttribute("aria-selected", String(el === button));
      });
      side.querySelectorAll("[data-stage7-panel]").forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-stage7-panel") !== tab;
      });
    });
  }

  function initLocalTocSpy() {
    const links = Array.from(document.querySelectorAll(".stage7-local-toc a"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = new Map();
    links.forEach(function (link) {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) map.set(target, link);
    });
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove("active"); });
        const active = map.get(entry.target);
        if (active) active.classList.add("active");
      });
    }, { rootMargin: "-18% 0px -70% 0px", threshold: 0.01 });
    map.forEach(function (_, target) { observer.observe(target); });
  }

  function ensureLandingSideNav(meta) {
    if (meta.pageType !== "landing") return;
    if (document.querySelector(".stage7-landing-side-nav")) return;

    const targets = [];
    const recommended = document.getElementById("recommended");
    if (recommended) {
      const heading = recommended.querySelector("h2");
      targets.push({
        id: "recommended",
        title: heading ? heading.textContent : "추천 학습 트리"
      });
    }

    const container = document.querySelector("main") || document.body;
    const elements = container.querySelectorAll("details[id], section[id]");
    elements.forEach(function (el) {
      if (el.id === "recommended" || el.id === "coming-soon") return;
      
      let title = "";
      if (el.tagName.toLowerCase() === "details") {
        const summary = el.querySelector("summary");
        title = summary ? summary.textContent : el.id;
      } else {
        const heading = el.querySelector("h2, h3");
        title = heading ? heading.textContent : el.id;
      }
      title = title.trim();
      if (title) {
        targets.push({ id: el.id, title: title });
      }
    });

    if (targets.length === 0) return;

    const sideNav = document.createElement("aside");
    sideNav.className = "stage7-landing-side-nav prose-summary";
    sideNav.setAttribute("data-prose", "summary");
    sideNav.setAttribute("aria-label", "학습 경로 이동");

    const linksHtml = targets.map(function (target) {
      return '<a href="#' + target.id + '" class="landing-nav-item" data-target-id="' + target.id + '">' +
               '<span class="nav-dot"></span>' +
               '<span class="nav-label">' + target.title + '</span>' +
             '</a>';
    }).join("");

    sideNav.innerHTML = '<div class="landing-side-nav__inner">' + linksHtml + '</div>';
    document.body.appendChild(sideNav);

    const topButton = document.createElement("button");
    topButton.type = "button";
    topButton.className = "stage7-back-to-top";
    topButton.setAttribute("aria-label", "맨 위로 이동");
    topButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(topButton);

    topButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const topTarget = document.querySelector("h1") || document.body;
      topTarget.setAttribute("tabindex", "-1");
      topTarget.focus({ preventScroll: true });
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        topButton.classList.add("visible");
      } else {
        topButton.classList.remove("visible");
      }
    });

    sideNav.addEventListener("click", function (e) {
      const link = e.target.closest(".landing-nav-item");
      if (!link) return;
      e.preventDefault();

      const targetId = link.getAttribute("data-target-id");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (targetEl.tagName.toLowerCase() === "details") {
          targetEl.open = true;
        } else {
          const parentDetails = targetEl.closest("details");
          if (parentDetails) parentDetails.open = true;
        }

        const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
        targetEl.setAttribute("tabindex", "-1");
        targetEl.focus({ preventScroll: true });
      }
    });

    if ("IntersectionObserver" in window) {
      const activeLinks = sideNav.querySelectorAll(".landing-nav-item");
      const visibleTargets = new Set();
      
      const updateActiveNav = function() {
        if (visibleTargets.size === 0) return;
        let bestId = null;
        let minTop = Infinity;
        
        visibleTargets.forEach(function(el) {
          const rect = el.getBoundingClientRect();
          if (rect.top > -window.innerHeight / 2 && rect.top < minTop) {
            minTop = rect.top;
            bestId = el.id;
          }
        });
        
        if (bestId) {
          activeLinks.forEach(function(link) {
            const isMatch = link.getAttribute("data-target-id") === bestId;
            link.classList.toggle("active", isMatch);
          });
        }
      };

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visibleTargets.add(entry.target);
          } else {
            visibleTargets.delete(entry.target);
          }
        });
        updateActiveNav();
      }, {
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0
      });

      targets.forEach(function (t) {
        const el = document.getElementById(t.id);
        if (el) observer.observe(el);
      });
    }
  }

  function initLandingSearch(meta) {
    if (meta.pageType !== "landing") return;
    const searchInput = document.querySelector("[data-landing-search]");
    if (!searchInput) return;

    searchInput.addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase().trim();
      const allCards = document.querySelectorAll("[data-doc-card]");
      const allAccordions = document.querySelectorAll("details[id]");

      if (!query) {
        allCards.forEach(function(c) { c.classList.remove("stage7-hidden-by-search"); });
        allAccordions.forEach(function(a) { a.open = true; a.classList.remove("stage7-hidden-by-search"); });
        return;
      }

      allCards.forEach(function(card) {
        const textContent = card.textContent.toLowerCase();
        if (textContent.includes(query)) {
          card.classList.remove("stage7-hidden-by-search");
        } else {
          card.classList.add("stage7-hidden-by-search");
        }
      });

      allAccordions.forEach(function(acc) {
        const visibleCards = acc.querySelectorAll("[data-doc-card]:not(.stage7-hidden-by-search)");
        if (visibleCards.length === 0) {
          acc.classList.add("stage7-hidden-by-search");
        } else {
          acc.classList.remove("stage7-hidden-by-search");
          acc.open = true;
        }
      });
    });
  }

  function initStage7Shell() {
    const meta = metadata();
    if (!meta.pageType) return;
    document.body.classList.add("stage7-page");
    ensureTopbar(meta);
    ensureDocumentSideNav(meta);
    ensureDocumentNavToggle(meta);
    initTabs();
    initDocumentNavToggle(meta);
    initLocalTocSpy();
    ensureLandingSideNav(meta);
    initLandingSearch(meta);
  }

  document.addEventListener("DOMContentLoaded", initStage7Shell);
  window.SAPStage7Shell = { metadata: metadata, init: initStage7Shell, docs: DOCS, learningPaths: LEARNING_PATHS };
}());
