# 개발 일지 - 2026-06-09

## 참여 AI
- **Antigravity IDE (Gemini 3.1 Pro)**
- **Codex (GPT-5)**

## 작업 상세 내용
- 사용자 피드백(초심자 친화, 분량 증가, 한눈에 정리 섹션 추가, 10·20대 캐주얼 톤 유지)을 반영하여 기존 작성된 `THEORY-01-M02` ~ `M06` 본문을 전면 재작성했습니다.
- "왜 이게 필요한가 → 무엇인가 → 어떻게 쓰나 → 실수/주의 → 정리"의 흐름을 각 레슨에 일관되게 적용했습니다.
- 글로서리 검증 스크립트를 재실행하여 재작성된 내용에서도 미정의 단어가 0건임을 확인했습니다.
- `HANDOFF_LESSON_CONTENT.md` 진행 현황을 갱신하고, `99_AI_SYNC.md`에 최신 작업 내역을 추가했습니다.

## 고민했던 점 및 설계 이유
- **"완전 초심자"라는 타겟의 구체화**: 기존에는 "Domain은 데이터 타입과 길이를 정의합니다" 수준의 설명이었다면, 이제는 "옷감의 재질", "식판의 빈 그릇" 등 일상생활의 비유를 적극적으로 도입했습니다. 단순히 기능 명세서가 아니라 **학습지(튜토리얼)**로서의 역할을 하도록 기획했습니다.
- **마무리 섹션(한눈에 정리)의 중요성**: 분량이 늘어나면서 핵심 메시지가 흩어질 수 있다는 판단에, 맨 하단에 팁 콜아웃을 사용한 3~4줄짜리 리스트 요약을 강제 배치했습니다. 이 패턴을 향후 모든 레슨(THEORY-02~)에도 동일하게 적용하면 학습 효율이 극대화될 것입니다.
- **문체(Tone & Manner)**: 이모지 사용량을 적절히 유지하면서 너무 딱딱하지 않게, 그렇다고 지나치게 장난스럽지 않게 선을 유지하려고 노력했습니다. `<h2>` 태그 옆에 이모지를 하나씩 달고, 경고(`warn`) 콜아웃에는 실제 실무에서 겪을 법한 치명적 실수를 스토리텔링 방식으로 풀었습니다.

---

## Codex 추가 작업 상세 내용
- 사용자 지시에 따라 작업 범위를 `THEORY-01-M02` ~ `THEORY-01-M06` 재보강으로 제한하고, `THEORY-02` 이후 신규 작성은 진행하지 않았습니다.
- 5개 Lesson을 다시 읽고 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 설정/확인 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 흐름이 더 또렷하게 보이도록 문단을 재구성했습니다.
- `Length`, `Output Length`, `Semantic Meaning`, `F1 Help`, `Work Area`, `Reusable Type`, `Client-Dependent`, `Data Class`, `Size Category`, `Buffering`, `Test Data` 등 초심자가 멈칫할 수 있는 용어를 글로서리에 추가했습니다.
- 글로서리 미정의 검증을 실행해 미정의 0건을 확인했습니다.

## Codex 고민했던 점 및 설계 이유
- **반복 재작성의 방향성**: 이미 피드백 반영 이력이 있었기 때문에 완전히 다른 톤으로 갈아엎기보다는, 기존 이모지/콜아웃 스타일은 유지하면서 “처음 보는 사람이 어디서 막힐까?”를 기준으로 설명 간격을 촘촘하게 만들었습니다.
- **용어 태깅 기준**: 모든 영어 표현을 툴팁화하면 화면이 과해질 수 있어, Lesson 이해가 끊기는 핵심 개념 위주로 태그했습니다. 대신 태그한 용어는 글로서리에 일상 비유와 사용 Lesson을 함께 등록해 깨진 툴팁이 생기지 않게 했습니다.
- **범위 관리**: 사용자가 결과 확인 후 이후 작업을 지시하겠다고 했으므로, 문서 인계에도 `THEORY-02` 이후는 보류라고 명시했습니다.

---

