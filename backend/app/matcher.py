"""Deterministic, explainable eligibility matching."""
from typing import Any
from .catalogue import SCHEMES, CATALOGUE_VERSION


def evaluate_scheme(scheme: dict[str, Any], profile: dict[str, Any]) -> dict[str, Any]:
    req = scheme["requires"]
    passed: list[str] = []
    failed: list[str] = []
    unknown: list[str] = []
    for key, expected in req.items():
        actual = profile.get(key)
        if actual is None:
            unknown.append(key)
            continue
        if key == "income_max":
            (passed if actual <= expected else failed).append(
                "income is within the modelled limit" if actual <= expected else "income exceeds the modelled limit"
            )
        elif key == "occupation":
            ok = str(actual).lower() in {str(x).lower() for x in expected}
            (passed if ok else failed).append("occupation matches the modelled category" if ok else "occupation does not match the modelled category")
        else:
            ok = actual == expected
            (passed if ok else failed).append(f"{key} requirement is met" if ok else f"{key} requirement is not met")
    status = "not_eligible" if failed else ("needs_verification" if unknown else "eligible")
    return {"scheme_id": scheme["id"], "name": scheme["name"], "category": scheme["category"], "status": status, "reasons": passed, "blocking_reasons": failed, "needs_verification": unknown, "catalogue_version": CATALOGUE_VERSION}


def match(profile: dict[str, Any]) -> list[dict[str, Any]]:
    rank = {"eligible": 0, "needs_verification": 1, "not_eligible": 2}
    return sorted((evaluate_scheme(s, profile) for s in SCHEMES), key=lambda x: (rank[x["status"]], -len(x["reasons"])))
