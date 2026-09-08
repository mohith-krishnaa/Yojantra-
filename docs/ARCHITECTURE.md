# Yojantra Architecture

## Product boundary

Yojantra is an independent government-scheme discovery and eligibility assistant. It does not make legal or official government determinations.

## Stack

```text
Web / PWA
   |
   v
Vercel-hosted frontend
   |
   v
FastAPI backend
   |
   +--> Firebase Authentication
   |      - Google sign-in
   |      - email authentication
   |
   +--> Supabase PostgreSQL
   |      - user profile data
   |      - scheme catalogue
   |      - versioned rules
   |      - evidence
   |      - eligibility decisions
   |      - applications
   |      - audit records
   |
   +--> optional Redis / Neo4j / object storage
```

## Authentication rule

Firebase is the identity provider. The backend verifies Firebase identity tokens and maps the authenticated subject to an application user record in PostgreSQL.

Do not duplicate passwords, OTP state, or long-lived authentication secrets in the application database.

## Data rule

PostgreSQL is the source of truth for application and eligibility data. Firebase Auth is not the scheme/rules database.

## Decision rule

LLMs may explain, translate, summarize, and help collect missing information. They must not invent or override eligibility rules.

The eligibility engine returns one of:

- `ELIGIBLE`
- `NOT_ELIGIBLE`
- `INSUFFICIENT_INFORMATION`

Every automated result should be traceable to a governed rule version and evidence record.

## Deployment separation

Yojantra gets its own Supabase project and its own Vercel project. Existing unrelated projects must not share production databases, secrets, or deployment targets.

## Responsive UI

The product is designed as one responsive experience:

- mobile: 360–390px primary layouts
- tablet: fluid intermediate layouts
- desktop: 1200–1440px primary layouts

Mobile is not a collapsed desktop layout. Navigation, forms, information density, touch targets, and progressive disclosure are adapted independently.
