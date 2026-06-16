// SAP T-code 지도 (T-code Map) | 최종수정 2026-06-16 19:05 KST | v1.0
//
// abap_glossary.json에서 category="tcode"인 항목을 전부 읽어, 그룹별로 정리해 보여 준다.
// 각 항목은 코드 · 설명 · "처음 등장 Lesson" · "또 쓰이는 Lesson"을 자동 표기한다.
// ?upto=THEORY-04-M06 파라미터가 있으면 그 Lesson까지 등장한 T-code만 보여 준다
// ("지금까지 배운 T-code 확인하기" 버튼용). 파라미터가 없으면 전체 카탈로그를 보여 준다.
(function () {
  "use strict";

  var GLOSSARY_URL = "../../reference/abap_glossary.json";
  var LESSON_VIEWER = "lesson-viewer.html?lesson=";

  // 표시 순서대로 그룹 정의. keys는 글로서리 키. 분류는 표현용 메타데이터이므로 여기서 관리한다.
  var GROUPS = [
    { label: "개발 핵심 (Workbench)", keys: ["SE80", "SE38", "SA38", "SE37", "SE24Transaction", "SE91", "SE93", "SE51", "SE41"] },
    { label: "DDIC · 테이블 데이터", keys: ["SE11", "DataBrowser", "SE54", "SM30", "SQVI"] },
    { label: "디버깅 · 성능 · 품질", keys: ["DebuggerH", "ST22", "SAT", "ST05", "SLIN", "SCI", "ATC"] },
    { label: "시스템 · 모니터링 · 락", keys: ["SM21", "SM50", "SM12", "SM13"] },
    { label: "Transport · 이송", keys: ["SE09", "STMS"] },
    { label: "배치 Job · 스풀 · BDC", keys: ["SM36", "SM37", "SP01", "SHDB"] },
    { label: "Enhancement · BAdI", keys: ["SE18", "SE19", "CMOD", "SMOD"] },
    { label: "출력 Forms", keys: ["SMARTFORMS", "SE71", "SFP"] },
    { label: "권한", keys: ["SU53"] },
    { label: "Fiori · Launchpad · UI", keys: ["UI2_FLP", "UI2_FLPD_CUST", "UI2_FLPD_CONF", "UI2_FLPCM_CUST", "UI2_FLPCM_CONF", "LPD_CUST", "UI2_THEME_DESIGNER", "UI2_SEMOBJ", "UI2_SEMOBJ_CONF", "UI2_INVALIDATE_GLOBAL_CACHES", "UI2_CHIP", "SICF"] },
    { label: "Gateway · OData (프론트엔드)", keys: ["IWFND_MAINT_SERVICE", "IWFND_GW_CLIENT", "IWFND_ERROR_LOG", "IWFND_CACHE_CLEANUP", "IWFND_APPS_LOG", "IWFND_TRACES", "IWFND_V4_ADMIN"] },
    { label: "Gateway · OData (백엔드)", keys: ["SEGW", "IWBEP_REG_SERVICE", "IWBEP_ERROR_LOG", "IWBEP_TRACES", "IWBEP_CACHE_CLEANUP"] }
  ];

  function getParam(name) {
    var match = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : "";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function lessonLabel(id) {
    // THEORY-04-M06 -> "4-6"
    var m = String(id).match(/-(\d+)-M(\d+)$/i);
    return m ? (parseInt(m[1], 10) + "-" + parseInt(m[2], 10)) : id;
  }

  function renderError(message) {
    var root = document.querySelector("[data-tcode-root]");
    if (root) root.innerHTML = '<div class="lesson-error"><strong>오류가 발생했습니다.</strong><br>' + escapeHtml(message) + "</div>";
  }

  function build(glossary) {
    var upto = getParam("upto");
    var root = document.querySelector("[data-tcode-root]");
    if (!root) return;

    // 그룹에 속하지 않은 tcode가 있으면 "기타"로 모은다(누락 방지).
    var grouped = {};
    GROUPS.forEach(function (g) { g.keys.forEach(function (k) { grouped[k] = true; }); });
    var others = Object.keys(glossary).filter(function (k) {
      return glossary[k] && glossary[k].category === "tcode" && !grouped[k];
    });
    var groupsToRender = others.length ? GROUPS.concat([{ label: "기타", keys: others }]) : GROUPS;

    var totalTcodes = 0, learnedCount = 0;
    var sectionsHtml = "";

    groupsToRender.forEach(function (group) {
      var cards = "";
      var visibleInGroup = 0;

      group.keys.forEach(function (key) {
        var entry = glossary[key];
        if (!entry || entry.category !== "tcode") return;
        totalTcodes++;

        var lessons = (entry.used_in_lessons || []).slice().sort();
        var learned = lessons.length > 0;
        if (learned) learnedCount++;

        // upto 필터: 그 Lesson까지 등장한 것만.
        if (upto) {
          var appeared = lessons.some(function (l) { return l <= upto; });
          if (!appeared) return;
        }
        visibleInGroup++;

        var firstLesson = lessons[0];
        var lessonHtml;
        if (!learned) {
          lessonHtml = '<span class="tcode-lesson-none">아직 Lesson 미등장</span>';
        } else {
          var first = '<a class="tcode-lesson-badge first" href="' + LESSON_VIEWER + encodeURIComponent(firstLesson) + '" title="' + escapeHtml(firstLesson) + '">처음: Lesson ' + escapeHtml(lessonLabel(firstLesson)) + '</a>';
          var rest = lessons.slice(1).map(function (l) {
            return '<a class="tcode-lesson-badge" href="' + LESSON_VIEWER + encodeURIComponent(l) + '" title="' + escapeHtml(l) + '">' + escapeHtml(lessonLabel(l)) + '</a>';
          }).join("");
          lessonHtml = first + rest;
        }

        var code = escapeHtml(entry.tcode || key);
        var title = escapeHtml((entry.title || "").replace(/^트랜잭션\s*/, ""));
        cards += '<div class="tcode-card' + (learned ? " is-learned" : "") + '" data-code="' + code.toLowerCase() + '" data-title="' + title.toLowerCase() + '" data-learned="' + (learned ? "1" : "0") + '">' +
            '<div class="tcode-card-head"><span class="tcode-card-code">' + code + '</span></div>' +
            '<div class="tcode-card-title">' + title + '</div>' +
            '<div class="tcode-card-desc">' + escapeHtml(entry.desc || "") + '</div>' +
            '<div class="tcode-card-lessons">' + lessonHtml + '</div>' +
          '</div>';
      });

      if (visibleInGroup === 0) return; // 필터로 비면 그룹 자체를 숨김
      sectionsHtml += '<section class="tcode-group" data-group>' +
          '<h2 class="tcode-group-title">' + escapeHtml(group.label) + ' <span class="tcode-group-count">' + visibleInGroup + '</span></h2>' +
          '<div class="tcode-grid">' + cards + "</div>" +
        "</section>";
    });

    // 상단 요약/컨트롤
    var uptoNote = upto
      ? '<div class="tcode-upto-note">🎯 <strong>Lesson ' + escapeHtml(lessonLabel(upto)) + '</strong>까지 등장한 T-code만 보고 있습니다. <a href="tcode-map.html">전체 보기 →</a></div>'
      : "";

    var controls = '<div class="tcode-controls">' +
        '<input type="search" class="tcode-search" placeholder="🔎 코드 또는 설명으로 검색 (예: SE11, 디버거, OData)" aria-label="T-code 검색" />' +
        '<label class="tcode-toggle"><input type="checkbox" class="tcode-learned-only" />학습에 등장한 것만</label>' +
      "</div>";

    var summary = '<div class="tcode-summary">' +
        '<span><strong>' + totalTcodes + '</strong>개 트랜잭션</span>' +
        '<span class="tcode-summary-sep">·</span>' +
        '<span>학습에 등장 <strong>' + learnedCount + '</strong>개</span>' +
      "</div>";

    root.innerHTML = uptoNote + summary + controls + (sectionsHtml || '<p class="tcode-empty">표시할 T-code가 없습니다.</p>');

    wireFilters(root);
  }

  function wireFilters(root) {
    var search = root.querySelector(".tcode-search");
    var learnedOnly = root.querySelector(".tcode-learned-only");

    function apply() {
      var q = (search.value || "").trim().toLowerCase();
      var onlyLearned = learnedOnly.checked;
      root.querySelectorAll("[data-group]").forEach(function (section) {
        var shown = 0;
        section.querySelectorAll(".tcode-card").forEach(function (card) {
          var hit = !q || card.getAttribute("data-code").indexOf(q) !== -1 || card.getAttribute("data-title").indexOf(q) !== -1 || card.querySelector(".tcode-card-desc").textContent.toLowerCase().indexOf(q) !== -1;
          if (onlyLearned && card.getAttribute("data-learned") !== "1") hit = false;
          card.style.display = hit ? "" : "none";
          if (hit) shown++;
        });
        section.style.display = shown ? "" : "none";
      });
    }

    search.addEventListener("input", apply);
    learnedOnly.addEventListener("change", apply);
  }

  fetch(GLOSSARY_URL)
    .then(function (r) { if (!r.ok) throw new Error("글로서리 데이터를 불러올 수 없습니다."); return r.json(); })
    .then(build)
    .catch(function (e) { renderError(e.message); });
})();
