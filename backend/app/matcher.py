"""Deterministic, explainable eligibility matching."""
from typing import Any


def evaluate_scheme(scheme: dict[str, Any], profile: dict[str, Any], catalogue_version: str) -> dict[str, Any]:
    req = scheme["requires"]
    passed: list[str] = []
    failed: list[str] = []
    unknown: list[str] = []
    aliases = {"income_max": "income_inr", "project_cost_max": "project_cost_inr", "project_cost_min": "project_cost_inr"}
    for key, expected in req.items():
        actual = profile.get(aliases.get(key, key))
        if actual is None:
            unknown.append(key)
            continue
        if key in {"income_max", "project_cost_max"}:
            ok = actual <= expected
            (passed if ok else failed).append(f"{key} requirement is met" if ok else f"{key} requirement is not met")
        elif key == "project_cost_min":
            ok = actual > expected
            (passed if ok else failed).append("project cost is above the modelled threshold" if ok else "project cost is not above the modelled threshold")
        elif key == "occupation":
            ok = str(actual).lower() in {str(x).lower() for x in expected}
            (passed if ok else failed).append("occupation matches the modelled category" if ok else "occupation does not match the modelled category")
        else:
            ok = actual == expected
            (passed if ok else failed).append(f"{key} requirement is met" if ok else f"{key} requirement is not met")
    status = "not_eligible" if failed else ("needs_verification" if unknown else "eligible")
    return {"scheme_id": scheme["id"], "name": scheme["name"], "category": scheme["category"], "status": status, "reasons": passed, "blocking_reasons": failed, "needs_verification": unknown, "catalogue_version": catalogue_version}


def match(profile: dict[str, Any], schemes: list[dict[str, Any]], catalogue_version: str) -> list[dict[str, Any]]:
    rank = {"eligible": 0, "needs_verification": 1, "not_eligible": 2}
    return sorted((evaluate_scheme(s, profile, catalogue_version) for s in schemes), key=lambda x: (rank[x["status"]], -len(x["reasons"])))
