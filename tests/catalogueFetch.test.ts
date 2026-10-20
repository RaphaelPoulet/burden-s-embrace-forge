import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchCatalogue } from "../src/lib/catalogueFetch";

const defaults = [{ id: "narya", isFallback: true }];
const empty = (rows: { id: string }[]) => rows.length === 0;

test("failed database read returns default rings and logs the original error", async () => {
  const error = { code: "42501", message: "permission denied for table rings" };
  const original = console.error;
  const logged: unknown[][] = [];
  console.error = (...args) => { logged.push(args); };
  try {
    const data = await fetchCatalogue(async () => { throw error; }, defaults, empty, "rings");
    assert.equal(data, defaults);
    assert.equal(logged[0]?.[1], error);
  } finally { console.error = original; }
});

test("an empty database array returns a nonempty preview collection", async () => {
  const result = await fetchCatalogue(async () => [], defaults, empty, "rings");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "narya");
  assert.equal(result[0].isFallback, true);
});

test("successful reads preserve live records rather than replacing them", async () => {
  const live = [{ id: "live-ring", isFallback: false }];
  assert.equal(await fetchCatalogue(async () => live, defaults, empty, "rings"), live);
});

test("unreachable reads time out and abort before returning defaults", async () => {
  let signal: AbortSignal | undefined;
  const result = await fetchCatalogue((s) => {
    signal = s;
    return new Promise<never>(() => {});
  }, defaults, empty, "rings", 10);
  assert.equal(result, defaults);
  assert.equal(signal?.aborted, true);
});