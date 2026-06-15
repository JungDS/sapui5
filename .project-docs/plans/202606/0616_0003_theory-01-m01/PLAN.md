---
status: done
goal: THEORY-01-M01을 v3 기반 고품질 Lesson으로 리빌딩
scope: docs/abap/lesson-content/THEORY-01-M01.html, 관련 glossary/공통 자산/검증 문서
branch: docs/project-docs-ai-native-restructure
---

# PLAN — THEORY-01-M01 리빌딩

> 📅 **최종수정: 2026-06-16 00:15 KST**

## 배경 (왜)
Track 1은 전면 백지화 후 `sample/learning-methods-v3` 기반으로 다시 작성해야 한다. 첫 Lesson인 THEORY-01-M01은 SAP Dictionary, Repository Object, SE11/ADT, 저장/활성화의 관계를 초심자가 시각적으로 잡는 기준점이다.

## 접근 (어떻게)
1. NotebookLM 질의와 SAP 공식 문서 확인으로 보강 포인트를 확정한다.
2. v3 학습수단은 관계도/프로세스 플로우/미니 실습/퀴즈 조합으로 좁힌다.
3. Lesson fragment는 인라인 style/script 없이 기존 공통 토큰과 필요한 공통 자산만 사용해 재작성한다.
4. `data-glossary` 용어와 `reference/abap_glossary.json` 패리티를 검증한다.
5. 로컬 브라우저에서 콘솔 오류와 핵심 인터랙션을 확인하고 결과를 기록한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../01_AI_SYNC.md).
- 첫 Lesson이므로 Chapter 01 표기와 다음 Lesson 연결 문구까지 확인한다.
