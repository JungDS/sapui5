// SAP Developer Learning Library v3 - Common JS
(function () {
  "use strict";

    const termDefinitions = {

    "Classic ABAP": {

      basic: "오래전부터 사용해 온 전통적인 SAP 개발 방식입니다. 중학생의 숙제 노트처럼 처음부터 끝까지 코드로 화면과 결과를 다 그려내는 방식이라고 생각하면 됩니다.",

      detail: "Report, Selection Screen, Internal Table, ALV, Function Module 등을 주력으로 사용하는 절차적/이벤트 기반 프로그래밍 방식입니다."

    },

    "ABAP": {

      basic: "SAP 시스템을 다루는 전용 프로그래밍 언어입니다. 아이폰 앱을 만들 때 Swift를 쓰듯, SAP 시스템에선 ABAP을 씁니다.",

      detail: "SAP의 서버 사이드 비즈니스 애플리케이션 개발 언어입니다. 리포트, 인터페이스, OData/RAP 서비스 등을 구현할 때 사용합니다."

    },

    "RAP": {

      basic: "요즘 SAP에서 가장 권장하는 새로운 백엔드 개발 방식입니다. (RESTful ABAP Programming Model)",

      detail: "S/4HANA에서 비즈니스 객체와 OData 서비스를 현대적으로 만드는 최신 ABAP 개발 모델입니다. Behavior Definition과 CDS View 기반으로 작동합니다."

    },

    "UI5": {

      basic: "SAP 화면을 웹 브라우저에서 예쁘게 보여주기 위해 사용하는 도구입니다. (SAPUI5)",

      detail: "SAP에서 제공하는 웹 UI 프레임워크입니다. MVC 패턴을 따르며, Fiori 스타일의 엔터프라이즈 앱 화면을 개발할 때 사용합니다."

    },

    "Fiori Elements": {

      basic: "화면을 일일이 그리지 않고, '어떤 데이터를 띄워줘'라고 설정(Annotation)만 하면 자동으로 화면을 만들어주는 마법 같은 기술입니다.",

      detail: "Annotation과 OData 메타데이터를 바탕으로 List Report, Object Page 같은 표준 화면 패턴을 빠르게 생성하는 Fiori 앱 개발 방식입니다."

    },

    "CDS": {

      basic: "수많은 데이터베이스(DB) 창고에서 필요한 데이터만 쏙쏙 골라 묶어서 보여주는 뷰(View)입니다.",

      detail: "Core Data Services입니다. 데이터 모델을 DB 가까이에서 선언하고 재사용 가능한 View로 정의하여 성능을 극대화(Code-to-Data)합니다."

    },

    "OData": {

      basic: "인터넷 웹사이트와 SAP 서버가 데이터를 주고받기 위한 통신 규칙(언어)입니다.",

      detail: "SAP 시스템과 프론트엔드가 데이터를 주고받을 때 자주 사용하는 REST 기반 표준 API 프로토콜입니다."

    },

    "Gateway": {

      basic: "SAP 서버와 바깥 세상(웹/모바일)을 연결해주는 출입구 역할을 합니다.",

      detail: "SAP에서 OData V2/V4 서비스를 만들고 외부에 노출하는 기술 영역(Gateway Client, SEGW)입니다."

    }

,

    "MM": {

      basic: "회사의 물건(자재)을 사오고 창고에 보관하는 업무입니다.",

      detail: "Materials Management (자재 관리). 구매, 입고, 송장 검증, 재고 관리 프로세스를 담당하는 핵심 모듈입니다."

    },

    "PP": {

      basic: "공장에서 제품을 어떻게, 얼마나 만들지 계획하고 실행하는 업무입니다.",

      detail: "Production Planning (생산 계획). BOM, Routing, MRP, 생산 오더 등 제조 프로세스를 담당하는 핵심 모듈입니다."

    },

    "SD": {

      basic: "고객에게 물건을 팔고 배달한 뒤 돈을 청구하는 업무입니다.",

      detail: "Sales and Distribution (영업 관리). 판매 오더, 납품, 출고, 대금 청구 프로세스를 담당하는 핵심 모듈입니다."

    },

    "FI": {

      basic: "회사의 돈이 들어오고 나가는 것을 기록하는 장부(재무제표) 관리 업무입니다.",

      detail: "Financial Accounting (재무 회계). G/L 계정, 채권/채무, 자산, 결산 프로세스 등을 담당하는 핵심 모듈입니다."

    },

    "CO": {

      basic: "제품을 하나 만드는 데 돈이 얼마나 들었는지(원가)와 어느 부서가 돈을 많이 썼는지 분석하는 업무입니다.",

      detail: "Controlling (관리 회계). 원가 센터, 내부 오더, 제품 원가, 수익성 분석(PA) 프로세스를 담당하는 핵심 모듈입니다."

    },

    "Header": {

      basic: "문서의 '제목' 같은 역할입니다. 언제, 누가, 어떤 조건으로 작성했는지 전체적인 공통 정보가 들어갑니다.",

      detail: "비즈니스 문서(예: 판매 오더)의 마스터 정보입니다. VBAK(SD), EKKO(MM), BKPF(FI) 등이 대표적인 Header 테이블입니다."

    },

    "Item": {

      basic: "문서의 '세부 내용'입니다. 어떤 물건을 몇 개, 얼마에 샀는지 구체적인 목록이 들어갑니다.",

      detail: "비즈니스 문서의 라인 아이템(Line Item) 정보입니다. VBAP(SD), EKPO(MM), BSEG(FI) 등이 대표적인 Item 테이블입니다."

    },

    "판매오더": {

      basic: "고객이 '이 물건을 이 가격에 사겠습니다'라고 회사에 요청한 주문서입니다.",

      detail: "Sales Order (SO). SD 모듈의 트랜잭션 시작점이며 주로 VBAK/VBAP 테이블에 저장됩니다."

    },

    "ATP": {

      basic: "고객이 원하는 날짜에 물건을 줄 수 있는지 재고를 계산해 보는 기능입니다.",

      detail: "Available-To-Promise (납기 약속). 현재고와 입/출고 예정 수량을 바탕으로 고객 납기를 확약하는 로직입니다."

    },

    "MRP": {

      basic: "물건이 모자라지 않게 언제, 얼마나 사오거나 만들어야 할지 시스템이 계산해 주는 기능입니다.",

      detail: "Material Requirements Planning (자재 소요량 계획). 제품 생산과 판매를 위해 필요한 자재의 수량과 시기를 계획하는 기능입니다."

    },

    "G/L": {

      basic: "회사 장부에 돈의 흐름을 기록할 때 사용하는 항목 이름입니다. (예: 식비, 차비 등)",

      detail: "General Ledger (총계정원장). 재무 회계의 기본이 되는 계정 체계로, 모든 회계 전표 라인에 매핑됩니다."

    },

    "RFC": {

      basic: "SAP 시스템끼리 또는 SAP와 다른 시스템이 서로 전화를 걸어 데이터를 주고받는 기술입니다.",

      detail: "Remote Function Call. SAP 서버 간 또는 외부 시스템과의 표준 통신 프로토콜로, 원격으로 Function Module을 호출합니다."

    },

    "BAPI": {

      basic: "SAP가 미리 잘 만들어둔 기능 꾸러미입니다. 이걸 쓰면 데이터가 안전하게 저장됩니다.",

      detail: "Business Application Programming Interface. 외부 인터페이스나 커스텀 프로그램에서 SAP 표준 비즈니스 객체(Business Object)를 조작할 때 사용하는 표준 RFC Function입니다."

    },

    "EntitySet": {

      basic: "웹으로 데이터를 줄 때, 엑셀 표의 '시트(Sheet)'나 데이터 목록 전체를 부르는 이름입니다.",

      detail: "OData 서비스에서 동일한 Entity Type의 인스턴스(레코드)들이 모인 컬렉션입니다. UI5에서 리스트 바인딩의 대상이 됩니다."

    },

    "CRUD": {

      basic: "데이터를 다루는 4가지 기본 동작인 만들기(Create), 읽기(Read), 고치기(Update), 지우기(Delete)를 줄인 말입니다.",

      detail: "Create, Read, Update, Delete의 약자로, 대부분의 비즈니스 애플리케이션 트랜잭션과 OData/REST API의 뼈대가 되는 핵심 오퍼레이션입니다."

    },

    "Association": {

      basic: "서로 다른 데이터 목록(예: 부서와 직원, 주문과 상세내역)을 연결해주는 연결고리입니다.",

      detail: "CDS View나 OData 모델에서 엔티티 간의 관계(1:1, 1:N 등)를 정의하는 조인(Join) 또는 내비게이션(Navigation) 속성입니다."

    },

    "MVC": {

      basic: "화면(View), 데이터(Model), 로직(Controller)을 나누어서 개발하는 방식입니다. 집을 지을 때 설계도, 자재, 인부를 나누는 것과 같습니다.",

      detail: "Model-View-Controller 패턴. SAPUI5 애플리케이션의 핵심 아키텍처로 화면과 비즈니스 로직, 데이터 관리를 분리하여 유지보수성을 높입니다."

    },

    "Controller": {

      basic: "사용자가 버튼을 누르거나 글자를 입력할 때 어떻게 동작해야 할지 지시하는 '뇌' 역할입니다.",

      detail: "MVC 패턴의 C 부분입니다. JavaScript로 작성되며 View의 이벤트를 핸들링하고 Model 데이터를 가공하는 역할을 합니다."

    },

    "Binding": {

      basic: "화면(View)의 입력칸과 데이터(Model)를 끈으로 묶어두는 것입니다. 한쪽이 바뀌면 다른 쪽도 알아서 바뀝니다.",

      detail: "UI5의 Data Binding 개념입니다. UI Control의 Property와 Model의 Property를 연결하여 데이터 동기화를 자동화합니다."

    },

    "Data Model": {

      basic: "앱에서 사용하는 데이터를 담아두는 바구니입니다.",

      detail: "UI5에서 데이터를 관리하는 객체입니다. 종류에 따라 JSONModel, ODataModel, ResourceModel 등이 있습니다."

    },

    "JSON Model": {

      basic: "앱 내부에서 임시로 사용하는 가벼운 데이터 바구니입니다.",

      detail: "Client-side 데이터 모델입니다. 화면의 상태값이나 로컬에서 사용할 소규모 데이터를 다룰 때 주로 사용합니다."

    },

    "OData Model": {

      basic: "서버(SAP)와 직접 연결된 강력한 데이터 바구니입니다. 데이터를 바꾸면 서버에도 바로 반영됩니다.",

      detail: "Server-side 데이터 모델입니다. 백엔드 OData 서비스와 직접 연동되며, 페이징과 정렬, 필터링 로직을 서버로 위임합니다."

    },

    "Fiori Launchpad": {

      basic: "스마트폰의 바탕화면처럼, 수많은 SAP 앱들이 타일(아이콘) 형태로 모여 있는 시작 화면입니다.",

      detail: "SAP Fiori 애플리케이션의 진입점(Shell)입니다. 사용자의 역할(Role)에 따라 타일 기반으로 앱을 할당하고 네비게이션을 관리합니다."

    }  };

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
        <button class="term-modal__close" type="button" data-term-close="true" aria-label="용어 설명 닫기">&times;</button>
        <div class="term-modal__eyebrow">초급자 용어 설명</div>
        <h2 class="term-modal__title" id="termModalTitle">용어</h2>
        <div class="term-tabs" id="termModalTabs" role="tablist">
          <button class="term-tab-btn active" type="button" data-term-tab="basic" role="tab">기초 설명</button>
          <button class="term-tab-btn" type="button" data-term-tab="detail" role="tab">실무 상세</button>
        </div>
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
      const def = termDefinitions[term];
      lastFocus = document.activeElement;
      title.textContent = term;
      if (def && typeof def === "object") {
        body.innerHTML = "";
        if (def.basic) {
          const basicEl = document.createElement("span");
          basicEl.className = "term-modal__basic";
          basicEl.textContent = def.basic;
          body.appendChild(basicEl);
        }
        if (def.detail) {
          const detailEl = document.createElement("span");
          detailEl.className = "term-modal__detail";
          detailEl.textContent = def.detail;
          body.appendChild(detailEl);
        }
        if (!def.basic && !def.detail) {
          body.textContent = "이 용어는 현재 문서의 맥락에서 다시 확인이 필요한 항목입니다.";
        }
      } else {
        body.textContent = def || "이 용어는 현재 문서의 맥락에서 다시 확인이 필요한 항목입니다.";
      }
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
      const tabBtn = event.target.closest("[data-term-tab]");
      if (tabBtn && modal.contains(tabBtn)) {
        showTab(tabBtn.getAttribute("data-term-tab"));
        return;
      }
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
