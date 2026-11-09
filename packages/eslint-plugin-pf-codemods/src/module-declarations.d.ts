// @typescript-eslint/parser has no top-level "types"/"main" entry, so it
// cannot be resolved by TypeScript's "node" module resolution. It is only
// used as an opaque parser object in flat configs, so an any-typed ambient
// module declaration is sufficient.
declare module "@typescript-eslint/parser";
