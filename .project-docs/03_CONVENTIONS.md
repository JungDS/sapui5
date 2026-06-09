# 03. 규칙과 컨벤션

## 1) HTML 메타데이터 (body)
운영 문서는 `body`에 메타데이터를 둔다. page-type에 따라 셸이 활성화된다.

```html
<body
  data-page-type="doc"            <!-- home | landing | doc -->
  data-active-category="abap"     <!-- roadmap|abap|ui5|module|practice|reference -->
  data-doc-id="abap-classic"      <!-- shell.js DOCS 키와 정확히 일치해야 함 -->
  data-doc-title="..."
  data-doc-version="4.0"
  data-doc-created-at="2026-..T..+09:00"
  data-doc-updated-at="2026-..T..+09:00"
  data-distributor="정훈영"
  data-prose-root="true">
```
- `data-doc-id` ≠ `DOCS` 키이면 이전/다음 내비가 깨진다.
- **[신규]** `data-distributor`는 **필수**로 기입하여 배포자를 명확히 명시한다.
- **[신규] 푸터(Footer) 의무화**: 모든 HTML 파일 하단(`</main>` 뒤)에는 반드시 배포자와 저작권을 명시하는 푸터를 추가한다.
  예시:
  ```html
  <footer class="stage7-footer">
    <div class="stage7-footer__inner">
      <div class="stage7-footer__brand">SAP Developer Learning Library</div>
      <div class="stage7-footer__text">
        <div>배포자: 정훈영</div>
        <div class="stage7-footer__copy">&copy; 2026 JungDS. All rights reserved.</div>
      </div>
    </div>
  </footer>
  ```
- 본문 블록은 가능한 `data-prose`(summary/concept/structure/practice/warning/checklist 등) 부여.

## 2) 파일/경로 네이밍
- 운영 문서: `docs/<category>/<filename>.html` (legacy `v1/ v2/ v3/`는 금지 → archive)
- 본문 섹션은 `id` 필수(ScrollSpy·TOC).
- 인라인 `<style>`/`<script>` 금지 → 공유 CSS/JS로 이동 (현 예외: `pages/abap.html`, `index.html` = 부채).

## 3) 버전 시맨틱
| 변경 유형 | 처리 |
|---|---|
| 오타·링크·CSS·셸 수정 | 버전 유지, `data-doc-updated-at`만 갱신 |
| 내용 보강·예제·흐름 변경 | minor: 4.0 → 4.1 |
| 구조 전면 개편 | major: 4.x → 5.0 |

## 4) Archive 규칙
**원칙: 과거 버전의 영구 이력은 git이 SSOT다.** 별도 누적 archive는 두지 않는다(git과 중복이므로).
archive의 목적별 정리:
1. **AI 실수 복원** → `git restore` / `git checkout <rev> -- <path>` / reflog. (archive 불필요)
2. **과거 기록 분석**(다른 AI 모델 투입 시) → `git log` / `git show <rev>:<path>` / `git diff`. (archive 불필요)
3. **커밋 전 작업 중 복원**(잦은 편집 되돌리기) → git이 못 잡는 유일한 영역. 아래 로컬 스냅샷으로 보완.

### 4-1. 로컬 pre-edit 스냅샷 (3번 전용, 비추적)
- 수단: Claude **PreToolUse 훅** `.claude/hooks/snapshot-before-edit.mjs` (`.claude/settings.json`에 등록).
- 동작: Edit/Write **직전**에 디스크 원본을 `archive/_local/<원본경로>/<파일명>/<yyyymmdd>_<hhmmss>.<ext>`로 복사.
- 저장 위치 `archive/_local/`은 **`.gitignore` 대상**(로컬 전용, 저장소·이력 미오염). `.githooks/post-commit`이 **커밋마다 초기화**.
- 타임스탬프 = **수정 전 원본의 시각**: `.html`은 `data-doc-updated-at`, `.css/.js/.mjs`는 첫 줄 헤더의 `최종수정 YYYY-MM-DD HH:MM`,
  둘 다 없으면 파일 mtime으로 fallback. (css/js 헤더는 분 단위 → 초는 `00`)
