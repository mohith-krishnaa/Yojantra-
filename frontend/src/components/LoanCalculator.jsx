import { useMemo, useState } from 'react';
import { quoteLoan } from '../services/calculatorApi';

const inr = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0);

export default function LoanCalculator({ scheme }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(String(parseFloat(scheme?.rate) || 8));
  const [tenure, setTenure] = useState(String(parseInt(scheme?.tenure, 10) || 7));
  const [moratorium, setMoratorium] = useState('0');

  const quote = useMemo(() => quoteLoan({
    amount: Number(amount || 0),
    maxLoanAmount: Number(scheme?.maxLoanAmount || scheme?.maximum_loan_amount || 0) || undefined,
    annualRate: Number(rate || 0),
    tenureYears: Number(tenure || 0),
    moratoriumMonths: Number(moratorium || 0),
  }), [amount, rate, tenure, moratorium, scheme]);

  return <div className="loan-calculator">
    <div className="calculator-grid">
      <label>Loan amount<input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" /></label>
      <label>Annual interest %<input type="number" min="0" step="0.1" value={rate} onChange={e => setRate(e.target.value)} /></label>
      <label>Tenure (years)<input type="number" min="1" value={tenure} onChange={e => setTenure(e.target.value)} /></label>
      <label>Moratorium (months)<input type="number" min="0" value={moratorium} onChange={e => setMoratorium(e.target.value)} /></label>
    </div>
    {quote && <div className="calculator-result">
      <div><span>Eligible loan</span><strong>{inr(quote.eligibleLoanAmount)}</strong></div>
      <div><span>Beneficiary contribution</span><strong>{inr(quote.beneficiaryContribution)}</strong></div>
      <div><span>Monthly EMI</span><strong>{inr(quote.monthlyEmi)}</strong></div>
      <div><span>Total interest</span><strong>{inr(quote.totalInterest)}</strong></div>
      <div><span>Total repayment</span><strong>{inr(quote.totalRepayment)}</strong></div>
    </div>}
    <p className="calculator-disclaimer">Indicative calculation only. Final rate, sanctioned amount, moratorium and repayment schedule are determined by the authorized channelizing agency.</p>
  </div>;
}
