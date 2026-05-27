
(function(){
  const search = document.getElementById('search');
  const chips = Array.from(document.querySelectorAll('.chip'));
  const docs = Array.from(document.querySelectorAll('[data-doc]'));
  const sections = Array.from(document.querySelectorAll('[data-category-section]'));
  let active = 'all';
  function norm(v){ return (v || '').toLowerCase().trim(); }
  function apply(){
    const q = norm(search.value);
    let count = 0;
    docs.forEach(card => {
      const cat = card.getAttribute('data-category');
      const status = card.getAttribute('data-status');
      const text = norm(card.textContent);
      const mFilter = active === 'all' || cat === active || status === active;
      const mSearch = !q || text.includes(q);
      const show = mFilter && mSearch;
      card.style.display = show ? '' : 'none';
      if(show) count++;
    });
    sections.forEach(sec => {
      const has = Array.from(sec.querySelectorAll('[data-doc]')).some(card => card.style.display !== 'none');
      sec.style.display = has ? '' : 'none';
    });
  }
  search.addEventListener('input', apply);
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    active = chip.dataset.filter;
    apply();
  }));
  apply();
})();
