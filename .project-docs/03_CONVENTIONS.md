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
  예시: `<footer class="stage7-footer"><p>배포자: 정훈영<br>공식 매뉴얼은 아니지만 본 웹페이지에 대한 저작권은 배포자에 있습니다.</p></footer>`
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
- 형식: `archive/docs/<category>/<doc-id>/<YYYYMMDD>_<hhmmss>_v<version>.html`
- 타임스탬프 출처: 운영본의 `data-doc-updated-at` (archive 생성 시각 아님). TZ: KST(+09:00).
- archive 파일은 **절대 수정하지 않는다.**
- 내부 운영 문서(.project-docs 등)·자산 정리는 `archive/<영역>/<YYYYMMDD>/` 형태로 보존.

## 5) 신규 문서 체크리스트
- [ ] `docs/<category>/<file>.html` 생성 (메타데이터·섹션 id 포함)
- [ ] `assets/shell.js` `DOCS` + `LEARNING_PATHS`에 등재
- [ ] `data/site-map.json`, `data/document-catalog.json` 동기화
- [ ] `pages/<category>.html`에 카드 추가
- [ ] `README.md` 갱신

## 6) [신규] asset 주석 헤더 규칙
모든 `assets/*.css`·`*.js`는 **최상단에 수정 이력 주석**을 둔다. 수정할 때마다 갱신한다.
```css
/* <파일 목적> | 최종수정 2026-06-05 14:30 KST | v1.2 */
```
```js
// <파일 목적> | 최종수정 2026-06-05 14:30 KST | v1.2
```
- 목적: JSON처럼 주석이 불가한 산출물 외에는 파일 자체에 수정일시·버전을 남겨 추적성 확보.
- 적용 범위 확대(전 파일 일괄 부여)는 asset 리네임 라운드에서 함께 수행(→07). 본 라운드는 규칙 정의.

## 7) [신규] data/ 설명 md 규칙
- `data/*.json`은 주석을 담지 못하므로, 운영 JSON마다 `data/<name>.json.md`로 역할·구조·동기화 규칙을 설명한다.
- 현재 작성: `site-map.json.md`, `document-catalog.json.md`, `stage7-operating-docs-map.json.md`.
- 신규 운영 JSON 추가 시 같은 형식의 md를 함께 만든다.

## 8) PR 규칙
- 브랜치 → PR → 리뷰 → 머지. main 직접 수정 금지.
- 제목·본문 한국어. 구조 변경 PR과 콘텐츠 PR은 분리.
- `README.md`는 요약, 상세 이력은 PR 본문/`.project-docs`.
