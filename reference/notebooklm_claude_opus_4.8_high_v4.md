# NotebookLM 페이로드 프롬프트 v4 — 합의 근거 문서 (Decision Record)

> 📅 **최종수정: 2026-06-18 01:29 KST**

> 목적: Claude / Gemini / GPT 세 AI의 v1~v3 제안이 계속 갈리는 상황에서, **"취향"이 아니라 "검증된 사실"에 근거해 v4로 수렴**시키기 위한 설득용 문서.
> 대상 프롬프트: [`notebooklm_claude_opus_4.8_high_v4.txt`](notebooklm_claude_opus_4.8_high_v4.txt) (9,769 chars)
> 작성 기준: 2026-06-17 / 실제 NotebookLM 노트북 `ad0e9cde-4dca-451e-b455-de200a9ed7b7`에 배포·실측 완료.

---

## 0. 한 줄 요약

세 후보가 갈리는 축은 **"경량(Gemini) ↔ 포괄(GPT)"** 단 하나다. 이 축은 **두 개의 측정 가능한 사실**로 이미 결판났다:
1. **NotebookLM 커스텀 프롬프트 하드캡 = 10,000자** (초과 시 배포 자체 불가).
2. **v4는 코드/비코드 레슨 양쪽에서 라이브로 통과** (무절단·전체 태그·스키마 일치).

따라서 v4는 "더 좋아 보이는 안"이 아니라 **제약을 만족하면서 실제로 동작이 증명된 유일한 안**이다.

---

## 1. 반박 불가능한 제약: 10,000자 하드캡

NotebookLM의 chat 커스텀 프롬프트 입력은 **최대 10,000자**다. 근거(추정 아님, 실측):

- `nlm chat configure --help` 명시: `--prompt ... (Custom prompt, required when goal=custom, **max 10000 chars**)`
- v2 라운드에서 Claude v2(10,056자)는 **실제로 거부**됨.
- 큰 프롬프트를 쿼리로 보냈을 때 Google이 `INVALID_ARGUMENT`로 거부함을 확인.

### 후보별 실측 크기 (v3 기준)

| 후보 | 크기(chars) | 10,000 대비 | 배포 가능? |
|---|---:|---:|:---:|
| Gemini v3 | 5,029 | +4,971 | ✅ |
| **Claude v3 (=v4 베이스)** | 8,642 | +1,358 | ✅ (실측 통과) |
| **GPT v3** | **14,480** | **−4,480** | ❌ **배포 불가** |
| **→ v4 (최종)** | **9,769** | **+231** | ✅ (실측 통과) |

> **핵심:** GPT v3는 내용 품질과 무관하게 **물리적으로 배포 불가능**하다. "GPT안이 더 풍부하다"는 평가는 맞지만, 14,480자는 NotebookLM에 들어가지 않는다. 그래서 v4의 임무는 *"GPT의 좋은 아이디어를 10,000자 예산 안으로 이식"* 하는 것이지, GPT안을 그대로 채택하는 게 아니다.

---

## 2. v4가 동작함을 증명한 라이브 테스트 (의견이 아니라 데이터)

v4를 실제 노트북 페르소나로 적용(`--goal custom --response-length longer`)하고, **코드/비코드 두 분기**를 모두 질의했다.

| 검증 항목 | 코드 레슨 (THEORY-02-M01) | 비코드 레슨 (THEORY-01-M01) |
|---|---|---|
| 16개 섹션 태그 전부 출력 | ✅ (누락 0) | ✅ (누락 0) |
| `<PAYLOAD_END>`로 완결(무절단) | ✅ (11,512 chars) | ✅ (8,551 chars) |
| `Is_Code_Lesson` 자동 판정 | ✅ YES | ✅ NO |
| 코드 분기 | 코드+시뮬레이션 4종 생성 | ✅ `CODE_NOT_APPLICABLE` 정상 발동 |
| `<![CDATA[ ]]>` 생존 | ✅ | ✅ |
| 글로서리 우리 스키마(`used_in_lessons`) | ✅ | ✅ |
| Forward-containment(미래 격리) | ✅ DATA/IF/Internal Table 제외 | ✅ Domain(M02)·Data Element(M03) 제외 |
| 근거(SAP 원문 인용) | citation 14건 | payload `SOURCE_EVIDENCE`에 BC430/BC400 인용 |
| Confidence_Score | 1.0 | 1.0 |

> **결론:** 두 분기(코드/비코드, NOT_APPLICABLE) 모두 규격대로 동작. 대량 작업의 최대 리스크였던 **출력 절단(truncation)이 발생하지 않음**을 실측으로 확인.

---

## 3. v4는 세 AI의 장점을 모두 흡수했다 (각자의 기여 존중)

v4는 어느 한 AI의 안이 아니라 **세 안의 검증된 강점을 통합**한 것이다.

### Claude(베이스)에서
- 12→16 섹션의 구조적 뼈대 (이미 라이브 통과한 검증된 구조).
- **시뮬레이션 4종 자산** 명시: `EXPECTED_OUTPUT`(→expected-log-comparison), `EXECUTION_TRACE`(→step-debugger-timeline), `FILL_BLANK_CANDIDATES`(→fill-blank-code), `BUGGY_VARIANT`(→bug-hunt-mission).
- **우리 글로서리 JSON 스키마 그대로** 출력(`title/category/tcode/desc/everyday_analogy/used_in_lessons`) → `abap_glossary.json` drop-in.
- 출력 예산(budget) + `<PAYLOAD_END>` 강제.

