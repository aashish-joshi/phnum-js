# GitHub Copilot Instructions for phnum-js

This repository contains `phnum-js` (show-best-number), a TypeScript library that automatically displays and formats phone numbers based on a website visitor's location.

## Project Architecture & Overview

- **Core Logic**: The entry point is `src/index.ts`. It orchestrates the flow: check cache -> get user location -> fetch phone numbers -> select best number -> display.
- **Geolocation**: Uses `https://ipapi.co/json/` (in `src/functions/getUserCountry.ts`) to determine the visitor's country code via IP address.
- **Data Source**: The library looks for an HTML element (default ID `#show-best-num`) with a `data-uri` attribute pointing to a JSON file containing phone numbers.
- **Formatting**: Uses `libphonenumber-js` to format numbers according to the visitor's locale.
- **Caching**: Implements a simple caching mechanism using `localStorage` to store the user's country and the selected number to avoid redundant API calls (see `src/functions/cache.ts`).

## Development Workflow

- **Build for Production**: Run `npm run build`. This uses Webpack to compile and minify TypeScript into `dist/showBestNumber.min.js`.
- **Local Development**: Run `npm run run-dev`. This runs `gulp dev` (copies assets) and starts a local `http-server` in the `dev/` directory.
- **File Structure**:
  - `src/`: Source TypeScript files.
  - `src/functions/`: Helper logic (geolocation, fetching, caching, DOM manipulation).
  - `src/interfaces/`: TypeScript interfaces for API responses and internal data structures.
  - `dist/`: Compiled production output.
  - `dev/`: Local development sandbox.

## Coding Conventions & Patterns

- **TypeScript**: Strictly typed. Define interfaces in `src/interfaces/` for any data structures, especially API responses (e.g., `userCountry`, `phoneNumberList`).
- **Constants**: Avoid magic strings. Use `src/constants.ts` for configuration keys, element selectors, and API endpoints.
- **Async/Await**: Prefer `async/await` over raw Promises for readability, especially in `src/index.ts` and data fetching functions.
- **DOM Interaction**: The library is designed to be embedded. It interacts with the DOM primarily to read configuration (`data-uri`) and inject the formatted number. Ensure null checks when querying DOM elements.
- **Error Handling**: Gracefully handle API failures (e.g., `ipapi.co` down, JSON fetch error) by falling back to default values or empty strings, ensuring the UI doesn't break.

## Integration Details

- **Input JSON Format**: The `data-uri` endpoint must return a JSON object with a `numbers` array and a `default` object. See `sample-num.json` or `src/interfaces/phoneNumberList.ts` for the structure.
- **External Dependencies**:
  - `libphonenumber-js`: Used for parsing and formatting.
  - `ipapi.co`: External service for IP-based geolocation.
