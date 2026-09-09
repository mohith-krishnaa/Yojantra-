import { CheckCircle2, CircleHelp, ShieldCheck } from 'lucide-react';

export default function SchemeRecommendation({ scheme, onContinue }) {
  if (!scheme) return null;
  return (
    <section className="recommendation-card" aria-label="Scheme recommendation">
      <div className="recommendation-icon"><CheckCircle2 size={24} /></div>
      <div className="recommendation-content">
        <span className="label">RECOMMENDED ROUTE</span>
        <h2>{scheme.name}</h2>
        {scheme.fit && <p>{scheme.fit}</p>}
        <div className="recommendation-stats">
          {scheme.range && <div><small>Project / loan range</small><strong>{scheme.range}</strong></div>}
          {scheme.rate && <div><small>Indicative rate</small><strong>{scheme.rate}</strong></div>}
          {scheme.tenure && <div><small>Repayment</small><strong>{scheme.tenure}</strong></div>}
        </div>
        <div className="recommendation-source"><ShieldCheck size={15} /> {scheme.source || 'Source requires verification'}</div>
        <div className="recommendation-disclaimer"><CircleHelp size={15} /><span>Recommendation only. Final eligibility, sanction, rate and terms are decided by the authorized agency.</span></div>
        {onContinue && <button className="primary" onClick={onContinue}>Build my action plan</button>}
      </div>
    </section>
  );
}
