from app.loan_calculator import build_loan_quote, calculate_emi


def test_zero_interest_emi():
    assert calculate_emi(120000, 0, 12) == 10000


def test_quote_respects_financing_cap():
    quote = build_loan_quote(
        project_cost_inr=200000,
        requested_loan_inr=200000,
        annual_rate_percent=8,
        tenure_months=84,
        financing_percent=90,
    )
    assert quote["indicative_loan_inr"] == 180000
    assert quote["own_contribution_inr"] == 20000
    assert quote["estimated_emi_inr"] > 0


def test_quote_respects_fixed_loan_cap():
    quote = build_loan_quote(
        project_cost_inr=200000,
        requested_loan_inr=200000,
        annual_rate_percent=6.5,
        tenure_months=36,
        max_loan_inr=125000,
    )
    assert quote["indicative_loan_inr"] == 125000
    assert quote["own_contribution_inr"] == 75000
