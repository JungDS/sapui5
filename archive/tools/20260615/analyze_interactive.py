import os
import glob
from bs4 import BeautifulSoup

def analyze_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    for script in soup(["script", "style", "nav", "header", "div.variant-panel"]):
        script.extract()
        
    text = soup.get_text(separator=' ', strip=True)
    issues = []
    
    if "Lorem" in text or "lorem" in text:
        issues.append("Lorem Ipsum 더미 텍스트 발견")
    if "TBD" in text or "TODO" in text:
        issues.append("TBD/TODO 미완성 텍스트 발견")
        
    examples = soup.find_all(class_='method-example')
    if not examples:
        issues.append("핵심 예시 컨테이너(.method-example) 누락")
    else:
        for ex in examples:
            if len(ex.get_text(strip=True)) < 50:
                issues.append("콘텐츠가 너무 빈약한 예시 발견 (< 50자)")
                
    classes = set()
    for tag in soup.find_all(True):
        if tag.get('class'):
            for c in tag.get('class'):
                if c.startswith('interactive-') or 'debugger' in c or 'sandbox' in c or 'tabs' in c or 'split' in c or 'terminal' in c or 'shortcut' in c:
                    classes.add(c)
                
    return {
        "text_len": len(text),
        "issues": issues,
        "components": list(classes)
    }

base_dir = r"c:\ui5\study\sapui5\sample\learning-methods-v3"
files = glob.glob(os.path.join(base_dir, "interactive", "*.html"))

print("=== Phase 4 (Interactive) 파일 콘텐츠 및 컴포넌트 분석 ===")
all_components = set()
for f in files:
    res = analyze_html(f)
    name = os.path.basename(f)
    issue_str = ", ".join(res['issues']) if res['issues'] else "문제 없음 (정상 데이터)"
    for c in res['components']:
        all_components.add(c)
    print(f"📄 {name:30} | 글자수: {res['text_len']:4} | 상태: {issue_str}")

print("\n[수집된 주요 컴포넌트]")
print(", ".join(sorted(list(all_components))))
