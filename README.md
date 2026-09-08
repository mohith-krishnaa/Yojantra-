# Yojantra AI

**Finds your right Yojana.**

Yojantra is an AI-assisted government-scheme discovery and eligibility platform. Its core principle is simple: **AI explains and guides; deterministic, source-backed rules decide eligibility.**

## Current baseline

The current implementation has evolved from the temporary internal `SchemeMatch` prototype and includes:

- deterministic eligibility engine
- explicit `ELIGIBLE`, `NOT_ELIGIBLE`, and `INSUFFICIENT_INFORMATION` outcomes
- source-backed scheme governance and evidence metadata
- adversarial decision tests
- match-cache invalidation when profiles, rules, or scheme versions change
- FastAPI backend
- Vite frontend
- Docker Compose local-stack configuration
- GitHub Actions CI
- governed catalogue of 10 schemes

## Product flow

```text
Onboarding
   ↓
Profile
   ↓
Scheme discovery
   ↓
Eligibility evaluation
   ↓
Evidence + explanation
   ↓
Application guidance
```

## Architecture

```text
                 Yojantra AI
                     │
             ┌───────┴────────┐
             │                │
         Frontend          FastAPI
             │                │
             └───────┬────────┘
                     │
             Matching + Rules
                     │
          Governed Scheme Catalogue
                     │
          Evidence / Application
```

## Important design rule

Yojantra must never manufacture eligibility from an LLM response. If required information is missing, the system should ask for it or return `INSUFFICIENT_INFORMATION` rather than guessing.

## Status

This repository is the canonical project repository. The product name is **Yojantra**; the codebase is being renamed from the temporary SchemeMatch identity in controlled steps so imports, migrations, CI, and deployment configuration are not broken.

## Disclaimer

Yojantra is an independent software project and is not an official Government of India portal. Eligibility results depend on the accuracy and freshness of governed scheme data and should be verified against the applicable official source before application.
