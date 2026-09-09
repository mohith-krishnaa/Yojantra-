"""Supabase-backed channel partner loader with a safe empty fallback."""

import json
import os
from urllib.request import Request, urlopen


def load_partners() -> tuple[list[dict], str]:
    """Load active authorized partners from Supabase.

    The service-role key is server-side only. Missing credentials or a failed
    request returns an empty list so the API never fabricates partner status.
    """
    base = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not base or not key:
        return [], "unconfigured"

    path = (
        "channel_partners?active=eq.true&authorization_status=eq.authorized"
        "&select=id,name,partner_type,state,district,address,latitude,longitude,phone,"
        "application_url,authorization_status,processing_status,fund_utilization_eligible,"
        "npa_status,supported_scheme_types,source_url,source_verified_at,last_checked_at,active"
    )
    try:
        request = Request(
            f"{base.rstrip('/')}/rest/v1/{path}",
            headers={"apikey": key, "Authorization": f"Bearer {key}"},
        )
        with urlopen(request, timeout=5) as response:
            return json.loads(response.read().decode("utf-8")), "supabase"
    except Exception:
        return [], "unavailable"
