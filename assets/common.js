// SAP Developer Learning Library v3 - Common JS
(function () {
  "use strict";

  const termDefinitions = {
    "ABAP": "SAP의 서버 사이드 비즈니스 애플리케이션 개발 언어입니다. 리포트, 인터페이스, OData/RAP 서비스 등을 구현할 때 사용합니다.",
    "Classic ABAP": "전통적인 ABAP 개발 방식입니다. Report, Selection Screen, Internal Table, ALV, Function Module 등이 대표적입니다.",
    "RAP": "RESTful ABAP Programming Model입니다. S/4HANA에서 비즈니스 객체와 OData 서비스를 현대적으로 만드는 ABAP 개발 모델입니다.",
    "Gateway": "SAP에서 OData V2 서비스를 만들고 노출하는 기술 영역입니다. SEGW, MPC/DPC, /IWFND 테스트가 자주 등장합니다.",
    "SAPUI5": "SAP에서 제공하는 웹 UI 프레임워크입니다. Fiori 스타일의 업무 화면을 만들 때 사용합니다.",
    "Fiori Elements": "Annotation과 OData 메타데이터를 바탕으로 List Report, Object Page 같은 화면을 빠르게 생성하는 방식입니다.",
    "Model": "앱이 실제로 신뢰하는 데이터 저장소입니다. Input에 보이는 값이 곧바로 Model 값이라는 뜻은 아닙니다.",
    "Input": "사용자가 값을 입력하는 UI5 Control입니다. 입력값은 검증을 통과해야 Model에 반영됩니다.",
    "Binding": "Control 속성과 Model 경로를 연결하는 방식입니다. 예: Input.value와 view>/Age를 연결합니다.",
    "Binding Type": "입력값을 어떤 타입으로 해석할지 정하는 UI5 타입입니다. Integer, Decimal, Date 등이 대표적입니다.",
    "constraints": "값이 지켜야 하는 제약 조건입니다. minimum, maximum 같은 범위 조건이 여기에 해당합니다.",
    "Messaging": "UI5의 중앙 메시지 처리 모듈입니다. 최신 코드는 sap/ui/core/Messaging을 import해서 사용합니다.",
    "MessageModel": "현재 앱에 쌓인 Error, Warning, Information 메시지를 담는 모델입니다.",
    "Guard": "저장이나 서버 요청 전에 위험한 상태를 막는 방어 로직입니다.",
    "OData": "SAP 시스템과 프론트엔드가 데이터를 주고받을 때 자주 사용하는 표준 API 방식입니다.",
    "Controller": "화면에서 발생한 이벤트를 처리하는 JavaScript 파일입니다.",
    "View": "SAPUI5에서 화면 구조를 정의하는 파일입니다. XML View가 대표적입니다.",
    "Event Handler": "버튼 클릭이나 입력 변경처럼 사용자의 행동에 반응하는 함수입니다.",
    "this": "현재 Controller 인스턴스를 가리키는 JavaScript 키워드입니다. UI5 Controller에서 자주 사용합니다.",
    "CDS": "Core Data Services입니다. 데이터 모델을 DB 가까이에서 선언하고 재사용 가능한 View로 정의합니다.",
    "Interface View": "보통 ZI_* 이름으로 만들며, 원천 테이블을 안정적인 재사용 모델로 감싸는 CDS View입니다.",
    "Projection View": "보통 ZC_* 이름으로 만들며, 소비자에게 노출할 필드와 의미를 정리한 CDS View입니다.",
    "Service Binding": "CDS/RAP 서비스를 OData로 실제 노출하고 Preview할 수 있게 연결하는 객체입니다.",
    "MM": "Materials Management입니다. 구매, 입고, 재고 관리와 관련된 SAP 모듈입니다.",
    "PP": "Production Planning입니다. 생산계획, MRP, 생산오더와 관련된 SAP 모듈입니다.",
    "SD": "Sales and Distribution입니다. 판매오더, 납품, 출고, 청구와 관련된 SAP 모듈입니다.",
    "FI": "Financial Accounting입니다. 회계 전표, G/L, 매입/매출 회계와 관련된 SAP 모듈입니다.",
    "CO": "Controlling입니다. 원가센터, 내부오더, 손익센터 등 관리회계와 관련된 SAP 모듈입니다.",
    "ATP": "Available-to-Promise입니다. 고객에게 약속 가능한 수량이나 납기를 확인하는 과정입니다.",
    "MRP": "Material Requirements Planning입니다. 수요와 재고를 바탕으로 조달 또는 생산 제안을 계산하는 과정입니다.",
    "G/L": "General Ledger입니다. 재무회계에서 총계정원장 계정을 의미합니다.",
    "재고": "현재 창고나 플랜트에 존재하는 물리적 수량입니다.",
    "가용수량": "현재 재고에서 이미 예약되었거나 출고 예정인 수량을 고려해 실제로 약속 가능한 수량입니다.",
    "판매오더": "고객이 특정 상품을 특정 수량과 납기로 요청한 주문 문서입니다.",
    "Header": "문서의 공통 정보를 담는 상위 구조입니다. 예: 판매오더 Header에는 고객, 주문일 같은 정보가 들어갑니다.",
    "Item": "문서의 상세 라인 구조입니다. 예: 판매오더 Item에는 자재, 수량, 가격 같은 정보가 들어갑니다."
  };

  function ensureTermModal() {
    if (document.getElementById("termModal")) return;
    const modal = document.createElement("div");
    modal.className = "term-modal";
    modal.id = "termModal";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="term-modal__backdrop" data-term-close="true"></div>
      <div class="term-modal__box" role="document">
        <button class="term-modal__close" type="button" data-term-close="true" aria-label="용어 설명 닫기">×</button>
        <div class="term-modal__eyebrow">초급자 용어 설명</div>
        <h2 class="term-modal__title" id="termModalTitle">용어</h2>
        <p class="term-modal__body" id="termModalBody">설명</p>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function initTerms() {
    ensureTermModal();
    const modal = document.getElementById("termModal");
    const title = document.getElementById("termModalTitle");
    const body = document.getElementById("termModalBody");
    let lastFocus = null;

    function openTerm(term) {
      const text = termDefinitions[term] || "이 용어는 현재 문서의 맥락에서 다시 확인이 필요한 항목입니다.";
      lastFocus = document.activeElement;
      title.textContent = term;
      body.textContent = text;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      const close = modal.querySelector(".term-modal__close");
      if (close) close.focus();
    }

    function closeTerm() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    }

    document.addEventListener("click", function (event) {
      const term = event.target.closest("[data-term]");
      if (term) {
        event.preventDefault();
        openTerm(term.getAttribute("data-term"));
        return;
      }
      if (event.target.matches("[data-term-close]")) closeTerm();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeTerm();
    });
  }

  function initCopyButtons() {
    document.querySelectorAll(".code-block").forEach(function (block) {
      const header = block.querySelector(".code-header");
      const code = block.querySelector("pre code");
      if (!header || !code || header.querySelector(".copy-btn")) return;
      const button = document.createElement("button");
      button.className = "copy-btn";
      button.type = "button";
      button.textContent = "복사";
      button.addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(code.textContent);
          button.textContent = "복사됨";
          setTimeout(() => button.textContent = "복사", 1200);
        } catch (e) {
          button.textContent = "실패";
          setTimeout(() => button.textContent = "복사", 1200);
        }
      });
      header.appendChild(button);
    });
  }

  function initUi5ValidationPractice(root) {
    const input = root.querySelector("[data-lab-input]");
    const screenValue = root.querySelector("[data-lab-screen]");
    const modelValueEl = root.querySelector("[data-lab-model]");
    const messagesEl = root.querySelector("[data-lab-messages]");
    const statusEl = root.querySelector("[data-lab-status]");
    const saveBtn = root.querySelector("[data-lab-save]");
    const resetBtn = root.querySelector("[data-lab-reset]");
    const fillButtons = root.querySelectorAll("[data-lab-fill]");
    let modelValue = 20;
    let messages = [];

    function render(statusText, state) {
      screenValue.textContent = input.value === "" ? "(빈 값)" : input.value;
      modelValueEl.textContent = String(modelValue);
      input.classList.remove("error", "success");
      statusEl.classList.remove("error", "success");
      if (state) { input.classList.add(state); statusEl.classList.add(state); }
      statusEl.textContent = statusText;
      if (!messages.length) {
        messagesEl.innerHTML = '<div class="lab-message-item success">메시지 없음 — 저장 Guard 통과 가능</div>';
        return;
      }
      messagesEl.innerHTML = messages.map(function (m) {
        return '<div class="lab-message-item"><strong>' + m.type + '</strong><br>' + m.message + '<br><small>target: ' + m.target + '</small></div>';
      }).join("");
    }

    function validate() {
      const raw = input.value.trim();
      messages = [];
      if (!/^-?\d+$/.test(raw)) {
        messages.push({ type: "Error", message: "parseError: 숫자로 해석할 수 없습니다.", target: "view>/Age" });
        render("검증 실패: Input 값은 남지만 Model 값은 " + modelValue + "로 유지됩니다.", "error");
        return;
      }
      const parsed = Number(raw);
      if (parsed < 1 || parsed > 120) {
        messages.push({ type: "Error", message: "validationError: 1부터 120 사이의 값이어야 합니다.", target: "view>/Age" });
        render("검증 실패: 숫자는 맞지만 constraints를 통과하지 못했습니다. Model 값은 유지됩니다.", "error");
        return;
      }
      modelValue = parsed;
      render("검증 성공: Model 값이 " + modelValue + "로 반영되었습니다.", "success");
    }

    input.addEventListener("input", validate);
    fillButtons.forEach(btn => btn.addEventListener("click", function () {
      input.value = btn.getAttribute("data-lab-fill");
      validate();
    }));
    saveBtn.addEventListener("click", function () {
      if (messages.some(m => m.type === "Error")) {
        render("저장 Guard 차단: MessageModel에 Error가 있어 저장 로직으로 진행하지 않습니다.", "error");
        return;
      }
      render("저장 Guard 통과: Model 값 " + modelValue + "를 저장 대상으로 사용할 수 있습니다.", "success");
    });
    resetBtn.addEventListener("click", function () {
      modelValue = 20; messages = []; input.value = "20";
      render("초기화 완료: 현재 Model 값은 20입니다.", "");
    });
    render("아직 오류가 없습니다. 값을 바꾸면 즉시 검증됩니다. 현재 Model 값은 20입니다.", "");
  }

  function initAtpCalc(root) {
    const stock = root.querySelector("[data-atp-stock]");
    const reserved = root.querySelector("[data-atp-reserved]");
    const receipt = root.querySelector("[data-atp-receipt]");
    const request = root.querySelector("[data-atp-request]");
    const result = root.querySelector("[data-atp-result]");

    function n(el) { return Number(el.value || 0); }
    function calc() {
      const available = n(stock) - n(reserved) + n(receipt);
      const req = n(request);
      const ok = available >= req;
      result.innerHTML = "가용수량 = " + available + "개<br>" +
        (ok ? "요청수량 " + req + "개는 약속 가능합니다." : "요청수량 " + req + "개는 " + (req - available) + "개 부족합니다.");
      result.classList.toggle("success", ok);
      result.classList.toggle("error", !ok);
    }
    [stock, reserved, receipt, request].forEach(el => el.addEventListener("input", calc));
    calc();
  }

  function initPractices() {
    document.querySelectorAll("[data-practice='ui5-validation']").forEach(initUi5ValidationPractice);
    document.querySelectorAll("[data-practice='atp-calc']").forEach(initAtpCalc);
  }

  function initIndexFilter() {
    const search = document.getElementById("indexSearch");
    if (!search) return;
    const chips = Array.from(document.querySelectorAll("[data-index-filter]"));
    const cards = Array.from(document.querySelectorAll("[data-index-card]"));
    let active = "all";

    function norm(v) { return (v || "").toLowerCase().trim(); }
    function apply() {
      const q = norm(search.value);
      cards.forEach(card => {
        const cat = card.getAttribute("data-category");
        const text = norm(card.textContent);
        const show = (active === "all" || active === cat) && (!q || text.includes(q));
        card.style.display = show ? "" : "none";
      });
    }
    search.addEventListener("input", apply);
    chips.forEach(chip => chip.addEventListener("click", function () {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      active = chip.getAttribute("data-index-filter");
      apply();
    }));
    apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTerms();
    initCopyButtons();
    initPractices();
    initIndexFilter();
  });
}());


