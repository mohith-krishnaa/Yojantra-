import { CheckCircle2, CircleHelp, MapPin, ShieldCheck } from 'lucide-react';

export default function PartnerRouter({ partners = [], location, onSelect }) {
  const items = Array.isArray(partners) ? partners : [];
  return (
    <section className="partner-router" aria-label="Channel partner router">
      <div className="partner-router-heading">
        <div><span className="label">CHANNEL ROUTER</span><h2>Find the right door.</h2><p>{location ? `Compatible partners near ${location}.` : 'Compatible authorized channel partners.'}</p></div>
        <MapPin size={24} />
      </div>
      {!items.length ? (
        <div className="partner-empty"><CircleHelp size={18} /><span><strong>No verified partner data returned.</strong> We won't invent a partner or claim live availability.</span></div>
      ) : (
        <div className="partner-list">
          {items.map((partner, index) => {
            const name = partner.name || partner.partner_name || `Channel partner ${index + 1}`;
            const verified = partner.verified ?? partner.verification_status === 'verified';
            return <button className="partner-item" key={partner.id || name} onClick={() => onSelect?.(partner)}>
              <div className="partner-item-icon"><MapPin size={18} /></div>
              <div><strong>{name}</strong><span>{partner.distance_km != null ? `${partner.distance_km} km` : 'Distance unavailable'} · {partner.type || partner.partner_type || 'Channel partner'}</span></div>
              <div className="partner-status">{verified ? <><CheckCircle2 size={16} /> Verified</> : <><CircleHelp size={16} /> Verify</>}</div>
            </button>;
          })}
        </div>
      )}
      <div className="partner-trust"><ShieldCheck size={15} /> Partner availability, fund utilization and NPA/overdue status must come from current authorized data.</div>
    </section>
  );
}
