/* 
  [STANDARD_V3_STRUCTURE] 
  이 파일은 고품질 교육용 웹페이지 표준 구조(v3)를 따릅니다.
  AI 일괄 처리 및 스크립트 자동화의 대상이므로 코어 레이아웃과 클래스 명칭을 임의로 변경하지 마십시오.
*/
/* ============================================================
   sandbox.js — initDebugger, initSandbox
   [모듈 목차] 이 파일에 없는 함수는 다른 모듈에 추가하세요.
   중복 추가 전 반드시 이 파일 전체를 먼저 확인하십시오.
   ============================================================ */

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

  /* ---------- 13. ABAP 에디터 목업 자동 복사 버튼 ---------- */
  function initAbapEditorCopy(root) {
    // 이미 일반 복사 버튼(.shiki-copy-button)이 있는 에디터와 충돌 방지
    root.querySelectorAll(".abap-editor-mockup").forEach(function(mockup) {
      var header = mockup.querySelector(".abap-editor-header");
      if (!header || mockup.querySelector(".shiki-copy-button")) return;
      
      var btn = document.createElement("button");
      btn.className = "shiki-copy-button abap-copy-btn";
      btn.textContent = "Copy";
      
      var actionsWrapper = document.createElement("div");
      actionsWrapper.className = "abap-editor-actions";
      actionsWrapper.style.marginLeft = "10px";
      actionsWrapper.appendChild(btn);
      
      header.appendChild(actionsWrapper);
      
      btn.addEventListener("click", function() {
        var fullCode = "";
        
        // 1) Code-tour 구조 (.editor-line-content > code)
        var lineNodes = mockup.querySelectorAll(".editor-line-content > code");
        if (lineNodes.length > 0) {
          var codeTextArray = [];
          lineNodes.forEach(function(codeEl) {
            var clone = codeEl.cloneNode(true);
            clone.querySelectorAll(".tour-icon").forEach(function(ic) { ic.remove(); });
            codeTextArray.push(clone.textContent.replace(/\u00a0/g, ' '));
          });
          fullCode = codeTextArray.join("\n");
        } else {
          // 2) 일반 구조 (.abap-editor-code)
          var codeBlock = mockup.querySelector(".abap-editor-code");
          if (codeBlock) {
             var clone = codeBlock.cloneNode(true);
             fullCode = clone.textContent.replace(/\u00a0/g, ' ');
          }
        }
        
        var original = btn.textContent;
        var done = function() {
          btn.textContent = "✓ Copied!";
          btn.classList.add("is-copied");
          setTimeout(function() { btn.textContent = original; btn.classList.remove("is-copied"); }, 2000);
        };
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(fullCode).then(done).catch(done);
        } else {
          done();
        }
      });
    });
  }

