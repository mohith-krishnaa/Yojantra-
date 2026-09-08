"""Governed scheme catalogue used by the deterministic matching engine.

Only requirements represented here are evaluated automatically.
Anything not modelled is surfaced as a verification item rather than guessed.
"""

SCHEMES = [
    {"id": "pmay-u-2", "name": "PMAY-U 2.0", "category": "housing", "requires": {"urban": True, "income_max": 1800000, "has_pucca_house": False}},
    {"id": "pm-jay", "name": "Ayushman Bharat PM-JAY", "category": "health", "requires": {}},
    {"id": "pm-svanidhi", "name": "PM SVANidhi", "category": "street_vendor", "requires": {"occupation": ["street_vendor", "vendor"]}},
    {"id": "pm-vishwakarma", "name": "PM Vishwakarma", "category": "traditional_trade", "requires": {"occupation": ["artisan", "craftsperson"]}},
    {"id": "pm-kisan", "name": "PM-KISAN", "category": "agriculture", "requires": {"is_farmer": True, "has_cultivable_land": True}},
    {"id": "pmegp", "name": "PMEGP", "category": "enterprise", "requires": {"enterprise_intent": True}},
    {"id": "pmmy", "name": "PMMY", "category": "enterprise", "requires": {"enterprise_intent": True}},
    {"id": "pmfme", "name": "PMFME", "category": "food_processing", "requires": {"food_processing": True}},
    {"id": "cgtmse", "name": "CGTMSE", "category": "enterprise_credit", "requires": {"enterprise_intent": True}},
    {"id": "sisfs", "name": "Startup India Seed Fund Scheme", "category": "startup", "requires": {"startup": True}},
]

CATALOGUE_VERSION = "2026.catalogue.2"
