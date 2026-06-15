import os

path = r'c:\ui5\study\sapui5\sample\learning-methods-v3\assets\sandbox.js'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start of initCopy (if it exists) or end of initExam
init_exam_idx = -1
for i, l in enumerate(lines):
    if 'function initExam(root)' in l:
        init_exam_idx = i
        break

# Find the end of initExam block
end_idx = init_exam_idx
open_braces = 0
found_first_brace = False
for i in range(init_exam_idx, len(lines)):
    l = lines[i]
    open_braces += l.count('{')
    open_braces -= l.count('}')
    if '{' in l:
        found_first_brace = True
    if found_first_brace and open_braces == 0:
        end_idx = i
        break

# The valid code is up to end_idx + 1
valid_lines = lines[:end_idx + 1]

# Now append the correct initCopy and initAbapEditorCopy
append_str = """

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

  /* ---------- 13. 코드 투어 아코디언 전용 복사 버튼 ---------- */
  function initAbapEditorCopy(root) {
    // 이미 일반 복사 버튼(.shiki-copy-wrapper)이 있는 에디터와 충돌 방지
    root.querySelectorAll(".code-tour-container.abap-editor-mockup").forEach(function(mockup) {
      var header = mockup.querySelector(".abap-editor-header");
      if (!header || header.querySelector(".shiki-copy-button")) return;
      
      var btn = document.createElement("button");
      btn.className = "shiki-copy-button abap-copy-btn";
      btn.textContent = "Copy";
      btn.style.marginLeft = "auto";
      
      header.appendChild(btn);
      
      btn.addEventListener("click", function() {
        var lines = mockup.querySelectorAll(".editor-line-content > code");
        var codeTextArray = [];
        lines.forEach(function(codeEl) {
          var clone = codeEl.cloneNode(true);
          clone.querySelectorAll(".tour-icon").forEach(function(ic) { ic.remove(); });
          codeTextArray.push(clone.textContent.replace(/\\u00a0/g, ' '));
        });
        var fullCode = codeTextArray.join("\\n");
        
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

"""

new_content = "".join(valid_lines) + append_str
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed sandbox.js successfully.")
