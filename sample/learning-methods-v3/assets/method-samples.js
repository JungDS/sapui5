/* ============================================================
   [DEPRECATED] method-samples.js
   이 파일은 더 이상 새 작업에 사용하지 않습니다.
   대신 아래 분리된 모듈 파일을 사용하세요:

     <script src="assets/core.js"></script>
     <script src="assets/widgets.js"></script>
     <script src="assets/quiz.js"></script>
     <script src="assets/sandbox.js"></script>

   기존 페이지는 특정 페이지 수정 시 점진적으로 위 모듈로 교체합니다.
   모든 페이지가 교체되면 이 파일은 assets/archive/ 로 이동합니다.
   ============================================================ */

/* ============================================================
   학습 수단 샘플 라이브러리 v2 공통 동작
   - Chapter 13 Lesson 1~6의 위젯 동작을 멀티 인스턴스 / 데이터 기반으로 일반화
   - 모든 위젯은 DOMContentLoaded 시 클래스 기준으로 자동 초기화된다.
   ============================================================ */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function parseJSON(el) {
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { console.error("config parse error", e); return null; }
  }

  function interpolate(text, vars) {
    return String(text).replace(/\{(\w+)\}/g, function (_, k) {
      return (vars[k] === undefined || vars[k] === "") ? "(미입력)" : vars[k];
    });
  }

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

  /* ---------- 4. 드래그 앤 드롭 퍼즐 (data-expected vs data-answer) ---------- */
  function initPuzzle(root) {
    root.querySelectorAll(".interactive-puzzle-quiz").forEach(function (quiz) {
      var items = quiz.querySelectorAll(".drag-item");
      var zones = quiz.querySelectorAll(".drop-zone");
      var pool = quiz.querySelector(".puzzle-drag-items");
      var feedback = quiz.querySelector(".puzzle-feedback");
      var dragged = null;

      items.forEach(function (item) {
        item.addEventListener("dragstart", function () { dragged = item; item.classList.add("dragging"); });
        item.addEventListener("dragend", function () { item.classList.remove("dragging"); });
      });
      zones.forEach(function (zone) {
        zone.addEventListener("dragover", function (e) { e.preventDefault(); zone.classList.add("drag-over"); });
        zone.addEventListener("dragleave", function () { zone.classList.remove("drag-over"); });
        zone.addEventListener("drop", function () {
          zone.classList.remove("drag-over");
          if (!dragged) return;
          var existing = zone.querySelector(".drag-item");
          if (existing) pool.appendChild(existing);
          zone.appendChild(dragged);
          check();
        });
      });
      quiz.addEventListener("click", function (e) {
        if (e.target.classList.contains("drag-item") && e.target.parentElement.classList.contains("drop-zone")) {
          pool.appendChild(e.target);
          e.target.parentElement.classList.remove("correct", "incorrect");
          check();
        }
      });

      function check() {
        var total = zones.length, filled = 0, correct = 0;
        zones.forEach(function (zone) {
          var expected = zone.getAttribute("data-expected");
          var child = zone.querySelector(".drag-item");
          if (child) {
            filled++;
            var answer = child.getAttribute("data-answer") || child.textContent.trim();
            if (answer === expected) { zone.classList.remove("incorrect"); zone.classList.add("correct"); correct++; }
            else { zone.classList.remove("correct"); zone.classList.add("incorrect"); }
          } else { zone.classList.remove("correct", "incorrect"); }
        });
        if (!feedback) return;
        if (filled === total) {
          if (correct === total) {
            feedback.className = "puzzle-feedback success";
            feedback.innerHTML = quiz.getAttribute("data-success") || "🎉 <strong>정답입니다!</strong> 순서를 완벽히 맞췄습니다.";
            triggerConfetti();
          } else {
            feedback.className = "puzzle-feedback error";
            feedback.innerHTML = quiz.getAttribute("data-error") || "❌ <strong>아직 아니에요.</strong> 순서를 다시 생각해 보세요.";
          }
        } else { feedback.style.display = "none"; }
      }
    });
  }

  /* ---------- 5. Step Debugger (JSON 기반) ---------- */
  function initDebugger(root) {
    root.querySelectorAll(".interactive-debugger").forEach(function (dbg) {
      var config = parseJSON(dbg.querySelector(".debugger-steps"));
      if (!config || !config.steps) return;
      var steps = config.steps;
      var btnStart = dbg.querySelector(".btn-dbg-start");
      var btnNext = dbg.querySelector(".btn-dbg-next");
      var lines = dbg.querySelectorAll(".db-line");
      var consoleOut = dbg.querySelector(".monitor-console-output");
      var current = -1;

      btnStart.addEventListener("click", function () {
        current = 0;
        btnStart.textContent = "다시 시작";
        btnNext.disabled = false;
        update();
      });
      btnNext.addEventListener("click", function () {
        if (current < steps.length - 1) {
          current++;
          update();
          if (current === steps.length - 1) {
            btnNext.disabled = true;
            if (consoleOut) consoleOut.textContent += "\n\n=== 디버깅 종료: 실행 완료 ===";
          }
        }
      });
      function update() {
        lines.forEach(function (l) { l.classList.remove("active"); });
        var step = steps[current];
        if (!step) return;
        var active = dbg.querySelector('.db-line[data-line="' + step.line + '"]');
        if (active) active.classList.add("active");
        var vars = step.vars || {};
        Object.keys(vars).forEach(function (k) {
          var cell = dbg.querySelector('.monitor-val-value[data-key="' + k + '"]');
          if (cell) cell.textContent = vars[k];
        });
        if (consoleOut) { consoleOut.textContent = "=== 디버거 추적 중 ===\n" + (step.console || ""); consoleOut.scrollTop = consoleOut.scrollHeight; }
      }
    });
  }

  /* ---------- 6. 가상 SAP GUI Sandbox (JSON 기반) ---------- */
  var sharedModal = null;
  function getModal() {
    if (sharedModal) return sharedModal;
    var overlay = document.createElement("div");
    overlay.className = "sap-modal-overlay";
    overlay.innerHTML = '<div class="sap-modal"><div class="sap-modal-header">⚠️ SAP GUI Error</div>' +
      '<div class="sap-modal-body"></div><div class="sap-modal-footer"><button class="sap-modal-btn">확인</button></div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector(".sap-modal-btn").addEventListener("click", function () { overlay.style.display = "none"; });
    sharedModal = overlay;
    return overlay;
  }

  function initSandbox(root) {
    root.querySelectorAll(".interactive-sap-sandbox").forEach(function (sandbox) {
      var config = parseJSON(sandbox.querySelector(".sandbox-config"));
      if (!config) return;
      var btn = sandbox.querySelector(".sap-btn-execute");
      var logEl = sandbox.querySelector(".sap-result-log");
      if (!btn || !logEl) return;

      function addLine(label, type, text) {
        var line = document.createElement("div");
        line.className = "sap-log-line " + (type || "info");
        line.innerHTML = "[" + label + "] " + text;
        logEl.appendChild(line);
        logEl.scrollTop = logEl.scrollHeight;
      }
      function showError(msg) {
        var modal = getModal();
        modal.querySelector(".sap-modal-body").textContent = msg;
        modal.style.display = "flex";
      }

      btn.addEventListener("click", function () {
        logEl.innerHTML = "";
        var vars = {};
        Object.keys(config.fields || {}).forEach(function (k) {
          var inp = sandbox.querySelector(config.fields[k]);
          vars[k] = inp ? inp.value.trim() : "";
        });

        var delay = 0;
        var stopped = false;
        function schedule(fn) { delay += (config.stepDelay || 450); setTimeout(function () { if (!stopped) fn(); }, delay); }

        (config.steps || []).forEach(function (s) {
          schedule(function () { addLine(s.label, s.type || "event", interpolate(s.text, vars)); });
        });

        // 검증
        schedule(function () {
          var vals = config.validations || [];
          for (var i = 0; i < vals.length; i++) {
            var v = vals[i];
            var val = vars[v.field] || "";
            var fail = false;
            if (v.test === "required") fail = (val === "");
            else if (v.test === "num4") fail = (isNaN(val) || val.length !== 4);
            else if (v.test === "numeric") fail = (val === "" || isNaN(val));
            if (fail) {
              addLine(v.label || "Error", "error", interpolate(v.text, vars));
              showError(interpolate(v.modal || v.text, vars));
              stopped = true;
              return;
            }
          }
        });

        // 조회 + 출력
        schedule(function () {
          if (stopped) return;
          if (config.selectStep) addLine(config.selectStep.label, config.selectStep.type || "event", interpolate(config.selectStep.text, vars));
          var rows = (config.db || []).filter(function (row) {
            var ok = true;
            Object.keys(config.match || {}).forEach(function (col) {
              var fieldKey = config.match[col];
              var want = vars[fieldKey];
              if (want === undefined || want === "") return; // 미입력 컬럼은 필터 제외
              var cell = String(row[col]);
              if (config.matchOp === "contains") { if (cell.indexOf(want) === -1) ok = false; }
              else { if (cell !== String(want)) ok = false; }
            });
            return ok;
          });
          vars.count = rows.length;
          if (config.selectResult) addLine(config.selectResult.label || "SELECT", "info", interpolate(config.selectResult.text, vars));

          schedule(function () {
            if (config.endStep) addLine(config.endStep.label, config.endStep.type || "event", interpolate(config.endStep.text, vars));
            if (rows.length > 0) {
              var th = (config.columns || []).map(function (c) { return "<th>" + c.head + "</th>"; }).join("");
              var body = rows.map(function (r) {
                return "<tr>" + (config.columns || []).map(function (c) { return "<td>" + r[c.key] + "</td>"; }).join("") + "</tr>";
              }).join("");
              logEl.innerHTML += '<div class="sap-log-line info"><table class="sap-alv-table"><thead><tr>' + th + "</tr></thead><tbody>" + body + "</tbody></table></div>";
            } else {
              logEl.innerHTML += '<div class="sap-log-line error">' + (config.emptyText || "조회 결과가 없습니다. (SY-SUBRC = 4)") + "</div>";
            }
          });
        });
      });
    });
  }

  /* ---------- 6b. 카드 분류 퀴즈 (여러 카드를 그룹으로) ---------- */
  function initCardSort(root) {
    root.querySelectorAll(".card-sort").forEach(function (cs) {
      var pool = cs.querySelector(".cardsort-pool");
      var zones = cs.querySelectorAll(".cardsort-zone");
      var feedback = cs.querySelector(".cardsort-feedback");
      var dragged = null;
      cs.querySelectorAll(".drag-item").forEach(function (item) {
        item.addEventListener("dragstart", function () { dragged = item; item.classList.add("dragging"); });
        item.addEventListener("dragend", function () { item.classList.remove("dragging"); });
      });
      function bindZone(z) {
        z.addEventListener("dragover", function (e) { e.preventDefault(); z.classList.add("drag-over"); });
        z.addEventListener("dragleave", function () { z.classList.remove("drag-over"); });
        z.addEventListener("drop", function () { z.classList.remove("drag-over"); if (dragged) z.appendChild(dragged); });
      }
      bindZone(pool);
      zones.forEach(bindZone);
      cs.addEventListener("click", function (e) {
        if (e.target.classList.contains("drag-item") && e.target.parentElement !== pool) pool.appendChild(e.target);
      });
      var btn = cs.querySelector("[data-cardsort-check]");
      if (btn) btn.addEventListener("click", function () {
        var total = 0, correct = 0;
        zones.forEach(function (z) {
          z.querySelectorAll(".drag-item").forEach(function (item) {
            total++;
            if (item.getAttribute("data-cat") === z.getAttribute("data-cat")) correct++;
          });
        });
        var inPool = pool.querySelectorAll(".drag-item").length;
        if (!feedback) return;
        if (inPool > 0) { feedback.className = "cardsort-feedback puzzle-feedback error"; feedback.innerHTML = "❌ 아직 분류하지 않은 카드가 " + inPool + "장 있습니다."; }
        else if (correct === total) { feedback.className = "cardsort-feedback puzzle-feedback success"; feedback.innerHTML = cs.getAttribute("data-success") || "🎉 <strong>모두 정확히 분류했습니다!</strong>"; triggerConfetti(); }
        else { feedback.className = "cardsort-feedback puzzle-feedback error"; feedback.innerHTML = "❌ " + total + "장 중 " + correct + "장만 올바른 그룹입니다. 다시 시도하세요."; }
      });
    });
  }

  /* ---------- 7. 플래시카드 ---------- */
  function initFlashcards(root) {
    root.querySelectorAll(".flashcard").forEach(function (card) {
      card.addEventListener("click", function () { card.classList.toggle("flipped"); });
    });
  }

  /* ---------- 8. 체크리스트 진행률 ---------- */
  function initChecklist(root) {
    root.querySelectorAll(".checklist").forEach(function (list) {
      var boxes = list.querySelectorAll('input[type="checkbox"]');
      var progress = list.parentElement.querySelector(".checklist-progress");
      function update() {
        var done = list.querySelectorAll('input[type="checkbox"]:checked').length;
        if (progress) progress.textContent = "진행: " + done + " / " + boxes.length + (done === boxes.length ? " ✅ 모든 항목 통과!" : "");
      }
      boxes.forEach(function (b) { b.addEventListener("change", update); });
      update();
    });
  }

  /* ---------- 9. 의사결정 트리 ---------- */
  function initDecision(root) {
    root.querySelectorAll(".decision-box").forEach(function (box) {
      var config = parseJSON(box.querySelector(".decision-config"));
      if (!config) return;
      var select = box.querySelector("select");
      var btn = box.querySelector("button");
      var result = box.querySelector(".decision-result");
      function show() {
        result.innerHTML = config[select.value] || "선택지를 골라주세요.";
        result.classList.add("show");
      }
      if (btn) btn.addEventListener("click", show);
      select.addEventListener("change", show);
    });
  }

  /* ---------- 10. 단답형 / 빈칸 채우기 ---------- */
  function initShortAnswer(root) {
    root.querySelectorAll("[data-answer-check]").forEach(function (group) {
      var btn = group.querySelector("[data-check]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var inputs = group.querySelectorAll("input[data-answer]");
        var out = group.querySelector("[data-result]");
        var allOk = true;
        inputs.forEach(function (inp) {
          var ok = inp.value.trim().toLowerCase() === inp.getAttribute("data-answer").toLowerCase();
          if (!ok) allOk = false;
        });
        if (out) {
          out.textContent = allOk ? "✅ 정답입니다! " + (group.getAttribute("data-explain") || "")
                                  : "❌ 다시 확인하세요. " + (group.getAttribute("data-hint") || "");
          out.className = (out.className.replace(/\b(ok|bad)\b/g, "")).trim() + (allOk ? " ok" : " bad");
        }
      });
    });
  }

  /* ---------- 11. 미니 시험 ---------- */
  function initExam(root) {
    root.querySelectorAll(".exam").forEach(function (exam) {
      var btn = exam.querySelector("[data-exam-check]");
      var out = exam.querySelector(".exam-output");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var questions = exam.querySelectorAll(".exam-q");
        var score = 0;
        questions.forEach(function (q) {
          var name = q.getAttribute("data-q");
          var checked = exam.querySelector('input[name="' + name + '"]:checked');
          if (checked && checked.value === q.getAttribute("data-correct")) score++;
        });
        if (out) {
          var full = score === questions.length;
          out.textContent = score + " / " + questions.length + "점 — " + (full ? "만점! 해설을 한 번 더 읽고 마무리하세요." : "틀린 문항은 해설을 펼쳐 다시 회수하세요.");
          out.className = "exam-output " + (full ? "ok" : "bad");
        }
      });
    });
  }

  /* ---------- 12. 코드 복사 버튼 ---------- */
  function initCopy(root) {
    root.querySelectorAll(".shiki-copy-button").forEach(function (btn) {
      if (btn.dataset.bound === "true") return;
      btn.dataset.bound = "true";
      btn.addEventListener("click", function () {
        var wrapper = btn.closest(".shiki-copy-wrapper");
        if (!wrapper) return;
        var code = wrapper.querySelector("code") || wrapper.querySelector("pre");
        if (!code) return;
        var original = btn.dataset.original || btn.textContent;
        btn.dataset.original = original;
        var text = code.innerText;
        var done = function () {
          btn.textContent = "✓ Copied!"; btn.classList.add("is-copied");
          setTimeout(function () { btn.textContent = original; btn.classList.remove("is-copied"); }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(done);
        else done();
      });
    });
  }

  
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
})();
