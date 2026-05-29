# 05 · 새 세션 빠른 시작 체크리스트

> 새로운 채팅 세션이나 새로운 환경에서 작업을 시작할 때 이 파일을 먼저 읽으세요.  
> 이 파일을 다 읽으면 5~10분 안에 현재 프로젝트 상태를 파악할 수 있습니다.

---

## Step 1 · 프로젝트 현황 확인 (1분)

```bash
git log --oneline -10          # 최근 커밋 확인
git branch -a                  # 브랜치 목록 확인
git status                     # 현재 변경 상태 확인
```

**현재 기준 (2026-05-29)**:
- 브랜치: `main`
- 단계: Stage 7 완료
- 전체 운영 문서: 35개 (`docs/` 기준)

---

## Step 2 · 핵심 파일 3개 확인 (2분)

1. `README.md` → 현재 진행 단계 및 최근 변경 확인
2. `README_ALL.md` → 14. 재개 기준 섹션 확인
3. `.project-docs/01_PROJECT_ANALYSIS.md` → 이슈 목록 확인

---

## Step 3 · 현재 작업 이어받기 판단 기준

### 열린 PR이 있는 경우
```bash
# GitHub CLI 또는 브라우저에서 확인
gh pr list
```
→ 해당 PR의 변경 파일과 상태 먼저 확인

### 열린 PR이 없는 경우
→ `README.md`의 Stage 7 작업 상태 테이블에서 `진행 중` 항목 확인  
→ 없으면 `data/site-map.json`과 `data/document-catalog.json` 갱신 또는 새 문서 작성 진행

---

## Step 4 · 작업 유형별 시작 방법

### A. 기존 문서 내용 수정
1. `docs/[category]/[file].html` 위치 확인
2. 현재 `data-doc-updated-at` 값 확인 → archive 파일명에 사용
3. `archive/docs/[category]/[doc-id]/` 에 현재본 먼저 복사
4. 내용 수정 후 `data-doc-updated-at` 갱신

### B. 새 운영 문서 추가
1. `docs/[category]/[new-file].html` 생성
2. `03_RULES_AND_CONVENTIONS.md`의 "4. 새 문서 추가 시 체크리스트" 실행
3. PR 생성

### C. Landing Page 수정
1. `pages/[category].html` 수정
2. `archive/docs/landing/[category]/[timestamp]_v[ver].html` 에 현재본 먼저 복사
3. 수정 후 `data-doc-updated-at` 갱신

### D. Shell(CSS/JS) 수정
1. 수정 전 현재 동작 확인
2. `assets/stage7-shell.css` 또는 `assets/stage7-shell.js` 수정
3. docs/*.html 파일을 로컬에서 열어 브라우저 확인

---

## Step 5 · 자주 하는 작업 빠른 참조

### 새 섹션 추가 (docs/*.html)
```html
<section class="stage7-section prose-practice" data-prose="practice" id="pattern">
  <div class="stage7-section__label">03 · 실무 패턴</div>
  <h2>섹션 제목</h2>
  <!-- 본문 내용 -->
</section>
```

### 새 카드 그리드 추가
```html
<div class="stage7-card-grid two">
  <article class="stage7-card" data-prose="summary" data-doc-card>
    <div class="library-meta"><span class="stage7-badge blue">입문</span></div>
    <h3>카드 제목</h3>
    <p>카드 설명</p>
    <a class="stage7-button" href="../docs/abap/xxx.html">문서 열기</a>
  </article>
</div>
```

### "준비 중" 카드 추가
```html
<article class="stage7-card preparing" data-prose="summary" data-doc-card>
  <div class="library-meta"><span class="stage7-badge amber">준비 중</span></div>
  <h3>카드 제목</h3>
  <p>카드 설명</p>
</article>
```

### stage7-shell.js에 새 문서 등록
```javascript
// DOCS 상수에 추가
"new-doc-id": {
  title: "문서 제목",
  category: "abap",  // roadmap|abap|ui5|module|practice|reference
  href: "docs/abap/new-doc.html",
  group: "12단계. 현대적 개발 모델"  // LEARNING_PATHS의 그룹과 동일하게
},

// LEARNING_PATHS의 해당 영역 items 배열에 추가
abap: {
  title: "ABAP 개발자 경로",
  items: [..., "new-doc-id"]
}
```

### common.js에 새 문서 등록
```javascript
// NAV_DOCS에 추가
"new-doc-id": {
  title: "문서 제목",
  file: "new-doc.html",
  category: "abap"
},

// NAV_PATHS에 추가
"new-doc-id": "docs/abap/new-doc.html",

// NAV_TREE 해당 영역 groups에 추가
{ "title": "12단계. 현대적 개발 모델", "docs": [..., "new-doc-id"] }
```

---

## 현재 알려진 이슈 (빠른 참조)

| 우선순위 | 이슈 | 상세 |
|---|---|---|
| 🔴 | 문서 목록 이중 관리 | JS와 JSON이 동기화 필요 |
| 🟡 | `stage7-home.css` 미사용 | 삭제 또는 정리 필요 |
| 🟡 | `pages/abap.html` 인라인 CSS/JS | Shell로 이동 필요 |
| 🟡 | `index.html` 인라인 JS | 분리 필요 |
| 🟢 | `docs/module/*.html` 내용 얕음 | 교재형 보강 필요 |
| 🟢 | `RELATED_DOCS` 4개만 명시 | 나머지 문서도 명시 필요 |

---

## 전체 문서 현황 (2026-05-29 기준)

```
docs/roadmap/      3개 운영 | 2개 준비중
docs/abap/         8개 운영 | 13+ 준비중
docs/ui5/          7개 운영 | 18+ 준비중
docs/module/      13개 운영 | 3개 준비중
docs/practice/     2개 운영 | 2개 준비중
docs/reference/    2개 운영 | 2개 준비중
─────────────────────────────
합계:             35개 운영 | 40+ 준비중
```

---

_최초 작성: 2026-05-29_
