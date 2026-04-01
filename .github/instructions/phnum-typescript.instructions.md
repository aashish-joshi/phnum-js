---
description: "Use when writing or modifying TypeScript source files, adding features, handling phone number data, or implementing the JSON data format. Covers type safety, constants, async/await patterns, error handling, and the num.json schema contract."
applyTo: "src/**/*.ts"
---

# phnum-js TypeScript & Integration Conventions

## TypeScript Conventions

- **Strict typing**: Type all function parameters and return values explicitly. Prefer `unknown` over `any`.
- **Interfaces**: All data-shape types live in `src/interfaces/`. File name must match the exported interface name (e.g. `phoneNumberList.ts` exports `phoneNumberList`).
- **Constants**: All magic strings and configuration values — element selectors, `localStorage` keys, API URLs, version, cache TTL — must be defined in `src/constants.ts` and imported from there. Never inline them.
  - Existing keys: `KEY_USER_COUNTRY`, `KEY_DISP_NUM`, `KEY_DISP_NUM_COUNTRY`, `KEY_EXPIRY`, `CACHE_EXPIRY_TIME`, `VERSION`, `DISPLAY_ELEMENT`.
- **Async/await**: Use `async/await` over raw `.then()`/`.catch()` chains. Always wrap external API calls in `try/catch`.

## Error Handling

- External calls (`ipapi.co`, and the `data-uri` fetch) must degrade gracefully:
  - `getUserCountry` failure → catch the error, log with the `ShowBestNum::` prefix, fall back to an empty string country code.
  - `getPhoneNumber` failure → fall back to the `default` number from the JSON payload.
- Never let an uncaught error propagate and break the host page.

## DOM Interaction

- Always null-check before reading a DOM element or its attributes (`data-uri`, inner text, etc.).
- The target element is `DISPLAY_ELEMENT` (`#show-best-num`) from `src/constants.ts`. Do not hardcode the selector in other files.

## JSON Data Format (num.json / data-uri contract)

The `data-uri` endpoint must return a `phoneNumberList`-shaped object (`src/interfaces/phoneNumberList.ts`):

```json
{
  "numbers": [
    { "iso": "US", "e164number": 12125551234 }
  ],
  "default": [
    { "iso": "US", "e164number": 12125551234 }
  ]
}
```

- `iso`: two-letter ISO 3166-1 alpha-2 code (`CountryCode` from `libphonenumber-js`).
- `e164number`: full number with country code as a **number** (no `+`, no formatting) — e.g. `12125551234` for `+1 212-555-1234`. Typed as `number` in the interface.
- `numbers`: array of available country numbers.
- `default`: single-element array used when no match is found for the visitor's country.
