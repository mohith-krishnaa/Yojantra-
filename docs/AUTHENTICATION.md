# Yojantra Authentication

## Decision

Use Firebase Authentication for identity and Supabase PostgreSQL for application data.

### Supported entry points

- Google sign-in
- email authentication (prefer passwordless email-link flow where appropriate)
- phone OTP can be added later if product research shows it is necessary

## Request flow

```text
Browser
  |
  | Firebase sign-in
  v
Firebase Auth
  |
  | ID token
  v
Yojantra API
  |
  | verify token
  v
Supabase PostgreSQL
```

## Security requirements

- Never commit Firebase service-account credentials.
- Never put database service-role keys in the browser.
- Backend must verify identity tokens server-side.
- Store only the minimum application identity/profile data required by Yojantra.
- Keep authentication provider identifiers separate from user-facing profile fields.
- Use environment variables for deployment configuration.

## Migration strategy

The existing prototype OTP/JWT flow is legacy compatibility code. Replace it in controlled steps after Firebase project configuration and backend token verification are available. Do not remove working auth routes until the replacement has integration tests.
