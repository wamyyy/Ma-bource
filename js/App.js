// ════════════════════════════════════════════════════════
//  WAMY — App.js  (Central Controller / Entry Point)
//  Manages application state, routing, and event wiring
// ════════════════════════════════════════════════════════
import { RAW_STOCKS, PAGES, MOCK_USER, MOCK_PORTFOLIO, MASI_DATA } from './Constants.js';
import { Stock }              from './Stock.js';
import { UIController }       from './UIController.js';

class WamyApp {
  constructor() {
    // ── State ────────────────────────────────────────────
    this.stocks      = RAW_STOCKS.map(d => new Stock(d));
    this.watchlist   = new Set();
    this.filters     = { sector: 'all', tab: 'top', query: '' };
    this._portfolio       = [...MOCK_PORTFOLIO];   // user positions (synced to localStorage)
    this._addStockTicker  = null;                  // selected ticker in add-stock modal

    this.currentPage  = 'marche';
    this.isAnimating  = false;
    this.isLight      = false;
    this.brokerFeeRate = 0.006;
    this.divSortKey   = 'yield';
    this.yieldAsc     = false;

    this._searchTimer = null;   // debounce handle
  }

  // ══════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════
  init() {
    this._loadTheme();
    this._loadWatchlist();
    this._attachEventListeners();
    this._setupSwipe();
    this._registerServiceWorker();
    this._checkAuth();
  }

  _startApp() {
    this._loadPortfolio();
    this._renderMasiCard();
    this._applyFilter();
    this._renderWatchlist();
    this._renderDivList();
    this._renderQuickRef();
    this._searchStocks();
    this._updateMarketTimer();
    setInterval(() => this._updateMarketTimer(), 30000);
  }

  // ══════════════════════════════════════════════════════
  //  MASI INDEX CARD
  // ══════════════════════════════════════════════════════
  _renderMasiCard() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const d = MASI_DATA;
    const up = d.change >= 0;

    // Main value
    set('masi-value', d.value.toLocaleString('fr-FR', { minimumFractionDigits: 2 }));

    // Change badge
    const chEl = document.getElementById('masi-change');
    if (chEl) {
      chEl.className = up ? 'change-pos' : 'change-neg';
      const arrow = up ? '▲' : '▼';
      chEl.innerHTML = `<span class="arrow-icon">${arrow}</span> ${Math.abs(d.change).toFixed(2)}%  (${up ? '+' : ''}${d.points.toFixed(2)} pts)`;
    }

    // Meta: YTD
    set('masi-meta', `YTD ${d.ytd > 0 ? '+' : ''}${d.ytd}%`);

    // Mini chart gradient color based on direction
    const chartPath = document.querySelector('.mini-chart path[stroke]');
    const chartFill = document.querySelector('.mini-chart path[fill^="url"]');
    const grad0     = document.querySelector('#chartGrad stop:first-child');
    const grad1     = document.querySelector('#chartGrad stop:last-child');
    const color     = up ? '#34d378' : '#f43f5e';
    if (chartPath) chartPath.setAttribute('stroke', color);
    if (grad0)  grad0.setAttribute('stop-color', color);
    if (grad1)  grad1.setAttribute('stop-color', color);

