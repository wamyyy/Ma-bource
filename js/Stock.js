// ════════════════════════════════════════════════════════
//  WAMY — Stock.js
//  Data Model: Encapsulates all stock data and computations
// ════════════════════════════════════════════════════════
import { AVATAR_BG, SECTOR_LABELS, SECTOR_COLORS } from './Constants.js';

export class Stock {
  constructor(data) {
    this.rank      = data.rank;
    this.name      = data.name;
    this.ticker    = data.ticker;
    this.sector    = data.sector;
    this.price     = data.price;
    this.change    = data.change;
    this.vol       = data.vol;
    this.ytd       = data.ytd;
    this.cap       = data.cap;
    this.div       = data.div;
    this.divYield  = data.divYield;
    this.divFreq   = data.divFreq;
    this.divDate   = data.divDate;
    this.domain    = data.domain;
  }

  /** Returns price formatted in MAD via Intl.NumberFormat */
  formatPrice() {
    if (!this.price) return '—';
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.price) + ' MAD';
  }

  /** Returns 'up', 'down', or 'neutral' */
  getTrend() {
    if (this.change > 0)  return 'up';
    if (this.change < 0)  return 'down';
    return 'neutral';
  }

  /** Returns true if the stock is suspended trading */
  isSuspended() {
    return this.ticker === 'SAM';
  }

  /** Returns the sector display label */
  getSectorLabel() {
    return SECTOR_LABELS[this.sector] || this.sector;
  }

  /** Returns the sector CSS color class */
  getSectorColor() {
    return SECTOR_COLORS[this.sector] || 'c1';
  }

  /** Returns the full avatar img URL for use as a logo */
  getLogoUrl(size = 128) {
    const bg      = AVATAR_BG[this.sector] || '15803d';
    const letters = this.ticker.replace(/[^A-Z0-9]/g, '').slice(0, 3)
                    || this.ticker.slice(0, 2).toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(letters)}&background=${bg}&color=ffffff&size=${size}&bold=true&font-size=0.4`;
  }

  /** Returns the HTML string for the stock avatar/logo block */
  getLogoHTML(size = 34) {
    const br    = size <= 28 ? '8px' : '9px';
    const color = this.getSectorColor();
    const url   = this.getLogoUrl(128);
    return `<div class="stock-avatar logo-wrap ${color}" style="width:${size}px;height:${size}px;border-radius:${br};">
      <img src="${url}" class="company-logo avatar-visible" alt="${this.ticker}">
    </div>`;
  }
}
