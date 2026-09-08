# Yojantra UI/UX Direction

## Core experience

```text
Who are you?
   -> What is your situation?
   -> Which Yojanas fit?
   -> Why did they match?
   -> What should you do next?
```

## Principles

1. Explain before asking users to act.
2. Never hide uncertainty behind an AI score.
3. Use plain language; expose technical/legal detail progressively.
4. Keep forms short and split long assessments into steps.
5. Make every important action usable with a thumb on mobile.
6. Keep official evidence visible near eligibility claims.
7. Design every screen for loading, empty, error, and insufficient-information states.

## Responsive targets

| Surface | Primary target |
|---|---|
| Mobile | 360 / 390 px |
| Tablet | 768 px |
| Laptop | 1280 px |
| Desktop | 1440 px |

## Core screens

### Public
- Landing
- How it works
- Scheme discovery
- Sign in

### Authenticated
- Onboarding
- Dashboard
- Matches
- Eligibility review
- Application guidance
- Applications tracker
- Ask Yojantra
- Profile

### Trust and governance
- Source/evidence panel
- Data freshness indicator
- Eligibility explanation
- Uncertainty / missing-information state

## Visual direction

- restrained green primary palette
- high-contrast ink and muted text
- generous spacing
- rounded but not overly decorative cards
- clear status badges
- accessible focus states
- typography optimized for scanning on small screens

## Mobile navigation

Use a persistent bottom navigation for the most important destinations. Secondary actions belong in a compact menu. Do not squeeze the full desktop navigation into a mobile header.

## Desktop navigation

Use a compact top navigation with a clear primary action and persistent access to profile/account controls.

## Accessibility baseline

- semantic headings
- visible keyboard focus
- minimum touch targets around 44px
- labels for every form control
- no color-only status communication
- reduced-motion friendly transitions
- readable line lengths and contrast

## Design-to-code rule

Figma is the visual source of truth. The React implementation is the behavioral source of truth. A design is not considered complete until the real frontend can implement its states and responsive behavior.