## Codex THEORY-02 작업 상세 내용
- `THEORY-02-M01` ~ `THEORY-02-M06` 6개 Lesson 본문 조각을 신규 작성했습니다.
- `REPORT`, 주석, 활성화, 실행부터 `DATA / CONSTANTS / TYPES`, `WRITE`, `IF / CASE`, `DO / WHILE`, `String / SY-*` 시스템 필드까지 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 구조로 작성했습니다.
- `ABAPProgram`, `REPORT`, `DATAStatement`, `WRITEStatement`, `IFStatement`, `DOStatement`, `SYSUBRC` 등 THEORY-02 용어 24종을 글로서리에 추가했습니다.

## Codex THEORY-02 고민했던 점 및 설계 이유
- **초심자 문법 폭 조절**: ABAP 기본 문법을 다루면서도 Open SQL, Internal Table, ALV 같은 후속 주제를 끌어오지 않도록 조심했습니다. 필요한 경우 “나중에 다룬다”로만 연결했습니다.
- **코드 예제의 최소성**: 예제는 모두 한 화면에서 읽을 수 있는 짧은 Report 형태로 제한했습니다. 첫 문법 학습 단계에서는 예쁜 구조보다 실행 가능한 작은 성공 경험이 더 중요하다고 판단했습니다.
- **시스템 필드 설명 방식**: `SY-SUBRC`는 후속 Lesson에서 계속 등장할 핵심 개념이므로, `FIND` 예제로 성공/실패 확인만 보여주고 데이터베이스 조회나 Internal Table 세부 내용은 확장하지 않았습니다.

---

## Codex THEORY-03 작업 상세 내용
- `THEORY-03-M01` ~ `THEORY-03-M04` 4개 Lesson 본문 조각을 신규 작성했습니다.
- `PARAMETERS` 기본 선언, `DEFAULT / OBLIGATORY`, 입력값 `WRITE` 출력, `SELECTION-SCREEN BEGIN OF BLOCK`과 `FRAME TITLE` 기초를 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 초심자 학습 흐름에 맞춰 “입력 화면이 왜 필요한가 → 무엇을 쓰나 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 구조로 작성했습니다.
- `PARAMETERSStatement`, `SelectionScreen`, `DEFAULTOption`, `OBLIGATORYOption`, `InputOutputFlow`, `SelectionScreenBlock` 등 THEORY-03 용어 11종을 글로서리에 추가했습니다.

## Codex THEORY-03 고민했던 점 및 설계 이유
- **후속 주제 경계 유지**: Selection Screen을 다루다 보면 `SELECT-OPTIONS`, `AT SELECTION-SCREEN`, Value Help로 바로 확장하고 싶어지지만, JSON 지침에 맞춰 PARAMETERS 맛보기 수준으로 제한했습니다.
- **입력 화면의 UX 감각**: 단순 문법 설명이 아니라 “사용자가 프로그램 실행 전에 값을 넣는 첫 화면”이라는 관점으로 DEFAULT, OBLIGATORY, Block을 설명했습니다.
- **Block 설명의 깊이 조절**: 텍스트 심볼과 프레임 제목은 필요한 만큼만 언급하고, 화면 이벤트 검증이나 복잡한 선택 조건은 뒤 Section으로 넘겼습니다.

---

## Codex THEORY-04 작업 상세 내용
- `THEORY-04-M01` ~ `THEORY-04-M06` 6개 Lesson 본문 조각을 신규 작성했습니다.
- `Foreign Key`, `Check Table`, `Cardinality`, `Value Table`, `Search Help`, `F4 Help`, `Selection Method`, `Collective Search Help`, `MESSAGE` 등을 JSON 지침 순서대로 구성했습니다.
- 각 Lesson에 정상 흐름과 오류 흐름을 분리해, 기준표 관계·입력 도움말·프로그램 검증의 역할을 초심자가 구분할 수 있도록 작성했습니다.
- `ForeignKey`, `CheckTable`, `ValueTable`, `SearchHelp`, `F4Help`, `CollectiveSearchHelp`, `DDICValidation` 등 THEORY-04 용어 12종을 글로서리에 추가했습니다.

