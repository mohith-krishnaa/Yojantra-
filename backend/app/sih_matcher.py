"""SIH-focused ranking wrapper for the authoritative NSFDC products."""
from .matcher import evaluate_scheme
from .nsfdc_catalogue import NSFDC_CATALOGUE_VERSION, NSFDC_SCHEMES


def match_nsfdc(profile: dict) -> list[dict]:
    results = []
    for scheme in NSFDC_SCHEMES:
        result = evaluate_scheme(scheme, profile, NSFDC_CATALOGUE_VERSION)
        result["source_type"] = scheme["source_type"]
        result["source_name"] = scheme["source_name"]
        result["source_url"] = scheme["source_url"]
        result["finance"] = scheme["finance"]
        result["routing"] = scheme["routing"]
        results.append(result)
    rank = {"eligible": 0, "needs_verification": 1, "not_eligible": 2}
    return sorted(results, key=lambda item: (rank[item["status"]], -len(item["reasons"])))
