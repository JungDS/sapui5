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
                
                # Replace all <div class="abap-editor-title">XYZ</div> with <div class="abap-editor-title">ABAP</div>
                new_content = re.sub(r'<div class="abap-editor-title">.*?</div>', r'<div class="abap-editor-title">ABAP</div>', content)
                
                if new_content != content:
                    with open(full_path, "w", encoding="utf-8") as file:
                        file.write(new_content)
                    print(f"Updated {f}")

print("Title update complete.")
