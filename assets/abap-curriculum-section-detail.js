/*
 * ABAP Curriculum — THEORY(Section) detail page (prototype, single template).
 *
 * Reads `?section=THEORY-01` from the URL and renders ONE THEORY in full depth
 * from the shared curriculum JSON, including fields the explorer body omits
 * (learning_content_design, sequence_notes, assessment_design). Linked from the
 * "학습 경로" tab of the explorer's Navigation panel.
 */
(function () {
  "use strict";

  var DATA_URL = "../../reference/abap_curriculum_v5_3_20260602_010000.json";
  var root = document.querySelector("[data-secdetail-root]");
  if (!root) return;

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

  var difficultyOf = function (section) {
    return ko(section.sub_levels_1 && section.sub_levels_1[0] && section.sub_levels_1[0].difficulty) || "";
  };
  var difficultyClass = function (value) {
    if (!value) return "secdetail-chip--amber";
    if (value.indexOf("하") >= 0) return "secdetail-chip--green";
    if (value.indexOf("상") >= 0) return "secdetail-chip--purple";
    return "secdetail-chip--amber";
  };
  var difficultyLabel = function (value) {
    return (value || "난이도 미정").replace(/\s*\([^)]*\)/g, "");
  };

  var unitsOf = function (section) {
    return (section.sub_levels_1 || []).reduce(function (acc, level) {
      return acc.concat(level.sub_levels_2 || []);
    }, []);
  };

  // Friendly display labels (Chapter N / Lesson N). The JSON ids stay as the
  // stable keys for anchors / ?section= / hashes; only the visible text changes.
  var sectionNumber = function (id) { var m = String(id || "").match(/-(\d+)\s*$/); return m ? parseInt(m[1], 10) : null; };
  var unitNumbers = function (id) { var m = String(id || "").match(/-(\d+)-M(\d+)/i); return m ? { chapter: parseInt(m[1], 10), lesson: parseInt(m[2], 10) } : null; };
  var chapterLabel = function (sectionId) { var n = sectionNumber(sectionId); return n != null ? "Chapter " + n : String(sectionId || ""); };
  var lessonLabel = function (unitId) { var u = unitNumbers(unitId); return u ? "Lesson " + u.lesson : String(unitId || ""); };

  function getParam(name) {
    var match = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : "";
  }

  function findSection(data, id) {
    for (var t = 0; t < data.tracks.length; t += 1) {
      var sections = data.tracks[t].sections || [];
      for (var s = 0; s < sections.length; s += 1) {
        if (!id || sections[s].section_id === id) return { section: sections[s], track: data.tracks[t] };
      }
    }
    return null;
  }

  function renderKeywordChips(keywords) {
    if (!keywords || !keywords.length) return "";
    return '<div class="secdetail-chiprow">' + keywords.map(function (word) {
      return '<span class="secdetail-keyword">' + escapeHtml(word) + "</span>";
    }).join("") + "</div>";
  }

  function infoBlock(title, bodyHtml, modifier) {
    if (!bodyHtml) return "";
    return '<section class="secdetail-block' + (modifier ? " " + modifier : "") + '">' +
      "<h4>" + escapeHtml(title) + "</h4>" + bodyHtml + "</section>";
  }

  function listBlock(title, items, modifier) {
    if (!items || !items.length) return "";
    return infoBlock(title, "<ul>" + items.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</ul>", modifier);
  }

  function paraBlock(title, text, modifier) {
    if (!text) return "";
    return infoBlock(title, "<p>" + escapeHtml(text) + "</p>", modifier);
  }

  function renderMeta(meta) {
    if (!meta) return "";
    var rows = [];
    if (meta.module_family) rows.push(["모듈 계열", ko(meta.module_family)]);
    if (meta.difficulty_band) rows.push(["난이도", ko(meta.difficulty_band)]);
    if (meta.recommended_hours) rows.push(["권장 시간", formatHours(meta.recommended_hours)]);
    if (meta.bloom_taxonomy_level) rows.push(["Bloom 단계", ko(meta.bloom_taxonomy_level)]);
    if (meta.bloom_action_verbs && meta.bloom_action_verbs.length) rows.push(["행동 동사", meta.bloom_action_verbs.join(", ")]);
    if (meta.source_reference_profile && meta.source_reference_profile.length) rows.push(["참조 프로파일", meta.source_reference_profile.join(", ")]);
    if (!rows.length) return "";
    return infoBlock("모듈 메타데이터", '<dl class="secdetail-meta">' + rows.map(function (row) {
      return "<div><dt>" + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(row[1]) + "</dd></div>";
    }).join("") + "</dl>");
  }

  function renderAssessment(assessment) {
    if (!assessment) return "";
    var rows = [];
    if (assessment.quiz) rows.push(["퀴즈", ko(assessment.quiz)]);
    if (assessment.lab_review) rows.push(["실습 검토", ko(assessment.lab_review)]);
    if (assessment.enterprise_review) rows.push(["엔터프라이즈 검토", ko(assessment.enterprise_review)]);
    if (!rows.length) return "";
    return infoBlock("평가 설계", '<dl class="secdetail-meta">' + rows.map(function (row) {
      return "<div><dt>" + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(row[1]) + "</dd></div>";
    }).join("") + "</dl>", "secdetail-block--assess");
  }

  function renderUnit(unit, index) {
    return '<article class="secdetail-unit" id="' + escapeHtml(unit.sub_2_id) + '">' +
      '<header class="secdetail-unit-head">' +
        '<span class="secdetail-unit-id">' + escapeHtml(lessonLabel(unit.sub_2_id)) + "</span>" +
        "<h3>" + escapeHtml(unit.sub_2_name) + "</h3>" +
      "</header>" +
      renderKeywordChips(unit.technical_keywords) +
      '<div class="secdetail-blocks">' +
        paraBlock("핵심 내용", ko(unit.handled_contents)) +
        paraBlock("학습 목표", ko(unit.learning_objectives)) +
        paraBlock("수업 설계", ko(unit.learning_content_design)) +
        paraBlock("학습 순서 노트", ko(unit.sequence_notes)) +
        paraBlock("Hands-on Lab", ko(unit.hands_on_lab), "secdetail-block--lab") +
        listBlock("주의 사항", koList(unit.caution_points), "secdetail-block--warn") +
        renderAssessment(unit.assessment_design) +
        renderMeta(unit.module_metadata) +
      "</div>" +
    "</article>";
  }

  function renderGroup(group, groupIndex) {
    var units = group.sub_levels_2 || [];
    var diff = ko(group.difficulty);
    return '<section class="secdetail-group" id="group-' + escapeHtml(group.sub_1_id || groupIndex) + '">' +
      '<div class="secdetail-group-head">' +
        '<h2>' + escapeHtml(group.sub_1_name || ("학습 묶음 " + (groupIndex + 1))) + "</h2>" +
        (diff ? '<span class="secdetail-chip ' + difficultyClass(diff) + '">' + escapeHtml(difficultyLabel(diff)) + "</span>" : "") +
        '<span class="secdetail-chip">' + units.length + " Lessons</span>" +
      "</div>" +
      units.map(renderUnit).join("") +
    "</section>";
  }

  function render(section, track) {
    var diff = difficultyOf(section);
    var units = unitsOf(section);
    var explorerHref = document.body.getAttribute("data-explorer-href") || "";
    var backHref = explorerHref ? explorerHref + "#" + encodeURIComponent(section.section_id) : "";

    root.innerHTML =
      '<div class="secdetail-wrap">' +
        '<nav class="secdetail-breadcrumb">' +
          '<a href="../../index.html">홈</a><span>›</span>' +
          '<a href="../../pages/roadmap.html">로드맵 / 학습전략</a><span>›</span>' +
          (backHref ? '<a href="' + backHref + '">커리큘럼 탐색기</a><span>›</span>' : "") +
          "<span>" + escapeHtml(chapterLabel(section.section_id)) + "</span>" +
        "</nav>" +
        '<header class="secdetail-hero">' +
          '<div class="secdetail-eyebrow">' + escapeHtml(chapterLabel(section.section_id)) +
            (track ? ' · ' + escapeHtml(track.track_name || track.track_id || "") : "") + "</div>" +
          "<h1>" + escapeHtml(section.section_name) + "</h1>" +
          (ko(section.section_goal) ? '<p class="secdetail-goal">' + escapeHtml(ko(section.section_goal)) + "</p>" : "") +
          '<div class="secdetail-chiprow">' +
            '<span class="secdetail-chip ' + difficultyClass(diff) + '">' + escapeHtml(difficultyLabel(diff)) + "</span>" +
            '<span class="secdetail-chip secdetail-chip--blue">권장 ' + escapeHtml(formatHours(section.recommended_hours)) + "</span>" +
            '<span class="secdetail-chip">' + (section.sub_levels_1 || []).length + " 학습 묶음</span>" +
            '<span class="secdetail-chip">' + units.length + " Lessons</span>" +
          "</div>" +
          (backHref ? '<a class="secdetail-back" href="' + backHref + '">← 커리큘럼 탐색기로 돌아가기</a>' : "") +
        "</header>" +
        (section.sub_levels_1 || []).map(renderGroup).join("") +
      "</div>";

    // Reflect the Chapter title into the page title and Stage 7 Navigation header.
    document.title = chapterLabel(section.section_id) + " · " + section.section_name + " — ABAP Curriculum";
    var titleEl = document.querySelector('[data-shell-field="current-title"]');
    if (titleEl) titleEl.textContent = section.section_name;
    var labelEl = document.querySelector('[data-shell-field="current-label"]');
    if (labelEl) labelEl.textContent = "현재 Chapter";

    populateSideNav(section, track, backHref);
  }

  var conciseTrackName = function (track) {
    return String((track && (track.track_name || track.track_id)) || "")
      .replace(/\s*\([^)]*[A-Za-z][^)]*\)\s*/g, "")
      .trim();
  };

  function stepperIcon(kind) {
    if (kind === "done") return '<svg class="stage7-stepper-card-icon done" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    if (kind === "active") return '<svg class="stage7-stepper-card-icon active" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
    return '<svg class="stage7-stepper-card-icon next" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
  }

  // The Stage 7 shell builds its side-nav before this page's async content
  // exists, so its panels start empty. Re-populate the in-document TOC (units of
  // this THEORY) and mirror the explorer's "학습 경로" stepper (the whole track,
  // each entry linking to its own detail page).
  function populateSideNav(section, track, backHref) {
    var tocButton = document.querySelector(".stage7-doc-side-nav [data-stage7-tab='toc']");
    if (tocButton) tocButton.textContent = "학습 목차";
    var pathButton = document.querySelector(".stage7-doc-side-nav [data-stage7-tab='path']");
    if (pathButton) pathButton.textContent = "학습 경로";

    var tocPanel = document.getElementById("stage7TocPanel");
    if (tocPanel) {
      var links = unitsOf(section).map(function (unit) {
        return '<a href="#' + escapeHtml(unit.sub_2_id) + '">' +
          '<span class="secdetail-toc-id">' + escapeHtml(lessonLabel(unit.sub_2_id)) + "</span>" +
          escapeHtml(unit.sub_2_name) + "</a>";
      }).join("");
      tocPanel.innerHTML = '<div class="stage7-side-heading">이 Chapter 안에서</div>' +
        '<nav class="stage7-local-toc secdetail-toc" aria-label="이 Chapter 안에서">' + links + "</nav>" +
        (backHref ? '<div class="stage7-related-docs"><div class="stage7-side-heading">이동</div>' +
          '<a href="' + backHref + '">← 커리큘럼 탐색기로</a></div>' : "");
    }

    var pathPanel = document.getElementById("stage7PathPanel");
    if (pathPanel) pathPanel.innerHTML = renderPathPanel(section, track);
  }

  function renderPathPanel(section, track) {
    var sections = (track && track.sections) || [];
    var currentIndex = sections.findIndex(function (sec) { return sec.section_id === section.section_id; });
    var total = sections.length;
    var completed = currentIndex >= 0 ? currentIndex + 1 : 0;
    var progress = total ? Math.round((completed / total) * 100) : 0;

    var cards = sections.map(function (sec, index) {
      var kind = index < currentIndex ? "done" : index === currentIndex ? "active" : "next";
      var isCurrent = sec.section_id === section.section_id;
      var href = "abap-curriculum-section-detail.html?section=" + encodeURIComponent(sec.section_id);
      return '<div class="stage7-stepper-card ' + kind + (isCurrent ? " current" : "") + '">' +
        '<div class="stage7-stepper-card-left">' + stepperIcon(kind) + "</div>" +
        '<div class="stage7-stepper-card-right">' +
          '<a href="' + href + '" class="stage7-stepper-card-title">' +
            escapeHtml(chapterLabel(sec.section_id)) + " · " + escapeHtml(sec.section_name) + "</a>" +
        "</div></div>";
    }).join("");

    return '<div class="stage7-path-panel">' +
      '<div class="stage7-progress-card">' +
        "<div><span>" + escapeHtml(conciseTrackName(track)) + "</span><strong>" + completed + " / " + total + "</strong></div>" +
        '<div class="stage7-progress-bar"><span style="width:' + progress + '%"></span></div>' +
      "</div>" +
      '<div class="stage7-side-heading">Chapter 상세 보기</div>' +
      '<p class="stage7-path-hint">현재 Chapter는 강조되며, 다른 항목을 누르면 해당 상세 페이지로 이동합니다.</p>' +
      '<div class="stage7-stepper-container"><div class="stage7-stepper-group">' +
        '<div class="stage7-stepper-group-items">' + cards + "</div>" +
      "</div></div></div>";
  }

  function renderError(message) {
    root.innerHTML = '<div class="secdetail-wrap"><div class="secdetail-error"><strong>Chapter 상세를 표시할 수 없습니다.</strong><br><span>' +
      escapeHtml(message) + "</span></div></div>";
  }

  fetch(DATA_URL)
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) {
      var requested = getParam("section");
      var found = findSection(data, requested);
      if (!found) {
        renderError("'" + (requested || "(미지정)") + "' 에 해당하는 Chapter를 찾지 못했습니다.");
        return;
      }
      render(found.section, found.track);
    })
    .catch(function (error) {
      renderError(error.message + " · 로컬 서버 또는 GitHub Pages에서 확인해 주세요.");
    });
})();
