(function () {
  "use strict";

  const DATA_URL = "../../reference/abap_curriculum_v5_3_20260602_010000.json";
  const root = document.querySelector("[data-abap-curriculum-root]");
  if (!root) return;

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

  collapseGlobalDocNav();
  window.addEventListener("DOMContentLoaded", () => setTimeout(collapseGlobalDocNav, 0));
  window.addEventListener("load", () => setTimeout(collapseGlobalDocNav, 0));

  const els = {
    tabs: root.querySelector("[data-track-tabs]"),
    list: root.querySelector("[data-section-list]"),
    detail: root.querySelector("[data-section-detail]"),
    loading: root.querySelector("[data-loading-state]"),
    trackTitle: root.querySelector("[data-current-track-title]"),
    visibleCount: root.querySelector("[data-visible-count]"),
    search: root.querySelector("[data-curriculum-search]"),
    difficulty: root.querySelector("[data-curriculum-difficulty]"),
    stats: {
      tracks: root.querySelector("[data-stat='tracks']"),
      sections: root.querySelector("[data-stat='sections']"),
      units: root.querySelector("[data-stat='units']"),
      hours: root.querySelector("[data-stat='hours']")
    }
  };

  const state = {
    data: null,
    trackIndex: 0,
    sectionId: "",
    query: "",
    difficulty: "all"
  };

  const escapeHtml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const ko = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.ko || value.en || "";
  };

  const formatHours = (value) => {
    const num = Number(value || 0);
    if (!num) return "-";
    return Number.isInteger(num) ? `${num}h` : `${num.toFixed(1)}h`;
  };

  const unitsOf = (section) => (section.sub_levels_1 || [])
    .flatMap((level) => level.sub_levels_2 || []);

  const difficultyOf = (section) => ko(section.sub_levels_1?.[0]?.difficulty) || "";

  const difficultyGroup = (value) => {
    if (!value) return "mid";
    if (value.includes("하")) return "low";
    if (value.includes("상")) return "high";
    return "mid";
  };

  const difficultyLabel = (value) => {
    if (!value) return "난이도 미정";
    return value.replace(/\s*\([^)]*\)/g, "");
  };

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
      ...sectionKeywords(section, 20),
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

  const setStats = () => {
    const tracks = state.data.tracks || [];
    const sections = tracks.flatMap((track) => track.sections || []);
    const units = sections.flatMap(unitsOf);
    const hours = sections.reduce((sum, section) => sum + Number(section.recommended_hours || 0), 0);
    els.stats.tracks.textContent = String(tracks.length);
    els.stats.sections.textContent = String(sections.length);
    els.stats.units.textContent = String(units.length);
    els.stats.hours.textContent = Number.isInteger(hours) ? `${hours}h` : `${hours.toFixed(1)}h`;
  };

  const renderTabs = () => {
    els.tabs.innerHTML = state.data.tracks.map((track, index) => {
      const sections = track.sections || [];
      const units = sections.flatMap(unitsOf);
      const label = track.track_id === "TRACK-01" ? "Track 1" : "Track 2";
      return `
        <button class="abap-track-tab" type="button" role="tab" data-track-index="${index}" aria-selected="${index === state.trackIndex ? "true" : "false"}">
          <strong>${escapeHtml(label)} · ${escapeHtml(track.track_name)}</strong>
          <span>${sections.length} sections · ${units.length} learning units</span>
        </button>
      `;
    }).join("");
  };

  const renderSectionList = () => {
    const track = currentTrack();
    const sections = currentSections();
    els.trackTitle.textContent = track.track_name;
    els.visibleCount.textContent = String(sections.length);

    if (!sections.length) {
      els.list.innerHTML = `
        <div class="abap-empty">
          <strong>조건에 맞는 섹션이 없습니다.</strong>
          <span>검색어 또는 난이도 필터를 조정해 주세요.</span>
        </div>
      `;
      els.detail.hidden = true;
      els.loading.hidden = false;
      els.loading.innerHTML = "<strong>선택할 섹션이 없습니다.</strong><span>필터 조건을 변경하면 상세가 다시 표시됩니다.</span>";
      return;
    }

    if (!sections.some((section) => section.section_id === state.sectionId)) {
      state.sectionId = sections[0].section_id;
    }

    els.list.innerHTML = sections.map((section) => {
      const diff = difficultyOf(section);
      const units = unitsOf(section);
      return `
        <button class="abap-section-button" type="button" data-section-id="${escapeHtml(section.section_id)}" aria-current="${section.section_id === state.sectionId ? "true" : "false"}">
          <span class="abap-section-id">${escapeHtml(section.section_id)}</span>
          <span class="abap-section-title">${escapeHtml(section.section_name)}</span>
          <span class="abap-section-meta">
            <span class="abap-chip ${difficultyChipClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
            <span class="abap-chip blue">${escapeHtml(formatHours(section.recommended_hours))}</span>
            <span class="abap-chip">${units.length} units</span>
          </span>
        </button>
      `;
    }).join("");
  };

  const renderDetail = () => {
    const section = findSection(state.sectionId);
    if (!section) return;

    const diff = difficultyOf(section);
    const units = unitsOf(section);
    const keywords = sectionKeywords(section, 12);
    const firstLevel = section.sub_levels_1?.[0];

    els.loading.hidden = true;
    els.detail.hidden = false;
    els.detail.innerHTML = `
      <header class="abap-detail-header">
        <div class="abap-kicker">${escapeHtml(section.section_id)}</div>
        <h2>${escapeHtml(section.section_name)}</h2>
        <p class="abap-detail-goal">${escapeHtml(ko(section.section_goal))}</p>
        <div class="abap-detail-meta">
          <span class="abap-chip ${difficultyChipClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
          <span class="abap-chip blue">권장 ${escapeHtml(formatHours(section.recommended_hours))}</span>
          <span class="abap-chip">${units.length} learning units</span>
          ${firstLevel ? `<span class="abap-chip">${escapeHtml(firstLevel.sub_1_id)}</span>` : ""}
        </div>
        <div class="abap-keyword-row">
          ${keywords.map((keyword) => `<span class="abap-chip green">${escapeHtml(keyword)}</span>`).join("")}
        </div>
      </header>
      <div class="abap-detail-body">
        <section class="abap-subsection">
          <h3>하위 학습 단위</h3>
          <div class="abap-unit-list">
            ${units.map((unit, index) => renderUnit(unit, index)).join("")}
          </div>
        </section>
      </div>
    `;
  };

  const renderUnit = (unit, index) => {
    const metadata = unit.module_metadata || {};
    const contentSteps = ko(unit.learning_content_design) || [];
    const cautionPoints = ko(unit.caution_points) || [];
    const keywords = (unit.technical_keywords || []).slice(0, 6);
    const open = index === 0 ? " open" : "";
    return `
      <details class="abap-unit"${open}>
        <summary>
          <span class="abap-unit-id">${escapeHtml(unit.sub_2_id)}</span>
          <span class="abap-unit-title">${escapeHtml(unit.sub_2_name)}</span>
        </summary>
        <div class="abap-unit-content">
          <p><strong>핵심 내용</strong> ${escapeHtml(ko(unit.handled_contents))}</p>
          <p><strong>학습 목표</strong> ${escapeHtml(ko(unit.learning_objectives))}</p>
          <div class="abap-keyword-row">
            ${keywords.map((keyword) => `<span class="abap-chip green">${escapeHtml(keyword)}</span>`).join("")}
            ${metadata.module_family ? `<span class="abap-chip">${escapeHtml(metadata.module_family)}</span>` : ""}
            ${metadata.recommended_hours ? `<span class="abap-chip blue">${escapeHtml(formatHours(metadata.recommended_hours))}</span>` : ""}
          </div>
          ${Array.isArray(contentSteps) && contentSteps.length ? `
            <div>
              <strong>수업 설계</strong>
              <ol class="abap-step-list">
                ${contentSteps.slice(0, 5).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
              </ol>
            </div>
          ` : ""}
          ${ko(unit.hands_on_lab) ? `<p><strong>실습</strong> ${escapeHtml(ko(unit.hands_on_lab))}</p>` : ""}
          ${Array.isArray(cautionPoints) && cautionPoints.length ? `
            <div>
              <strong>주의점</strong>
              <ul class="abap-caution-list">
                ${cautionPoints.slice(0, 3).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
        </div>
      </details>
    `;
  };

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

  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-track-index]");
    if (tab) {
      state.trackIndex = Number(tab.dataset.trackIndex || 0);
      const first = currentSections()[0] || currentTrack().sections[0];
      state.sectionId = first?.section_id || "";
      render();
      return;
    }

    const sectionButton = event.target.closest("[data-section-id]");
    if (sectionButton) {
      selectSection(sectionButton.dataset.sectionId);
    }
  });

  els.search.addEventListener("input", () => {
    state.query = els.search.value.trim();
    render({ keepHash: true });
  });

  els.difficulty.addEventListener("change", () => {
    state.difficulty = els.difficulty.value;
    render({ keepHash: true });
  });

  window.addEventListener("hashchange", () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (id && findSection(id)) selectSection(id);
  });

  fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      state.data = data;
      setStats();
      if (!initFromHash()) {
        state.sectionId = data.tracks?.[0]?.sections?.[0]?.section_id || "";
      }
      render({ keepHash: Boolean(location.hash) });
    })
    .catch((error) => {
      els.loading.classList.add("abap-error");
      els.loading.innerHTML = `
        <strong>커리큘럼 데이터를 불러오지 못했습니다.</strong>
        <span>${escapeHtml(error.message)} · 로컬 파일 직접 열기보다 개발 서버 또는 GitHub Pages에서 확인해 주세요.</span>
      `;
    });
})();
