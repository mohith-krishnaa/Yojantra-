"""Authoritative NSFDC credit products used by Yojantra's SIH flow.

Facts are transcribed from NSFDC's current FAQ (updated 2026-09-08).
The matcher only evaluates fields explicitly represented below; other
conditions are surfaced for verification instead of being guessed.
"""
NSFDC_SOURCE_URL = "https://nsfdc.nic.in/faqs"
NSFDC_CATALOGUE_VERSION = "2026-09-08"
NSFDC_SCHEMES = [
 {"id":"nsfdc-mfs","name":"Micro Finance Scheme (MFS)","category":"nsfdc_credit","source_type":"government","source_name":"NSFDC","source_url":NSFDC_SOURCE_URL,"requires":{"community":"SC","income_max":500000,"goal":"business","project_cost_max":140000},"finance":{"project_cost_max":140000,"loan_max":125000,"interest_rate":0.065,"tenure_years":3,"moratorium_months":3},"routing":{"channel_required":True,"channel_types":["SCA","CA"]}},
 {"id":"nsfdc-amy","name":"Aajeevika Micro-Finance Yojana (AMY)","category":"nsfdc_credit","source_type":"government","source_name":"NSFDC","source_url":NSFDC_SOURCE_URL,"requires":{"community":"SC","income_max":500000,"goal":"business","project_cost_max":140000},"finance":{"project_cost_max":140000,"loan_max":125000,"interest_rate":0.15,"tenure_years":3,"moratorium_months":3},"routing":{"channel_required":True,"channel_types":["NBFC-MFI"]}},
 {"id":"nsfdc-term-loan","name":"Term Loan","category":"nsfdc_credit","source_type":"government","source_name":"NSFDC","source_url":NSFDC_SOURCE_URL,"requires":{"community":"SC","income_max":500000,"goal":"business","project_cost_min":140000,"project_cost_max":5000000},"finance":{"project_cost_max":5000000,"loan_max":4500000,"interest_rate":0.08,"tenure_years":7,"moratorium_months":6},"routing":{"channel_required":True,"channel_types":["SCA","CA"]}},
 {"id":"nsfdc-uny","name":"Udyam Nidhi Yojana (UNY)","category":"nsfdc_credit","source_type":"government","source_name":"NSFDC","source_url":NSFDC_SOURCE_URL,"requires":{"community":"SC","income_max":500000,"goal":"business","project_cost_max":500000},"finance":{"project_cost_max":500000,"loan_max":450000,"interest_rate":0.13,"tenure_years":5,"moratorium_months":3},"routing":{"channel_required":True,"channel_types":["Cooperative Society","Cooperative Bank","Small Finance Bank"]}},
 {"id":"nsfdc-els","name":"Educational Loan Scheme (ELS)","category":"nsfdc_education","source_type":"government","source_name":"NSFDC","source_url":NSFDC_SOURCE_URL,"requires":{"community":"SC","income_max":500000,"goal":"education"},"finance":{"loan_max":4000000,"interest_rate":0.065,"tenure_years":12},"routing":{"channel_required":True,"channel_types":["SCA","CA"]}},
]
