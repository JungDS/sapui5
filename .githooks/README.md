# .githooks — 공유 git 훅

이 폴더의 훅은 **버전 관리되는 공유 훅**이다. 각 클론에서 **한 번** 아래를 실행해 활성화한다.

```bash
git config core.hooksPath .githooks
```

> `core.hooksPath`는 로컬 설정이라 클론마다 1회 지정이 필요하다(git 보안 정책상 자동 적용은 불가).

## archive 정책 (요약)

과거 버전의 **영구 이력은 git이 담당**한다(`git restore` / `git show <rev>:<path>` / `git log`).
별도 누적 archive는 두지 않는다(git과 중복이므로).

유일한 예외는 **커밋 전 작업 중 복원**(잦은 편집 되돌리기)이다. 이건 git이 못 잡으므로
**로컬 pre-edit 스냅샷**으로 보완한다 — `.gitignore`된 `archive/_local/`에만 쌓이고 저장소/이력을 오염시키지 않는다.

- **수정 직전 스냅샷**: Claude의 PreToolUse 훅(`.claude/hooks/snapshot-before-edit.mjs`)이 Edit/Write 직전 원본을
  `archive/_local/<원본경로>/<파일명>/<yyyymmdd>_<hhmmss>.<ext>`로 복사. (타 AI/수동 편집은 미적용.)
- **post-commit**: 커밋이 끝나면 `archive/_local/`을 비운다(커밋마다 초기화).

자세한 규칙: [`.project-docs/03_CONVENTIONS.md` §4](../.project-docs/03_CONVENTIONS.md)
