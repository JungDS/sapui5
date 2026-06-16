// ABAP Curriculum Lesson Viewer | 최종수정 2026-06-17 00:31 KST | v1.4
//
// Reads `?lesson=THEORY-01-M01` from the URL, loads the curriculum JSON to find metadata,
// and fetches the actual lesson content from `lesson-content/THEORY-01-M01.html`.
(function () {
  "use strict";

  var DATA_URL = "../../reference/abap_curriculum_v5_4_20260605_000000.json";
  var GLOSSARY_URL = "../../reference/abap_glossary.json";
  var glossaryData = null;

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
        '<a href="../roadmap/abap-curriculum.html">ABAP 커리큘럼</a><span>›</span>' +
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
        '<div class="lesson-current-chapter">' + escapeHtml(context.section.section_name) + '</div>' +
        '<nav class="stage7-local-toc secdetail-toc" aria-label="이 Chapter 안에서">' + tocLinks + "</nav>" +
        '<div class="stage7-related-docs lesson-related-docs"><div class="stage7-side-heading">이동</div>' +
        '<a href="' + backHref + '">↑ Chapter 요약으로 돌아가기</a>' +
        '<a href="tcode-map.html?upto=' + encodeURIComponent(context.current.unit.sub_2_id) + '">⌨️ 지금까지 배운 T-code</a></div>';
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
          '<div class="stage7-progress-bar"><span class="stage7-progress-fill"></span></div>' +
        "</div>" +
        '<div class="stage7-side-heading">Chapter 상세 보기</div>' +
        '<p class="stage7-path-hint">현재 Chapter는 강조되며, 다른 항목을 누르면 해당 상세 페이지로 이동합니다.</p>' +
        '<div class="stage7-stepper-container"><div class="stage7-stepper-group">' +
          '<div class="stage7-stepper-group-items">' + cards + "</div>" +
        "</div></div></div>";

      var progressFill = pathPanel.querySelector(".stage7-progress-fill");
      if (progressFill) {
        progressFill.style.width = progress + "%";
      }
    }
  }

  function fetchContent(lessonId) {
    var root = document.querySelector("[data-lesson-root]");
    if (!root) return;

    var contentUrl = "lesson-content/" + lessonId + ".html?v=" + new Date().getTime();
    fetch(contentUrl, { cache: "no-store" })
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
        renderTcodeBar(root, lessonId);
        setupCodeCopyButtons(root);
        initializeInteractiveWidgets(root);
        if (window.mermaid) {
          try {
            window.mermaid.initialize({
              startOnLoad: false,
              theme: 'neutral',
              securityLevel: 'loose'
            });
            window.mermaid.run({
              nodes: root.querySelectorAll('.mermaid')
            });
          } catch (e) {
            console.error("Failed to run Mermaid: ", e);
          }
        }
      })
      .catch(function (error) {
        renderError(error.message);
      });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.className = "lesson-copy-buffer";
      textarea.value = text;
      textarea.setAttribute("readonly", "readonly");
      document.body.appendChild(textarea);
      textarea.select();

      try {
        var copied = document.execCommand("copy");
        document.body.removeChild(textarea);
        copied ? resolve() : reject(new Error("Copy command was not accepted."));
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
    });
  }

  function setupCodeCopyButtons(scope) {
    var buttons = scope.querySelectorAll(".shiki-copy-button");
    buttons.forEach(function (btn) {
      if (btn.dataset.copyBound === "true") return;
      btn.dataset.copyBound = "true";

      btn.addEventListener("click", function () {
        var wrapper = btn.closest(".shiki-copy-wrapper");
        if (!wrapper) return;

        var codeEl = wrapper.querySelector("code");
        if (!codeEl) return;

        var originalText = btn.dataset.originalText || btn.textContent;
        btn.dataset.originalText = originalText;
        btn.textContent = "✓ Copied!";
        btn.classList.add("is-copied");

        copyText(codeEl.innerText).catch(function (err) {
          console.error("Failed to copy text: ", err);
        }).finally(function () {
          setTimeout(function () {
            btn.textContent = originalText;
            btn.classList.remove("is-copied");
          }, 2000);
        });
      });
    });
  }

  // Init
  var requestedLesson = getParam("lesson");
  if (!requestedLesson) {
    renderError("URL에 'lesson' 파라미터가 지정되지 않았습니다.");
    return;
  }

  // 글로서리는 T-code 칩 바 생성에 쓰인다. 실패해도 본문 렌더링은 막지 않는다(비치명적).
  fetch(GLOSSARY_URL)
    .then(function (response) { return response.ok ? response.json() : null; })
    .catch(function () { return null; })
    .then(function (glossary) {
      glossaryData = glossary;
      return fetch(DATA_URL);
    })
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

  // 이번 Lesson에서 등장하는 T-code(트랜잭션 코드)를 본문 data-glossary에서 수집해
  // 본문 맨 위에 칩 바로 정리한다. 글로서리에서 category="tcode"인 용어만 대상.
  // used_in_lessons의 첫 Lesson이면 "신규", 아니면 "복습"으로 구분해 중복 노출을 가볍게 만든다.
  function firstSentence(text) {
    var str = String(text == null ? "" : text);
    var m = str.match(/^[\s\S]*?다\.|^[\s\S]*?\./);
    var out = m ? m[0] : str;
    return out.length > 60 ? out.slice(0, 59) + "…" : out;
  }

  function renderTcodeBar(root, lessonId) {
    if (!glossaryData || !root) return;
    var nodes = root.querySelectorAll("[data-glossary]");
    var seen = {};
    var tcodes = [];

    nodes.forEach(function (el) {
      var key = el.getAttribute("data-glossary");
      if (!key || seen[key]) return;
      var entry = glossaryData[key];
      if (!entry || entry.category !== "tcode") return;
      seen[key] = true;

      var lessons = (entry.used_in_lessons || []).slice().sort();
      var isNew = lessons.length === 0 || lessons[0] === lessonId;
      tcodes.push({
        code: entry.tcode || key,
        desc: firstSentence(entry.desc),
        isNew: isNew
      });
    });

    if (!tcodes.length) return; // T-code 없는 Lesson은 칩 바 자체를 띄우지 않는다.

    // 신규를 앞으로, 복습을 뒤로 정렬.
    tcodes.sort(function (a, b) { return (a.isNew === b.isNew) ? 0 : (a.isNew ? -1 : 1); });

    var chips = tcodes.map(function (t) {
      var flag = t.isNew
        ? '<span class="lesson-tcode-chip-flag new">🆕 신규</span>'
        : '<span class="lesson-tcode-chip-flag review">🔁 복습</span>';
      return '<div class="lesson-tcode-chip ' + (t.isNew ? "is-new" : "is-review") + '">' +
        flag +
        '<span class="lesson-tcode-chip-code">' + escapeHtml(t.code) + '</span>' +
        '<span class="lesson-tcode-chip-desc">' + escapeHtml(t.desc) + '</span>' +
        '</div>';
    }).join("");

    var bar = document.createElement("div");
    bar.className = "lesson-tcode-bar";
    bar.setAttribute("data-tcode-bar", "");
    bar.innerHTML = '<div class="lesson-tcode-bar-head">' +
        '<span class="lesson-tcode-bar-icon">⌨️</span>' +
        '<span class="lesson-tcode-bar-title">이번 Lesson에서 다루는 트랜잭션 코드</span>' +
      '</div>' +
      '<div class="lesson-tcode-chips">' + chips + '</div>';

    root.insertBefore(bar, root.firstChild);
  }

  // 5대 인터랙티브 학습 위젯 초기화 통합 함수 (+ 점진적 이벤트 탭 위젯 추가)
  function initializeInteractiveWidgets(scope) {
    initCodeTour(scope);
    initDiffMapper(scope);
    initPuzzleQuiz(scope);
    initDebugger(scope);
    initSapSandbox(scope);
    initEventTabs(scope);
  }

  // 1. 맥락 인지형 아코디언 가이드 (Context-Aware Code Tour)
  function initCodeTour(scope) {
    var anchors = scope.querySelectorAll('.code-tour-anchor');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = anchor.getAttribute('data-tour-id');
        var accordion = scope.querySelector('#' + targetId);
        if (!accordion) return;
        
        var isActive = accordion.classList.contains('active');
        if (isActive) {
          accordion.classList.remove('active');
          accordion.style.maxHeight = null;
        } else {
          accordion.classList.add('active');
          accordion.style.maxHeight = accordion.scrollHeight + 'px';
        }
      });
    });
  }

  // 2. Before & After 코드 비교 매퍼 (Code Diff Mapper)
  function initDiffMapper(scope) {
    var diffMappers = scope.querySelectorAll('.interactive-diff-mapper');
    diffMappers.forEach(function (mapper) {
      var highlights = mapper.querySelectorAll('.diff-highlight');
      var explanationEl = mapper.querySelector('.diff-explanation');
      var defaultText = explanationEl ? explanationEl.innerHTML : '';
      
      highlights.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          var targetId = el.getAttribute('data-diff-target') || el.getAttribute('data-diff-source');
          if (!targetId) return;
          
          var linked = mapper.querySelectorAll('[data-diff-target="' + targetId + '"], [data-diff-source="' + targetId + '"]');
          linked.forEach(function (item) {
            item.classList.add('highlight-linked');
          });
          
          var title = el.getAttribute('data-explain-title') || '설명';
          var text = el.getAttribute('data-explain-desc') || '';
          if (explanationEl && text) {
            explanationEl.innerHTML = '<div class="diff-explanation-content"><strong>' + title + '</strong><span>' + text + '</span></div>';
          }
        });
        
        el.addEventListener('mouseleave', function () {
          highlights.forEach(function (item) {
            item.classList.remove('highlight-linked');
          });
          if (explanationEl) {
            explanationEl.innerHTML = defaultText;
          }
        });
      });
    });
  }

  // Canvas Confetti Effect
  function triggerConfetti() {
    var canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    document.body.appendChild(canvas);
    
    var ctx = canvas.getContext('2d');
    var colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    var confettiCount = 150;
    var confetti = [];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    for (var i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 4 + 4,
        angle: Math.random() * 360,
        spin: Math.random() * 4 - 2
      });
    }
    
    var startTime = Date.now();
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var elapsed = Date.now() - startTime;
      
      if (elapsed > 2500) {
        if (canvas.parentElement) {
          document.body.removeChild(canvas);
        }
        window.removeEventListener('resize', resizeCanvas);
        return;
      }
      
      confetti.forEach(function (p) {
        p.y += p.speed;
        p.x += Math.sin(p.angle * Math.PI / 180) * 1.5;
        p.angle += p.spin;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(draw);
    }
    draw();
  }

  // 3. 드래그 앤 드롭 구문 퍼즐 (Drag & Drop Syntax Jigsaw)
  function initPuzzleQuiz(scope) {
    var quizzes = scope.querySelectorAll('.interactive-puzzle-quiz');
    quizzes.forEach(function (quiz) {
      var dragItems = quiz.querySelectorAll('.drag-item');
      var dropZones = quiz.querySelectorAll('.drop-zone');
      var dragItemsContainer = quiz.querySelector('.puzzle-drag-items');
      
      var draggedItem = null;
      
      dragItems.forEach(function (item) {
        item.addEventListener('dragstart', function () {
          draggedItem = item;
          item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function () {
          item.classList.remove('dragging');
        });
      });
      
      dropZones.forEach(function (zone) {
        zone.addEventListener('dragover', function (e) {
          e.preventDefault();
          zone.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', function () {
          zone.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', function () {
          zone.classList.remove('drag-over');
          if (!draggedItem) return;
          
          var existing = zone.querySelector('.drag-item');
          if (existing) {
            dragItemsContainer.appendChild(existing);
          }
          
          zone.appendChild(draggedItem);
          checkPuzzleSolution(quiz);
        });
      });
      
      quiz.addEventListener('click', function (e) {
        if (e.target.classList.contains('drag-item') && e.target.parentElement.classList.contains('drop-zone')) {
          dragItemsContainer.appendChild(e.target);
          e.target.parentElement.classList.remove('correct', 'incorrect');
          checkPuzzleSolution(quiz);
        }
      });
    });
  }

  function checkPuzzleSolution(quiz) {
    var dropZones = quiz.querySelectorAll('.drop-zone');
    var feedback = quiz.querySelector('.puzzle-feedback');
    var totalZones = dropZones.length;
    var filledZones = 0;
    var correctCount = 0;
    
    dropZones.forEach(function (zone) {
      var expected = zone.getAttribute('data-expected');
      var child = zone.querySelector('.drag-item');
      
      if (child) {
        filledZones++;
        var actualId = child.getAttribute('id');
        var isCorrect = false;
        
        if (expected === 'LOAD-OF-PROGRAM' && actualId === 'LOP') isCorrect = true;
        if (expected === 'INITIALIZATION' && actualId === 'INIT') isCorrect = true;
        if (expected === 'START-OF-SELECTION' && actualId === 'SOS') isCorrect = true;
        if (expected === 'END-OF-SELECTION' && actualId === 'EOS') isCorrect = true;
        
        if (isCorrect) {
          zone.classList.remove('incorrect');
          zone.classList.add('correct');
          correctCount++;
        } else {
          zone.classList.remove('correct');
          zone.classList.add('incorrect');
        }
      } else {
        zone.classList.remove('correct', 'incorrect');
      }
    });
    
    if (filledZones === totalZones) {
      if (correctCount === totalZones) {
        feedback.className = 'puzzle-feedback success';
        feedback.innerHTML = '🎉 <strong>정답입니다!</strong> 라이프사이클 순서인 <strong>LOAD-OF-PROGRAM → INITIALIZATION → START-OF-SELECTION → END-OF-SELECTION</strong>을 완벽히 매핑하셨습니다. 화면 기본값 처리는 INITIALIZATION, 메인 비즈니스 조회 처리는 START-OF-SELECTION에 수행된다는 원리를 꼭 기억하세요!';
        triggerConfetti();
      } else {
        feedback.className = 'puzzle-feedback error';
        feedback.innerHTML = '❌ <strong>순서가 올바르지 않습니다.</strong> 각 이벤트 블록의 호출 순서를 다시 고민하여 조립해 보세요. (힌트: 요리사 정훈영 사원의 비유를 떠올려보세요!)';
      }
    } else {
      feedback.style.display = 'none';
    }
  }

  // 4. 대화형 코드 디버깅 시뮬레이터 (Interactive Step-Debugger)
  function initDebugger(scope) {
    var debuggers = scope.querySelectorAll('.interactive-debugger');
    debuggers.forEach(function (dbg) {
      var btnStart = dbg.querySelector('.btn-dbg-start');
      var btnNext = dbg.querySelector('.btn-dbg-next');
      var lines = dbg.querySelectorAll('.db-line');
      var monitorVals = {
        event: dbg.querySelector('.val-event'),
        subrc: dbg.querySelector('.val-subrc'),
        tabix: dbg.querySelector('.val-tabix')
      };
      var consoleOut = dbg.querySelector('.monitor-console-output');
      
      var currentStep = -1;
      
      var steps = [
        { line: 1, event: 'LOAD-OF-PROGRAM', subrc: '0', tabix: '0', console: '[LOAD-OF-PROGRAM] 프로그램 로드 완료.' },
        { line: 9, event: 'INITIALIZATION', subrc: '0', tabix: '0', console: '[LOAD-OF-PROGRAM] 프로그램 로드 완료.\n\n-> INITIALIZATION 이벤트 블록 점프.' },
        { line: 10, event: 'INITIALIZATION', subrc: '0', tabix: '0', console: '[LOAD-OF-PROGRAM] 프로그램 로드 완료.\n[1] INITIALIZATION 실행 (초기화)' },
        { line: 3, event: 'START-OF-SELECTION', subrc: '0', tabix: '0', console: '[LOAD-OF-PROGRAM] 프로그램 로드 완료.\n[1] INITIALIZATION 실행 (초기화)\n\n-> START-OF-SELECTION 이벤트 블록 점프.' },
        { line: 4, event: 'START-OF-SELECTION', subrc: '0', tabix: '0', console: '[LOAD-OF-PROGRAM] 프로그램 로드 완료.\n[1] INITIALIZATION 실행 (초기화)\n[3] START-OF-SELECTION 실행 (메인 로직)' },
        { line: 6, event: 'END-OF-SELECTION', subrc: '0', tabix: '0', console: '[LOAD-OF-PROGRAM] 프로그램 로드 완료.\n[1] INITIALIZATION 실행 (초기화)\n[3] START-OF-SELECTION 실행 (메인 로직)\n\n-> END-OF-SELECTION 이벤트 블록 점프.' },
        { line: 7, event: 'END-OF-SELECTION', subrc: '0', tabix: '0', console: '[LOAD-OF-PROGRAM] 프로그램 로드 완료.\n[1] INITIALIZATION 실행 (초기화)\n[3] START-OF-SELECTION 실행 (메인 로직)\n[4] END-OF-SELECTION 실행 (출력 마감)' }
      ];
      
      btnStart.addEventListener('click', function () {
        currentStep = 0;
        btnStart.textContent = '다시 시작';
        btnNext.disabled = false;
        if (consoleOut) {
          consoleOut.textContent = '=== 가상 디버거 실행 시작 ===';
        }
        updateDebuggerUI();
      });
      
      btnNext.addEventListener('click', function () {
        if (currentStep < steps.length - 1) {
          currentStep++;
          updateDebuggerUI();
          if (currentStep === steps.length - 1) {
            btnNext.disabled = true;
            if (consoleOut) {
              consoleOut.textContent += '\n\n=== 디버깅 종료: 실행 완료 ===';
            }
          }
        }
      });
      
      function updateDebuggerUI() {
        lines.forEach(function (l) { l.classList.remove('active'); });
        
        var step = steps[currentStep];
        if (!step) return;
        
        var activeLine = dbg.querySelector('.db-line[data-line="' + step.line + '"]');
        if (activeLine) activeLine.classList.add('active');
        
        if (monitorVals.event) monitorVals.event.textContent = step.event;
        if (monitorVals.subrc) monitorVals.subrc.textContent = step.subrc;
        if (monitorVals.tabix) monitorVals.tabix.textContent = step.tabix;
        if (consoleOut) {
          consoleOut.textContent = '=== 디버거 추적 중 ===\n' + step.console;
          consoleOut.scrollTop = consoleOut.scrollHeight;
        }
      }
    });
  }

  // 5. 가상 Selection Screen & T-Code 샌드박스 (Mock SAP UI Sandbox)
  function initSapSandbox(scope) {
    var sandboxes = scope.querySelectorAll('.interactive-sap-sandbox');
    sandboxes.forEach(function (sandbox) {
      var btnExec = sandbox.querySelector('.sap-btn-execute');
      var logEl = sandbox.querySelector('.sap-result-log');
      if (!btnExec) return;

      var config = parseSandboxConfig(sandbox);
      var yearInput = sandbox.querySelector('#sb-year');
      var empInput = sandbox.querySelector('#sb-emp-no');
      
      var modalOverlay = document.createElement('div');
      modalOverlay.className = 'sap-modal-overlay';
      modalOverlay.innerHTML = '<div class="sap-modal">' +
        '<div class="sap-modal-header">⚠️ SAP GUI Error</div>' +
        '<div class="sap-modal-body"></div>' +
        '<div class="sap-modal-footer"><button class="sap-modal-btn">확인</button></div>' +
        '</div>';
      document.body.appendChild(modalOverlay);
      
      var modalBody = modalOverlay.querySelector('.sap-modal-body');
      var modalBtn = modalOverlay.querySelector('.sap-modal-btn');
      
      modalBtn.addEventListener('click', function () {
        modalOverlay.style.display = 'none';
      });

      if (config) {
        btnExec.addEventListener('click', function () {
          runConfiguredSandbox(sandbox, config, logEl, showSapError);
        });
        return;
      }
      
      var empDb = [
        { id: '1000', name: '정훈영', dept: 'SD개발팀', year: '2026' },
        { id: '2000', name: '김지현', dept: 'FI운영팀', year: '2026' },
        { id: '3000', name: '이민수', dept: 'CO컨설팅', year: '2025' },
        { id: '4000', name: '박서우', dept: 'MM개발팀', year: '2026' }
      ];
      
      btnExec.addEventListener('click', function () {
        if (!logEl || !yearInput || !empInput) return;
        logEl.innerHTML = '';
        var yearVal = yearInput.value.trim();
        var empVal = empInput.value.trim();
        
        addLogLine('LOAD-OF-PROGRAM', 'event', 'SAP GUI가 ZREPORT_EVENT_DEMO 프로그램을 RAM 메모리에 로드 완료.');
        
        setTimeout(function () {
          addLogLine('INITIALIZATION', 'event', '화면 출력 직전 INITIALIZATION 이벤트 실행.');
          addLogLine('System', 'info', '화면 기본 입력값 세팅 완료 (Year: ' + yearVal + ').');
        }, 500);
        
        setTimeout(function () {
          addLogLine('AT SELECTION-SCREEN', 'event', '사용자 입력값 유효성 검증 시작.');
          
          if (!empVal) {
            addLogLine('Error', 'error', '검증 실패: 사원 번호는 필수 입력란입니다.');
            showSapError('사원 번호를 입력해 주세요. (T-Code: ZREPORT_EVENT_DEMO)');
            return;
          }
          
          if (isNaN(empVal) || empVal.length !== 4) {
            addLogLine('Error', 'error', '검증 실패: 사원 번호는 숫자 4자리여야 합니다.');
            showSapError('올바르지 않은 사원 번호 형식입니다. (4자리 숫자 입력)');
            return;
          }
          
          addLogLine('System', 'info', '검증 성공. 데이터 조회를 수행합니다.');
          
          setTimeout(function () {
            addLogLine('START-OF-SELECTION', 'event', 'START-OF-SELECTION 이벤트 시작. 데이터베이스 쿼리 실행.');
            
            var result = empDb.filter(function (emp) {
              return emp.id === empVal && emp.year === yearVal;
            });
            
            addLogLine('SELECT', 'info', '쿼리 실행 완료. ' + result.length + ' 건의 결과 레코드를 획득하였습니다.');
            
            setTimeout(function () {
              addLogLine('END-OF-SELECTION', 'event', 'END-OF-SELECTION 실행. ALV Grid로 결과 화면을 서빙합니다.');
              
              if (result.length > 0) {
                var tableHtml = '<table class="sap-alv-table">' +
                  '<thead><tr><th>사원번호</th><th>성명</th><th>부서</th><th>기준년도</th></tr></thead>' +
                  '<tbody>';
                result.forEach(function (row) {
                  tableHtml += '<tr><td>' + row.id + '</td><td>' + row.name + '</td><td>' + row.dept + '</td><td>' + row.year + '</td></tr>';
                });
                tableHtml += '</tbody></table>';
                logEl.innerHTML += '<div class="sap-log-line info">' + tableHtml + '</div>';
              } else {
                logEl.innerHTML += '<div class="sap-log-line error">조회 조건에 해당하는 데이터가 존재하지 않습니다. (SY-SUBRC = 4)</div>';
              }
            }, 600);
            
          }, 600);
          
        }, 1000);
      });
      
      function addLogLine(label, type, text) {
        var line = document.createElement('div');
        line.className = 'sap-log-line ' + type;
        line.innerHTML = '[' + label + '] ' + text;
        logEl.appendChild(line);
        logEl.scrollTop = logEl.scrollHeight;
      }
      
      function showSapError(msg) {
        modalBody.textContent = msg;
        modalOverlay.style.display = 'flex';
      }
    });
  }

  function parseSandboxConfig(sandbox) {
    var configEl = sandbox.querySelector('template.sandbox-config, script.sandbox-config');
    if (!configEl) return null;

    try {
      var rawConfig = configEl.content ? configEl.content.textContent : configEl.textContent;
      return JSON.parse(rawConfig);
    } catch (error) {
      console.error('Invalid SAP sandbox config: ', error);
      return null;
    }
  }

  function interpolateSandboxText(value, fields) {
    return String(value == null ? '' : value).replace(/\{([a-zA-Z0-9_-]+)\}/g, function (_, key) {
      return fields[key] == null ? '' : fields[key];
    });
  }

  function collectSandboxFields(sandbox, config) {
    var fields = {};
    var definitions = config.fields || {};

    Object.keys(definitions).forEach(function (key) {
      var input = sandbox.querySelector(definitions[key]);
      fields[key] = input && 'value' in input ? input.value.trim() : '';
    });

    return fields;
  }

  function runConfiguredSandbox(sandbox, config, logEl, showSapError) {
    if (!logEl) return;

    logEl.innerHTML = '';
    var fields = collectSandboxFields(sandbox, config);
    var steps = config.steps || [];

    steps.forEach(function (step) {
      addConfiguredLogLine(logEl, step.label, step.type, interpolateSandboxText(step.text, fields));
    });

    var validations = config.validations || [];
    for (var i = 0; i < validations.length; i++) {
      var rule = validations[i];
      var fieldValue = fields[rule.field] || '';
      if (!isSandboxRuleValid(fieldValue, rule)) {
        addConfiguredLogLine(logEl, rule.label || 'Error', 'error', interpolateSandboxText(rule.text, fields));
        showSapError(interpolateSandboxText(rule.modal || rule.text, fields));
        return;
      }
    }

    (config.successSteps || []).forEach(function (step) {
      addConfiguredLogLine(logEl, step.label, step.type, interpolateSandboxText(step.text, fields));
    });

    renderConfiguredSandboxResult(logEl, config.result, fields);
  }

  function isSandboxRuleValid(value, rule) {
    if (rule.test === 'required') return value.length > 0;
    if (rule.test === 'numeric') return value === '' || !isNaN(value);
    if (rule.test === 'num4') return /^[0-9]{4}$/.test(value);
    if (rule.test === 'prefix') return value.toUpperCase().indexOf(String(rule.value || '').toUpperCase()) === 0;
    if (rule.test === 'regex') return new RegExp(rule.pattern).test(value);
    if (rule.test === 'equals') return value === String(rule.value == null ? '' : rule.value);
    return true;
  }

  function renderConfiguredSandboxResult(logEl, result, fields) {
    if (!result) return;

    if (result.text) {
      addConfiguredLogLine(logEl, result.label || 'Result', result.type || 'info', interpolateSandboxText(result.text, fields));
    }

    var columns = result.columns || [];
    var rows = result.rows || [];
    if (!columns.length || !rows.length) return;

    var tableHtml = '<table class="sap-alv-table"><thead><tr>' +
      columns.map(function (col) { return '<th>' + escapeHtml(col.head || col.key) + '</th>'; }).join('') +
      '</tr></thead><tbody>';

    rows.forEach(function (row) {
      tableHtml += '<tr>' + columns.map(function (col) {
        return '<td>' + escapeHtml(interpolateSandboxText(row[col.key], fields)) + '</td>';
      }).join('') + '</tr>';
    });

    tableHtml += '</tbody></table>';
    logEl.innerHTML += '<div class="sap-log-line info">' + tableHtml + '</div>';
  }

  function addConfiguredLogLine(logEl, label, type, text) {
    var line = document.createElement('div');
    line.className = 'sap-log-line ' + (type || 'info');
    line.innerHTML = '[' + escapeHtml(label || 'System') + '] ' + escapeHtml(text || '');
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  }

  // 6. 점진적 빌드업 탭 제어 함수 (Incremental Build-Up Tabs)
  function initEventTabs(scope) {
    var tabButtons = scope.querySelectorAll('.event-tab-buttons .tab-btn');
    var tabPanels = scope.querySelectorAll('.tabs-content .event-tab-panel');

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-tab');

        // 모든 버튼 비활성화 및 클릭된 버튼 활성화
        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // 모든 패널 비활성화 및 타겟 패널 활성화
        tabPanels.forEach(function (panel) {
          if (panel.getAttribute('id') === targetId) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

})();
