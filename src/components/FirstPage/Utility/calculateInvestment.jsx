export function calculateInvestment({
  monthlySaving,
  savingPeriod,
  btcGrowth,
}) {
  const totalMonths = savingPeriod * 12;

  const principal = monthlySaving * totalMonths;

  const monthlyRate = btcGrowth / 100 / 12;

  let fvResult = principal;

  if (monthlyRate > 0) {
    fvResult =
      monthlySaving *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const fiatDilutionRate = 0.07;

  const adjustedPurchasingPower =
    fvResult / Math.pow(1 + fiatDilutionRate, savingPeriod);

  const totalPowerLossPercent =
    fvResult > 0 ? ((adjustedPurchasingPower - fvResult) / fvResult) * 100 : 0;

  return {
    principal: Math.round(principal),

    fvResult: Math.round(fvResult),

    adjustedPurchasingPower: Math.round(adjustedPurchasingPower),

    totalPowerLossPercent,
  };
}
