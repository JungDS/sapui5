# Clean Rebuild 수동 반영 안내

이 패키지는 `JungDS/sapui5` 저장소를 clean rebuild 방식으로 다시 정리하기 위한 전체 파일 세트다.

## 수동 적용 절차

```bash
git clone https://github.com/JungDS/sapui5.git
cd sapui5
git checkout -b feature/clean-rebuild-learning-library

# 저장소 루트의 기존 파일을 정리한 뒤, 이 ZIP의 내용을 루트에 복사한다.
# 단, .git 폴더는 삭제하지 않는다.

rm -f _direct-push-test.md
git add -A
git commit -m "Stage 6: 학습자료 저장소 Clean Rebuild"
git push -u origin feature/clean-rebuild-learning-library

gh pr create   --base main   --head feature/clean-rebuild-learning-library   --title "Stage 6: 학습자료 저장소 Clean Rebuild"   --body "Stage 5 Navigation 배포본을 기준으로 Stage 6 상세화 문서를 포함해 저장소 전체 파일 세트를 재정리합니다."
```

## 포함 내용

- Stage 5 Navigation 전체 파일 세트
- Stage 6 상세화 문서 4개
- 정리된 README.md
- `_direct-push-test.md` 제거 기준
- Clean rebuild manifest
