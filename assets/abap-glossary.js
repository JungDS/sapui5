// ABAP Glossary Tooltip System
(function () {
  "use strict";

  var GLOSSARY_URL = "../../reference/abap_glossary.json";
  var glossaryData = null;
  var tooltipEl = null;
  var pinnedTarget = null; // Tracks the clicked/pinned term element

  var escapeHtml = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  function initTooltipElement() {
    if (tooltipEl) return;
    tooltipEl = document.createElement("div");
    tooltipEl.className = "glossary-tooltip-container";
    document.body.appendChild(tooltipEl);

    // Close button logic
    tooltipEl.addEventListener("click", function (e) {
      if (e.target.closest(".glossary-tooltip-close")) {
        unpinTooltip();
      }
    });
  }

  function loadGlossary(callback) {
    if (glossaryData) {
      callback();
      return;
    }
    fetch(GLOSSARY_URL)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        glossaryData = data;
        callback();
      })
      .catch(function (err) {
        console.error("Glossary Load Error:", err);
      });
  }

  function renderTooltip(termId) {
    if (!glossaryData || !glossaryData[termId]) return false;
    var data = glossaryData[termId];
    
    var theme = data.design_theme || "info";
    tooltipEl.setAttribute("data-theme", theme);

    var html = '<button type="button" class="glossary-tooltip-close" aria-label="닫기">&times;</button>';
    html += '<h4 class="glossary-tooltip-title">' + escapeHtml(data.title) + '</h4>';
    html += '<div class="glossary-tooltip-desc">' + escapeHtml(data.desc) + '</div>';
    
    if (data.everyday_analogy) {
      html += '<div class="glossary-tooltip-analogy">' + escapeHtml(data.everyday_analogy) + '</div>';
    }
    
    if (data.html_content) {
      html += '<div class="glossary-tooltip-html">' + data.html_content + '</div>';
    }

    tooltipEl.innerHTML = html;
    return true;
  }

  function positionTooltip(targetRect) {
    var tooltipRect = tooltipEl.getBoundingClientRect();
    var top = targetRect.top + window.scrollY - tooltipRect.height - 10;
    var left = targetRect.left + window.scrollX + (targetRect.width / 2) - (tooltipRect.width / 2);

    // Prevent going off screen (top)
    if (top < window.scrollY) {
      top = targetRect.bottom + window.scrollY + 10; // show below
    }

    // Prevent going off screen (left/right)
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }

    tooltipEl.style.top = top + "px";
    tooltipEl.style.left = left + "px";
  }

  function unpinTooltip() {
    pinnedTarget = null;
    tooltipEl.classList.remove("pinned");
    tooltipEl.classList.remove("show");
  }

  function showTooltip(e) {
    if (pinnedTarget) return; // Don't interrupt if one is already pinned

    var target = e.currentTarget;
    var termId = target.getAttribute("data-glossary");
    if (!termId) return;

    loadGlossary(function () {
      if (renderTooltip(termId)) {
        tooltipEl.style.display = 'block';
        positionTooltip(target.getBoundingClientRect());
        tooltipEl.classList.add("show");
      }
    });
  }

  function hideTooltip(e) {
    if (pinnedTarget) return; // Don't hide if pinned
    if (tooltipEl) {
      tooltipEl.classList.remove("show");
    }
  }

  function handleTermClick(e) {
    e.preventDefault();
    var target = e.currentTarget;
    var termId = target.getAttribute("data-glossary");
    if (!termId) return;

    // Toggle unpin if clicking the same term
    if (pinnedTarget === target) {
      unpinTooltip();
      return;
    }

    // Pin new term
    pinnedTarget = target;
    loadGlossary(function () {
      if (renderTooltip(termId)) {
        tooltipEl.style.display = 'block';
        positionTooltip(target.getBoundingClientRect());
        tooltipEl.classList.add("show");
        tooltipEl.classList.add("pinned");
      }
    });
  }

  function attachEvents() {
    var terms = document.querySelectorAll(".glossary-term");
    terms.forEach(function (term) {
      // Remove old listeners to avoid duplicates if attachEvents is called again
      term.removeEventListener("mouseenter", showTooltip);
      term.removeEventListener("mouseleave", hideTooltip);
      term.removeEventListener("click", handleTermClick);

      term.addEventListener("mouseenter", showTooltip);
      term.addEventListener("mouseleave", hideTooltip);
      term.addEventListener("click", handleTermClick);
    });
  }

  // Use MutationObserver in case content is loaded dynamically (like in our lesson-viewer)
  function setupObserver() {
    var root = document.querySelector("[data-lesson-root]") || document.body;
    var observer = new MutationObserver(function(mutations) {
      attachEvents();
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTooltipElement();
    attachEvents();
    setupObserver();

    // Close pinned tooltip if clicked outside
    document.addEventListener("click", function(e) {
      if (pinnedTarget && !tooltipEl.contains(e.target) && !pinnedTarget.contains(e.target)) {
        unpinTooltip();
      }
    });
  });

})();
