// SAP Developer Learning Library - Stage 7 Global Shell Draft
// Opt-in helper. Existing pages are not affected unless data-page-type exists.
(function () {
  "use strict";

  const ICON_HOME = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3 2.5 11.2l1.3 1.5L5 11.6V20h5.5v-5h3v5H19v-8.4l1.2 1.1 1.3-1.5L12 3Zm0 2.6 5 4.3V18h-1.5v-5h-7v5H7v-8.1l5-4.3Z"/></svg>';
  const ICON_PREV = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.7 6.3 9 12l5.7 5.7-1.4 1.4L6.2 12l7.1-7.1 1.4 1.4Z"/></svg>';
  const ICON_NEXT = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m9.3 17.7 5.7-5.7-5.7-5.7 1.4-1.4 7.1 7.1-7.1 7.1-1.4-1.4Z"/></svg>';
  const ICON_PANEL = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5h16v14H4V5Zm2 2v10h9V7H6Zm11 0v10h1V7h-1Z"/></svg>';

  const CATEGORY_HOME = {
    roadmap: { title: "로드맵", href: "pages/roadmap.html" },
    abap: { title: "ABAP 개발 홈", href: "pages/abap.html" },
    ui5: { title: "UI5/Fiori 홈", href: "pages/ui5-fiori.html" },
    module: { title: "SAP 모듈 기초 홈", href: "pages/module-basics.html" },
    practice: { title: "통합 실습 홈", href: "pages/integrated-practice.html" },
    reference: { title: "Reference 홈", href: "pages/reference.html" }
  };

  const DOCS = {
    "roadmap": { title: "SAP 개발자 학습 로드맵", category: "roadmap", href: "v3/00-roadmap/sap-developer-learning-roadmap-v3.html" },
    "tools": { title: "SAP 개발 환경과 도구 입문", category: "roadmap", href: "v3/00-roadmap/sap-development-tools-overview-v3.html" },
    "debug": { title: "SAP 개발 디버깅 / 트러블슈팅 통합 가이드", category: "roadmap", href: "v3/00-roadmap/sap-debugging-troubleshooting-guide-v3.html", aliases: ["debugging"] },
    "abap-classic": { title: "Classic ABAP 기본기", category: "abap", href: "v3/01-abap/abap-classic-report-itab-alv-beginner-v3.html" },
    "abap-new-syntax": { title: "ABAP New Syntax 입문", category: "abap", href: "v3/01-abap/abap-new-syntax-beginner-guide-v3.html" },
    "cds-odata": { title: "CDS View에서 OData 노출까지", category: "abap", href: "v3/01-abap/sap-cds-to-odata-beginner-guide-v3.html" },
    "gateway-odata-v2-crud": { title: "Gateway / OData V2 CRUD 입문", category: "abap", href: "docs/abap/gateway-odata-v2-crud.html", legacyHref: "v3/01-abap/sap-gateway-odata-v2-crud-beginner-guide-v3.html", aliases: ["gateway"] },
    "rap-e2e": { title: "RAP End-to-End 입문", category: "abap", href: "v3/01-abap/sap-rap-end-to-end-beginner-guide-v3.html" },
    "rap-action": { title: "RAP Action 다건 선택 처리", category: "abap", href: "v3/01-abap/rap-action-invocation-grouping-v3.html" },
    "abap-cloud": { title: "ABAP Cloud App Development 정리", category: "abap", href: "v3/01-abap/abap-cloud-app-development-summary-v3.html" },
    "odata-export": { title: "SAP 데이터를 외부로 내보내는 방법 정리", category: "abap", href: "v3/99-reference/sap-odata-external-export-summary-v3.html" },
    "ui5-controller": { title: "UI5 Controller 함수 문법 입문", category: "ui5", href: "v3/02-ui5-fiori/sapui5-controller-function-intro-v3.html" },
    "ui5-odata-crud": { title: "SAPUI5 OData Model과 CRUD 입문", category: "ui5", href: "v3/02-ui5-fiori/sapui5-odata-model-crud-beginner-guide-v3.html" },
    "ui5-messaging": { title: "Messaging과 Input Validation 실무 입문", category: "ui5", href: "v3/02-ui5-fiori/sapui5-messaging-input-validation-v3.html" },
    "ui5-routing": { title: "SAPUI5 Routing과 Layout 입문", category: "ui5", href: "v3/02-ui5-fiori/sapui5-routing-layout-beginner-guide-v3.html" },
    "ui5-data-flow": { title: "SAPUI5 데이터 흐름과 Messaging 아키텍처", category: "ui5", href: "v3/02-ui5-fiori/sapui5-messaging-data-flow-v3.html" },
    "fiori-elements": { title: "Fiori Elements 입문", category: "ui5", href: "v3/02-ui5-fiori/sap-fiori-elements-beginner-guide-v3.html" },
    "flp": { title: "Fiori Launchpad 배포와 Semantic Object 입문", category: "ui5", href: "v3/02-ui5-fiori/sap-fiori-launchpad-deployment-beginner-guide-v3.html" },
    "module-overview": { title: "SAP 모듈 기초와 개발자 관점", category: "module", href: "v3/03-module-basics/sap-module-basics-for-developers-v3.html" },
    "table-map": { title: "SAP Standard Table Map 입문", category: "module", href: "v3/03-module-basics/sap-standard-table-map-for-developers-v3.html" },
    "mm": { title: "MM 프로세스와 주요 테이블 입문", category: "module", href: "v3/03-module-basics/sap-mm-process-and-tables-beginner-v3.html" },
    "pp": { title: "PP 프로세스와 주요 테이블 입문", category: "module", href: "v3/03-module-basics/sap-pp-process-and-tables-beginner-v3.html" },
    "sd": { title: "SD 프로세스와 주요 테이블 입문", category: "module", href: "v3/03-module-basics/sap-sd-process-and-tables-beginner-v3.html" },
    "fi": { title: "FI 프로세스와 주요 테이블 입문", category: "module", href: "v3/03-module-basics/sap-fi-process-and-tables-beginner-v3.html" },
    "co": { title: "CO 프로세스와 주요 테이블 입문", category: "module", href: "v3/03-module-basics/sap-co-process-and-tables-beginner-v3.html" },
    "atp": { title: "SAP ATP 학생 학습 패키지", category: "module", href: "v3/03-module-basics/sap-pp-atp-learning-package-v3.html" },
    "mrp": { title: "MRP 학생 배포용 학습 패키지", category: "module", href: "v3/03-module-basics/sap-pp-mrp-learning-package-v3.html" },
    "safety-stock": { title: "SAP 안전재고 관리 학생 학습 패키지", category: "module", href: "v3/03-module-basics/sap-pp-safety-stock-learning-package-v3.html" },
    "fi-gl-adult": { title: "SAP FI G/L Accounts 번호범위 정리", category: "module", href: "v3/03-module-basics/sap-fi-gl-number-range-adult-v3.html" },
    "fi-gl-elementary": { title: "SAP FI G/L Accounts 번호범위 초급 비유형", category: "module", href: "v3/03-module-basics/sap-fi-gl-number-range-elementary-v3.html" },
    "fi-gl-visual": { title: "SAP FI G/L Accounts 번호범위 Visual Guide", category: "module", href: "v3/03-module-basics/sap-fi-gl-number-range-visual-deck-v3.html" },
    "flight-model": { title: "SAP Flight Model 데이터 구조 해설", category: "practice", href: "v3/04-integrated-practice/sap-flight-model-table-guide-v3.html" },
    "flight-integrated": { title: "Flight 통합 실습 최신본", category: "practice", href: "v3/04-integrated-practice/sap-flight-integrated-practice-classrun-gateway-ui5-v3.html" },
    "glossary": { title: "SAP 개발자 용어사전", category: "reference", href: "v3/99-reference/sap-developer-glossary-v3.html" },
    "style-guide": { title: "SAP Developer Learning Library 문체 기준", category: "reference", href: "v3/99-reference/sap-developer-writing-style-guide-v3.html" },
    "prose-audit": { title: "문체 구조화 자동 검수 리포트", category: "reference", href: "v3/99-reference/prose-audit-report-v3-5.html" },
    "final-audit": { title: "SAP Developer Learning Library v3 최종 검수 리포트", category: "reference", href: "v3/99-reference/final-audit-report-v3.html" }
  };

  const LEARNING_PATHS = {
    beginner: {
      title: "초급자 추천 경로",
      items: ["roadmap", "tools", "module-overview", "abap-classic", "ui5-controller", "cds-odata", "gateway-odata-v2-crud"]
    },
    abap: {
      title: "ABAP 개발자 경로",
      items: ["abap-classic", "abap-new-syntax", "cds-odata", "gateway-odata-v2-crud", "rap-e2e", "rap-action"]
    },
    ui5: {
      title: "UI5/Fiori 개발자 경로",
      items: ["ui5-controller", "ui5-odata-crud", "ui5-messaging", "ui5-routing", "fiori-elements", "flp"]
    },
    module: {
      title: "모듈/테이블 이해 경로",
      items: ["module-overview", "table-map", "mm", "pp", "sd", "fi", "co"]
    },
    practice: {
      title: "실무형 빠른 경로",
      items: ["cds-odata", "gateway-odata-v2-crud", "ui5-odata-crud", "ui5-messaging", "flight-model", "flight-integrated"]
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

  function buildLocalToc() {
    const headings = Array.from(document.querySelectorAll("main h2[id], main h3[id], .stage7-shell h2[id], .stage7-shell h3[id]"));
    if (!headings.length) return '<p class="muted">이 문서 안의 이동 가능한 제목이 아직 없다.</p>';
    return '<div class="stage7-side-heading">이 문서 안에서</div>' +
      '<nav class="stage7-local-toc" aria-label="이 문서 안에서">' +
      headings.map(function (h) {
        return '<a href="#' + h.id + '">' + h.textContent.trim() + '</a>';
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
        return {
          key: keys[i],
          title: path.title,
          items: path.items,
          index: index,
          prev: path.items[index - 1] || "",
          next: path.items[index + 1] || ""
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
    const progress = Math.round(((path.index + 1) / path.items.length) * 100);
    return '<div class="stage7-path-panel">' +
      '<div class="stage7-progress-card">' +
        '<div><span>진행률</span><strong>' + (path.index + 1) + ' / ' + path.items.length + '</strong></div>' +
        '<div class="stage7-progress-bar"><span style="width:' + progress + '%"></span></div>' +
      '</div>' +
      '<div class="stage7-side-heading">' + path.title + '</div>' +
      '<ol class="stage7-path-steps">' +
        path.items.map(function (id, index) {
          const doc = DOCS[id];
          if (!doc) return "";
          let state = "next";
          if (index < path.index) state = "done";
          if (index === path.index) state = "active";
          return '<li class="' + state + '">' +
            '<span class="stage7-step-no">' + (index + 1) + '</span>' +
            '<a href="' + docHref(id, prefix) + '">' + doc.title + '</a>' +
          '</li>';
        }).join("") +
      '</ol>' +
    '</div>';
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
    button.innerHTML = '<span class="stage7-doc-nav-toggle__icon">' + ICON_PANEL + '</span><span data-stage7-toggle-label>Navigation 접기</span>';
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
    const label = button && button.querySelector("[data-stage7-toggle-label]");
    document.body.classList.toggle("stage7-doc-nav-collapsed", collapsed);
    if (side) side.setAttribute("aria-hidden", String(collapsed));
    if (button) {
      button.setAttribute("aria-expanded", String(!collapsed));
      button.setAttribute("title", collapsed ? "Navigation 열기" : "Navigation 접기");
    }
    if (label) label.textContent = collapsed ? "Navigation 열기" : "Navigation 접기";
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
  }

  document.addEventListener("DOMContentLoaded", initStage7Shell);
  window.SAPStage7Shell = { metadata: metadata, init: initStage7Shell, docs: DOCS, learningPaths: LEARNING_PATHS };
}());
