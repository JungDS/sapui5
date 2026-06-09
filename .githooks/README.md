# .githooks — 공유 git 훅

이 폴더의 훅은 **버전 관리되는 공유 훅**이다. 각 클론에서 **한 번** 아래를 실행해 활성화한다.

```bash
git config core.hooksPath .githooks
```

> `core.hooksPath`는 로컬 설정이라 클론마다 1회 지정이 필요하다(git 보안 정책상 자동 적용은 불가).
> 새 작업 환경/새 AI 세션을 시작할 때 가장 먼저 위 명령을 실행할 것.

## pre-commit — 수정 파일 자동 archive

수정·이름변경·삭제되는 `*.html` `*.css` `*.js` `*.mjs` 파일의 **직전(HEAD) 버전**을
`archive/auto/<원본경로>/<파일명>__<YYYYMMDD-HHMMSS>.<ext>` 로 자동 복사해 같은 커밋에 포함한다.

- 근거 규칙: [`.project-docs/03_CONVENTIONS.md` §4](../.project-docs/03_CONVENTIONS.md)
- **우회 금지**: `git commit --no-verify`로 건너뛰지 말 것.
- 신규(Added) 파일은 직전 버전이 없으므로 보관하지 않는다.
- `archive/` 자체는 읽기 전용이라 제외된다.

### 수동 버전 archive와의 관계
- `archive/auto/` = 모든 커밋 단위의 **자동 안전망**(타임스탬프 기준).
- `archive/docs/<category>/<doc-id>/<...>_v<version>.html` = 운영 HTML **버전 승격 시의 큐레이션 스냅샷**(§4, `data-doc-updated-at` 기준).
- 둘은 공존한다. 자동 안전망이 있다고 해서 운영본 버전 archive를 생략하지 않는다.
