    const search = document.getElementById('search');
    const cards = Array.from(document.querySelectorAll('.card'));
    const filterYear = document.getElementById('filterYear');
    const subjectChecks = Array.from(document.querySelectorAll('input[name="sub"]'));

    function applyFilters(){
      const q = search.value.trim().toLowerCase();
      const year = filterYear.value;
      const selectedSubs = subjectChecks.filter(c=>c.checked).map(c=>c.value);

      cards.forEach(c => {
        const title = (c.dataset.title || c.querySelector('h4').textContent).toLowerCase();
        const cardYear = c.dataset.year || '';
        const subs = (c.dataset.subjects || '').split(',').map(s=>s.trim()).filter(Boolean);

        const matchesSearch = q === '' || title.includes(q);
        const matchesYear = year === 'all' || cardYear === year;
        const matchesSub = selectedSubs.length === 0 || subs.some(s => selectedSubs.includes(s));

        c.style.display = (matchesSearch && matchesYear && matchesSub) ? '' : 'none';
      });
    }

    search.addEventListener('input', applyFilters);
    filterYear.addEventListener('change', applyFilters);
    subjectChecks.forEach(cb => cb.addEventListener('change', applyFilters));

    applyFilters();


  function open(c){
    const subject = c.querySelector('a');
    let a = `${subject.href}`;
    return window.location.href = a;
  }
  let m = document.getElementById('card1');
   let subject = m.querySelector('a');
   console.log(subject.href);