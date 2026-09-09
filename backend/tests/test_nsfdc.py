from app.nsfdc_catalogue import NSFDC_SCHEMES
from app.sih_matcher import match_nsfdc


def test_mfs_matches_small_sc_business_profile():
    results = match_nsfdc({"community": "SC", "income_inr": 400000, "goal": "business", "project_cost_inr": 100000})
    mfs = next(item for item in results if item["scheme_id"] == "nsfdc-mfs")
    assert mfs["status"] == "eligible"
    assert mfs["finance"]["loan_max"] == 125000


def test_term_loan_matches_larger_sc_business_profile():
    results = match_nsfdc({"community": "SC", "income_inr": 400000, "goal": "business", "project_cost_inr": 1000000})
    term = next(item for item in results if item["scheme_id"] == "nsfdc-term-loan")
    assert term["status"] == "eligible"
    assert term["routing"]["channel_required"] is True


def test_els_matches_sc_education_profile():
    results = match_nsfdc({"community": "SC", "income_inr": 300000, "goal": "education"})
    els = next(item for item in results if item["scheme_id"] == "nsfdc-els")
    assert els["status"] == "eligible"
    assert els["finance"]["loan_max"] == 4000000


def test_income_over_five_lakh_blocks_nsfdc_credit():
    results = match_nsfdc({"community": "SC", "income_inr": 600000, "goal": "business", "project_cost_inr": 100000})
    mfs = next(item for item in results if item["scheme_id"] == "nsfdc-mfs")
    assert mfs["status"] == "not_eligible"


def test_catalogue_has_five_primary_products():
    assert {scheme["id"] for scheme in NSFDC_SCHEMES} == {"nsfdc-mfs", "nsfdc-amy", "nsfdc-term-loan", "nsfdc-uny", "nsfdc-els"}
