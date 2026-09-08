# Yojantra Judge Demo Scenario

## Goal
Demonstrate that Yojantra is an action-oriented opportunity navigator, not another scheme directory or generic chatbot.

## Persona
A 21-year-old engineering student in Telangana wants to build an AI startup. They have an idea, limited money, no registered company, and want funding plus mentorship.

## Demo sequence

1. **Landing** — choose "Start a business".
2. **Chat/voice** — user describes the goal naturally.
3. **Profile extraction** — show structured facts and ask for confirmation before saving.
4. **Minimal onboarding** — ask only missing facts that materially affect matching.
5. **Opportunity map** — show government, institutional and private/discovery opportunities with explicit trust labels.
6. **Eligibility** — run governed deterministic rules where official criteria are available.
7. **Action plan** — group results into Do Now, Prepare Next, Needs Verification and Later/Not Ready.
8. **Explainability** — user asks "Why this?" and receives evidence-backed reasoning.
9. **Blocker** — show an opportunity that requires a prerequisite such as registration and explain the dependency.
10. **Application handoff** — open the official/provider application channel; Yojantra does not pretend to submit an application itself.

## What judges should notice

- The AI is useful without being the eligibility authority.
- A directory result becomes a prioritized decision path.
- Government and private opportunities are not conflated.
- Missing information and prerequisites are explicit.
- Source/provenance and freshness are visible.
- The same workflow works through UI, chat and voice.
- Mobile and desktop use the same underlying decision model.

## Failure-path demo

Intentionally provide an ambiguous or unsupported fact. The system should produce **Needs Verification**, identify the missing/uncertain criterion and avoid claiming eligibility.

## Success criteria

A judge should be able to understand within three minutes:

**"I tell Yojantra what I want to achieve → it understands my situation → finds relevant opportunities → verifies what it can → explains the fit → tells me what to do next."**
