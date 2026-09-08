import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Menu, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [menu, setMenu] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [form, setForm] = useState({ enterprise_intent: true, occupation: '', income_inr: '', urban: true, has_pucca_house: false });

  const runMatch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, income_inr: form.income_inr ? Number(form.income_inr) : undefined };
      const response = await fetch(`${API}/api/v1/matches`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Matching service unavailable');
      setResults(await response.json());
    } catch (error) {
      setResults({ error: error.message });
    } finally { setLoading(false); }
  };

  return <div className="app">
    <header className="nav">
      <a className="brand" href="#top" aria-label="Yojantra home"><span>YO</span>JANTRA</a>
      <nav className={menu ? 'navlinks open' : 'navlinks'}>
        <a href="#how">How it works</a><a href="#matches">Example matches</a><a href="#trust">Trust</a>
        <button className="nav-cta" onClick={() => setStarted(true)}>Find my schemes</button>
      </nav>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><ShieldCheck size={16}/> Verified rules, clear reasons</div>
          <h1>Find the right <em>Yojana</em> for you.</h1>
          <p>Tell us about your situation. Yojantra checks it against source-backed scheme rules and explains what fits, what doesn't, and what still needs verification.</p>
          <button className="primary" onClick={() => setStarted(true)}>Find my schemes <ArrowRight size={18}/></button>
          <p className="micro">Free to use · No guessing · Always verify with the official source</p>
        </div>
        <div className="hero-card"><div className="card-head"><span>How matching works</span><span className="dot"/></div>
          {['Hard rules first','Unknown information stays unknown','Every result includes reasons'].map((x,i)=><article className="scheme" key={x}><div><strong>0{i+1}</strong><span>{x}</span></div><b>EXPLAINED</b></article>)}
          <div className="card-foot"><CheckCircle2 size={17}/> Deterministic matching before AI assistance</div>
        </div>
      </section>

      <section id="how" className="section"><div><span className="label">HOW IT WORKS</span><h2>One guided profile.<br/>No complicated forms.</h2></div><div className="steps"><div><span>01</span><h3>Tell us about you</h3><p>Answer only the questions that affect eligibility.</p></div><div><span>02</span><h3>We check the rules</h3><p>Deterministic rules first. AI does not invent eligibility.</p></div><div><span>03</span><h3>Understand your options</h3><p>See status, reasons, evidence and what needs verification.</p></div></div></section>
      <section id="matches" className="section matches"><div><span className="label">ENGINE</span><h2>Results are now<br/>connected to the API.</h2></div><div className="match-list"><div className="match-row"><div className="match-icon">✓</div><div className="match-body"><strong>10-scheme catalogue</strong><span>Governed model</span><p>Results are ranked as eligible, needs verification, or not eligible.</p></div><span className="pill">LIVE</span></div></div></section>
      <section id="trust" className="trust"><div><ShieldCheck size={24}/><h2>AI should explain.<br/>Not make things up.</h2></div><p>Yojantra separates verified scheme rules from AI assistance. Missing information becomes a verification item instead of a false positive.</p></section>
    </main>

    <footer><span className="brand"><span>YO</span>JANTRA</span><span>Finds the right Yojana for you.</span></footer>

    {started && <div className="modal-backdrop" onClick={() => setStarted(false)}><div className="modal" onClick={e => e.stopPropagation()}>
      <span className="label">START ASSESSMENT</span><h2>Tell us enough to start.</h2>
      <form onSubmit={runMatch} className="assessment-form">
        <label>Occupation<input value={form.occupation} onChange={e=>setForm({...form,occupation:e.target.value})} placeholder="e.g. vendor, artisan" /></label>
        <label>Annual income (₹)<input type="number" value={form.income_inr} onChange={e=>setForm({...form,income_inr:e.target.value})} placeholder="Optional" /></label>
        <label className="check"><input type="checkbox" checked={form.enterprise_intent} onChange={e=>setForm({...form,enterprise_intent:e.target.checked})}/> I want support for a business or enterprise</label>
        <button className="primary" disabled={loading}>{loading ? 'Checking…' : 'Check my schemes'} <ArrowRight size={18}/></button>
      </form>
      {results && !results.error && <div className="results"><strong>{results.items.filter(x=>x.status==='eligible').length} eligible · {results.items.filter(x=>x.status==='needs_verification').length} need verification</strong>{results.items.slice(0,5).map(x=><div className="result" key={x.scheme_id}><b>{x.name}</b><span>{x.status.replace('_',' ')}</span></div>)}<small>{results.disclaimer}</small></div>}
      {results?.error && <p role="alert">{results.error}. The API may not be running locally yet.</p>}
    </div></div>}
  </div>;
}
export default App;
