from app.matcher import match


def test_business_profile_prioritises_enterprise_schemes():
    results = match({"enterprise_intent": True})
    assert results[0]["status"] == "eligible"
    assert {results[0]["name"], results[1]["name"], results[2]["name"]} >= {"PMEGP", "PMMY", "CGTMSE"}


def test_missing_required_data_is_not_false_eligibility():
    results = match({})
    pmmy = next(item for item in results if item["name"] == "PMMY")
    assert pmmy["status"] == "needs_verification"
    assert "enterprise_intent" in pmmy["needs_verification"]


def test_failed_hard_rule_is_not_eligible():
    results = match({"urban": True, "income_inr": 2000000, "has_pucca_house": False})
    pmay = next(item for item in results if item["name"] == "PMAY-U 2.0")
    assert pmay["status"] == "not_eligible"
