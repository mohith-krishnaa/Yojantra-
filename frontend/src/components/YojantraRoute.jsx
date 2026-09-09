import { useEffect, useMemo, useState } from 'react';
import { fetchSchemes, matchSchemes } from '../services/schemeApi';
import SchemeRecommendation from './SchemeRecommendation';
import LoanCalculator from './LoanCalculator';
import PartnerRouter from './PartnerRouter';

const fallback = [
  { id: 'mfs', name: 'Micro Finance Scheme', range: 'Projects up to ₹1.40 lakh', rate: '6.5%', tenure: '3 years', source: 'Official government', fit: 'For eligible small business projects' },
  { id: 'term', name: 'Term Loan', range: 'Projects above ₹1.40 lakh up to ₹50 lakh', rate: '8%', tenure: 'Up to 7 years', source: 'Official government', fit: 'For eligible larger business projects' },
  { id: 'education', name: 'Educational Loan Scheme', range: 'Education financing', rate: 'Scheme-dependent', tenure: 'Up to 10–12 years', source: 'Official government', fit: 'For eligible education expenses' },
];

export default function YojantraRoute({ profile: initialProfile = {}, onComplete }) {
  const [profile, setProfile] = useState({ goal: 'business', projectCost: '', income: '', education: false, scConfirmed: false, location: '', ...initialProfile });
  const [schemes, setSchemes] = useState(fallback);
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchSchemes().then(items => items.length && setSchemes(items)).catch(() => setError('Live scheme catalogue unavailable; showing the local fallback catalogue.')); }, []);

  const recommended = useMemo(() => {
    const first = matches?.items?.[0];
    if (first) return first;
    if (profile.education || profile.goal === 'education') return schemes.find(s => /education/i.test(s.name)) || fallback[2];
    return Number(profile.projectCost || 0) > 140000 ? schemes.find(s => /term/i.test(s.name)) || fallback[1] : schemes.find(s => /micro/i.test(s.name)) || fallback[0];
  }, [matches, schemes, profile.goal, profile.education, profile.projectCost]);

  async function submit() {
    setLoading(true); setError('');
    try { const result = await matchSchemes(profile); setMatches(result); onComplete?.(result); }
    catch { setError('Live matching is unavailable. The recommendation remains indicative and must be verified with the authorized agency.'); }
    finally { setLoading(false); }
  }

  return <div className="yojantra-route">
    <div className="route-form">
      <label>Goal<select value={profile.goal} onChange={e => setProfile(p => ({ ...p, goal: e.target.value, education: e.target.value === 'education' }))}><option value="business">Start / expand a business</option><option value="education">Fund education</option></select></label>
      {profile.goal === 'business' && <label>Estimated project cost<input type="number" value={profile.projectCost} onChange={e => setProfile(p => ({ ...p, projectCost: e.target.value }))} placeholder="₹" /></label>}
      <label>Annual family income<input type="number" value={profile.income} onChange={e => setProfile(p => ({ ...p, income: e.target.value }))} placeholder="₹" /></label>
      <label>State / district<input value={profile.location} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Telangana" /></label>
      <label className="checkbox"><input type="checkbox" checked={profile.scConfirmed} onChange={e => setProfile(p => ({ ...p, scConfirmed: e.target.checked }))} /> I confirm I am an SC applicant</label>
      <button className="primary" disabled={loading} onClick={submit}>{loading ? 'Checking…' : 'Find my route'}</button>
    </div>
    {error && <p className="route-error">{error}</p>}
    <SchemeRecommendation scheme={recommended} />
    <LoanCalculator scheme={recommended} />
    <PartnerRouter partners={matches?.partners || matches?.channel_partners || []} location={profile.location} />
  </div>;
}
