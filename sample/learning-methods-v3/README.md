# 학습 수단 샘플 라이브러리 v3 (Design Variants & Extended Edition)

기존 v2의 38개 샘플 페이지를 기반으로, **자동 디자인 시안 기록 시스템(Design Variants)** 과 **신규 6종의 고품질 학습 수단**이 추가된 v3 라이브러리입니다.

## 🚀 새로운 기능 (v3)

1. **Design Variants (시안 선택 및 자동 기록)**
   - 각 학습 수단 페이지 상단에 A, B, C 세 가지 시안(테마)을 선택할 수 있는 라디오 패널이 주입되어 있습니다.
   - 시안을 클릭하면 페이지의 디자인 레이아웃 및 스타일이 즉각적으로 변환됩니다.
   - **백그라운드 자동 저장**: 로컬 루트 디렉토리의 `dev-server.py`를 실행한 상태에서 시안을 선택하면, 백그라운드 API(POST `/save-choices`)를 통해 `sample/learning-methods-v3/design-choices.json`에 선택 내역이 실시간으로 누적됩니다.
   - 이를 통해, 학습 수단별 최적의 디자인 패턴 선호도를 AI 프롬프트에 제공할 데이터셋으로 수집할 수 있습니다.

2. **6종의 신규 상호작용 컴포넌트 추가**
   - 기존의 단조로운 코드/문서 뷰를 넘어 학습 품질을 극대화할 수 있는 강력한 상호작용 6종이 기획되었습니다.
   - **[Visuals]** 이미지 핫스팟 탐색기 (`image-hotspot-explorer.html`)
   - **[Visuals]** 인터랙티브 데이터 차트 (`interactive-data-chart.html`)
   - **[Code Learning]** 성능 프로파일러 모의 실험 (`performance-profiler-mock.html`)
   - **[Interactive]** 다단계 아키텍처 조립기 (`architecture-builder.html`)
   - **[Interactive]** 단축키 커맨드 시뮬레이터 (`shortcut-simulator.html`)
   - **[Quizzes]** O/X 타임어택 서바이벌 퀴즈 (`ox-survival-quiz.html`)

3. **기존 결함 보완 및 UI 일관성 적용**
   - 모든 샘플 HTML의 코드 블록(`<pre><code>`)에 대해 일관성 있는 복사 버튼(`shiki-copy-wrapper`)을 적용했습니다.
   - `interactive/step-debugger-timeline.html`, `code-learning/code-keyword-accordion.html`에서 발견된 구조적 결함을 보완했습니다.

## 🛠️ 사용 방법

1. 저장소 최상위 디렉토리(루트)에서 터미널을 열고 파이썬 로컬 서버를 실행합니다.
   ```bash
   python dev-server.py
   ```
2. 브라우저에서 `http://localhost:8000/sample/learning-methods-v3/index.html` 로 접속합니다.
3. 총 44개의 샘플들을 하나씩 방문하며 상단의 A/B/C 라디오 버튼을 선택합니다.
4. 모든 선택이 끝난 후, 터미널 로그를 통해 정상 저장되었는지 확인하거나, UI 상의 "선택 JSON 복사" 버튼을 통해 클립보드로 데이터를 추출할 수 있습니다.