- 한계: PreToolUse는 **Claude 편집만** 커버(타 AI/수동 편집·git 외부 변경은 미적용). 영구 복원은 항상 git을 신뢰.

### 4-2. 수동 버전 archive (선택, 큐레이션) — 운영 HTML
- 운영본 **버전 승격(minor/major) 시** 브라우저로 바로 열어볼 수 있는 스냅샷이 필요하면 만든다(선택).
- 형식: `archive/docs/<category>/<doc-id>/<YYYYMMDD>_<hhmmss>_v<version>.html`, 타임스탬프는 `data-doc-updated-at`(KST).
- 이건 git 이력과 별개로 **사람이 의도적으로 보존**하는 큐레이션본이며 추적 대상(committed)이다.

### 4-3. 공통
- `archive/` 의 추적된(committed) 파일은 **절대 수정하지 않는다**(읽기 전용). 스냅샷 훅도 `archive/`는 제외.
- 내부 운영 문서(.project-docs 등)·자산 **일괄 정리/이동**은 `archive/<영역>/<YYYYMMDD>/` 형태로 보존.

## 5) 신규 문서 체크리스트
- [ ] `docs/<category>/<file>.html` 생성 (메타데이터·섹션 id 포함)
- [ ] `assets/shell.js` `DOCS` + `LEARNING_PATHS`에 등재
- [ ] `data/site-map.json`, `data/document-catalog.json` 동기화
- [ ] `pages/<category>.html`에 카드 추가
- [ ] `README.md` 갱신

## 6) [신규] 코드 파일 주석 헤더 규칙
**프로젝트 전체의 모든 `.css`·`.js`·`.mjs` 파일**(폴더 무관: `assets/`, `docs/`, `tools/`, `sample/` 등)은
**최상단에 수정 이력 주석**을 둔다. 수정할 때마다 갱신한다. (`archive/`는 읽기 전용이므로 제외.)
```css
/* <파일 목적> | 최종수정 2026-06-05 14:30 KST | v1.2 */
```
```js
// <파일 목적> | 최종수정 2026-06-05 14:30 KST | v1.2
```
- 목적: JSON처럼 주석이 불가한 산출물 외에는 파일 자체에 수정일시·버전을 남겨 추적성 확보.
- **적용 범위: 프로젝트 전체.** 신규 파일은 생성 시 헤더를 반드시 포함하고, 기존 파일은 **수정하는 시점에 헤더를 부여/갱신**한다.
  (전 파일 일괄 백필은 별도 라운드에서 수행 가능 → [07](07_DECISIONS_AND_ROADMAP.md). 단 규칙 자체는 즉시 전면 적용.)

## 7) [신규] data/ 설명 md 규칙
- `data/*.json`은 주석을 담지 못하므로, 운영 JSON마다 `data/<name>.json.md`로 역할·구조·동기화 규칙을 설명한다.
- 현재 작성: `site-map.json.md`, `document-catalog.json.md`, `stage7-operating-docs-map.json.md`.
- 신규 운영 JSON 추가 시 같은 형식의 md를 함께 만든다.

## 8) PR 규칙
- 브랜치 → PR → 리뷰 → 머지. main 직접 수정 금지.
- 제목·본문 한국어. 구조 변경 PR과 콘텐츠 PR은 분리.
- `README.md`는 요약, 상세 이력은 PR 본문/`.project-docs`.
- **[신규] "최근 변경" 링크 backfill**: README "최근 변경" 표의 링크 칸은 작업 완료 시 우선 `로컬 작업`으로 적고,
  **그 브랜치가 PR로 머지되면 즉시 해당 행의 링크 칸을 PR URL로 교체(backfill)**한다.
  `로컬 작업`은 "아직 PR 전" 상태만을 뜻하며, 머지된 작업이 `로컬 작업`으로 남아 있으면 안 된다.
  과거 행의 PR 매핑은 `git log --merges --ancestry-path <commit>..main | tail -1`로 확정한다.
