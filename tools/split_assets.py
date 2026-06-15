"""
split_assets.py
v3 공통 CSS/JS를 기능별로 분리하고, 원본에 Deprecation 주석을 추가합니다.
"""
import os

ASSETS = r"c:\ui5\study\sapui5\sample\learning-methods-v3\assets"
CSS_ORIG = os.path.join(ASSETS, "method-samples.css")
JS_ORIG  = os.path.join(ASSETS, "method-samples.js")

# ──────────────────────────────────────────────────────────────
# 1. CSS 분리 (4개 모듈)
# ──────────────────────────────────────────────────────────────
# 각 파일명과 해당 라인 범위 (1-indexed, 포함)
CSS_MODULES = {
    "base.css": {
        "desc": "전역 리셋, CSS 변수(:root), body, topbar, layout/hero, section, example-stack, ai-note, 반응형 cols-2",
        "lines": (1, 90),
    },
    "widgets.css": {
        "desc": "lesson-callout, ABAP Editor Mockup & 토큰, Mermaid viz-*, Code Tour 아코디언, Diff Mapper, 탭형 빌드업(tabs/split)",
        "lines": (91, 400),
    },
    "quiz.css": {
        "desc": "드래그 앤 드롭 퍼즐, 카드 분류, Step Debugger, SAP GUI Sandbox, 플래시카드, 체크리스트, 의사결정, 단답/빈칸, 미니시험, foldable, cheat-table, media-gallery, match-grid, project-board, link-list, recap, storyline",
        "lines": (401, 481),
    },
    "variants.css": {
        "desc": "[V3 전용] Variant B/C 테마, variant-panel, Hotspot Explorer, Interactive Chart, Profiler, Shortcut Simulator, O/X Survival",
        "lines": (482, 555),
    },
}

CSS_DEPRECATION = """\
/* ============================================================
   [DEPRECATED] method-samples.css
   이 파일은 더 이상 새 작업에 사용하지 않습니다.
   대신 아래 분리된 모듈 파일을 사용하세요:

     <link rel="stylesheet" href="assets/base.css">
     <link rel="stylesheet" href="assets/widgets.css">
     <link rel="stylesheet" href="assets/quiz.css">
     <link rel="stylesheet" href="assets/variants.css">

   기존 페이지는 특정 페이지 수정 시 점진적으로 위 모듈로 교체합니다.
   모든 페이지가 교체되면 이 파일은 assets/archive/ 로 이동합니다.
   ============================================================ */

"""

# ──────────────────────────────────────────────────────────────
# 2. JS 분리 (4개 모듈)
# ──────────────────────────────────────────────────────────────
# v3 JS = v2 JS(496줄) + V3_EXTRA_JS(약 200줄)
# 실제 라인 수는 파일을 읽어서 확인 후 스플릿
JS_MODULES = {
    "core.js": {
        "desc": "IIFE 래퍼, ready(), parseJSON(), interpolate(), triggerConfetti() 유틸리티",
        "start_marker": "(function ()",
        "end_marker":   "/* ---------- 1.",
    },
    "widgets.js": {
        "desc": "initTabs, initCodeTour, initDiffMapper, initCopy (탭·아코디언·diff·복사)",
        "start_marker": "/* ---------- 1.",
        "end_marker":   "/* ---------- 4.",
    },
    "quiz.js": {
        "desc": "initPuzzle, initCardSort, initFlashcards, initChecklist, initDecision, initShortAnswer, initExam (퀴즈 전체)",
        "start_marker": "/* ---------- 4.",
        "end_marker":   "/* ---------- 5.",
    },
    "sandbox.js": {
        "desc": "initDebugger, initSandbox (Step Debugger & SAP GUI Sandbox)",
        "start_marker": "/* ---------- 5.",
        "end_marker":   "/* ---------- 6b.",
    },
}

JS_DEPRECATION = """\
/* ============================================================
   [DEPRECATED] method-samples.js
   이 파일은 더 이상 새 작업에 사용하지 않습니다.
   대신 아래 분리된 모듈 파일을 사용하세요:

     <script src="assets/core.js"></script>
     <script src="assets/widgets.js"></script>
     <script src="assets/quiz.js"></script>
     <script src="assets/sandbox.js"></script>

   기존 페이지는 특정 페이지 수정 시 점진적으로 위 모듈로 교체합니다.
   모든 페이지가 교체되면 이 파일은 assets/archive/ 로 이동합니다.
   ============================================================ */

"""

# ──────────────────────────────────────────────────────────────
# 실행
# ──────────────────────────────────────────────────────────────
def make_css_header(name, desc):
    return (
        f"/* ============================================================\n"
        f"   {name} — {desc}\n"
        f"   [모듈 목차] 이 파일에 없는 스타일은 다른 모듈에 추가하세요.\n"
        f"   중복 추가 전 반드시 이 파일 전체를 먼저 확인하십시오.\n"
        f"   ============================================================ */\n\n"
    )

def make_js_header(name, desc):
    return (
        f"/* ============================================================\n"
        f"   {name} — {desc}\n"
        f"   [모듈 목차] 이 파일에 없는 함수는 다른 모듈에 추가하세요.\n"
        f"   중복 추가 전 반드시 이 파일 전체를 먼저 확인하십시오.\n"
        f"   ============================================================ */\n\n"
    )

# --- CSS 분리 ---
with open(CSS_ORIG, "r", encoding="utf-8") as f:
    css_lines = f.readlines()

