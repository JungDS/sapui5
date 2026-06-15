/* 
  [STANDARD_V3_STRUCTURE] 
  이 파일은 고품질 교육용 웹페이지 표준 구조(v3)를 따릅니다.
  AI 일괄 처리 및 스크립트 자동화의 대상이므로 코어 레이아웃과 클래스 명칭을 임의로 변경하지 마십시오.
*/
/* ============================================================
   variants.js — [V3 전용] initVariants, initHotspot, initDataChart, initProfiler, initShortcut, initOXSurvival + ready() 호출부
   [모듈 목차] 이 파일에 없는 함수는 다른 모듈에 추가하세요.
   중복 추가 전 반드시 이 파일 전체를 먼저 확인하십시오.
   ============================================================ */



function ready(fn) {
  if (document.readyState !== "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
}

/* ---------- [NEW] Design Variants & 6종 확장 컴포넌트 ---------- */
function initVariants() {
  const panels = document.querySelectorAll(".variant-panel");
  panels.forEach(panel => {
    const pageId = panel.dataset.pageId;
    if (!pageId) return;

    const radios = panel.querySelectorAll('input[type="radio"]');
    const labels = panel.querySelectorAll('label');
    const targetEls = document.querySelectorAll('.method-example');

    // 칩 active 클래스 업데이트
    function updateChips(val) {
      labels.forEach(lbl => {
        const r = lbl.querySelector('input[type="radio"]');
        if (!r) return;
        lbl.classList.remove('active');
        if (r.value === val) lbl.classList.add('active');
      });
    }

    const saved = localStorage.getItem('v3-variant-' + pageId);
    if (saved) {
      const r = panel.querySelector(`input[value="${saved}"]`);
      if (r) r.checked = true;
      applyVariant(saved);
      updateChips(saved);
    } else {
      // 기본값 A로 초기화
      const rA = panel.querySelector('input[value="A"]');
      if (rA) rA.checked = true;
      applyVariant('A');
      updateChips('A');
    }

    radios.forEach(radio => {
      radio.addEventListener("change", function () {
        if (this.checked) {
          const val = this.value;
          localStorage.setItem('v3-variant-' + pageId, val);
          applyVariant(val);
          updateChips(val);
          saveToServer(pageId, val);
        }
      });
    });

    function applyVariant(val) {
      targetEls.forEach(el => {
        el.classList.remove('variant-A', 'variant-B', 'variant-C');
        el.classList.add('variant-' + val);
      });
    }

    function saveToServer(pageId, val) {
      let fullData = { "version": "v3", "updated": new Date().toISOString().split('T')[0], "choices": {} };
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith('v3-variant-')) {
          let pid = key.replace('v3-variant-', '');
          fullData.choices[pid] = { "chosen": localStorage.getItem(key), "options": ["A", "B", "C"], "note": "" };
        }
      }
      fetch('/save-choices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData)
      }).catch(err => { });
    }
  });

  const exportBtn = document.querySelector("#export-choices-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      let fullData = { "version": "v3", "updated": new Date().toISOString().split('T')[0], "choices": {} };
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith('v3-variant-')) {
          fullData.choices[key.replace('v3-variant-', '')] = { "chosen": localStorage.getItem(key), "options": ["A", "B", "C"], "note": "" };
        }
      }
      navigator.clipboard.writeText(JSON.stringify(fullData, null, 2)).then(() => {
        exportBtn.textContent = "복사 완료!";
        setTimeout(() => exportBtn.textContent = "전체 선택 내보내기 (JSON 복사)", 2000);
      });
    });
  }

  document.querySelectorAll(".page-export-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const pageId = this.dataset.pageId;
      const val = localStorage.getItem('v3-variant-' + pageId);
      const obj = {};
      obj[pageId] = { "chosen": val, "options": ["A", "B", "C"], "note": "" };
      navigator.clipboard.writeText(JSON.stringify(obj)).then(() => {
        this.textContent = "복사됨";
        setTimeout(() => this.textContent = "선택 JSON 복사", 2000);
      });
    });
  });
}

function initHotspot(root) {
  root.querySelectorAll(".hotspot-explorer").forEach(ex => {
    const spots = ex.querySelectorAll(".hotspot");
    const tooltip = ex.querySelector(".hotspot-tooltip");
    spots.forEach(sp => {
      sp.addEventListener("mouseenter", (e) => {
        tooltip.innerHTML = `<strong>${sp.dataset.title}</strong><br>${sp.dataset.desc}`;
        tooltip.classList.add("show");
      });
      sp.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
    });
  });
}

