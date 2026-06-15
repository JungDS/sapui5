import os
import re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []

    def handle_data(self, data):
        data = data.strip()
        if data:
            self.text.append(data)

def get_text_from_html(html):
    parser = TextExtractor()
    parser.feed(html)
    return " ".join(parser.text)

base_dir = r"c:\ui5\study\sapui5\sample\learning-methods-v3"
dirs_to_check = ["foundations", "visuals", "code-learning", "interactive", "quizzes", "capstone"]

all_files = []
for d in dirs_to_check:
    full_d = os.path.join(base_dir, d)
    if os.path.exists(full_d):
        for f in os.listdir(full_d):
            if f.endswith(".html"):
                all_files.append(os.path.join(d, f))

print(f"Total HTML files found in subdirectories: {len(all_files)}")

# Also read index.html to see if any hrefs are not in all_files (404)
index_file = os.path.join(base_dir, "index.html")
missing_files = []
if os.path.exists(index_file):
    with open(index_file, "r", encoding="utf-8") as f:
        idx_content = f.read()
    hrefs = set(re.findall(r'href="([^"]+\.html)"', idx_content))
    for h in hrefs:
        if not h.startswith("http") and h not in all_files:
            missing_files.append(h)

suspicious_files = []
todo_keywords = ["TODO", "Lorem", "TBD", "미구현", "작성 예정", "임시", "내용 없음", "dummy"]

for rel_path in all_files:
    full_path = os.path.join(base_dir, rel_path)
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    text_content = get_text_from_html(content)
    
    found_keywords = [kw for kw in todo_keywords if kw.lower() in text_content.lower()]
    
    if len(text_content) < 200:
        found_keywords.append("TOO_SHORT")
        
    if "variants.js" not in content and "variants.css" not in content:
        found_keywords.append("NO_VARIANTS_JS_CSS")
        
    if "dashboard-card" in content or "ABAP Editor Mockup" in content:
        pass # Just normal
        
    if found_keywords:
        suspicious_files.append((rel_path, found_keywords, len(text_content)))

print("\n=== MISSING FILES (404) ===")
for m in missing_files:
    print(f"- {m}")

print("\n=== SUSPICIOUS/UNIMPLEMENTED FILES ===")
for s, kws, tlen in suspicious_files:
    print(f"- {s} | Issues: {kws} | Text Length: {tlen} chars")

print("\nAudit Script Complete.")
