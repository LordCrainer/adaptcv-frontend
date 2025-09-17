# Copilot Instructions for adaptcv-frontend

## Project Overview
- This is a Nuxt 3 (Vue 3) frontend for AdaptCV, using TypeScript and modular structure.
- Major domains: authentication (`modules/auth`), CV builder (`modules/builder`), shared UI/components, and utility logic.
- State management and API calls are handled via composables and service modules, not Vuex/Pinia.
- Error handling is centralized in `utils/errorHandlers/error.handler.ts` and uses custom error translation.

## Key Patterns & Conventions
- **Composables**: All business logic and API calls are in `composables/` or `modules/*/composables/`. Example: `useBuilder`, `useAuth` in `modules/auth/composables/useAuth.ts` wraps `useAuthStore` (store) and `AuthHttpService` for component interaction.
- **Services**: HTTP logic is in `modules/*/services/`, e.g., `auth-http.service.ts`, `builder-http.service.ts`.
- **Store**: Local state is managed in `modules/*/store/`, e.g., `auth.store.ts`, `builder.store.ts`, where stores instantiate services via composables (`useApi`).

## Developer Workflows
- **Install dependencies**: `npm install`, `yarn install`, `pnpm install`, or `bun install` (see README).
- **Dev server**: `npm run dev` (or `yarn dev`, etc.) runs on `http://localhost:4000`.
- **Build**: `npm run build` (or `yarn build`, etc.).
- **Preview**: `npm run preview` (or `yarn preview`, etc.).
- **Testing**: Use `vitest` for unit tests. Test files are in `__tests__` folders next to code. Run with `npx vitest` or `npm run test`.
- **Linting**: Configured via `eslint.config.mjs`. Run `npx eslint .`.

## Integration & External Dependencies
- **API**: All backend calls go through service modules and composables. Do not call APIs directly in components.
- **Auth**: Use the `useAuth` composable in components to access `login`, `logout`, `isLoading`, `error`, and `isAuthenticated`. Internally, `useAuth` delegates to `useAuthStore` which uses `AuthHttpService` for API calls and error handling via `errorHandler`.
- **PDF Generation**: Handled via composables in `composables/useBuilderPdfGenerator.ts` and `useGeneratePDF.ts`.
- **Styling**: SCSS in `assets/css/base.scss` and component-scoped styles.

## Examples
- To add auth to a component: import `useAuth` and call `login({ email, password })`; use `isLoading` to show spinners and `error` to display messages.
- To add a new API call: create a method in the relevant service, expose via composable, and handle errors with `errorHandler`.
- To add a new page: add a `.vue` file in `pages/` or nested route folder.
- To add a new language: add a file in `locales/` and update translation logic.

## References
- See `README.md` for setup and scripts.
- See `utils/errorHandlers/error.handler.ts` for error handling pattern.
- See `modules/auth/` and `modules/builder/` for domain structure.

---
For questions, follow the structure and patterns above. When in doubt, prefer composables and service modules for logic, and keep components focused on UI.
