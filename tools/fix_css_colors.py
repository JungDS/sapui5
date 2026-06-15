import re
import os

css_path = r"c:\ui5\study\sapui5\sample\learning-methods-v3\assets\variants.css"

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# 1. Remove ::after badges
css = re.sub(r"\.method-example\.variant-[ABC]::after\s*\{[^}]+\}", "", css)

# 2. Change Variant B colors (yellow/cream -> blue/gray/white)
# Variant B base
css = css.replace("background: #fef9f0 !important;", "background: #ffffff !important;")
css = css.replace("border: 1.5px solid #f5e6c8 !important;", "border: 1.5px solid #e2e8f0 !important;")
css = css.replace("box-shadow: 0 2px 12px rgba(217,119,6,0.10) !important;", "box-shadow: 0 2px 12px rgba(15,23,42,0.06) !important;")

# other yellows
css = css.replace("#f5e6c8", "#cbd5e1")
css = css.replace("#fef3c7", "#f8fafc")
css = css.replace("#fef9f0", "#ffffff")
css = css.replace("#d97706", "#3b82f6")
css = css.replace("#b45309", "#1e293b")
css = css.replace("rgba(217,119,6,", "rgba(15,23,42,")

# 3. Change Variant C colors (purple/lavender -> slate/blue)
# Variant C base
css = css.replace("background: #fdfcff !important;", "background: #f8fafc !important;")
css = css.replace("border: 1px solid #ddd6fe !important;", "border: 1px solid #cbd5e1 !important;")
css = css.replace("box-shadow: 0 8px 24px rgba(139,92,246,0.08) !important;", "box-shadow: 0 8px 24px rgba(37,99,235,0.06) !important;")

# other purples
css = css.replace("#ddd6fe", "#cbd5e1")
css = css.replace("#ede9fe", "#f1f5f9")
css = css.replace("#fdfcff", "#ffffff")
css = css.replace("#f3e8ff", "#eff6ff")
css = css.replace("#8b5cf6", "#3b82f6")
css = css.replace("#7e22ce", "#1d4ed8")
css = css.replace("#5b21b6", "#1e3a8a")
css = css.replace("rgba(139,92,246,", "rgba(37,99,235,")
css = css.replace("#4c1d95", "#0f172a")
css = css.replace("#c4b5fd", "#94a3b8")
css = css.replace("#a855f7", "#64748b")
css = css.replace("#e9d5ff", "#e2e8f0")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)

print("CSS color and badge updates completed.")
