import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function calculateInvestment({
  monthlySaving,
  savingPeriod,
  btcGrowth,
}) {
  const principal = monthlySaving * 12 * savingPeriod;

  let fvResult = principal;

  if (btcGrowth > 0) {
    const monthlyRate = btcGrowth / 100 / 12;

    const totalMonths = savingPeriod * 12;

    const calculatedValue =
      (monthlySaving * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      monthlyRate;

    fvResult = isFinite(calculatedValue) ? calculatedValue : principal;
  }

  const fiatDilutionRate = 0.07;

  const adjustedPurchasingPower =
    fvResult / Math.pow(1 + fiatDilutionRate, savingPeriod);

  const totalPowerLossPercent =
    fvResult > 0 ? (adjustedPurchasingPower / fvResult - 1) * 100 : 0;

  return {
    principal,
    fvResult,
    adjustedPurchasingPower,
    totalPowerLossPercent,
  };
}
