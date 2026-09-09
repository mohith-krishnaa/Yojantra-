/**
 * Indicative loan calculator.
 *
 * EMI is calculated on the financed principal after any beneficiary
 * contribution. A moratorium is represented as months before repayment;
 * callers can choose whether interest is capitalized during the moratorium
 * according to the scheme's actual terms.
 */
export function calculateLoan({
  projectCost,
  requestedLoan,
  maxLoan,
  beneficiaryContributionPct = 0,
  interestRatePct,
  tenureYears,
  moratoriumMonths = 0,
  capitalizeMoratoriumInterest = false,
}) {
  const cost = Math.max(0, Number(projectCost) || 0);
  const requested = Math.max(0, Number(requestedLoan) || 0);
  const max = Number(maxLoan);
  const contributionPct = Math.min(100, Math.max(0, Number(beneficiaryContributionPct) || 0));
  const rate = Math.max(0, Number(interestRatePct) || 0);
  const years = Math.max(0, Number(tenureYears) || 0);
  const moratorium = Math.max(0, Math.floor(Number(moratoriumMonths) || 0));

  const contribution = cost > 0 ? cost * (contributionPct / 100) : 0;
  const amountAfterContribution = Math.max(0, cost - contribution);
  const eligibleAmount = Number.isFinite(max) && max >= 0
    ? Math.min(amountAfterContribution || requested, max)
    : (amountAfterContribution || requested);
  const principalBeforeMoratorium = Math.min(requested || eligibleAmount, eligibleAmount);

  const monthlyRate = rate / 100 / 12;
  const repaymentMonths = Math.max(1, Math.round(years * 12));
  let principal = principalBeforeMoratorium;
  let moratoriumInterest = 0;

  if (capitalizeMoratoriumInterest && monthlyRate > 0 && moratorium > 0) {
    principal *= Math.pow(1 + monthlyRate, moratorium);
    moratoriumInterest = principal - principalBeforeMoratorium;
  }

  const emi = monthlyRate === 0
    ? principal / repaymentMonths
    : principal * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths) /
      (Math.pow(1 + monthlyRate, repaymentMonths) - 1);

  const repaymentTotal = emi * repaymentMonths;
  const repaymentInterest = Math.max(0, repaymentTotal - principal);

  return {
    projectCost: cost,
    beneficiaryContribution: contribution,
    eligibleLoanAmount: eligibleAmount,
    financedAmount: principalBeforeMoratorium,
    interestRatePct: rate,
    tenureYears: years,
    repaymentMonths,
    moratoriumMonths: moratorium,
    moratoriumInterest,
    emi,
    repaymentInterest,
    totalInterest: moratoriumInterest + repaymentInterest,
    totalRepayment: repaymentTotal + moratoriumInterest,
    indicativeOnly: true,
  };
}

export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}
