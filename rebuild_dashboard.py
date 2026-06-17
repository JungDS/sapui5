import os
import re

base_dir = r"c:\ui5\study\sapui5\sample\learning-methods-v3"
dirs_to_check = {
    "foundations": "1. Foundations (기초 구성)",
    "visuals": "2. Visuals (시각화 자료)",
    "code-learning": "3. Code Learning (코드 학습)",
    "interactive": "4. Interactive (상호작용)",
    "quizzes": "5. Quizzes (퀴즈/평가)",
    "capstone": "6. Capstone (종합 프로젝트)"
}

html_output = ""

for dir_name, section_title in dirs_to_check.items():
    full_dir = os.path.join(base_dir, dir_name)
    if not os.path.exists(full_dir):
        continue
    
    html_output += f'  <div class="category-section">\n'
    html_output += f'    <h2 class="category-title">{section_title}</h2>\n'
    html_output += f'    <div class="dashboard-grid">\n'
    
    for f in os.listdir(full_dir):
        if not f.endswith(".html"):
            continue
            
        file_path = os.path.join(full_dir, f)
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            
        # Extract title
        title_match = re.search(r'<h1>(.*?)</h1>', content)
        h1_title = title_match.group(1) if title_match else f.replace('.html', '')
        
        # Extract topic/eyebrow
        eyebrow_match = re.search(r'<p class="eyebrow">(.*?)</p>', content)
        topic = eyebrow_match.group(1) if eyebrow_match else dir_name.capitalize()
        
        # Extract lead/description
        lead_match = re.search(r'<p class="lead">(.*?)</p>', content)
        desc = lead_match.group(1) if lead_match else ""
        if len(desc) > 80:
            desc = desc[:77] + "..."
            
        html_output += f'      <a href="{dir_name}/{f}" class="method-example dashboard-card">\n'
        html_output += f'        <p class="ex-topic">{topic}</p>\n'
        html_output += f'        <h3>{h1_title}</h3>\n'
        html_output += f'        <p class="ex-desc">{desc}</p>\n'
        html_output += f'      </a>\n'
        
    html_output += f'    </div>\n'
    html_output += f'  </div>\n\n'

index_path = os.path.join(base_dir, "index.html")
with open(index_path, "r", encoding="utf-8") as file:
    index_content = file.read()

# We need to replace everything from <div class="category-section"> to the end of <main class="layout">
start_idx = index_content.find('<div class="category-section">')
end_idx = index_content.find('</main>')

if start_idx != -1 and end_idx != -1:
    new_index_content = index_content[:start_idx] + html_output + index_content[end_idx:]
    with open(index_path, "w", encoding="utf-8") as file:
        file.write(new_index_content)
    print("Dashboard updated successfully with all 44 files.")
else:
    print("Could not find insertion points.")