## Codex THEORY-04 고민했던 점 및 설계 이유
- **Value Table 오해 방지**: Domain의 Value Table을 실제 Foreign Key 검증과 혼동하기 쉬워, M02에서 “후보/힌트”와 “실제 관계”를 반복적으로 분리해 설명했습니다.
- **입력 도움말과 검증의 경계**: F4 Help가 보인다고 업무 권한이나 모든 검증이 끝난 것은 아니므로, Search Help는 편의 기능이고 최종 업무 검증은 별도 로직이 필요하다는 점을 여러 Lesson에 분산해 강조했습니다.
- **후속 주제 확장 제한**: `AT SELECTION-SCREEN`, 고급 Search Help Exit, 복잡한 권한 검증은 후속 심화 범위로 남기고, 이번 섹션은 DDIC 관계와 F4 Help 기본 원리에 집중했습니다.

---

## Codex THEORY-05 작업 상세 내용
- `THEORY-05-M01` ~ `THEORY-05-M06` 6개 Lesson 본문 조각을 신규 작성했습니다.
- `FORM / PERFORM`, `USING / CHANGING`, `CALL FUNCTION`, Local Class, Global Class, 모듈화 선택 기준을 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 흐름으로 작성했습니다.
- `FORMStatement`, `PERFORMStatement`, `FunctionModule`, `CALLFUNCTION`, `LocalClass`, `GlobalClass`, `StaticMethod`, `InstanceMethod`, `Modularization` 등 THEORY-05 용어 23종을 글로서리에 추가했습니다.
- 글로서리 미정의 검증과 로컬 뷰어 확인(`THEORY-05-M01`, `M03`, `M06`)을 완료했습니다.

## Codex THEORY-05 고민했던 점 및 설계 이유
- **레거시와 신규 설계의 균형**: ABAP 현장에서는 FORM과 Function Module을 읽어야 하는 일이 많지만, 신규 설계 감각은 Class 중심으로 가야 하므로 “이해해야 하는 문법”과 “새로 만들 때 우선 고려할 선택지”를 분리해 설명했습니다.
- **파라미터 방향 혼동 줄이기**: `USING`, `CHANGING`, Function Module의 `EXPORTING / IMPORTING`은 초심자가 가장 쉽게 방향을 헷갈리는 부분이라, 호출자 기준과 모듈 기준을 반복적으로 풀어 썼습니다.
- **OO 범위 조절**: Local/Global Class는 이번 섹션에서 맛보기만 다루고, 상속·인터페이스·예외 클래스 같은 설계 심화는 THEORY-18로 넘겼습니다.

---

## Codex THEORY-06 작업 상세 내용
- `THEORY-06-M01` ~ `THEORY-06-M06` 6개 Lesson 본문 조각을 신규 작성했습니다.
- Internal Table 필요성, Runtime Memory와 Application Server, Line Type/Work Area/STANDARD TABLE 선언, APPEND/INSERT, LOOP AT, READ TABLE, 미니 데이터 가공 흐름을 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 구조로 작성했습니다.
- `InternalTable`, `RuntimeMemory`, `ApplicationServer`, `LineType`, `StandardTable`, `APPENDStatement`, `LOOPATStatement`, `READTABLEStatement`, `WITHKEYClause` 등 THEORY-06 용어 12종을 글로서리에 추가했습니다.
- 기존 `WorkArea`, `WRITEStatement`, `SYSUBRC`의 `used_in_lessons`를 새 본문 사용처에 맞게 보정했습니다.

## Codex THEORY-06 고민했던 점 및 설계 이유
- **테이블이라는 단어의 오해 방지**: 초심자는 Internal Table을 DDIC Transparent Table과 혼동하기 쉬워, “영구 저장소”와 “실행 중 작업용 표”를 M01부터 반복적으로 분리했습니다.
- **문법보다 데이터 흐름 우선**: `TYPES`, `DATA`, `APPEND`, `LOOP`, `READ`를 개별 문법으로만 설명하면 금방 흩어지므로, Work Area에 한 줄을 담고 Internal Table에 넣고 다시 꺼내는 흐름을 계속 말로 풀었습니다.
- **성능 심화의 범위 조절**: SORTED/HASHED TABLE, BINARY SEARCH, Field Symbol, MODIFY 등은 THEORY-07 이후 범위로 남기고, 이번 섹션에서는 STANDARD TABLE 기반의 기본 읽기/검색 감각에 집중했습니다.

