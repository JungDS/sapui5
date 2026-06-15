"""
fix_variant_panel.py
모든 v3 HTML 페이지의 variant-panel 마크업을 새 칩 디자인으로 업데이트합니다.

변경 내용:
  - label에 variant-chip-a/b/c 클래스 추가
  - Variant 설명 텍스트 업데이트 (B: Notion, C: 파스텔)
  - position: relative 가 method-example에 적용되도록 확인
"""
import os
import re
import glob

V3_ROOT = r"c:\ui5\study\sapui5\sample\learning-methods-v3"
CATEGORIES = ["foundations", "visuals", "code-learning", "interactive", "quizzes", "capstone"]

changed = 0
errors = 0

# variant-panel 내부의 세 라디오 label을 교체하는 패턴
# 기존 패턴: <label><input type="radio" name="..." value="A"> Variant A (기본)</label>
# 새 패턴:   <label class="variant-chip-a"><input ...> 🔵 A — 기본</label>

def replace_variant_panel(content):
    """
    variant-options 안의 세 label을 칩 클래스가 달린 버전으로 교체.
    name 속성값은 페이지마다 다르므로 정규식으로 캡처 후 재삽입.
    """
    def replace_options(m):
        # m.group(1): name 속성값
        name = m.group(1)
        return (
            f'<div class="variant-options">\n'
            f'        <label class="variant-chip-a"><input type="radio" name="{name}" value="A"> 🔵 A — 기본</label>\n'
            f'        <label class="variant-chip-b"><input type="radio" name="{name}" value="B"> 🟡 B — Notion</label>\n'
            f'        <label class="variant-chip-c"><input type="radio" name="{name}" value="C"> 🟣 C — 파스텔</label>\n'
            f'      </div>'
        )

    # <div class="variant-options"> ... </div> 전체를 교체
    pattern = re.compile(
        r'<div class="variant-options">.*?</div>',
        re.DOTALL
    )
    # name 추출: 첫 번째 input의 name 속성
    name_match = re.search(r'name="([^"]+)"', content)
    if not name_match:
        return content  # variant-panel 없는 경우

    name_val = name_match.group(1)

    def sub(m):
        return (
            '<div class="variant-options">\n'
            f'        <label class="variant-chip-a"><input type="radio" name="{name_val}" value="A"> 🔵 A — 기본</label>\n'
            f'        <label class="variant-chip-b"><input type="radio" name="{name_val}" value="B"> 🟡 B — Notion</label>\n'
            f'        <label class="variant-chip-c"><input type="radio" name="{name_val}" value="C"> 🟣 C — 파스텔</label>\n'
            '      </div>'
        )

    new_content = pattern.sub(sub, content)
    return new_content

all_pages = []
for cat in CATEGORIES:
    all_pages += sorted(glob.glob(os.path.join(V3_ROOT, cat, "*.html")))

print(f"처리 대상: {len(all_pages)}개\n")

for fpath in all_pages:
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        if 'variant-panel' not in content:
            print(f"  [스킵] {os.path.relpath(fpath, V3_ROOT)} (variant-panel 없음)")
            continue

        new_content = replace_variant_panel(content)

        if new_content != content:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_content)
            changed += 1
            print(f"  [수정] {os.path.relpath(fpath, V3_ROOT)}")
        else:
            print(f"  [변경없음] {os.path.relpath(fpath, V3_ROOT)}")

    except Exception as e:
        errors += 1
        print(f"  [오류] {fpath}: {e}")

print(f"\n완료: 수정={changed}개, 오류={errors}개")

# Spot-check
spot = os.path.join(V3_ROOT, "foundations", "callout-patterns.html")
with open(spot, "r", encoding="utf-8") as f:
    head = f.read(800)
print("\n[Spot-check] callout-patterns.html variant-options 구간:")
m = re.search(r'<div class="variant-options">.*?</div>', head, re.DOTALL)
if m:
    print(m.group(0))
else:
    print("  variant-options 구간을 찾지 못함 (첫 800자 이내에 없음)")
