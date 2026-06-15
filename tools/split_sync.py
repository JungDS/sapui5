import os

sync_file = r"c:\ui5\study\sapui5\.project-docs\99_AI_SYNC.md"
work_log_file = r"c:\ui5\study\sapui5\.project-docs\99_AI_WORK_LOG.md"

with open(sync_file, "r", encoding="utf-8") as f:
    content = f.read()

split_keyword = "## 작업 이력 (Work Log)"

if split_keyword in content:
    parts = content.split(split_keyword)
    header_content = parts[0]
    log_content = split_keyword + parts[1]

    # 1. 99_AI_WORK_LOG.md 작성
    with open(work_log_file, "w", encoding="utf-8") as f:
        f.write("# AI Workspace Work Log\n\n본 파일은 `99_AI_SYNC.md`에서 분리된 상세 작업 이력 파일입니다.\n\n" + log_content)

    # 2. 99_AI_SYNC.md 업데이트 사항 준비
    
    # 기존 6번 항목이 있다면 제거하고 새로운 통합 규칙으로 대체하기 위한 작업
    # 5번 항목 끝("...라고 명시합니다.") 뒤에 새로운 6~9번 항목을 붙여넣기.
    
    old_rule_end = "커밋 단위 확인 불가, 문서 Work Log 기준 추정\"이라고 명시합니다."
    
    new_rules = """
6. **[🚨 절대 원칙] 코드 임의 생략(Abbreviation) 금지**: 파일 수정/복사 시 주석으로 `// Abbreviated for brevity` 등을 적으며 원본 코드를 임의로 지우거나 생략하는 행위를 엄격히 금지합니다. 기존 코드가 유실되는 결함은 최우선 경계 대상입니다.
7. **[대규모 파일 안전 처리 가이드 - 분할 작업(Chunking)]**: 파일이 너무 길어 한 번에 처리하기 어렵다면 임의로 요약하지 말고, 사용자에게 단계별 진행 계획을 알린 뒤 블록 단위로 순차적 부분 수정을 진행하십시오.
8. **[자동화 우선주의 및 스크립트 위임]**: 다수 파일에 동일한 구조 변경을 하거나 큰 파일을 병합할 때, AI가 직접 전체 텍스트를 출력하려 하지 말고 Python/Node.js 스크립트(`tools/` 디렉토리 활용)를 작성해 프로그램이 일괄 처리(Batch Processing)하도록 위임하여 휴먼 에러를 방지하십시오.
9. **[안전망 구축 및 아키텍처 불변성]**: 대규모 수정 전후로 마일스톤 단위의 커밋을 수행해 롤백에 대비하십시오. 또한, 임의로 네이밍 컨벤션을 창조하지 말고 기존 파일들의 스타일을 철저히 모방하며, 파일이 너무 방대해질 경우 기능별로 쪼개어 모듈화(.md 요약본 포함) 하십시오."""
    
    # 기존에 6. 번 항목이 이미 들어가 있다면 치환을 위해 정규식이나 로직 사용
    import re
    # old_rule_end 이후부터 "---" 이전까지의 규칙 섹션 날리기
    header_content = re.sub(
        r'("이라고 명시합니다\.)(.*?)(\n---\n)', 
        r'\1\n' + new_rules + r'\n\n\3', 
        header_content, 
        flags=re.DOTALL
    )

    # 3. 새로운 작업 이력 링크 붙여넣기
    new_sync_content = header_content + split_keyword + "\n과거부터 현재까지의 상세 작업 이력은 [99_AI_WORK_LOG.md](./99_AI_WORK_LOG.md) 파일에서 별도로 누적/관리합니다. AI는 프로젝트 히스토리가 필요할 경우에만 해당 파일을 열어 파악하십시오.\n"

    with open(sync_file, "w", encoding="utf-8") as f:
        f.write(new_sync_content)
        
    print("성공: 99_AI_SYNC.md 리팩토링 완료 및 99_AI_WORK_LOG.md 생성됨.")
else:
    print("에러: '## 작업 이력 (Work Log)' 키워드를 찾을 수 없습니다.")
