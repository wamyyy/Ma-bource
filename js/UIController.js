// ════════════════════════════════════════════════════════
//  WAMY — UIController.js
//  View Layer: Static methods for all DOM manipulation
// ════════════════════════════════════════════════════════

export class UIController {

  /** Generates sparkline SVG for a given change value */
  static generateSparkline(change) {
    const up    = change >= 0;
    const color = up ? 'var(--green)' : 'var(--red)';
    const pts   = [0,1,2,3,4,5,6,7].map(i => {
      const noise = (Math.random() - 0.5) * 8;
      return `${i * 7},${up ? 28 - i * 2 + noise : 20 + i * 1.5 + noise}`;
    }).join(' ');
    return `<svg viewBox="0 0 56 32" preserveAspectRatio="none">
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  /**
   * Generates HTML string for a single stock row card.
   * Accessibility: arrow icons (▲/▼) always present alongside color.
   */
  static createStockCard(stock, isStarred, index = 0) {
    const trend     = stock.getTrend();
    const up        = trend === 'up';
    const suspended = stock.isSuspended();
    const dir       = suspended ? 'neutral' : trend;

    let hasAlert = false;
    try {
      const alerts = JSON.parse(localStorage.getItem('wamy_price_alerts') || '{}');
      hasAlert = alerts[stock.ticker] && alerts[stock.ticker].active;
    } catch(e) {}

    return `
      <div class="stock-row ${dir} fade-in${suspended ? ' suspended' : ''}"
           data-ticker="${stock.ticker}" role="button" tabindex="0"
           aria-label="${stock.name}, ${stock.ticker}, ${stock.getSectorLabel()}">
        <div class="stock-rank">${stock.rank}</div>
        ${stock.getLogoHTML(34)}
        <div class="stock-info">
          <div class="stock-name">${stock.name}</div>
          <div class="stock-sector">${stock.ticker} · ${stock.getSectorLabel()}</div>
        </div>
        <div class="stock-chart">${suspended ? '' : UIController.generateSparkline(stock.change)}</div>
        <div class="stock-right">
          <div class="stock-price">
            ${suspended ? '—' : stock.price.toLocaleString('fr-FR')}
            <span style="font-size:10px;color:var(--text3);">MAD</span>
          </div>
          <div class="stock-change ${dir}" aria-label="${suspended ? 'Suspendu' : (up ? 'Hausse' : 'Baisse') + ' ' + Math.abs(stock.change).toFixed(2) + '%'}">
            ${suspended
              ? '<span style="color:var(--text3);font-size:10px;">Suspendu</span>'
              : (stock.change === 0 ? '—' : `
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;margin-right:2px;">
                  ${up ? '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>' : '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>'}
                </svg>
                ${Math.abs(stock.change).toFixed(2)}%`)}
          </div>
          <div style="display:flex;gap:4px;margin-top:2px;justify-content:flex-end;flex-wrap:wrap;">
            <div class="stock-cap">${stock.cap}</div>
            ${stock.divYield > 0 ? `<span class="div-badge">${stock.divYield.toFixed(2)}%</span>` : ''}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; align-items:center; justify-content:center;">
          <div class="star-btn ${isStarred ? 'starred' : ''}"
               data-star="${stock.ticker}" role="button" tabindex="0"
               aria-label="${isStarred ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
            <svg width="14" height="14" viewBox="0 0 24 24"
                 fill="${isStarred ? '#f5c842' : 'none'}"
                 stroke="${isStarred ? '#f5c842' : 'currentColor'}" stroke-width="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="alert-ring-btn" data-alert="${stock.ticker}" role="button" tabindex="0" aria-label="Alerte sur ${stock.ticker}" style="display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; transition:all 0.2s;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${hasAlert ? 'var(--gold)' : 'none'}" stroke="${hasAlert ? 'var(--gold)' : 'currentColor'}" stroke-width="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
        </div>
      </div>`;
  }

  /**
   * Renders a list of Stock instances into a container efficiently.
   */
  static renderList(containerId, stocks, watchlist) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!stocks || !stocks.length) {
      container.innerHTML = `<div style="text-align:center;padding:40px 0;color:var(--text3);font-family:'JetBrains Mono',monospace;font-size:12px;">${window.T('msg_no_stock_found')}</div>`;
      return;
    }
    container.innerHTML = stocks.map((s, i) => UIController.createStockCard(s, watchlist.has(s.ticker), i)).join('');
  }

  /** Skeleton loading placeholders */
  static renderSkeleton(containerId, count = 6) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = Array.from({ length: count }, () => `
      <div class="stock-row skeleton-row">
        <div class="skel skel-rank"></div>
        <div class="skel skel-avatar"></div>
        <div class="stock-info">
          <div class="skel skel-name"></div>
          <div class="skel skel-sector"></div>
        </div>
        <div class="stock-right">
          <div class="skel skel-price"></div>
          <div class="skel skel-change"></div>
        </div>
      </div>`).join('');
  }

  /** Updates the market status timer in the header. */
  static updateMarketStatus(isOpen, statusText, timeText) {
    const timerEl  = document.getElementById('market-timer');
    const statusEl = document.getElementById('market-status');
    const timeEl   = document.getElementById('market-time');
    if (!timerEl) return;
    timerEl.className  = 'market-timer ' + (isOpen ? 'open' : 'closed');
    if (statusEl) statusEl.textContent = statusText;
    if (timeEl)   timeEl.textContent   = timeText;
  }

  /** Toggle dark/light theme on body */
  static toggleTheme(isLight) {
    document.body.classList.toggle('light', isLight);
    const moon = document.getElementById('icon-moon');
    const sun  = document.getElementById('icon-sun');
    if (moon) moon.style.display = isLight ? 'none'  : 'block';
    if (sun)  sun.style.display  = isLight ? 'block' : 'none';
  }

  static showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerHTML = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  /** Populates the stock detail modal */
  static showStockModal(stock) {
    if (!stock) return;
    const el = id => document.getElementById(id);
    const avEl = el('modal-avatar');
    if (avEl) {
      avEl.innerHTML = `<img src="${stock.getLogoUrl(192)}"
        style="width:100%;height:100%;object-fit:cover;border-radius:14px;" alt="${stock.ticker}">`;
    }
    const trend = stock.getTrend();
    const up = trend === 'up';
    const suspended = stock.isSuspended();
    if (el('modal-name'))   el('modal-name').textContent   = stock.name;
    if (el('modal-ticker')) el('modal-ticker').textContent = `${stock.ticker} · ${stock.getSectorLabel()}`;
    if (el('modal-price'))  el('modal-price').textContent  = suspended ? 'Suspendu' : stock.formatPrice();

    const chEl = el('modal-change');
    if (chEl) {
      chEl.className = 'stock-change ' + (up ? 'up' : 'down');
      const icon = up 
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;margin-right:4px;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;margin-right:4px;"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`;
      chEl.innerHTML = stock.change !== 0
        ? `${icon} ${Math.abs(stock.change).toFixed(2)}%`
        : '—';
      chEl.style.justifyContent = 'flex-end';
      chEl.style.alignItems = 'center';
    }

