/*
 * ABAP Curriculum Explorer — shared engine for the harmonized sample pages.
 *
 * Combines the strengths of the three master-detail prototypes:
 *  - codex : search + difficulty filter + JSON-driven rendering + rich sub_2 detail + hash deep-link
 *  - claude: works from file:// (inline JSON), term popups, in-detail unit navigation
 *  - antigravity: clean app aesthetic (driven by the per-layout skin CSS)
 *
 * One engine, four skins. The host page provides hooks via data-attributes and a
 * `data-layout` value (studio | library | focus | dashboard). Data is read from an
 * inline <script type="application/json" data-curriculum-data> block first (so the
 * page opens directly via file://), and falls back to fetch() when served by a server.
 */
(function () {
  "use strict";

  const root = document.querySelector("[data-abap-curriculum-root]");
  if (!root) return;

  const layout = root.dataset.layout || "library";
  const isFocus = layout === "focus" || layout === "focus-doc";
  const DEFAULT_URL =
    root.dataset.curriculumSrc ||
    "../../reference/abap_curriculum_v5_3_20260602_010000.json";

  /* ---------- global doc-nav collapse (when hosted in the stage7 shell) ---------- */
  const collapseGlobalDocNav = () => {
    const side = document.querySelector(".stage7-doc-side-nav");
    const button = document.querySelector(".stage7-doc-nav-toggle");
    if (!side && !button) return;
    document.body.classList.add("stage7-doc-nav-collapsed");
    if (side) side.setAttribute("aria-hidden", "true");
    if (button) button.setAttribute("aria-expanded", "false");
  };
  collapseGlobalDocNav();
  window.addEventListener("DOMContentLoaded", () => setTimeout(collapseGlobalDocNav, 0));
  window.addEventListener("load", () => setTimeout(collapseGlobalDocNav, 0));

  /* ---------- element hooks ---------- */
  const els = {
    tabs: root.querySelector("[data-track-tabs]"),
    list: root.querySelector("[data-section-list]"),
    detail: root.querySelector("[data-section-detail]"),
    loading: root.querySelector("[data-loading-state]"),
    trackTitle: root.querySelector("[data-current-track-title]"),
    visibleCount: root.querySelector("[data-visible-count]"),
    search: root.querySelector("[data-curriculum-search]"),
    difficulty: root.querySelector("[data-curriculum-difficulty]"),
    unitNav: root.querySelector("[data-unit-nav]"),
    // stats may live in the page hero (outside the explorer root) -> query document
    stats: {
      tracks: document.querySelector("[data-stat='tracks']"),
      sections: document.querySelector("[data-stat='sections']"),
      units: document.querySelector("[data-stat='units']"),
      hours: document.querySelector("[data-stat='hours']")
    }
  };

  const state = {
    data: null,
    trackIndex: 0,
    sectionId: "",
    query: "",
    difficulty: "all",
    unitIndex: 0
  };

  /* ---------- helpers ---------- */
  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const ko = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.join(" ");
    return value.ko || value.en || "";
  };

  // {ko:[],en:[]} or [] -> array of strings (ko first)
  const koList = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((x) => (typeof x === "string" ? x : ko(x)));
    if (Array.isArray(value.ko)) return value.ko;
    if (Array.isArray(value.en)) return value.en;
    return [];
  };

  const formatHours = (value) => {
    const num = Number(value || 0);
    if (!num) return "-";
    return Number.isInteger(num) ? `${num}h` : `${num.toFixed(1)}h`;
  };

  const unitsOf = (section) =>
    (section.sub_levels_1 || []).flatMap((level) => level.sub_levels_2 || []);

  const difficultyOf = (section) => ko(section.sub_levels_1?.[0]?.difficulty) || "";

  const difficultyGroup = (value) => {
    if (!value) return "mid";
    if (value.includes("하")) return "low";
    if (value.includes("상")) return "high";
    return "mid";
  };

  const difficultyLabel = (value) =>
    !value ? "난이도 미정" : value.replace(/\s*\([^)]*\)/g, "");

  const difficultyChipClass = (value) => {
    const group = difficultyGroup(value);
    if (group === "low") return "green";
    if (group === "high") return "purple";
    return "amber";
  };

  const sectionKeywords = (section, limit = 8) => {
    const words = [];
    unitsOf(section).forEach((unit) => {
      (unit.technical_keywords || []).forEach((keyword) => {
        if (keyword && !words.includes(keyword)) words.push(keyword);
      });
    });
    return words.slice(0, limit);
  };

  const normalize = (value) => String(value || "").toLowerCase();

  const sectionMatches = (section) => {
    const diff = difficultyOf(section);
    if (state.difficulty !== "all" && difficultyGroup(diff) !== state.difficulty) {
      return false;
    }
    if (!state.query) return true;
    const units = unitsOf(section);
    const haystack = [
      section.section_id,
      section.section_name,
      ko(section.section_goal),
      diff,
      ...sectionKeywords(section, 30),
      ...units.flatMap((unit) => [
        unit.sub_2_id,
        unit.sub_2_name,
        ko(unit.handled_contents),
        ko(unit.learning_objectives),
        ...(unit.technical_keywords || [])
      ])
    ].join(" ");
    return normalize(haystack).includes(normalize(state.query));
  };

  const currentTrack = () => state.data.tracks[state.trackIndex];
  const currentSections = () => currentTrack().sections.filter(sectionMatches);
  const findSection = (id) => {
    for (const track of state.data.tracks) {
      const section = track.sections.find((item) => item.section_id === id);
      if (section) return section;
    }
    return null;
  };

  /* ---------- stats ---------- */
  const setStats = () => {
    const tracks = state.data.tracks || [];
    const sections = tracks.flatMap((track) => track.sections || []);
    const units = sections.flatMap(unitsOf);
    const hours = sections.reduce(
      (sum, section) => sum + Number(section.recommended_hours || 0),
      0
    );
    if (els.stats.tracks) els.stats.tracks.textContent = String(tracks.length);
    if (els.stats.sections) els.stats.sections.textContent = String(sections.length);
    if (els.stats.units) els.stats.units.textContent = String(units.length);
    if (els.stats.hours) {
      els.stats.hours.textContent = Number.isInteger(hours) ? `${hours}h` : `${hours.toFixed(1)}h`;
    }
  };

  /* ---------- render: track tabs ---------- */
  const renderTabs = () => {
    if (!els.tabs) return;
    els.tabs.innerHTML = state.data.tracks
      .map((track, index) => {
        const sections = track.sections || [];
        const units = sections.flatMap(unitsOf);
        const label = track.track_id === "TRACK-01" ? "Track 1" : "Track 2";
        const active = index === state.trackIndex;
        return `
        <button class="abx-tab${active ? " is-active" : ""}" type="button" role="tab"
          data-track-index="${index}" aria-selected="${active ? "true" : "false"}">
          <strong>${escapeHtml(label)} · ${escapeHtml(track.track_name)}</strong>
          <span>${sections.length} sections · ${units.length} units</span>
        </button>`;
      })
      .join("");
  };

  /* ---------- render: section list / grid ---------- */
  const renderSectionList = () => {
    if (!els.list) return;
    const track = currentTrack();
    const sections = currentSections();
    if (els.trackTitle) els.trackTitle.textContent = track.track_name;
    if (els.visibleCount) els.visibleCount.textContent = String(sections.length);

    if (!sections.length) {
      els.list.innerHTML = `
        <div class="abx-empty">
          <strong>조건에 맞는 섹션이 없습니다.</strong>
          <span>검색어 또는 난이도 필터를 조정해 주세요.</span>
        </div>`;
      if (els.detail) els.detail.hidden = true;
      if (els.unitNav) els.unitNav.innerHTML = "";
      if (els.loading) {
        els.loading.hidden = false;
        els.loading.innerHTML =
          "<strong>선택할 섹션이 없습니다.</strong><span>필터 조건을 변경하면 상세가 다시 표시됩니다.</span>";
      }
      return;
    }

    if (!sections.some((section) => section.section_id === state.sectionId)) {
      state.sectionId = sections[0].section_id;
      state.unitIndex = 0;
    }

    els.list.innerHTML = sections
      .map((section) => {
        const diff = difficultyOf(section);
        const units = unitsOf(section);
        const current = section.section_id === state.sectionId;
        return `
        <button class="abx-section${current ? " is-active" : ""}" type="button"
          data-section-id="${escapeHtml(section.section_id)}"
          aria-current="${current ? "true" : "false"}">
          <span class="abx-section__id">${escapeHtml(section.section_id)}</span>
          <span class="abx-section__title">${escapeHtml(section.section_name)}</span>
          <span class="abx-section__meta">
            <span class="abap-chip ${difficultyChipClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
            <span class="abap-chip blue">${escapeHtml(formatHours(section.recommended_hours))}</span>
            <span class="abap-chip">${units.length} units</span>
          </span>
        </button>`;
      })
      .join("");
  };

  /* ---------- render: a single unit (accordion body content) ---------- */
  const unitBodyHtml = (unit) => {
    const metadata = unit.module_metadata || {};
    const contentSteps = koList(unit.learning_content_design);
    const cautionPoints = koList(unit.caution_points);
    const keywords = (unit.technical_keywords || []).slice(0, 8);
    return `
      <div class="abx-unit__content">
        ${ko(unit.handled_contents) ? `<p><strong>핵심 내용</strong> ${escapeHtml(ko(unit.handled_contents))}</p>` : ""}
        ${ko(unit.learning_objectives) ? `<p><strong>학습 목표</strong> ${escapeHtml(ko(unit.learning_objectives))}</p>` : ""}
        <div class="abap-keyword-row">
          ${keywords.map((kw) => `<span class="abap-chip green">${escapeHtml(kw)}</span>`).join("")}
          ${metadata.module_family ? `<span class="abap-chip">${escapeHtml(metadata.module_family)}</span>` : ""}
          ${metadata.recommended_hours ? `<span class="abap-chip blue">${escapeHtml(formatHours(metadata.recommended_hours))}</span>` : ""}
        </div>
        ${
          contentSteps.length
            ? `<div class="abx-block"><strong>수업 설계</strong><ol class="abx-steps">${contentSteps
                .slice(0, 6)
                .map((step) => `<li>${escapeHtml(step)}</li>`)
                .join("")}</ol></div>`
            : ""
        }
        ${ko(unit.hands_on_lab) ? `<div class="abx-block"><strong>실습 (Hands-on Lab)</strong><p>${escapeHtml(ko(unit.hands_on_lab))}</p></div>` : ""}
        ${
          cautionPoints.length
            ? `<div class="abx-block"><strong>주의점</strong><ul class="abx-cautions">${cautionPoints
                .slice(0, 4)
                .map((p) => `<li>${escapeHtml(p)}</li>`)
                .join("")}</ul></div>`
            : ""
        }
      </div>`;
  };

  const renderUnitAccordion = (unit, index) => {
    const open = index === 0 ? " open" : "";
    return `
      <details class="abx-unit"${open} data-unit-index="${index}">
        <summary>
          <span class="abx-unit__id">${escapeHtml(unit.sub_2_id)}</span>
          <span class="abx-unit__title">${escapeHtml(unit.sub_2_name)}</span>
        </summary>
        ${unitBodyHtml(unit)}
      </details>`;
  };

  /* ---------- render: detail header ---------- */
  const detailHeaderHtml = (section) => {
    const diff = difficultyOf(section);
    const units = unitsOf(section);
    const keywords = sectionKeywords(section, 12);
    return `
      <header class="abx-detail__header">
        <div class="abx-kicker">${escapeHtml(section.section_id)}</div>
        <h2>${escapeHtml(section.section_name)}</h2>
        ${ko(section.section_goal) ? `<p class="abx-detail__goal">${escapeHtml(ko(section.section_goal))}</p>` : ""}
        <div class="abx-detail__meta">
          <span class="abap-chip ${difficultyChipClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
          <span class="abap-chip blue">권장 ${escapeHtml(formatHours(section.recommended_hours))}</span>
          <span class="abap-chip">${units.length} learning units</span>
        </div>
        <div class="abap-keyword-row">
          ${keywords.map((kw) => `<span class="abap-chip green">${escapeHtml(kw)}</span>`).join("")}
        </div>
      </header>`;
  };

  /* ---------- render: in-detail unit TOC (focus / claude-style nav) ---------- */
  const renderUnitNav = (section) => {
    if (!els.unitNav) return;
    const units = unitsOf(section);
    els.unitNav.innerHTML =
      `<div class="abx-unitnav__head">학습 단위 ${units.length}</div>` +
      units
        .map(
          (unit, index) => `
        <button type="button" class="abx-unitnav__item${index === state.unitIndex ? " is-active" : ""}"
          data-unit-jump="${index}">
          <span class="abx-unitnav__id">${escapeHtml(unit.sub_2_id)}</span>
          <span class="abx-unitnav__title">${escapeHtml(unit.sub_2_name)}</span>
        </button>`
        )
        .join("");
  };

  /* ---------- render: detail body (layout aware) ---------- */
  const renderDetail = () => {
    if (!els.detail) return;
    const section = findSection(state.sectionId);
    if (!section) return;
    if (els.loading) els.loading.hidden = true;
    els.detail.hidden = false;

    const units = unitsOf(section);

    if (isFocus) {
      if (state.unitIndex >= units.length) state.unitIndex = 0;
      const unit = units[state.unitIndex] || {};
      els.detail.innerHTML = `
        ${detailHeaderHtml(section)}
        <div class="abx-reader">
          <div class="abx-reader__bar">
            <button type="button" class="abx-nav-btn" data-unit-step="-1" ${state.unitIndex === 0 ? "disabled" : ""}>← 이전</button>
            <span class="abx-reader__pos">${units.length ? state.unitIndex + 1 : 0} / ${units.length}</span>
            <button type="button" class="abx-nav-btn" data-unit-step="1" ${state.unitIndex >= units.length - 1 ? "disabled" : ""}>다음 →</button>
          </div>
          <article class="abx-reader__unit">
            <div class="abx-unit__id">${escapeHtml(unit.sub_2_id || "")}</div>
            <h3>${escapeHtml(unit.sub_2_name || "")}</h3>
            ${unitBodyHtml(unit)}
          </article>
        </div>`;
      renderUnitNav(section);
      return;
    }

    // studio / library / dashboard : header + accordion of all units
    els.detail.innerHTML = `
      ${detailHeaderHtml(section)}
      <div class="abx-detail__body">
        <section class="abx-subsection">
          <h3>하위 학습 단위</h3>
          <div class="abx-unit-list">
            ${units.map((unit, index) => renderUnitAccordion(unit, index)).join("")}
          </div>
        </section>
      </div>`;
    renderUnitNav(section);
  };

  /* ---------- hash deep-link ---------- */
  const updateHash = () => {
    if (!state.sectionId) return;
    history.replaceState(null, "", `#${encodeURIComponent(state.sectionId)}`);
  };

  const render = ({ keepHash = false } = {}) => {
    renderTabs();
    renderSectionList();
    renderDetail();
    if (!keepHash) updateHash();
  };

  const selectSection = (sectionId) => {
    const trackIndex = state.data.tracks.findIndex((track) =>
      track.sections.some((section) => section.section_id === sectionId)
    );
    if (trackIndex >= 0) state.trackIndex = trackIndex;
    state.sectionId = sectionId;
    state.unitIndex = 0;
    render();
  };

  const initFromHash = () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id) return false;
    const trackIndex = state.data.tracks.findIndex((track) =>
      track.sections.some((section) => section.section_id === id)
    );
    if (trackIndex < 0) return false;
    state.trackIndex = trackIndex;
    state.sectionId = id;
    return true;
  };

  /* ---------- events ---------- */
  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-track-index]");
    if (tab) {
      state.trackIndex = Number(tab.dataset.trackIndex || 0);
      const first = currentSections()[0] || currentTrack().sections[0];
      state.sectionId = first ? first.section_id : "";
      state.unitIndex = 0;
      render();
      // mobile: reveal detail pane
      root.classList.remove("abx-show-detail");
      return;
    }

    const sectionButton = event.target.closest("[data-section-id]");
    if (sectionButton) {
      selectSection(sectionButton.dataset.sectionId);
      root.classList.add("abx-show-detail"); // mobile push
      return;
    }

    const jump = event.target.closest("[data-unit-jump]");
    if (jump) {
      state.unitIndex = Number(jump.dataset.unitJump || 0);
      if (isFocus) {
        renderDetail();
      } else {
        // open the corresponding accordion and scroll to it
        const target = els.detail.querySelector(`details[data-unit-index="${state.unitIndex}"]`);
        if (target) {
          target.open = true;
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          renderUnitNav(findSection(state.sectionId));
        }
      }
      return;
    }

    const step = event.target.closest("[data-unit-step]");
    if (step) {
      state.unitIndex += Number(step.dataset.unitStep || 0);
      if (state.unitIndex < 0) state.unitIndex = 0;
      renderDetail();
      return;
    }

    const back = event.target.closest("[data-back]");
    if (back) {
      root.classList.remove("abx-show-detail");
    }
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
    if (id && findSection(id)) selectSection(id);
  });

  /* ---------- data loading: inline first, then fetch ---------- */
  const showError = (message) => {
    if (!els.loading) return;
    els.loading.hidden = false;
    els.loading.classList.add("abx-error");
    els.loading.innerHTML = `
      <strong>커리큘럼 데이터를 불러오지 못했습니다.</strong>
      <span>${escapeHtml(message)}</span>`;
  };

  const boot = (data) => {
    state.data = data;
    setStats();
    if (!initFromHash()) {
      state.sectionId = data.tracks?.[0]?.sections?.[0]?.section_id || "";
    }
    render({ keepHash: Boolean(location.hash) });
  };

  const inlineEl = document.querySelector('script[type="application/json"][data-curriculum-data]');
  if (inlineEl && inlineEl.textContent.trim()) {
    try {
      boot(JSON.parse(inlineEl.textContent));
    } catch (error) {
      showError("인라인 JSON 파싱 오류: " + error.message);
    }
  } else {
    fetch(DEFAULT_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(boot)
      .catch((error) =>
        showError(
          error.message +
            " · file://로 직접 열었다면 인라인 데이터 버전을 사용하거나 로컬 서버에서 확인해 주세요."
        )
      );
  }
})();
