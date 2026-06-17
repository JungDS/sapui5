# AI Workspace Synchronization Log (AI-SYNC)

> 📅 **최종수정: 2026-06-15 16:05 KST**

## 목적 및 규칙 (Purpose & Rules)
본 파일(`.project-docs/99_AI_SYNC.md`)은 여러 AI 모델(Codex, Antigravity, Claude 등)이 컨텍스트를 공유하고 작업을 이어가기 위한 공통 데이터베이스 역할을 합니다.
새로운 채팅 또는 새로운 AI 모델이 투입되었을 때, 이 파일을 가장 먼저 읽어 이전 작업의 맥락과 현재 진행 상태를 파악해야 합니다.

### 📌 필수 지침 (AI Rules & Guidelines)

**1. 문서화 및 로깅 (Documentation & Logging)**
- **작업 전후 갱신**: 투입 즉시 본 문서(목표)를 확인하고, 작업 종료 시 `99_AI_WORK_LOG.md`에 상세 내역을 추가합니다.
- **타임스탬프 & 개발 일지**: 모든 문서(로그, 체인지로그 등)에 기록 시 **반드시 구체적 시간(HH:MM KST)**을 명시하십시오. `CHANGELOG_YYYYMMDD.md` 작성 및 `08_DEV_DIARY.md` 연결도 의무입니다.

**2. 코드 수정 안전 수칙 (Code Safety)**
- **[🚨 절대 원칙] 코드 임의 생략 금지**: 파일 수정 시 `// Abbreviated for brevity` 등으로 기존 코드를 요약하거나 날려버리는 행위를 엄격히 금지합니다.
- **공통 모듈 전체 사전 확인**: 공통 CSS/JS(`base.css`, `sandbox.js` 등)를 수정하기 전, 중복 방지를 위해 가급적 **해당 파일 전체를 우선 리딩**하십시오.
- **대규모 파일 분할 작업**: 파일이 지나치게 길 경우, 임의 요약하지 말고 사용자에게 단계별 계획을 브리핑한 후 Chunk 단위로 나누어 부분 수정하십시오.

**3. 스크립트 자동화 및 검증 (Automation & Verification)**
- **일괄 처리 스크립트 작성**: 다수 파일 구조 변경 시, AI가 직접 타이핑하지 말고 Python/JS 스크립트를 작성해 기계적으로 치환하여 휴먼 에러를 막으십시오.
- **Spot-check 필수 교차 검증**: 스크립트 실행 성공 후, 반드시 결과 산출물 1~2개를 `view_file`로 열어 의도대로 코드가 들어갔는지 **눈으로 교차 검증**하십시오.

**4. 워크플로우 및 트러블슈팅 (Workflow & Others)**
- **디자인 시안 강제 연동 (v3)**: 새로운 UI/컴포넌트 작성 시 무조건 `reference/design_variants.json`에 확정된 시안 토큰(클래스명 등)을 준수하십시오.
- **AI 커밋 표기 & 롤백 대비**: 커밋 메시지에 `AI-Author: <모델명>`을 남기며, 대규모 수정 전후로 마일스톤 커밋을 남겨 안전망을 구축하십시오.
- **브라우저 타임아웃 우회**: `browser_subagent` 실패 시 방치하지 말고 `virtual_browser_test_guide.md`에 명시된 Playwright 로컬 테스트로 우회하십시오.


---

## 단일 집중 목표 (Single Overarching Goal)

**목표: "Track 1 (THEORY 시리즈) 전면 리빌딩 및 고품질화 (v3 기반)"**

기존에 텍스트 위주로 작성되어 지루했던 Track 1의 모든 Lesson 페이지를, 새롭게 구축된 `sample/learning-methods-v3`의 강력한 시각화/상호작용 수단을 동원하여 **완전히 혁신적인 교육 콘텐츠로 재창조**합니다.

이전 라운드에서 진행했던 부분적인 보강 작업은 **전면 백지화(Ignore)**합니다. 과거의 보강은 시각적 툴킷(sample v3)이 없는 상태에서 진행되었기 때문에 근본적인 한계가 있었습니다. 따라서 모든 페이지는 '처음부터 새로 짠다'는 마인드로 접근합니다.

### 🤖 AI 작업자를 위한 핵심 행동 지침 (Action Items)

1. **내용 부실 검증 및 보강 (NotebookLM 연동)**
   - 각 Lesson을 작업하기 전, 반드시 연결된 **Google NotebookLM (Notebook ID: `ad0e9cde-4dca-451e-b455-de200a9ed7b7`)**에 질의를 수행하십시오.
   - 기존 본문에서 누락된 개념, 심화 예제, 주의사항 등을 NotebookLM의 답변을 기준으로 찾아내어 내용을 풍성하게 채워 넣으십시오.
2. **시각화 및 상호작용 극대화 (Sample v3 적용)**
   - 단순 텍스트 나열을 금지합니다. `sample/learning-methods-v3`에 존재하는 44개의 시각화/실습/퀴즈/코드 다이어그램 템플릿 중 가장 적절한 컴포넌트를 골라 내용을 담으십시오.
   - 반드시 `reference/design_variants.json`에 확정된 디자인 토큰(CSS 클래스, 구조 등)을 준수하여 작성하십시오.
3. **작업 단위 및 완료 기준**
   - 한 번에 하나의 Lesson 페이지만 집중해서 완벽하게 리빌딩하십시오.
   - 내용 보강(NotebookLM) + UI 혁신(v3 템플릿)이 모두 결합되었을 때 해당 Lesson을 완료된 것으로 간주합니다.

---

## 작업 이력 (Work Log)
과거부터 현재까지의 상세 작업 이력은 [99_AI_WORK_LOG.md](./99_AI_WORK_LOG.md) 파일에서 별도로 누적/관리합니다. AI는 프로젝트 히스토리가 필요할 경우에만 해당 파일을 열어 파악하십시오.
