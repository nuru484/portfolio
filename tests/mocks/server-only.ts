// Vitest stand-in for the `server-only` package, which throws when imported
// outside a React Server Components bundle. Unit tests run in plain Node, so
// the poison-pill is replaced with an empty module (see vitest.config.ts).
export {};
