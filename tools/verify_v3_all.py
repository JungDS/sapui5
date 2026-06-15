"""
verify_v3_all.py
v3 전체 44개 HTML 파일의 CSS/JS 경로 정확성을 정적으로 전수 검사합니다.

판단 기준:
  OK  : ../assets/base.css 참조 있고, ../../assets/ 잔존 없음
  FAIL: ../../assets/ 잔존 혹은 ../assets/ 누락
  WARN: JS script 태그 누락 등 부분 문제
"""
import os
import glob
import re

V3_ROOT = r"c:\ui5\study\sapui5\sample\learning-methods-v3"
CATEGORIES = ["foundations", "visuals", "code-learning", "interactive", "quizzes", "capstone"]

CSS_MODULES   = ["base.css", "widgets.css", "quiz.css", "variants.css"]
JS_MODULES    = ["core.js", "widgets.js", "quiz.js", "sandbox.js", "variants.js"]

results = {"OK": [], "FAIL": [], "WARN": []}

all_pages = []
for cat in CATEGORIES:
    pages = sorted(glob.glob(os.path.join(V3_ROOT, cat, "*.html")))
    all_pages.extend(pages)

print(f"전수 검사 대상: {len(all_pages)}개\n")
print(f"{'파일':55} {'CSS':4} {'JS':4} {'상태'}")
print("-" * 75)

for fpath in all_pages:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    rel = os.path.relpath(fpath, V3_ROOT)

    # CSS 체크
    css_ok = all(f"../assets/{m}" in content for m in CSS_MODULES)
    css_wrong = "../../assets/" in content

    # JS 체크
    js_ok = all(f"../assets/{m}" in content for m in JS_MODULES)
    js_wrong = "../../assets/method-samples.js" in content or "../../assets/core.js" in content

    # 판정
    if css_ok and js_ok and not css_wrong and not js_wrong:
        status = "OK"
    elif not css_ok or css_wrong or js_wrong:
        status = "FAIL"
    else:
        status = "WARN"

    results[status].append(rel)
    css_mark = "O" if (css_ok and not css_wrong) else "X"
    js_mark  = "O" if (js_ok and not js_wrong) else "X"
    print(f"{rel:55} {css_mark:4} {js_mark:4} {status}")

print(f"\n{'='*75}")
print(f"[결과] OK={len(results['OK'])}  WARN={len(results['WARN'])}  FAIL={len(results['FAIL'])}")
print(f"{'='*75}")

if results["FAIL"]:
    print("\n[FAIL 목록 - 즉시 수정 필요]")
    for f in results["FAIL"]:
        print(f"  - {f}")
if results["WARN"]:
    print("\n[WARN 목록 - 점검 필요]")
    for f in results["WARN"]:
        print(f"  - {f}")

# index.html 별도 검사
idx = os.path.join(V3_ROOT, "index.html")
with open(idx, "r", encoding="utf-8") as f:
    idx_c = f.read()
idx_css = all(f"assets/{m}" in idx_c for m in CSS_MODULES)
idx_old = "method-samples.css" in idx_c
print(f"\n[index.html] 모듈 CSS 참조={idx_css} / 구형 단일 CSS 잔존={idx_old}")
