export type ExtractTypeofArray<T> = T extends Array<infer E> ? E : never;
export type StrictPropertyCheck<T, TExpected> = T &
  (Exclude<keyof T, keyof TExpected> extends never
    ? Record<string, unknown>
    : 'strict property check failed');
