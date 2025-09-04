(function () {
  // Minimal PDF list app: fetch pdf.json, render list, add search, and handle errors.
  const app = document.createElement('section');
  app.id = 'cards';
  app.classList.add('cards');

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(app);
    loadAndRender();
  });

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    document.body.appendChild(app);
    loadAndRender();
  }

  async function loadAndRender() {
    try {
      setStatus('Loading...');
      const res = await fetch('pdf.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data.pdf) ? data.pdf : [];

      if (items.length === 0) {
        setStatus('No PDFs found.');
        return;
      }

      // render
      setStatus(`${items.length} PDF(s) found`);
      app.innerHTML = '';

      function renderFiltered() {
        for (const p of items) {
          const article = document.createElement('article');
          article.className = 'card';
          article.dataset.title = capitalize(p.title || '');
          article.dataset.year = p.year || '';
          article.dataset.subjects = p.subjects || '';

          article.onclick = () => {
            console.log(`Article clicked: ${p.link}`);
            window.location.href = p.link; // ✅ don't escape URLs
          };

          article.innerHTML = `
            <h4>${escapeHtml(capitalize(p.title || 'Untitled'))}</h4>
            <div class="meta">PDF — ${escapeHtml(p.size || '')}</div>
            <p>${escapeHtml(p.description || '')}</p>
            <a class="btn ghost download" href="${p.link}" download>Download PDF</a>
          `;
          app.appendChild(article);
        }
      }
      renderFiltered();

    } catch (err) {
      console.error('Failed to load pdf.json', err);
      setStatus('Failed to load PDFs. Check console or run a local server.', true);
    }
  }

  // small helpers
  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function capitalize(s) {
    if (!s) return '';
    return s.replace(/\b\w/g, ch => ch.toUpperCase());
  }


  function setStatus(msg, isError = false) {
    app.innerHTML = `<p style="color:${isError ? 'red' : 'black'}">${escapeHtml(msg)}</p>`;
  }

})();