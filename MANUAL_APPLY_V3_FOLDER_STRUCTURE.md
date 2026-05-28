# v3 문서 폴더 재분류 수동 반영 안내

이 패키지는 `v3/` 루트에 모여 있던 HTML 문서를 학습 영역별 하위 폴더로 재분류한 전체 파일 세트다.

## 적용 절차

```bash
git clone https://github.com/JungDS/sapui5.git
cd sapui5
git checkout -b feature/v3-document-folder-structure

# ZIP 내용을 저장소 루트에 덮어쓴다.
# .git 폴더는 삭제하지 않는다.

git add -A
git commit -m "v3 문서 폴더 구조 재분류"
git push -u origin feature/v3-document-folder-structure

gh pr create \
  --base main \
  --head feature/v3-document-folder-structure \
  --title "v3 문서 폴더 구조 재분류" \
  --body "v3 HTML 문서를 학습 영역별 하위 폴더로 재분류하고 관련 링크를 정비합니다."
```
