// ABAP Curriculum Lesson Viewer
//
// Reads `?lesson=THEORY-01-M01` from the URL, loads the curriculum JSON to find metadata,
// and fetches the actual lesson content from `lesson-content/THEORY-01-M01.html`.
(function () {
  "use strict";

  var DATA_URL = "../../reference/abap_curriculum_v5_4_20260605_000000.json";
  
  function getParam(name) {
    var match = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : "";
  }

  var escapeHtml = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Traverse JSON to find the lesson and its context
  function findLessonContext(data, targetLessonId) {
    var allLessons = [];
    var foundIndex = -1;
    var foundTrack = null;
    var foundSection = null;

    for (var t = 0; t < data.tracks.length; t++) {
      var track = data.tracks[t];
      var sections = track.sections || [];
      for (var s = 0; s < sections.length; s++) {
        var section = sections[s];
        var groups = section.sub_levels_1 || [];
        for (var g = 0; g < groups.length; g++) {
          var units = groups[g].sub_levels_2 || [];
          for (var u = 0; u < units.length; u++) {
            var unit = units[u];
            allLessons.push({
              track: track,
              section: section,
              unit: unit
            });
            if (unit.sub_2_id === targetLessonId) {
              foundIndex = allLessons.length - 1;
              foundTrack = track;
              foundSection = section;
            }
          }
        }
      }
    }

    if (foundIndex === -1) return null;

    return {
      current: allLessons[foundIndex],
      prev: foundIndex > 0 ? allLessons[foundIndex - 1] : null,
      next: foundIndex < allLessons.length - 1 ? allLessons[foundIndex + 1] : null,
      track: foundTrack,
      section: foundSection,
      allInSection: allLessons.filter(function(item) {
        return item.section.section_id === foundSection.section_id;
      })
    };
  }

  function renderError(message) {
    var root = document.querySelector("[data-lesson-root]");
    if (root) {
      root.innerHTML = '<div class="lesson-error"><strong>오류가 발생했습니다.</strong><br>' + escapeHtml(message) + '</div>';
    }
  }

  function renderHero(context) {
    var unit = context.current.unit;
    var section = context.current.section;
    var track = context.current.track;
    
    document.title = unit.sub_2_name + " · " + section.section_name + " — ABAP Curriculum";

    var titleEl = document.querySelector('[data-shell-field="current-title"]');
    if (titleEl) titleEl.textContent = unit.sub_2_name;

    var breadcrumb = document.querySelector("[data-lesson-breadcrumb]");
    if (breadcrumb) {
      breadcrumb.innerHTML = '<a href="../../index.html">Home</a><span>›</span>' +
        '<a href="abap-curriculum.html">ABAP 커리큘럼</a><span>›</span>' +
        '<a href="../roadmap/abap-curriculum-section-detail.html?section=' + encodeURIComponent(section.section_id) + '">' + escapeHtml(section.section_name) + '</a><span>›</span>' +
        '<span>' + escapeHtml(unit.sub_2_name) + '</span>';
    }

    var eyebrow = document.querySelector("[data-lesson-eyebrow]");
    if (eyebrow) {
      var trackName = (track.track_name || "").split("(")[0].trim();
      eyebrow.textContent = trackName;
    }

    var title = document.querySelector("[data-lesson-title]");
    if (title) title.textContent = unit.sub_2_name;

    var badges = document.querySelector("[data-lesson-badges]");
    if (badges) {
      var diff = unit.module_metadata && unit.module_metadata.difficulty_band && unit.module_metadata.difficulty_band.ko;
      
      var trackMatch = String(track.track_id || "").match(/TRACK-?0?(\d+)/i) || String(track.track_id || "").match(/-(\d+)/);
      var trackNum = trackMatch ? trackMatch[1] : "1";

      var chapterMatch = String(section.section_id || "").match(/-(\d+)/);
      var chapterNum = chapterMatch ? parseInt(chapterMatch[1], 10) : "";
      var lessonMatch = String(unit.sub_2_id || "").match(/-M(\d+)$/i);
      var lessonNum = lessonMatch ? parseInt(lessonMatch[1], 10) : "";

      badges.setAttribute("data-unit-id", unit.sub_2_id);

      var html = "";
      if (trackNum) html += '<span class="stage7-badge purple">Track ' + escapeHtml(trackNum) + '</span>';
      if (chapterNum) html += '<span class="stage7-badge gray">Chapter ' + escapeHtml(chapterNum) + '</span>';
      if (lessonNum) html += '<span class="stage7-badge blue">Lesson ' + escapeHtml(lessonNum) + '</span>';
      if (diff) html += '<span class="stage7-badge green">' + escapeHtml(diff) + '</span>';

      badges.innerHTML = html;
    }
  }

  function renderPager(context) {
    var pager = document.querySelector("[data-lesson-pager]");
    if (!pager) return;

    var html = "";
    if (context.prev) {
      html += '<a href="?lesson=' + encodeURIComponent(context.prev.unit.sub_2_id) + '" class="lesson-pager-btn prev">' +
        '<span class="lesson-pager-label">← 이전 Lesson</span>' +
        '<span class="lesson-pager-title">' + escapeHtml(context.prev.unit.sub_2_name) + '</span></a>';
    } else {
      html += '<div class="lesson-pager-btn empty"></div>';
    }

    if (context.next) {
      html += '<a href="?lesson=' + encodeURIComponent(context.next.unit.sub_2_id) + '" class="lesson-pager-btn next">' +
        '<span class="lesson-pager-label">다음 Lesson →</span>' +
        '<span class="lesson-pager-title">' + escapeHtml(context.next.unit.sub_2_name) + '</span></a>';
    } else {
      html += '<div class="lesson-pager-btn empty"></div>';
    }

    pager.innerHTML = html;
  }

  function getLessonLabel(sub2Id) {
    // sub2Id format: "THEORY-01-M01" -> "Lesson 1"
    var match = sub2Id.match(/-M(\d+)$/);
    if (match) {
      return "Lesson " + parseInt(match[1], 10);
    }
    return "Lesson";
  }

  function populateSideNav(context) {
    var tocPanel = document.getElementById("stage7TocPanel");
    var pathPanel = document.getElementById("stage7PathPanel");
    var backHref = "../roadmap/abap-curriculum-section-detail.html?section=" + encodeURIComponent(context.section.section_id);

    if (tocPanel) {
      // 1. 문서목차 (TOC) - 해당 Chapter 내의 Lesson 목록
      var tocLinks = context.allInSection.map(function (item) {
        var isCurrent = item.unit.sub_2_id === context.current.unit.sub_2_id;
        var label = getLessonLabel(item.unit.sub_2_id);
        var activeClass = isCurrent ? ' class="active"' : '';
        return '<a href="?lesson=' + encodeURIComponent(item.unit.sub_2_id) + '"' + activeClass + '>' +
          '<span class="toc-lesson-label">' + escapeHtml(label) + '</span>' +
          escapeHtml(item.unit.sub_2_name) + "</a>";
      }).join("");

      tocPanel.innerHTML = '<div class="stage7-side-heading">현재 Chapter</div>' +
        '<div style="font-size:0.85rem; margin-bottom:1rem; color:#666;">' + escapeHtml(context.section.section_name) + '</div>' +
        '<nav class="stage7-local-toc secdetail-toc" aria-label="이 Chapter 안에서">' + tocLinks + "</nav>" +
        '<div class="stage7-related-docs" style="margin-top:2rem;"><div class="stage7-side-heading">이동</div>' +
        '<a href="' + backHref + '">↑ Chapter 요약으로 돌아가기</a></div>';
    }

    if (pathPanel) {
      function stepperIcon(kind) {
        if (kind === "done") return '<svg class="stage7-stepper-card-icon done" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        if (kind === "active") return '<svg class="stage7-stepper-card-icon active" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
        return '<svg class="stage7-stepper-card-icon next" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
      }

      var trackName = "Track";
      if (context.track && (context.track.track_name || context.track.track_id)) {
        trackName = (context.track.track_name || context.track.track_id).split("(")[0].trim();
      }

      var sections = context.track.sections || [];
      var currentIndex = sections.findIndex(function (sec) { return sec.section_id === context.section.section_id; });
      var total = sections.length;
      var completed = currentIndex >= 0 ? currentIndex + 1 : 0;
      var progress = total ? Math.round((completed / total) * 100) : 0;

      var cards = sections.map(function (sec, index) {
        var kind = index < currentIndex ? "done" : index === currentIndex ? "active" : "next";
        var isCurrent = sec.section_id === context.section.section_id;
        var chapterMatch = String(sec.section_id || "").match(/-(\d+)/);
        var chapterLabel = chapterMatch ? "Chapter " + parseInt(chapterMatch[1], 10) : sec.section_id;
        var href = "../roadmap/abap-curriculum-section-detail.html?section=" + encodeURIComponent(sec.section_id);

        return '<div class="stage7-stepper-card ' + kind + (isCurrent ? " current" : "") + '">' +
          '<div class="stage7-stepper-card-left">' + stepperIcon(kind) + "</div>" +
          '<div class="stage7-stepper-card-right">' +
            '<a href="' + href + '" class="stage7-stepper-card-title">' +
              escapeHtml(chapterLabel) + " · " + escapeHtml(sec.section_name) + "</a>" +
          "</div></div>";
      }).join("");

      pathPanel.innerHTML = '<div class="stage7-path-panel">' +
        '<div class="stage7-progress-card">' +
          "<div><span>" + escapeHtml(trackName) + "</span><strong>" + completed + " / " + total + "</strong></div>" +
          '<div class="stage7-progress-bar"><span style="width:' + progress + '%"></span></div>' +
        "</div>" +
        '<div class="stage7-side-heading">Chapter 상세 보기</div>' +
        '<p class="stage7-path-hint" style="font-size:0.85rem; color:#666; margin-bottom:1rem;">현재 Chapter는 강조되며, 다른 항목을 누르면 해당 상세 페이지로 이동합니다.</p>' +
        '<div class="stage7-stepper-container"><div class="stage7-stepper-group">' +
          '<div class="stage7-stepper-group-items">' + cards + "</div>" +
        "</div></div></div>";
    }
  }

  function fetchContent(lessonId) {
    var root = document.querySelector("[data-lesson-root]");
    if (!root) return;

    var contentUrl = "lesson-content/" + lessonId + ".html";
    fetch(contentUrl)
      .then(function (response) {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("해당 Lesson의 본문 콘텐츠 파일(" + contentUrl + ")이 아직 작성되지 않았습니다.");
          }
          throw new Error("HTTP " + response.status);
        }
        return response.text();
      })
      .then(function (html) {
        root.innerHTML = html;
      })
      .catch(function (error) {
        renderError(error.message);
      });
  }

  // Init
  var requestedLesson = getParam("lesson");
  if (!requestedLesson) {
    renderError("URL에 'lesson' 파라미터가 지정되지 않았습니다.");
    return;
  }

  fetch(DATA_URL)
    .then(function (response) {
      if (!response.ok) throw new Error("JSON 데이터를 불러올 수 없습니다.");
      return response.json();
    })
    .then(function (data) {
      var context = findLessonContext(data, requestedLesson);
      if (!context) {
        renderError("'" + escapeHtml(requestedLesson) + "' 에 해당하는 Lesson을 찾지 못했습니다.");
        return;
      }
      
      renderHero(context);
      renderPager(context);
      populateSideNav(context);
      fetchContent(requestedLesson);
    })
    .catch(function (error) {
      renderError(error.message);
    });

  // Event delegation for shiki-copy-button
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.shiki-copy-button');
    if (!btn) return;

    var wrapper = btn.closest('.shiki-copy-wrapper');
    if (!wrapper) return;

    var codeEl = wrapper.querySelector('code');
    if (!codeEl) return;

    var textToCopy = codeEl.innerText;
    navigator.clipboard.writeText(textToCopy).then(function() {
      var originalText = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.style.color = '#27c93f';
      btn.style.borderColor = '#27c93f';
      
      setTimeout(function() {
        btn.textContent = originalText;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    }).catch(function(err) {
      console.error('Failed to copy text: ', err);
    });
  });

})();
