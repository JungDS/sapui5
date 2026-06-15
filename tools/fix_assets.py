import os

v2_css_path = r"c:\ui5\study\sapui5\sample\learning-methods-v2\assets\method-samples.css"
v2_js_path = r"c:\ui5\study\sapui5\sample\learning-methods-v2\assets\method-samples.js"

v3_css_path = r"c:\ui5\study\sapui5\sample\learning-methods-v3\assets\method-samples.css"
v3_js_path = r"c:\ui5\study\sapui5\sample\learning-methods-v3\assets\method-samples.js"

# V3 전용 추가 CSS 
V3_EXTRA_CSS = """
/* ============================================================
   [NEW] V3 Design Variants & 6 신규 컴포넌트 전용 스타일
   ============================================================ */
/* Variant B (Darker & Rounded Theme) */
.variant-B {
  --bg: #f3f4f6; --panel: #ffffff; --ink: #111827; --blue: #8b5cf6; 
  --line: #d1d5db; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  border-width: 2px !important;
}
/* Variant C (Monochrome & Minimalist) */
.variant-C {
  --bg: #ffffff; --panel: #ffffff; --ink: #000000; --blue: #171717;
  --line: #000000; border-radius: 0px !important; box-shadow: none;
  border-width: 3px !important; border-style: dashed !important;
}
.variant-panel {
  background: var(--panel); border: 1px solid var(--line); border-radius: 6px;
  padding: 1rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.5rem;
}
.variant-panel h4 { margin: 0; font-size: 0.95rem; }
.variant-options { display: flex; gap: 1rem; }
.variant-options label { cursor: pointer; display: flex; align-items: center; gap: 0.3rem; font-size: 0.9rem; }
.page-export-btn { margin-left: auto; padding: 0.4rem 0.8rem; font-size: 0.8rem; background: var(--blue); color: #fff; border: none; border-radius: 4px; cursor: pointer; }

/* 1. Hotspot Explorer */
.hotspot-explorer { position: relative; display: inline-block; }
.hotspot-explorer img { max-width: 100%; border: 1px solid var(--line); border-radius: 4px; }
.hotspot {
  position: absolute; width: 24px; height: 24px; background: rgba(37, 99, 235, 0.4);
  border: 2px solid var(--blue); border-radius: 50%; cursor: pointer;
  transform: translate(-50%, -50%); transition: 0.2s;
}
.hotspot:hover { background: rgba(37, 99, 235, 0.8); transform: translate(-50%, -50%) scale(1.2); }
.hotspot-tooltip {
  position: absolute; top: 10px; right: -250px; width: 220px; background: #fff;
  border: 1px solid var(--line); padding: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 4px; opacity: 0; pointer-events: none; transition: 0.3s; z-index:100;
}
.hotspot-tooltip.show { opacity: 1; right: -220px; }

/* 2. Interactive Data Chart */
.interactive-data-chart { display: flex; gap: 2rem; align-items: flex-end; }
.chart-inputs { display: flex; flex-direction: column; gap: 0.5rem; }
.chart-input { width: 60px; padding: 0.3rem; border:1px solid var(--line); }
.chart-display { display: flex; align-items: flex-end; gap: 1rem; height: 200px; border-left: 2px solid var(--line); border-bottom: 2px solid var(--line); padding: 0.5rem; }
.chart-bar { width: 40px; background: var(--blue); transition: height 0.5s ease; text-align: center; color: #fff; font-size: 0.8rem; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 5px; }

/* 3. Performance Profiler Mock */
.performance-profiler { border: 1px solid var(--line); padding: 1rem; background: #fff; border-radius: 4px; }
.profile-row { margin-bottom: 1rem; }
.profile-bar { height: 20px; background: #eee; border-radius: 10px; overflow: hidden; margin-top: 0.5rem; }
.profile-bar-fill { height: 100%; width: 0%; transition: width 1s ease-out; }
.profile-bar-fill.bad { background: var(--red); }
.profile-bar-fill.good { background: var(--green); }

/* 4. Shortcut Simulator */
.shortcut-simulator { text-align: center; padding: 2rem; background: var(--panel); border: 2px dashed var(--line); border-radius: 8px; }
.shortcut-input { font-size: 1.5rem; text-align: center; padding: 1rem; width: 300px; text-transform: uppercase; border:1px solid var(--line); }
.shortcut-msg { margin-top: 1rem; font-weight: bold; }
.shortcut-msg.success { color: var(--green); }
.shortcut-msg.error { color: var(--red); }

/* 5. O/X Survival */
.ox-survival-game { text-align: center; padding: 2rem; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; }
.ox-question { font-size: 1.2rem; margin-bottom: 2rem; height: 60px; display: flex; align-items: center; justify-content: center; }
.ox-btns { display: flex; justify-content: center; gap: 2rem; }
.ox-btns button { font-size: 2rem; width: 80px; height: 80px; border-radius: 50%; cursor: pointer; border: none; font-weight: bold; color: #fff; transition: transform 0.1s; }
.ox-btns button:active { transform: scale(0.9); }
.btn-o { background: var(--green); }
.btn-x { background: var(--red); }
.ox-score { margin-top: 1rem; font-size: 1.2rem; font-weight: bold; color: var(--blue); }
"""

