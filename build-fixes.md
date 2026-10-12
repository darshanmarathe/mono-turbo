# Build Fixes

## Failures observed

The first build recorded in `build.log` did not reach TypeScript compilation consistently. Multiple Turbo package tasks triggered pnpm dependency installation at the same time. On Windows this led to slow registry requests/timeouts, broken or missing executable links, and a symlink operation failing with `EPERM`.

After restoring the workspace dependencies, a sequential build exposed a separate UI type-check failure: `packages/ui/src` includes Storybook story files, but `@storybook/react-vite` is not installed in the UI package. Production package builds use `tsc --noEmit` and do not need to type-check those stories.

## Changes made

Updated `packages/ui/tsconfig.json` to exclude `src/**/*.stories.tsx` from the package TypeScript project. The Vite apps still build their application sources; the Storybook files remain available to Storybook when its optional dependencies are installed.

## Recovery and verification

Restored the dependencies using the existing pnpm lockfile:

```sh
pnpm install --offline --frozen-lockfile
```

Verified a non-parallel Turbo build:

```sh
pnpm exec turbo run build --concurrency=1
```

Then ran the root build command:

```sh
npm run build
```

The final run succeeded with **11 of 11 tasks successful**. All four Vite apps (`app-admin`, `app-admin-b`, `kitchen-sink`, and `shell`) emitted files into their respective `dist` directories. Shared TypeScript packages use `tsc --noEmit`, so they type-check without producing compiled files; Turbo's “no output files found” warnings for those packages are expected.
