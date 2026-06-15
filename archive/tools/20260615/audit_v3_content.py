import os
import re

base_dir = r"c:\ui5\study\sapui5\sample\learning-methods-v3"
dirs_to_check = ["foundations", "visuals", "code-learning", "interactive", "quizzes", "capstone"]

for d in dirs_to_check:
    full_d = os.path.join(base_dir, d)
    if os.path.exists(full_d):
        for f in os.listdir(full_d):
            if f.endswith(".html"):
                full_path = os.path.join(full_d, f)
                with open(full_path, "r", encoding="utf-8") as file:
                    content = file.read()
                
                # Check for bad HTML structure
                has_layout = '<main class="layout">' in content
                
                # Try to extract the example text
                match = re.search(r'<article class="method-example[^>]*>(.*?)</article>', content, re.DOTALL)
                if match:
                    example_html = match.group(1)
                    # Strip tags
                    example_text = re.sub(r'<[^>]+>', '', example_html)
                    example_text = " ".join(example_text.split())
                    preview = example_text[:100]
                else:
                    preview = "NO <article class='method-example'> FOUND"
                    
                safe_preview = preview.encode('ascii', 'ignore').decode('ascii')
                print(f"[{d}/{f}] Layout: {has_layout} | Preview: {safe_preview}")