---

## Codex THEORY-07 작업 상세 내용
- `THEORY-07-M01` ~ `THEORY-07-M09` 9개 Lesson 본문 조각을 신규 작성했습니다.
- `MODIFY / INDEX / TRANSPORTING`, `DELETE / WHERE`, `SORT / ASCENDING / DESCENDING`, `READ TABLE ... BINARY SEARCH`, `SORTED TABLE / HASHED TABLE`, `FIELD-SYMBOLS / ASSIGNING`, Secondary Key, Deep Structure, `CLEAR / REFRESH / FREE`를 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 구조로 작성했습니다.
- `MODIFYStatement`, `DELETEStatement`, `SORTStatement`, `BINARYSEARCHAddition`, `SortedTable`, `HashedTable`, `FieldSymbol`, `SecondaryKey`, `DeepStructure`, `CLEARStatement` 등 THEORY-07 용어 26종을 글로서리에 추가했습니다.
- 기존 `SYSUBRC`의 `used_in_lessons`를 BINARY SEARCH Lesson 사용처에 맞게 보정했습니다.

## Codex THEORY-07 고민했던 점 및 설계 이유
- **성능 주제의 난이도 조절**: BINARY SEARCH, SORTED/HASHED TABLE, Secondary Key는 깊게 들어가면 자료구조 강의가 되기 쉬워, 초심자 단계에서는 “전제 조건과 오해 방지”에 초점을 맞췄습니다.
- **원본 변경 위험 강조**: MODIFY, DELETE, Field Symbol은 Internal Table 원본을 바꾸는 문법이므로, 성공 흐름보다 실패/오류 흐름을 더 눈에 띄게 배치했습니다.
- **후속 범위 분리**: ALV Cell Color/Style, 고급 키 설계, 대량 성능 튜닝은 후속 THEORY-19 또는 실무 심화 범위로 넘기고, 이번 섹션은 Internal Table 응용의 첫 감각에 집중했습니다.

---

## Codex THEORY-08 작업 상세 내용
- `THEORY-08-M01` ~ `THEORY-08-M05` 5개 Lesson 본문 조각을 신규 작성했습니다.
- SALV 목적과 `CL_SALV_TABLE`, `FACTORY` Method로 Internal Table 출력, 기본 Functions와 `DISPLAY`, Internal Table → SALV 미니 리포트, Sort/Layout/Variant 심화 범위 분리를 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 구조로 작성했습니다.
- `SALV`, `CLSALVTABLE`, `ListOutput`, `FactoryMethod`, `DISPLAYMethod`, `FunctionsBasic`, `MiniReport`, `SortDeferred`, `LayoutDeferred`, `VariantDeferred` 등 THEORY-08 용어 11종을 글로서리에 추가했습니다.
- 기존 `InternalTable`의 `used_in_lessons`를 SALV 미니 리포트 Lesson 사용처에 맞게 보정했습니다.

## Codex THEORY-08 고민했던 점 및 설계 이유
- **ALV 심화 범위 분리**: SALV를 다루면 Layout, Variant, Event, Cell Style까지 바로 확장되기 쉬워, JSON 지침대로 이번 섹션은 `FACTORY → Functions → DISPLAY` 기본 흐름에 집중했습니다.
- **OO 문법 부담 완화**: `CL_SALV_TABLE=>FACTORY`와 `lo_alv->display( )`가 초심자에게 갑자기 어려워 보일 수 있어, Class/Method 의미보다 “SALV 객체 생성 후 화면 표시”라는 흐름을 반복했습니다.
- **예쁜 화면과 데이터 정확성 구분**: SALV 화면이 떠도 데이터 검증이 끝난 것은 아니므로, 빈 결과 안내와 표시 전 데이터 품질 확인을 별도 주의점으로 넣었습니다.

