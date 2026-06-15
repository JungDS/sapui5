"""
fix_v3_paths.py
v3 서브페이지 HTML의 잘못된 ../../assets/ 경로를 ../assets/ 로 일괄 수정합니다.

경로 오류 원인:
  foundations/callout-patterns.html에서 ../../assets/ 는
  sample/ 폴더까지 올라가 버리므로 CSS를 찾을 수 없음.
  올바른 경로: ../assets/ (learning-methods-v3/assets/ 를 가리킴)

대상: v3 폴더 하위 모든 .html (index.html 제외)
"""
import os
import re
import glob

V3_ROOT = r"c:\ui5\study\sapui5\sample\learning-methods-v3"

changed = 0
errors  = 0
verified_ok = 0

# 서브페이지: foundations/, visuals/, code-learning/, interactive/, quizzes/, capstone/
sub_pages = []
for cat in ["foundations", "visuals", "code-learning", "interactive", "quizzes", "capstone"]:
    sub_pages += glob.glob(os.path.join(V3_ROOT, cat, "*.html"))

print(f"대상 파일 수: {len(sub_pages)}개\n")

for fpath in sorted(sub_pages):
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        original = content

        # ../../assets/ → ../assets/ (CSS 및 JS 경로 모두)
        content = content.replace("../../assets/", "../assets/")

        if content != original:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            changed += 1
            rel = os.path.relpath(fpath, V3_ROOT)
            print(f"  [수정] {rel}")
        else:
            rel = os.path.relpath(fpath, V3_ROOT)
            print(f"  [스킵] {rel} (변경 없음)")

    except Exception as e:
        errors += 1
        print(f"  [오류] {fpath}: {e}")

print(f"\n{'='*55}")
print(f"완료: 수정={changed}개, 오류={errors}개")
print(f"{'='*55}")

# ── Spot-check: 대표 파일 5개 ──────────────────────────────
print("\n[Spot-check] 카테고리별 대표 파일 경로 확인:")
checks = [
    ("foundations/callout-patterns.html",           "../assets/base.css"),
    ("visuals/mermaid-flowchart.html",              "../assets/base.css"),
    ("code-learning/code-keyword-accordion.html",   "../assets/base.css"),
    ("interactive/step-debugger-timeline.html",     "../assets/base.css"),
    ("quizzes/drag-drop-quiz.html",                 "../assets/base.css"),
]

all_ok = True
for rel, expected in checks:
    fpath = os.path.join(V3_ROOT, rel)
    if not os.path.exists(fpath):
        print(f"  [없음] {rel}")
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        head = f.read(800)  # 처음 800자만 읽어 head 확인
    has_correct = expected in head
    has_wrong   = "../../assets/" in head
    status = "OK" if (has_correct and not has_wrong) else "FAIL"
    if status == "FAIL":
        all_ok = False
    print(f"  [{status}] {rel}")
    print(f"         ../assets/ 참조: {'O' if has_correct else 'X'}")
    print(f"         ../../assets/ 잔존: {'X (오류!)' if has_wrong else 'O (없음)'}")

print(f"\n최종 결과: {'전체 정상' if all_ok else '일부 파일 재확인 필요'}")

# ── index.html 확인 (assets/ 그대로여야 함) ────────────────
idx = os.path.join(V3_ROOT, "index.html")
with open(idx, "r", encoding="utf-8") as f:
    idx_head = f.read(600)
print(f"\n[index.html] assets/base.css 참조: {'O' if 'assets/base.css' in idx_head else 'X'}")
print(f"[index.html] ../assets/ 오염: {'X (오류!)' if '../assets/' in idx_head else 'O (없음)'}")
