import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, ChevronRight, CircleHelp, Landmark, MapPin, Menu, Mic, ShieldCheck, Sparkles, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const schemes = [
  { id: 'mfs', name: 'Micro Finance Scheme', range: 'Projects up to ₹1.40 lakh', rate: '6.5%', tenure: '3 years', source: 'Official government', fit: 'Best for small business projects' },
  { id: 'term', name: 'Term Loan', range: 'Projects above ₹1.40 lakh up to ₹50 lakh', rate: '8%', tenure: 'Up to 7 years', source: 'Official government', fit: 'Best for larger business projects' },
  { id: 'education', name: 'Educational Loan Scheme', range: 'Education financing', rate: 'Scheme-dependent', tenure: 'Up to 10–12 years', source: 'Official government', fit: 'For eligible education expenses' },
];

function App() {
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ goal: '', projectCost: '', income: '', education: false, scConfirmed: false, location: 'Telangana' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculator, setCalculator] = useState(false);

  const recommendation = useMemo(() => {
    const cost = Number(profile.projectCost || 0);
    if (profile.education) return schemes[2];
    if (cost > 140000) return schemes[1];
    return schemes[0];
  }, [profile.projectCost, profile.education]);

  const runMatch = async () => {
    setLoading(true);
    try {
      const payload = { enterprise_intent: profile.goal === 'business', occupation: 'Applicant', income_inr: profile.income ? Number(profile.income) : undefined, urban: true, has_pucca_house: false };
      const response = await fetch(`${API}/api/v1/matches`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Matching service unavailable');
      setResults(await response.json());
    } catch { setResults({ offline: true }); }
    setLoading(false);
    setStep(4);
  };

  const start = () => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const reset = () => { setStep(0); setResults(null); setProfile({ goal: '', projectCost: '', income: '', education: false, scConfirmed: false, location: 'Telangana' }); };

  return <div className="app">
    <header className="nav">
      <a className="brand" href="#top"><span>YO</span>JANTRA</a>
      <nav className={menu ? 'navlinks open' : 'navlinks'}>
        <a href="#how">How it works</a><a href="#trust">Trust</a><a href="#partners">Partners</a>
        <button className="nav-cta" onClick={start}>Find my route <ArrowRight size={16}/></button>
      </nav>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
    </header>

    <main id="top">
      {step === 0 && <>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><ShieldCheck size={16}/> Built for informed decisions</div>
            <h1>Don't just find a loan. <em>Find your route.</em></h1>
            <p>Yojantra helps eligible SC beneficiaries understand the right NSFDC credit route, estimate the financing, find an appropriate channel partner, and know what to do next.</p>
            <div className="hero-actions"><button className="primary" onClick={start}>Find my route <ArrowRight size={18}/></button><button className="secondary" onClick={() => setStep(2)}><Calculator size={17}/> Try calculator</button></div>
            <p className="micro">Government-first · Rule-based matching · Multilingual-ready</p>
          </div>
          <div className="hero-panel">
            <div className="panel-top"><span>YOUR PATH</span><span className="live"><i/> Guided</span></div>
            <div className="path-item active"><span className="path-num">01</span><div><strong>Tell us your goal</strong><small>Business or education</small></div><CheckCircle2/></div>
            <div className="path-line"/>
            <div className="path-item"><span className="path-num">02</span><div><strong>Match the right route</strong><small>Rules before AI explanation</small></div><ChevronRight/></div>
            <div className="path-line"/>
            <div className="path-item"><span className="path-num">03</span><div><strong>Find the right partner</strong><small>Authorized channel only</small></div><MapPin/></div>
            <div className="panel-foot"><ShieldCheck size={16}/> Official sources remain authoritative</div>
          </div>
        </section>
        <section id="how" className="section intro"><div><span className="label">THE DIFFERENCE</span><h2>From “Which scheme?” to <span>“What do I do next?”</span></h2></div><div className="feature-grid"><article><Sparkles/><h3>Smart matching</h3><p>Start with your goal and situation, not a scheme name. Deterministic rules handle eligibility.</p></article><article><Calculator/><h3>Financial clarity</h3><p>See indicative financing, contribution, rate, tenure and EMI before you approach a partner.</p></article><article><MapPin/><h3>Partner routing</h3><p>Find authorized channel partners compatible with the selected route and available data.</p></article></div></section>
        <section className="trust" id="trust"><div><ShieldCheck size={25}/><span className="label light">TRUST BY DESIGN</span><h2>AI explains.<br/>Rules decide.</h2></div><div><p>Yojantra never turns an uncertain fact into a confident eligibility claim. Source, freshness and verification status stay visible.</p><div className="trust-tags"><span>Official government</span><span>Institutional</span><span>Private / discovery</span></div></div></section>
      </>}

      {step > 0 && <section className="wizard-wrap">
        <div className="wizard-head"><button className="back" onClick={() => step === 1 ? reset() : setStep(step - 1)}><ArrowLeft size={17}/> Back</button><div><span className="label">YOJANTRA ROUTE FINDER</span><div className="progress"><i className={step >= 1 ? 'on' : ''}/><i className={step >= 2 ? 'on' : ''}/><i className={step >= 3 ? 'on' : ''}/><i className={step >= 4 ? 'on' : ''}/></div></div><span className="step-count">{Math.min(step,4)}/4</span></div>

        {step === 1 && <div className="wizard-card"><div className="wizard-copy"><span className="label">STEP 01</span><h2>What are you trying to achieve?</h2><p>Choose the goal that best describes your need. You can refine it later.</p></div><div className="goal-grid"><button className={profile.goal === 'business' ? 'goal selected' : 'goal'} onClick={() => setProfile({...profile, goal: 'business', education: false})}><Landmark/><strong>Start or expand a business</strong><small>Project finance, equipment, working capital</small></button><button className={profile.goal === 'education' ? 'goal selected' : 'goal'} onClick={() => setProfile({...profile, goal: 'education', education: true})}><Sparkles/><strong>Fund my education</strong><small>Eligible higher-education expenses</small></button></div><button className="primary next" disabled={!profile.goal} onClick={() => setStep(2)}>Continue <ArrowRight size={18}/></button></div>}

        {step === 2 && <div className="wizard-card"><div className="wizard-copy"><span className="label">STEP 02</span><h2>Tell us the numbers that matter.</h2><p>We ask only for information that changes the recommendation.</p></div><div className="field-grid"><label>Annual family income<input type="number" value={profile.income} onChange={e => setProfile({...profile, income:e.target.value})} placeholder="e.g. 400000"/><small>Current challenge threshold: up to ₹5 lakh</small></label>{profile.goal === 'business' && <label>Estimated project cost<input type="number" value={profile.projectCost} onChange={e => setProfile({...profile, projectCost:e.target.value})} placeholder="e.g. 200000"/><small>This helps distinguish micro finance vs term loan.</small></label>}<label>Location<input value={profile.location} onChange={e => setProfile({...profile, location:e.target.value})} placeholder="State / district"/></label></div><label className="confirm"><input type="checkbox" checked={profile.scConfirmed} onChange={e => setProfile({...profile, scConfirmed:e.target.checked})}/><span><strong>I confirm I am an SC applicant.</strong><small>This is a self-declaration for guidance, not official caste verification.</small></span></label><button className="primary next" onClick={() => setStep(3)}>Review route <ArrowRight size={18}/></button></div>}

        {step === 3 && <div className="wizard-card"><div className="wizard-copy"><span className="label">STEP 03</span><h2>Here is the route we would check first.</h2><p>This is an indicative recommendation based on the information you provided.</p></div><div className="recommend-card"><div className="rec-icon"><CheckCircle2/></div><div className="rec-body"><span>RECOMMENDED ROUTE</span><h3>{recommendation.name}</h3><p>{recommendation.fit}</p><div className="rec-stats"><div><small>Project range</small><b>{recommendation.range}</b></div><div><small>Indicative rate</small><b>{recommendation.rate}</b></div><div><small>Repayment</small><b>{recommendation.tenure}</b></div></div><div className="source"><ShieldCheck size={15}/>{recommendation.source}</div></div></div><div className="notice"><CircleHelp size={18}/><span><strong>Not a sanction.</strong> Final eligibility, sanction, rate and terms are determined by the authorized channelizing agency.</span></div><button className="primary next" onClick={runMatch} disabled={loading}>{loading ? 'Checking…' : 'Build my action plan'} <ArrowRight size={18}/></button></div>}

        {step === 4 && <div className="action-layout"><div className="wizard-card action-main"><div className="action-title"><div><span className="label">YOUR ACTION PLAN</span><h2>Here’s what to do next.</h2><p>Goal: {profile.goal === 'education' ? 'Education funding' : 'Business finance'} · {profile.location}</p></div><button className="voice"><Mic size={17}/> Ask by voice</button></div><Action title="DO NOW" tone="good" text={`Check your ${recommendation.name} route with an authorized channel partner.`} meta="Official route"/><Action title="PREPARE NEXT" tone="good" text="Keep identity, caste, income and project/education documents ready." meta="Document checklist"/><Action title="NEEDS VERIFICATION" tone="warn" text={profile.scConfirmed ? 'Official verification is still required before eligibility is confirmed.' : 'SC status must be verified through the official process.'} meta="Do not treat this as eligible yet"/><Action title="PARTNER ROUTER" tone="map" text="Find the nearest compatible authorized channel partner." meta="Location + scheme compatibility" onClick={() => document.getElementById('partners')?.scrollIntoView({behavior:'smooth'})}/>{results?.offline && <div className="offline"><CircleHelp size={18}/><span><strong>Live matching service unavailable.</strong> The route above is an indicative local recommendation; connect the API to receive catalogue-backed results.</span></div>}</div><aside className="side-card"><span className="label">QUICK CHECK</span><div className="quick"><b>{recommendation.rate}</b><span>indicative rate</span></div><div className="quick"><b>{recommendation.tenure}</b><span>repayment window</span></div><button className="secondary full" onClick={() => setCalculator(true)}><Calculator size={17}/> Calculate EMI</button><button className="secondary full" onClick={() => document.getElementById('partners')?.scrollIntoView({behavior:'smooth'})}><MapPin size={17}/> Find a partner</button></aside></div>}
      </section>}

      <section className="partner-section" id="partners"><div className="section partner-copy"><div><span className="label">CHANNEL ROUTER</span><h2>Don't send a citizen to the wrong door.</h2><p>Yojantra is designed to route only to authorized channel partners compatible with the selected scheme. If current fund or NPA status data is unavailable, we say so.</p></div><div className="partner-demo"><div className="map-placeholder"><MapPin size={30}/><span>Partner coverage map</span><small>Location-aware routing</small></div><div className="partner-list"><div><b>Authorized SCA</b><span>2.4 km · Verified</span><CheckCircle2/></div><div><b>Partner bank</b><span>4.1 km · Verified</span><CheckCircle2/></div><div><b>NBFC-MFI</b><span>6.8 km · Needs verification</span><CircleHelp/></div></div></div></div></section>
    </main>

    <footer><span className="brand"><span>YO</span>JANTRA</span><span>Decision support, not a substitute for the issuing authority.</span></footer>

    {calculator && <div className="modal-backdrop" onClick={() => setCalculator(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setCalculator(false)}><X/></button><span className="label">INDICATIVE CALCULATOR</span><h2>Estimate your EMI</h2><p>For demonstration. Actual repayment terms are decided by the authorized agency.</p><label>Loan amount<input id="loan" type="number" defaultValue={profile.projectCost ? Math.round(Number(profile.projectCost)*.9) : 160000}/></label><label>Annual interest<input type="number" defaultValue={recommendation.id === 'mfs' ? 6.5 : 8}/></label><label>Tenure (years)<input type="number" defaultValue={recommendation.id === 'mfs' ? 3 : 7}/></label><div className="emi-result"><span>Estimated monthly EMI</span><b>Indicative</b><small>Use the partner's sanctioned schedule for final repayment.</small></div></div></div>}
  </div>;
}

function Action({title,tone,text,meta,onClick}) { return <button className={`action ${tone}`} onClick={onClick}><div className="action-marker">{tone === 'warn' ? '!' : tone === 'map' ? '↗' : '✓'}</div><div><span>{title}</span><strong>{text}</strong><small>{meta}</small></div><ChevronRight/></button>; }
export default App;
