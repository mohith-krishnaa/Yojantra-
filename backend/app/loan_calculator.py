"""Transparent loan calculations for Yojantra.

The calculator is intentionally independent of eligibility. Scheme-specific
limits/rates/tenures must come from governed data. Moratorium handling is
reported separately unless the source explicitly defines capitalization rules.
"""
from math import pow
from typing import Any


def calculate_emi(principal: float, annual_rate_percent: float, months: int) -> float:
    if principal <= 0 or months <= 0:
        raise ValueError("principal and months must be positive")
    if annual_rate_percent < 0:
        raise ValueError("annual_rate_percent cannot be negative")
    monthly_rate = annual_rate_percent / 1200
    if monthly_rate == 0:
        return principal / months
    return principal * monthly_rate * pow(1 + monthly_rate, months) / (pow(1 + monthly_rate, months) - 1)


def build_loan_quote(
    project_cost_inr: float,
    requested_loan_inr: float,
    annual_rate_percent: float,
    tenure_months: int,
    moratorium_months: int = 0,
    max_loan_inr: float | None = None,
    financing_percent: float | None = None,
) -> dict[str, Any]:
    if project_cost_inr <= 0 or requested_loan_inr <= 0:
        raise ValueError("project_cost_inr and requested_loan_inr must be positive")
    if tenure_months <= 0 or moratorium_months < 0:
        raise ValueError("invalid tenure or moratorium")

    financing_cap = None if financing_percent is None else project_cost_inr * financing_percent / 100
    caps = [x for x in (max_loan_inr, financing_cap) if x is not None]
    indicative_loan = min([requested_loan_inr, *caps]) if caps else requested_loan_inr
    own_contribution = max(project_cost_inr - indicative_loan, 0)
    emi = calculate_emi(indicative_loan, annual_rate_percent, tenure_months)

    return {
        "project_cost_inr": round(project_cost_inr, 2),
        "requested_loan_inr": round(requested_loan_inr, 2),
        "indicative_loan_inr": round(indicative_loan, 2),
        "own_contribution_inr": round(own_contribution, 2),
        "annual_rate_percent": annual_rate_percent,
        "tenure_months": tenure_months,
        "moratorium_months": moratorium_months,
        "estimated_emi_inr": round(emi, 2),
        "moratorium_note": "EMI is calculated for the stated repayment tenure. Interest treatment during moratorium is not inferred; confirm capitalization/repayment treatment with the authorized channel partner.",
        "disclaimer": "Indicative calculation only. Sanctioned amount, rate, tenure and repayment terms are determined by the authorized channelizing agency."
    }
