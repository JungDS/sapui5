"""
fix_v3_refs.py
v3 모든 HTML 페이지의 CSS/JS 참조를 분리된 모듈 파일로 교체합니다.

변경 내용:
  Before:
    <link rel="stylesheet" href="../../assets/method-samples.css">
    <script src="../../assets/method-samples.js"></script>

  After:
    <link rel="stylesheet" href="../../assets/base.css">
    <link rel="stylesheet" href="../../assets/widgets.css">
    <link rel="stylesheet" href="../../assets/quiz.css">
    <link rel="stylesheet" href="../../assets/variants.css">
    ...
    <script src="../../assets/core.js"></script>
    <script src="../../assets/widgets.js"></script>
    <script src="../../assets/quiz.js"></script>
    <script src="../../assets/sandbox.js"></script>
    <script src="../../assets/variants.js"></script>

또한 index.html 의 CSS 누락 문제도 함께 수정합니다.
"""
import os
import re
import glob

V3_ROOT = r"c:\ui5\study\sapui5\sample\learning-methods-v3"

# 서브페이지용 (foundations/, visuals/ 등 2단계 깊이 → ../../assets/)
SUB_CSS_OLD   = r'<link rel="stylesheet" href="../../assets/method-samples.css">'
SUB_CSS_NEW   = (
    '<link rel="stylesheet" href="../../assets/base.css">\n'
    '<link rel="stylesheet" href="../../assets/widgets.css">\n'
    '<link rel="stylesheet" href="../../assets/quiz.css">\n'
    '<link rel="stylesheet" href="../../assets/variants.css">'
)
SUB_JS_OLD    = '<script src="../../assets/method-samples.js"></script>'
SUB_JS_NEW    = (
    '<script src="../../assets/core.js"></script>\n'
    '<script src="../../assets/widgets.js"></script>\n'
    '<script src="../../assets/quiz.js"></script>\n'
    '<script src="../../assets/sandbox.js"></script>\n'
    '<script src="../../assets/variants.js"></script>'
)

# index.html 용 (1단계 깊이 → assets/)
IDX_CSS_OLD   = r'<link rel="stylesheet" href="assets/method-samples.css">'
IDX_CSS_NEW   = (
    '<link rel="stylesheet" href="assets/base.css">\n'
    '  <link rel="stylesheet" href="assets/widgets.css">\n'
    '  <link rel="stylesheet" href="assets/quiz.css">\n'
    '  <link rel="stylesheet" href="assets/variants.css">'
)

# v3 제목 교체 (v2 표기가 남아있는 경우)
TITLE_OLD = '학습 수단 샘플 v2'
TITLE_NEW = '학습 수단 샘플 v3'
TOPBAR_BRAND_OLD = '>학습 수단 샘플 v2<'
TOPBAR_BRAND_NEW = '>학습 수단 샘플 v3<'

changed = 0
skipped = 0
errors  = 0

# 1. 서브페이지 HTML 처리 (모든 카테고리 폴더 아래 .html)
sub_pages = glob.glob(os.path.join(V3_ROOT, "**", "*.html"), recursive=True)
sub_pages = [p for p in sub_pages if os.path.basename(os.path.dirname(p)) != os.path.basename(V3_ROOT)]

for fpath in sub_pages:
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        original = content

        # CSS 교체 (정규식으로 경로가 다양하게 꼬인 케이스도 처리)
        content = re.sub(
            r'<link rel="stylesheet" href="[^"]*method-samples\.css">',
            SUB_CSS_NEW,
            content
        )
        # JS 교체
        content = re.sub(
            r'<script src="[^"]*method-samples\.js"></script>',
            SUB_JS_NEW,
            content
        )
        # 제목 교체
        content = content.replace(TITLE_OLD, TITLE_NEW)
        content = content.replace(TOPBAR_BRAND_OLD, TOPBAR_BRAND_NEW)

        if content != original:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            changed += 1
            rel = os.path.relpath(fpath, V3_ROOT)
            print(f"  [수정] {rel}")
        else:
            skipped += 1

    except Exception as e:
        errors += 1
        print(f"  [오류] {fpath}: {e}")

# 2. index.html 처리
idx_path = os.path.join(V3_ROOT, "index.html")
try:
    with open(idx_path, "r", encoding="utf-8") as f:
        idx_content = f.read()

    original_idx = idx_content

    # CSS 링크가 있으면 교체, 없으면 </style> 또는 </head> 앞에 삽입
    if "method-samples.css" in idx_content:
        idx_content = re.sub(
            r'<link rel="stylesheet" href="[^"]*method-samples\.css">',
            IDX_CSS_NEW,
            idx_content
        )
    elif 'base.css' not in idx_content:
        # <style> 태그 끝난 직후 삽입
        idx_content = idx_content.replace(
            '</style>',
            f'</style>\n  {IDX_CSS_NEW}'
        )

    # JS가 없으면 </body> 앞에 삽입
    if "method-samples.js" in idx_content:
        idx_content = re.sub(
            r'<script src="[^"]*method-samples\.js"></script>',
            (
                '<script src="assets/core.js"></script>\n'
                '<script src="assets/widgets.js"></script>\n'
                '<script src="assets/quiz.js"></script>\n'
                '<script src="assets/sandbox.js"></script>\n'
                '<script src="assets/variants.js"></script>'
            ),
            idx_content
        )

    if idx_content != original_idx:
        with open(idx_path, "w", encoding="utf-8") as f:
            f.write(idx_content)
        print(f"  [수정] index.html")
        changed += 1
    else:
        print(f"  [스킵] index.html (변경 없음)")
        skipped += 1

except Exception as e:
    errors += 1
    print(f"  [오류] index.html: {e}")

print(f"\n{'='*50}")
print(f"완료: 수정={changed}개, 스킵={skipped}개, 오류={errors}개")
print(f"{'='*50}")

# 3. Spot-check: 대표 파일 2개 검증
print("\n[Spot-check] 대표 파일 확인:")
for rel in ["foundations/callout-patterns.html", "interactive/step-debugger-timeline.html"]:
    fpath = os.path.join(V3_ROOT, rel)
    if os.path.exists(fpath):
        with open(fpath, "r", encoding="utf-8") as f:
            head_lines = [f.readline() for _ in range(15)]
        has_base    = any("base.css" in l for l in head_lines)
        has_old_css = any("method-samples.css" in l for l in head_lines)
        print(f"  {rel}:")
        print(f"    base.css 참조: {'O' if has_base else 'X'}")
        print(f"    구형 단일 CSS 잔존: {'X (남아있음!)' if has_old_css else 'O (깨끗)'}")