    // Market summary row
    set('mkt-cap', d.cap + ' MAD');
    set('mkt-vol', d.vol + ' MAD');
  }

  // ══════════════════════════════════════════════════════
  //  AUTH / SESSION
  // ══════════════════════════════════════════════════════
  _checkAuth() {
    const user = localStorage.getItem('wamy_user');
    if (!user) {
      this._showLoginScreen();
    } else {
      this._hideLoginScreen();
      this._startApp();
    }
  }

  _showLoginScreen() {
    const screen = document.getElementById('login-screen');
    if (screen) screen.classList.add('visible');
  }

  _hideLoginScreen() {
    const screen = document.getElementById('login-screen');
    if (!screen) return;
    screen.classList.add('hiding');
    setTimeout(() => { screen.classList.remove('visible', 'hiding'); }, 600);
  }

  _loginAs(user) {
    try { localStorage.setItem('wamy_user', JSON.stringify(user)); } catch(e) {}
    this._hideLoginScreen();
    this._startApp();
    UIController.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;margin-bottom:2px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Bienvenue ${user.name} !`);
  }

  _logout() {
    try { localStorage.removeItem('wamy_user'); } catch(e) {}
    this._showLoginScreen();
    UIController.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;margin-bottom:2px"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Déconnexion réussie`);
  }

  // ══════════════════════════════════════════════════════
  //  SERVICE WORKER (PWA)
  // ══════════════════════════════════════════════════════
  _registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(err => console.warn('SW registration failed:', err));
    }
  }

  // ══════════════════════════════════════════════════════
  //  CENTRALISED EVENT DELEGATION
  // ══════════════════════════════════════════════════════
  _attachEventListeners() {
    // ── Global click delegation ──
    document.addEventListener('click', e => {
      const t = e.target;

      // Login screen buttons
      if (t.id === 'btn-login-email' || t.closest('#btn-login-email')) {
        const emailInput = document.getElementById('login-email');
        const passInput  = document.getElementById('login-pass');
        const email = emailInput ? emailInput.value.trim() : '';
        if (!email || !email.includes('@')) {
          UIController.showToast('Veuillez entrer une adresse e-mail valide');
          return;
        }
        if (passInput && passInput.value.length < 4) {
          UIController.showToast('Le mot de passe est trop court');
          return;
        }
        // Mock user creation from email Prefix
        const prefix = email.split('@')[0];
        const name   = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        this._loginAs({ name: name, email: email, avatar: name.charAt(0) }); 
        return;
      }
      if (t.id === 'btn-login-google' || t.closest('#btn-login-google')) {
        this._loginAs(MOCK_USER); return;
      }
      if (t.id === 'btn-login-demo' || t.closest('#btn-login-demo')) {
        this._loginAs({ name: 'Visiteur', email: '', avatar: 'V' }); return;
      }

      // Logout button
      if (t.id === 'btn-logout' || t.closest('#btn-logout')) {
        this._logout(); return;
      }

      // Bottom nav
      const navItem = t.closest('.nav-item');
      if (navItem) { this._showPage(navItem.dataset.page || navItem.id.replace('nav-', '')); return; }

      // Header search icon
      if (t.closest('#btn-header-search')) { this._showPage('search'); return; }

      // Theme toggle
      if (t.closest('.theme-toggle')) { this._toggleTheme(); return; }

      // Nav tabs (top/hausses/baisses…)
      const tab = t.closest('.tab');
      if (tab) { this._setTab(tab, tab.dataset.tab); return; }

      // Sector filter chips
      const chip = t.closest('.filter-chip');
      if (chip) { this._filterStocks(chip.dataset.sector, chip); return; }

      // Star (watchlist) button — on stock cards
      const star = t.closest('[data-star]');
      if (star) { e.stopPropagation(); this._toggleStar(star.dataset.star); return; }

      // Remove from favourites
      const rem = t.closest('[data-remove]');
      if (rem) { e.stopPropagation(); this._removeFav(rem.dataset.remove); return; }

      // Open stock modal — stock row
      const row = t.closest('.stock-row[data-ticker]');
      if (row && !t.closest('[data-star]')) { UIController.showStockModal(this._findStock(row.dataset.ticker)); return; }

      // Dividend list rows
      const divCard = t.closest('.div-card[data-ticker]');
      if (divCard) { UIController.showStockModal(this._findStock(divCard.dataset.ticker)); return; }

      // Favourites inner card
      const favInner = t.closest('.fav-card-inner[data-ticker]');
      if (favInner && !t.closest('[data-remove]')) { UIController.showStockModal(this._findStock(favInner.dataset.ticker)); return; }

      // Modal close — stock detail modal
      if (t.id === 'stock-modal') { t.classList.remove('open'); return; }
      if (t.id === 'btn-modal-close' || (t.closest('.modal-close') && !t.closest('#add-stock-modal'))) {
        document.getElementById('stock-modal')?.classList.remove('open'); return;
      }

      // Add-stock modal — open
      if (t.closest('#btn-add-stock')) { this._openAddStockModal(); return; }
      // Add-stock modal — close
      if (t.id === 'btn-add-stock-close' || t.closest('#btn-add-stock-close')) { this._closeAddStockModal(); return; }
      if (t.id === 'add-stock-modal' && !t.closest('.add-stock-modal-body')) { this._closeAddStockModal(); return; }
      // Add-stock — clear selected
      if (t.id === 'add-stock-clear' || t.closest('#add-stock-clear')) { this._clearAddStockSelection(); return; }
      // Add-stock — select from results
      const asResult = t.closest('.add-stock-result-item');
      if (asResult) { this._selectAddStock(asResult.dataset.ticker); return; }
      // Add-stock — confirm
      if (t.id === 'btn-add-stock-confirm' || t.closest('#btn-add-stock-confirm')) { this._confirmAddStock(); return; }
      // Remove position card
      const remPos = t.closest('[data-remove-pos]');
      if (remPos) { e.stopPropagation(); this._removePosition(remPos.dataset.removePos); return; }

      // Quick-ref card & Calculer button
      const qrCalcBtn = t.closest('[data-calc]');
      if (qrCalcBtn) { e.stopPropagation(); this._prefillCalc(Number(qrCalcBtn.dataset.price), qrCalcBtn.dataset.calc); return; }

      const qrCard = t.closest('.qr-card[data-ticker]');
      if (qrCard && !t.closest('[data-calc]')) { this._prefillCalc(Number(qrCard.dataset.price), qrCard.dataset.ticker); return; }

      // Broker fee buttons
      const brokerBtn = t.closest('.broker-btn');
      if (brokerBtn) { this._setBrokerFee(parseFloat(brokerBtn.dataset.fee || brokerBtn.textContent), brokerBtn); return; }

      // Dividend sort buttons
      const divSortBtn = t.closest('.div-sort-btn');
      if (divSortBtn) {
        if (divSortBtn.id === 'btn-yield') { this._toggleYieldSort(divSortBtn); }
        else { this._sortDiv(divSortBtn.dataset.key, divSortBtn); }
        return;
      }

      // Clear QR search
      if (t.closest('#qr-clear')) { const i = document.getElementById('qr-search'); if(i) i.value=''; this._renderQuickRef(); return; }

      // Clear div search
      if (t.closest('#div-clear')) {
        const i = document.getElementById('div-search');
        if (i) i.value = '';
        this._renderDivList();
        return;
      }
    });

    // ── Input event delegation (debounced search) ──
    document.addEventListener('input', e => {
      const id = e.target.id;
      if (id === 'search-input') {
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => this._searchStocks(), 300);
      }
      if (id === 'qr-search')   this._renderQuickRef();
      if (id === 'div-search')  this._renderDivList();
      if (id === 'calc-price' || id === 'calc-qty') this._calculateCost();
      if (id === 'broker-fee-custom') this._setBrokerFeeCustom(e.target);
      // Add-stock modal inputs
      if (id === 'add-stock-search') this._searchAddStock(e.target.value);
      if (id === 'add-stock-qty' || id === 'add-stock-price') this._updateAddStockPreview();
    });

    // Keyboard accessibility — trigger click on Enter/Space for interactive elements
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const el = e.target;
        if (el.matches('[role="button"]')) { e.preventDefault(); el.click(); }
      }
    });
  }

  // ══════════════════════════════════════════════════════
  //  PAGE ROUTING
  // ══════════════════════════════════════════════════════
  _showPage(page, forceDir) {
    if (!PAGES.includes(page) || page === this.currentPage || this.isAnimating) return;
    this.isAnimating = true;

    const prevIdx  = PAGES.indexOf(this.currentPage);
    const nextIdx  = PAGES.indexOf(page);
    const dir      = forceDir || (nextIdx > prevIdx ? 'left' : 'right');
    const incoming = document.getElementById('page-' + page);
    const outgoing = document.getElementById('page-' + this.currentPage);

    // Pre-render page content
    if (page === 'outils')     this._renderQuickRef();
    if (page === 'search')     this._searchStocks();
    if (page === 'dividendes') this._renderDivList();
    if (page === 'portfolio')  this._renderPortfolio();
    if (page === 'favoris')    this._renderWatchlist();

    const navTabs = document.getElementById('nav-tabs');
    if (navTabs) navTabs.style.display = page === 'marche' ? 'flex' : 'none';

    if (incoming) {
      incoming.style.transition = 'none';
      incoming.style.transform  = dir === 'left' ? 'translateX(100%)' : 'translateX(-100%)';
      incoming.style.display    = 'flex';
      incoming.style.opacity    = '0.6';
    }
    incoming?.getBoundingClientRect(); // force reflow

    const DUR = '300ms', EASE = 'cubic-bezier(0.25,0.46,0.45,0.94)';
    if (outgoing) { outgoing.style.transition = `transform ${DUR} ${EASE},opacity ${DUR} ${EASE}`; outgoing.style.transform = dir === 'left' ? 'translateX(-30%)' : 'translateX(30%)'; outgoing.style.opacity = '0'; }
    if (incoming) { incoming.style.transition = `transform ${DUR} ${EASE},opacity ${DUR} ${EASE}`; incoming.style.transform = 'translateX(0)'; incoming.style.opacity = '1'; }

    setTimeout(() => {
      if (outgoing) { outgoing.style.cssText = ''; outgoing.classList.remove('active'); }
      if (incoming) { incoming.style.cssText = ''; incoming.classList.add('active'); }
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.getElementById('nav-' + page)?.classList.add('active');
      this.currentPage  = page;
      this.isAnimating  = false;
      if (page === 'search') setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }, 310);
  }

  // ══════════════════════════════════════════════════════
  //  FILTERS & TABS
  // ══════════════════════════════════════════════════════
  _filterStocks(sector, el) {
    this.filters.sector = sector;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
    this._applyFilter();
  }

  _setTab(el, tab) {
    this.filters.tab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    this._applyFilter();
  }

  _applyFilter() {
    let stocks = [...this.stocks];
    if (this.filters.sector !== 'all') stocks = stocks.filter(s => s.sector === this.filters.sector);

    const tab = this.filters.tab;
    if      (tab === 'hausses')   stocks = stocks.filter(s => s.change > 0).sort((a,b) => b.change - a.change);
    else if (tab === 'baisses')   stocks = stocks.filter(s => s.change < 0).sort((a,b) => a.change - b.change);
    else if (tab === 'tendances') stocks = [...stocks].sort((a,b) => (parseFloat(b.vol) || 0) - (parseFloat(a.vol) || 0));
    else if (tab === 'rendement') stocks = [...stocks].sort((a,b) => b.ytd - a.ytd);

    UIController.renderList('stock-table', stocks, this.watchlist);

    const hausses = this.stocks.filter(s => s.change > 0).length;
    const baisses = this.stocks.filter(s => s.change < 0).length;
    const stables = this.stocks.filter(s => s.change === 0).length;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('stat-hausses', hausses);
    set('stat-baisses', baisses);
    set('stat-stables', stables);
    set('stock-count', stocks.length + ' actions');
  }

  // ══════════════════════════════════════════════════════
  //  SEARCH (debounced in _attachEventListeners)
  // ══════════════════════════════════════════════════════
  _searchStocks() {
    const q = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
    const pool = q
      ? this.stocks.filter(s =>
          s.name.toLowerCase().includes(q) ||
          s.ticker.toLowerCase().includes(q) ||
          s.getSectorLabel().toLowerCase().includes(q))
      : this.stocks;
    UIController.renderList('search-results', pool, this.watchlist);
  }

  // ══════════════════════════════════════════════════════
  //  WATCHLIST
  // ══════════════════════════════════════════════════════
  _toggleStar(ticker) {
    const adding = !this.watchlist.has(ticker);
    if (adding) { this.watchlist.add(ticker);    UIController.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;margin-bottom:2px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Ajouté — ${ticker}`); }
    else        { this.watchlist.delete(ticker); UIController.showToast(`Retiré — ${ticker}`); }
    this._saveWatchlist();
    this._applyFilter();
    if (this.currentPage === 'favoris') this._renderWatchlist();
  }

  _removeFav(ticker) {
    this.watchlist.delete(ticker);
    UIController.showToast('Retiré — ' + ticker);
    this._saveWatchlist();
    this._applyFilter();
    this._renderWatchlist();
  }

  // ══════════════════════════════════════════════════════
  //  ADD STOCK MODAL
  // ══════════════════════════════════════════════════════
  _openAddStockModal() {
    this._addStockTicker = null;
    // Reset modal state
    const el = id => document.getElementById(id);
    if (el('add-stock-search'))   el('add-stock-search').value = '';
    if (el('add-stock-qty'))      el('add-stock-qty').value = '';
    if (el('add-stock-price'))    el('add-stock-price').value = '';
    if (el('add-stock-results'))  el('add-stock-results').innerHTML = '';
    if (el('add-stock-selected')) el('add-stock-selected').style.display = 'none';
    if (el('add-stock-preview'))  el('add-stock-preview').style.display = 'none';
    if (el('btn-add-stock-confirm')) el('btn-add-stock-confirm').disabled = true;
    el('add-stock-modal')?.classList.add('open');
    setTimeout(() => el('add-stock-search')?.focus(), 300);
  }

  _closeAddStockModal() {
    document.getElementById('add-stock-modal')?.classList.remove('open');
  }

  _searchAddStock(q) {
    const results = document.getElementById('add-stock-results');
    if (!results) return;
    q = (q || '').toLowerCase().trim();
    if (!q) { results.innerHTML = ''; return; }
    const matches = this.stocks.filter(s =>
      s.ticker.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.getSectorLabel().toLowerCase().includes(q)
    ).slice(0, 6);
    if (!matches.length) {
      results.innerHTML = `<div style="padding:12px;text-align:center;color:var(--text3);font-family:'JetBrains Mono',monospace;font-size:12px;">Aucune action trouvée</div>`;
      return;
    }
    results.innerHTML = matches.map(s => `
      <div class="add-stock-result-item" data-ticker="${s.ticker}" role="button" tabindex="0">
        ${s.getLogoHTML(32)}
        <div class="add-stock-result-info">
          <div class="add-stock-result-ticker">${s.ticker}</div>
          <div class="add-stock-result-name">${s.name}</div>
        </div>
        <div class="add-stock-result-price">${s.price > 0 ? s.price.toLocaleString('fr-FR') + ' MAD' : '—'}</div>
      </div>`).join('');
  }

  _selectAddStock(ticker) {
    const stock = this._findStock(ticker);
    if (!stock) return;
    this._addStockTicker = ticker;
    // Autofill current price as suggestion
    const priceInput = document.getElementById('add-stock-price');
    if (priceInput && !priceInput.value) priceInput.value = stock.price;
    // Show selected badge, hide search
    const selEl  = document.getElementById('add-stock-selected');
    const selIn  = document.getElementById('add-stock-selected-inner');
    const resEl  = document.getElementById('add-stock-results');
    const srch   = document.getElementById('add-stock-search');
    if (selEl)  selEl.style.display = 'flex';
    if (selIn)  selIn.innerHTML = `${stock.getLogoHTML(32)}<div style="min-width:0"><div style="font-weight:800;font-family:'JetBrains Mono',monospace;font-size:13px">${stock.ticker}</div><div style="font-size:11px;color:var(--text3)">${stock.name}</div></div><span style="margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--gold)">${stock.price > 0 ? stock.price.toLocaleString('fr-FR') + ' MAD' : '—'}</span>`;
    if (resEl)  resEl.innerHTML = '';
    if (srch)   srch.value = '';
    this._updateAddStockPreview();
  }

  _clearAddStockSelection() {
    this._addStockTicker = null;
    const selEl = document.getElementById('add-stock-selected');
    const btn   = document.getElementById('btn-add-stock-confirm');
    const prev  = document.getElementById('add-stock-preview');
    if (selEl) selEl.style.display = 'none';
    if (prev)  prev.style.display = 'none';
    if (btn)   btn.disabled = true;
    document.getElementById('add-stock-search')?.focus();
  }

  _updateAddStockPreview() {
    if (!this._addStockTicker) return;
    const stock  = this._findStock(this._addStockTicker);
    const qty    = parseFloat(document.getElementById('add-stock-qty')?.value);
    const price  = parseFloat(document.getElementById('add-stock-price')?.value);
    const btn    = document.getElementById('btn-add-stock-confirm');
    const prev   = document.getElementById('add-stock-preview');
    if (!stock || !qty || !price || qty <= 0 || price <= 0) {
      if (btn)  btn.disabled = true;
      if (prev) prev.style.display = 'none';
      return;
    }
    const total   = qty * price;
    const current = qty * stock.price;
    const pnl     = current - total;
    const pnlUp   = pnl >= 0;
    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    set('add-preview-total',   total.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD');
    set('add-preview-current', current.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD');
    const pnlEl = document.getElementById('add-preview-pnl');
    if (pnlEl) {
      pnlEl.textContent = (pnlUp ? '+' : '') + pnl.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD';
      pnlEl.style.color = pnlUp ? 'var(--green)' : 'var(--red)';
    }
    if (prev) prev.style.display = 'block';
    if (btn)  btn.disabled = false;
  }

  _confirmAddStock() {
    const ticker = this._addStockTicker;
    const qty    = parseFloat(document.getElementById('add-stock-qty')?.value);
    const price  = parseFloat(document.getElementById('add-stock-price')?.value);
    if (!ticker || !qty || !price || qty <= 0 || price <= 0) return;
    // Merge with existing or add new
    const existing = this._portfolio.find(h => h.ticker === ticker);
    if (existing) {
      // Weighted average price
      const totalQty   = existing.qty + qty;
      const avgPrice   = ((existing.avgPrice * existing.qty) + (price * qty)) / totalQty;
      existing.qty     = totalQty;
      existing.avgPrice = Math.round(avgPrice * 100) / 100;
    } else {
      this._portfolio.push({ ticker, qty, avgPrice: price });
    }
    this._savePortfolio();
    this._closeAddStockModal();
    this._renderPortfolio();
    UIController.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;margin-bottom:2px"><polyline points="20 6 9 17 4 12"/></svg> ${ticker} ajouté au portefeuille !`);
  }

  _removePosition(ticker) {
    this._portfolio = this._portfolio.filter(h => h.ticker !== ticker);
    this._savePortfolio();
    this._renderPortfolio();
    UIController.showToast('Retiré — ' + ticker);
  }

  _savePortfolio() {
    try { localStorage.setItem('wamy_portfolio', JSON.stringify(this._portfolio)); } catch(e) {}
  }
  _loadPortfolio() {
    try {
      const saved = localStorage.getItem('wamy_portfolio');
      if (saved) this._portfolio = JSON.parse(saved);
    } catch(e) {}
  }

  _renderPortfolio() {
    const container = document.getElementById('portfolio-list');
    if (!container) return;

    // Load user from localStorage
    let userData = MOCK_USER;
    try {
      const saved = localStorage.getItem('wamy_user');
      if (saved) userData = { ...MOCK_USER, ...JSON.parse(saved) };
    } catch(e) {}

    // Populate user card
    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    set('port-avatar',     userData.avatar || userData.name?.charAt(0) || 'A');
    set('port-user-name',  userData.name || 'Utilisateur');
    set('port-user-email', userData.email || 'Compte simulé');

    // Calculate totals from this._portfolio
    let totalValue = 0, totalCost = 0;
    this._portfolio.forEach(h => {
      const stock = this._findStock(h.ticker);
      if (stock) {
        totalValue += stock.price * h.qty;
        totalCost  += h.avgPrice * h.qty;
      }
    });
    const totalPnl    = totalValue - totalCost;
    const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
    const pnlUp       = totalPnl >= 0;

    set('port-balance', totalValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD');

    const pnlEl = document.getElementById('port-pnl');
    if (pnlEl) {
      pnlEl.textContent = (pnlUp ? '+' : '') + totalPnlPct.toFixed(2) + '%';
      pnlEl.className = 'port-pnl-badge ' + (pnlUp ? 'up' : 'down');
    }
    set('port-pnl-amount', (pnlUp ? '+' : '') + totalPnl.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD total');
    set('port-count', this._portfolio.length + ' titres');

    // Progress bar
    const barEl = document.getElementById('port-bar-fill');
    if (barEl) barEl.style.width = Math.min(100, Math.max(0, 50 + totalPnlPct * 5)) + '%';

    // Render holdings list (with remove button on each card)
    if (!this._portfolio.length) {
      container.innerHTML = `<div style="text-align:center;padding:40px 0;color:var(--text3);font-family:'JetBrains Mono',monospace;font-size:12px;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        <br>
        Aucune position · Cliquez sur <strong style="color:var(--gold);">+ Ajouter</strong> pour commencer
      </div>`;
      return;
    }
    container.innerHTML = this._portfolio.map(h =>
      UIController.createPortfolioCard(h, this._findStock(h.ticker))
    ).join('');
  }

  _renderWatchlist() {
    const container = document.getElementById('watchlist-container');
    const countEl   = document.getElementById('fav-count');
    if (!container) return;
    if (countEl) countEl.textContent = this.watchlist.size;
    const favs = this.stocks.filter(s => this.watchlist.has(s.ticker));
    if (!favs.length) {
      container.innerHTML = `<div class="fav-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <div class="fav-empty-text">Aucun favori pour l'instant</div>
        <div class="fav-empty-sub">Appuyez sur l'étoile au coin d'une action</div>
      </div>`;
      return;
    }
    container.innerHTML = favs.map(s => UIController.createFavCard(s)).join('');
  }

  _saveWatchlist() {
    try { localStorage.setItem('wamy_watchlist', JSON.stringify([...this.watchlist])); } catch(e){}
  }
  _loadWatchlist() {
    try {
      const saved = localStorage.getItem('wamy_watchlist');
      if (saved) this.watchlist = new Set(JSON.parse(saved));
    } catch(e){}
  }

  // ══════════════════════════════════════════════════════
  //  DIVIDENDS
  // ══════════════════════════════════════════════════════
  _renderDivList() {
    const container = document.getElementById('div-list');
    if (!container) return;
    const q = (document.getElementById('div-search')?.value || '').toLowerCase().trim();
    let stocks = q
      ? this.stocks.filter(s => s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q) || s.getSectorLabel().toLowerCase().includes(q))
      : [...this.stocks];
    stocks = stocks.filter(s => s.divYield > 0);

    if (this.divSortKey === 'yield') stocks.sort((a,b) => this.yieldAsc ? a.divYield - b.divYield : b.divYield - a.divYield);
    else if (this.divSortKey === 'div')   stocks.sort((a,b) => b.div - a.div);
    else if (this.divSortKey === 'price') stocks.sort((a,b) => b.price - a.price);
    else if (this.divSortKey === 'name')  stocks.sort((a,b) => a.name.localeCompare(b.name));

    const sorted  = [...this.stocks].filter(s => s.divYield > 0).sort((a,b) => b.divYield - a.divYield);
    const highest = sorted[0], lowest = sorted[sorted.length - 1];
    const avg     = sorted.reduce((a,s) => a + s.divYield, 0) / sorted.length;
    const set     = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    set('div-highest',      highest.divYield.toFixed(2) + '%');
    set('div-highest-name', highest.ticker);
    set('div-lowest',       lowest.divYield.toFixed(2)  + '%');
    set('div-lowest-name',  lowest.ticker);
    set('div-avg',          avg.toFixed(2) + '%');

    container.innerHTML = stocks.map(s => UIController.createDivCard(s)).join('');
  }

  _toggleYieldSort(el) {
    this.yieldAsc = !this.yieldAsc;
    this.divSortKey = 'yield';
    document.querySelectorAll('.div-sort-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    el.textContent = this.yieldAsc ? 'Rendement ↑' : 'Rendement ↓';
    this._renderDivList();
  }

  _sortDiv(key, el) {
    this.divSortKey = key;
    document.querySelectorAll('.div-sort-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    const btn = document.getElementById('btn-yield');
    if (btn) btn.textContent = 'Rendement ↓';
    this._renderDivList();
  }

  // ══════════════════════════════════════════════════════
  //  QUICK REFERENCE (Outils tab)
  // ══════════════════════════════════════════════════════
  _renderQuickRef() {
    const container = document.getElementById('quick-ref');
    const countEl   = document.getElementById('qr-count');
    const q = (document.getElementById('qr-search')?.value || '').toLowerCase().trim();
    document.getElementById('qr-clear')?.classList.toggle('show', q.length > 0);
    let stocks = q
      ? this.stocks.filter(s => s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q) || s.getSectorLabel().toLowerCase().includes(q))
      : this.stocks;
    if (countEl) countEl.textContent = stocks.length + ' actions';
    if (!container) return;
    if (!stocks.length) {
      container.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text3);font-family:'JetBrains Mono',monospace;font-size:12px;">Aucune action trouvée</div>`;
      return;
    }
    container.innerHTML = stocks.map(s => UIController.createQrCard(s)).join('');
  }

  _prefillCalc(price, ticker) {
    const inp   = document.getElementById('calc-price');
    const badge = document.getElementById('calc-selected-badge');
    if (inp) { inp.value = price; this._calculateCost(); }
    if (badge) {
      badge.style.display = 'flex';
      badge.innerHTML = `<strong style="color:var(--green);">${ticker}</strong><span style="color:var(--text3);">→</span>${Number(price).toLocaleString('fr-FR')} MAD`;
    }
    document.querySelectorAll('.qr-card').forEach(c => c.classList.remove('selected'));
    document.querySelector(`.qr-card[data-ticker="${ticker}"]`)?.classList.add('selected');
    inp?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ══════════════════════════════════════════════════════
  //  CALCULATOR
  // ══════════════════════════════════════════════════════
  _setBrokerFee(rate, el) {
    this.brokerFeeRate = rate / 100;
    document.querySelectorAll('.broker-btn').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');
    document.getElementById('broker-fee-custom').value = '';
    const lbl = document.getElementById('fee-label');
    if (lbl) lbl.textContent = rate + '%';
    this._calculateCost();
  }

  _setBrokerFeeCustom(inp) {
    const v = parseFloat(inp.value);
    if (!isNaN(v) && v >= 0 && v <= 5) {
      this.brokerFeeRate = v / 100;
      document.querySelectorAll('.broker-btn').forEach(b => b.classList.remove('active'));
      const lbl = document.getElementById('fee-label');
      if (lbl) lbl.textContent = v + '%';
      this._calculateCost();
    }
  }

  _calculateCost() {
    const p       = parseFloat(document.getElementById('calc-price')?.value);
    const q       = parseInt(document.getElementById('calc-qty')?.value);
    const content = document.getElementById('result-content');
    const empty   = document.getElementById('result-empty');
    if (!p || !q || isNaN(p) || isNaN(q) || p <= 0 || q <= 0) {
      content?.classList.remove('show'); empty?.classList.remove('hide'); return;
    }
    const sub       = p * q;
    const courtier  = sub * this.brokerFeeRate;
    const tva       = courtier * 0.10;
    const bourse    = sub * 0.001;
    const total     = sub + courtier + tva + bourse;
    const totalFees = courtier + tva + bourse;
    const feesPct   = (this.brokerFeeRate * 100).toFixed(2);
    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    set('res-subtotal', sub.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD');
    set('res-fees',    '+' + totalFees.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD');
    set('res-unit',    p.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD');
    set('res-total',   total.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' MAD');
    const fl = document.getElementById('fees-label-result');
    if (fl) fl.textContent = `Frais (${feesPct}% + TVA + Bourse)`;
    content?.classList.add('show'); empty?.classList.add('hide');
  }

  // ══════════════════════════════════════════════════════
  //  THEME
  // ══════════════════════════════════════════════════════
  _toggleTheme() {
    this.isLight = !this.isLight;
    UIController.toggleTheme(this.isLight);
    try { localStorage.setItem('wamy_theme', this.isLight ? 'light' : 'dark'); } catch(e){}
  }

  _loadTheme() {
    try {
      if (localStorage.getItem('wamy_theme') === 'light') {
        this.isLight = true;
        UIController.toggleTheme(true);
      }
    } catch(e){}
  }

  // ══════════════════════════════════════════════════════
  //  MARKET TIMER
  // ══════════════════════════════════════════════════════
  _updateMarketTimer() {
    const now   = new Date();
    const utc   = now.getTime() + now.getTimezoneOffset() * 60000;
    const rabat = new Date(utc + 3600000);
    const day   = rabat.getDay();
    const h     = rabat.getHours(), m = rabat.getMinutes();
    const total = h * 60 + m;
    const OPEN  = 9 * 60 + 30, CLOSE = 15 * 60 + 30;
    const isWeekday = day >= 1 && day <= 5;
    const isOpen    = isWeekday && total >= OPEN && total < CLOSE;

    let statusText, timeText;
    if (isOpen) {
      const rem = CLOSE - total, rh = Math.floor(rem / 60), rm = rem % 60;
      statusText = 'OUVERT';
      timeText   = `Ferme dans ${rh > 0 ? rh + 'h' : ''}${String(rm).padStart(2, '0')}min`;
    } else {
      statusText = 'FERMÉ';
      const nextOpen = new Date(rabat);
      nextOpen.setHours(9, 30, 0, 0);
      if (total >= CLOSE || !isWeekday) nextOpen.setDate(nextOpen.getDate() + (day === 5 ? 3 : day === 6 ? 2 : 1));
      const diffMs = nextOpen - rabat;
      const diffH  = Math.floor(diffMs / 3600000), diffM = Math.floor((diffMs % 3600000) / 60000);
      timeText = diffH < 24
        ? `Ouvre dans ${diffH}h${String(diffM).padStart(2, '0')}min`
        : `Ouvre ${['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][nextOpen.getDay()]} 09:30`;
    }
    UIController.updateMarketStatus(isOpen, statusText, timeText);
  }

  // ══════════════════════════════════════════════════════
  //  SWIPE NAVIGATION
  // ══════════════════════════════════════════════════════
  _setupSwipe() {
    let sx = 0, sy = 0, dragging = false;
    document.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; dragging = false; }, { passive: true });
    document.addEventListener('touchmove',  e => {
      const dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
      if (!dragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) dragging = true;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      if (!dragging) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 60) {
        const i = PAGES.indexOf(this.currentPage);
        if (dx < 0 && i < PAGES.length - 1) this._showPage(PAGES[i + 1], 'left');
        else if (dx > 0 && i > 0)           this._showPage(PAGES[i - 1], 'right');
      }
      dragging = false;
    }, { passive: true });
  }

  // ── Helper ──
  _findStock(ticker) {
    return this.stocks.find(s => s.ticker === ticker);
  }
}

// ── Bootstrap ──────────────────────────────────────────
const app = new WamyApp();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
