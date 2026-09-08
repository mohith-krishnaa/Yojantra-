# Yojantra — Judge Defense & Differentiation

## Likely question

**"Government portals already list schemes. Why does Yojantra need to exist?"**

## Short answer

Government portals remain the authority and source of truth. Yojantra does not try to replace them. Yojantra is a decision-and-action layer: it starts with a person's goal and situation, combines governed eligibility with a broader opportunity graph, explains why an opportunity fits, identifies blockers and missing information, and turns the result into a prioritized action plan.

## What is genuinely different

### 1. Goal-first rather than scheme-first

A user can say what they are trying to achieve without knowing the name of a scheme.

### 2. Cross-category opportunity graph

Relevant opportunities can include government schemes/services plus curated grants, loans, startup programs, incubators, fellowships, scholarships, jobs, challenges, procurement and other ecosystem opportunities.

### 3. Eligibility + readiness

A match is not the end. Yojantra identifies whether the user can act now, needs verification, needs preparation, or is blocked by a prerequisite.

### 4. Action planning

The output is a sequence of next actions instead of an undifferentiated list.

### 5. Evidence-first AI

Chat and voice can collect facts, ask clarifying questions and explain results. They cannot invent eligibility. Deterministic governed rules and cited evidence remain authoritative.

### 6. Source trust boundaries

Every opportunity has a source classification. Government benefits cannot be visually or semantically conflated with private opportunities.

## Demonstration scenario

A student says:

> "I want to start an AI company in Telangana, but I don't have funding or a registered company."

Yojantra should produce:

1. A structured profile extracted from the conversation.
2. Immediate opportunities that match the current stage.
3. Opportunities blocked by company-registration or other prerequisites.
4. Missing information/documents that need to be resolved.
5. A prioritized action sequence.
6. Evidence/source information for governed claims.
7. Clear hand-off links to the official/provider application channel.

## What not to claim

- Do not claim Yojantra replaces myScheme or government portals.
- Do not claim AI itself determines legal eligibility.
- Do not claim private opportunities are government-backed without evidence.
- Do not claim an opportunity is current without a verification/freshness signal.
- Do not claim the chatbot is the innovation; conversational interfaces already exist elsewhere.

## Technical story

The strongest technical demonstration is:

`Goal → Profile Graph → Opportunity Graph → Deterministic Eligibility/Fit → Evidence → Dependency Graph → Action Plan → Application Handoff`

This demonstrates data modeling, rule systems, provenance, AI orchestration, UX, security and practical utility rather than just an LLM wrapper.

## Success metric

The product should optimize for **time-to-correct-next-action**, not number of schemes displayed.
