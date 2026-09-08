from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict

from .catalogue_store import load_catalogue
from .matcher import match

app = FastAPI(title="Yojantra API", version="0.3.0")


class Profile(BaseModel):
    model_config = ConfigDict(extra="allow")
    state: Optional[str] = None
    occupation: Optional[str] = None
    business_stage: Optional[str] = None
    income_inr: Optional[float] = None
    urban: Optional[bool] = None
    has_pucca_house: Optional[bool] = None
    is_farmer: Optional[bool] = None
    has_cultivable_land: Optional[bool] = None
    enterprise_intent: Optional[bool] = None
    food_processing: Optional[bool] = None
    startup: Optional[bool] = None


@app.get("/health")
def health():
    return {"status": "healthy", "service": "yojantra-api", "version": "0.3.0"}


@app.get("/api/v1/schemes")
def schemes():
    items, version, source = load_catalogue()
    return {"items": items, "count": len(items), "catalogue_version": version, "catalogue_source": source}


@app.post("/api/v1/matches")
def matches(profile: Profile):
    profile_data = profile.model_dump(exclude_none=True)
    items, version, source = load_catalogue()
    return {
        "profile": profile_data,
        "items": match(profile_data, items, version),
        "catalogue_version": version,
        "catalogue_source": source,
        "disclaimer": "Modelled rules only. Confirm eligibility with the official scheme source before applying.",
    }
