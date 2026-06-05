// ABAP 커리큘럼 운영 탐색기 | 최종수정 2026-06-05 00:00 KST | v1.2
(function () {
  "use strict";

  var root = document.querySelector("[data-abap-curriculum-root]");
  if (!root) return;

  var DATA_URL = root.getAttribute("data-curriculum-src") ||
    "../../reference/abap_curriculum_v5_4_20260605_000000.json";
  var DETAIL_HREF = "abap-curriculum-section-detail.html";

  var state = {
    data: null,
    trackIndex: 0,
    sectionId: "",
    lessonId: "",
    query: "",
    difficulty: "all",
    style: "professional",
    isFullscreen: false,
    pendingFullscreenLessonId: ""
  };
  var scrollSpyFrame = 0;

  var escapeHtml = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  var ko = function (value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value;
    return value.ko || value.en || "";
  };

  var koList = function (value) {
    var v = ko(value);
    if (Array.isArray(v)) return v.filter(Boolean);
    return v ? [v] : [];
  };

  var formatHours = function (value) {
    var num = Number(value || 0);
    if (!num) return "-";
    return Number.isInteger(num) ? num + "h" : num.toFixed(1) + "h";
  };

  var unitsOf = function (section) {
    return (section.sub_levels_1 || []).reduce(function (acc, level) {
      return acc.concat(level.sub_levels_2 || []);
    }, []);
  };

  var difficultyOf = function (section) {
    return ko(section.sub_levels_1 && section.sub_levels_1[0] && section.sub_levels_1[0].difficulty) || "";
  };

  var difficultyGroup = function (value) {
    if (!value) return "mid";
    if (value.indexOf("하") >= 0) return "low";
    if (value.indexOf("상") >= 0) return "high";
    return "mid";
  };

  var difficultyLabel = function (value) {
    return (value || "난이도 미정").replace(/\s*\([^)]*\)/g, "");
  };

  var chipClass = function (value) {
    var group = difficultyGroup(value);
    if (group === "low") return "green";
    if (group === "high") return "purple";
    return "amber";
  };

  var sectionNumber = function (id) {
    var match = String(id || "").match(/-(\d+)\s*$/);
    return match ? parseInt(match[1], 10) : null;
  };

  var unitNumbers = function (id) {
    var match = String(id || "").match(/-(\d+)-M(\d+)/i);
    return match ? { chapter: parseInt(match[1], 10), lesson: parseInt(match[2], 10) } : null;
  };

  var chapterLabel = function (id) {
    var n = sectionNumber(id);
    return n == null ? String(id || "") : "Chapter " + n;
  };

  var lessonLabel = function (id) {
    var n = unitNumbers(id);
    return n ? "Lesson " + n.lesson : String(id || "");
  };

  var normalize = function (value) {
    return String(value || "").toLowerCase();
  };

  var collapseGlobalDocNav = function () {
    var side = document.querySelector(".stage7-doc-side-nav");
    var button = document.querySelector(".stage7-doc-nav-toggle");
    if (!side && !button) return;
    document.body.classList.add("stage7-doc-nav-collapsed");
    if (side) side.setAttribute("aria-hidden", "true");
    if (button) button.setAttribute("aria-expanded", "false");
  };

  var safeSelectorId = function (id) {
    return window.CSS && CSS.escape ? CSS.escape(id) : String(id).replace(/"/g, "\\\"");
  };

  function friendlyContent(unit) {
    return ko(unit.learning_friendly && unit.learning_friendly.handled_contents) ||
      ko(unit.handled_contents);
  }

  function selectedContent(unit) {
    return state.style === "friendly" ? friendlyContent(unit) : ko(unit.handled_contents);
  }

  function currentTrack() {
    return state.data.tracks[state.trackIndex] || state.data.tracks[0];
  }

  function findSection(id) {
    for (var t = 0; t < state.data.tracks.length; t += 1) {
      var sections = state.data.tracks[t].sections || [];
      for (var s = 0; s < sections.length; s += 1) {
        if (sections[s].section_id === id) return { section: sections[s], trackIndex: t };
      }
    }
    return null;
  }

  function currentSection() {
    return findSection(state.sectionId) || { section: currentSections()[0], trackIndex: state.trackIndex };
  }

  function currentLesson(section) {
    var units = unitsOf(section || {});
    return units.find(function (unit) { return unit.sub_2_id === state.lessonId; }) || units[0];
  }

  function findLesson(id) {
    for (var t = 0; t < state.data.tracks.length; t += 1) {
      var sections = state.data.tracks[t].sections || [];
      for (var s = 0; s < sections.length; s += 1) {
        var units = unitsOf(sections[s]);
        for (var u = 0; u < units.length; u += 1) {
          if (units[u].sub_2_id === id) {
            return { lesson: units[u], section: sections[s], trackIndex: t };
          }
        }
      }
    }
    return null;
  }

  function sectionKeywords(section, limit) {
    var words = [];
    unitsOf(section).forEach(function (unit) {
      (unit.technical_keywords || []).forEach(function (word) {
        if (word && words.indexOf(word) < 0) words.push(word);
      });
    });
    return words.slice(0, limit || 12);
  }

  function matchesSection(section) {
    var diff = difficultyOf(section);
    if (state.difficulty !== "all" && difficultyGroup(diff) !== state.difficulty) return false;
    if (!state.query) return true;
    var units = unitsOf(section);
    var haystack = [
      section.section_id,
      section.section_name,
      ko(section.section_goal),
      diff,
      sectionKeywords(section, 40).join(" "),
      units.map(function (unit) {
        return [
          unit.sub_2_id,
          unit.sub_2_name,
          ko(unit.handled_contents),
          friendlyContent(unit),
          ko(unit.learning_objectives),
          (unit.technical_keywords || []).join(" ")
        ].join(" ");
      }).join(" ")
    ].join(" ");
    return normalize(haystack).indexOf(normalize(state.query)) >= 0;
  }

  function currentSections() {
    return (currentTrack().sections || []).filter(matchesSection);
  }

  function getStats() {
    var tracks = state.data.tracks || [];
    var sections = tracks.reduce(function (acc, track) { return acc.concat(track.sections || []); }, []);
    var units = sections.reduce(function (acc, section) { return acc.concat(unitsOf(section)); }, []);
    var hours = sections.reduce(function (sum, section) {
      return sum + Number(section.recommended_hours || 0);
    }, 0);
    return { tracks: tracks.length, sections: sections.length, units: units.length, hours: hours };
  }

  function renderShell() {
    var stats = getStats();
    root.innerHTML =
      '<div class="abc-wrap">' +
        '<header class="abc-hero" data-prose="summary">' +
          '<div class="abc-eyebrow">ABAP Enterprise Curriculum</div>' +
          '<h1>ABAP 엔터프라이즈 커리큘럼</h1>' +
          '<p>개발 이론과 실무 역량을 두 Track으로 나누어, Chapter와 Lesson 단위로 ABAP 학습 흐름을 탐색합니다. 같은 Lesson도 전문적인 표현과 쉬운 문장으로 바꾸어 읽을 수 있습니다.</p>' +
          '<div class="abc-stats">' +
            '<span class="abc-stat">Tracks <strong>' + stats.tracks + '</strong></span>' +
            '<span class="abc-stat">Chapters <strong>' + stats.sections + '</strong></span>' +
            '<span class="abc-stat">Lessons <strong>' + stats.units + '</strong></span>' +
            '<span class="abc-stat">Hours <strong>' + escapeHtml(formatHours(stats.hours)) + '</strong></span>' +
          '</div>' +
        '</header>' +
        '<section class="abc-top" aria-label="커리큘럼 탐색 도구">' +
          '<div class="abc-tabs" data-abc-tabs></div>' +
          '<div class="abc-tools">' +
            '<input class="abc-search" data-abc-search type="search" placeholder="Chapter, Lesson, 키워드 검색" aria-label="커리큘럼 검색" />' +
            '<select class="abc-select" data-abc-difficulty aria-label="난이도 필터">' +
              '<option value="all">전체 난이도</option>' +
              '<option value="low">하</option>' +
              '<option value="mid">중</option>' +
              '<option value="high">상</option>' +
            '</select>' +
            '<div class="abc-style-toggle" aria-label="사용자별 학습친화 스타일 제공">' +
              '<button class="abc-style-btn" type="button" data-abc-style="professional">전문</button>' +
              '<button class="abc-style-btn" type="button" data-abc-style="friendly">쉬운 문장</button>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<div class="abc-grid">' +
          '<aside class="abc-panel abc-chapter-panel">' +
            '<div class="abc-panel-head"><strong data-abc-track-title>Track</strong><span data-abc-visible-count>0 Chapters</span></div>' +
            '<div class="abc-list" data-abc-section-list></div>' +
          '</aside>' +
          '<aside class="abc-panel abc-lesson-panel">' +
            '<div class="abc-panel-head"><strong>Lesson</strong><span data-abc-lesson-count>0 Lessons</span></div>' +
            '<div class="abc-list" data-abc-lesson-list></div>' +
          '</aside>' +
          '<section class="abc-panel abc-content" data-abc-content></section>' +
        '</div>' +
      '</div>';
  }

  function renderTabs() {
    var container = root.querySelector("[data-abc-tabs]");
    if (!container) return;
    container.innerHTML = state.data.tracks.map(function (track, index) {
      var label = track.track_id === "TRACK-01" ? "Track 1" : "Track 2";
      return '<button class="abc-tab" type="button" data-track-index="' + index + '" aria-selected="' +
        (index === state.trackIndex ? "true" : "false") + '">' +
        escapeHtml(label) + '</button>';
    }).join("");
  }

  function renderStyleButtons() {
    root.querySelectorAll("[data-abc-style]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-abc-style") === state.style ? "true" : "false");
    });
  }

  function renderSectionList() {
    var track = currentTrack();
    var sections = currentSections();
    var title = root.querySelector("[data-abc-track-title]");
    var count = root.querySelector("[data-abc-visible-count]");
    var list = root.querySelector("[data-abc-section-list]");
    if (title) title.textContent = track.track_id === "TRACK-01" ? "Track 1 · 개발 이론" : "Track 2 · 실무 역량";
    if (count) count.textContent = sections.length + " Chapters";
    if (!list) return;

    if (!sections.length) {
      list.innerHTML = '<div class="abc-empty">조건에 맞는 Chapter가 없습니다.</div>';
      return;
    }
    if (!sections.some(function (section) { return section.section_id === state.sectionId; })) {
      state.sectionId = sections[0].section_id;
      state.lessonId = unitsOf(sections[0])[0]?.sub_2_id || "";
    }

    list.innerHTML = sections.map(function (section) {
      var diff = difficultyOf(section);
      var units = unitsOf(section);
      return '<button class="abc-chapter-btn" type="button" data-section-id="' + escapeHtml(section.section_id) +
        '" aria-current="' + (section.section_id === state.sectionId ? "true" : "false") + '">' +
        '<span class="abc-card-id">' + escapeHtml(chapterLabel(section.section_id)) + '</span>' +
        '<span class="abc-card-title">' + escapeHtml(section.section_name) + '</span>' +
        '<span class="abc-card-meta">' +
          '<span class="abc-chip ' + chipClass(diff) + '">' + escapeHtml(difficultyLabel(diff)) + '</span>' +
          '<span class="abc-chip blue">' + escapeHtml(formatHours(section.recommended_hours)) + '</span>' +
          '<span class="abc-chip">' + units.length + ' Lessons</span>' +
        '</span>' +
      '</button>';
    }).join("");
  }

  function renderLessonList(section) {
    var list = root.querySelector("[data-abc-lesson-list]");
    var count = root.querySelector("[data-abc-lesson-count]");
    var units = unitsOf(section || {});
    if (count) count.textContent = units.length + " Lessons";
    if (!list) return;
    list.innerHTML = units.map(function (unit) {
      return '<button class="abc-lesson-btn" type="button" data-lesson-id="' + escapeHtml(unit.sub_2_id) +
        '" aria-current="' + (unit.sub_2_id === state.lessonId ? "true" : "false") + '">' +
        '<span class="abc-unit-id">' + escapeHtml(lessonLabel(unit.sub_2_id)) + '</span>' +
        '<span class="abc-lesson-title">' + escapeHtml(unit.sub_2_name) + '</span>' +
      '</button>';
    }).join("");
  }

  function renderMeta(section) {
    var diff = difficultyOf(section);
    var units = unitsOf(section);
    return '<div class="abc-meta-row">' +
      '<span class="abc-chip blue">학습시간 ' + escapeHtml(formatHours(section.recommended_hours)) + '</span>' +
      '<span class="abc-chip">Section ' + escapeHtml(section.section_id) + '</span>' +
      '<span class="abc-chip ' + chipClass(diff) + '">난이도 ' + escapeHtml(difficultyLabel(diff)) + '</span>' +
      '<span class="abc-chip green">' + units.length + ' Lessons</span>' +
    '</div>';
  }

  function renderKeywords(section, limit) {
    var words = sectionKeywords(section, limit || 14);
    if (!words.length) return "";
    return '<div class="abc-keywords-wrap">' +
      '<h3>핵심 키워드</h3>' +
      '<div class="abc-keywords">' +
        words.map(function (word) { return '<span class="abc-keyword">' + escapeHtml(word) + '</span>'; }).join("") +
      '</div>' +
    '</div>';
  }

  function detailHref(unit) {
    var sectionId = String(unit.sub_2_id || "").replace(/-M\d+$/i, "");
    return DETAIL_HREF + "?section=" + encodeURIComponent(sectionId) + "#" + encodeURIComponent(unit.sub_2_id);
  }

  function renderUnitCard(unit) {
    var metadata = unit.module_metadata || {};
    var keywords = (unit.technical_keywords || []).slice(0, 6);
    return '<article class="abc-unit-card" id="' + escapeHtml(unit.sub_2_id) + '">' +
      '<header class="abc-unit-head">' +
        '<div class="abc-unit-title">' +
          '<div class="abc-unit-id">' + escapeHtml(lessonLabel(unit.sub_2_id)) + '</div>' +
          '<h3>' + escapeHtml(unit.sub_2_name) + '</h3>' +
        '</div>' +
        '<a class="abc-detail-link" href="' + detailHref(unit) + '">자세히</a>' +
      '</header>' +
      '<div class="abc-unit-chips">' +
        keywords.map(function (kw) { return '<span class="abc-keyword">' + escapeHtml(kw) + '</span>'; }).join("") +
        (metadata.module_family ? '<span class="abc-chip">' + escapeHtml(metadata.module_family) + '</span>' : '') +
        (metadata.recommended_hours ? '<span class="abc-chip blue">' + escapeHtml(formatHours(metadata.recommended_hours)) + '</span>' : '') +
      '</div>' +
      '<div class="abc-unit-body">' +
        '<section class="abc-info-block"><h4>핵심 내용</h4><p>' + escapeHtml(selectedContent(unit)) + '</p></section>' +
      '</div>' +
    '</article>';
  }

  function renderChapter(section) {
    var units = unitsOf(section);
    return '<div class="abc-section-overview">' +
      '<header class="abc-section-head">' +
        '<div class="abc-section-label">' + escapeHtml(chapterLabel(section.section_id)) + '</div>' +
        '<h2>' + escapeHtml(section.section_name) + '</h2>' +
        '<p class="abc-section-goal">' + escapeHtml(ko(section.section_goal)) + '</p>' +
        renderMeta(section) +
        renderKeywords(section, 14) +
      '</header>' +
    '</div>' +
    '<div class="abc-units">' + units.map(renderUnitCard).join("") + '</div>';
  }

  function listHtml(items, limit) {
    return items && items.length ? '<ol>' + items.slice(0, limit || items.length).map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join("") + '</ol>' : "";
  }

  function renderReader(section, lesson) {
    if (!lesson) return '<div class="abc-empty">표시할 Lesson이 없습니다.</div>';
    var units = unitsOf(section);
    var index = units.findIndex(function (unit) { return unit.sub_2_id === lesson.sub_2_id; });
    var steps = koList(lesson.learning_content_design);
    var cautions = koList(lesson.caution_points);
    var keywords = (lesson.technical_keywords || []).slice(0, 8);
    var prevDisabled = index <= 0 ? " disabled" : "";
    var nextDisabled = index >= units.length - 1 ? " disabled" : "";
    return '<div class="abc-reader">' +
      '<div class="abc-panel-head abc-reader-head">' +
        '<div class="abc-reader-title">' +
          '<strong>' + escapeHtml(chapterLabel(section.section_id)) + ' · ' + escapeHtml(lessonLabel(lesson.sub_2_id)) + '</strong>' +
          '<span>' + escapeHtml(lesson.sub_2_name) + '</span>' +
        '</div>' +
        '<div class="abc-reader-actions">' +
          '<button class="abc-nav-btn" type="button" data-lesson-step="-1"' + prevDisabled + '>이전</button>' +
          '<span class="abc-reader-pos">' + (index + 1) + ' / ' + units.length + '</span>' +
          '<button class="abc-nav-btn" type="button" data-lesson-step="1"' + nextDisabled + '>다음</button>' +
          '<a class="abc-detail-link" href="' + detailHref(lesson) + '">자세히</a>' +
        '</div>' +
      '</div>' +
      '<header class="abc-section-head abc-reader-summary">' +
        '<p class="abc-section-goal">' + escapeHtml(ko(section.section_goal)) + '</p>' +
        renderMeta(section) +
      '</header>' +
      '<div class="abc-unit-body">' +
        (keywords.length ? '<section class="abc-info-block abc-keyword-block"><h4>핵심 키워드</h4><div class="abc-keywords">' +
          keywords.map(function (kw) { return '<span class="abc-keyword">' + escapeHtml(kw) + '</span>'; }).join("") +
        '</div></section>' : '') +
        '<section class="abc-info-block"><h4>핵심 내용</h4><p>' + escapeHtml(selectedContent(lesson)) + '</p></section>' +
        (ko(lesson.learning_objectives) ? '<section class="abc-info-block"><h4>학습 목표</h4><p>' + escapeHtml(ko(lesson.learning_objectives)) + '</p></section>' : '') +
        (steps.length ? '<section class="abc-info-block"><h4>수업 설계</h4>' + listHtml(steps, 5) + '</section>' : '') +
        (ko(lesson.hands_on_lab) ? '<section class="abc-info-block lab"><h4>실습</h4><p>' + escapeHtml(ko(lesson.hands_on_lab)) + '</p></section>' : '') +
        (cautions.length ? '<section class="abc-info-block warn"><h4>주의사항</h4><ul>' + cautions.slice(0, 4).map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul></section>' : '') +
      '</div>' +
    '</div>';
  }

  function renderContent() {
    var found = currentSection();
    var content = root.querySelector("[data-abc-content]");
    if (!content || !found || !found.section) return;
    var section = found.section;
    var units = unitsOf(section);
    if (!units.some(function (unit) { return unit.sub_2_id === state.lessonId; })) {
      state.lessonId = units[0]?.sub_2_id || "";
    }
    renderLessonList(section);
    content.innerHTML = state.isFullscreen ? renderReader(section, currentLesson(section)) : renderChapter(section);
    populateSideNav(section);
    setActiveToc(state.isFullscreen ? state.lessonId : section.section_id);
  }

  function renderAll() {
    renderTabs();
    renderStyleButtons();
    renderSectionList();
    renderContent();
    updateHash();
  }

  function setActiveToc(id) {
    if (!id) return;
    document.querySelectorAll(".stage7-doc-side-nav [data-abc-scroll-target]").forEach(function (item) {
      item.setAttribute("aria-current", item.getAttribute("data-abc-scroll-target") === id ? "location" : "false");
    });
  }

  function setActiveLesson(id, keepToc) {
    if (!id) return;
    state.lessonId = id;
    root.querySelectorAll("[data-lesson-id]").forEach(function (button) {
      button.setAttribute("aria-current", button.getAttribute("data-lesson-id") === id ? "true" : "false");
    });
    if (!keepToc) setActiveToc(id);
  }

  function visibleLessonId() {
    var cards = Array.from(root.querySelectorAll("[data-abc-content] .abc-unit-card"));
    if (!cards.length) return state.lessonId;
    var anchorY = Math.min(Math.max(window.innerHeight * 0.28, 180), 320);
    var visibleCards = cards.filter(function (card) {
      var rect = card.getBoundingClientRect();
      return rect.bottom > anchorY && rect.top < window.innerHeight * 0.72;
    });
    var candidates = visibleCards.length ? visibleCards : cards;
    var best = candidates[0];
    var bestScore = Infinity;
    candidates.forEach(function (card) {
      var rect = card.getBoundingClientRect();
      var score = Math.abs(rect.top - anchorY);
      if (score < bestScore) {
        bestScore = score;
        best = card;
      }
    });
    return best ? best.id : state.lessonId;
  }

  function syncScrollLesson() {
    if (state.pendingFullscreenLessonId || state.isFullscreen ||
      document.body.classList.contains("curv2-fs") ||
      document.documentElement.classList.contains("curv2-fs")) return;
    var id = visibleLessonId();
    if (id && id !== state.lessonId) setActiveLesson(id);
  }

  function requestScrollSpy() {
    if (scrollSpyFrame || state.pendingFullscreenLessonId || state.isFullscreen ||
      document.body.classList.contains("curv2-fs") ||
      document.documentElement.classList.contains("curv2-fs")) return;
    scrollSpyFrame = window.requestAnimationFrame(function () {
      scrollSpyFrame = 0;
      syncScrollLesson();
    });
  }

  function populateSideNav(section) {
    var titleEl = document.querySelector('[data-shell-field="current-title"]');
    if (titleEl) titleEl.textContent = section.section_name;
    var labelEl = document.querySelector('[data-shell-field="current-label"]');
    if (labelEl) labelEl.textContent = chapterLabel(section.section_id);

    var tocButton = document.querySelector(".stage7-doc-side-nav [data-stage7-tab='toc']");
    if (tocButton) tocButton.textContent = "학습 목차";
    var pathButton = document.querySelector(".stage7-doc-side-nav [data-stage7-tab='path']");
    if (pathButton) pathButton.textContent = "학습 경로";

    var tocPanel = document.getElementById("stage7TocPanel");
    if (tocPanel) {
      var units = unitsOf(section);
      tocPanel.innerHTML = '<div class="stage7-side-heading">현재 Chapter</div>' +
        '<nav class="stage7-local-toc" aria-label="현재 Chapter 학습 목차">' +
          '<a href="#' + escapeHtml(section.section_id) + '" data-abc-scroll-target="' + escapeHtml(section.section_id) + '">' +
            escapeHtml(chapterLabel(section.section_id)) + ' · 개요</a>' +
          units.map(function (unit) {
            return '<a href="#' + escapeHtml(unit.sub_2_id) + '" data-abc-scroll-target="' + escapeHtml(unit.sub_2_id) + '">' +
              '<span class="secdetail-toc-id">' + escapeHtml(lessonLabel(unit.sub_2_id)) + '</span> ' +
              escapeHtml(unit.sub_2_name) + '</a>';
          }).join("") +
        '</nav>';
    }

    var pathPanel = document.getElementById("stage7PathPanel");
    if (!pathPanel) return;
    var track = currentTrack();
    var sections = track.sections || [];
    var currentIndex = sections.findIndex(function (sec) { return sec.section_id === section.section_id; });
    pathPanel.innerHTML = '<div class="stage7-path-panel">' +
      '<div class="stage7-side-heading">Track Chapter</div>' +
      '<div class="stage7-stepper-container"><div class="stage7-stepper-group"><div class="stage7-stepper-group-items">' +
      sections.map(function (sec, index) {
        var kind = index < currentIndex ? "done" : index === currentIndex ? "active current" : "next";
        return '<div class="stage7-stepper-card ' + kind + '">' +
          '<div class="stage7-stepper-card-right">' +
            '<a href="#' + encodeURIComponent(sec.section_id) + '" class="stage7-stepper-card-title" data-path-section-id="' + escapeHtml(sec.section_id) + '">' +
              escapeHtml(chapterLabel(sec.section_id)) + ' · ' + escapeHtml(sec.section_name) + '</a>' +
          '</div></div>';
      }).join("") +
      '</div></div></div></div>';
  }

  function updateHash() {
    if (state.sectionId) history.replaceState(null, "", "#" + encodeURIComponent(state.sectionId));
  }

  function initFromHash() {
    var id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id) return false;
    var found = findSection(id);
    var lessonFound = found ? null : findLesson(id);
    if (!found && !lessonFound) return false;
    state.trackIndex = found ? found.trackIndex : lessonFound.trackIndex;
    state.sectionId = found ? found.section.section_id : lessonFound.section.section_id;
    state.lessonId = found ? unitsOf(found.section)[0]?.sub_2_id || "" : lessonFound.lesson.sub_2_id;
    return true;
  }

  function selectSection(id, keepScroll) {
    var found = findSection(id);
    if (!found) return;
    state.trackIndex = found.trackIndex;
    state.sectionId = found.section.section_id;
    state.lessonId = unitsOf(found.section)[0]?.sub_2_id || "";
    renderAll();
    if (!keepScroll) {
      root.querySelector("[data-abc-content]")?.scrollTo?.({ top: 0, behavior: "auto" });
      window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  }

  function selectLesson(id) {
    var found = findLesson(id);
    if (found && found.section.section_id !== state.sectionId) {
      state.trackIndex = found.trackIndex;
      state.sectionId = found.section.section_id;
      state.lessonId = id;
      renderAll();
      return;
    }
    state.lessonId = id;
    renderContent();
    root.querySelector("[data-abc-content]")?.scrollTo?.({ top: 0, behavior: "auto" });
  }

  function stepLesson(delta) {
    var section = currentSection().section;
    var units = unitsOf(section);
    var index = units.findIndex(function (unit) { return unit.sub_2_id === state.lessonId; });
    var next = units[Math.min(units.length - 1, Math.max(0, index + delta))];
    if (next) selectLesson(next.sub_2_id);
  }

  function syncFullscreenState() {
    var next = document.body.classList.contains("curv2-fs") ||
      document.documentElement.classList.contains("curv2-fs");
    if (next === state.isFullscreen) return;
    if (next) {
      setActiveLesson(state.pendingFullscreenLessonId || state.lessonId || visibleLessonId(), true);
    }
    state.pendingFullscreenLessonId = "";
    state.isFullscreen = next;
    renderContent();
  }

  function isFullscreenToggleTarget(target) {
    return !!(target && target.closest && target.closest("[data-stage7-fullscreen]"));
  }

  function rememberFullscreenLesson() {
    if (state.isFullscreen) return;
    state.pendingFullscreenLessonId = state.lessonId || visibleLessonId();
  }

  root.addEventListener("click", function (event) {
    var tab = event.target.closest("[data-track-index]");
    if (tab) {
      state.trackIndex = Number(tab.getAttribute("data-track-index") || 0);
      var first = currentSections()[0] || currentTrack().sections[0];
      state.sectionId = first ? first.section_id : "";
      state.lessonId = first ? unitsOf(first)[0]?.sub_2_id || "" : "";
      renderAll();
      return;
    }

    var style = event.target.closest("[data-abc-style]");
    if (style) {
      state.style = style.getAttribute("data-abc-style") || "professional";
      renderStyleButtons();
      renderContent();
      return;
    }

    var section = event.target.closest("[data-section-id]");
    if (section) {
      selectSection(section.getAttribute("data-section-id"));
      return;
    }

    var lesson = event.target.closest("[data-lesson-id]");
    if (lesson) {
      selectLesson(lesson.getAttribute("data-lesson-id"));
      return;
    }

    var step = event.target.closest("[data-lesson-step]");
    if (step) {
      stepLesson(Number(step.getAttribute("data-lesson-step") || 0));
    }
  });

  document.addEventListener("click", function (event) {
    var path = event.target.closest("[data-path-section-id]");
    if (path) {
      event.preventDefault();
      selectSection(path.getAttribute("data-path-section-id"));
      return;
    }

    var sideLink = event.target.closest(".stage7-doc-side-nav [data-abc-scroll-target]");
    if (!sideLink) return;
    event.preventDefault();
    var id = sideLink.getAttribute("data-abc-scroll-target");
    if (id === state.sectionId) {
      root.querySelector("[data-abc-content]")?.scrollTo?.({ top: 0, behavior: "smooth" });
      window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      return;
    }
    if (state.isFullscreen) {
      selectLesson(id);
      return;
    }
    var target = root.querySelector("#" + safeSelectorId(id));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("pointerdown", function (event) {
    if (!isFullscreenToggleTarget(event.target)) return;
    rememberFullscreenLesson();
  }, true);

  document.addEventListener("mousedown", function (event) {
    if (!isFullscreenToggleTarget(event.target)) return;
    rememberFullscreenLesson();
  }, true);

  document.addEventListener("click", function (event) {
    if (!isFullscreenToggleTarget(event.target)) return;
    rememberFullscreenLesson();
  }, true);

  document.addEventListener("keydown", function (event) {
    if (!isFullscreenToggleTarget(event.target)) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    rememberFullscreenLesson();
  }, true);

  window.addEventListener("scroll", requestScrollSpy, { passive: true });

  root.addEventListener("input", function (event) {
    if (!event.target.matches("[data-abc-search]")) return;
    state.query = event.target.value;
    renderSectionList();
    renderContent();
  });

  root.addEventListener("change", function (event) {
    if (!event.target.matches("[data-abc-difficulty]")) return;
    state.difficulty = event.target.value;
    renderSectionList();
    renderContent();
  });

  function renderError(message) {
    root.innerHTML = '<div class="abc-wrap"><div class="abc-empty"><strong>커리큘럼을 표시할 수 없습니다.</strong><br>' +
      escapeHtml(message) + '</div></div>';
  }

  fetch(DATA_URL)
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) {
      state.data = data;
      state.isFullscreen = document.body.classList.contains("curv2-fs") ||
        document.documentElement.classList.contains("curv2-fs");
      if (!initFromHash()) {
        state.sectionId = data.tracks[0].sections[0].section_id;
        state.lessonId = unitsOf(data.tracks[0].sections[0])[0]?.sub_2_id || "";
      }
      renderShell();
      collapseGlobalDocNav();
      window.setTimeout(collapseGlobalDocNav, 0);
      renderAll();
      var observer = new MutationObserver(syncFullscreenState);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    })
    .catch(function (error) {
      renderError(error.message + " · 로컬 서버 또는 GitHub Pages에서 확인해 주세요.");
    });
})();
