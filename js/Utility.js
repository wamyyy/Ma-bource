// ════════════════════════════════════════════════════════
//  WAMY — Utility.js
//  Financial calculation formulas
// ════════════════════════════════════════════════════════

window.Utility = {
  /**
   * Calculates the net cost of a transaction including brokerage fees and VAT (10%).
   * Net = (Price × Qty) + Brokerage Fees (incl VAT).
   */
  calculateNetCost: function(price, qty, brokerageFeePercentage) {
    const grossAmount = price * qty;
    const brokerageFees = grossAmount * brokerageFeePercentage;
    const vat = brokerageFees * 0.10; // 10% VAT on fees
    const bourseAmount = grossAmount * 0.001;
    return {
      grossAmount,
      brokerageFees,
      vat,
      bourseAmount,
      totalFees: brokerageFees + vat + bourseAmount,
      total: grossAmount + brokerageFees + vat + bourseAmount
    };
  },

  /**
   * Automatically calculates the weighted average cost across multiple buy orders.
   */
  calculateDynamicPRU: function(orders) {
    if (!orders || orders.length === 0) return 0;
    let totalCost = 0;
    let totalQty = 0;
    for (const order of orders) {
      totalCost += order.price * order.qty;
      totalQty += order.qty;
    }
    return totalQty === 0 ? 0 : totalCost / totalQty;
  },

  /**
   * Estimates annual returns based on a user-defined investment amount.
   */
  simulateDividendYield: function(investmentAmount, stockDivYield) {
    if (!stockDivYield) return 0;
    const returnRate = stockDivYield / 100;
    return investmentAmount * returnRate;
  }
};