---

## Codex THEORY-09 작업 상세 내용
- `THEORY-09-M01` ~ `THEORY-09-M06` 6개 Lesson 본문 조각을 신규 작성했습니다.
- `SELECT FROM / FIELDS`, `WHERE` 조건과 Host Variable `@`, `SELECT SINGLE`, `INTO TABLE`, 명시적 Target Table 선언, `SELECT in LOOP` 성능 위험을 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 구조로 작성했습니다.
- `ABAPSQL`, `SELECTFROMStatement`, `FIELDSClause`, `HostVariableAt`, `SELECTSINGLEStatement`, `INTOTABLEClause`, `ResultSet`, `ExplicitTargetTable`, `SELECTInLoop`, `PerformanceRisk` 등 THEORY-09 용어 13종을 글로서리에 추가했습니다.
- 기존 `WHEREClause`, `PARAMETERSStatement`, `SYSUBRC`, `InternalTable`의 `used_in_lessons`를 새 본문 사용처에 맞게 보정했습니다.

## Codex THEORY-09 고민했던 점 및 설계 이유
- **초심자용 테이블 선택**: Open SQL 첫 예제는 업무 테이블보다 부담이 적은 `T005T` 국가 텍스트 테이블을 중심으로 구성했습니다. 단, 실습 시스템마다 제공 테이블이 다를 수 있음을 주의점으로 남겼습니다.
- **문법과 운영 감각의 균형**: `SELECT FROM`, `FIELDS`, `WHERE`, `INTO TABLE` 문법을 알려주되, 조건 없는 대량 조회와 필요한 필드만 조회하는 습관을 반복해서 강조했습니다.
- **안티패턴 조기 노출**: JOIN이나 FOR ALL ENTRIES를 아직 깊게 다루지 않더라도, SELECT in LOOP가 왜 위험한지 숫자 감각으로 먼저 익히도록 M06에서 별도 마무리 Lesson으로 구성했습니다.

---

## Codex THEORY-10 작업 상세 내용
- `THEORY-10-M01` ~ `THEORY-10-M06` 6개 Lesson 본문 조각을 신규 작성했습니다.
- Range Table의 `SIGN / OPTION / LOW / HIGH`, `SELECT-OPTIONS`, Selection Table, `WHERE field IN @range`, Multiple Selection, Include/Exclude, `EQ / BT / CP`, 직접 Range 조작을 JSON 지침 순서대로 구성했습니다.
- 각 Lesson을 “지난 Lesson 연결 → 왜 필요한가 → 무엇인가 → 최소 예제 → 정상/오류 흐름 → 실무 주의 → 한눈에 정리” 구조로 작성했습니다.
- `RangeTable`, `SIGNField`, `OPTIONField`, `LOWField`, `HIGHField`, `SELECTOPTIONSStatement`, `SelectionTable`, `WHEREINPredicate`, `MultipleSelection`, `IncludeSign`, `ExcludeSign`, `EQOption`, `BTOption`, `CPOption`, `AppendRange` 등 THEORY-10 용어 18종을 글로서리에 추가했습니다.
- 기존 `ABAPSQL`의 `used_in_lessons`를 Range Table과 Open SQL 연결 Lesson 사용처에 맞게 보정했습니다.

## Codex THEORY-10 고민했던 점 및 설계 이유
- **Range Table을 조건 언어로 설명**: SIGN/OPTION/LOW/HIGH를 표 구조로만 설명하면 외우기 어려워, “포함/제외 + 비교 방식 + 시작/끝값”이라는 말로 읽는 연습을 반복했습니다.
- **빈 조건과 넓은 조회 주의**: SELECT-OPTIONS는 편리하지만 대량 조회 위험을 만들 수 있어, 빈 Range와 넓은 범위는 반드시 요구사항과 성능 기준으로 확인해야 한다고 정리했습니다.
- **UI와 내부 구조 연결**: Multiple Selection 팝업을 별도 화면 기능으로만 보지 않고, Selection Table 내부 행을 편집하는 UI라고 연결해 디버깅 관점을 강화했습니다.
