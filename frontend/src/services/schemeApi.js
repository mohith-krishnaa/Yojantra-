const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchSchemes() {
  const response = await fetch(`${API}/api/v1/schemes`);
  if (!response.ok) throw new Error(`Scheme catalogue request failed: ${response.status}`);
  const data = await response.json();
  return Array.isArray(data?.items) ? data.items : [];
}

export async function matchSchemes(profile) {
  const payload = {
    enterprise_intent: profile.goal === 'business',
    occupation: profile.occupation || 'Applicant',
    income_inr: profile.income ? Number(profile.income) : undefined,
    urban: profile.urban ?? true,
    has_pucca_house: profile.hasPuccaHouse ?? false,
    goal: profile.goal,
    project_cost_inr: profile.projectCost ? Number(profile.projectCost) : undefined,
    education_status: profile.education ? 'education' : undefined,
    community: profile.scConfirmed ? 'SC' : undefined,
    state: profile.location,
  };

  const response = await fetch(`${API}/api/v1/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Matching request failed: ${response.status}`);
  return response.json();
}
