from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Yojantra API", version="0.1.0")

SCHEMES = [
    {"id":"pmmy","name":"PMMY","title":"Business support","status":"potential"},
    {"id":"pm-svanidhi","name":"PM SVANidhi","title":"Working-capital support","status":"potential"},
    {"id":"pm-vishwakarma","name":"PM Vishwakarma","title":"Traditional trade support","status":"potential"},
]

class Profile(BaseModel):
    state: Optional[str] = None
    occupation: Optional[str] = None
    business_stage: Optional[str] = None
    income_inr: Optional[float] = None

@app.get('/health')
def health():
    return {"status":"healthy","service":"yojantra-api","version":"0.1.0"}

@app.get('/api/v1/schemes')
def schemes():
    return {"items": SCHEMES, "count": len(SCHEMES)}

@app.post('/api/v1/matches')
def matches(profile: Profile):
    # Placeholder contract only. Deterministic eligibility rules will be wired from the governed catalogue.
    return {"profile": profile.model_dump(), "items": SCHEMES, "note":"Eligibility engine integration is the next backend milestone."}
