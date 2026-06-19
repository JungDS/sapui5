# 07. BROWSER TESTING — 화면 검증

> 📅 **최종수정: 2026-06-20 00:20 KST**
> 🎯 **목적:** Lesson viewer와 인터랙션을 브라우저에서 확인하는 최소 절차.
> 📖 **읽을 때:** Lesson 완료 전 UI/콘솔/시뮬레이션을 검증할 때.
> ⚡ **TL;DR:** 루트에서 정적 서버를 띄우고 `lesson-viewer.html?lesson=<ID>`를 본다.

## 정적 서버

프로젝트 루트에서 실행한다.

```cmd
python -m http.server 8765
```

`.claude/launch.json`의 `static` 설정도 같은 포트 `8765`를 쓴다.

## 기본 URL

```text
http://127.0.0.1:8765/docs/abap/lesson-viewer.html?lesson=THEORY-04-M02
```

Lesson ID만 바꿔 확인한다.

## Lesson 완료 전 체크

- 콘솔 오류 0건
- Lesson 제목/사이드바/pager 렌더링
- T-code 칩 바 노출
- `data-glossary` 툴팁 동작
- 시뮬레이션/탭/퀴즈/버튼 등 주요 인터랙션 동작
- 모바일 폭에서 텍스트 겹침 없음
- Mermaid/시각화가 있으면 깨짐 없음

## 수정 범위별 최소 검증

| 수정 범위 | 최소 검증 |
|---|---|
| Lesson fragment 1개 | 해당 Lesson desktop + mobile 폭, 콘솔 0, 해당 Lesson의 모든 신규 인터랙션 |
| 글로서리/T-code만 | 해당 Lesson 칩 바, 툴팁, `used_in_lessons` 반영. T-code 지도는 구조를 바꾼 경우만 확인 |
| `abap-lesson-viewer.js/css` | 최근 수정 Lesson 1개, 이전에 정상 동작한 Lesson 1개, T-code/glossary가 많은 Lesson 1개, 새로 건드린 interaction type 1개씩 |
| `shell.js`/공통 site CSS | `index.html`, 관련 `pages/*.html`, 대표 `docs/**/*.html` 1개 |
| 문서만 | 브라우저 검증 생략 가능. 링크/참조 검색과 markdown diff 확인으로 충분 |

공통 자산을 바꿨다고 Track 1 전체 137개를 전수 검증하지 않는다. 대신 깨질 수 있는 기능 축을 대표 URL로 고른다.

## Playwright가 필요할 때

반복 검증이나 스크린샷이 필요할 때만 로컬 scratch에 Playwright를 설치해 사용한다. 일반 Lesson 검증은 브라우저 수동 확인과 콘솔 체크로 충분하다.

```cmd
npm init -y
npm install playwright
npx playwright install chromium
```

검증 스크립트는 대상 URL 접속, 콘솔 에러 수집, 주요 버튼 클릭, 스크린샷 저장만 포함한다. 장기 보관할 스크립트가 아니면 repository에 추가하지 않는다.
