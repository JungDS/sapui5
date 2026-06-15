/* 
  [STANDARD_V3_STRUCTURE] 
  이 파일은 고품질 교육용 웹페이지 표준 구조(v3)를 따릅니다.
  AI 일괄 처리 및 스크립트 자동화의 대상이므로 코어 레이아웃과 클래스 명칭을 임의로 변경하지 마십시오.
*/
/* ============================================================
   quiz.js — initPuzzle, initCardSort 등 퀴즈 계열
   [모듈 목차] 이 파일에 없는 함수는 다른 모듈에 추가하세요.
   중복 추가 전 반드시 이 파일 전체를 먼저 확인하십시오.
   ============================================================ */

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

