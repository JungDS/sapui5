/* 
  [STANDARD_V3_STRUCTURE] 
  이 파일은 고품질 교육용 웹페이지 표준 구조(v3)를 따릅니다.
  AI 일괄 처리 및 스크립트 자동화의 대상이므로 코어 레이아웃과 클래스 명칭을 임의로 변경하지 마십시오.
*/
/* ============================================================
   widgets.js — initTabs, initCodeTour, initDiffMapper (탭/아코디언/diff)
   [모듈 목차] 이 파일에 없는 함수는 다른 모듈에 추가하세요.
   중복 추가 전 반드시 이 파일 전체를 먼저 확인하십시오.
   ============================================================ */

  /* ---------- 1. 점진 빌드업 탭 ---------- */
  function initTabs(root) {
    root.querySelectorAll(".event-tabs-container").forEach(function (container) {
      var buttons = container.querySelectorAll(".event-tab-buttons .tab-btn");
      var panels = container.querySelectorAll(".tabs-content .event-tab-panel");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab");
          buttons.forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          panels.forEach(function (p) {
            p.classList.toggle("active", p.getAttribute("id") === target);
          });
        });
      });
    });
  }

  /* ---------- 2. 코드 키워드 아코디언 (Code Tour) ---------- */
  function initCodeTour(root) {
    root.querySelectorAll(".code-tour-anchor").forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        var id = anchor.getAttribute("data-tour-id");
        var acc = document.getElementById(id);
        if (!acc) return;
        if (acc.classList.contains("active")) {
          acc.classList.remove("active");
          acc.style.maxHeight = null;
        } else {
          acc.classList.add("active");
          acc.style.maxHeight = acc.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- 3. Bad/Good Hover Mapping (Diff Mapper) ---------- */
  function initDiffMapper(root) {
    root.querySelectorAll(".interactive-diff-mapper").forEach(function (mapper) {
      var highlights = mapper.querySelectorAll(".diff-highlight");
      var expl = mapper.querySelector(".diff-explanation");
      var defaultHtml = expl ? expl.innerHTML : "";
      highlights.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          var id = el.getAttribute("data-diff-target") || el.getAttribute("data-diff-source");
          if (!id) return;
          mapper.querySelectorAll('[data-diff-target="' + id + '"], [data-diff-source="' + id + '"]').forEach(function (it) {
            it.classList.add("highlight-linked");
          });
          var title = el.getAttribute("data-explain-title") || "설명";
          var text = el.getAttribute("data-explain-desc") || "";
          if (expl && text) {
            expl.innerHTML = '<div class="diff-explanation-content"><strong>' + title + "</strong><span>" + text + "</span></div>";
          }
        });
        el.addEventListener("mouseleave", function () {
          highlights.forEach(function (it) { it.classList.remove("highlight-linked"); });
          if (expl) expl.innerHTML = defaultHtml;
        });
      });
    });
  }

  /* ---------- Confetti ---------- */
  function triggerConfetti() {
    var canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var colors = ["#f43f5e", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
    var pieces = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);
    for (var i = 0; i < 140; i++) {
      pieces.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4, color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 4 + 4, angle: Math.random() * 360, spin: Math.random() * 4 - 2 });
    }
    var start = Date.now();
    (function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Date.now() - start > 2400) { if (canvas.parentElement) document.body.removeChild(canvas); window.removeEventListener("resize", resize); return; }
      pieces.forEach(function (p) {
        p.y += p.speed; p.x += Math.sin(p.angle * Math.PI / 180) * 1.5; p.angle += p.spin;
        ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

