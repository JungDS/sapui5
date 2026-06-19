---
status: done
goal: Track 1 전체 Lesson 리빌딩을 한 Lesson씩 반복 완료하는 파이프라인 자동화
scope: tools/start-lesson-work.mjs + tools/track1-pipeline.mjs + 진행 문서/plan scaffold
branch: docs/project-docs-ai-native-restructure
---

# PLAN — Track 1 Pipeline Automation

> 📅 **최종수정: 2026-06-19 23:34 KST**

## 배경
기존 자동화는 다음 Lesson 하나를 claim하고 plan scaffold를 만드는 수준이었다. 사용자가 의도한 범위는 Track 1 전체를 DoD 기준으로 한 Lesson씩 완료하는 반복 실행 체계다.

## 접근
1. 현재 active Lesson이 있으면 새 Lesson 시작을 차단한다.
2. Track 1 커리큘럼 전체 큐와 Chapter별 진행률을 계산한다.
3. 완료 처리 시 active claim 제거, 완료 로그 추가, Chapter 표 갱신, plan 상태 갱신을 자동화한다.
4. `finish --start-next`로 완료 직후 다음 Lesson claim과 plan scaffold를 이어서 생성한다.

## 완료 정의
- Lesson별 실제 완료 기준은 [01_AI_SYNC DoD](../../../.project-docs/01_AI_SYNC.md)를 그대로 따른다.
- 자동화는 검증을 우회하지 않고, 검증 완료 후 상태 전환만 수행한다.
