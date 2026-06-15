document.querySelectorAll('[data-tabs]').forEach((tabs) => {
  const buttons = Array.from(tabs.querySelectorAll('[data-tab]'));
  const panels = Array.from(tabs.querySelectorAll('.tab-panel'));
  buttons.forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.tab);
    buttons.forEach((b) => b.classList.toggle('active', b === button));
    panels.forEach((panel, i) => panel.classList.toggle('active', i === index));
  }));
});

document.querySelectorAll('[data-fill], [data-short]').forEach((box) => {
  const input = box.querySelector('input[data-answer]');
  const output = box.querySelector('output');
  box.querySelector('[data-check]').addEventListener('click', () => {
    const ok = input.value.trim().toLowerCase() === input.dataset.answer.toLowerCase();
    output.textContent = ok ? '정답입니다. 직전 문장 결과는 sy-subrc로 확인합니다.' : '다시 확인하세요. 힌트: 시스템 필드입니다.';
  });
});

document.querySelectorAll('[data-bug-check]').forEach((button) => {
  button.addEventListener('click', () => {
    const box = button.closest('.bug-hunt');
    const checked = box.querySelectorAll('input[data-bug]:checked').length;
    box.querySelector('output').textContent = checked === 2 ? '정답입니다. 실패 분기와 이전 값 위험을 모두 찾았습니다.' : '두 가지 위험을 모두 찾아야 합니다.';
  });
});

document.querySelectorAll('[data-sandbox]').forEach((box) => {
  const run = () => {
    const bukrs = box.querySelector('[data-bukrs]').value.trim();
    const amount = Number(box.querySelector('[data-amount]').value || 0);
    const lines = ['INITIALIZATION: 기본값 준비', `AT SELECTION-SCREEN: bukrs=${bukrs || '(blank)'}`];
    if (!bukrs) lines.push('MESSAGE E: 회사 코드가 비었습니다.');
    else {
      lines.push('START-OF-SELECTION: Open SQL 실행');
      lines.push(amount >= 90000 ? '결과: 고액 주문 1건 출력' : '결과: 조건에 맞는 주문 없음');
    }
    box.querySelector('[data-log]').textContent = lines.join('\n');
  };
  box.querySelector('[data-run]').addEventListener('click', run);
  run();
});

document.querySelectorAll('[data-stepper]').forEach((box) => {
  const steps = ['1. PARAMETERS - p_bukrs 입력 대기', '2. AT SELECTION-SCREEN - 필수값 검증', '3. START-OF-SELECTION - SELECT 실행', '4. LOOP - 현재 행 출력', '5. END-OF-SELECTION - 마무리 로그'];
  let index = 0;
  const view = box.querySelector('[data-step-view]');
  const render = () => { view.textContent = steps[index]; };
  box.querySelector('[data-prev]').addEventListener('click', () => { index = Math.max(0, index - 1); render(); });
  box.querySelector('[data-next]').addEventListener('click', () => { index = Math.min(steps.length - 1, index + 1); render(); });
  render();
});

document.querySelectorAll('[data-decision]').forEach((box) => {
  const select = box.querySelector('select');
  const output = box.querySelector('output');
  const messages = { read: 'READ TABLE 또는 SELECT SINGLE을 검토하세요. 키 완전성이 핵심입니다.', list: 'SELECT ... INTO TABLE 후 SALV 출력이 기본 후보입니다.', edit: '편집이 필요하면 CL_GUI_ALV_GRID 계열을 검토하세요.' };
  box.querySelector('button').addEventListener('click', () => { output.textContent = messages[select.value]; });
});

document.querySelectorAll('[data-logs]').forEach((box) => {
  const view = box.querySelector('[data-log-view]');
  const logs = { ok: 'AT SELECTION-SCREEN: OK\nSTART-OF-SELECTION: SELECT 3 rows\nDISPLAY: ALV rendered', fail: 'AT SELECTION-SCREEN: p_bukrs blank\nMESSAGE E: 회사 코드를 입력하세요\nSTART-OF-SELECTION: skipped' };
  box.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { view.textContent = logs[button.dataset.mode]; }));
  view.textContent = logs.ok;
});

document.querySelectorAll('[data-drag]').forEach((box) => {
  let token = null;
  box.querySelectorAll('[draggable="true"]').forEach((button) => {
    button.addEventListener('dragstart', () => { token = button.dataset.token; });
  });
  box.querySelectorAll('[data-drop]').forEach((drop) => {
    drop.addEventListener('dragover', (event) => event.preventDefault());
    drop.addEventListener('drop', () => {
      if (!token) return;
      drop.textContent = token;
      drop.classList.add('filled');
      const ok = token === drop.dataset.drop;
      box.querySelector('output').textContent = ok ? '올바른 위치입니다.' : '위치를 다시 생각해 보세요.';
      token = null;
    });
  });
});

document.querySelectorAll('[data-flash] button').forEach((button) => {
  button.addEventListener('click', () => button.classList.toggle('flipped'));
});

document.querySelectorAll('[data-exam]').forEach((box) => {
  box.querySelector('button').addEventListener('click', () => {
    const q1 = box.querySelector('input[name="q1"]:checked');
    const q2 = box.querySelector('input[name="q2"]:checked');
    let score = 0;
    if (q1 && q1.value === '4') score += 1;
    if (q2 && q2.value === 'AT SELECTION-SCREEN') score += 1;
    box.querySelector('output').textContent = `${score}/2점 - 틀린 문항은 해설을 보고 다시 회수하세요.`;
  });
});
