# Yojantra Master Build Plan

This is the execution checklist for the rebuild. The project is not complete until the feature works end-to-end across UI, API, database, auth, governance, tests, security, accessibility, and deployment.

## 0. Product north star

Yojantra helps a user discover government schemes, understand why a scheme matches, identify missing information, and reach the official application channel.

**Authority rule:** AI may collect information, translate, explain and guide. The governed deterministic engine decides eligibility from versioned rules and evidence.

## 1. Foundation

- [x] Canonical GitHub repository
- [x] FastAPI + React/Vite baseline
- [x] Docker/CI baseline
- [x] Governed catalogue baseline
- [x] Deterministic outcome states
- [x] Project audit
- [x] Master architecture map
- [ ] Production-ready environment configuration

## 2. Data + governance — next critical stage

- [ ] Create Supabase schema for schemes, criteria, rule versions, sources, evidence, profiles, profile versions, matches, decisions and audit events
- [ ] Move Python catalogue into database-backed versioned records
- [ ] Add effective/expiry dates and freshness checks
- [ ] Store provenance per criterion
- [ ] Add publication workflow: draft → review → published → superseded
- [ ] Add ingestion/change-detection workflow
- [ ] Add backup/recovery procedure

## 3. Authentication + security

- [ ] Firebase Google sign-in
- [ ] Firebase email authentication
- [ ] Backend Firebase ID-token verification
- [ ] Application-user mapping
- [ ] Supabase RLS
- [ ] Ownership checks
- [ ] Rate limits/request limits
- [ ] Secret management
- [ ] Privacy-safe structured logging

## 4. Core UX

### Mobile

- [ ] 360px layout
- [ ] 390px layout
- [ ] Bottom/compact navigation where appropriate
- [ ] Thumb-friendly controls
- [ ] Short progressive onboarding

### Desktop

- [ ] 1200px layout
- [ ] 1440px layout
- [ ] Two-column assessment/results patterns where useful

### Shared

- [ ] Design tokens
- [ ] Components
- [ ] Onboarding
- [ ] Conditional questions
- [ ] Save/resume
- [ ] Results
- [ ] Scheme detail
- [ ] Evidence panel
- [ ] Needs-verification state
- [ ] Application checklist
- [ ] Loading/error/empty/offline states
- [ ] Keyboard/focus/accessibility

## 5. AI interaction layer

- [ ] Chat profile collection
- [ ] Chat scheme explanation
- [ ] Structured tool interface
- [ ] Confirmation before profile mutations
- [ ] Source-grounded responses
- [ ] Hallucination guardrails
- [ ] Voice agent
- [ ] Voice consent + interruption handling
- [ ] Telugu/Hindi/English routing
- [ ] Conversation retention/deletion controls

## 6. Application journey

- [ ] Official source/channel links
- [ ] Required documents
- [ ] Preparation checklist
- [ ] Saved schemes
- [ ] Status tracking where supported
- [ ] Explicit boundary between Yojantra and official submission

## 7. Production

- [ ] Dedicated Vercel project
- [ ] Production API hosting
- [ ] Supabase production config
- [ ] CI test/lint/build gates
- [ ] Preview deployments
- [ ] Health/readiness checks
- [ ] Monitoring
- [ ] Error tracking
- [ ] Performance budgets

## 8. QA gates

Every milestone must be checked against:

- functional correctness
- deterministic eligibility correctness
- unknown/ambiguous inputs
- boundary values
- contradictory data
- source freshness
- auth/authorization
- RLS
- accessibility
- mobile and desktop breakpoints
- network failure/retry
- privacy/security
- test coverage
- deployment reproducibility

## Current execution order

**Supabase schema → persistence → Firebase Auth → real onboarding → real results/evidence UX → chat → voice → application flow → production deployment → full audit.**

Do not mark a stage complete merely because code or a screen exists. Verify the complete path.
