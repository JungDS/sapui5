import os

base_dir = r"c:\ui5\study\sapui5\sample\learning-methods-v3"
html_dirs = ["foundations", "visuals", "code-learning", "interactive", "quizzes", "capstone"]
assets = ["base.css", "widgets.css", "quiz.css", "variants.css", "core.js", "widgets.js", "quiz.js", "sandbox.js", "variants.js"]

html_header = """<!-- 
  [STANDARD_V3_STRUCTURE] 
  이 파일은 고품질 교육용 웹페이지 표준 구조(v3)를 따릅니다.
  AI 일괄 처리 및 스크립트 자동화의 대상이므로 코어 레이아웃과 클래스 명칭을 임의로 변경하지 마십시오.
-->
"""

css_js_header = """/* 
  [STANDARD_V3_STRUCTURE] 
  이 파일은 고품질 교육용 웹페이지 표준 구조(v3)를 따릅니다.
  AI 일괄 처리 및 스크립트 자동화의 대상이므로 코어 레이아웃과 클래스 명칭을 임의로 변경하지 마십시오.
*/
"""

files_to_process = []

# 1. HTML files in subdirs
for d in html_dirs:
    full_d = os.path.join(base_dir, d)
    if os.path.exists(full_d):
        for f in os.listdir(full_d):
            if f.endswith(".html"):
                files_to_process.append((os.path.join(full_d, f), html_header))

# 2. index.html
files_to_process.append((os.path.join(base_dir, "index.html"), html_header))

# 3. CSS/JS files
for a in assets:
    files_to_process.append((os.path.join(base_dir, "assets", a), css_js_header))

count = 0
for filepath, header in files_to_process:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()
        
        if "[STANDARD_V3_STRUCTURE]" not in content:
            # For HTML, we should ideally put it after <!DOCTYPE html> if it exists
            if filepath.endswith(".html") and content.strip().startswith("<!DOCTYPE html>"):
                new_content = content.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + header, 1)
            else:
                new_content = header + content
                
            with open(filepath, "w", encoding="utf-8") as file:
                file.write(new_content)
            count += 1
            print(f"Added header to: {os.path.relpath(filepath, base_dir)}")

print(f"Successfully added standard headers to {count} files.")
