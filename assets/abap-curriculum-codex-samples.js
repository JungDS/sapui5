(function () {
  "use strict";

  const DATA_URL = "../../reference/abap_curriculum_v5_3_20260602_010000.json";
  const roots = Array.from(document.querySelectorAll("[data-cur-sample]"));
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
    if (group === "low") return "cur-chip--green";
    if (group === "high") return "cur-chip--purple";
    return "cur-chip--amber";
  };
  const normalize = (value) => String(value || "").toLowerCase();

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
  collapseGlobalDocNav();
  window.addEventListener("DOMContentLoaded", () => setTimeout(collapseGlobalDocNav, 0));
  window.addEventListener("load", () => setTimeout(collapseGlobalDocNav, 0));

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

  function renderTermButton(term) {
    return `<button class="cur-chip cur-chip--green cur-term" type="button" data-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`;
  }

  function initSample(root, data, termIndex) {
    const variant = root.dataset.curVariant || "clean";
    const state = {
      trackIndex: 0,
      sectionId: "",
      query: "",
      difficulty: "all"
    };

    root.innerHTML = renderShell(root, data, variant);

    const els = {
      tabs: root.querySelector("[data-cur-tabs]"),
      list: root.querySelector("[data-cur-list]"),
      detail: root.querySelector("[data-cur-detail]"),
      nav: root.querySelector("[data-cur-nav]"),
      trackTitle: root.querySelector("[data-cur-track-title]"),
      count: root.querySelector("[data-cur-count]"),
      search: root.querySelector("[data-cur-search]"),
      difficulty: root.querySelector("[data-cur-difficulty]")
    };

    const currentTrack = () => data.tracks[state.trackIndex];
    const findSection = (id) => {
      for (const track of data.tracks) {
        const section = track.sections.find((item) => item.section_id === id);
        if (section) return section;
      }
      return null;
    };
    const sectionMatches = (section) => {
      const diff = difficultyOf(section);
      if (state.difficulty !== "all" && difficultyGroup(diff) !== state.difficulty) return false;
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
    const currentSections = () => currentTrack().sections.filter(sectionMatches);

    const render = ({ keepHash = false } = {}) => {
      renderTabs(els.tabs, data, state);
      renderList(els, currentTrack(), currentSections(), state);
      const selected = findSection(state.sectionId);
      renderDetail(els, selected, variant);
      if (!keepHash && selected) {
        history.replaceState(null, "", `#${encodeURIComponent(selected.section_id)}`);
      }
    };

    const setSection = (sectionId) => {
      const trackIndex = data.tracks.findIndex((track) =>
        track.sections.some((section) => section.section_id === sectionId)
      );
      if (trackIndex >= 0) state.trackIndex = trackIndex;
      state.sectionId = sectionId;
      render();
    };

    const hashId = decodeURIComponent(location.hash.replace(/^#/, ""));
    const hashSection = hashId ? findSection(hashId) : null;
    if (hashSection) {
      state.trackIndex = data.tracks.findIndex((track) =>
        track.sections.some((section) => section.section_id === hashSection.section_id)
      );
      state.sectionId = hashSection.section_id;
    } else {
      state.sectionId = data.tracks[0]?.sections[0]?.section_id || "";
    }

    root.addEventListener("click", (event) => {
      const trackButton = event.target.closest("[data-track-index]");
      if (trackButton) {
        state.trackIndex = Number(trackButton.dataset.trackIndex || 0);
        const first = currentSections()[0] || currentTrack().sections[0];
        state.sectionId = first?.section_id || "";
        render();
        return;
      }

      const sectionButton = event.target.closest("[data-section-id]");
      if (sectionButton) {
        setSection(sectionButton.dataset.sectionId);
        return;
      }

      const termButton = event.target.closest("[data-term]");
      if (termButton) {
        openTermModal(termButton.dataset.term, termIndex);
      }
    });

    if (els.search) {
      els.search.addEventListener("input", () => {
        state.query = els.search.value.trim();
        const first = currentSections()[0];
        if (first && !currentSections().some((section) => section.section_id === state.sectionId)) {
          state.sectionId = first.section_id;
        }
        render({ keepHash: true });
      });
    }

    if (els.difficulty) {
      els.difficulty.addEventListener("change", () => {
        state.difficulty = els.difficulty.value;
        const first = currentSections()[0];
        if (first && !currentSections().some((section) => section.section_id === state.sectionId)) {
          state.sectionId = first.section_id;
        }
        render({ keepHash: true });
      });
    }

    window.addEventListener("hashchange", () => {
      const id = decodeURIComponent(location.hash.replace(/^#/, ""));
      if (id && findSection(id)) setSection(id);
    });

    render({ keepHash: Boolean(hashSection) });
  }

  function renderShell(root, data, variant) {
    const sections = data.tracks.flatMap((track) => track.sections || []);
    const units = sections.flatMap(unitsOf);
    const hours = sections.reduce((sum, section) => sum + Number(section.recommended_hours || 0), 0);
    const showControls = variant !== "clean";
    const showSideNav = variant === "rich";
    return `
      <div class="cur-shell">
        <section class="cur-hero">
          <div>
            <div class="cur-breadcrumb">
              <a href="../../index.html">홈</a><span>›</span>
              <a href="../../pages/roadmap.html">로드맵 / 학습전략</a><span>›</span>
              <span>${escapeHtml(root.dataset.curTitle)}</span>
            </div>
            <div class="cur-kicker">ABAP Curriculum Codex v1</div>
            <h1>${escapeHtml(root.dataset.curTitle)}</h1>
            <p>${escapeHtml(root.dataset.curSubtitle)}</p>
          </div>
          <div class="cur-stats" aria-label="커리큘럼 요약">
            <div class="cur-stat"><strong>${data.tracks.length}</strong><span>Tracks</span></div>
            <div class="cur-stat"><strong>${sections.length}</strong><span>Sections</span></div>
            <div class="cur-stat"><strong>${units.length}</strong><span>Learning Units</span></div>
            <div class="cur-stat"><strong>${formatHours(hours)}</strong><span>Recommended Hours</span></div>
          </div>
        </section>

        ${showControls ? `
          <section class="cur-controls" aria-label="커리큘럼 검색과 필터">
            <div>
              <div class="cur-kicker">Explorer Controls</div>
              <h2>검색과 필터로 필요한 주제를 빠르게 좁힙니다</h2>
            </div>
            <div class="cur-tools">
              <label class="cur-field">
                <span>검색</span>
                <input type="search" data-cur-search placeholder="예: ALV, CDS, RAP, DDIC" autocomplete="off" />
              </label>
              <label class="cur-field">
                <span>난이도</span>
                <select data-cur-difficulty>
                  <option value="all">전체</option>
                  <option value="low">하</option>
                  <option value="mid">중</option>
                  <option value="high">상</option>
                </select>
              </label>
            </div>
          </section>
        ` : ""}

        <section class="cur-track-tabs" data-cur-tabs aria-label="트랙 선택"></section>
        <section class="cur-master-detail" aria-label="커리큘럼 마스터 상세">
          <aside class="cur-list-panel" aria-label="섹션 목록">
            <div class="cur-list-head">
              <div>
                <div class="cur-kicker">Section List</div>
                <h2 data-cur-track-title></h2>
              </div>
              <span class="cur-count" data-cur-count>0</span>
            </div>
            <div class="cur-section-list" data-cur-list></div>
          </aside>
          <article class="cur-detail-panel" data-cur-detail></article>
          ${showSideNav ? `<aside class="cur-nav-panel" data-cur-nav aria-label="상세 Navigation"></aside>` : ""}
        </section>
      </div>
    `;
  }

  function renderTabs(container, data, state) {
    container.innerHTML = data.tracks.map((track, index) => {
      const sections = track.sections || [];
      const units = sections.flatMap(unitsOf);
      const label = track.track_id === "TRACK-01" ? "Track 1" : "Track 2";
      return `
        <button class="cur-track-tab" type="button" data-track-index="${index}" aria-selected="${index === state.trackIndex ? "true" : "false"}">
          <strong>${escapeHtml(label)} · ${escapeHtml(track.track_name)}</strong>
          <span>${sections.length} sections · ${units.length} learning units</span>
        </button>
      `;
    }).join("");
  }

  function renderList(els, track, sections, state) {
    els.trackTitle.textContent = track.track_name;
    els.count.textContent = String(sections.length);
    if (!sections.length) {
      els.list.innerHTML = `<div class="cur-empty"><div><strong>조건에 맞는 섹션이 없습니다.</strong><span>검색어나 난이도 필터를 조정해 주세요.</span></div></div>`;
      return;
    }
    if (!sections.some((section) => section.section_id === state.sectionId)) {
      state.sectionId = sections[0].section_id;
    }
    els.list.innerHTML = sections.map((section) => {
      const diff = difficultyOf(section);
      return `
        <button class="cur-section-btn" type="button" data-section-id="${escapeHtml(section.section_id)}" aria-current="${section.section_id === state.sectionId ? "true" : "false"}">
          <span class="cur-section-id">${escapeHtml(section.section_id)}</span>
          <span class="cur-section-title">${escapeHtml(section.section_name)}</span>
          <span class="cur-chip-row">
            <span class="cur-chip ${difficultyClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
            <span class="cur-chip cur-chip--blue">${escapeHtml(formatHours(section.recommended_hours))}</span>
            <span class="cur-chip">${unitsOf(section).length} units</span>
          </span>
        </button>
      `;
    }).join("");
  }

  function renderDetail(els, section, variant) {
    if (!section) {
      els.detail.innerHTML = `<div class="cur-empty"><div><strong>표시할 섹션이 없습니다.</strong><span>조건을 변경해 주세요.</span></div></div>`;
      if (els.nav) els.nav.innerHTML = "";
      return;
    }

    const units = unitsOf(section);
    const diff = difficultyOf(section);
    const keywords = sectionKeywords(section, variant === "clean" ? 8 : 14);
    const firstLevel = section.sub_levels_1?.[0];
    const unitList = units.map((unit, index) => renderUnit(unit, index, variant)).join("");
    const miniNav = renderMiniNav(section, units);

    els.detail.innerHTML = `
      <header class="cur-detail-header">
        <div class="cur-kicker">${escapeHtml(section.section_id)}</div>
        <h2>${escapeHtml(section.section_name)}</h2>
        <p class="cur-detail-goal">${escapeHtml(ko(section.section_goal))}</p>
        <div class="cur-chip-row" style="margin-top:14px">
          <span class="cur-chip ${difficultyClass(diff)}">${escapeHtml(difficultyLabel(diff))}</span>
          <span class="cur-chip cur-chip--blue">권장 ${escapeHtml(formatHours(section.recommended_hours))}</span>
          <span class="cur-chip">${units.length} learning units</span>
          ${firstLevel ? `<span class="cur-chip">${escapeHtml(firstLevel.sub_1_id)}</span>` : ""}
        </div>
        <div class="cur-chip-row" style="margin-top:12px">
          ${keywords.map(renderTermButton).join("")}
        </div>
      </header>
      <div class="cur-detail-body">
        <div>
          <div class="cur-kicker" style="margin-bottom:10px">Learning Units</div>
          <div class="cur-unit-list">${unitList}</div>
        </div>
        ${variant === "hybrid" ? `<aside class="cur-nav-panel">${miniNav}</aside>` : ""}
      </div>
    `;

    if (els.nav) els.nav.innerHTML = miniNav;
  }

  function renderMiniNav(section, units) {
    return `
      <h2>현재 섹션 Navigation</h2>
      <div class="cur-mini-nav">
        <a href="#${encodeURIComponent(section.section_id)}">${escapeHtml(section.section_id)} · ${escapeHtml(section.section_name)}</a>
        ${units.slice(0, 12).map((unit) => `<a href="#${encodeURIComponent(section.section_id)}">${escapeHtml(unit.sub_2_id)} · ${escapeHtml(unit.sub_2_name)}</a>`).join("")}
      </div>
    `;
  }

  function renderUnit(unit, index, variant) {
    const metadata = unit.module_metadata || {};
    const steps = ko(unit.learning_content_design);
    const cautions = ko(unit.caution_points);
    const keywords = (unit.technical_keywords || []).slice(0, variant === "clean" ? 4 : 7);
    const isOpen = variant !== "clean" && index === 0;
    return `
      <details class="cur-unit"${isOpen ? " open" : ""}>
        <summary>
          <span class="cur-unit-id">${escapeHtml(unit.sub_2_id)}</span>
          <span class="cur-unit-title">${escapeHtml(unit.sub_2_name)}</span>
        </summary>
        <div class="cur-unit-body">
          <p><strong>핵심 내용</strong> ${escapeHtml(ko(unit.handled_contents))}</p>
          ${variant !== "clean" ? `<p><strong>학습 목표</strong> ${escapeHtml(ko(unit.learning_objectives))}</p>` : ""}
          <div class="cur-chip-row">
            ${keywords.map(renderTermButton).join("")}
            ${metadata.module_family ? `<span class="cur-chip">${escapeHtml(metadata.module_family)}</span>` : ""}
            ${metadata.recommended_hours ? `<span class="cur-chip cur-chip--blue">${escapeHtml(formatHours(metadata.recommended_hours))}</span>` : ""}
          </div>
          ${variant !== "clean" && Array.isArray(steps) && steps.length ? `
            <div>
              <div class="cur-block-title">수업 설계</div>
              <ol>${steps.slice(0, 5).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
            </div>
          ` : ""}
          ${variant !== "clean" && ko(unit.hands_on_lab) ? `<p><strong>Hands-on Lab</strong> ${escapeHtml(ko(unit.hands_on_lab))}</p>` : ""}
          ${variant === "rich" && Array.isArray(cautions) && cautions.length ? `
            <div>
              <div class="cur-block-title">주의점</div>
              <ul>${cautions.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
          ` : ""}
        </div>
      </details>
    `;
  }

  function openTermModal(term, termIndex) {
    const entry = termIndex.get(term) || { keyword: term };
    const old = document.querySelector(".cur-modal");
    if (old) old.remove();
    const modal = document.createElement("div");
    modal.className = "cur-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="cur-modal__card">
        <div class="cur-modal__head">
          <h2>${escapeHtml(entry.keyword)}</h2>
          <button class="cur-modal__close" type="button" aria-label="닫기">×</button>
        </div>
        <div class="cur-modal__body">
          ${entry.description ? `<p><strong>관련 설명</strong> ${escapeHtml(entry.description)}</p>` : `<p>이 용어는 현재 커리큘럼의 기술 키워드로 사용됩니다.</p>`}
          ${entry.sectionId ? `<p><strong>연결 섹션</strong> ${escapeHtml(entry.sectionId)} · ${escapeHtml(entry.sectionName)}</p>` : ""}
          ${entry.unitName ? `<p><strong>대표 학습 단위</strong> ${escapeHtml(entry.unitName)}</p>` : ""}
          ${entry.objective ? `<p><strong>학습 맥락</strong> ${escapeHtml(entry.objective).slice(0, 420)}${entry.objective.length > 420 ? "..." : ""}</p>` : ""}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector(".cur-modal__close").focus();
    const close = () => modal.remove();
    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest(".cur-modal__close")) close();
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
      roots.forEach((root) => initSample(root, data, termIndex));
    })
    .catch((error) => {
      roots.forEach((root) => {
        root.innerHTML = `<div class="cur-empty"><div><strong>커리큘럼 데이터를 불러오지 못했습니다.</strong><span>${escapeHtml(error.message)} · 로컬 서버 또는 GitHub Pages에서 확인해 주세요.</span></div></div>`;
      });
    });
})();
