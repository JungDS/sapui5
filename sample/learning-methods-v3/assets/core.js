/* 
  [STANDARD_V3_STRUCTURE] 
  이 파일은 고품질 교육용 웹페이지 표준 구조(v3)를 따릅니다.
  AI 일괄 처리 및 스크립트 자동화의 대상이므로 코어 레이아웃과 클래스 명칭을 임의로 변경하지 마십시오.
*/
/* ============================================================
   core.js — IIFE 래퍼, ready(), parseJSON(), interpolate(), triggerConfetti()
   [모듈 목차] 이 파일에 없는 함수는 다른 모듈에 추가하세요.
   중복 추가 전 반드시 이 파일 전체를 먼저 확인하십시오.
   ============================================================ */

(function () {
  "use strict";

  function parseJSON(el) {
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { console.error("config parse error", e); return null; }
  }

  function interpolate(text, vars) {
    return String(text).replace(/\{(\w+)\}/g, function (_, k) {
      return (vars[k] === undefined || vars[k] === "") ? "(미입력)" : vars[k];
    });
  }

  // 다른 모듈(sandbox.js 등)이 전역으로 호출하므로 window에 노출한다.
  window.parseJSON = parseJSON;
  window.interpolate = interpolate;
})();
