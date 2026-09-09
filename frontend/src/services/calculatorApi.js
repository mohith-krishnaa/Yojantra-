import { calculateLoan } from '../utils/loanCalculator';

export function quoteLoan({ amount, maxLoanAmount, annualRate, tenureYears, moratoriumMonths = 0, capitalizeMoratoriumInterest = false }) {
  return calculateLoan({ amount, maxLoanAmount, annualRate, tenureYears, moratoriumMonths, capitalizeMoratoriumInterest });
}