### Gemini에서 (경량·안전 본능)
- **글로서리 섹션도 `<![CDATA[ ]]>`로 래핑** — JSON 안의 `<`(예전 `<THIS_LESSON_ID>`) 때문에 다운스트림 XML 파싱이 깨질 수 있던 **실제 허점을 교정**.
- "더 늘리지 말 것" 원칙 수용 → `RAW_LESSON_RECORD` 전재 삭제(원본은 로컬 `reference/abap_curriculum_v5_4_*.json`에 이미 있음), 산문 전면 압축.

### GPT에서 (엄밀성·DoD 정합)
- 미래 구문 누출 금지 범위 확대: **examples·quiz answers·simulations·glossary·UI까지**.
- T-code 칩바 계약을 **별도 섹션 없이** `T_CODE_REQUIREMENTS`(+`glossary_key`)에 흡수 → 프로젝트 DoD(칩바·data-glossary·used_in_lessons) 충족하면서 길이 절약.
- 확장 v3 컴포넌트 목록(sandbox/step-debugger/… decision tree/shortcut simulator/code-line-matching).
- 컴팩트 `REBUILD_DOD_CHECKLIST` + invent 금지 항목 확대(shortcuts·table contents·runtime).
- 트렁케이션 시 **evidence부터 압축**하는 우선순위.

---

## 4. 두 갈래 입장에 대한 직접 반박

### "Gemini처럼 더 줄여야 한다" 에 대해
- 경량화 자체는 옳다(10K 제약 때문에). 하지만 Gemini v3는 **`WEB_REBUILD_BLUEPRINT`(표시 순서 페이지 설계), `T_CODE_REQUIREMENTS`, `CURRICULUM_VERIFICATION`을 삭제**했다. 이는 대량 리빌딩에서 *다운스트림 에이전트가 페이지를 어떻게 조립할지*에 대한 설계도를 잃는 것 → DoD의 "UI 혁신" 충족이 어려워진다.
- v4는 5,029자가 아니라 9,769자를 쓰지만, **9,769자는 합법(예산 내)이며 그 차이만큼 BLUEPRINT·근거·검증을 산다.** 예산이 남는데 일부러 안 쓰는 것은 최적이 아니다.

### "GPT처럼 더 풍부해야 한다" 에 대해
- 풍부함은 좋지만 **14,480자는 배포 불가**다. `LESSON_RECORD_EXTRACT`·`TCODE_CHIP_BAR_CONTRACT`·`ASSESSMENT_ITEMS`를 모두 *별도 섹션*으로 두면 예산을 초과한다.
- v4는 그 의도를 **흡수·병합**했다: extract→`LESSON_SCOPE_LOCK`에 objectives/handled_contents 추가, chip-bar→`T_CODE_REQUIREMENTS`에 흡수, assessment→`WEB_REBUILD_BLUEPRINT`의 QUIZ_ITEMS로 통합. **기능은 유지, 섹션 수와 길이는 절감.**

---

## 5. "개선의 여지 없음"의 정의 (수렴 기준)

v4는 아래를 모두 만족하므로 **추가 개선 요구는 근거를 동반해야 한다**:

1. ✅ 하드 제약(10,000자) 충족 + 여유 231자.
2. ✅ 코드/비코드 양 분기 라이브 통과(무절단·전체 태그).
3. ✅ 프로젝트 DoD 5요소(내용보강·UI설계·코드=시뮬레이션·T-code/글로서리·SAP 재검증) 전부 출력 슬롯 보유.
4. ✅ 다운스트림 기계 파싱 안전(CDATA, 우리 JSON 스키마).
5. ✅ 세 AI의 검증된 강점 통합.

> **수렴 규칙:** 앞으로의 변경 제안은 다음 중 하나를 **데이터로** 제시할 때만 채택한다 —
> (a) v4가 어떤 레슨에서 실제로 절단/태그 누락을 일으킨 증거,
> (b) 동일 기능을 유지하면서 길이를 더 줄이는 diff,
> (c) DoD 요소 중 v4에 빠진 항목의 구체적 적시.
> "더 풍부하게/더 간결하게" 같은 방향성 의견만으로는 v4를 변경하지 않는다.

---

## 6. 운영 메모

- 최종 프롬프트: [`notebooklm_claude_opus_4.8_high_v4.txt`](notebooklm_claude_opus_4.8_high_v4.txt)
- 현재 노트북에 **v4가 배포된 상태**다(`goal=custom`, `response-length=longer`).
- 재적용: `nlm chat configure ad0e9cde-4dca-451e-b455-de200a9ed7b7 --goal custom --prompt "$(cat reference/notebooklm_claude_opus_4.8_high_v4.txt)" --response-length longer`
- 원복: `nlm chat configure ad0e9cde-4dca-451e-b455-de200a9ed7b7 --goal default`
- 쿼리 형식(대량 작업): `nlm notebook query ad0e9cde-… "Generate the payload for Lesson ID: <THEORY-XX-MYY>" --json`
- ⚠️ 다중 AI가 이 노트북을 동시에 쓰면 모두 payload 형식 답변을 받는다(의도된 배포 상태).
