(function () {
  "use strict";

  const DATA_URL = "../../reference/abap_curriculum_v5_3_20260602_010000.json";
  const roots = Array.from(document.querySelectorAll("[data-curv2-root]"));
  if (!roots.length) return;

  const escapeHtml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const ko = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value;
    return value.ko || value.en || "";
  };

  const formatHours = (value) => {
    const num = Number(value || 0);
    if (!num) return "-";
    return Number.isInteger(num) ? `${num}h` : `${num.toFixed(1)}h`;
  };

  const unitsOf = (section) => (section.sub_levels_1 || []).flatMap((level) => level.sub_levels_2 || []);
  const difficultyOf = (section) => ko(section.sub_levels_1?.[0]?.difficulty) || "";
  const difficultyGroup = (value) => {
    if (!value) return "mid";
    if (value.includes("하")) return "low";
    if (value.includes("상")) return "high";
    return "mid";
  };
  const difficultyLabel = (value) => (value || "난이도 미정").replace(/\s*\([^)]*\)/g, "");
  const difficultyClass = (value) => {
    const group = difficultyGroup(value);
    if (group === "low") return "curv2-chip--green";
    if (group === "high") return "curv2-chip--purple";
    return "curv2-chip--amber";
  };
  const normalize = (value) => String(value || "").toLowerCase();
  const conciseTrackName = (track) => String(track.track_name || track.track_id || "")
    .replace(/\s*\([^)]*[A-Za-z][^)]*\)\s*/g, "")
    .trim();
  const safeSelectorId = (id) => window.CSS && CSS.escape ? CSS.escape(id) : String(id).replace(/"/g, "\\\"");

  // Friendly display labels. The JSON ids (THEORY-05, THEORY-05-M02) stay as the
  // stable keys for anchors / ?section= / hashes; only the visible text changes.
  // THEORY/PRACTICAL is a track prefix, so a generic "Chapter N · Lesson N" reads
  // the same on both tracks. Numbers come from the id, so they reset per track.
  const sectionNumber = (id) => { const m = String(id || "").match(/-(\d+)\s*$/); return m ? parseInt(m[1], 10) : null; };
  const unitNumbers = (id) => { const m = String(id || "").match(/-(\d+)-M(\d+)/i); return m ? { chapter: parseInt(m[1], 10), lesson: parseInt(m[2], 10) } : null; };
  const chapterLabel = (sectionId) => { const n = sectionNumber(sectionId); return n != null ? `Chapter ${n}` : String(sectionId || ""); };
  const lessonLabel = (unitId) => { const u = unitNumbers(unitId); return u ? `Lesson ${u.lesson}` : String(unitId || ""); };

  function scrollTrackControlsIntoView(root) {
    const align = () => {
      const target = root.querySelector(".curv2-premium-grid") || root.querySelector(".curv2-premium-top") || root;
      const topbar = document.querySelector(".stage7-topbar");
      const controls = root.querySelector(".curv2-premium-top");
      const offset = (topbar?.getBoundingClientRect().height || 0) + (controls?.getBoundingClientRect().height || 0) + 22;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      window.scrollTo({ top, behavior: "auto" });
    };
    requestAnimationFrame(() => requestAnimationFrame(align));
    window.setTimeout(align, 180);
  }

  function selectSectionOverview(root, id, lockMs = 1200) {
    root._curv2TocSpyLockedUntil = Date.now() + lockMs;
    setActiveToc(root, id);
  }

  function installScrollBoundaryLock(container) {
    if (!container || container._curv2BoundaryLocked) return () => {};
    const onWheel = (event) => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll <= 0) return;
      const atTop = container.scrollTop <= 0;
      const atBottom = container.scrollTop >= maxScroll - 1;
      if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
        event.preventDefault();
      }
    };
    container._curv2BoundaryLocked = true;
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container._curv2BoundaryLocked = false;
      container.removeEventListener("wheel", onWheel);
    };
  }

  function setActiveToc(root, id) {
    if (!id) return;
    const selector = `[data-curv2-scroll-target="${safeSelectorId(id)}"]`;
    const allItems = [
      ...root.querySelectorAll("[data-curv2-scroll-target]"),
      ...document.querySelectorAll(".stage7-doc-side-nav [data-curv2-scroll-target]")
    ];
    const activeItems = [
      ...root.querySelectorAll(selector),
      ...document.querySelectorAll(`.stage7-doc-side-nav ${selector}`)
    ];
    if (!activeItems.length) return;
    allItems.forEach((item) => item.removeAttribute("aria-current"));
    activeItems.forEach((item) => item.setAttribute("aria-current", "location"));
    updateUnitStepper(root, id);
    activeItems.forEach((item) => {
      const branch = item.closest("details");
      if (branch) branch.open = true;
    });

    const active = activeItems[0];
    const scroller = active.closest(".curv2-toc--premium, .stage7-doc-side-nav__scroll");
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.top < scrollerRect.top + 16) {
      scroller.scrollTop -= scrollerRect.top + 16 - activeRect.top;
    } else if (activeRect.bottom > scrollerRect.bottom - 16) {
      scroller.scrollTop += activeRect.bottom - (scrollerRect.bottom - 16);
    }
  }

  function setActiveSectionList(root, id) {
    if (!id) return;
    const active = root.querySelector(`[data-section-id="${safeSelectorId(id)}"]`);
    if (!active) return;
    root.querySelectorAll("[data-section-id]").forEach((item) => item.setAttribute("aria-current", "false"));
    active.setAttribute("aria-current", "true");
    const scroller = active.closest("[data-curv2-list]");
    if (!scroller || scroller.scrollHeight <= scroller.clientHeight + 2) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.top < scrollerRect.top + 12) {
      scroller.scrollTop -= scrollerRect.top + 12 - activeRect.top;
    } else if (activeRect.bottom > scrollerRect.bottom - 12) {
      scroller.scrollTop += activeRect.bottom - (scrollerRect.bottom - 12);
    }
  }

  function installLeftMenuScrollSpy(root, sections, onChange) {
    const targets = sections
      .map((section) => root.querySelector(`#${safeSelectorId(section.section_id)}`))
      .filter(Boolean);
    if (!targets.length) return () => {};
    let frame = 0;
    let lastActive = "";

    const selectCurrent = () => {
      frame = 0;
      const anchor = Math.min(window.innerHeight * 0.28, 260);
      let current = targets[0];
      let bestDistance = Number.POSITIVE_INFINITY;
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.bottom < 88 || rect.top > window.innerHeight * 0.84) return;
        const distance = Math.abs(rect.top - anchor);
        if (distance < bestDistance) {
          bestDistance = distance;
          current = target;
        }
      });
      if (current?.id && current.id !== lastActive) {
        lastActive = current.id;
        setActiveSectionList(root, current.id);
        onChange(current.id);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(selectCurrent);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.setTimeout(selectCurrent, 80);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }

  function updateUnitStepper(root, id) {
    const units = Array.from(root.querySelectorAll(".curv2-unit-card[id]"));
    const index = units.findIndex((unit) => unit.id === id);
    const pos = root.querySelector("[data-curv2-stepper-pos]");
    const prev = root.querySelector("[data-curv2-unit-step='-1']");
    const next = root.querySelector("[data-curv2-unit-step='1']");
    if (!pos || !units.length) return;
    const normalized = index >= 0 ? index : 0;
    pos.textContent = `${normalized + 1} / ${units.length}`;
    if (prev) prev.disabled = normalized <= 0;
    if (next) next.disabled = normalized >= units.length - 1;
  }

  function installScrollSpy(root) {
    const targets = Array.from(root.querySelectorAll(".curv2-section-detail[id], .curv2-unit-card[id]"));
    if (!targets.length) return () => {};
    let frame = 0;
    let lastActive = "";

    const selectCurrent = () => {
      frame = 0;
      if (Date.now() < (root._curv2TocSpyLockedUntil || 0)) return;
      const anchor = Math.min(window.innerHeight * 0.32, 280);
      let current = targets[0];
      let bestDistance = Number.POSITIVE_INFINITY;
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.bottom < 88 || rect.top > window.innerHeight * 0.82) return;
        const distance = Math.abs(rect.top - anchor);
        if (distance < bestDistance) {
          bestDistance = distance;
          current = target;
        }
      });
      if (current?.id && current.id !== lastActive) {
        lastActive = current.id;
        setActiveToc(root, current.id);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(selectCurrent);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.setTimeout(selectCurrent, 80);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }

  const sectionKeywords = (section, limit = 12) => {
    const words = [];
    unitsOf(section).forEach((unit) => {
      (unit.technical_keywords || []).forEach((word) => {
        if (word && !words.includes(word)) words.push(word);
      });
    });
    return words.slice(0, limit);
  };

  const collapseGlobalDocNav = () => {
    const side = document.querySelector(".stage7-doc-side-nav");
    const button = document.querySelector(".stage7-doc-nav-toggle");
    document.body.classList.add("stage7-doc-nav-collapsed");
    if (side) side.setAttribute("aria-hidden", "true");
    if (button) {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("title", "Navigation 열기");
    }
  };

  const SECTION_DETAIL_HREF = "abap-curriculum-section-detail.html";

  function renderStageNavigationToc(section, data) {
    const side = document.querySelector(".stage7-doc-side-nav");
    const panel = document.getElementById("stage7TocPanel");
    if (!side || !panel) return;
    const tocButton = side.querySelector("[data-stage7-tab='toc']");
    if (tocButton) tocButton.textContent = "학습 목차";
    const pathButton = side.querySelector("[data-stage7-tab='path']");
    if (pathButton) pathButton.textContent = "학습 경로";

    // Reflect the selected THEORY as the "현재 THEORY" header.
    const titleEl = side.querySelector('[data-shell-field="current-title"]');
    if (titleEl) titleEl.textContent = section.section_name || section.section_id;
    const labelEl = side.querySelector('[data-shell-field="current-label"]');
    if (labelEl) labelEl.textContent = "현재 Chapter";

    panel.innerHTML = renderTocMarkup(section, "stage7");
    renderStageNavigationPath(section, data);
    updateDetailFab(section);

    side.querySelectorAll("[data-stage7-tab]").forEach((button) => {
      const isToc = button.getAttribute("data-stage7-tab") === "toc";
      button.classList.toggle("active", isToc);
      button.setAttribute("aria-selected", String(isToc));
    });
    side.querySelectorAll("[data-stage7-panel]").forEach((item) => {
      item.hidden = item.getAttribute("data-stage7-panel") !== "toc";
    });
  }

  // A floating shortcut that always points at the currently selected THEORY's
  // detail page, so readers can jump there without scrolling to the Navigation.
  function updateDetailFab(section) {
    let fab = document.querySelector(".curv2-detail-fab");
    if (!fab) {
      fab = document.createElement("a");
      fab.className = "curv2-detail-fab";
      fab.innerHTML = '<span class="curv2-detail-fab__icon" aria-hidden="true">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>' +
        '</span><span class="curv2-detail-fab__label">Chapter 상세 보기</span>';
      document.body.appendChild(fab);
    }
    if (!section) { fab.hidden = true; return; }
    fab.hidden = false;
    fab.href = SECTION_DETAIL_HREF + "?section=" + encodeURIComponent(section.section_id);
    fab.setAttribute("title", chapterLabel(section.section_id) + " 상세 페이지로 이동");
    fab.setAttribute("aria-label", chapterLabel(section.section_id) + " · " + (section.section_name || "") + " 상세 페이지로 이동");
  }

  function renderStageNavigationPath(section, data) {
    const panel = document.getElementById("stage7PathPanel");
    if (!panel) return;
    if (!data) { panel.innerHTML = ""; return; }
    const track = data.tracks.find((item) => (item.sections || []).some((sec) => sec.section_id === section.section_id)) || data.tracks[0];
    const sections = track.sections || [];
    const currentIndex = sections.findIndex((sec) => sec.section_id === section.section_id);
    const total = sections.length;
    const completed = currentIndex >= 0 ? currentIndex + 1 : 0;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    const iconFor = (kind) => {
      if (kind === "done") return '<svg class="stage7-stepper-card-icon done" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      if (kind === "active") return '<svg class="stage7-stepper-card-icon active" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
      return '<svg class="stage7-stepper-card-icon next" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
    };

    const cards = sections.map((sec, index) => {
      const kind = index < currentIndex ? "done" : index === currentIndex ? "active" : "next";
      const isCurrent = sec.section_id === section.section_id;
      const href = `${SECTION_DETAIL_HREF}?section=${encodeURIComponent(sec.section_id)}`;
      return `
        <div class="stage7-stepper-card ${kind}${isCurrent ? " current" : ""}">
          <div class="stage7-stepper-card-left">${iconFor(kind)}</div>
          <div class="stage7-stepper-card-right">
            <a href="${href}" class="stage7-stepper-card-title">${escapeHtml(chapterLabel(sec.section_id))} · ${escapeHtml(sec.section_name)}</a>
          </div>
        </div>`;
    }).join("");

    panel.innerHTML = `
      <div class="stage7-path-panel">
        <div class="stage7-progress-card">
          <div><span>${escapeHtml(conciseTrackName(track))}</span><strong>${completed} / ${total}</strong></div>
          <div class="stage7-progress-bar"><span style="width:${progress}%"></span></div>
        </div>
        <div class="stage7-side-heading">THEORY 상세 보기</div>
        <p class="stage7-path-hint">각 THEORY의 상세 페이지로 이동합니다.</p>
        <div class="stage7-stepper-container">
          <div class="stage7-stepper-group">
            <div class="stage7-stepper-group-items">${cards}</div>
          </div>
        </div>
      </div>`;
  }

  collapseGlobalDocNav();
  window.addEventListener("DOMContentLoaded", () => setTimeout(collapseGlobalDocNav, 0));
  window.addEventListener("load", () => setTimeout(collapseGlobalDocNav, 0));

  function getStats(data) {
    const sections = data.tracks.flatMap((track) => track.sections || []);
    const units = sections.flatMap(unitsOf);
    const hours = sections.reduce((sum, section) => sum + Number(section.recommended_hours || 0), 0);
    return { tracks: data.tracks.length, sections: sections.length, units: units.length, hours };
  }

  function buildTermIndex(data) {
    const index = new Map();
    data.tracks.forEach((track) => {
      track.sections.forEach((section) => {
        unitsOf(section).forEach((unit) => {
          (unit.technical_keywords || []).forEach((keyword) => {
            if (!index.has(keyword)) {
              index.set(keyword, {
                keyword,
                sectionId: section.section_id,
                sectionName: section.section_name,
                unitName: unit.sub_2_name,
                description: ko(unit.handled_contents),
                objective: ko(unit.learning_objectives)
              });
            }
          });
        });
      });
    });
    return index;
  }

  function termButton(term) {
    return `<button type="button" class="curv2-term curv2-chip--green" data-curv2-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`;
  }

  function matchesSection(section, query, difficulty) {
    const diff = difficultyOf(section);
    if (difficulty !== "all" && difficultyGroup(diff) !== difficulty) return false;
    if (!query) return true;
    const units = unitsOf(section);
    const haystack = [
      section.section_id,
      section.section_name,
      ko(section.section_goal),
      diff,
      ...sectionKeywords(section, 40),
      ...units.flatMap((unit) => [
        unit.sub_2_id,
        unit.sub_2_name,
        ko(unit.handled_contents),
        ko(unit.learning_objectives),
        ...(unit.technical_keywords || [])
      ])
    ].join(" ");
    return normalize(haystack).includes(normalize(query));
  }

  function initRoot(root, data, termIndex) {
    const variant = root.dataset.curv2Variant;
    if (variant === "gallery") {
      initGallery(root, data, termIndex);
    } else if (variant === "premium") {
      initPremium(root, data, termIndex);
    } else {
      initDashboard(root, data, termIndex);
    }
  }

  function renderStats(data) {
    const stats = getStats(data);
    return `
      <div class="curv2-stats">
        <div class="curv2-stat"><strong>${stats.tracks}</strong><span>트랙</span></div>
        <div class="curv2-stat"><strong>${stats.sections}</strong><span>섹션</span></div>
        <div class="curv2-stat"><strong>${stats.units}</strong><span>학습 단위</span></div>
        <div class="curv2-stat"><strong>${formatHours(stats.hours)}</strong><span>권장 시간</span></div>
      </div>
    `;
  }

  function initDashboard(root, data, termIndex) {
    const state = { trackIndex: 0, sectionId: "", query: "", difficulty: "all" };
    root.innerHTML = `
      <div class="curv2-shell">
        <section class="curv2-app">
          ${renderAppbar(root, data)}
          <nav class="curv2-tabs" data-curv2-tabs aria-label="트랙 선택"></nav>
          <section class="curv2-workspace">
            <aside class="curv2-sidebar">
              <div class="curv2-sidebar-head">
                <input class="curv2-search" type="search" data-curv2-search placeholder="섹션 검색 (예: DDIC, ALV, RAP)" />
                <select class="curv2-select" data-curv2-difficulty>
                  <option value="all">난이도 전체</option>
                  <option value="low">하</option>
                  <option value="mid">중</option>
                  <option value="high">상</option>
                </select>
              </div>
              <div class="curv2-list" data-curv2-list></div>
            </aside>
            <main class="curv2-detail-scroll">
              <div class="curv2-detail" data-curv2-detail></div>
            </main>
            <aside class="curv2-toc" data-curv2-toc></aside>
          </section>
        </section>
      </div>
    `;
    wireMasterDetail(root, data, termIndex, state, { mode: "dashboard" });
  }

  function initPremium(root, data, termIndex) {
    const state = { trackIndex: 0, sectionId: "", query: "", difficulty: "all" };
    root.innerHTML = `
      <div class="curv2-premium-wrap">
        <section class="curv2-premium-hero">
          <div>
            ${breadcrumb(root.dataset.curv2Title)}
            <div class="curv2-kicker">ABAP Curriculum Codex v7</div>
            <h1>${escapeHtml(root.dataset.curv2Title)}</h1>
            <p>${escapeHtml(root.dataset.curv2Subtitle)}</p>
          </div>
          ${renderStats(data)}
        </section>
        <section class="curv2-premium-top">
          <nav class="curv2-tabs" data-curv2-tabs aria-label="트랙 선택"></nav>
        </section>
        <section class="curv2-premium-filterbar">
          <div style="display:grid;grid-template-columns:minmax(0,1fr) 150px;gap:10px">
            <input class="curv2-search" type="search" data-curv2-search placeholder="키워드 검색" />
            <select class="curv2-select" data-curv2-difficulty>
              <option value="all">전체</option>
              <option value="low">하</option>
              <option value="mid">중</option>
              <option value="high">상</option>
            </select>
          </div>
        </section>
        <section class="curv2-premium-grid">
          <aside class="curv2-premium-panel">
            <div class="curv2-list curv2-premium-list" data-curv2-list></div>
          </aside>
          <main class="curv2-premium-panel curv2-premium-detail">
            <div class="curv2-detail" data-curv2-detail></div>
          </main>
          <aside class="curv2-premium-panel curv2-premium-tocpanel">
            <div class="curv2-toc curv2-toc--premium" data-curv2-toc></div>
          </aside>
        </section>
      </div>
    `;
    wireMasterDetail(root, data, termIndex, state, { mode: "premium", flavor: root.dataset.curv2Flavor || "" });
  }

  function renderAppbar(root, data) {
    return `
      <header class="curv2-appbar">
        <div class="curv2-appbar-main">
          ${breadcrumb(root.dataset.curv2Title)}
          <div class="curv2-kicker">ABAP Curriculum Codex v7</div>
          <h1>${escapeHtml(root.dataset.curv2Title)}</h1>
          <p>${escapeHtml(root.dataset.curv2Subtitle)}</p>
        </div>
        ${renderStats(data)}
      </header>
    `;
  }

  function breadcrumb(title) {
    return `
      <div class="curv2-breadcrumb">
        <a href="../../index.html">홈</a><span>›</span>
        <a href="../../pages/roadmap.html">로드맵 / 학습전략</a><span>›</span>
        <span>${escapeHtml(title)}</span>
      </div>
    `;
  }

  function wireMasterDetail(root, data, termIndex, state, options) {
    const els = {
      tabs: root.querySelector("[data-curv2-tabs]"),
      list: root.querySelector("[data-curv2-list]"),
      detail: root.querySelector("[data-curv2-detail]"),
      toc: root.querySelector("[data-curv2-toc]"),
      search: root.querySelector("[data-curv2-search]"),
      difficulty: root.querySelector("[data-curv2-difficulty]")
    };
    const findSection = (id) => {
      for (const track of data.tracks) {
        const section = track.sections.find((item) => item.section_id === id);
        if (section) return section;
      }
      return null;
    };
    const currentTrack = () => data.tracks[state.trackIndex];
    const currentSections = () => currentTrack().sections.filter((section) => matchesSection(section, state.query, state.difficulty));
    const render = ({ keepHash = false } = {}) => {
      renderTabs(els.tabs, data, state);
      const sections = currentSections();
      if (!sections.some((section) => section.section_id === state.sectionId)) {
        state.sectionId = sections[0]?.section_id || currentTrack().sections[0]?.section_id || "";
      }
      renderSectionList(els.list, sections, state);
      setActiveSectionList(root, state.sectionId);
      const section = findSection(state.sectionId);
      if (options.flavor === "left-scrollspy") {
        renderDetail(els.detail, section, termIndex, options.mode, "reader-polish");
        if (els.toc) renderToc(els.toc, section);
        renderStageNavigationToc(section, data);
      } else {
        renderDetail(els.detail, section, termIndex, options.mode, options.flavor || "");
        if (els.toc) renderToc(els.toc, section);
      }
      if (state.scrollSpyCleanup) state.scrollSpyCleanup();
      if (options.flavor === "left-scrollspy") {
        state.scrollSpyCleanup = installScrollSpy(root);
        if (!state.boundaryCleanup) state.boundaryCleanup = installScrollBoundaryLock(els.list);
      } else {
        state.scrollSpyCleanup = installScrollSpy(root);
      }
      if (!keepHash && section) history.replaceState(null, "", `#${encodeURIComponent(section.section_id)}`);
    };
    const hashId = decodeURIComponent(location.hash.replace(/^#/, ""));
    const hashSection = hashId ? findSection(hashId) : null;
    if (hashSection) {
      state.trackIndex = data.tracks.findIndex((track) => track.sections.some((section) => section.section_id === hashSection.section_id));
      state.sectionId = hashSection.section_id;
    } else {
      state.sectionId = data.tracks[0]?.sections[0]?.section_id || "";
    }
    root.addEventListener("click", (event) => {
      const trackButton = event.target.closest("[data-track-index]");
      if (trackButton) {
        state.trackIndex = Number(trackButton.dataset.trackIndex || 0);
        state.sectionId = currentSections()[0]?.section_id || currentTrack().sections[0]?.section_id || "";
        render();
        return;
      }
      const sectionButton = event.target.closest("[data-section-id]");
      if (sectionButton) {
        const id = sectionButton.dataset.sectionId;
        const trackIndex = data.tracks.findIndex((track) => track.sections.some((section) => section.section_id === id));
        if (trackIndex >= 0) state.trackIndex = trackIndex;
        state.sectionId = id;
        if (options.flavor === "left-scrollspy") {
          render();
          selectSectionOverview(root, id);
          scrollTrackControlsIntoView(root);
        } else {
          render();
        }
        return;
      }
      const tocLink = event.target.closest("[data-curv2-scroll-target]");
      if (tocLink) {
        event.preventDefault();
        const id = tocLink.dataset.curv2ScrollTarget;
        const target = root.querySelector(`#${safeSelectorId(id)}`);
        if (target) {
          history.replaceState(null, "", `#${encodeURIComponent(id)}`);
          setActiveToc(root, id);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (target.matches("[tabindex]")) target.focus({ preventScroll: true });
        }
        return;
      }
      const unitStep = event.target.closest("[data-curv2-unit-step]");
      if (unitStep) {
        const units = unitsOf(findSection(state.sectionId) || {});
        if (!units.length) return;
        const current = root.querySelector("[data-curv2-scroll-target][aria-current='location']")?.dataset.curv2ScrollTarget || "";
        const delta = Number(unitStep.dataset.curv2UnitStep || 0);
        const foundIndex = units.findIndex((unit) => unit.sub_2_id === current);
        const currentIndex = foundIndex >= 0 ? foundIndex : delta > 0 ? -1 : 0;
        const nextIndex = Math.min(units.length - 1, Math.max(0, currentIndex + delta));
        const nextUnit = units[nextIndex];
        const target = nextUnit ? root.querySelector(`#${safeSelectorId(nextUnit.sub_2_id)}`) : null;
        if (target) {
          history.replaceState(null, "", `#${encodeURIComponent(nextUnit.sub_2_id)}`);
          setActiveToc(root, nextUnit.sub_2_id);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }
      const term = event.target.closest("[data-curv2-term]");
      if (term) openTermModal(term.dataset.curv2Term, termIndex);
    });
    document.addEventListener("click", (event) => {
      const tocLink = event.target.closest(".stage7-doc-side-nav [data-curv2-scroll-target]");
      if (!tocLink) return;
      event.preventDefault();
      const id = tocLink.dataset.curv2ScrollTarget;
      const target = root.querySelector(`#${safeSelectorId(id)}`);
      if (!target) return;
      history.replaceState(null, "", `#${encodeURIComponent(id)}`);
      setActiveToc(root, id);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (target.matches("[tabindex]")) target.focus({ preventScroll: true });
    });
    if (els.search) {
      els.search.addEventListener("input", () => {
        state.query = els.search.value.trim();
        render({ keepHash: true });
      });
    }
    if (els.difficulty) {
      els.difficulty.addEventListener("change", () => {
        state.difficulty = els.difficulty.value;
        render({ keepHash: true });
      });
    }
    window.addEventListener("hashchange", () => {
      const id = decodeURIComponent(location.hash.replace(/^#/, ""));
      if (!id || !findSection(id)) return;
      const trackIndex = data.tracks.findIndex((track) => track.sections.some((section) => section.section_id === id));
      if (trackIndex >= 0) state.trackIndex = trackIndex;
      state.sectionId = id;
      render({ keepHash: true });
    });
    render({ keepHash: Boolean(hashSection) });
  }

  function renderTabs(container, data, state) {
    container.innerHTML = data.tracks.map((track, index) => {
      const label = track.track_id === "TRACK-01" ? "Track 1" : "Track 2";
      return `<button class="curv2-tab" type="button" data-track-index="${index}" aria-selected="${index === state.trackIndex ? "true" : "false"}">${escapeHtml(label)} · ${escapeHtml(conciseTrackName(track))}</button>`;
    }).join("");
  }

  function renderSectionList(container, sections, state) {
    if (!sections.length) {
      container.innerHTML = `<div class="curv2-empty"><div><strong>조건에 맞는 섹션이 없습니다.</strong><br><span>검색어 또는 필터를 조정해 주세요.</span></div></div>`;
      return;
    }
    container.innerHTML = sections.map((section) => {
      const diff = difficultyOf(section);
      return `
        <button class="curv2-list-item" type="button" data-section-id="${escapeHtml(section.section_id)}" aria-current="${section.section_id === state.sectionId ? "true" : "false"}">
          <span class="curv2-id">${escapeHtml(chapterLabel(section.section_id))}</span>
          <span class="curv2-list-title">${escapeHtml(section.section_name)}</span>
          <span class="curv2-chiprow">
            <span class="curv2-chip ${difficultyClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
            <span class="curv2-chip curv2-chip--blue">${escapeHtml(formatHours(section.recommended_hours))}</span>
            <span class="curv2-chip">${unitsOf(section).length} Lessons</span>
          </span>
        </button>
      `;
    }).join("");
  }

  function renderDetail(container, section, termIndex, mode, flavor = "") {
    if (!section) {
      container.innerHTML = `<div class="curv2-empty"><div><strong>표시할 섹션이 없습니다.</strong></div></div>`;
      return;
    }
    container.innerHTML = renderSectionDetail(section, termIndex, mode, flavor);
  }

  function renderSectionStream(container, sections, termIndex, mode, flavor = "") {
    if (!sections.length) {
      container.innerHTML = `<div class="curv2-empty"><div><strong>표시할 섹션이 없습니다.</strong></div></div>`;
      return;
    }
    container.innerHTML = sections.map((section) => renderSectionDetail(section, termIndex, mode, flavor)).join("");
  }

  function renderSectionDetail(section, termIndex, mode, flavor = "") {
    const units = unitsOf(section);
    const diff = difficultyOf(section);
    const keywordLimit = mode === "dashboard" ? 8 : 14;
    return `
      <section class="curv2-section-detail" id="${escapeHtml(section.section_id)}" tabindex="-1">
        <div class="curv2-eyebrow">${escapeHtml(chapterLabel(section.section_id))}</div>
        <h2>${escapeHtml(section.section_name)}</h2>
        <p class="curv2-desc">${escapeHtml(ko(section.section_goal))}</p>
        <div class="curv2-chiprow" style="margin-bottom:12px">
          <span class="curv2-chip ${difficultyClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
          <span class="curv2-chip curv2-chip--blue">권장 ${escapeHtml(formatHours(section.recommended_hours))}</span>
          <span class="curv2-chip">${units.length} Lessons</span>
        </div>
        <div class="curv2-chiprow" style="margin-bottom:28px">
          ${sectionKeywords(section, keywordLimit).map(termButton).join("")}
        </div>
        ${flavor === "unit-stepper" ? renderUnitStepper(units) : ""}
        ${units.map((unit, index) => renderUnit(unit, index, mode, flavor)).join("")}
      </section>
    `;
  }

  function renderUnitStepper(units) {
    return `
      <div class="curv2-unit-stepper" aria-label="학습 단위 이동">
        <button type="button" class="curv2-step-btn" data-curv2-unit-step="-1" disabled>이전</button>
        <span class="curv2-step-pos" data-curv2-stepper-pos>1 / ${units.length}</span>
        <button type="button" class="curv2-step-btn" data-curv2-unit-step="1">다음</button>
      </div>
    `;
  }

  function renderUnit(unit, index, mode, flavor = "") {
    const metadata = unit.module_metadata || {};
    const steps = ko(unit.learning_content_design);
    const cautions = ko(unit.caution_points);
    const showDeep = mode !== "dashboard" || index < 2;
    if (flavor === "reader-polish") return renderPolishedUnit(unit, metadata, steps, cautions, showDeep);
    return `
      <section class="curv2-unit-card" id="${escapeHtml(unit.sub_2_id)}">
        <div class="curv2-id">${escapeHtml(unit.sub_2_id)}</div>
        <h3>${escapeHtml(unit.sub_2_name)}</h3>
        <div class="curv2-chiprow" style="margin-bottom:12px">
          ${(unit.technical_keywords || []).slice(0, 6).map(termButton).join("")}
          ${metadata.module_family ? `<span class="curv2-chip">${escapeHtml(metadata.module_family)}</span>` : ""}
          ${metadata.recommended_hours ? `<span class="curv2-chip curv2-chip--blue">${escapeHtml(formatHours(metadata.recommended_hours))}</span>` : ""}
        </div>
        <div class="curv2-unit-body">
          <p><strong>핵심 내용</strong> ${escapeHtml(ko(unit.handled_contents))}</p>
          ${showDeep ? `<p><strong>학습 목표</strong> ${escapeHtml(ko(unit.learning_objectives))}</p>` : ""}
          ${showDeep && Array.isArray(steps) ? `<div><strong>수업 설계</strong><ol>${steps.slice(0, 5).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></div>` : ""}
          ${showDeep && ko(unit.hands_on_lab) ? `<p><strong>Hands-on Lab</strong> ${escapeHtml(ko(unit.hands_on_lab))}</p>` : ""}
          ${mode === "premium" && Array.isArray(cautions) && cautions.length ? `<div class="curv2-note">${escapeHtml(cautions[0])}</div>` : ""}
        </div>
      </section>
    `;
  }

  // Explorer body shows only the unit headline (핵심 내용); the deeper fields
  // (학습 목표 · 수업 설계 · 실습 · 주의사항 · 평가 설계 …) live on the THEORY
  // detail page. The JSON still holds every field, so this only changes what is
  // drawn here — search still scans the full record.
  function renderPolishedUnit(unit, metadata, steps, cautions, showDeep) {
    const sectionId = String(unit.sub_2_id).replace(/-M\d+$/i, "");
    const detailHref = `${SECTION_DETAIL_HREF}?section=${encodeURIComponent(sectionId)}#${encodeURIComponent(unit.sub_2_id)}`;
    return `
      <section class="curv2-unit-card curv2-unit-card--blocks curv2-unit-card--compact" id="${escapeHtml(unit.sub_2_id)}">
        <div class="curv2-id">${escapeHtml(lessonLabel(unit.sub_2_id))}</div>
        <h3>${escapeHtml(unit.sub_2_name)}</h3>
        <div class="curv2-chiprow" style="margin-bottom:14px">
          ${(unit.technical_keywords || []).slice(0, 6).map(termButton).join("")}
          ${metadata.module_family ? `<span class="curv2-chip">${escapeHtml(metadata.module_family)}</span>` : ""}
          ${metadata.recommended_hours ? `<span class="curv2-chip curv2-chip--blue">${escapeHtml(formatHours(metadata.recommended_hours))}</span>` : ""}
        </div>
        <div class="curv2-unit-blocks">
          <section class="curv2-info-block">
            <h4>핵심 내용</h4>
            <p>${escapeHtml(ko(unit.handled_contents))}</p>
          </section>
        </div>
        <a class="curv2-unit-more" href="${detailHref}">
          <span>학습 목표 · 수업 설계 · 실습 · 주의사항 자세히 보기</span>
          <span aria-hidden="true">→</span>
        </a>
      </section>
    `;
  }

  function renderToc(container, section) {
    if (!section) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = renderTocMarkup(section);
  }

  function renderTocMarkup(section, context = "") {
    const groups = section.sub_levels_1 || [];
    const showHeading = context !== "stage7";
    return `
      ${showHeading ? "<h2>학습 목차</h2>" : ""}
      <div class="curv2-toc-tree">
        <a class="curv2-toc-root" href="#${encodeURIComponent(section.section_id)}" data-curv2-scroll-target="${escapeHtml(section.section_id)}" aria-current="location">
          <span class="curv2-tree-line"></span>
          <span class="curv2-tree-label">${escapeHtml(chapterLabel(section.section_id))} · 개요</span>
        </a>
        ${groups.map((group, groupIndex) => {
          const groupUnits = group.sub_levels_2 || [];
          return `
            <details class="curv2-toc-branch" open>
              <summary>
                <span class="curv2-tree-toggle" aria-hidden="true"></span>
                <span>${escapeHtml(group.sub_1_name || `학습 묶음 ${groupIndex + 1}`)}</span>
              </summary>
              <div class="curv2-toc-leaves">
                ${groupUnits.map((unit) => `
                  <a href="#${encodeURIComponent(unit.sub_2_id)}" data-curv2-scroll-target="${escapeHtml(unit.sub_2_id)}">
                    <span class="curv2-tree-line"></span>
                    <span class="curv2-tree-id">${escapeHtml(lessonLabel(unit.sub_2_id))}</span>
                    <span class="curv2-tree-label">${escapeHtml(unit.sub_2_name)}</span>
                  </a>
                `).join("")}
              </div>
            </details>
          `;
        }).join("")}
      </div>
    `;
  }

  function initGallery(root, data, termIndex) {
    const state = { query: "", difficulty: "all", activeSection: null };
    root.innerHTML = `
      <div class="curv2-gallery-shell">
        <header class="curv2-gallery-head">
          <div>
            ${breadcrumb(root.dataset.curv2Title)}
            <div class="curv2-kicker">ABAP Curriculum Codex v7</div>
            <h1>${escapeHtml(root.dataset.curv2Title)}</h1>
            <p>${escapeHtml(root.dataset.curv2Subtitle)}</p>
          </div>
          <div class="curv2-gallery-tools">
            <input class="curv2-search" type="search" data-gallery-search placeholder="전체 커리큘럼 검색" />
            <select class="curv2-select" data-gallery-difficulty>
              <option value="all">난이도 전체</option>
              <option value="low">하</option>
              <option value="mid">중</option>
              <option value="high">상</option>
            </select>
          </div>
        </header>
        <section data-gallery-grid></section>
      </div>
      <div class="curv2-drawer-overlay" data-drawer-overlay></div>
      <aside class="curv2-drawer" data-drawer aria-label="섹션 상세">
        <div class="curv2-drawer-head">
          <h2 data-drawer-title>섹션 상세</h2>
          <button class="curv2-close" type="button" data-drawer-close aria-label="닫기">x</button>
        </div>
        <div class="curv2-drawer-body" data-drawer-body></div>
      </aside>
    `;
    const els = {
      grid: root.querySelector("[data-gallery-grid]"),
      search: root.querySelector("[data-gallery-search]"),
      difficulty: root.querySelector("[data-gallery-difficulty]"),
      overlay: root.querySelector("[data-drawer-overlay]"),
      drawer: root.querySelector("[data-drawer]"),
      drawerTitle: root.querySelector("[data-drawer-title]"),
      drawerBody: root.querySelector("[data-drawer-body]")
    };
    const findSection = (id) => data.tracks.flatMap((track) => track.sections).find((section) => section.section_id === id);
    const render = () => {
      els.grid.innerHTML = data.tracks.map((track) => {
        const filtered = track.sections.filter((section) => matchesSection(section, state.query, state.difficulty));
        if (!filtered.length) return "";
        return `
          <section class="curv2-track-section">
            <h2 class="curv2-track-title">${escapeHtml(conciseTrackName(track))}</h2>
            <div class="curv2-card-grid">
              ${filtered.map((section) => renderGalleryCard(section)).join("")}
            </div>
          </section>
        `;
      }).join("") || `<div class="curv2-empty"><div><strong>조건에 맞는 섹션이 없습니다.</strong></div></div>`;
    };
    const openDrawer = (section) => {
      state.activeSection = section;
      els.drawerTitle.textContent = section.section_id;
      els.drawerBody.innerHTML = `<div class="curv2-detail" style="padding:0">${renderDrawerDetail(section)}</div>`;
      els.overlay.classList.add("open");
      els.drawer.classList.add("open");
      history.replaceState(null, "", `#${encodeURIComponent(section.section_id)}`);
    };
    const closeDrawer = () => {
      els.overlay.classList.remove("open");
      els.drawer.classList.remove("open");
    };
    root.addEventListener("click", (event) => {
      const card = event.target.closest("[data-gallery-section]");
      if (card) {
        const section = findSection(card.dataset.gallerySection);
        if (section) openDrawer(section);
        return;
      }
      const term = event.target.closest("[data-curv2-term]");
      if (term) openTermModal(term.dataset.curv2Term, termIndex);
    });
    els.search.addEventListener("input", () => {
      state.query = els.search.value.trim();
      render();
    });
    els.difficulty.addEventListener("change", () => {
      state.difficulty = els.difficulty.value;
      render();
    });
    els.overlay.addEventListener("click", closeDrawer);
    root.querySelector("[data-drawer-close]").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });
    render();
    const hashSection = findSection(decodeURIComponent(location.hash.replace(/^#/, "")));
    if (hashSection) openDrawer(hashSection);
  }

  function renderGalleryCard(section) {
    const diff = difficultyOf(section);
    return `
      <button class="curv2-card" type="button" data-gallery-section="${escapeHtml(section.section_id)}">
        <span class="curv2-id">${escapeHtml(section.section_id)}</span>
        <span class="curv2-card-title">${escapeHtml(section.section_name)}</span>
        <span class="curv2-card-desc">${escapeHtml(ko(section.section_goal))}</span>
        <span class="curv2-card-footer curv2-chiprow">
          <span class="curv2-chip ${difficultyClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
          <span class="curv2-chip curv2-chip--blue">${escapeHtml(formatHours(section.recommended_hours))}</span>
          <span class="curv2-chip">${unitsOf(section).length} units</span>
        </span>
      </button>
    `;
  }

  function renderDrawerDetail(section) {
    const units = unitsOf(section);
    const diff = difficultyOf(section);
    return `
      <div class="curv2-eyebrow">${escapeHtml(section.section_id)}</div>
      <h2>${escapeHtml(section.section_name)}</h2>
      <p class="curv2-desc">${escapeHtml(ko(section.section_goal))}</p>
      <div class="curv2-chiprow" style="margin-bottom:14px">
        <span class="curv2-chip ${difficultyClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
        <span class="curv2-chip curv2-chip--blue">권장 ${escapeHtml(formatHours(section.recommended_hours))}</span>
        <span class="curv2-chip">${units.length} units</span>
      </div>
      <div class="curv2-chiprow" style="margin-bottom:24px">${sectionKeywords(section, 10).map(termButton).join("")}</div>
      ${units.map((unit, index) => renderUnit(unit, index, "gallery")).join("")}
    `;
  }

  function openTermModal(term, termIndex) {
    const entry = termIndex.get(term) || { keyword: term };
    const old = document.querySelector(".curv2-term-modal");
    if (old) old.remove();
    const modal = document.createElement("div");
    modal.className = "curv2-term-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="curv2-term-card">
        <div class="curv2-term-head">
          <h2>${escapeHtml(entry.keyword)}</h2>
          <button class="curv2-close" type="button" aria-label="닫기">x</button>
        </div>
        <div class="curv2-term-body">
          ${entry.description ? `<p><strong>관련 설명</strong> ${escapeHtml(entry.description)}</p>` : `<p>이 용어는 현재 커리큘럼의 기술 키워드로 사용됩니다.</p>`}
          ${entry.sectionId ? `<p><strong>연결 섹션</strong> ${escapeHtml(entry.sectionId)} · ${escapeHtml(entry.sectionName)}</p>` : ""}
          ${entry.unitName ? `<p><strong>대표 학습 단위</strong> ${escapeHtml(entry.unitName)}</p>` : ""}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector(".curv2-close").focus();
    const close = () => modal.remove();
    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest(".curv2-close")) close();
    });
    document.addEventListener("keydown", function onKeydown(event) {
      if (event.key !== "Escape") return;
      close();
      document.removeEventListener("keydown", onKeydown);
    });
  }

  fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const termIndex = buildTermIndex(data);
      roots.forEach((root) => initRoot(root, data, termIndex));
    })
    .catch((error) => {
      roots.forEach((root) => {
        root.innerHTML = `<div class="curv2-empty"><div><strong>커리큘럼 데이터를 불러오지 못했습니다.</strong><br><span>${escapeHtml(error.message)} · 로컬 서버 또는 GitHub Pages에서 확인해 주세요.</span></div></div>`;
      });
    });
})();
