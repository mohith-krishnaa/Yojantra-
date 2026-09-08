"""Safe channel-partner routing primitives.

Only partners explicitly marked authorized are returned as actionable routes.
Missing operational/fund-status data is surfaced as verification-needed rather
than being guessed.
"""
from math import asin, cos, radians, sin, sqrt
from typing import Any


def distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371.0
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return 2 * r * asin(sqrt(a))


def route_partners(
    partners: list[dict[str, Any]],
    latitude: float | None = None,
    longitude: float | None = None,
    required_scheme_type: str | None = None,
) -> dict[str, Any]:
    candidates = []
    verification_needed = []

    for partner in partners:
        if not partner.get("active", True):
            continue
        if partner.get("authorization_status") != "authorized":
            continue
        if required_scheme_type and required_scheme_type not in (partner.get("supported_scheme_types") or []):
            continue

        # Unknown processing/fund status must not be treated as available.
        if partner.get("processing_status") != "available" or partner.get("fund_utilization_eligible") is not True:
            verification_needed.append({
                "partner_id": partner.get("id"),
                "name": partner.get("name"),
                "reason": "Authorized partner, but current processing/fund-eligibility data is not confirmed."
            })
            continue

        item = dict(partner)
        if latitude is not None and longitude is not None and partner.get("latitude") is not None and partner.get("longitude") is not None:
            item["distance_km"] = round(distance_km(latitude, longitude, partner["latitude"], partner["longitude"]), 2)
        else:
            item["distance_km"] = None
        candidates.append(item)

    candidates.sort(key=lambda x: (x["distance_km"] is None, x["distance_km"] if x["distance_km"] is not None else float("inf")))
    return {
        "recommended": candidates[0] if candidates else None,
        "alternatives": candidates[1:5],
        "verification_needed": verification_needed,
        "disclaimer": "Routing is based only on currently available authorized-partner data. Confirm scheme handling and current operational/fund status before visiting or applying."
    }
