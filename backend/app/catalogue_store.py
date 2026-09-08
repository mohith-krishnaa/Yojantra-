"""Database-backed catalogue loader with a safe local fallback.

Supabase is the intended source of truth. The local fallback remains until a
scheme is promoted through governance to a published, active version.
"""

import json
import os
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from .catalogue import CATALOGUE_VERSION, SCHEMES as LOCAL_SCHEMES


def _get(path: str) -> list[dict[str, Any]]:
    base = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not base or not key:
        return []
    url = f"{base.rstrip('/')}/rest/v1/{path}"
    request = Request(url, headers={"apikey": key, "Authorization": f"Bearer {key}"})
    with urlopen(request, timeout=5) as response:
        return json.loads(response.read().decode("utf-8"))


def load_catalogue() -> tuple[list[dict[str, Any]], str, str]:
    """Return (schemes, version, source) from Supabase when published data exists."""
    try:
        schemes = _get("schemes?active=eq.true&status=eq.published&select=*")
        if not schemes:
            return LOCAL_SCHEMES, CATALOGUE_VERSION, "local_fallback"

        rules = _get("scheme_rules?select=*&order=scheme_id")
        by_scheme: dict[str, list[dict[str, Any]]] = {}
        for rule in rules:
            by_scheme.setdefault(rule["scheme_id"], []).append(rule)

        result: list[dict[str, Any]] = []
        for scheme in schemes:
            requires: dict[str, Any] = {}
            for rule in by_scheme.get(scheme["id"], []):
                value = rule.get("expected_value")
                if rule["operator"] == "in":
                    requires[rule["rule_key"]] = value if isinstance(value, list) else json.loads(value)
                elif rule["operator"] == "lte":
                    requires["income_max"] = value
                elif rule["operator"] == "eq":
                    requires[rule["rule_key"]] = value
            result.append({
                "id": scheme["id"],
                "name": scheme["name"],
                "category": scheme.get("description") or "general",
                "requires": requires,
            })
        version = schemes[0].get("catalogue_version") or CATALOGUE_VERSION
        return result, version, "supabase"
    except Exception:
        return LOCAL_SCHEMES, CATALOGUE_VERSION, "local_fallback"
