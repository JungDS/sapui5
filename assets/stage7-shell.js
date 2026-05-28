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
      docId: body.dataset.docId || "",
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
    if (!headings.length) return "";
    return '<nav class="stage7-local-toc" aria-label="이 문서 안에서">' +
      headings.map(function (h) {
        return '<a href="#' + h.id + '">' + h.textContent.trim() + '</a>';
      }).join("") +
    '</nav>';
  }

  function buildDocSideNav(meta) {
    const side = document.createElement("aside");
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
          '<button type="button" class="active" data-stage7-tab="toc">문서목차</button>' +
          '<button type="button" data-stage7-tab="path">학습경로</button>' +
        '</div>' +
        '<section data-stage7-panel="toc">' + buildLocalToc() + '</section>' +
        '<section data-stage7-panel="path" hidden>' +
          '<p class="muted">학습경로 데이터는 Stage 7 data 정비 후 자동 연결한다.</p>' +
        '</section>' +
      '</div>';
    return side;
  }

  function ensureDocumentSideNav(meta) {
    if (meta.pageType !== "doc") return;
    if (document.querySelector(".stage7-doc-side-nav")) return;
    document.body.appendChild(buildDocSideNav(meta));
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
    initTabs();
    initLocalTocSpy();
  }

  document.addEventListener("DOMContentLoaded", initStage7Shell);
  window.SAPStage7Shell = { metadata: metadata, init: initStage7Shell };
}());