function initDataChart(root) {
  root.querySelectorAll(".interactive-data-chart").forEach(ch => {
    const inputs = ch.querySelectorAll(".chart-input");
    const bars = ch.querySelectorAll(".chart-bar");
    function draw() {
      let max = 0;
      inputs.forEach(inp => max = Math.max(max, parseInt(inp.value) || 0));
      if (max === 0) max = 1;
      inputs.forEach((inp, idx) => {
        const v = parseInt(inp.value) || 0;
        bars[idx].style.height = (v / max * 100) + "%";
        bars[idx].textContent = v;
      });
    }
    inputs.forEach(inp => inp.addEventListener("input", draw));
    draw();
  });
}

function initProfiler(root) {
  root.querySelectorAll(".performance-profiler").forEach(pr => {
    const btn = pr.querySelector(".btn-run-profile");
    const bars = pr.querySelectorAll(".profile-bar-fill");
    if (!btn) return;
    btn.addEventListener("click", () => {
      bars.forEach(b => {
        b.style.width = "0%";
        setTimeout(() => b.style.width = b.dataset.targetWidth, 100);
      });
    });
  });
}

function initShortcut(root) {
  root.querySelectorAll(".shortcut-simulator").forEach(sh => {
    const input = sh.querySelector(".shortcut-input");
    const msg = sh.querySelector(".shortcut-msg");
    if (!input) return;
    // 정답은 input의 data-target에 "Shift+F1" 형식(공백 없음)으로 지정한다.
    const target = (input.getAttribute("data-target") || "").toUpperCase();
    input.addEventListener("keydown", (e) => {
      e.preventDefault();
      let keys = [];
      if (e.ctrlKey) keys.push("Ctrl");
      if (e.shiftKey) keys.push("Shift");
      if (e.altKey) keys.push("Alt");
      if (e.key !== "Control" && e.key !== "Shift" && e.key !== "Alt") keys.push(e.key.toUpperCase());
      if (keys.length === 0) return;
      const combo = keys.join("+");
      input.value = combo;
      if (!msg) return;
      msg.style.display = "block";
      if (combo.toUpperCase() === target) {
        msg.textContent = "정답입니다! (" + (input.getAttribute("data-target") || combo) + ")";
        msg.className = "shortcut-msg success";
      } else {
        msg.textContent = "틀렸습니다. 다시 시도하세요.";
        msg.className = "shortcut-msg error";
      }
    });
  });
}

function initOXSurvival(root) {
  root.querySelectorAll(".ox-survival-game").forEach(game => {
    let score = 0;
    const btnO = game.querySelector(".btn-o");
    const btnX = game.querySelector(".btn-x");
    const qText = game.querySelector(".ox-question");
    const sText = game.querySelector(".ox-score");
    let questions = [];
    try { questions = JSON.parse(game.querySelector(".ox-data").textContent); } catch (e) { }
    if (!questions.length || !btnO) return;
    let curr = 0;
    function loadQ() {
      if (curr >= questions.length) {
        qText.textContent = "게임 종료! 최종 점수: " + score;
        btnO.disabled = true; btnX.disabled = true;
        return;
      }
      qText.textContent = questions[curr].q;
    }
    function check(ans) {
      if (questions[curr].a === ans) score += 10;
      else score -= 5;
      sText.textContent = "Score: " + score;
      curr++;
      loadQ();
    }
    btnO.addEventListener("click", () => check("O"));
    btnX.addEventListener("click", () => check("X"));
    loadQ();
  });
}

ready(function () {
  var root = document;
  initTabs(root);
  initCodeTour(root);
  initDiffMapper(root);
  initPuzzle(root);
  initCardSort(root);
  initDebugger(root);
  initSandbox(root);
  initFlashcards(root);
  initChecklist(root);
  initDecision(root);
  initShortAnswer(root);
  initExam(root);
  initCopy(root);
  initAbapEditorCopy(root);
  initVariants();
  initHotspot(root);
  initDataChart(root);
  initProfiler(root);
  initShortcut(root);
  initOXSurvival(root);

  if (window.mermaid) {
    try {
      window.mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "loose" });
      window.mermaid.run({ nodes: document.querySelectorAll(".mermaid") });
    } catch (e) { console.error("Mermaid run failed", e); }
  }
});

