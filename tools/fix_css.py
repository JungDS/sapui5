import os

file_path = r"c:\ui5\study\sapui5\sample\learning-methods-v3\assets\variants.css"

with open(file_path, 'rb') as f:
    content_bytes = f.read()

# Try to decode with utf-8, replace bad chars
content = content_bytes.decode('utf-8', errors='replace')

# The broken Korean characters from the Add-Content
# Let's fix the specific rule that breaks the editor
target_rule1 = ".method-example.variant-B .code-tour-container {"
replacement1 = ".method-example.variant-B .code-tour-container:not(.abap-editor-mockup) {"

target_rule2 = ".method-example.variant-B .code-tour-container .abap-editor-mockup {"
replacement2 = ".method-example.variant-B .code-tour-container:not(.abap-editor-mockup) .abap-editor-mockup {"

target_rule3 = ".method-example.variant-B .code-tour-container .tour-accordion-wrapper {"
replacement3 = ".method-example.variant-B .code-tour-container:not(.abap-editor-mockup) .tour-accordion-wrapper {"

if target_rule1 in content:
    content = content.replace(target_rule1, replacement1)
if target_rule2 in content:
    content = content.replace(target_rule2, replacement2)
if target_rule3 in content:
    content = content.replace(target_rule3, replacement3)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed variants.css encoding and rules.")
