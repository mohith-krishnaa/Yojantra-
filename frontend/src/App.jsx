import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Search, Menu, X } from 'lucide-react';

const schemes = [
  { name: 'PMMY', title: 'Business support', status: 'Strong match', reason: 'Your business profile fits the currently modelled core requirements.' },
  { name: 'PM SVANidhi', title: 'Working-capital support', status: 'Good match', reason: 'Your occupation and location indicate a potential fit.' },
  { name: 'PM Vishwakarma', title: 'Traditional trade support', status: 'Good match', reason: 'Your trade profile may qualify; verify the trade and document requirements.' },
];

function App() {
  const [menu, setMenu] = useState(false);
  const [started, setStarted] = useState(false);
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
          <p>Tell us about your situation. Yojantra checks it against source-backed scheme rules and explains what fits, what doesn't, and what you still need to know.</p>
          <button className="primary" onClick={() => setStarted(true)}>Find my schemes <ArrowRight size={18}/></button>
          <p className="micro">Free to use · No guessing · Always verify with the official source</p>
        </div>
        <div className="hero-card" aria-label="Example scheme matches">
          <div className="card-head"><span>Your likely matches</span><span className="dot"/></div>
          {schemes.map((s) => <article className="scheme" key={s.name}><div><strong>{s.name}</strong><span>{s.title}</span></div><b>{s.status}</b></article>)}
          <div className="card-foot"><CheckCircle2 size={17}/> Why this matched is always shown</div>
        </div>
      </section>

      <section id="how" className="section">
        <div><span className="label">HOW IT WORKS</span><h2>One guided profile.<br/>No complicated forms.</h2></div>
        <div className="steps"><div><span>01</span><h3>Tell us about you</h3><p>Answer only the questions that affect eligibility.</p></div><div><span>02</span><h3>We check the rules</h3><p>Deterministic rules first. AI does not invent eligibility.</p></div><div><span>03</span><h3>Understand your options</h3><p>See match status, reasons, evidence and next steps.</p></div></div>
      </section>

      <section id="matches" className="section matches"><div><span className="label">EXAMPLE</span><h2>Results should be<br/>easy to understand.</h2></div><div className="match-list">{schemes.map((s) => <div className="match-row" key={s.name}><div className="match-icon">{s.name.slice(0,2)}</div><div className="match-body"><strong>{s.name}</strong><span>{s.title}</span><p>{s.reason}</p></div><span className="pill">{s.status}</span></div>)}</div></section>

      <section id="trust" className="trust"><div><ShieldCheck size={24}/><h2>AI should explain.<br/>Not make things up.</h2></div><p>Yojantra separates verified scheme rules from AI assistance. If information is missing or uncertain, the product says so instead of pretending.</p></section>
    </main>

    <footer><span className="brand"><span>YO</span>JANTRA</span><span>Finds the right Yojana for you.</span></footer>

    {started && <div className="modal-backdrop" onClick={() => setStarted(false)}><div className="modal" onClick={e => e.stopPropagation()}><span className="label">START ASSESSMENT</span><h2>Let's find your schemes.</h2><p>This is the first step of the guided profile. Authentication and saved profiles will be connected to Firebase in the next integration stage.</p><button className="primary" onClick={() => setStarted(false)}>Continue <ArrowRight size={18}/></button></div></div>}
  </div>;
}
export default App;
