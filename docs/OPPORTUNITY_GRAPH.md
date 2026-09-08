# Yojantra Opportunity Graph

## Purpose

Yojantra should answer a user's goal, not merely search for a scheme name. The opportunity graph connects a user's situation and goals to relevant opportunities, eligibility requirements, dependencies and next actions.

## Core graph

```text
User Profile
  ├── location
  ├── demographics
  ├── occupation
  ├── education
  ├── income
  ├── organization/startup stage
  └── goals
        │
        ▼
Goal
  │
  ├── needs ────────────────┐
  │                          ▼
  └── stage             Opportunity
                             │
                    ┌────────┼─────────┐
                    ▼        ▼         ▼
                 Criteria  Benefits  Sources
                    │                  │
                    ▼                  ▼
               Eligibility         Evidence
                    │
                    ▼
                 Match
                    │
                    ▼
              Action Plan
```

## Opportunity types

- government scheme/benefit
- government service
- grant
- loan/credit support
- startup program
- incubator
- accelerator
- mentorship
- fellowship
- scholarship
- job/internship
- challenge/competition
- procurement/market access
- verified private ecosystem opportunity

## Trust model

Every opportunity must carry a source class:

1. `official_government` — authoritative for government information.
2. `government_backed` — institutionally backed; verify scope before using as an eligibility authority.
3. `verified_partner` — curated external provider; discovery only unless explicitly governed.
4. `private_discovery` — useful external opportunity; never represent as a government benefit.

The UI must show this distinction clearly.

## Match states

- `eligible` — all governed mandatory criteria satisfied.
- `needs_verification` — insufficient or ambiguous user data, or a criterion cannot be safely evaluated.
- `not_eligible` — a governed mandatory criterion fails.
- `possible_fit` — for non-government opportunities where the source provides a fit signal but Yojantra is not an authority on eligibility.

## Action planner

A match is not the end of the flow. Each result can generate actions:

- `do_now` — user can proceed with currently known requirements.
- `prepare` — a prerequisite/document/information should be prepared.
- `blocked` — a missing requirement prevents the next step.
- `consider_later` — opportunity may become relevant after a stage change.
- `external_application` — direct the user to the authoritative/provider application channel.

## Dependency examples

```text
Idea-stage founder
  → incubation/mentorship
  → startup registration/recognition when applicable
  → funding opportunity
  → market-access opportunity
```

Dependencies are recommendations unless backed by a governed rule. The AI must not invent a dependency.

## AI boundary

Chat and voice agents may:

- understand natural language
- extract structured profile facts
- ask clarifying questions
- explain matches
- translate/explain source material
- summarize the action plan

They may not:

- invent eligibility rules
- turn a private opportunity into a government benefit
- override a deterministic decision
- silently mutate important profile facts
- cite an unverified source as official

## Ranking

Initial ranking should prioritize:

1. governed eligibility outcome
2. goal relevance
3. geographic applicability
4. user stage
5. urgency/deadline when verified
6. benefit/need alignment
7. evidence freshness
8. actionability

Ranking must never turn an ineligible government scheme into an eligible result.

## Future graph extensions

- opportunity-to-opportunity prerequisites
- related opportunities
- state-specific variants
- sector-specific opportunities
- deadline calendar
- document reuse map
- user progress graph
- source change events

## Product principle

**Search finds possibilities. Yojantra should help the user decide what to do next.**
