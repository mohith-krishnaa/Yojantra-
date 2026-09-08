# Yojantra Action-Plan UX

## Product principle

The primary result is not a list of scheme cards. It is a prioritized path showing what the user can do now, what needs verification, what to prepare, and what can become relevant later.

## Core screen

### Header
- User goal
- Profile completeness
- Language selector
- Chat/voice entry

### Summary
- `X` strong matches
- `Y` opportunities needing verification
- `Z` preparation items
- Clear source/trust labels

### Action sections

**Do now**
- Highest-value eligible opportunities
- Why it matches
- Key evidence
- Required next action
- Official/provider application link

**Prepare next**
- Missing documents
- Missing profile facts
- Registration/setup prerequisites
- Estimated dependency order

**Needs verification**
- Ambiguous or stale information
- Exact question to verify
- Source and verification date
- Never display as confirmed eligibility

**Later / not ready**
- Useful opportunities blocked by stage, age, income, registration, location, etc.
- Explain the blocker without pretending to know exceptions

## Interaction model

Users can ask:
- "Why is this recommended?"
- "What is stopping me?"
- "What should I do first?"
- "Can I save this?"
- "Explain this in Telugu/Hindi/English."

Chat and voice may explain or collect information, but eligibility remains determined by governed structured rules.

## Mobile

- Single-column flow
- Sticky primary action
- Large touch targets
- Progressive disclosure for evidence/details
- Bottom-sheet style details where appropriate
- Voice/chat available without obscuring the primary action

## Desktop

- Two-column layout where useful
- Main action plan on the left
- Evidence/profile context on the right
- Persistent navigation

## Trust UX

Every opportunity must visibly communicate its source type:

- Official government
- Government-backed/institutional
- Verified partner
- Private/discovery

Private opportunities must never use government visual language or imply government endorsement.

## Required states

- Loading
- No matches
- Strong matches
- Needs verification
- Stale source
- API failure
- Offline/retry
- Incomplete profile
- Saved
- Application hand-off

## Accessibility

- Keyboard/focus support on desktop
- Screen-reader labels
- Logical heading hierarchy
- Sufficient contrast
- Do not communicate status by color alone
- Voice is an additional input mode, not the only accessible path
