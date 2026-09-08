"""Deterministic action-plan generation from matcher output."""
from typing import Any


def build_action_plan(profile: dict[str, Any], matches: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
    """Turn eligibility results into prioritized user actions.

    This is intentionally deterministic. AI may explain these actions, but it
    must not change the underlying eligibility status or invent requirements.
    """
    do_now: list[dict[str, Any]] = []
    prepare: list[dict[str, Any]] = []
    verify: list[dict[str, Any]] = []
    later: list[dict[str, Any]] = []

    for item in matches:
        base = {
            "scheme_id": item["scheme_id"],
            "name": item["name"],
            "status": item["status"],
            "catalogue_version": item["catalogue_version"],
        }
        if item["status"] == "eligible":
            do_now.append({**base, "next_action": "Review the official scheme requirements and start the application through the authorized channel."})
        elif item["status"] == "needs_verification":
            verify.append({
                **base,
                "missing_information": item["needs_verification"],
                "next_action": "Confirm the missing facts before treating this as an eligibility decision.",
            })
        else:
            later.append({
                **base,
                "blockers": item["blocking_reasons"],
                "next_action": "Review alternatives or revisit this opportunity if the blocking conditions change.",
            })

    missing_profile = [
        key for key in ("state", "income_inr", "occupation") if profile.get(key) is None
    ]
    if missing_profile:
        prepare.append({
            "type": "profile_completion",
            "missing_information": missing_profile,
            "next_action": "Complete the profile fields that materially affect matching.",
        })

    return {
        "do_now": do_now,
        "prepare_next": prepare,
        "needs_verification": verify,
        "later_or_not_ready": later,
    }
