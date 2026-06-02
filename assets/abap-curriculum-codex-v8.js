/*
 * ABAP Curriculum Codex v8 add-on — load AFTER abap-curriculum-codex-v7.js.
 * Adds a floating "전체화면" (fullscreen) toggle that expands the whole page to
 * fill the viewport (antigravity-style), and reverts to the docked codex view on
 * exit (button or Esc). The v7 curv2 engine is reused unchanged.
 */
(function () {
  "use strict";

  var LABEL_ON = "⛶ 전체화면";
  var LABEL_OFF = "⛶ 전체화면 종료";

  function inFullscreen() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function setMode(on) {
    document.documentElement.classList.toggle("curv2-fs", on);
    document.body.classList.toggle("curv2-fs", on);
    var btn = document.querySelector(".curv2-fsbtn");
    if (btn) {
      btn.textContent = on ? LABEL_OFF : LABEL_ON;
      btn.setAttribute("aria-pressed", String(on));
    }
  }

  function requestFs(el) {
    var fn = el.requestFullscreen || el.webkitRequestFullscreen;
    return fn ? fn.call(el) : null;
  }
  function exitFs() {
    var fn = document.exitFullscreen || document.webkitExitFullscreen;
    return fn ? fn.call(document) : null;
  }

  function toggle() {
    // Fullscreen the whole document so the floating button stays visible too.
    var target = document.documentElement;
    if (inFullscreen()) {
      var ex = exitFs();
      if (!ex) setMode(false); // no API -> pseudo fullscreen fallback
    } else {
      var p = requestFs(target);
      if (p && typeof p.then === "function") {
        p.then(function () { setMode(true); }).catch(function () {
          setMode(!document.documentElement.classList.contains("curv2-fs"));
        });
      } else if (p === null) {
        // Fullscreen API unavailable (e.g. blocked) -> pseudo fullscreen via class only
        setMode(!document.documentElement.classList.contains("curv2-fs"));
      }
    }
  }

  function init() {
    if (document.querySelector(".curv2-fsbtn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "curv2-fsbtn";
    btn.textContent = LABEL_ON;
    btn.setAttribute("aria-label", "전체화면 전환");
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", toggle);
    document.body.appendChild(btn);

    // Keep class in sync with real fullscreen state (covers Esc / browser UI exit).
    document.addEventListener("fullscreenchange", function () { setMode(!!inFullscreen()); });
    document.addEventListener("webkitfullscreenchange", function () { setMode(!!inFullscreen()); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
