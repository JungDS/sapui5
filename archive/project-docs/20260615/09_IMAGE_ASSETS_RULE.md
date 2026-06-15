# 이미지 자산 관리 및 명명 규칙

> 📅 **최종수정: 2026-06-10 00:50 KST**

이 문서는 본문(Lesson) 작성 과정에서 필요한 이미지들의 명명 규칙과 보관 기준을 정의합니다.

## 1. 이미지 보관 위치
- 모든 본문용 이미지 파일은 `assets/images/` 폴더 내에 보관합니다.

## 2. 이미지 파일명 규칙
이미지 파일명은 소문자와 하이픈(`-`)만을 사용하며, 어떤 Chapter와 Lesson에 속한 이미지인지 명확히 식별 가능하도록 네이밍합니다.

**형식:** `ch[Chapter번호]-les[Lesson번호]-[일련번호]-[짧은설명].png` (또는 .jpg, .gif)
- 예시: `ch01-les02-01-domain-creation.png` (Chapter 1, Lesson 2의 첫 번째 이미지)
- 예시: `ch02-les01-01-se38-editor.png`
- 만약 특정 Lesson에 종속되지 않는 공통 아키텍처 이미지라면 `common-[짧은설명].png` 형식을 사용합니다.

## 3. HTML 삽입 포맷
이미지를 본문에 삽입할 때는 `<img>` 태그를 사용하며, 반응형으로 렌더링되도록 스타일 클래스를 부여합니다.
```html
<img src="../../assets/images/ch01-les02-01-domain-creation.png" alt="Domain 생성 화면" style="max-width: 100%; border-radius: 6px; margin: 16px 0;" />
```

---

## 4. THEORY-01 ~ THEORY-10 이미지 삽입 권장 위치
현재 작성된 텍스트 본문 중 다음 부분들에 캡처 이미지를 추가하면 초심자의 이해를 크게 도울 수 있습니다. 향후 실 화면 캡처 시 아래 파일명 규칙을 참고하여 업데이트 바랍니다.

| 삽입 권장 위치 (Lesson) | 추천 파일명 | 이미지에 담겨야 할 내용 설명 |
|---|---|---|
| **THEORY-01-M02** | `ch01-les02-01-se11-domain.png` | SE11 트랜잭션에서 Domain 객체를 생성하는 초기 팝업과 설정 화면 |
| **THEORY-01-M06** | `ch01-les06-01-data-browser.png` | Data Browser(SE16N)에서 투명 테이블의 데이터가 엑셀 그리드 형태로 조회된 화면 |
| **THEORY-02-M01** | `ch02-les01-01-se38-f8.png` | ABAP Editor(SE38)에서 간단한 리포트 소스를 작성하고 실행(F8) 아이콘을 누르는 모습 |
| **THEORY-03-M01** | `ch03-les01-01-selection-screen.png` | PARAMETERS 명령어로 구현된 Selection Screen이 실제 사용자 GUI에 렌더링된 모습 |
| **THEORY-04-M03** | `ch04-les03-01-f4-help.png` | Search Help(F4)가 적용된 입력 필드에서 도움말 팝업(Search Help 창)이 띄워진 모습 |
| **THEORY-07-M01** | `ch07-les01-01-debugger.png` | ABAP Debugger가 실행되어 소스 코드 라인에 멈춰 있고, 우측에서 변수의 값을 실시간으로 확인하는 화면 |
| **THEORY-09-M02** | `ch09-les02-01-select-single.png` | SQL 쿼리 작성 화면 또는 `SELECT SINGLE`로 한 줄만 조회되는 개념을 설명하는 간략한 도식 |
| **THEORY-10-M01** | `ch10-les01-01-range-table.png` | Range Table (SIGN, OPTION, LOW, HIGH)의 구조를 보여주는 간단한 표 또는 디버거 화면 내 Range Table 변수 모습 |