    // Range Bar
    const low = stock.low || stock.price;
    const high = stock.high || stock.price;
    const pct = window.Utility.getRangePercentage(stock.price, low, high);
    if (el('modal-low'))  el('modal-low').textContent  = low.toLocaleString('fr-FR') + ' MAD';
    if (el('modal-high')) el('modal-high').textContent = high.toLocaleString('fr-FR') + ' MAD';
    if (el('modal-range-fill'))      el('modal-range-fill').style.width = pct + '%';
    if (el('modal-range-indicator')) el('modal-range-indicator').style.left = pct + '%';

    // Order Book
    if (el('modal-bid')) el('modal-bid').textContent = stock.bid > 0 ? stock.bid.toLocaleString('fr-FR') : '—';
    if (el('modal-ask')) el('modal-ask').textContent = stock.ask > 0 ? stock.ask.toLocaleString('fr-FR') : '—';

    const stEl = el('modal-stats');
    if (stEl) {
      stEl.innerHTML = [
        ['VOLUME',        window.Utility.formatCompactNumber(stock.volume) + ' MAD'],
        ['OUVERTURE',     stock.open > 0 ? stock.open.toLocaleString('fr-FR') + ' MAD' : '—'],
        ['RÉFÉRENCE',     stock.refPrice > 0 ? stock.refPrice.toLocaleString('fr-FR') + ' MAD' : '—'],
        ['YTD',           stock.ytd !== 0 ? (stock.ytd > 0 ? '+' : '') + stock.ytd + '%' : '—'],
        ['CAPITALISATION', stock.cap !== '—' ? stock.cap + ' MAD' : '—'],
        ['DIVIDENDE',     stock.div > 0 ? stock.div + ' MAD (' + stock.divYield.toFixed(2) + '%)' : '—'],
      ].map(([l, v]) => `<div class="modal-stat"><div class="modal-stat-label">${l}</div><div class="modal-stat-val">${v}</div></div>`).join('');
    }
    el('stock-modal')?.classList.add('open');
  }

  /** Creates a portfolio holding card showing position + P&L */
  static createPortfolioCard(holding, stock, index = 0) {
    if (!stock) return '';
    const currentValue = stock.price * holding.qty;
    const costBasis    = holding.avgPrice * holding.qty;
    const pnl          = currentValue - costBasis;
    const pnlPct       = (pnl / costBasis) * 100;
    const up           = pnl >= 0;
    const trend        = up ? 'up' : 'down';

    return `
      <div class="port-card animate-stagger" data-ticker="${stock.ticker}" role="button" tabindex="0" style="animation-delay: ${index * 0.04}s">
        <div class="port-card-left">
          ${stock.getLogoHTML(40)}
          <div class="port-card-info">
            <div class="port-card-ticker">${stock.ticker}</div>
            <div class="port-card-name">${stock.name}</div>
            <div class="port-card-meta">
              <span>${holding.qty} titres</span>
              <span>·</span>
              <span>Moy. ${holding.avgPrice.toLocaleString('fr-FR')} MAD</span>
            </div>
          </div>
        </div>
        <div class="port-card-right">
          <div class="port-card-value">${currentValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</div>
          <div class="port-card-pnl ${trend}">
            <span class="arrow-icon" aria-hidden="true">${up ? '▲' : '▼'}</span>
            ${Math.abs(pnlPct).toFixed(2)}%
            <span class="port-card-pnl-abs">(${up ? '+' : ''}${pnl.toLocaleString('fr-FR', { minimumFractionDigits: 2 })})</span>
          </div>
          <div class="port-card-qty">${stock.price.toLocaleString('fr-FR')} MAD/titre</div>
        </div>
        <button class="port-remove-btn" data-remove-pos="${stock.ticker}" aria-label="Retirer ${stock.ticker} du portefeuille">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>`;
  }

  /** Creates dividend list card HTML */
  static createDivCard(stock, index = 0) {
    return `
      <div class="div-card animate-stagger" data-ticker="${stock.ticker}" role="button" tabindex="0" style="animation-delay: ${index * 0.04}s">
        ${stock.getLogoHTML(38)}
        <div class="div-info">
          <div class="div-name">${stock.name}</div>
          <div class="div-meta">
            <span>${stock.ticker}</span>
            <span>${stock.getSectorLabel()}</span>
            <span>${stock.price.toLocaleString('fr-FR')} MAD</span>
          </div>
          <div class="div-date-badge">📅 ${stock.divDate}</div>
        </div>
        <div class="div-right">
          <div class="div-yield-big">${stock.divYield.toFixed(2)}%</div>
          <div class="div-amount">${stock.div} MAD/action</div>
          <div style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace;margin-top:2px;">${stock.divFreq}</div>
        </div>
      </div>`;
  }

  /** Creates a favourites card HTML */
  static createFavCard(stock, index = 0) {
    const up = stock.getTrend() === 'up';
    return `
      <div class="fav-card animate-stagger" style="animation-delay: ${index * 0.04}s">
        <div class="fav-card-glow ${up ? 'glow-green' : 'glow-red'}"></div>
        <div class="fav-card-inner" data-ticker="${stock.ticker}" role="button" tabindex="0">
          ${stock.getLogoHTML(38)}
          <div class="fav-card-info">
            <div class="fav-card-name">${stock.name}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px;flex-wrap:wrap;">
              <span class="fav-ticker-badge">${stock.ticker}</span>
              <span style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace;">${stock.getSectorLabel()}</span>
            </div>
            ${stock.divYield > 0 ? `<div style="font-size:10px;color:#f5c842;font-family:'JetBrains Mono',monospace;margin-top:4px;">Rdt ${stock.divYield.toFixed(2)}%</div>` : ''}
          </div>
          <div style="text-align:right;">
            <div class="fav-price">${stock.price > 0 ? stock.price.toLocaleString('fr-FR') + ' MAD' : '—'}</div>
            <div class="fav-change ${up ? 'up' : 'down'}">
              <span class="arrow-icon" aria-hidden="true">${stock.change !== 0 ? (up ? '▲' : '▼') : ''}</span>
              ${stock.change !== 0 ? Math.abs(stock.change).toFixed(2) + '%' : '—'}
            </div>
            <div style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace;margin-top:2px;">YTD ${stock.ytd > 0 ? '+' : ''}${stock.ytd}%</div>
          </div>
          <div class="fav-remove-btn" data-remove="${stock.ticker}" role="button" aria-label="Retirer ${stock.ticker} des favoris">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
        </div>
      </div>`;
  }

  /** Creates a quick-reference card HTML (Widgets) */
  static createQrCard(stock, index = 0, theme = '') {
    const trend = stock.getTrend();
    const up   = trend === 'up';
    const susp = stock.isSuspended();
    const price = stock.price || stock.refPrice;
    const name = stock.name.trim();
    const ticker = stock.ticker.trim();
    
    const trendingIcon = up 
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-right:2px;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
      : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-right:2px;"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`;

    return `
      <div class="qr-card fade-in ${theme ? 'theme-' + theme : ''}" 
           data-ticker="${ticker}" data-price="${price}" role="button" tabindex="0" 
           style="animation-delay: ${index * 0.04}s">
        <div class="qr-card-info">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${stock.getLogoHTML(28)}
            <div style="min-width:0;">
              <div class="qr-ticker">${ticker}</div>
              <div class="qr-name">${name}</div>
            </div>
          </div>
          <div class="qr-price">${susp ? '—' : price.toLocaleString('fr-FR') + ' MAD'}</div>
          <div class="qr-change ${up ? 'up' : 'down'}" style="display:flex;align-items:center;">
            ${susp ? '' : trendingIcon}
            ${susp ? 'Suspendu' : Math.abs(stock.change).toFixed(2) + '%'}
          </div>
          ${stock.volume > 0 ? `<div style="font-size:10px;color:var(--text3);margin-top:2px;">Vol: ${window.Utility.formatCompactNumber(stock.volume)}</div>` : ''}
        </div>
        <button class="qr-use-btn" data-calc="${ticker}" data-price="${price}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          <span>Calculer</span>
        </button>
      </div>`;
  }

  /** Shows a Category Summary modal — Top / Median / Bottom stocks */
  static showWidgetSummaryModal(title, color, top, bottom, median) {
    const overlay = document.getElementById('widget-summary-overlay');
    const panel   = document.getElementById('widget-summary-modal');
    if (!overlay || !panel) return;

    const row = (label, stock, accent) => `
      <div class="wsm-row">
        <div class="wsm-badge" style="color:${accent};border-color:${accent}22;">${label}</div>
        <div class="wsm-stock">
          ${stock.getLogoHTML(32)}
          <div class="wsm-info">
            <div class="wsm-ticker">${stock.ticker}</div>
            <div class="wsm-name">${stock.name}</div>
          </div>
        </div>
        <div class="wsm-price">
          <div style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:12px;">${stock.price > 0 ? stock.price.toLocaleString('fr-FR') + ' MAD' : '—'}</div>
          <div class="wsm-change ${stock.change > 0 ? 'up' : stock.change < 0 ? 'down' : ''}">${stock.change !== 0 ? (stock.change > 0 ? '+' : '') + stock.change.toFixed(2) + '%' : '—'}</div>
        </div>
      </div>`;

    panel.innerHTML = `
      <div class="wsm-handle"></div>
      <div class="wsm-header" style="border-bottom:2px solid ${color}44;margin-bottom:16px;padding-bottom:12px;">
        <div class="wsm-title" style="color:${color};">${title}</div>
        <div style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace;letter-spacing:1px;">RÉSUMÉ DE MARCHÉ</div>
      </div>
      ${row('#1 MEILLEUR', top, color)}
      ${row('MÉDIANE', median, 'var(--text2)')}
      ${row('DERNIER', bottom, 'var(--red)')}
      <button class="modal-close" id="wsm-close" style="width:100%;margin-top:16px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="margin-right:6px">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        Fermer
      </button>`;

    overlay.classList.add('open');
  }
}