// 3.5 prose governance helper
(function () {
  "use strict";
  window.SAPLearningProseAudit = function () {
    const allowed = ["concept", "structure", "practice", "checklist", "warning", "teacher", "reference", "summary"];
    const blocks = Array.from(document.querySelectorAll("[data-prose]"));
    const missing = Array.from(document.querySelectorAll(".hero, .section-card, .index-card, .note, .tip, .warning, .danger, .teacher-note, .mini-card, .flow-step, .practice-lab, .lab-panel, .code-block"))
      .filter(el => !el.hasAttribute("data-prose"));
    const invalid = blocks.filter(el => !allowed.includes(el.getAttribute("data-prose")));
    const counts = blocks.reduce((acc, el) => {
      const key = el.getAttribute("data-prose");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return { totalBlocks: blocks.length, counts, missing, invalid };
  };
}());


// Stage 5 Navigation Tree
(function () {
  "use strict";

  const NAV_DOCS = {
    // Area A: Roadmap
    "roadmap": { "title": "SAP 개발자 학습 로드맵", "file": "developer-learning-roadmap.html", "category": "roadmap" },
    "tools": { "title": "SAP 개발 환경과 도구 입문", "file": "development-tools-overview.html", "category": "roadmap" },
    "debug": { "title": "SAP 개발 디버깅 / 트러블슈팅 통합 가이드", "file": "dev-debugging.html", "category": "roadmap" },
    "requirements-analysis": { "title": "SAP 개발 요구사항 분석법", "file": "requirements-analysis-guide.html", "category": "roadmap", "preparing": true },
    "cts-transport": { "title": "Transport Request / CTS 입문", "file": "cts-transport-intro.html", "category": "roadmap", "preparing": true },

    // Area B: ABAP Development
    "abap-as-abap-overview": { "title": "SAP AS ABAP 개요 & 아키텍처 기초", "file": "abap-as-abap-overview.html", "category": "abap", "preparing": true },
    "abap-basic-syntax": { "title": "ABAP 기본 문법 및 메모리 처리", "file": "abap-basic-syntax.html", "category": "abap", "preparing": true },
    "abap-ddic-basics": { "title": "ABAP Dictionary (DDIC) 설계", "file": "abap-ddic-basics.html", "category": "abap", "preparing": true },
    "abap-classic": { "title": "Classic Report & ALV 기초", "file": "abap-classic-report-itab-alv.html", "category": "abap" },
    "abap-db-luw-lock": { "title": "DB 제어 및 트랜잭션 관리", "file": "abap-db-luw-lock.html", "category": "abap", "preparing": true },
    "abap-screen-dynpro": { "title": "Screen UI 개발 (Dynpro)", "file": "abap-screen-dynpro.html", "category": "abap", "preparing": true },
    "abap-object-oriented": { "title": "Object-Oriented ABAP", "file": "abap-object-oriented.html", "category": "abap", "preparing": true },
    "abap-debugging-analysis": { "title": "디버깅 및 런타임 분석", "file": "abap-debugging-analysis.html", "category": "abap", "preparing": true },
    "abap-enhancement-badi": { "title": "표준 확장 및 Enhancement", "file": "abap-enhancement-badi.html", "category": "abap", "preparing": true },
    "abap-new-syntax": { "title": "Modern ABAP & Clean Code", "file": "abap-new-syntax.html", "category": "abap" },
    "abap-clean-unit-test": { "title": "Clean ABAP & ABAP Unit Test", "file": "abap-clean-unit-test.html", "category": "abap", "preparing": true },
    "cds-odata": { "title": "ABAP Core Data Services (CDS)", "file": "cds-to-odata.html", "category": "abap" },
    "odata-export": { "title": "SAP 데이터를 외부로 내보내는 방법 정리", "file": "abap-odata-export.html", "category": "abap" },
    "gateway-odata-v2-crud": { "title": "Gateway / OData V2 CRUD 입문", "file": "gateway-odata-v2-crud.html", "category": "abap" },
    "rap-e2e": { "title": "RAP End-to-End 입문", "file": "rap-end-to-end.html", "category": "abap" },
    "rap-action": { "title": "RAP Action 다건 선택 처리", "file": "rap-action.html", "category": "abap" },
    "abap-cloud": { "title": "ABAP Cloud App Development 정리", "file": "abap-cloud.html", "category": "abap" },
    "abap-rfc-bapi": { "title": "RFC / BAPI 인터페이스 입문", "file": "abap-rfc-bapi.html", "category": "abap", "preparing": true },
    "abap-idoc-intro": { "title": "IDoc 연계 아키텍처 입문", "file": "abap-idoc-intro.html", "category": "abap", "preparing": true },
    "abap-amdp-tuning": { "title": "AMDP & SQL Performance Tuning", "file": "abap-amdp-tuning.html", "category": "abap", "preparing": true },
    "abap-smart-adobe-forms": { "title": "SAP 출력 Form (Smart Forms / Adobe Forms)", "file": "abap-smart-adobe-forms.html", "category": "abap", "preparing": true },

    // Area C: UI5 / Fiori Development
    "js-core-basics": { "title": "Modern Javascript 핵심", "file": "js-core-basics.html", "category": "ui5", "preparing": true },
    "js-async-promise": { "title": "비동기 Javascript 입문", "file": "js-async-promise.html", "category": "ui5", "preparing": true },
    "ui5-architecture-project": { "title": "UI5 아키텍처 및 개발 환경", "file": "ui5-architecture-project.html", "category": "ui5", "preparing": true },
    "ui5-mvc-xmlview": { "title": "UI5 MVC 패턴과 XML View 기초", "file": "ui5-mvc-xmlview.html", "category": "ui5", "preparing": true },
    "ui5-controller": { "title": "UI5 Controller 함수 문법 입문", "file": "ui5-controller-basics.html", "category": "ui5" },
    "ui5-odata-crud": { "title": "SAPUI5 OData Model과 CRUD 입문", "file": "ui5-odata-crud.html", "category": "ui5" },
    "ui5-messaging": { "title": "Messaging과 Input Validation 실무 입문", "file": "ui5-validation-messaging.html", "category": "ui5" },
    "ui5-routing": { "title": "SAPUI5 Routing과 Layout 입문", "file": "ui5-routing-layout.html", "category": "ui5" },
    "ui5-fragment-dialog": { "title": "UI5 Fragment & Dialog 활용", "file": "ui5-fragment-dialog.html", "category": "ui5", "preparing": true },
    "ui5-i18n-multilingual": { "title": "UI5 i18n 글로벌 다국어 처리", "file": "ui5-i18n-multilingual.html", "category": "ui5", "preparing": true },
    "ui5-custom-control": { "title": "Custom Control 및 Reuse Component 구현", "file": "sapui5-custom-control.html", "category": "ui5", "preparing": true },
    "ui5-metadata-patterns": { "title": "Metadata 활용 및 애플리케이션 패턴", "file": "ui5-metadata-patterns.html", "category": "ui5", "preparing": true },
    "ui5-mockserver-git": { "title": "UI5 Mock Server와 Git 협업 기법", "file": "ui5-mockserver-git.html", "category": "ui5", "preparing": true },
    "ui5-qunit-opa-testing": { "title": "UI5 테스팅 기초 (QUnit & OPA)", "file": "ui5-qunit-opa-testing.html", "category": "ui5", "preparing": true },
    "ui5-data-flow": { "title": "SAPUI5 데이터 흐름과 Messaging 아키텍처", "file": "ui5-data-flow.html", "category": "ui5" },
    "gateway-segw-crud-details": { "title": "SAP Gateway & OData V2 CRUD 개발 실무", "file": "gateway-segw-crud-details.html", "category": "ui5", "preparing": true },
    "gateway-odata-advanced": { "title": "OData 고급 연계 (Batch, Function Import)", "file": "gateway-odata-advanced.html", "category": "ui5", "preparing": true },
    "flp": { "title": "Fiori 디자인 원칙과 Launchpad 배포", "file": "fiori-launchpad.html", "category": "ui5" },
    "fiori-intent-navigation": { "title": "Intent Navigation과 Semantic Object 설계", "file": "fiori-intent-navigation.html", "category": "ui5", "preparing": true },
    "fiori-elements-annotation": { "title": "CDS View와 OData Annotation 설계", "file": "fiori-elements-annotation.html", "category": "ui5", "preparing": true },
    "fiori-elements": { "title": "Fiori Elements 애플리케이션 개발", "file": "fiori-elements.html", "category": "ui5" },
    "fiori-elements-advanced": { "title": "Fiori Elements 심화 (Action, Draft)", "file": "fiori-elements-advanced.html", "category": "ui5", "preparing": true },
    "rap-behavior-logic": { "title": "RAP Behavior와 비즈니스 로직 구현", "file": "rap-behavior-logic.html", "category": "ui5", "preparing": true },
    "rap-service-binding-ui": { "title": "RAP 기반 Service Definition 및 UI 연동", "file": "rap-service-binding-ui.html", "category": "ui5", "preparing": true },
    "rap-fiori-elements-advanced": { "title": "RAP Fiori Elements 자동 생성 및 Draft 연동", "file": "rap-fiori-elements-advanced.html", "category": "ui5", "preparing": true },

    // Area D: SAP Module Basics
    "module-overview": { "title": "SAP 모듈 기초와 개발자 관점", "file": "module-basics-for-developers.html", "category": "module" },
    "table-map": { "title": "SAP Standard Table Map 입문", "file": "standard-table-map.html", "category": "module" },
    "mm": { "title": "MM 프로세스와 주요 테이블 입문", "file": "mm-process-tables.html", "category": "module" },
    "pp": { "title": "PP 프로세스와 주요 테이블 입문", "file": "pp-process-tables.html", "category": "module" },
    "atp": { "title": "SAP ATP 학생 학습 패키지", "file": "pp-atp.html", "category": "module" },
    "mrp": { "title": "MRP 학생 배포용 학습 패키지", "file": "pp-mrp.html", "category": "module" },
    "safety-stock": { "title": "SAP 안전재고 관리 학생 학습 패키지", "file": "pp-safety-stock.html", "category": "module" },
    "sd": { "title": "SD 프로세스와 주요 테이블 입문", "file": "sd-process-tables.html", "category": "module" },
    "fi": { "title": "FI 프로세스와 주요 테이블 입문", "file": "fi-process-tables.html", "category": "module" },
    "fi-gl-adult": { "title": "SAP FI G/L Accounts 번호범위 정리", "file": "fi-gl-number-range.html", "category": "module" },
    "fi-gl-elementary": { "title": "SAP FI G/L Accounts 번호범위 초급 비유형", "file": "fi-gl-number-range-elementary.html", "category": "module" },
    "fi-gl-visual": { "title": "SAP FI G/L Accounts 번호범위 Visual Guide", "file": "fi-gl-number-range-visual-guide.html", "category": "module" },
    "co": { "title": "CO 프로세스와 주요 테이블 입문", "file": "co-process-tables.html", "category": "module" },
    "auth-intro": { "title": "Authorization / 권한 개념 입문", "file": "auth-intro.html", "category": "module", "preparing": true },
    "wm-ewm-basics": { "title": "WM/EWM 창고관리 기초 (개발자 관점)", "file": "wm-ewm-basics.html", "category": "module", "preparing": true },
    "hr-hcm-basics": { "title": "HR/HCM 인사관리 기초 (개발자 관점)", "file": "hr-hcm-basics.html", "category": "module", "preparing": true },

    // Area E: Integrated Practice
    "flight-model": { "title": "SAP Flight Model 데이터 구조 해설", "file": "flight-model-guide.html", "category": "practice" },
    "flight-integrated": { "title": "Flight 통합 실습 — Classic ABAP + Gateway + UI5", "file": "flight-practice.html", "category": "practice" },
    "flight-rap-migration": { "title": "Flight 통합 실습 — RAP BO 전환 시나리오", "file": "flight-rap-migration.html", "category": "practice", "preparing": true },
    "mini-project-sd": { "title": "미니 프로젝트 — 주문/납품 조회 시스템 설계", "file": "mini-project-sd-query.html", "category": "practice", "preparing": true },

    // Area F: Reference / Operations
    "glossary": { "title": "SAP 개발자 용어사전", "file": "sap-developer-glossary.html", "category": "reference" },
    "style-guide": { "title": "SAP Developer Learning Library 문체 기준", "file": "sap-developer-writing-style-guide.html", "category": "reference" },
    "prose-audit": { "title": "문체 구조화 자동 검수 리포트", "file": "prose-audit-report-v3-5.html", "category": "reference" },
    "final-audit": { "title": "SAP Developer Learning Library v3 최종 검수 리포트", "file": "final-audit-report-v3.html", "category": "reference" },
    "stage5-navigation-report": { "title": "Stage 5 Navigation 검수 리포트", "file": "stage5-navigation-report.html", "category": "reference" },
    "abap-unit-test-intro": { "title": "ABAP Unit Test 입문", "file": "abap-unit-test-intro.html", "category": "reference", "preparing": true },
    "sap-coding-convention": { "title": "SAP 코딩 컨벤션 가이드", "file": "sap-coding-convention.html", "category": "reference", "preparing": true }
  };

  const NAV_PATHS = {
    // Area A: Roadmap
    "roadmap": "docs/roadmap/developer-learning-roadmap.html",
    "tools": "docs/roadmap/development-tools-overview.html",
    "debug": "docs/roadmap/dev-debugging.html",
    "requirements-analysis": "docs/roadmap/requirements-analysis-guide.html",
    "cts-transport": "docs/roadmap/cts-transport-intro.html",

    // Area B: ABAP Development
    "abap-as-abap-overview": "docs/abap/abap-as-abap-overview.html",
    "abap-basic-syntax": "docs/abap/abap-basic-syntax.html",
    "abap-ddic-basics": "docs/abap/abap-ddic-basics.html",
    "abap-classic": "docs/abap/abap-classic-report-itab-alv.html",
    "abap-db-luw-lock": "docs/abap/abap-db-luw-lock.html",
    "abap-screen-dynpro": "docs/abap/abap-screen-dynpro.html",
    "abap-object-oriented": "docs/abap/abap-object-oriented.html",
    "abap-debugging-analysis": "docs/abap/abap-debugging-analysis.html",
    "abap-enhancement-badi": "docs/abap/abap-enhancement-badi.html",
    "abap-new-syntax": "docs/abap/abap-new-syntax.html",
    "abap-clean-unit-test": "docs/abap/abap-clean-unit-test.html",
    "cds-odata": "docs/abap/cds-to-odata.html",
    "odata-export": "docs/abap/abap-odata-export.html",
    "gateway-odata-v2-crud": "docs/abap/gateway-odata-v2-crud.html",
    "rap-e2e": "docs/abap/rap-end-to-end.html",
    "rap-action": "docs/abap/rap-action.html",
    "abap-cloud": "docs/abap/abap-cloud.html",
    "abap-rfc-bapi": "docs/abap/abap-rfc-bapi.html",
    "abap-idoc-intro": "docs/abap/abap-idoc-intro.html",
    "abap-amdp-tuning": "docs/abap/abap-amdp-tuning.html",
    "abap-smart-adobe-forms": "docs/abap/abap-smart-adobe-forms.html",

    // Area C: UI5 / Fiori Development
    "js-core-basics": "docs/ui5/js-core-basics.html",
    "js-async-promise": "docs/ui5/js-async-promise.html",
    "ui5-architecture-project": "docs/ui5/ui5-architecture-project.html",
    "ui5-mvc-xmlview": "docs/ui5/ui5-mvc-xmlview.html",
    "ui5-controller": "docs/ui5/ui5-controller-basics.html",
    "ui5-odata-crud": "docs/ui5/ui5-odata-crud.html",
    "ui5-messaging": "docs/ui5/ui5-validation-messaging.html",
    "ui5-routing": "docs/ui5/ui5-routing-layout.html",
    "ui5-fragment-dialog": "docs/ui5/ui5-fragment-dialog.html",
    "ui5-i18n-multilingual": "docs/ui5/ui5-i18n-multilingual.html",
    "ui5-custom-control": "docs/ui5/sapui5-custom-control.html",
    "ui5-metadata-patterns": "docs/ui5/ui5-metadata-patterns.html",
    "ui5-mockserver-git": "docs/ui5/ui5-mockserver-git.html",
    "ui5-qunit-opa-testing": "docs/ui5/ui5-qunit-opa-testing.html",
    "ui5-data-flow": "docs/ui5/ui5-data-flow.html",
    "gateway-segw-crud-details": "docs/ui5/gateway-segw-crud-details.html",
    "gateway-odata-advanced": "docs/ui5/gateway-odata-advanced.html",
    "flp": "docs/ui5/fiori-launchpad.html",
    "fiori-intent-navigation": "docs/ui5/fiori-intent-navigation.html",
    "fiori-elements-annotation": "docs/ui5/fiori-elements-annotation.html",
    "fiori-elements": "docs/ui5/fiori-elements.html",
    "fiori-elements-advanced": "docs/ui5/fiori-elements-advanced.html",
    "rap-behavior-logic": "docs/ui5/rap-behavior-logic.html",
    "rap-service-binding-ui": "docs/ui5/rap-service-binding-ui.html",
    "rap-fiori-elements-advanced": "docs/ui5/rap-fiori-elements-advanced.html",

    // Area D: SAP Module Basics
    "module-overview": "docs/module/module-basics-for-developers.html",
    "table-map": "docs/module/standard-table-map.html",
    "mm": "docs/module/mm-process-tables.html",
    "pp": "docs/module/pp-process-tables.html",
    "atp": "docs/module/pp-atp.html",
    "mrp": "docs/module/pp-mrp.html",
    "safety-stock": "docs/module/pp-safety-stock.html",
    "sd": "docs/module/sd-process-tables.html",
    "fi": "docs/module/fi-process-tables.html",
    "fi-gl-adult": "docs/module/fi-gl-number-range.html",
    "fi-gl-elementary": "docs/module/fi-gl-number-range-elementary.html",
    "fi-gl-visual": "docs/module/fi-gl-number-range-visual-guide.html",
    "co": "docs/module/co-process-tables.html",
    "auth-intro": "docs/module/auth-intro.html",
    "wm-ewm-basics": "docs/module/wm-ewm-basics.html",
    "hr-hcm-basics": "docs/module/hr-hcm-basics.html",

    // Area E: Integrated Practice
    "flight-model": "docs/practice/flight-model-guide.html",
    "flight-integrated": "docs/practice/flight-practice.html",
    "flight-rap-migration": "docs/practice/flight-rap-migration.html",
    "mini-project-sd": "docs/practice/mini-project-sd-query.html",

    // Area F: Reference / Operations
    "glossary": "docs/reference/sap-developer-glossary.html",
    "style-guide": "docs/reference/sap-developer-writing-style-guide.html",
    "prose-audit": "archive/v3/99-reference/prose-audit-report-v3-5.html",
    "final-audit": "archive/v3/99-reference/final-audit-report-v3.html",
    "stage5-navigation-report": "archive/v3/99-reference/stage5-navigation-report.html",
    "abap-unit-test-intro": "docs/reference/abap-unit-test-intro.html",
    "sap-coding-convention": "docs/reference/sap-coding-convention.html"
  };

  const NAV_CATEGORIES = {
    "roadmap": { "title": "로드맵 / 학습전략", "page": "roadmap.html" },
    "abap": { "title": "ABAP 개발", "page": "abap.html" },
    "ui5": { "title": "UI5 / Fiori 개발", "page": "ui5-fiori.html" },
    "module": { "title": "SAP 모듈 기초", "page": "module-basics.html" },
    "practice": { "title": "통합 실습", "page": "integrated-practice.html" },
    "reference": { "title": "Reference / 운영", "page": "reference.html" }
  };

  const NAV_TREE = [
    {
      "id": "roadmap",
      "title": "로드맵 / 학습전략",
      "href": "pages/roadmap.html",
      "docs": ["roadmap", "tools", "debug", "requirements-analysis", "cts-transport"]
    },
    {
      "id": "abap",
      "title": "ABAP 개발",
      "href": "pages/abap.html",
      "groups": [
        { "title": "1단계. 아키텍처 기초", "docs": ["abap-as-abap-overview"] },
        { "title": "2단계. 기본 문법", "docs": ["abap-basic-syntax"] },
        { "title": "3단계. DDIC 설계", "docs": ["abap-ddic-basics"] },
        { "title": "4단계. Classic Report", "docs": ["abap-classic"] },
        { "title": "5단계. DB & 트랜잭션", "docs": ["abap-db-luw-lock"] },
        { "title": "6단계. Dynpro UI", "docs": ["abap-screen-dynpro"] },
        { "title": "7단계. OO ABAP", "docs": ["abap-object-oriented"] },
        { "title": "8단계. 성능 분석", "docs": ["abap-debugging-analysis"] },
        { "title": "9단계. 표준 확장", "docs": ["abap-enhancement-badi"] },
        { "title": "10단계. Modern ABAP", "docs": ["abap-new-syntax", "abap-clean-unit-test"] },
        { "title": "11단계. CDS View", "docs": ["cds-odata", "odata-export"] },
        { "title": "12단계. 현대적 개발 모델", "docs": ["gateway-odata-v2-crud", "rap-e2e", "rap-action", "abap-cloud"] },
        { "title": "부록. 실무 심화", "docs": ["abap-rfc-bapi", "abap-idoc-intro", "abap-amdp-tuning", "abap-smart-adobe-forms"] }
      ]
    },
    {
      "id": "ui5",
      "title": "UI5 / Fiori 개발",
      "href": "pages/ui5-fiori.html",
      "groups": [
        { "title": "Part 1. JS 기초", "docs": ["js-core-basics", "js-async-promise"] },
        { "title": "Part 2. UI5 입문", "docs": ["ui5-architecture-project", "ui5-mvc-xmlview", "ui5-controller", "ui5-odata-crud", "ui5-messaging", "ui5-routing", "ui5-fragment-dialog", "ui5-i18n-multilingual"] },
        { "title": "Part 3. UI5 심화", "docs": ["ui5-custom-control", "ui5-metadata-patterns", "ui5-mockserver-git", "ui5-qunit-opa-testing", "ui5-data-flow"] },
        { "title": "Part 4. Gateway 연동", "docs": ["gateway-segw-crud-details", "gateway-odata-advanced"] },
        { "title": "Part 5. FLP 통합", "docs": ["flp", "fiori-intent-navigation"] },
        { "title": "Part 6. Fiori Elements", "docs": ["fiori-elements-annotation", "fiori-elements", "fiori-elements-advanced"] },
        { "title": "Part 7. RAP + UI5 통합", "docs": ["rap-behavior-logic", "rap-service-binding-ui", "rap-fiori-elements-advanced"] }
      ]
    },
    {
      "id": "module",
      "title": "SAP 모듈 기초",
      "href": "pages/module-basics.html",
      "groups": [
        { "title": "공통 지식", "docs": ["module-overview", "table-map"] },
        { "title": "구매 (MM)", "docs": ["mm"] },
        { "title": "생산 (PP)", "docs": ["pp", "atp", "mrp", "safety-stock"] },
        { "title": "영업 (SD)", "docs": ["sd"] },
        { "title": "회계 (FI)", "docs": ["fi", "fi-gl-adult", "fi-gl-elementary", "fi-gl-visual"] },
        { "title": "원가 (CO)", "docs": ["co"] },
        { "title": "추가 핵심 모듈", "docs": ["auth-intro", "wm-ewm-basics", "hr-hcm-basics"] }
      ]
    },
    {
      "id": "practice",
      "title": "통합 실습",
      "href": "pages/integrated-practice.html",
      "groups": [
        { "title": "실습 준비", "docs": ["flight-model"] },
        { "title": "실습 수행", "docs": ["flight-integrated", "flight-rap-migration", "mini-project-sd"] }
      ]
    },
    {
      "id": "reference",
      "title": "Reference / 운영",
      "href": "pages/reference.html",
      "groups": [
        { "title": "참고 자료", "docs": ["glossary"] },
        { "title": "운영 가이드", "docs": ["style-guide", "prose-audit", "final-audit", "stage5-navigation-report"] },
        { "title": "추가 가이드", "docs": ["abap-unit-test-intro", "sap-coding-convention"] }
      ]
    }
  ];

  function depthPrefix() {
    const path = window.location.pathname;
    if (path.includes("/v3/")) return "../../";
    if (path.includes("/docs/")) {
      // docs folder has subfolders: /docs/roadmap/file.html etc.
      // So path will have 2 levels below root.
      const match = path.match(/\/docs\/[^\/]+\/[^\/]+$/);
      if (match) return "../../";
      return "../";
    }
    if (path.includes("/pages/")) return "../";
    if (path.includes("/archive/")) return "../../../";
    return "./";
  }

  function docHref(docId) {
    const doc = NAV_DOCS[docId];
    if (doc && doc.preparing) {
      return "javascript:void(0)";
    }
    const prefix = depthPrefix();
    return prefix + (NAV_PATHS[docId] || ("v3/" + NAV_DOCS[docId].file));
  }

  function pageHref(categoryId) {
    const prefix = depthPrefix();
    return prefix + "pages/" + NAV_CATEGORIES[categoryId].page;
  }

  function renderDocLink(docId, activeDoc) {
    const doc = NAV_DOCS[docId];
    if (!doc) return "";
    const isActive = activeDoc && doc.file === activeDoc;
    if (doc.preparing) {
      return '<a class="tree-link disabled" style="pointer-events: none; color: #94a3b8; cursor: default;" href="javascript:void(0)" title="준비 중">' + doc.title + ' <span style="font-size: 0.65rem; padding: 1px 5px; border-radius: 999px; background: #fef3c7; color: #d97706; font-weight: 900; margin-left: 4px;">준비 중</span></a>';
    }
    return '<a class="tree-link' + (isActive ? ' active' : '') + '" href="' + docHref(docId) + '">' + doc.title + '</a>';
  }

  function renderTree(container) {
    const activeCategory = document.body.getAttribute("data-active-category") || "";
    const currentFile = window.location.pathname.split("/").pop();
    let html = '<div class="tree-root-title">SAP Developer Library</div><div class="learning-tree">';

    NAV_TREE.forEach(function (cat) {
      const open = cat.id === activeCategory || (cat.docs || []).some(function (id) { return NAV_DOCS[id] && NAV_DOCS[id].file === currentFile; });
      const activePage = activeCategory === cat.id;
      html += '<details class="tree-group" ' + (open ? 'open' : '') + '>';
      html += '<summary>' + cat.title + '</summary>';
      html += '<a class="tree-link' + (activePage ? ' active' : '') + '" href="' + pageHref(cat.id) + '">영역 첫 페이지</a>';

      if (cat.docs) {
        cat.docs.forEach(function (docId) { html += renderDocLink(docId, currentFile); });
      }

      if (cat.groups) {
        cat.groups.forEach(function (group) {
          html += '<div class="tree-link" style="font-weight:900;color:#64748b;background:#f8fafc;">' + group.title + '</div>';
          group.docs.forEach(function (docId) { html += renderDocLink(docId, currentFile); });
        });
      }

      html += '</details>';
    });

    html += '</div>';
    container.innerHTML = html;
  }

  function initNavTrees() {
    document.querySelectorAll("[data-nav-tree='main']").forEach(renderTree);
  }

  function initLandingSearch() {
    document.querySelectorAll("[data-landing-search]").forEach(function (input) {
      const scope = input.closest("[data-landing-scope]") || document;
      const cards = Array.from(scope.querySelectorAll("[data-doc-card]"));
      input.addEventListener("input", function () {
        const q = input.value.toLowerCase().trim();
        cards.forEach(function (card) {
          const show = !q || card.textContent.toLowerCase().includes(q);
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavTrees();
    initLandingSearch();
  });
}());