for fname, info in CSS_MODULES.items():
    start, end = info["lines"]
    chunk = css_lines[start - 1 : end]
    out_path = os.path.join(ASSETS, fname)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(make_css_header(fname, info["desc"]))
        f.writelines(chunk)
    print(f"  [CSS] 생성: {fname} ({len(chunk)}줄)")

# 원본에 Deprecation 주석 추가
with open(CSS_ORIG, "r", encoding="utf-8") as f:
    orig_content = f.read()
if "[DEPRECATED]" not in orig_content:
    with open(CSS_ORIG, "w", encoding="utf-8") as f:
        f.write(CSS_DEPRECATION + orig_content)
    print("  [CSS] 원본 Deprecation 주석 추가 완료")
else:
    print("  [CSS] 원본 이미 Deprecated 처리됨, 건너뜀")

# --- JS 분리: v3 JS는 라인 기반으로 섹션 마커 탐색 ---
with open(JS_ORIG, "r", encoding="utf-8") as f:
    js_content = f.read()
    js_lines = js_content.splitlines(keepends=True)

total_js = len(js_lines)
print(f"\n  [JS] 전체 {total_js}줄 읽음")

# 각 섹션의 시작 라인 인덱스 탐색
markers = [
    ("core.js",    "(function ()",            "/* ---------- 1."),
    ("widgets.js", "/* ---------- 1.",         "/* ---------- 4."),
    ("quiz.js",    "/* ---------- 4.",         "/* ---------- 5."),
    ("sandbox.js", "/* ---------- 5.",         "/* ---------- 6b."),
    # 나머지(V3 extras + ready() 호출부)는 별도 처리
]

def find_line(lines, marker, start=0):
    for i in range(start, len(lines)):
        if marker.strip() in lines[i]:
            return i
    return None

# core.js: IIFE 시작 ~ 첫 번째 "/* ---------- 1." 이전
idx_iife  = find_line(js_lines, "(function ()")
idx_tab   = find_line(js_lines, "/* ---------- 1.")
idx_dbg   = find_line(js_lines, "/* ---------- 4.")  # Step Debugger
idx_sand  = find_line(js_lines, "/* ---------- 5.")  # SAP Sandbox
idx_cardsort = find_line(js_lines, "/* ---------- 6b.")
# V3 extras 시작: "/* ---------- [NEW]" 마커 탐색
idx_v3    = find_line(js_lines, "/* ---------- [NEW]")
# ready() 호출 블록: "  ready(function () {" 탐색
idx_ready = find_line(js_lines, "  ready(function () {")

print(f"  마커 인덱스: IIFE={idx_iife}, tab={idx_tab}, dbg={idx_dbg}, sand={idx_sand}, cardsort={idx_cardsort}, v3={idx_v3}, ready={idx_ready}")

# JS 모듈 파일 구성
js_module_ranges = {
    "core.js": (idx_iife, idx_tab,      "IIFE 래퍼, ready(), parseJSON(), interpolate(), triggerConfetti()"),
    "widgets.js": (idx_tab, idx_dbg,    "initTabs, initCodeTour, initDiffMapper (탭/아코디언/diff)"),
    "quiz.js": (idx_dbg, idx_sand,      "initPuzzle, initCardSort 등 퀴즈 계열"),
    "sandbox.js": (idx_sand, idx_v3 if idx_v3 else idx_ready,  "initDebugger, initSandbox"),
}

for fname, (s, e, desc) in js_module_ranges.items():
    if s is None or e is None:
        print(f"  [JS] 경고: {fname} 마커 탐색 실패, 건너뜀")
        continue
    chunk = js_lines[s:e]
    out_path = os.path.join(ASSETS, fname)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(make_js_header(fname, desc))
        f.writelines(chunk)
    print(f"  [JS] 생성: {fname} ({len(chunk)}줄, lines {s+1}~{e})")

# variants.js: V3 extras + ready() 호출부 + IIFE 닫기
if idx_v3:
    chunk = js_lines[idx_v3:]
    out_path = os.path.join(ASSETS, "variants.js")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(make_js_header("variants.js", "[V3 전용] initVariants, initHotspot, initDataChart, initProfiler, initShortcut, initOXSurvival + ready() 호출부"))
        f.writelines(chunk)
    print(f"  [JS] 생성: variants.js ({len(chunk)}줄, lines {idx_v3+1}~{total_js})")

# 원본에 Deprecation 주석 추가
if "[DEPRECATED]" not in js_content:
    with open(JS_ORIG, "w", encoding="utf-8") as f:
        f.write(JS_DEPRECATION + js_content)
    print("  [JS] 원본 Deprecation 주석 추가 완료")
else:
    print("  [JS] 원본 이미 Deprecated 처리됨, 건너뜀")

# --- archive 폴더 생성 (나중에 원본 이동용) ---
archive_dir = os.path.join(ASSETS, "archive")
os.makedirs(archive_dir, exist_ok=True)
archive_readme = os.path.join(archive_dir, "README.md")
if not os.path.exists(archive_readme):
    with open(archive_readme, "w", encoding="utf-8") as f:
        f.write("# archive/\n\n모든 페이지가 분리된 모듈 CSS/JS로 마이그레이션 완료되면,\n`method-samples.css`와 `method-samples.js` 원본을 여기로 이동합니다.\n")
    print("  [archive] README.md 생성 완료")

print("\n완료: CSS 4개 + JS 5개 모듈 파일 생성, 원본 Deprecated 처리, archive 폴더 준비")
