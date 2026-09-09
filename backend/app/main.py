from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict

from .action_plan import build_action_plan
from .catalogue_store import load_catalogue
from .loan_calculator import build_loan_quote
from .matcher import match
from .partner_router import route_partners

app = FastAPI(title="Yojantra API", version="0.6.0")


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
    goal: Optional[str] = None
    project_cost_inr: Optional[float] = None
    education_status: Optional[str] = None
    community: Optional[str] = None


class LoanQuoteRequest(BaseModel):
    project_cost_inr: float
    requested_loan_inr: float
    annual_rate_percent: float
    tenure_months: int
    moratorium_months: int = 0
    max_loan_inr: Optional[float] = None
    financing_percent: Optional[float] = None


class PartnerRouteRequest(BaseModel):
    partners: list[dict]
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    required_scheme_type: Optional[str] = None


@app.get("/health")
def health():
    return {"status": "healthy", "service": "yojantra-api", "version": "0.6.0"}


@app.get("/api/v1/schemes")
def schemes():
    items, version, source = load_catalogue()
    return {"items": items, "count": len(items), "catalogue_version": version, "catalogue_source": source}


@app.post("/api/v1/matches")
def matches(profile: Profile):
    profile_data = profile.model_dump(exclude_none=True)
    items, version, source = load_catalogue()
    results = match(profile_data, items, version)
    return {
        "profile": profile_data,
        "items": results,
        "catalogue_version": version,
        "catalogue_source": source,
        "disclaimer": "Modelled rules only. Confirm eligibility with the official scheme source before applying.",
    }


@app.post("/api/v1/action-plan")
def action_plan(profile: Profile):
    profile_data = profile.model_dump(exclude_none=True)
    items, version, source = load_catalogue()
    results = match(profile_data, items, version)
    return {
        "profile": profile_data,
        "catalogue_version": version,
        "catalogue_source": source,
        "plan": build_action_plan(profile_data, results),
        "disclaimer": "The action plan is based on modelled rules and available profile information. Confirm eligibility and application requirements with the official or authorized provider before applying.",
    }


@app.post("/api/v1/loan-quote")
def loan_quote(request: LoanQuoteRequest):
    return build_loan_quote(**request.model_dump())


@app.post("/api/v1/partner-route")
def partner_route(request: PartnerRouteRequest):
    return route_partners(**request.model_dump())
