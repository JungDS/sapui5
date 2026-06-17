# 07. BROWSER TESTING — 가상 브라우저 검증 우회

> 📅 **최종수정: 2026-06-15 10:46 KST**
> 🎯 **목적:** 내장 가상 브라우저가 안 될 때 로컬 Playwright로 화면 검증을 우회하는 절차.
> 📖 **읽을 때:** Lesson UI 렌더링/인터랙션을 브라우저로 검증해야 하는데 `browser_subagent`가 실패할 때.
> ⚡ **TL;DR:**
> - 루트에서 정적 서버 구동(`npx http-server -p 8888 --cors`) → 스크래치에 Playwright 설치 → `test_browser.js`로 스크린샷.
> - 검증 대상 예: `index.html`, `lesson-viewer.html?lesson=<ID>`.

본 문서는 내장 가상 브라우저 도구(`browser_subagent`)가 환경 제약(CDP 루프백 주소 `127.0.0.1` 해석 오류)으로 인해 실행되지 않을 때, 로컬 NodeJS 웹 서버와 로컬 Playwright 패키지를 이용해 테스트를 정상적으로 우회 수행하기 위한 가이드라인입니다.

새로운 대화 세션이 열리거나 환경이 초기화되었을 때 아래의 절차를 그대로 재현하여 화면 레이아웃 및 렌더링 검증을 진행할 수 있습니다.

---

## 🛠️ [가상 브라우저 테스트 실행 워크플로우]

### 1단계: NodeJS 정적 웹 서버 구동 (포트 8888)
헤드리스 브라우저의 리소스 다중 요청 시 발생하는 로컬 포트 병목 및 리셋 오류를 방지하기 위해 NodeJS 기반의 정적 웹 서버를 구동합니다.
* **실행 경로:** 프로젝트 루트 디렉토리 (`c:\ui5\study\sapui5`)
* **명령어:**
  ```powershell
  npx http-server -p 8888 --cors
  ```
  *(비동기 백그라운드 태스크로 구동합니다.)*
* **서버 상태 확인:**
  ```powershell
  Get-NetTCPConnection -LocalPort 8888
  ```
  *(포트가 `Listen` 상태로 표시되면 성공입니다.)*

---

### 2단계: Playwright 테스트 환경 구성
임시 작업 디렉토리인 스크래치 폴더에 로컬 Playwright 라이브러리를 준비합니다.
* **실행 경로:** 스크래치 디렉토리 (`<appDataDir>/brain/<conversation-id>/scratch/`)
* **명령어:**
  ```powershell
  npm init -y
  ```
  ```powershell
  npm install playwright
  ```
  ```powershell
  npx playwright install chromium
  ```

---

### 3단계: 테스트 스크립트 (`test_browser.js`) 작성
스크래치 디렉토리에 아래 사양을 만족하는 `test_browser.js` 파일을 생성합니다.

```javascript
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('브라우저 시작 중...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // 1. index.html 테스트
  console.log('index.html 접속 시도...');
  try {
    await page.goto('http://127.0.0.1:8888/index.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const indexImgPath = path.join(__dirname, 'index_screenshot.png');
    await page.screenshot({ path: indexImgPath });
    console.log(`index.html 캡처 완료: ${indexImgPath}`);
  } catch (err) {
    console.error('index.html 캡처 실패:', err);
  }

  // 2. lesson-viewer.html 테스트
  console.log('lesson-viewer.html 접속 시도...');
  try {
    await page.goto('http://127.0.0.1:8888/docs/abap/lesson-viewer.html?lesson=THEORY-13-M01', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // 렌더링 대기

    // 인터랙티브 요소 조작 (필요 시 탭 전환 클릭 시뮬레이션)
    console.log('탭 3 클릭 시뮬레이션...');
    await page.click('.tab-btn[data-tab="tab-level3"]');
    await page.waitForTimeout(2000); // 드로잉 대기

    const lessonImgPath = path.join(__dirname, 'lesson_screenshot.png');
    await page.screenshot({ path: lessonImgPath });
    console.log(`lesson_screenshot 캡처 완료: ${lessonImgPath}`);
  } catch (err) {
    console.error('lesson-viewer.html 캡처 실패:', err);
  }

  await browser.close();
  console.log('테스트 스크립트 실행 완료.');
})();
```

---

### 4단계: 스크립트 실행 및 결과 검증
* **명령어:**
  ```powershell
  node test_browser.js
  ```
* **결과 확인:**
  생성된 `index_screenshot.png`와 `lesson_screenshot.png` 이미지 파일을 열어 폰트 깨짐, 탭 전환 시 Mermaid 다이어그램 찌그러짐 현상이 없는지 시각적으로 검사합니다.
