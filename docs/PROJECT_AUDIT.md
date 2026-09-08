# Yojantra Project Audit

This document is the living gap checklist for the rebuild. It is intentionally strict: a feature is not considered complete because a screen or endpoint exists; it needs data, validation, failure states, tests, security and responsive UX.

## Current confirmed baseline

- FastAPI API foundation
- Vite/React frontend
- Docker Compose configuration
- GitHub Actions CI
- governed catalogue baseline
- deterministic eligibility outcomes
- source/evidence metadata direction
- Firebase authentication architecture documented
- Supabase/Postgres architecture documented
- responsive UI direction documented

## Gaps to implement

### P0 — product correctness
- [ ] Move scheme catalogue from Python constants into versioned Supabase tables.
- [ ] Store rule provenance and official source URLs per criterion.
- [ ] Add scheme effective/expiry dates and freshness checks.
- [ ] Persist profile versions and match results.
- [ ] Add deterministic rule validation for every mandatory criterion.
- [ ] Add explicit unknown/ambiguous handling; never coerce missing data to false.
- [ ] Add decision/audit records containing catalogue version and rule version.
- [ ] Add adversarial tests for boundary values and contradictory profile data.

### P0 — authentication/security
- [ ] Integrate Firebase Auth on frontend.
- [ ] Verify Firebase ID tokens in backend.
- [ ] Map Firebase subject to an application user row.
- [ ] Enforce ownership on profile, saved schemes and applications.
- [ ] Add Supabase RLS policies.
- [ ] Keep secrets out of Git and client bundles.
- [ ] Add API rate limiting and request-size limits.
- [ ] Add structured security/error logging without personal-data leakage.

### P0 — UX core flow
- [ ] Replace the temporary modal assessment with real multi-step onboarding.
- [ ] Mobile-first 360/390px layouts.
- [ ] Desktop 1200/1440px layouts.
- [ ] Conditional questions based on scheme-relevant missing data.
- [ ] Save/resume profile.
- [ ] Results cards with status, reasons, evidence and next action.
- [ ] Scheme detail page.
- [ ] Needs-verification experience.
- [ ] Empty/error/loading/offline states.
- [ ] Accessible keyboard/focus/labels/contrast behavior.

### P1 — AI layer
- [ ] Chat agent for profile collection and explanation.
- [ ] Structured tool/function interface; LLM cannot directly decide eligibility.
- [ ] Voice agent with explicit consent and interruption handling.
- [ ] Telugu/Hindi/English language routing.
- [ ] Conversation-to-profile extraction with user confirmation.
- [ ] Hallucination guardrails and source-grounded answers.
- [ ] Conversation privacy/retention policy.

### P1 — application journey
- [ ] Official application links/channels.
- [ ] Required-document checklist.
- [ ] Application preparation flow.
- [ ] Saved schemes.
- [ ] Application status tracking where supported.
- [ ] Clear distinction between Yojantra guidance and official government submission.

### P1 — data operations
- [ ] Scheme ingestion/admin workflow.
- [ ] Source verification workflow.
- [ ] Change detection and revalidation.
- [ ] Catalogue publication/versioning.
- [ ] Cache invalidation when profile/rules/scheme versions change.
- [ ] Backup and recovery plan.

### P1 — production engineering
- [ ] Dedicated Vercel project.
- [ ] Production API hosting decision.
- [ ] Supabase production environment/configuration.
- [ ] CI test + lint + build gates.
- [ ] Preview deployments.
- [ ] Health/readiness endpoints.
- [ ] Monitoring and alerting.
- [ ] Error tracking.

### P2 — polish and scale
- [ ] Personalised home/dashboard.
- [ ] Search and filters.
- [ ] Explainable ranking.
- [ ] Analytics with privacy-safe events.
- [ ] PWA/offline improvements if useful.
- [ ] Performance budgets and bundle optimisation.
- [ ] Localization beyond initial languages.

## Known architectural rule

AI is an interaction and explanation layer. The governed deterministic engine is the eligibility authority. A missing field must remain unknown until resolved; it must not silently become a negative or positive criterion.

## Review cadence

Before calling a milestone complete, inspect: UI, API, database, auth, source governance, tests, accessibility, security, deployment and failure states. Update this file whenever a gap is discovered or closed.