# V3 전용 추가 JS
V3_EXTRA_JS = """
  /* ---------- [NEW] Design Variants & 6종 확장 컴포넌트 ---------- */
  function initVariants() {
    const panels = document.querySelectorAll(".variant-panel");
    panels.forEach(panel => {
      const pageId = panel.dataset.pageId;
      if (!pageId) return;

      const radios = panel.querySelectorAll('input[type="radio"]');
      const targetEls = document.querySelectorAll('.method-example');

      const saved = localStorage.getItem('v3-variant-' + pageId);
      if (saved) {
        const r = panel.querySelector(`input[value="${saved}"]`);
        if (r) r.checked = true;
        applyVariant(saved);
      }

      radios.forEach(radio => {
        radio.addEventListener("change", function () {
          if (this.checked) {
            const val = this.value;
            localStorage.setItem('v3-variant-' + pageId, val);
            applyVariant(val);
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
        for(let i=0; i<localStorage.length; i++){
          let key = localStorage.key(i);
          if(key.startsWith('v3-variant-')){
            let pid = key.replace('v3-variant-', '');
            fullData.choices[pid] = { "chosen": localStorage.getItem(key), "options": ["A","B","C"], "note": "" };
          }
        }
        fetch('/save-choices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullData)
        }).catch(err => {});
      }
    });

    const exportBtn = document.querySelector("#export-choices-btn");
    if(exportBtn) {
      exportBtn.addEventListener("click", () => {
        let fullData = { "version": "v3", "updated": new Date().toISOString().split('T')[0], "choices": {} };
        for(let i=0; i<localStorage.length; i++){
          let key = localStorage.key(i);
          if(key.startsWith('v3-variant-')){
            fullData.choices[key.replace('v3-variant-', '')] = { "chosen": localStorage.getItem(key), "options": ["A","B","C"], "note": "" };
          }
        }
        navigator.clipboard.writeText(JSON.stringify(fullData, null, 2)).then(() => {
          exportBtn.textContent = "복사 완료!";
          setTimeout(() => exportBtn.textContent = "전체 선택 내보내기 (JSON 복사)", 2000);
        });
      });
    }
    
    document.querySelectorAll(".page-export-btn").forEach(btn => {
      btn.addEventListener("click", function(){
        const pageId = this.dataset.pageId;
        const val = localStorage.getItem('v3-variant-' + pageId);
        const obj = {};
        obj[pageId] = { "chosen": val, "options": ["A","B","C"], "note": "" };
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
        inputs.forEach(inp => max = Math.max(max, parseInt(inp.value)||0));
        if(max===0) max=1;
        inputs.forEach((inp, idx) => {
          const v = parseInt(inp.value)||0;
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
      if(!btn) return;
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
      if(!input) return;
      input.addEventListener("keydown", (e) => {
        e.preventDefault();
        let keys = [];
        if(e.ctrlKey) keys.push("Ctrl");
        if(e.shiftKey) keys.push("Shift");
        if(e.altKey) keys.push("Alt");
        if(e.key !== "Control" && e.key !== "Shift" && e.key !== "Alt") keys.push(e.key.toUpperCase());
        const combo = keys.join(" + ");
        input.value = combo;
        if(combo === sh.dataset.targetCombo) {
          msg.textContent = "✅ 성공! 올바른 단축키를 입력했습니다.";
          msg.className = "shortcut-msg success";
        } else {
          msg.textContent = "❌ 아님. 타겟 단축키를 눌러보세요.";
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
      try { questions = JSON.parse(game.querySelector(".ox-data").textContent); }catch(e){}
      if(!questions.length || !btnO) return;
      let curr = 0;
      function loadQ() {
        if(curr >= questions.length) {
          qText.textContent = "게임 종료! 최종 점수: " + score;
          btnO.disabled = true; btnX.disabled = true;
          return;
        }
        qText.textContent = questions[curr].q;
      }
      function check(ans) {
        if(questions[curr].a === ans) score += 10;
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
"""

with open(v2_css_path, "r", encoding="utf-8") as f:
    v2_css = f.read()

with open(v3_css_path, "w", encoding="utf-8") as f:
    f.write(v2_css + "\n\n" + V3_EXTRA_CSS)

with open(v2_js_path, "r", encoding="utf-8") as f:
    v2_js = f.read()

# v2 JS의 init() 호출 부분 앞에 V3 추가 함수를 넣고 호출부에 삽입
v2_js = v2_js.replace("ready(function () {", V3_EXTRA_JS + "\n  ready(function () {")
v2_js = v2_js.replace("initCopy(root);", "initCopy(root);\n    initVariants();\n    initHotspot(root);\n    initDataChart(root);\n    initProfiler(root);\n    initShortcut(root);\n    initOXSurvival(root);")

with open(v3_js_path, "w", encoding="utf-8") as f:
    f.write(v2_js)

# index.html 에 css 링크 추가
index_path = r"c:\ui5\study\sapui5\sample\learning-methods-v3\index.html"
with open(index_path, "r", encoding="utf-8") as f:
    idx_html = f.read()
if '<link rel="stylesheet"' not in idx_html:
    idx_html = idx_html.replace('</head>', '  <link rel="stylesheet" href="assets/method-samples.css">\n</head>')
with open(index_path, "w", encoding="utf-8") as f:
    f.write(idx_html)

print("CSS, JS 복원 및 index.html CSS 링크 추가 완료!")
